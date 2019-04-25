/*字典 Dictionary类*/
var Dictionary = module.exports = function () {
    // this.add = add;
    this.datastore = new Array();
    // this.find = find;
    // this.remove = remove;
    // this.showAll = showAll;
    // this.count = count;
    // this.clear = clear;
}


Dictionary.prototype = {

    constructor: Dictionary,

    add: function (key, value) {
        this.datastore[key] = value;
    },

    find: function (key) {
        return this.datastore[key];
    },

    remove: function (key) {
        delete this.datastore[key];
    },

    showAll: function () {
        var str = "";
        for (var key in this.datastore) {
            str += key + " -> " + this.datastore[key] + ";  "
        }
        console.log(str);
    },

    count: function () {
        /*var ss = Object.keys(this.datastore).length;
        console.log("ssss   "+ss);
        return Object.keys(this.datastore).length;*/
        /**/
        var n = 0;
        for (var key in Object.keys(this.datastore)) {
            ++n;
        }
        console.log(n);
        return n;
    },

    clear: function () {
        for (var key in this.datastore) {
            delete this.datastore[key];
        }
    }
};