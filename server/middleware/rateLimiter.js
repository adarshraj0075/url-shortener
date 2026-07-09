const {client}=require("../cache/redisCache");
const rateLimit=require("express-rate-limit");
const {RedisStore}=require("rate-limit-redis");

const rateLimiter=rateLimit({
    windowMs:60*1000, //1minute
    max:10, //max 10 req in minute
    standardHeaders:true,
    legacyHeaders:false,
    store:new RedisStore({
        sendCommand:(...args)=>client.sendCommand(args)
    }),
    message:{
        status:429,
        message:"too many request",
    }
})

module.exports={rateLimiter};