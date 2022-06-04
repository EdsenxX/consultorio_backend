const mongoose = require("mongoose");

const doctor = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    consultorio: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Doctor = mongoose.model("Doctor", doctor);

module.exports = Doctor;
