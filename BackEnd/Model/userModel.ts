const userMongoose = require('mongoose');

const userSchema = new userMongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = userMongoose.model('User',userSchema)