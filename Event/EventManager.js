cc.Class({
    properties: {

    },
    statics: {
        _listeners: [],
        _eventDispatcher: new cc.EventTarget(),
        on(name, callFunc, target) {
            name = name.toString();
            const handle = function (event) {
                callFunc.call(target, event)
            };
            if (this._listeners[name] == null) {
                this._listeners[name] = 0;
            }
            this._listeners[name]++;
            this._eventDispatcher.on(name, handle)
            return handle;
        },

        dispatch(name, data) {
            name = name.toString();
            if (this._listeners[name] && this._listeners[name] > 0) {
                this._eventDispatcher.emit(name, data)
            }
        },

        off(name, handle) {
            name = name.toString();
            this._listeners[name]--;
            if (this._listeners[name] < 0) {
                this._listeners[name] = 0;
            }
            this._eventDispatcher.off(name, handle)
        },
    },
});