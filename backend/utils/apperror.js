class AppError extends Error {
    //the constructor 
    constructor (message , statusCode){
        //call the parent error constructor
        super(message);
        console.log(message);
        
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : 'error';
        //for operational error
        this.isOperational = true;
        //capture the stack trace
        Error.captureStackTrace(this , this.constructor);
    }
}

module.exports = AppError;