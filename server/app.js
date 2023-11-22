const express= require('express');
const app=express();
const mongoose=require('mongoose');
const PORT=8000;
const {MONGO_URL}=require('./keys');

const router= require('./routes/auth')
// const user= require('./model/user')
// require('./model/user')
app.use(router);
// app.use(user);


mongoose.connect(MONGO_URL,{
useNewUrlParser:true,
useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err);
})
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`server is running on the ${PORT}`);
})
app.get("/",(req,res)=>{
    res.send("bhoomi");
})