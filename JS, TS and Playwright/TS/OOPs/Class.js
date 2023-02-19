var Class = /** @class */ (function () {
    function Class(d) {
        this.a = 10;
        this.c = d;
    }
    Class.prototype.add = function () {
        return this.b ? this.a + this.b + this.c : this.a + this.c;
    };
    return Class;
}());
var obj1 = new Class(4);
var ans = obj1.add();
console.log(ans);
