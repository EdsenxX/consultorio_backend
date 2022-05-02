const mongoose = require("mongoose");

module.exports = {
  connect: () =>
    mongoose.connect(
      process.env.MONGO_URI,
    ),
  connection: () => {
    if (mongoose.connection) {
      return mongoose.connection;
    }
    return this.connect();
  },
};