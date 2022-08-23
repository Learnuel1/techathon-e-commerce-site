const { Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true,
    enum: ["Phone", "Laptop", "Computer", "Desktop", "Monitor", "Hard Disk", "Camera"]
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, { timestamps: true });

const ProductModel = model("product", ProductSchema);

module.exports = ProductModel;
