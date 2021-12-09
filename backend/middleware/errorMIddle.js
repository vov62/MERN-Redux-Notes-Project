// Error Handlers

// if we are requesting api route that doesn't exists  
const notFound = (req, res, nex) => {
    // its will give us this error not found and the  requested url
    const error = new Error(`Not Found -${req.originalUrl}`);
    // then its going to throw an error 
    res.status(404);
    //then move on 
    next(error);
};


//error handler for general errors 
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}

module.exports = { notFound, errorHandler }