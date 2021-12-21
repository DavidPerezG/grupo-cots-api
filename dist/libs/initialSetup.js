"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role.model"));

var createRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var roles, count, i, role, newRole;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //This const defines all the different roles
            roles = ['patient', 'doctor', 'admin', 'secretary'];
            _context.prev = 1;
            _context.next = 4;
            return _Role["default"].estimatedDocumentCount();

          case 4:
            count = _context.sent;

            if (!(count == 4)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context.next = 22;
              break;
            }

            _context.next = 11;
            return _Role["default"].find({
              name: roles[i]
            });

          case 11:
            role = _context.sent;

            if (!(role == false)) {
              _context.next = 17;
              break;
            }

            _context.next = 15;
            return new _Role["default"]({
              name: roles[i]
            }).save();

          case 15:
            newRole = _context.sent;
            console.log(newRole);

          case 17:
            console.log(roles[i]);
            console.log(role);

          case 19:
            i++;
            _context.next = 8;
            break;

          case 22:
            // const values = await Promise.all([
            //     new RoleModel({name: 'patient'}).save(),
            //     new RoleModel({name: 'doctor'}).save(),
            //     new RoleModel({name: 'admin'}).save(),
            //     new RoleModel({name: 'secretary'}).save(),
            // ]
            console.log({
              values: values
            });
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 25]]);
  }));

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;