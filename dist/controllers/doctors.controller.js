"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.findOneDoctor = exports.findAllDoctors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Doctors = _interopRequireDefault(require("../models/Doctors.model"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

var _Role = _interopRequireDefault(require("../models/Role.model"));

var _getPagination2 = require("../libs/getPagination");

var findAllDoctors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var roleDoctor, doctors, params, valueNameParameter, _req$query, size, page, doctorsfiltered, _getPagination, limit, offset, _doctors;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].findOne({
              name: 'doctor'
            });

          case 3:
            roleDoctor = _context.sent;
            _context.next = 6;
            return _Users["default"].find({
              roles: roleDoctor._id
            });

          case 6:
            doctors = _context.sent;
            params = new URLSearchParams(req.query);
            valueNameParameter = params.get('name');
            _req$query = req.query, size = _req$query.size, page = _req$query.page; //if name parameter is used, give all name matches

            if (!(valueNameParameter != null && valueNameParameter != "")) {
              _context.next = 16;
              break;
            }

            valueNameParameter = valueNameParameter.toLowerCase();
            doctorsfiltered = patients.filter(function (doctor) {
              return doctor.name.toLowerCase().includes(valueNameParameter);
            });
            res.json(doctorsfiltered);
            _context.next = 27;
            break;

          case 16:
            if (!(size != undefined || page != undefined)) {
              _context.next = 25;
              break;
            }

            _getPagination = (0, _getPagination2.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
            _context.next = 20;
            return _Doctors["default"].paginate({}, {
              offset: offset,
              limit: limit
            });

          case 20:
            _doctors = _context.sent;

            _doctors.docs.reverse();

            res.json(_doctors.docs);
            _context.next = 27;
            break;

          case 25:
            doctors.reverse();
            res.json(doctors);

          case 27:
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Error retrieving doctors',
              error: _context.t0
            });

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 29]]);
  }));

  return function findAllDoctors(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllDoctors = findAllDoctors;

var findOneDoctor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, doctor;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Doctors["default"].findById(id);

          case 4:
            doctor = _context2.sent;

            if (doctor) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "Doctor with id ".concat(id, " does not exist")
            }));

          case 9:
            res.json(doctor);

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: _context2.t0.message || "Error retrieving doctor with id: ".concat(req.params.id)
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function findOneDoctor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findOneDoctor = findOneDoctor;

var createDoctor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, email, password, roles, newDoctor, doctorRole, savedDoctor;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;

            if (!(!name || !email || !password)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'Doctors must have a name, email and password'
            }));

          case 3:
            if (!(roles != 'doctor')) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'This user does not have a doctor as role'
            }));

          case 5:
            _context3.prev = 5;
            newDoctor = new _Doctors["default"](req.body);
            _context3.next = 9;
            return _Role["default"].findOne({
              name: roles
            });

          case 9:
            doctorRole = _context3.sent;
            newDoctor.roles = doctorRole._id;
            _context3.next = 13;
            return _Doctors["default"].encryptPassword(password);

          case 13:
            newDoctor.password = _context3.sent;
            _context3.next = 16;
            return newDoctor.save();

          case 16:
            savedDoctor = _context3.sent;
            res.status(200).json({
              message: 'Doctor created',
              iduser: savedDoctor._id
            });
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](5);
            res.status(500).json({
              message: "Error creating doctor",
              error: _context3.t0
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 20]]);
  }));

  return function createDoctor(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createDoctor = createDoctor;

var updateDoctor = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, password, roles, doctorUpdated;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, password = _req$body2.password, roles = _req$body2.roles;

            if (!(password && password != "")) {
              _context4.next = 8;
              break;
            }

            _context4.next = 5;
            return _Doctors["default"].encryptPassword(req.body.password);

          case 5:
            req.body.password = _context4.sent;
            _context4.next = 9;
            break;

          case 8:
            delete req.body.password;

          case 9:
            if (roles != 'doctor') {
              res.json({
                message: 'This user does not have doctor as role'
              });
            }

            delete req.body.roles;
            _context4.next = 13;
            return _Doctors["default"].findByIdAndUpdate(req.params.id, req.body);

          case 13:
            doctorUpdated = _context4.sent;
            res.json({
              message: "Doctor updated",
              doctor: doctorUpdated
            });
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'Error updating doctor',
              error: _context4.t0
            });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 17]]);
  }));

  return function updateDoctor(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateDoctor = updateDoctor;

var deleteDoctor = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, doctor;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _Doctors["default"].findByIdAndDelete(id);

          case 4:
            doctor = _context5.sent;

            if (doctor) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              message: "doctor with ".concat(id, " doesn't exist")
            }));

          case 7:
            res.json({
              message: "".concat(doctor.name, " with the id ").concat(id, " was deleted")
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Error deleting the doctor"
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function deleteDoctor(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteDoctor = deleteDoctor;