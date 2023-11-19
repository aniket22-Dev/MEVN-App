const mongoose = require("mongoose");

const dummyProductSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  productName: {
    type: String,
    required: false,
    unique: false,
  },
  productPrice: {
    type: String,
    default: "",
  },
  productImage: {
    type: String,
  },
});

const DummyProduct = mongoose.model("DummyProduct", dummyProductSchema);

module.exports = DummyProduct;
