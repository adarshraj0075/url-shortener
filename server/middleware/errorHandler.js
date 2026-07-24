const errorHandler=(err,req,res,next)=>{
    console.error(err);
    res.status(err.statusCode).json({
        success:false,
        message:err.message || "internal server error",
        error:err.errors || undefined
    })
}

module.exports={errorHandler};