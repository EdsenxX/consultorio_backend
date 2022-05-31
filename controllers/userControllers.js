const User = require("../models/users");
const paramsBuilder = require("../utils/paramsBuilder");

const validParams = ["firstName", "lastName", "birthDate", "phone", "email", "password"];

const create = (req, res) => {
  const params = paramsBuilder(validParams, req.body);

  User.create(params)
    .then((user) => {
      res.status(200).json({
        message: "User created",
        user: user,
        status: {
          code: 202,
          message: "Accepted",
        },
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: `Error creating user`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

const getAll = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: "Users retrieved",
        users: users,
        status: {
          code: 200,
          message: "OK",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving users`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

module.exports = {
  create,
  getAll,
};
