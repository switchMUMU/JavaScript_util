module.exports = {
    //游戏其他相关协议
    M_Game : {
        module              	: "game",
        ping                	: {id : 0x0001, type : 1, request : null, response : "game.Timestamp"},  //返回服务端时间
    },

    //认证模块
    M_Auth : {
        module : "auth",
        login               	: {id : 0x0101, type : 1, request : "auth.LoginRequest", response : "auth.LoginResponse", log : 0, desc : "登录"},
        createRole          	: {id : 0x0102, type : 1, request : "auth.CreateRoleInfo", response : null, log : 1, desc : "创建角色"},
        heartbeat           	: {id : 0x0103, type : 1, request : null, response : null, log : 0, desc : "心跳"},
        onOffline           	: {id : 0x0104, type : 2, response : "auth.OfflineReason", log : 1, desc : "离线"},
        getServerTime       	: {id : 0x0105, type : 1, response : "auth.ServerTime", log : 0, desc : "获取服务器时间"},
        checkProtoVersion   	: {id : 0x0106, type : 1, request : "int32", log : 0, desc : "向服务器检测协议版本号"}, 

        synchCorrectionTime     : {id : 0x0107, type : 1, request : "auth.ServerTime", response : "auth.ServerTransTime", log : 0, desc : "向服务器发送同步时钟信息"}, 
        reLogin                 : {id : 0x0108, type : 1, request : "auth.LoginRequest", response : "auth.LoginResponse", log : 0, desc : "重连"},
    },

    //角色模块
    M_Role : {
        module : "role",
        getRoleInfo         	: {id : 0x0201, type : 1, request : null, response : "role.RoleInfo", log : 0, desc : "获取角色信息"},
        handleGoldUpdate        : {id : 0x0202, type : 2, response : "int32", log : 0, desc : "金币数量更新"},
        handleGoldUpdate        : {id : 0x0202, type : 2, response : "int32", log : 0, desc : "金币数量更新"},
    },
}