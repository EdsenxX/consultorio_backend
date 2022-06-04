// Dependencies
var express = require("express");
var router = express.Router();
// Controllers
const doctorControllers = require("../controllers/doctorControllers");

router.route("/").get(doctorControllers.getAll).post(doctorControllers.add);

module.exports = router;
