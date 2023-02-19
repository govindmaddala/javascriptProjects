export {}
function add(a:any,b:any)
{
    if(typeof(a)==='number' && typeof(b)==='number')
    {
        return a+b;
    }
    else{
        return +a + +b;
    }
    
}

console.log(add(1,22));
