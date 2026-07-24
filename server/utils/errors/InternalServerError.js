const { AppError } = require("./AppError");

class internalServerError extends AppError{
    constructor(message="internal server error"){
        super(message,500);
    }
}

module.exports=internalServerError