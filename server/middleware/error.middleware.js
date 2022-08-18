
exports.notFound = async (req, res, next) => {
const err = new Error("Route Not Found");
err.status = 404;
next(err);
};
exports.customError =(msg="Incompleted data field supplied", status = 400) => {
  const err = new Error(msg);
  err.status = status;
  return err;
}
exports.errorHandler = async (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({error:err.message || "Unknow error"});
};
