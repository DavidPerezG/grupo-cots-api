"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createUser = exports.findOneUser = exports.findAllUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

//Encuentra todos los usuarios registrados
var findAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var Users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Users["default"].find();

          case 3:
            Users = _context.sent;
            res.json(Users);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function findAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllUsers = findAllUsers;

var findOneUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, User;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Users["default"].findById(id);

          case 4:
            User = _context2.sent;

            if (User) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "User with id ".concat(id, " does not exist")
            }));

          case 7:
            res.json(User);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: _context2.t0.message || "Error retrieving User with id: ".concat(req.params.id)
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function findOneUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //Registra a un nuevo usuario


exports.findOneUser = findOneUser;

var createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var newUser, userSaved;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!req.body.name || !req.body.email || !req.body.password)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'User must have a name, email and password'
            }));

          case 2:
            _context3.prev = 2;
            newUser = new _Users["default"](req.body);
            _context3.next = 6;
            return newUser.save();

          case 6:
            userSaved = _context3.sent;
            res.json(userSaved);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            res.status(500).json({
              message: 'Error creating user'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));

  return function createUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //Actualizar datos de un usuario


exports.createUser = createUser;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var User;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Users["default"].findByIdAndUpdate(req.params.id, req.body);

          case 3:
            User = _context4.sent;
            res.json({
              message: "User updated"
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Error updating user"
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //Eliminar a un usuario por id


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, User;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _Users["default"].findByIdAndDelete(id);

          case 4:
            User = _context5.sent;

            if (User) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              message: "User with ".concat(id, " doesn't exist")
            }));

          case 7:
            res.json({
              message: "".concat(User.name, " with the id ").concat(id, " was deleted")
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Error deleting the user"
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;