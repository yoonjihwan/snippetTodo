const util = {
    makeKey : function() {
        var result           = '';
        var chars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charsLength = chars.length;
        for ( var i = 0; i < 7; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
        }
        return result;
    },
    getDateFormat : function(date) {
        if(typeof date === 'object' && date instanceof Date) return date.format8n();
        else if(typeof date === 'string' && date.length == 8) return date;
        else return null;
    }
}

export default util

Date.prototype.format8n = function() {
    let date = this;
    return date.getFullYear() + (date.getMonth() + 1).zf(2) + date.getDate().zf(2);
}

// zero-fill
Number.prototype.zf = function (len) {
    var s = String(this), c = '0';
    len = len || 2;
    while (s.length < len) s = c + s;
    return s;
}

