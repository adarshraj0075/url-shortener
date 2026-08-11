const authService=require("../service/authService");
const apiResponce=require("../utils/apiResponse")

async function register(req,res){
    const data=await authService.register(req.body);

    return res.status(201).json(
        apiResponce.success(data,"user registered")
    )
}

module.exports={register};