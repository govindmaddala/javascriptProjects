class Parent
{
    name:string;
    setName(name:string)
    {
        this.name=name;
    }
}

class Child extends Parent
{
    getName()
    {
        return this.name;
    }
}

let obj=new Child();
obj.setName('Govind')
console.log(obj.getName());
