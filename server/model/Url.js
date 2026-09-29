const mongoose=require("mongoose");

const urlSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    longUrl:{type:String,required:true},
    shortId:{type:String,required:true,unique:true},
    clicks:{type:Number,default:0}

});

const Url = mongoose.model("Url", urlSchema);

module.exports = { Url };
