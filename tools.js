
    // 时间格式化
    // date 为Date对象
    // formate 为格式化字符串，例如 %Y-%M-%D %h-%m-%s 依次为年，月，日，时，分，秒
    // 格式化参数可以自由组合，比如 %M %h %s 月，时，秒
    TimeFormate(date, formate) {
        if (typeof (formate) != "string") {
            return date.toString();
        }
        var str = formate;
        str = str.replace(/%Y/, date.getFullYear());
        str = str.replace(/%M/, date.getMonth() + 1);
        str = str.replace(/%D/, date.getDate());
        str = str.replace(/%h/, date.getHours());
        str = str.replace(/%m/, date.getMinutes());
        str = str.replace(/%s/, date.getSeconds());
        return str;
    },
	
    // 时间格式化
    // value：数值
    // formatTxt ：占位符
    // hideSecond 是否隐藏秒
    formatLeftTime(value, formatTxt, hideSecond) {
        formatTxt = formatTxt || ':';
        hideSecond = hideSecond || false;

        var hour = Math.floor(value / 3600)
        var min = Math.floor(value / 60 % 60)
        var sec = Math.floor(value % 60)

        var hour_str = (Array(2).join(0) + hour).slice(-2);
        var min_str = (Array(2).join(0) + min).slice(-2);
        var sec_str = (Array(2).join(0) + sec).slice(-2);

        if (hideSecond) {
            return hour_str + formatTxt + min_str;
        }
        if (hour <= 0) {
            return min_str + formatTxt + sec_str;
        }
        return hour_str + formatTxt + min_str + formatTxt + sec_str;
    },
	
    // 时间量化
    formatFullTime(value) {
        var day = Math.floor(value / 86400)
        var hour = Math.floor(value / 3600)
        var min = Math.floor(value / 60 % 60)
        var sec = Math.floor(value % 60)
        var str = "";
        if (day > 0) {
            str = day + "天"
        } else {
            if (hour > 0) {
                str = hour + "小时"
            } else {
                if (min > 0) {
                    str = min + "分钟"
                } else {
                    if (sec > 0) {
                        str = sec + "秒"
                    }
                }
            }
        }
        return str;
    },


    //获取文字缩略格式
    //str 原文
    //length  缩略格式的长度
    getShortString(str, length) {
        if(str == null) return "";
        var s_length = str.length;
        if (s_length > length) {
            var sShort = str.substr(0, length - 1)
            return sShort + "...";
        };
        return str;
    },