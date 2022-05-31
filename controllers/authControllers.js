const jwt = require("jsonwebtoken");
const User = require("../models/users");

function authenticate(req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.verifyPassword(req.body.password).then((valid) => {
        if (valid) {
          req.user = user;
          next();
        } else {
          next(new Error("Invalid Credentials"));
        }
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function generateToken(req, res, next) {
  if (!req.user) return next();
  req.token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  next();
}

function sendToken(req, res) {
  if (req.user) {
    res.json({
      user: req.user,
      jwt: req.token,
    });
  } else {
    res.status(422).json({ error: "Could not create user" });
  }
}

async function verifyJWT(req, res) {
  if (jwt.verify(req.body.token, process.env.JWT_SECRET)) {
    const decodedToken = jwt.decode(req.body.token);
    const id = decodedToken.id;
    await User.findById(id)
      .then((user) => {
        let datoUser = { ...user._doc };
        delete datoUser["password"];
        return res.json({
          message: "JWT Valid",
          results: datoUser,
          status: 200,
        });
      })
      .catch((err) => {
        return res.json("Error al extraer usuario");
      });
  } else {
    return res.status(401).json("JWT no valido");
  }
}

module.exports = {
  authenticate,
  generateToken,
  sendToken,
  verifyJWT,
};
