const mongoose = require('mongoose')

const connectionString=process.env.DATABASE
mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connected successfully....");
}).catch((err)=>{
    console.log(`connection failed...,${err}`);
})  