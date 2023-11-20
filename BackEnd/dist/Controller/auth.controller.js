var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
exports.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        yield user.save();
        res.status(200).send({
            message: "User Registered successfully",
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while registering the user.",
        });
    }
});
exports.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                message: "User Not found.",
            });
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        const token = jwt.sign({
            id: user.id,
        }, "HSJSIJSMXSPPQQKOOKDAMCKN", //JWT
        {
            expiresIn: 86400,
        });
        res.status(200).send({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            message: "Login successful",
            accessToken: token,
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while signing in.",
        });
    }
});
