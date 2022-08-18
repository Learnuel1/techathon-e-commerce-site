const { Schema, model } = require("mongoose");

const UserLogSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  description: {
    type: String, required: true
  }
}, { timestamps: true });

const UserlogModel =  model ("userlog", UserLogSchema);
module.exports = UserlogModel;