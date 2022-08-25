const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { customError } = require("../middleware/error.middleware");
const UserModel = require("../model/user.model");
const { register, usernameExist, emailExist, logoutService } = require("../service/user.service");
const { ApiError } = require("../utils/apiError"); 
const { buildUser, buildResponse } = require("../utils/responder");

exports.registerAccount = async (req, res, next) => {
  try { 
    if (!req.body.username || !req.body.email || !req.body.password)
      return next(ApiError.badRequest("username, password and email are required"))
    const isUsername = await usernameExist(req.body.username);
  
    if (isUsername)
      return next(ApiError.badRequest("Username is not available"));
    const isEmail = await emailExist(req.body.email);
    if (isEmail)
      return next(ApiError.badRequest("email is already in uses"))
    req.body.type = "User";
    const hashpasword = hashSync(req.body.password, 12);
    req.body.password = hashpasword;
    const user = await register(req.body);
    if (user.error)
      return next(ApiError.customEror(user.error));
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
exports.registerAdmin = async (req, res, next) => {
  try { 
    if (!req.body.username || !req.body.email || !req.body.password)
      return next(ApiError.badRequest("username, password and email are required"))
    const isUsername = await usernameExist(req.body.username);
  
    if (isUsername)
      return next(ApiError.badRequest("Username is not available"));
    const isEmail = await emailExist(req.body.email);
    if (isEmail)
      return next(ApiError.badRequest("email is already in uses"))
    req.body.type = "Admin";
    const hashpasword = hashSync(req.body.password, 12);
    req.body.password = hashpasword;
    const user = await register(req.body);
    if (user.error)
      return next(ApiError.customEror(user.error));
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try{
    if (!req.body.username || !req.body.password)
      return next(ApiError.badRequest("Password and Username are required"));
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user)
      return next(ApiError.customEror("Incorrect username or password",200));
    const verifyUser = compareSync(password, user.password);
    if (!verifyUser)
      return next(customError("Incorrect password"));
    if (user.status.toLowerCase() === "blocked")
      return next(ApiError.unathorized("Account has been blocked"));
    
    //generate user token
    const secret = process.env.JWT_SECRET_TOKEN;
    const payload = { id: user.id, type: user.type,status:user.status };
    const token = sign(payload, secret, { expiresIn: "1h" });
    const refreshToken = sign(payload, secret, { expiresIn: "5d" });
    user.refreshToken = refreshToken;
    user.save();
    const data = buildUser(user.toObject());
    
    
    res.status(200).json( buildResponse("Loging successfull",data,"user",{token,refreshToken}));
  }catch(error){
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userExist = await logoutService(req.body);
    if (userExist.error)
      return next(ApiError.customEror(user.error, 204));
    res.status(200).json(userExist);
  } catch (error) {
    next(error);
  }
}