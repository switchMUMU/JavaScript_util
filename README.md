# JavaScript_util

# Int64
Int64 for JavaScript（cocos creator）
let Int64 = require('Int64');

get64Number(id) {
    if (id.high || id.low) {
        var id64 = new Int64();
        id64.setValue(id.high, id.low)
        var id_num = Number(id64.toString());
        return id_num;
    } else {
        return id;
    }
},
	
# Dictionary
Dictionary for JavaScript（cocos creator）

let Dictionary = require("Dictionary");
let dictionary = new Dictionary();

# Event
### addEventKey
UpdateDiamondNumberEvent: genEventKey(),
	
### addEvent
initEvent() {
    var that = this;
    this._diamond_num_handler = Global.EventManager.on(Global.EventEnum.UpdateDiamondNumberEvent, (rs) => {
	cc.log(rs);
        that.updateUI();
    })
},

removeEvent() {
    if (this._diamond_num_handler) {
        Global.EventManager.off(Global.EventEnum.UpdateDiamondNumberEvent, this._diamond_num_handler)
        this._diamond_num_handler = null;
    }
},

onDestroy(msg) {
    this.removeEvent();
},
### useEvent
Global.EventManager.dispatch(Global.EventEnum.UpdateDiamondNumberEvent, data);

#Net
# Http
let Http = require("http");
let http = new Http();
let params = {
    method: "playerInfo",
    pid: Global.GameConfig.PID,
    channelId: Global.GameConfig.CHANNEL_ID,
}
http.post(Global.GameConfig.AUTH_URL, params, (msg) => {
    cc.log(JSON.stringify(msg));
    if (msg.errorCode == require('errorCode').SystemError.success) {
        this._model.setPlayerInfo(msg.data);
    } else {
        viewManager.showErrorMsg(msg.errorCode)
    }
})

# Socket1
### connect
doLinkGameSever: function (addr, port) {
	addr = addr || this._login_model.getServerInfo().addr;
	port = port || this._login_model.getServerInfo().port;
	let host = "wss://" + addr;
	// let host = "ws://" + addr + ":" + port;
	Global.Session = new Socket();
	Global.Session.connect(host);
	Global.Session.on("close", this.onSocketClose, this);
	Global.Session.on("onConnected", (rs) => {
		if (rs) {
			this.checkProtoVersion();
			this.enterGame();
		}
	})
},
### require
Global.Session.send(Proto.M_Role.getRoleInfo, null, (msg) => {
    cc.log(JSON.stringify(msg));
    if (msg.error == require('errorCode').SystemError.success) {
        cc.log("getRoleInfo susccessFull");
        this._model.setPlayerInfo(msg.data);
    } else {
        viewManager.showErrorMsg(msg.error)
    }
})
### response
initEvent(){
    var handle;
    handle = Global.Session.on(Proto.M_Role.handleGoldUpdate.id, this.handleGoldUpdate, this)
    this._handles[Proto.M_Role.handleGoldUpdate.id] = handle;
    handle = Global.Session.on(Proto.M_Role.handleDiamondUpdate.id, this.handleDiamondUpdate, this)
    this._handles[Proto.M_Role.handleDiamondUpdate.id] = handle;
},

removeEvent(){
    for(var i in this._handles){
        Global.Session.off(i, this._handles[i]);
    }
    this._handles = [];
},
		
onDestroy(msg) {
    this.removeEvent();
},
# Socket2
protocol buffers -> ProtoName List
