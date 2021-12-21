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

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _patients = _interopRequireDefault(require("./routes/patients.routes"));

var _doctors = _interopRequireDefault(require("./routes/doctors.routes"));

var _admins = _interopRequireDefault(require("./routes/admins.routes"));

var _secretaries = _interopRequireDefault(require("./routes/secretaries.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _companies = _interopRequireDefault(require("./routes/companies.routes"));

var _initialSetup = _interopRequireWildcard(require("./libs/initialSetup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)(); //Settings

app.set('pkg', _package["default"]);
app.set('port', process.env.PORT || 3000);

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var storage = _multer["default"].diskStorage({
  destination: _path["default"].join(__dirname, 'public/upload'),
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.mimetype.split('/')[1]);
  }
}); //Middleware


app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _multer["default"])({
  storage: storage
}).single('file')); //Routes

app.get('/', function (req, res) {
  res.json({
    author: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
    message: "Bienvenido a la aplicacion"
  });
});
app.use('/api/users', _users["default"]);
app.use('/api/users/patients', _patients["default"]);
app.use('/api/users/doctors', _doctors["default"]);
app.use('/api/users/admins', _admins["default"]);
app.use('/api/users/secretaries', _secretaries["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/companies', _companies["default"]); //app.use('/api/doctors', DoctorsRoutes)

var _default = app;
exports["default"] = _default;