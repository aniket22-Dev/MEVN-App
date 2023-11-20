const dummyMongoose = require("mongoose");

const dummyProductSchema = new dummyMongoose.Schema({
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

const DummyProduct = dummyMongoose.model("DummyProduct", dummyProductSchema);

module.exports = DummyProduct;
