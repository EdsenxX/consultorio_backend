var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/usersControllers');

router.route("/").post(usersControllers.create);

module.exports = router;
