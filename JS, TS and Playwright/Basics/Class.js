module.exports = class Person {
    firstName = 'govind'
    lastName = 'maddala'
    get age() {
        return 26
    }

    constructor(college, degree) {
        this.school = college
        this.degree = degree
    }
    fullName() {
        return this.degree + " in " + this.school
    }
}

//object
// obj = new Person('male', 5.6)
// console.log(obj.school)
// console.log(obj.degree)
// obj.firstName = 'ram'
// console.log(obj.firstName)