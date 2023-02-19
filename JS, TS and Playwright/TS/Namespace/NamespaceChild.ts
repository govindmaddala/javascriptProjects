/// <reference path="../Namespace/NamespaceParent.ts" />
namespace Namespace{
    export class Child extends Parent implements ParentType{
        getName()
        {
            return this.name;
        }

        directGetName()
        {
            return 'govind'
        }
    }
}

let nameSpace= new Namespace.Child();
nameSpace.setName('maddala');
console.log(nameSpace.getName());
console.log(nameSpace.directGetName());