"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createPatient = exports.createDoctor = exports.createAdmin = exports.findOneUser = exports.findAllPatients = exports.findAllDoctors = exports.findAllAdmins = exports.findAllUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

var _Doctors = _interopRequireDefault(require("../models/Doctors.model"));

var _Patients = _interopRequireDefault(require("../models/Patients.model"));

var _Role = _interopRequireDefault(require("../models/Role.model"));

var _getPagination5 = require("../libs/getPagination");

//Encuentra todos los usuarios registrados
var findAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users, params, valueP, _req$query, size, page, usersfiltered, _getPagination, limit, offset, _users;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Users["default"].find();

          case 3:
            users = _context.sent;
            params = new URLSearchParams(req.query);
            valueP = params.get('name');
            _req$query = req.query, size = _req$query.size, page = _req$query.page;

            if (!(valueP != null && valueP != "")) {
              _context.next = 13;
              break;
            }

            valueP = valueP.toLowerCase();
            usersfiltered = users.filter(function (user) {
              return user.name.toLowerCase().includes(valueP);
            });
            res.json(usersfiltered);
            _context.next = 24;
            break;

          case 13:
            if (!(size === undefined && page === undefined)) {
              _context.next = 18;
              break;
            }

            users.reverse();
            res.json(users);
            _context.next = 24;
            break;

          case 18:
            _getPagination = (0, _getPagination5.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
            _context.next = 21;
            return _Users["default"].paginate({}, {
              offset: offset,
              limit: limit
            });

          case 21:
            _users = _context.sent;

            _users.docs.reverse();

            res.json(_users.docs);

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Error retrieving users',
              error: _context.t0
            });

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 26]]);
  }));

  return function findAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllUsers = findAllUsers;

var findAllAdmins = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var users, _req$query2, size, page, params, valueP, roleDoctor, usersfiltered, _users2, _getPagination2, limit, offset, _users3;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Users["default"].find();

          case 3:
            users = _context2.sent;
            _req$query2 = req.query, size = _req$query2.size, page = _req$query2.page;
            params = new URLSearchParams(req.query);
            valueP = params.get('name');
            console.log(page);
            _context2.next = 10;
            return _Role["default"].findOne({
              name: 'admin'
            });

          case 10:
            roleDoctor = _context2.sent;

            if (!(valueP != null && valueP != "")) {
              _context2.next = 17;
              break;
            }

            valueP = valueP.toLowerCase();
            usersfiltered = users.filter(function (user) {
              return user.name.toLowerCase().includes(valueP);
            });
            res.json(usersfiltered);
            _context2.next = 31;
            break;

          case 17:
            if (!(size === undefined && page === undefined)) {
              _context2.next = 25;
              break;
            }

            _context2.next = 20;
            return _Users["default"].find({
              roles: roleDoctor._id
            });

          case 20:
            _users2 = _context2.sent;

            _users2.reverse();

            res.json(_users2);
            _context2.next = 31;
            break;

          case 25:
            _getPagination2 = (0, _getPagination5.getPagination)(page, size), limit = _getPagination2.limit, offset = _getPagination2.offset;
            _context2.next = 28;
            return _Users["default"].paginate({
              roles: roleDoctor._id
            }, {
              offset: offset,
              limit: limit
            });

          case 28:
            _users3 = _context2.sent;

            _users3.docs.reverse();

            res.json(_users3.docs);

          case 31:
            _context2.next = 37;
            break;

          case 33:
            _context2.prev = 33;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Error retrieving users',
              error: _context2.t0
            });

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 33]]);
  }));

  return function findAllAdmins(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findAllAdmins = findAllAdmins;

var findAllDoctors = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query3, size, page, roleDoctor, users, _getPagination3, limit, offset, _users4;

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
              _context3.next = 13;
              break;
            }

            _context3.next = 8;
            return _Users["default"].find({
              roles: roleDoctor._id
            });

          case 8:
            users = _context3.sent;
            users.reverse();
            res.json(users);
            _context3.next = 19;
            break;

          case 13:
            _getPagination3 = (0, _getPagination5.getPagination)(page, size), limit = _getPagination3.limit, offset = _getPagination3.offset;
            _context3.next = 16;
            return _Users["default"].paginate({
              roles: roleDoctor._id
            }, {
              offset: offset,
              limit: limit
            });

          case 16:
            _users4 = _context3.sent;

            _users4.docs.reverse();

            res.json(_users4.docs);

          case 19:
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users'
            });

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21]]);
  }));

  return function findAllDoctors(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findAllDoctors = findAllDoctors;

var findAllPatients = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$query4, size, page, rolePatient, users, _getPagination4, limit, offset, _users5;

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
            rolePatient = _context4.sent;

            if (!(size === undefined && page === undefined)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 8;
            return _Users["default"].find({
              roles: rolePatient._id
            });

          case 8:
            users = _context4.sent;
            users.reverse();
            res.json(users);
            _context4.next = 19;
            break;

          case 13:
            _getPagination4 = (0, _getPagination5.getPagination)(page, size), limit = _getPagination4.limit, offset = _getPagination4.offset;
            _context4.next = 16;
            return _Users["default"].paginate({
              roles: rolePatient._id
            }, {
              offset: offset,
              limit: limit
            });

          case 16:
            _users5 = _context4.sent;

            _users5.docs.reverse();

            res.json(_users5.docs);

          case 19:
            _context4.next = 24;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'Error retrieving users',
              error: _context4.t0
            });

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 21]]);
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
}(); //Registra a un nuevo administrador


