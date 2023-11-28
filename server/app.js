const express= require('express');
const app=express();
const mongoose=require('mongoose');
const PORT=8000;
const {MONGO_URL}=require('./keys');
const cors=require('cors');
const bodyParser = require("body-parser");

app.use
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));

const router= require('./routes/auth')
const router2=require('./routes/post')
app.use(require('./routes/user'))

app.use(router);
app.use(router2);



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