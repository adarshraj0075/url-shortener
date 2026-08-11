const bcrypt=require("bcrypt")
const {User}=require("../model/userSchema")
const ConflictError=require("../utils/errors/ConflictError")

exports.register=async({email,name,password})=>{
    const existingUser=await User.findOne({email});

    if(existingUser){
        throw new ConflictError("Email already registered");
    }

    const hashedPassword=await bcrypt.hash(password,12);
    
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    const data={
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
    
    return data
}