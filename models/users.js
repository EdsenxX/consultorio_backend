const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const Doctor = require("./doctor");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
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