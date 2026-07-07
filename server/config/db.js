const mongoose=require("mongoose");
const dotevn=require("dotenv");

dotevn.config();

const connectDb=async ()=>{
    const user=process.env.MONGO_USER;
    const pass=process.env.MONGO_PASS;
    const port=process.env.MONGO_PORT;
    const db=process.env.MONGO_DB;

    const URI=`mongodb://${user}:${pass}@localhost:${port}/${db}?authSource=admin`;

    try {
        await mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log("mongo connected sucessfully")
    } catch (error) {
        console.error(`the error is ${error.message}`)
        process.exit(1);
    }
}

module.exports={connectDb};