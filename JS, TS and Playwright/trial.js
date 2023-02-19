//"use strict";
const promp=require('prompt-sync');
const prompt=promp();

n=parseInt(prompt('enter the length of an array '));
let data=Array(n);
for(let i=0;i<n;i++)
{
    var num=parseInt(prompt('enter number '));
    data.push(num);
}

data.sort((a,b)=>b-a)
if(n==1)
{
    console.log(data[0]);
}
else if(n==0)
{
    return null;
}
else{
    console.log(data[1]);
}
