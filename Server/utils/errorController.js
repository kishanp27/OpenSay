// As we specify the "error" parameter, express app will automatically recognize it as a global error handler

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";


  // console.log(message);

  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};

export default globalErrorHandler;
