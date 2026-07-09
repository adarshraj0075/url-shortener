const express = require("express");
const {connectDb}=require("./config/db");
const {router}=require("./routes/urlRoutes")
const dotenv=require("dotenv")
const app=express();

connectDb()

app.use(express.json());

app.use("/",router);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})