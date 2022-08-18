const UserModel = require("../model/user.model");

exports.register = async (accountDetails) => {
  try {
    const registered = await UserModel.create({ ...accountDetails });
    if (!registered)
      return { error: "Account registration was not successful" };
    return { success: "Account created successfully" };
  } catch (error) {
    return { error: error };
  }
};
//check if user email already exist for another user
exports.emailExist = async (email) => {
  const exist = await UserModel.findOne({ email: email });
  if (exist)
    return true;
  return false;
}
//check if username already exist for another user
exports.usernameExist = async (username) => {
  const exist = await UserModel.findOne({ username: username });
  
  if (exist)
    return true;
  return false;
}