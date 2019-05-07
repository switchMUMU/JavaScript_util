// EventEnum
// 
var key = 0xA001

function genEventKey() {
	key++;
	return key.toString(16)
}
module.exports = {
	UpdateDiamondNumberEvent: genEventKey(),
	UpdateGoldNumberEvent: genEventKey(),
	UpdatePlayerInfoEvent: genEventKey(),

}