"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

_mongoose.Schema.Types.String.set('trim', true);

var patientSchema = new _mongoose.Schema({
  id_company: {
    type: _mongoose.Schema.Types.ObjectId //required: true,

  },
  curp: {
    type: String,
    unique: true,
    maxlength: 18
  },
  rfc: {
    type: String,
    unique: true,
    maxlength: 13
  },
  employee_photo: {
    type: String
  },
  first_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  paternal_surname: {
    type: String
  },
  maternal_surname: {
    type: String
  },
  marital_status: {
    type: String
  },
  gender: {
    type: String
  },
  date_birth: {
    type: String
  },
  age: {
    type: Number
  },
  place_birth: {
    type: String
  },
  eye_color: {
    type: String
  },
  hair_color: {
    type: String
  },
  weight: {
    type: Number
  },
  nationality: {
    type: String
  },
  height: {
    type: Number
  },
  religion: {
    type: String
  },
  name_emergency: {
    type: String
  },
  telephone_emergency: {
    type: String
  },
  cellphone_emergency: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  donor: {
    type: String
  },
  name_father: {
    type: String
  },
  name_mother: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    ref: "Role",
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  versionKey: false,
  timestamps: true
});

patientSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

patientSchema.statics.comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, receivedPassword) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(password, receivedPassword);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = (0, _mongoose.model)('Patient', patientSchema, 'users');

exports["default"] = _default;