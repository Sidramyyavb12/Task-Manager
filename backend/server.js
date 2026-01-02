const express=require('express');

const app=express();

const PORT=3000;

app.get('/',(req,res)=>{
    res.send("siddu");
})
app.listen(PORT,()=>{
    console.log(`the app is listening at ${PORT}`)
})