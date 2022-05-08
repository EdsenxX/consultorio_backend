require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const { expressjwt: jwt}  = require("express-jwt");

const db = require("./config/database");
db.connect();
  
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var citasRouter = require('./routes/citas');

var app = express();
app.use(cors());

// app.use(
//   jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
//     path: ["/auth", "/users"],
//     method: ["GET"],
//   })
// );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/citas', citasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json(err.message);
  // res.render("error");
});

module.exports = app;
