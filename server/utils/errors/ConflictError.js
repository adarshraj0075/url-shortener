const { AppError } = require("./AppError")

class conflictError extends AppError{
    constructor(message="conflict"){
        super(message,409)
    }
}

module.exports=conflictError