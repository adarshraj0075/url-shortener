const {z, email}=require("zod");

const registerSchema=z.object({
    name:z.string().min(2).max(50),
    email:z.string().email(),
    password:z.string().min(8)
})

module.exports={registerSchema};