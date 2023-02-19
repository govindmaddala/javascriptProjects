require('dotenv').config({path:'./configurations/.env'});
const express = require('express');
const app = require('./app');
const connectDB = require('./configurations/database');
const errorHandling = require('./middleware/ErrorHandling');
const product = require('./routes/productRoute');
const User = require('./routes/UserRoute');
const Order = require('./routes/OrderRoute')

process.on('uncaughtException',(err)=>{
    console.log(`message: ${err.message}`);
    console.log(`Server is stopped`);
    process.exit(1)
})

connectDB();


app.use('/api/v1/products',product)
app.use('/api/v1/users',User)
app.use('/api/v1/orders',Order)

app.use(errorHandling);

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is active on ${process.env.PORT}`);
});

process.on('unhandledRejection',(err)=>{
    console.log(`message: ${err.message}`);
    server.close(()=>{
        console.log(`Server is stopped`);
        process.exit(1)
    })
})

