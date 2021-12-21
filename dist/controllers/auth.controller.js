"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signInPatient = exports.signIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role.model"));

var signIn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userFound, match, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Users["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 3:
            userFound = _context.sent;
            console.log(userFound);

            if (!(!userFound || userFound.roles.name != 'admin')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "User not found"
            }));

          case 7:
            _context.next = 9;
            return _Users["default"].comparePassword(req.body.password, userFound.password);

          case 9:
            match = _context.sent;

            if (match) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              token: null,
              message: "Invalid Password"
            }));

          case 12:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 84600 //24 horas

            });
            res.json({
              token: token,
              iduser: userFound._id
            });
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Error signin in'
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function signIn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var signInPatient = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userFound, match, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Users["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 3:
            userFound = _context2.sent;
            console.log(userFound);

            if (!(!userFound || userFound.roles.name != 'patient')) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "User not found"
            }));

          case 7:
            _context2.next = 9;
            return _Users["default"].comparePassword(req.body.password, userFound.password);

          case 9:
            match = _context2.sent;

            if (match) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: "Invalid Password"
            }));

          case 12:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 84600 //24 horas

            });
            res.status(200).json({
              token: token,
              iduser: userFound._id,
              idcompany: 'waiting'
            });
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Error signin in'
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function signInPatient(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signInPatient = signInPatient;

var signUp = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, email, password, roles, newUser, foundRoles, role, savedUser, token;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;

            if (!(!name || !email || !password)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'User must have a name, email and password'
            }));

          case 4:
            _context3.t0 = _Users["default"];
            _context3.t1 = name;
            _context3.t2 = email;
            _context3.next = 9;
            return _Users["default"].encryptPassword(password);

          case 9:
            _context3.t3 = _context3.sent;
            _context3.t4 = {
              name: _context3.t1,
              email: _context3.t2,
              password: _context3.t3
            };
            newUser = new _context3.t0(_context3.t4);

            if (!roles) {
              _context3.next = 19;
              break;
            }

            _context3.next = 15;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 15:
            foundRoles = _context3.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context3.next = 23;
            break;

          case 19:
            _context3.next = 21;
            return _Role["default"].findOne({
              name: "patient"
            });

          case 21:
            role = _context3.sent;
            newUser.roles = role._id;

          case 23:
            _context3.next = 25;
            return newUser.save();

          case 25:
            savedUser = _context3.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 84600 //24 hours

            });
            res.status(200).json({
              token: token
            });
            _context3.next = 33;
            break;

          case 30:
            _context3.prev = 30;
            _context3.t5 = _context3["catch"](0);
            res.status(500).json({
              message: 'Error signin up'
            });

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 30]]);
  }));

  return function signUp(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.signUp = signUp;