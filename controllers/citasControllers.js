const Cita = require("../models/citas");
const paramsBuilder = require("../utils/paramsBuilder");
const moment = require("moment");

const validParams = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "date",
  "time",
  "doctor",
  "notes",
];

const create = (req, res) => {
  const params = paramsBuilder(validParams, req.body);
  console.log(params);
  console.log(
    moment(`${params.date} ${params.time}`, "YYYY-MM-DD HH:mm").utc().toDate()
  );
  const newCita = {
    paciente: {
      first_name: params.firstName,
      last_name: params.lastName,
      email: params.email,
      phone: params.phone,
    },
    date_appointment: moment(
      `${params.date} ${params.time}`,
      "YYYY-MM-DD HH:mm"
    ).toDate(),
    doctor: params.doctor,
    notes: params.notes,
  };
  Cita.create(newCita)
    .then((user) => {
      res.status(200).json({
        message: "Cita agendada",
        user: user,
        status: {
          code: 202,
          message: "Accepted",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Error al agendar cita`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

const getAllByActualDay = (req, res) => {
  const date = moment().format("YYYY-MM-DD");
  const time = moment().subtract(1, "hours").format("HH:mm");
  Cita.aggregate([
    {
      $match: {
        date_appointment: {
          $gte: new Date(`${date} ${time}`),
          $lte: new Date(`${date} 23:59`),
        },
        status: "Pendiente",
      },
    },
    { $limit: 8 },
    { $sort: { date_appointment: 1 } },
    {
      $lookup: {
        from: "doctors",
        localField: "doctor",
        foreignField: "_id",
        as: "doctor",
      },
    },
    {
      $project: {
        _id: 1,
        date_appointment: 1,
        paciente: 1,
        doctor: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          consultorio: 1,
        },
        notes: 1,
      },
    },
  ])
    .then((citas) => {
      res.status(200).json({
        message: "Citas del dia",
        citas: citas,
        status: {
          code: 200,
          message: "OK",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Error al obtener citas`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

const getCita = (req, res) => {
  const id = req.params.id;
  Cita.findById(id)
    .then((cita) => {
      res.status(200).json({
        message: "Cita encontrada",
        cita: cita,
        status: {
          code: 200,
          message: "OK",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Error al obtener cita`,
        error: err,
        status: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    });
};

const updateCita = (req, res) => {
  const id = req.params.id;
  const params = paramsBuilder(validParams, req.body);
  const newCita = {
    paciente: {
      first_name: params.firstName,
      last_name: params.lastName,
      email: params.email,
      phone: params.phone,
    },
    date_appointment: moment(
      `${params.date} ${params.time}`,
      "YYYY-MM-DD HH:mm"
    ).toDate(),
    doctor: params.doctor,
    notes: params.notes,
  };
  Cita.updateOne({id}, newCita)
    .then((cita) => {
      res.status(200).json({
        message: "Cita actualizada",
        cita: cita,
        status: {
          code: 200,
          message: "OK",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Error al actualizar cita`,
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
  getAllByActualDay,
  getCita,
  updateCita,
};
