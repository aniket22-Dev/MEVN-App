const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/userModel");

exports.signup = async (
  req: { body: { name: any; email: any; password: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: any }): void; new (): any };
    };
  }
) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    res.status(200).send({
      message: "User Registered successfully",
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Some error occurred while registering the user.",
    });
  }
};

exports.signin = async (
  req: { body: { email: any; password: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: {
        (arg0: {
          message: any;
          accessToken?: any;
          user?: { id: any; email: any; name: any };
        }): void;
        new (): any;
      };
    };
  }
) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "HSJSIJSMXSPPQQKOOKDAMCKN",
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Some error occurred while signing in.",
    });
  }
};
