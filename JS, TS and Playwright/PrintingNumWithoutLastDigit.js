a=123456789
b=[]

while (a != 0){
    console.log(a);
    b.push(a)
    a= Math.floor(a/10)
}

len = b.length
for(i=(len-1);i>=0;i--){
    console.log(b[i]);
}