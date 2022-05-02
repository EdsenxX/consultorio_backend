const mongoose = require("mongoose");

const doctor = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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

export default Doctor;
