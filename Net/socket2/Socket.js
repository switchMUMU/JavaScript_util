var SocketState = {
    UnInit: 0,
    Opened: 1,
    Closing: 2,
    Closed: 3,
}

cc.Class({
    extends: cc.Component,
    statics: {
        ip: "",
        ws: null,
        isPinging: false,
        state: SocketState.UnInit,
        handlers: {},

        connect: function (netip, fnConnect, fnError, fnClose) {
            var self = this;

            this.ip = netip;
            this.ws = new WebSocket(this.ip);
            this.ws.binaryType = "arraybuffer";

            this.ws.onopen = function (evt) {
                cc.log("--onopen----");
                self.state = SocketState.Opened;
                if (fnConnect) {
                    fnConnect();
                }
            };

            this.ws.onerror = function (evt) {
                cc.log("--onerror----", evt);
                self.state = SocketState.Closed;
                if (fnError) {
                    fnError();
                }
            };

            this.ws.onclose = function (evt) {
                cc.log("--onclose----");
                self.state = SocketState.Closed;
                self.ws = null;
                if (fnClose) {
                    fnClose();
                }
            };

            this.ws.onmessage = function (event) {
                self.getMessage(event);
            };
        },

        send: function (pbName, data) {
            if (this.state == SocketState.Opened) {
                let bytes = this.Encode(pbName, data);
                if (bytes) {
                    var pbArrayBuffer = new Int8Array(bytes);
                    var buffer = new ArrayBuffer(pbArrayBuffer.byteLength + 8);
                    var aBuffer = new Int8Array(buffer);
                    aBuffer.set(pbArrayBuffer, 8);
                    var dv = new DataView(buffer);
                    dv.setUint16(0, this.getPbID(pbName), false);
                    dv.setUint32(2, bytes.byteLength, false);
                    dv.setUint16(6, 0, false);
                    this.ws.send(buffer);
                }
            }
        },

        getMessage: function (event) {
            var data = event.data;
            // 解头
            var header = this.decodeHeaderBuffer(data);
            if (header == null) {
                return;
            }
            var type = header.type;
            var buffer = event.data.slice(header.offset);
            var msgTypeName = this.getPbName(type);
            var data = this.Decode(msgTypeName, buffer);
            cc.log("----net getMessage----", type, msgTypeName, data);
            cc.vv.Onfire.fire(msgTypeName, data);
        },

        close: function () {
            this.state = SocketState.Closing;
            if (this.ws) {
                this.ws.close();
                this.ws = null;
            }
        },

        ping: function () {
            this.send('game_ping');
        },

        startHearbeat: function () {
            this.ws.on('game_pong', function () {
                console.log('game_pong');
                self.lastRecieveTime = Date.now();
            });
            this.lastRecieveTime = Date.now();
            var self = this;
            console.log(1);
            if (!self.isPinging) {
                console.log(1);
                self.isPinging = true;
                setInterval(function () {
                    console.log(3);
                    if (self.ws) {
                        console.log(4);
                        if (Date.now() - self.lastRecieveTime > 10000) {
                            self.close();
                        }
                        else {
                            self.ping();
                        }
                    }
                }, 5000);
            }
        },

        decodeHeaderBuffer(pbBuffer) {
            if (pbBuffer.byteLength < 8) {
                console.log("数据包异常！")
                return
            }
            var rs = {};
            var dv = new DataView(pbBuffer);
            rs.type = dv.getUint16(0, false);
            rs.length = dv.getUint32(2, false);
            rs.crc = dv.getUint16(6, false);
            rs.offset = 8;
            rs.byteLength = pbBuffer.byteLength;
            return rs;
        },

        Encode: function (msgTypeName, data) {
            var msgClass = cc.vv.Proto[msgTypeName];
            if (msgClass) {
                var msg = msgClass.create(data);
                var bytes = msgClass.encode(msg).finish();
                return bytes;
            }
            console.log("-----net Encode error: msgType null----");
        },

        Decode: function (msgTypeName, bytes) {
            var tmp_bytes = new Uint8Array(bytes);
            var msgClass = cc.vv.Proto[msgTypeName];
            var msg = msgClass.decode(tmp_bytes);
            var data = msgClass.toObject(msg, {
                longs: Number,		//long默认转换为Number类型
                enums: String,
                bytes: String,
                // see ConversionOptions
            });
            return data;
        },

        getPbID: function (name) {
            var id = cc.vv.Proto.MESSAGE.TYPE[name];
            return id;
        },

        getPbName: function (id) {
            var name = cc.vv.Proto.MESSAGE.TYPE.__proto__[id];
            return name;
        },

        getState: function () {
            return this.state;
        },
    },
});