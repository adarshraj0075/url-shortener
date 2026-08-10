const mongoose=require("mongoose");
const { minLength, maxLength, email, lowercase } = require("zod");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        minLength:2,
        maxLength:50
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
        minLength:8
    },
    role:{
        type:String,
        require:true,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    lastLoginAt:{
        type:Date,
        default:null
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema);

module.exports={User}