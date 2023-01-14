const productMongoose = require('mongoose');

const schema = new productMongoose.Schema({
    productId: {
        type: String
    },
    productName: {
        type: String,
        required: false,
        unique: false
    },
    productPrice: {
        type: String,
        default: ''
    },
    ProductImage: {
        type: String
    }
});

const product = new productMongoose.model('Product', schema);

module.exports = product;