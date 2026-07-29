const apiResponce={
    success(data,message){
        return{
            success:true,
            message,
            data
        }
    }
}

module.exports=apiResponce