function generic<T>(data:T):T
{
    return data;
}

console.log(generic(10));
console.log(generic('govind'));
console.log(generic({name:"govind"}).name);