"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCompany = exports.updateCompany = exports.createCompany = exports.findOneCompany = exports.findAllCompanies = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Companies = _interopRequireDefault(require("../models/Companies.model"));

var _Users = _interopRequireDefault(require("../models/Users.model"));

var findAllCompanies = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var companies, valueP, _req$query, size, page, companiesfiltered, _getPagination, limit, offset, _companies;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Companies["default"].find().reverse();

          case 3:
            companies = _context.sent;
            valueP = params.get('name');
            _req$query = req.query, size = _req$query.size, page = _req$query.page;

            if (!(valueP != null)) {
              _context.next = 12;
              break;
            }

            valueP = valueP.toLowerCase();
            companiesfiltered = companies.filter(function (company) {
              return company = company.name_company.toLowerCase().includes(valueP);
            });
            res.json(companiesfiltered);
            _context.next = 22;
            break;

          case 12:
            if (!(size === undefined && page === undefined)) {
              _context.next = 16;
              break;
            }

            res.json(companies);
            _context.next = 22;
            break;

          case 16:
            _getPagination = getPagination(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
            _context.next = 19;
            return _Companies["default"].paginate({}, {
              offset: offset,
              limit: limit
            });

          case 19:
            _companies = _context.sent;

            _companies.docs.reverse();

            res.json(_companies.docs);

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Error retrieving companies',
              error: _context.t0
            });

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));

  return function findAllCompanies(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllCompanies = findAllCompanies;

var findOneCompany = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, Company;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Companies["default"].findById(id);

          case 4:
            Company = _context2.sent;

            if (Company) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "Company with ".concat(id, " does not exist")
            }));

          case 7:
            res.json(Company);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: _context2.t0.message || "Error retrieving Company with id: ".concat(req.params.id)
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function findOneCompany(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findOneCompany = findOneCompany;

var createCompany = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name_company, email, password, address, image, phone_number, newCompany, savedCompany;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name_company = _req$body.name_company, email = _req$body.email, password = _req$body.password, address = _req$body.address, image = _req$body.image, phone_number = _req$body.phone_number;

            if (!(!name_company || !email || !password || !address)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'Company must have a name, email, password and address'
            }));

          case 3:
            _context3.prev = 3;
            _context3.t0 = _Companies["default"];
            _context3.t1 = name_company;
            _context3.t2 = email;
            _context3.next = 9;
            return _Companies["default"].encryptPassword(password);

          case 9:
            _context3.t3 = _context3.sent;
            _context3.t4 = address;
            _context3.t5 = image;
            _context3.t6 = phone_number;
            _context3.t7 = {
              name_company: _context3.t1,
              email: _context3.t2,
              password: _context3.t3,
              address: _context3.t4,
              image: _context3.t5,
              phone_number: _context3.t6
            };
            newCompany = new _context3.t0(_context3.t7);
            _context3.next = 17;
            return newCompany.save();

          case 17:
            savedCompany = _context3.sent;
            res.status(200).json({
              message: "Company created",
              idcompany: savedCompany._id
            });
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t8 = _context3["catch"](3);
            console.error(_context3.t8);
            res.status(500).json({
              message: "Error creating company",
              error: _context3.t8
            });

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 21]]);
  }));

  return function createCompany(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createCompany = createCompany;

var updateCompany = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var Company;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            if (!req.body.password) {
              _context4.next = 5;
              break;
            }

            _context4.next = 4;
            return _Users["default"].encryptPassword(req.body.password);

          case 4:
            req.body.password = _context4.sent;

          case 5:
            _context4.next = 7;
            return _Companies["default"].findByIdAndUpdate(req.params.id, req.body);

          case 7:
            Company = _context4.sent;
            res.json({
              message: "Company updated"
            });
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Error updating company",
              error: _context4.t0
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function updateCompany(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateCompany = updateCompany;

var deleteCompany = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, Company;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _Companies["default"].findByIdAndDelete(id);

          case 4:
            Company = _context5.sent;

            if (Company) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              message: "Company with id ".concat(id, " doesn't exist")
            }));

          case 7:
            res.json({
              message: "".concat(Company.name_company, " with the id ").concat(id, " was deleted")
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: 'Error deleting company',
              error: _context5.t0
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function deleteCompany(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteCompany = deleteCompany;