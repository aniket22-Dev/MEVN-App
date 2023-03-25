const userApp = require("express");
const userRouter = userApp.Router(),
{
    signup,
    signin
} = require('../Controller/auth.controller.ts');
const token = require("../Middlewares/authJWT");

userRouter.post("/register", signup, function(req: any,res: any){

});

//test commit
userRouter.post("/login", signin, function (req: any,res: any) {

});

userRouter.get("/hiddencontent", token, function (req: any, res: any) {
    if (!req.user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    if (req.user == "admin") {
      res.status(200)
        .send({
          message: "Congratulations! but there is no hidden content"
        });
    } else {
      res.status(403)
        .send({
          message: "Unauthorised access"
        });
    }
  });

module.exports = userRouter;