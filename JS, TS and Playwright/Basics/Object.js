let person = {
    firstName: 'govind',
    lastName: 'maddala',
    age: 24,
    fullName: function () {
        return this.firstName + " " + this.lastName
    }
}

console.log(person.fullName())  //govind maddala
console.log(person.firstName)   //govind
console.log(person['firstName'])    //govind
person.gender = 'male'
console.log(person.gender)  //male
delete person.gender
console.log(person.gender)   //undefined
console.log('firstName' in person)  //true

//printing each value

for (let key in person) {
    console.log(person[key])
}

/*
govind   
maddala
24
[Function: fullName]  'this is because of function'
*/