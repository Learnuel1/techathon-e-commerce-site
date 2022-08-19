const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { customError } = require("../middleware/error.middleware");
const UserModel = require("../model/user.model");
const { register, usernameExist, emailExist, logoutService } = require("../service/user.service");
const { Logger } = require("../utils/userlogs");

exports.registerAccount = async (req, res, next) => {
  try { 
    if (!req.body.username || !req.body.email || !req.body.password)
      return next(customError("username, password and email are required"))
    const isUsername = await usernameExist(req.body.username);
  
    if (isUsername)
      return next(customError("Username is not available"));
    const isEmail = await emailExist(req.body.email);
    if (isEmail)
      return next(customError("email is already in uses"))
    req.body.type = "User";
    const hashpasword = hashSync(req.body.password, 12);
    req.body.password = hashpasword;
    const user = await register(req.body);
    if (user.error)
      return next(customError(user.error,500));
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
exports.registerAdmin = async (req, res, next) => {
  try { 
    if (!req.body.username || !req.body.email || !req.body.password)
      return next(customError("username, password and email are required"))
    const isUsername = await usernameExist(req.body.username);
  
    if (isUsername)
      return next(customError("Username is not available"));
    const isEmail = await emailExist(req.body.email);
    if (isEmail)
      return next(customError("email is already in uses"))
    req.body.type = "Admin";
    const hashpasword = hashSync(req.body.password, 12);
    req.body.password = hashpasword;
    const user = await register(req.body);
    if (user.error)
      return next(customError(user.error), 500);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try{
    if (!req.body.username || !req.body.password)
      return next(customError("Password and Username are required"));
    const { username, password } = req.body;
    const userExist = await UserModel.findOne({ username: username });
    if (!userExist)
      return next(customError("Incorrect username or password",200));
    const verifyUser = compareSync(password, userExist.password);
    if (!verifyUser)
      return next(customError("Incorrect password"));
    if (userExist.status.toLowerCase() === "blocked")
      return next(customError("Account has been blocked",401));
    const user = {
      id: userExist._id,
      username: userExist.username,
      email: userExist.email,
      type: userExist.type,
      status:userExist.status,
      address:userExist.address,
    }
    //generate user token
    const secret = process.env.JWT_SECRET_TOKEN;
    const payload = { id: user.id, type: user.type,status:user.status };
    const token = sign(payload, secret, { expiresIn: "1h" });
    const refreshToken = sign(payload, secret, { expiresIn: "5d" });
    userExist.refreshToken = refreshToken;
    userExist.save();
    
  //log user activities
    //Logger.emit("login", {userid:user.id,description:"user logged in"});
    res.status(200).json({ success: "Login successful", user, token, refreshToken });
  }catch(error){
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userExist = await logoutService(req.body);
    if (userExist.error)
      return next(customError(user.error, 200));
    res.status(200).json(userExist);
  } catch (error) {
    next(error);
  }
}