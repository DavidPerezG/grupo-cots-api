"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.findOnePatient = exports.findAllPatients = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Patients = _interopRequireDefault(require("../models/Patients.model"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

var _Role = _interopRequireDefault(require("../models/Role.model"));

var _getPagination2 = require("../libs/getPagination");

var findAllPatients = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var rolePatient, patients, params, valueNameParameter, _req$query, size, page, patientsfiltered, _getPagination, limit, offset, _patients;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].findOne({
              name: 'patient'
            });

          case 3:
            rolePatient = _context.sent;
            _context.next = 6;
            return _Users["default"].find({
              roles: rolePatient._id
            });

          case 6:
            patients = _context.sent;
            params = new URLSearchParams(req.query);
            valueNameParameter = params.get('name');
            _req$query = req.query, size = _req$query.size, page = _req$query.page; //if name parameter is used, give all name matches

            if (!(valueNameParameter != null && valueNameParameter != "")) {
              _context.next = 16;
              break;
            }

            valueNameParameter = valueNameParameter.toLowerCase();
            patientsfiltered = patients.filter(function (patient) {
              return patient.name.toLowerCase().includes(valueNameParameter);
            });
            res.json(patientsfiltered);
            _context.next = 27;
            break;

          case 16:
            if (!(size != undefined || page != undefined)) {
              _context.next = 25;
              break;
            }

            _getPagination = (0, _getPagination2.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
            _context.next = 20;
            return _Patients["default"].paginate({}, {
              offset: offset,
              limit: limit
            });

          case 20:
            _patients = _context.sent;

            _patients.docs.reverse();

            res.json(_patients.docs);
            _context.next = 27;
            break;

          case 25:
            patients.reverse();
            res.json(patients);

          case 27:
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Error retrieving patients',
              error: _context.t0
            });

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 29]]);
  }));

  return function findAllPatients(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllPatients = findAllPatients;

var findOnePatient = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, Patient;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Patients["default"].findById(id);

          case 4:
            Patient = _context2.sent;

            if (Patient) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "Patient with id ".concat(id, " does not exist")
            }));

          case 9:
            res.json(Patient);

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: _context2.t0.message || "Error retrieving Patient with id: ".concat(req.params.id)
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function findOnePatient(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findOnePatient = findOnePatient;

var createPatient = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, first_name, email, password, roles, newPatient, patientRole, savedPatient;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, first_name = _req$body.first_name, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;

            if (!(!first_name || !email || !password)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'Patients must have a first name, email and password'
            }));

          case 3:
            if (!(roles != 'patient')) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'This user does not have a patient as role'
            }));

          case 5:
            _context3.prev = 5;
            newPatient = new _Patients["default"](req.body);
            _context3.next = 9;
            return _Role["default"].findOne({
              name: roles
            });

          case 9:
            patientRole = _context3.sent;
            newPatient.roles = patientRole._id;
            _context3.next = 13;
            return _Patients["default"].encryptPassword(password);

          case 13:
            newPatient.password = _context3.sent;
            _context3.next = 16;
            return newPatient.save();

          case 16:
            savedPatient = _context3.sent;
            res.status(200).json({
              message: 'Patient created',
              iduser: savedUser._id
            });
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](5);
            res.status(500).json({
              message: "Error creating patient",
              error: _context3.t0
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 20]]);
  }));

  return function createPatient(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createPatient = createPatient;

var updatePatient = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, password, roles, patientUpdated;

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
            return _Patients["default"].encryptPassword(req.body.password);

          case 5:
            req.body.password = _context4.sent;
            _context4.next = 9;
            break;

          case 8:
            delete req.body.password;

          case 9:
            if (roles != 'patient') {
              res.json({
                message: 'This user does not have patient as role'
              });
            }

            delete req.body.roles;
            _context4.next = 13;
            return _Patients["default"].findByIdAndUpdate(req.params.id, req.body);

          case 13:
            patientUpdated = _context4.sent;
            res.json({
              message: "Patient updated",
              patient: patientUpdated
            });
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'Error updating patient',
              error: _context4.t0
            });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 17]]);
  }));

  return function updatePatient(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updatePatient = updatePatient;

var deletePatient = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, patient;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _Patients["default"].findByIdAndDelete(id);

          case 4:
            patient = _context5.sent;

            if (patient) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              message: "patient with ".concat(id, " doesn't exist")
            }));

          case 7:
            res.json({
              message: "".concat(patient.name, " with the id ").concat(id, " was deleted")
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Error deleting the patient"
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function deletePatient(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deletePatient = deletePatient;