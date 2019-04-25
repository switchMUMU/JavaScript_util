# JavaScript_util

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
	
Dictionary for JavaScript（cocos creator）

let Dictionary = require("Dictionary");
let dictionary = new Dictionary();