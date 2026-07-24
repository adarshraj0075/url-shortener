class ForbiddenError extends AppError{
    constructor(message="forbidden"){
        super(message,"403")
    }
}

module.exports=ForbiddenError