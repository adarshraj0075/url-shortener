const authService=require("../service/authService");
const apiResponce=require("../utils/apiResponse")

async function register(req,res){
    const data=await authService.register(req.body);

    return res.status(201).json(
        apiResponce.success(data,"user registered")
    )
}

async function login(req,res) {
    const data=await authService.login(req.body);

    res.cookie("sessionId",data.sessionId,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    return res.status(201).json(
        apiResponce.success(data.user,"Login sucess")
    )
}

module.exports={register,login};