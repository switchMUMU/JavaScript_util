let viewManager = require('ViewManager')
let md5 = require('md5')
cc.Class({
    extends: cc.Component,
    ctor: function () {

    },

    properties: {

    },

    convertParams: function (data) {
        let rs = "";
        let list = Object.keys(data)

        list.forEach(function (element, index, array) {
            rs = rs + element + "=" + data[element] + "&";
        });
        rs = rs.substr(0, rs.length - 1);
        return rs
    },
// is_show 是否显示菊花
    post: function (url, params, callBack, is_show) { 
        cc.log("Http post")
        is_show = is_show || false;
        if (is_show) viewManager.showRequest();
        if (!params.pid) {
            params.pid = Global.GameConfig.PID;
        }
        if (!params.channelId) {
            params.channelId = Global.GameConfig.CHANNEL_ID;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.onreadystatechange = function () {
            if (is_show) viewManager.hideRequest();
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let msg = JSON.parse(response);
                if (typeof (callBack) == "function") {
                    callBack(msg);
                }
            }
        };
        let content = this.getSign(params);
        // cc.log("url:", url);
        // cc.log("content:", content);
        xhr.send(content);
    },

    get: function (url, params, callBack, is_show) {
        cc.log("Http get")
        is_show = is_show || false;
        if (is_show) viewManager.showRequest();
        if (!params.pid) {
            params.pid = Global.GameConfig.PID;
        }
        if (!params.channelId) {
            params.channelId = Global.GameConfig.CHANNEL_ID;
        }
        var xhr = new XMLHttpRequest();
        let content = this.convertParams(params);
        // cc.log("content:", content);

        url = url + "?" + content;
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.onreadystatechange = function () {
            if (is_show) viewManager.hideRequest();
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                // cc.log(response)
                let msg = JSON.parse(response);
                if (typeof (callBack) == "function") {
                    callBack(msg);
                }
            }
        };
        xhr.send();
    },
    // 获取签名
    getSign: function (params) {
        var token = LoginCtrl._login_model.token || "";
        var body = "";
        if (token && token != "") {
            if (params) {
                if (!params.accounts || params.accounts == "") {
                    params.accounts = LoginCtrl._login_model.getAccountName();
                }
            }
            var keys = Object.keys(params);
            keys.sort(function (a, b) {
                return a > b;
            });
            var tmp = {};
            keys.forEach(function (key) {
                tmp[key] = params[key];
            });
            let content = this.convertParams(tmp);
            var sign = md5(content + token);
            return body = "sign=" + sign + "&" + content;
        }
    },

});