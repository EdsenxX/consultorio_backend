var express = require('express');
var router = express.Router();
const authControllers = require('../controllers/authControllers');

router
  .route("/login")
  .post(
    authControllers.authenticate,
    authControllers.generateToken,
    authControllers.sendToken
  );

router.route("/verify").post(
  authControllers.verifyJWT
)

module.exports = router;