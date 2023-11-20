const userjwt = require("jsonwebtoken");
const userJwtModel = require("../Model/userModel");
const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        userjwt.verify(req.headers.authorization.split(' ')[1], "HSJSIJSMXSPPQQKOOKDAMCKN", function (err, decode) {
            if (err)
                req.user = undefined;
            userJwtModel.findOne({
                _id: decode.id
            })
                .exec((err, user) => {
                if (err) {
                    res.status(500)
                        .send({
                        message: err
                    });
                }
                else {
                    req.user = user;
                    next();
                }
            });
        });
    }
    else {
        req.user = undefined;
        next();
    }
};
module.exports = verifyToken;
