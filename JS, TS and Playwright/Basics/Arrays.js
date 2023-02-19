names = ['govind', 'rajesh', 'ganesh', 'aravind']
marks = new Array(4)
marks = [10, 20, 30, 40]
age = Array(4)
console.log(names[0])  //govind 
console.log(names[1])   //rajesh 
console.log(names[2])   //ganesh 
console.log(names[3])  //aravind
console.log(names[4])  //undefined
names.push('Akhil')
console.log(names[4])  //Akhil
console.log(names.length)  //5
names[4] = 'akhil'
console.log(names[4])   //akhil
names.pop() //delete last element 
console.log(names[4])  //undefined

names.unshift("maddala")
console.log(names[0])  //govind 
console.log(names[1])   //rajesh 
console.log(names[2])   //ganesh 
console.log(names[3])  //aravind
console.log(names[4])
console.log("total array is " + [names])


console.log(names.indexOf('aravind'))

console.log(names.includes('rajesh')) //contains or not

//sub-array
sub = names.slice(0, 2)
console.log(sub)
console.log(sub.length)

//iteration

for (i = 0; i < names.length; i++) {
    console.log(names[i])
}

sum = 0
for (i = 0; i < marks.length; i++) {
    sum = sum + marks[i]
}
console.log(sum)


total = marks.reduce((ind, cumm) => ind + cumm, 0)
console.log(total)

evenArray = []
b = [1, 2, 3, 4, 5, 6, 7]
for (i = 0; i < b.length; i++) {
    if (b[i] % 2 == 0) {
        evenArray.push(b[i])
    }
}
console.log(evenArray)

console.log("using filter")

filterEvenArr = b.filter(i => i % 2 == 0)
console.log(filterEvenArr)
console.log(b.filter(i => i % 2 == 0))

mapArr = filterEvenArr.map(i => i * 3)
console.log(mapArr)


console.log("reduce,filter and map at single shot")
//reduce,filter and map at single shot
c = [1, 2, 3, 4, 5, 6, 7, 8]
//filter even num, multiply each by 3 and add them
final = c.filter(i => i % 2 == 0).map(i => i * 3).reduce((ind, cum) => ind + cum, 0)
console.log(final)

//[2,4,6,8]*3=[6,12,18,24]=[6+12+18+24]=60


//Sorting

arr = ['boy', 'app', 'sit', 'zee', 'apple', 'bbb']
console.log(arr.sort())  //[ 'app', 'apple', 'bbb', 'boy', 'sit', 'zee' ]
console.log(arr.sort().reverse()) //[ 'zee', 'sit', 'boy', 'bbb', 'apple', 'app' ]

num = [11, 2, 15, 45, 34, 50]
console.log(num.sort())  //[ 11, 15, 2, 34, 45, 50 ]

num1 = [11, 2, 3, 15, 45, 34, 50, 5, 55, 6, 65, 7, 77, 8, 88]
console.log(num1.sort())  //[11, 15, 2, 3, 34, 45,5, 50, 55, 6, 65, 7,77, 8, 88]

console.log(num1.sort((a, b) => a - b)) //[2, 3, 5, 6, 7, 8,11, 15, 34, 45, 50, 55,65, 77, 88]

console.log(num1.sort((a, b) => b - a)) //[88, 77, 65, 55, 50, 45,34, 15, 11, 8, 7, 6,5, 3, 2]
