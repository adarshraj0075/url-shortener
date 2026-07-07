const express = require("express");
const {connectDb}=require("./config/db");
const {router}=require("./routes/urlRoutes")
const app=express();

connectDb()

app.use(express.json());

app.use("/",router);

app.listen(3000,()=>{
    console.log("server running on port 3000");
})