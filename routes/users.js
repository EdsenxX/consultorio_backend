var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/userControllers');

router.route("/").post(usersControllers.create).get(usersControllers.getAll);

module.exports = router;
