const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const Doctor = require("./doctor");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

userSchema.plugin(mongooseBcrypt);

userSchema.virtual('full_name').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

userSchema.virtual('doctor_information').get(function () {
    return Doctor.findOne({_user: this._id});
});

const User = mongoose.model("User", userSchema);

module.exports = User;