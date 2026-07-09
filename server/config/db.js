const mongoose=require("mongoose");
const dotevn=require("dotenv");

dotevn.config();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const connectDb=async (retryCount=0)=>{
    const user=process.env.MONGO_USER;
    const pass=process.env.MONGO_PASS;
    const host=process.env.MONGO_HOST || "127.0.0.1";
    const port=process.env.MONGO_PORT || 27017;
    const db=process.env.MONGO_DB;

    const URI=`mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;

    try {
        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("mongo connected sucessfully")
    } catch (error) {
        const maxRetries = 8;
        if (retryCount < maxRetries) {
            console.warn(`MongoDB not ready yet at ${host}:${port}. Retrying in 2 seconds...`);
            await sleep(2000);
            return connectDb(retryCount + 1);
        }

        console.error(`MongoDB connection failed after ${maxRetries + 1} attempts: ${error.message}`);
        console.warn("Continuing without MongoDB. Start MongoDB and restart the server to enable database features.");
    }
}

module.exports={connectDb};