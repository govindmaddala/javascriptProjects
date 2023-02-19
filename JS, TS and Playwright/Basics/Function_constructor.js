var fun = new Function("a,b","return a*b");

console.log(fun(2,2));

var func = new Function("a,b","{c = a*b*4; return c}");

console.log(func(2,2));