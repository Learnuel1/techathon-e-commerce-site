const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String, enum: ["Admin", "user"],
  required: true
  },
  address: {
    type: String,
    default: "none"
  },
  refreshToken: {
    type: String,
    required: true,
    default:"none"
  }
},{timestamps:true})

const UserModel = model("user", UserSchema);

module.exports = UserModel;