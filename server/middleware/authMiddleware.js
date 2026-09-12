const UnauthorizedError=require("../utils/errors/UnauthorizedError");
const {client}=require("../cache/redisCache")

async function authMiddleware(req,res,next){
    const {sessionId}=req.cookies
    if(!sessionId) throw new UnauthorizedError("authentication required");

    const userId=await client.get(`session:${sessionId}`);
    if(!userId) throw new UnauthorizedError("invalid or expired session");

    req.user={id:userId};

    next();

}

module.exports={authMiddleware}