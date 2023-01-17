const userjwt = require("jsonwebtoken");
const userJwtModel = require("../Model/userModel");

const verifyToken = (req: any, res: any, next: any) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    userjwt.verify(req.headers.authorization.split(' ')[1],"HSJSIJSMXSPPQQKOOKDAMCKN", function (err: any, decode: any) {
      if (err) req.user = undefined;
      userJwtModel.findOne({
          _id: decode.id
        })
        .exec((err: any, user: any) => {
          if (err) {
            res.status(500)
              .send({
                message: err
              });
          } else {
            req.user = user;
            next();
          }
        })
    });
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;