const alma = require('./Class')

class Register extends alma {
    constructor(colleg, degre, Loca) {
        super(colleg, degre)
        this.location = Loca
    }
    tot = super.age
}

obj = new Register('Narayana', 'Inter', 'Akp')
console.log(obj.fullName())
console.log(obj.location)
//super(age) = 30
console.log(obj.tot)
console.log(obj.age)