const { success } = require("zod");

const validate=(schema,target="body")=>{
    return (req,res,next)=>{
        const allowedTarget=["body","query","params"];
        if(!allowedTarget.includes(target)){
            return res.status(400).json({
                success:false,
                msg:"invalid validation target"
            })
        }
        const data=req[target]
        const result=schema.safeParse(data)
        if(!result.success){
            return res.status(400).json({
                success:false,
                msg:"Validation Error",
                errors:result.error.issues.map(issue=>({
                    fields:issue.path.join("."),
                    message:issue.message
                }))
            })
        }
        req[target]=result.data
        next()
    }
}

module.exports={validate}