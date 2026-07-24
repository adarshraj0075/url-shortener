const {AppError}=require("./AppError");

class NotFoundError extends AppError{
    constructor(message="Resourse not found"){
        super(message,404)
    }
}

module.exports=NotFoundError