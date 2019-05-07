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

#Event
# addEventKey
UpdateDiamondNumberEvent: genEventKey(),
	
# addEvent
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
# useEvent
Global.EventManager.dispatch(Global.EventEnum.UpdateDiamondNumberEvent, data);