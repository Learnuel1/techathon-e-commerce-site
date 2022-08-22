const { verify } = require("jsonwebtoken");
const { ApiError } = require("../utils/apiError");
const { customError } = require("./error.middleware");

exports.userRequired = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return next(ApiError.unauthorized("Authorization is required"));
    const token = authorization.split("")[1];
    const payload = verify(token, process.env.JWT_SECRET_TOKEN);
    if (!payload)
      return next(ApiError.customEror("Token expired"), 401);
    if (payload.status.toLowerCase() === "blocked")
      return next(ApiError.customEror("user account has be blocked"), 401);
    req.body.id = payload.id;
    req.body.type = payload.type;
    req.body.status = payload.status;

    next();
  } catch (error) {
    let err = error;
    if (err.name === "TokenExpiredError") { 
       next(customError("Token Expired",400));
   } 
    next(error);
  }
};

exports.adminRequired = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return next(ApiError.unauthorized ("Authorization is required"));
    const token = authorization.split("")[1];
    const payload = verify(token, process.env.JWT_SECRET_TOKEN);
    if (!payload)
      return next(ApiError.customEror("Token expired"), 401);
    if (payload.status.toLowerCase() === "blocked")
      return next(ApiError.customEror("user account has been blocked"), 401);
    if (payload.type.toLowerCase() !== "admin")
      return next(ApiError.unauthorized("Access Denied"));
    req.body.id = payload.id;
    req.body.type = payload.type;
    req.body.status = payload.status;
    next();
  } catch (error) {
    next(error);
  }
}