const express = require("express");
const {connectDb}=require("./config/db");
const {router}=require("./routes/routes")
const dotenv=require("dotenv")
const app=express();
const {errorHandler}=require("./middleware/errorHandler");

connectDb()

app.use(express.json());

app.use("/",router);

app.use(errorHandler);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})