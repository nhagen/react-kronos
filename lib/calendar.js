'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('./constants');

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _styledComponent = require('./styled-component');

var _styledComponent2 = _interopRequireDefault(_styledComponent);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

require('moment-range');

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToHour();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.scrollToHour();
    }
  }, {
    key: 'scrollToHour',
    value: function scrollToHour() {
      if (this.props.level == 'hours' && this.refs.selected) {
        var selected = _reactDom2['default'].findDOMNode(this.refs.selected);
        selected.parentNode.scrollTop = selected.offsetTop - 6;
      }
    }
  }, {
    key: 'onNavigateCell',
    value: function onNavigateCell(datetime) {
      var lvl = _constants.Levels[this.props.level];
      if (lvl.down) this.props.setLevel(lvl.down);
      this.props.onSelect(datetime, !lvl.down, lvl.key);
    }
  }, {
    key: 'onNavigateUp',
    value: function onNavigateUp() {
      var lvl = _constants.Levels[this.props.level];
      if (lvl.up) this.props.setLevel(lvl.up);
    }
  }, {
    key: 'onNavigateLeft',
    value: function onNavigateLeft() {
      var lvl = _constants.Levels[this.props.level].nav;
      this.props.onSelect(this.props.datetime.subtract(lvl.span, lvl.unit));
    }
  }, {
    key: 'onNavigateRight',
    value: function onNavigateRight() {
      var lvl = _constants.Levels[this.props.level].nav;
      this.props.onSelect(this.props.datetime.add(lvl.span, lvl.unit));
    }
  }, {
    key: 'onToday',
    value: function onToday() {
      var lvl = _constants.Levels[this.props.level];
      if ((0, _moment2['default'])(this.props.datetime).isSame((0, _moment2['default'])(), 'day')) {
        this.props.onSelect((0, _moment2['default'])(), !lvl.down);
      } else {
        this.props.onSelect((0, _moment2['default'])());
      }
    }
  }, {
    key: 'getTitle',
    value: function getTitle(unit, datetime) {
      datetime = datetime || (0, _moment2['default'])();
      switch (unit) {
        case 'years':
          var start = datetime.clone().subtract(4, 'years');
          var end = datetime.clone().add(7, 'years');
          var years = [];

          (0, _moment2['default'])().range(start, end).by(_constants.Units.YEAR, function (year) {
            years.push({
              label: year.format('YYYY'),
              selected: year.isSame(datetime, 'year')
            });
          });
          return [years[0].label, years[years.length - 1].label].join('-');

        case 'months':
          return datetime.format('YYYY');

        case 'days':
          return datetime.format('MMMM');

        case 'hours':
          return null;
      }
    }
  }, {
    key: 'getCells',
    value: function getCells(unit, datetime) {
      datetime = datetime || (0, _moment2['default'])();
      switch (unit) {
        case 'years':
          {
            var _ret = (function () {
              var start = datetime.clone().subtract(4, 'years');
              var end = datetime.clone().add(7, 'years');
              var years = [];

              (0, _moment2['default'])().range(start, end).by(_constants.Units.YEAR, function (year) {
                years.push({
                  moment: year,
                  label: year.format('YYYY'),
                  selected: year.isSame(datetime, 'year')
                });
              });

              return {
                v: years
              };
            })();

            if (typeof _ret === 'object') return _ret.v;
          }

        case 'months':
          {
            var _ret2 = (function () {
              var start = datetime.clone().startOf('year');
              var end = datetime.clone().endOf('year');
              var months = [];

              (0, _moment2['default'])().range(start, end).by(_constants.Units.MONTH, function (month) {
                months.push({
                  moment: month,
                  label: month.format('MMM'),
                  selected: month.isSame(datetime, 'month')
                });
              });

              return {
                v: months
              };
            })();

            if (typeof _ret2 === 'object') return _ret2.v;
          }

        case 'days':
          {
            var _ret3 = (function () {
              var start = datetime.clone().startOf('month').weekday(0);
              var end = datetime.clone().endOf('month').weekday(6);
              var days = [];

              _moment2['default'].weekdaysMin().forEach(function (day) {
                days.push({
                  label: day,
                  header: true
                });
              });

              (0, _moment2['default'])().range(start, end).by(_constants.Units.DAY, function (day) {
                days.push({
                  moment: day,
                  label: day.format('D'),
                  past: day.isBefore(datetime, 'month'),
                  future: day.isAfter(datetime, 'month'),
                  selected: day.isSame(datetime, 'day'),
                  today: day.isSame((0, _moment2['default'])(), 'day')
                });
              });

              return {
                v: days
              };
            })();

            if (typeof _ret3 === 'object') return _ret3.v;
          }

        case 'hours':
          {
            var _ret4 = (function () {
              var start = datetime.clone().startOf('day');
              var end = datetime.clone().endOf('day');
              var hours = [];
              var closeBefore = datetime.clone().subtract(31, 'minutes');
              var closeAfter = datetime.clone().add(31, 'minutes');

              (0, _moment2['default'])().range(start, end).by(_constants.Units.HOUR, function (hour) {
                hours.push({
                  moment: hour,
                  label: hour.format('h:mm a'),
                  selected: hour.isSame(datetime, 'minute'),
                  nearestBefore: hour.isBetween(closeBefore, datetime),
                  nearestAfter: hour.isBetween(datetime, closeAfter)
                });
                var halfHour = hour.clone().add(30, 'minutes');
                hours.push({
                  moment: halfHour,
                  label: halfHour.format('h:mm a'),
                  selected: halfHour.isSame(datetime, 'minute'),
                  nearestBefore: halfHour.isBetween(closeBefore, datetime),
                  nearestAfter: halfHour.isBetween(datetime, closeAfter)
                });
              });

              return {
                v: hours
              };
            })();

            if (typeof _ret4 === 'object') return _ret4.v;
          }

      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props = this.props;
      var level = _props.level;
      var datetime = _props.datetime;
      var classes = _props.classes;

      return _react2['default'].createElement(
        'div',
        {
          className: classes.calendar,
          onMouseDown: function (e) {
            return _this.props.above(true);
          },
          onMouseUp: function (e) {
            return _this.props.above(false);
          }
        },
        level != 'hours' && _react2['default'].createElement(_nav2['default'], {
          id: this.props.id,
          onPrev: this.onNavigateLeft.bind(this),
          onNext: this.onNavigateRight.bind(this),
          onTitle: this.onNavigateUp.bind(this),
          title: this.getTitle(level, datetime)
        }),
        _react2['default'].createElement(
          'div',
          { ref: 'grid', className: (0, _classnames2['default'])(classes.grid, level) },
          this.getCells(level, datetime).map(function (cell, i) {
            var type = undefined;
            switch (true) {
              case cell.header:
                type = 'header';
                break;
              case cell.past:
                type = 'past';
                break;
              case cell.future:
                type = 'future';
                break;
              default:
                type = 'base';
                break;
            }
            return _react2['default'].createElement(_cell2['default'], {
              key: i,
              ref: cell.selected || cell.nearestBefore ? 'selected' : null,
              label: cell.label,
              level: level,
              type: type,
              selected: cell.selected,
              today: cell.today,
              moment: cell.moment,
              onClick: _this.onNavigateCell.bind(_this),
              classes: classes,
              invalid: _this.props.validate(cell.moment, level)
            });
          }),
          level != 'hours' && _react2['default'].createElement(
            'div',
            { className: classes.today, onClick: this.onToday.bind(this) },
            'Today'
          )
        )
      );
    }
  }], [{
    key: 'PropTypes',
    value: {
      datetime: _react.PropTypes.object.isRequired,
      onSelect: _react.PropTypes.func.isRequired,
      level: _react.PropTypes.string.isRequired,
      setLevel: _react.PropTypes.func.isRequired,
      onMouseDown: _react.PropTypes.func,
      onMouseUp: _react.PropTypes.func
    },
    enumerable: true
  }]);

  return Calendar;
})(_react.Component);

exports['default'] = (0, _styledComponent2['default'])(Calendar, function (props, id) {
  return (0, _styles2['default'])('calendar', props, id);
});
module.exports = exports['default'];