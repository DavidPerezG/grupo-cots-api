"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _package = _interopRequireDefault(require("../package.json"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _doctors = _interopRequireDefault(require("./routes/doctors.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _initialSetup = _interopRequireWildcard(require("./libs/initialSetup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)(); //Settings

app.set('pkg', _package["default"]);
app.set('port', process.env.PORT || 3000); //Middleware

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); //Routes

app.get('/', function (req, res) {
  res.json({
    author: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
    message: "Bienvenido a la aplicacion"
  });
});
app.use('/api/users', _users["default"]);
app.use('/api/doctors', _doctors["default"]);
app.use('/api/auth', _auth["default"]);
var _default = app;
exports["default"] = _default;