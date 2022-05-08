const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const paciente = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
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
});

const citas = new mongoose.Schema({
    paciente: {
        type: paciente,
        required: true
    },
    date_appointment: {
        type: Date,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "Pendiente",
        required: false
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false
    },
}, {
    timestamps: true
});

citas.plugin(mongoosePaginate);

const Cita = mongoose.model("Cita", citas);

module.exports = Cita;