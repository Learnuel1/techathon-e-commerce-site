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
};

exports.logoutService = async (data) => {
  try {
    const user = await UserModel.findById(data.id);
    if (!user)
      return { error: "User Not found" };
    if (user.refreshToken === "none")
      return { error: "User is already logged out" };
    user.refreshToken = "none";
    user.save();
   
    return { success: "User logged out successfully"};
  } catch (error) {
    return { error: error };
   }
}