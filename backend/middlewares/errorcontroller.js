const appError = require('../utils/apperror')

const handleCastError = err =>{
    const message = `invalid ${err.path} : ${err.value}`
    return new appError(message , 400)
}

const handleDuplicateFields = err =>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field : ${value} please use another value`
    return new appError (message , 400)
}

const handleVlidation = err =>{
    const message = 'invalid input data'
    return new appError(message, 400)
}
const sendErrorDev = (err, res) =>{
    res.status(err.statusCode).json({
        status : err.status,
        error : err,
        message : err.message,
        stack : err.stack
    })
}

const sendErrorProd = (err, res) =>{
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message,
        }) 
    } else {
        res.status(500).json({
            status : 'fail',
            message : 'something wenwt wrong'
        })
    }
}
module.exports = ((err, req, res , next) =>{
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV == "developpment"){        
        sendErrorDev(err, res)
    }else if (process.send.NODE_ENV == "production"){
        let error = err
        if (error.name == 'CastError') {
            handleCastError(error)
        }
        if ( error.code == 11000) {
            error = handleDuplicateFields(error)
            
        }

        if (err.name == 'ValidatorError:') {
            error = handleVlidation()
        }
        sendErrorProd(error, res)
    }
    
})

