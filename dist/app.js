"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersRoute = _interopRequireDefault(require("./routes/users.route.js"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var app = (0, _express["default"])(); //Settings

app.set('port', process.env.PORT || 3000); //Middleware

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); //Routes

app.get('/', function (req, res) {
  res.json({
    message: "Bienvenido a la aplicacion"
  });
});
app.use('/api/users', _usersRoute["default"]);
var _default = app;
exports["default"] = _default;