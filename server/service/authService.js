const bcrypt=require("bcrypt")
const crypto=require("node:crypto")
const {client}=require("../cache/redisCache")
const {User}=require("../model/userSchema")
const ConflictError=require("../utils/errors/ConflictError");
const UnauthorizedError=require("../utils/errors/UnauthorizedError")

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

exports.login=async({email,password})=>{
    const user=await User.findOne({email});
    if(!user) throw new UnauthorizedError("Invalid email or password");
    
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(!passwordMatch) throw new UnauthorizedError("Invalid email or password");

    const sessionId=crypto.randomBytes(32).toString("hex");

    await client.set(
        `session:${sessionId}`,user._id.toString(),{
            EX:60*60*24*7
        }
    )

    await client.sAdd(`userSession:${user._id}`,sessionId);

    user.lastLoginAt=new Date();

    await user.save()

    return{
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
        sessionId
    }
}