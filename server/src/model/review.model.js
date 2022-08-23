const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  productid: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  like: {
    type: Number
  },
  desc: {
    type: String,
    index: true
  }
}, { timestamps: true });

const ReviewModel = model("review", ReviewSchema);

module.exports = ReviewModel;
