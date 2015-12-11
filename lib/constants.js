'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Keys = {
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

exports.Keys = Keys;
var Units = {
  YEAR: 'years',
  MONTH: 'months',
  DAY: 'days',
  HOUR: 'hours'
};

exports.Units = Units;
var Types = {
  JS_DATE: 'JS_DATE',
  MOMENT: 'MOMENT',
  ISO: 'ISO',
  STRING: 'STRING'
};

exports.Types = Types;
var Levels = {
  years: {
    up: null,
    down: 'months',
    nav: {
      unit: 'years',
      span: 10
    },
    key: {
      unit: 'year',
      span: 1
    }
  },
  months: {
    up: 'years',
    down: 'days',
    nav: {
      unit: 'year',
      span: 1
    },
    key: {
      unit: 'month',
      span: 1
    }
  },
  days: {
    up: 'months',
    down: null,
    nav: {
      unit: 'month',
      span: 1
    },
    key: {
      unit: 'day',
      span: 1
    }
  },
  hours: {
    up: null,
    down: null,
    key: {
      unit: 'minutes',
      span: 30
    }
  }
};
exports.Levels = Levels;