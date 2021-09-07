"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.findOneDoctor = exports.findAllDoctors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Doctors = _interopRequireDefault(require("../models/Doctors.model"));

var findAllDoctors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var doctors;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Doctors["default"].find();

          case 3:
            doctors = _context.sent;
            res.status(200).json(doctors);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Error finding doctors"
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function findAllDoctors(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllDoctors = findAllDoctors;

var findOneDoctor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var doctor;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Doctors["default"].findById(req.params.id);

          case 3:
            doctor = _context2.sent;

            if (doctor) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              message: "Doctor with id ".concat(req.params.id, " not found")
            }));

          case 6:
            res.status(200).json(doctor);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: "Error finding doctor"
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function findOneDoctor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findOneDoctor = findOneDoctor;

var createDoctor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var newDoctor, savedDoctor;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!req.body.name || req.body.email || req.body.password)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: "Error creating doctor. Form must have a name, email and password"
            }));

          case 2:
            _context3.prev = 2;
            newDoctor = new _Doctors["default"](req.body);
            _context3.next = 6;
            return newDoctor.save();

          case 6:
            savedDoctor = _context3.sent;
            res.status(201).json({
              message: 'New Doctor Created'
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            res.status(500).json({
              message: "Error creating doctor"
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));

  return function createDoctor(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createDoctor = createDoctor;

var updateDoctor = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Doctors["default"].findByIdAndUpdate(req.params.id, req.body);

          case 3:
            res.json({
              message: 'Doctor information updated correctly'
            });
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Error updating Doctor information"
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function updateDoctor(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateDoctor = updateDoctor;

var deleteDoctor = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _Doctors["default"].findByIdAndDelete(req.params.id);

          case 3:
            res.json({
              message: 'Doctor deleted correctly'
            });
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Error deleting doctor"
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function deleteDoctor(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteDoctor = deleteDoctor;