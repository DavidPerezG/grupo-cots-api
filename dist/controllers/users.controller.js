"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createUser = exports.findOneUser = exports.findAllPatients = exports.findAllDoctors = exports.findAllAdmins = exports.findAllUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

var _Role = _interopRequireDefault(require("../models/Role.model"));

var _getPagination5 = require("../libs/getPagination");

var _middlewares = require("../middlewares");

var _authJwt = require("../middlewares/authJwt");

//Encuentra todos los usuarios registrados
var findAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, size, page, users, _getPagination, limit, offset, _users;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$query = req.query, size = _req$query.size, page = _req$query.page;
            console.log(size, page);

            if (!(size === undefined && page === undefined)) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return _Users["default"].find();

          case 6:
            users = _context.sent;
            res.json(users);
            _context.next = 15;
            break;

          case 10:
            _getPagination = (0, _getPagination5.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
            _context.next = 13;
            return _Users["default"].paginate({}, {
              offset: offset,
              limit: limit
            });

          case 13:
            _users = _context.sent;
            res.json(_users);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users'
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function findAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllUsers = findAllUsers;

var findAllAdmins = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$query2, size, page, roleDoctor, users, _getPagination2, limit, offset, _users2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$query2 = req.query, size = _req$query2.size, page = _req$query2.page;
            _context2.next = 4;
            return _Role["default"].findOne({
              name: 'admin'
            });

          case 4:
            roleDoctor = _context2.sent;

            if (!(size === undefined && page === undefined)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 8;
            return _Users["default"].find({
              roles: roleDoctor._id
            });

          case 8:
            users = _context2.sent;
            res.json(users);
            _context2.next = 17;
            break;

          case 12:
            _getPagination2 = (0, _getPagination5.getPagination)(page, size), limit = _getPagination2.limit, offset = _getPagination2.offset;
            _context2.next = 15;
            return _Users["default"].paginate({
              roles: roleDoctor._id
            }, {
              offset: offset,
              limit: limit
            });

          case 15:
            _users2 = _context2.sent;
            res.json(_users2);

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users'
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));

  return function findAllAdmins(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findAllAdmins = findAllAdmins;

var findAllDoctors = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query3, size, page, roleDoctor, users, _getPagination3, limit, offset, _users3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query3 = req.query, size = _req$query3.size, page = _req$query3.page;
            _context3.next = 4;
            return _Role["default"].findOne({
              name: 'doctor'
            });

          case 4:
            roleDoctor = _context3.sent;

            if (!(size === undefined && page === undefined)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 8;
            return _Users["default"].find({
              roles: roleDoctor._id
            });

          case 8:
            users = _context3.sent;
            res.json(users);
            _context3.next = 17;
            break;

          case 12:
            _getPagination3 = (0, _getPagination5.getPagination)(page, size), limit = _getPagination3.limit, offset = _getPagination3.offset;
            _context3.next = 15;
            return _Users["default"].paginate({
              roles: roleDoctor._id
            }, {
              offset: offset,
              limit: limit
            });

          case 15:
            _users3 = _context3.sent;
            res.json(_users3);

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users'
            });

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function findAllDoctors(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findAllDoctors = findAllDoctors;

var findAllPatients = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$query4, size, page, roleDoctor, users, _getPagination4, limit, offset, _users4;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$query4 = req.query, size = _req$query4.size, page = _req$query4.page;
            _context4.next = 4;
            return _Role["default"].findOne({
              name: 'patient'
            });

          case 4:
            roleDoctor = _context4.sent;

            if (!(size === undefined && page === undefined)) {
              _context4.next = 12;
              break;
            }

            _context4.next = 8;
            return _Users["default"].find({
              roles: roleDoctor._id
            });

          case 8:
            users = _context4.sent;
            res.json(users);
            _context4.next = 17;
            break;

          case 12:
            _getPagination4 = (0, _getPagination5.getPagination)(page, size), limit = _getPagination4.limit, offset = _getPagination4.offset;
            _context4.next = 15;
            return _Users["default"].paginate({
              roles: roleDoctor._id
            }, {
              offset: offset,
              limit: limit
            });

          case 15:
            _users4 = _context4.sent;
            res.json(_users4);

          case 17:
            _context4.next = 22;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users'
            });

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 19]]);
  }));

  return function findAllPatients(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findAllPatients = findAllPatients;

var findOneUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, User;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _Users["default"].findById(id);

          case 4:
            User = _context5.sent;

            if (User) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "User with id ".concat(id, " does not exist")
            }));

          case 7:
            res.json(User);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: _context5.t0.message || "Error retrieving User with id: ".concat(req.params.id)
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function findOneUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //Registra a un nuevo usuario


exports.findOneUser = findOneUser;

var createUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, name, email, password, roles, newUser, foundRoles, rolePatient, savedUser;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;

            if (!(!name || !email || !password)) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              message: 'User must have a name, email and password'
            }));

          case 3:
            _context6.prev = 3;
            _context6.t0 = _Users["default"];
            _context6.t1 = name;
            _context6.t2 = email;
            _context6.next = 9;
            return _Users["default"].encryptPassword(password);

          case 9:
            _context6.t3 = _context6.sent;
            _context6.t4 = {
              name: _context6.t1,
              email: _context6.t2,
              password: _context6.t3
            };
            newUser = new _context6.t0(_context6.t4);

            if (!roles) {
              _context6.next = 19;
              break;
            }

            _context6.next = 15;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 15:
            foundRoles = _context6.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context6.next = 23;
            break;

          case 19:
            _context6.next = 21;
            return _Role["default"].findOne({
              name: "user"
            });

          case 21:
            rolePatient = _context6.sent;
            newUser.roles = [rolePatient._id];

          case 23:
            _context6.next = 25;
            return newUser.save();

          case 25:
            savedUser = _context6.sent;
            res.status(200).json({
              message: "User created"
            });
            _context6.next = 32;
            break;

          case 29:
            _context6.prev = 29;
            _context6.t5 = _context6["catch"](3);
            console.error(_context6.t5);

          case 32:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 29]]);
  }));

  return function createUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //Actualizar datos de un usuario


exports.createUser = createUser;

var updateUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var User;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            if (!req.body.password) {
              _context7.next = 5;
              break;
            }

            _context7.next = 4;
            return _Users["default"].encryptPassword(req.body.password);

          case 4:
            req.body.password = _context7.sent;

          case 5:
            _context7.next = 7;
            return _Users["default"].findByIdAndUpdate(req.params.id, req.body);

          case 7:
            User = _context7.sent;
            res.json({
              message: "User updated"
            });
            _context7.next = 14;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            res.status(500).json({
              message: "Error updating user"
            });

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 11]]);
  }));

  return function updateUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //Eliminar a un usuario por id


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, User;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return _Users["default"].findByIdAndDelete(id);

          case 4:
            User = _context8.sent;

            if (User) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(400).send({
              message: "User with ".concat(id, " doesn't exist")
            }));

          case 7:
            res.json({
              message: "".concat(User.name, " with the id ").concat(id, " was deleted")
            });
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            res.status(500).json({
              message: "Error deleting the user"
            });

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 10]]);
  }));

  return function deleteUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;