exports.findOneUser = findOneUser;

var createAdmin = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, name, email, password, image, roles, newUser, foundRole, savedUser;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(req.file);
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, image = _req$body.image, roles = _req$body.roles;

            if (!(roles != 'admin')) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              message: "Role '".concat(roles, "' does not correspond to creation of an admin")
            }));

          case 4:
            if (!(!name || !email || !password)) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              message: 'Admin must have a name, email and password'
            }));

          case 6:
            _context6.prev = 6;
            _context6.t0 = _Users["default"];
            _context6.t1 = name;
            _context6.t2 = email;
            _context6.next = 12;
            return _Users["default"].encryptPassword(password);

          case 12:
            _context6.t3 = _context6.sent;
            _context6.t4 = image;
            _context6.t5 = {
              name: _context6.t1,
              email: _context6.t2,
              password: _context6.t3,
              image: _context6.t4
            };
            newUser = new _context6.t0(_context6.t5);
            _context6.next = 18;
            return _Role["default"].findOne({
              name: {
                $in: roles
              }
            });

          case 18:
            foundRole = _context6.sent;
            newUser.roles = foundRole._id;
            _context6.next = 22;
            return newUser.save();

          case 22:
            savedUser = _context6.sent;
            res.status(200).json({
              message: "Admin created",
              iduser: savedUser._id
            });
            _context6.next = 29;
            break;

          case 26:
            _context6.prev = 26;
            _context6.t6 = _context6["catch"](6);
            console.error(_context6.t6);

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 26]]);
  }));

  return function createAdmin(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;

var createDoctor = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$body2, id_company, name, email, password, image, roles, newUser, foundRole, savedUser;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log(req.file);
            _req$body2 = req.body, id_company = _req$body2.id_company, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, image = _req$body2.image, roles = _req$body2.roles;

            if (!(roles != 'doctor')) {
              _context7.next = 4;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              message: "Role '".concat(roles, "' does not correspond to creation of a doctor")
            }));

          case 4:
            if (!(!name || !email || !password)) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              message: 'Doctor must have a name, email and password'
            }));

          case 6:
            _context7.prev = 6;
            _context7.t0 = _Doctors["default"];
            _context7.t1 = id_company;
            _context7.t2 = name;
            _context7.t3 = email;
            _context7.next = 13;
            return _Users["default"].encryptPassword(password);

          case 13:
            _context7.t4 = _context7.sent;
            _context7.t5 = image;
            _context7.t6 = {
              id_company: _context7.t1,
              name: _context7.t2,
              email: _context7.t3,
              password: _context7.t4,
              image: _context7.t5
            };
            newUser = new _context7.t0(_context7.t6);
            _context7.next = 19;
            return _Role["default"].findOne({
              name: {
                $in: roles
              }
            });

          case 19:
            foundRole = _context7.sent;
            newUser.roles = foundRole._id;
            _context7.next = 23;
            return newUser.save();

          case 23:
            savedUser = _context7.sent;
            res.status(200).json({
              message: "Doctor created",
              iduser: savedUser._id
            });
            _context7.next = 30;
            break;

          case 27:
            _context7.prev = 27;
            _context7.t7 = _context7["catch"](6);
            console.error(_context7.t7);

          case 30:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[6, 27]]);
  }));

  return function createDoctor(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.createDoctor = createDoctor;

var createPatient = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var _req$body3, email, password, image, roles, newUser, foundRole, savedUser;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log(req.file);
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, image = _req$body3.image, roles = _req$body3.roles;

            if (!(roles != 'patient')) {
              _context8.next = 4;
              break;
            }

            return _context8.abrupt("return", res.status(400).send({
              message: "Role '".concat(roles, "' does not correspond to creation of a Patient")
            }));

          case 4:
            if (!(!email || !password)) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.status(400).send({
              message: 'Patient must have an email and password'
            }));

          case 6:
            _context8.prev = 6;
            newUser = new _Patients["default"](req.body);
            _context8.next = 10;
            return _Role["default"].findOne({
              name: {
                $in: roles
              }
            });

          case 10:
            foundRole = _context8.sent;
            newUser.roles = foundRole._id;
            _context8.next = 14;
            return _Patients["default"].encryptPassword(password);

          case 14:
            newUser.password = _context8.sent;
            _context8.next = 17;
            return newUser.save();

          case 17:
            savedUser = _context8.sent;
            res.status(200).json({
              message: "Patient created",
              iduser: savedUser._id
            });
            _context8.next = 24;
            break;

          case 21:
            _context8.prev = 21;
            _context8.t0 = _context8["catch"](6);
            console.error(_context8.t0);

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[6, 21]]);
  }));

  return function createPatient(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //Actualizar datos de un usuario


exports.createPatient = createPatient;

var updateUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _req$body4, password, roles, Patient, Doctor, Admin;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            //Check if there is password change
            _req$body4 = req.body, password = _req$body4.password, roles = _req$body4.roles;

            if (!(password && password != "")) {
              _context9.next = 8;
              break;
            }

            _context9.next = 5;
            return _Users["default"].encryptPassword(req.body.password);

          case 5:
            req.body.password = _context9.sent;
            _context9.next = 9;
            break;

          case 8:
            delete req.body.password;

          case 9:
            if (!(roles == 'patient')) {
              _context9.next = 18;
              break;
            }

            delete req.body.roles;
            console.log(req.body);
            _context9.next = 14;
            return _Patients["default"].findByIdAndUpdate(req.params.id, req.body);

          case 14:
            Patient = _context9.sent;
            res.json({
              message: "Patient updated",
              patient: Patient
            });
            _context9.next = 33;
            break;

          case 18:
            if (!(roles == 'doctor')) {
              _context9.next = 25;
              break;
            }

            _context9.next = 21;
            return _Doctors["default"].findByIdAndUpdate(req.params.id, req.body);

          case 21:
            Doctor = _context9.sent;
            res.json({
              message: "Doctor updated"
            });
            _context9.next = 33;
            break;

          case 25:
            if (!(roles == 'admin')) {
              _context9.next = 32;
              break;
            }

            _context9.next = 28;
            return _Users["default"].findByIdAndUpdate(req.params.id, req.body);

          case 28:
            Admin = _context9.sent;
            res.json({
              message: "Admin updated"
            });
            _context9.next = 33;
            break;

          case 32:
            res.json({
              message: "Rol ".concat(roles, " does not exist")
            });

          case 33:
            _context9.next = 38;
            break;

          case 35:
            _context9.prev = 35;
            _context9.t0 = _context9["catch"](0);
            res.status(500).json({
              message: "Error updating user",
              error: _context9.t0
            });

          case 38:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 35]]);
  }));

  return function updateUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); //Eliminar a un usuario por id


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, User;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            id = req.params.id;
            _context10.next = 4;
            return _Users["default"].findByIdAndDelete(id);

          case 4:
            User = _context10.sent;

            if (User) {
              _context10.next = 7;
              break;
            }

            return _context10.abrupt("return", res.status(400).send({
              message: "User with ".concat(id, " doesn't exist")
            }));

          case 7:
            res.json({
              message: "".concat(User.name, " with the id ").concat(id, " was deleted")
            });
            _context10.next = 13;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            res.status(500).json({
              message: "Error deleting the user"
            });

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 10]]);
  }));

  return function deleteUser(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;