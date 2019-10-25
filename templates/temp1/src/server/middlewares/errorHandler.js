export default (app) => {
  // global error handler
  app.use((err, req, res, next) => {
    if (!err) {
      next();
      return;
    }
    const error = {
      error: {
        code: err.code,
        message: err.message,
        exception: err.response,
      },
    };
    if (err.explanation) {
      error.explanation = err.explanation;
    }
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  });
};
