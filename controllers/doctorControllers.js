const Doctor = require("../models/doctor");
const paramsBuilder = require("../utils/paramsBuilder");

const validParams = ["firstName", "lastName", "consultorio"];

const getAll = (req, res) => {
  Doctor.find()
    .then((doctors) => {
      res.status(200).json({
        message: "Doctors retrieved",
        doctors: doctors,
        status: {
          code: 200,
          message: "OK",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving doctors`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

const add = (req, res) => {
  const params = paramsBuilder(validParams, req.body);
  Doctor.create(params)
    .then(() => {
      console.log("Doctor created");
      res.status(200).json({
        message: "Doctor created",
        status: {
          code: 202,
          message: "Accepted",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error creating doctor`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

module.exports = {
  getAll,
  add,
};
