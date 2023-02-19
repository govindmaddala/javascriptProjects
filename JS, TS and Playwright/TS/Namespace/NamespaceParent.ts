namespace Namespace{
    export class Parent{
        name:string;
        setName(name:string)
        {
            this.name=name;
        }
    }

    export interface ParentType{
        getName():string;
    }
}