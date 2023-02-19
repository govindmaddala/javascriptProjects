let day = 'thursday'
console.log(day.length) //8
console.log(day.slice(0, 4)) //thur
console.log(day[0])  //t
console.log(day.split('s')) //[ 'thur', 'day' ]


let a = '21'
let b = '27'
let diff = b - a
console.log(diff)
diff.toString()
console.log(typeof (diff))
console.log(day.indexOf("day"))  //5 for both d and day

line = "every day is funday"
console.log(line.indexOf("day", 7))  //16

console.log(line.indexOf("xay", 7)) //-1

var count = 0
var val = line.indexOf("day")

while (val != -1) {
    count++
    val = line.indexOf("day", val + 1)
}
console.log(count)


