class Class{
    a=10;
    b:number;
    c:number;
    constructor(d:number)
    {
        this.c=d;
    }
    add():number
    {
        return this.b?this.a+this.b+this.c:this.a+this.c;
    }
}

let obj1=new Class(4)
const ans=obj1.add();
console.log(ans);