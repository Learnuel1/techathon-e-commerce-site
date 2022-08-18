const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { customError } = require("../middleware/error.middleware");
const UserModel = require("../model/user.model");
const { register, usernameExist, emailExist } = require("../service/user.service");
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
    req.body.type = "user";
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
      return next(customError("Incorrect username or password"));
    const verifyUser = compareSync(password, userExist.password);
    if (!verifyUser)
      return next(customError("Incorrect password"));
    const user = {
      id: userExist._id,
      username: userExist.username,
      email: userExist.email,
      type: userExist.type,
      address:userExist.address,
    }
    //generate user token
    const secret = process.env.JWT_SECRET_TOKEN;
    const payload = { id: user.id, type: user.type };
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
}