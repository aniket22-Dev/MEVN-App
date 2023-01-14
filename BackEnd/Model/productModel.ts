const productMongoose = require('mongoose');

const schema = new productMongoose.Schema({
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
        type: String,
        default: ''
    }
});

const product = new productMongoose.model('Product', schema);

module.exports = product;