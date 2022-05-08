var express = require('express');
var router = express.Router();
const citasControllers = require('../controllers/citasControllers');

router.route("/")
    .get(citasControllers.getAllByActualDay)
    .post(citasControllers.create);

router.route("/:id")
    .get(citasControllers.getCita)
    .put(citasControllers.updateCita);

module.exports = router;