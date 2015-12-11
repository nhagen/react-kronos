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

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _constants = require('./constants');

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _styledComponent = require('./styled-component');

var _styledComponent2 = _interopRequireDefault(_styledComponent);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

_jss2['default'].use(require('jss-nested'));
_jss2['default'].use(require('jss-camel-case'));
_jss2['default'].use(require('jss-vendor-prefixer'));
_jss2['default'].use(require('jss-px'));

var ISOregex = /((\d{4}\-\d\d\-\d\d)[tT]([\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))/;

var Kronos = (function (_Component) {
  _inherits(Kronos, _Component);

  function Kronos(props) {
    _classCallCheck(this, Kronos);

    _get(Object.getPrototypeOf(Kronos.prototype), 'constructor', this).call(this, props);

    this.state = {
      datetime: this.getDateTimeInput().datetime,
      input: this.getDateTimeInput().input,
      type: this.getDateTimeInput().type,
      visible: false,
      level: this.getDefaultLevel()
    };
  }

  _createClass(Kronos, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props != nextProps) {
        this.validate(this.getDateTimeInput(nextProps).datetime, null, true);
        this.setState({
          datetime: this.getDateTimeInput(nextProps).datetime,
          input: this.getDateTimeInput(nextProps).input
        });
      }
    }
  }, {
    key: 'getDateTimeInput',
    value: function getDateTimeInput(props) {
      props = props || this.props;
      var prop = props.date || props.time || null;

      var datetime = undefined,
          input = undefined,
          type = undefined;
      if (prop === null) {
        datetime = (0, _moment2['default'])();
        input = null;
        type = _constants.Types.MOMENT;
      } else {
        datetime = this.parse(prop);
        input = datetime.format(this.format(props));
        switch (typeof prop) {
          case 'object':
            if (_moment2['default'].isDate(prop)) {
              type = _constants.Types.JS_DATE;
            } else if (_moment2['default'].isMoment(prop)) {
              type = _constants.Types.MOMENT;
            } else {
              type = null;
            }
            break;
          case 'string':
            if (prop.match(ISOregex)) {
              type = _constants.Types.ISO;
            } else {
              type = _constants.Types.STRING;
            }
            break;
        }
      }

      return {
        datetime: datetime,
        input: input,
        type: type
      };
    }
  }, {
    key: 'getDefaultLevel',
    value: function getDefaultLevel() {
      if (typeof this.props.date !== 'undefined') {
        return _constants.Units.DAY;
      } else if (typeof this.props.time !== 'undefined') {
        return _constants.Units.HOUR;
      } else {
        console.warn('Please set a date or time prop. It can be null but not undefined.');
        return _constants.Units.DAY;
      }
    }
  }, {
    key: 'format',
    value: function format(props) {
      props = props || this.props;
      if (props.format) {
        return props.format;
      } else if (props.date) {
        return 'MM-DD-YYYY';
      } else if (props.time) {
        return 'h:mm a';
      } else {
        return null;
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(visible) {
      visible || !this.state.visible;
      if (visible !== this.state.visible) {
        this.setState({ visible: visible });
      }
    }
  }, {
    key: 'parse',
    value: function parse(input) {
      if (input === null) return null;
      var parsing = (0, _moment2['default'])(input, this.format(), true);
      if (!parsing.isValid()) {
        var test = new Date(input);
        if (isNaN(test.getTime())) {
          test = this.state && this.state.datetime || (0, _moment2['default'])();
        }

        parsing = (0, _moment2['default'])(test);
      }

      return parsing;
    }
  }, {
    key: 'save',
    value: function save(saving) {
      var datetime = this.state.datetime;

      if (this.props.date) {
        saving.hours(datetime.hours());
        saving.minutes(datetime.minutes());
      }
      if (this.props.time) {
        saving.date(datetime.date());
        saving.month(datetime.month());
        saving.year(datetime.year());
      }
      this.setState({
        datetime: saving,
        input: saving.format(this.format())
      });

      if (this.validate(saving, null, true)) this.commit(saving);
    }
  }, {
    key: 'validate',
    value: function validate(datetime, timeUnit, isSaving) {
      var outsideRange = false;

      if (this.props.min && (0, _moment2['default'])(datetime).isBefore(this.props.min)) {
        outsideRange = true;
      }
      if (this.props.max && (0, _moment2['default'])(datetime).isAfter(this.props.max)) {
        outsideRange = true;
      }

      if (outsideRange && timeUnit !== 'hours') {
        if ((0, _moment2['default'])(datetime).isSame(this.props.min, timeUnit) || (0, _moment2['default'])(datetime).isSame(this.props.max, timeUnit)) {
          outsideRange = false;
        }
      }

      if (isSaving) {
        this.setState({ dateTimeExceedsValidRange: outsideRange });
        if (this.props.shouldTriggerOnChangeForDateTimeOutsideRange) return true;
      }

      return !outsideRange;
    }
  }, {
    key: 'commit',
    value: function commit(datetime) {
      var returnAs = this.props.returnAs || this.state.type;
      var result = undefined;
      switch (returnAs) {
        case _constants.Types.ISO:
          result = datetime.toISOString();
          break;
        case _constants.Types.JS_DATE:
          result = datetime.toDate();
          break;
        case _constants.Types.MOMENT:
          result = datetime;
          break;
        case _constants.Types.STRING:
          result = datetime.format(this.format());
          break;
      }

      this.props.onChange && this.props.onChange(result);
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var input = e.target.value;
      var datetime = (0, _moment2['default'])(input, this.format(), true);
      if (datetime.isValid()) {
        this.save(datetime);
      } else if (input == '') {
        this.setState({
          datetime: null,
          input: ''
        });
        this.props.onChange && this.props.onChange(null);
      } else {
        this.setState({ input: input });
      }
    }
  }, {
    key: 'onSelect',
    value: function onSelect(datetime, close, timeUnit) {
      var shouldClose = close;
      var visible = this.state.visible;
      var _props = this.props;
      var closeOnSelect = _props.closeOnSelect;
      var preventClickForDateTimeOutsideRange = _props.preventClickForDateTimeOutsideRange;

      if (timeUnit) {
        if (!this.validate(datetime, timeUnit.unit)) shouldClose = false;
      } else {
        if (!this.validate(datetime)) shouldClose = false;
      }
      if (close && shouldClose === false && preventClickForDateTimeOutsideRange) return;

      this.setState({ visible: closeOnSelect && shouldClose ? !visible : visible });
      this.save(datetime);
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      if (this.above) {
        _reactDom2['default'].findDOMNode(this.refs.input).focus();
      } else if (this.props.closeOnBlur) {
        this.toggle(false);
      }
      if (this.state.input == this.state.datetime.format(this.format())) {
        return;
      } else {
        datetime = this.parse(this.state.input);
        if (datetime) this.save(datetime);
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(code) {
      var datetime = this.state.datetime || (0, _moment2['default'])();
      var lvl = _constants.Levels[this.state.level];

      switch (code) {
        case _constants.Keys.UP:
          this.onSelect(datetime.subtract(lvl.key.span, lvl.key.unit));
          break;
        case _constants.Keys.DOWN:
          this.onSelect(datetime.add(lvl.key.span, lvl.key.unit));
          break;
        case _constants.Keys.ENTER:
          if (lvl.down) {
            this.setState({ level: lvl.down });
          } else {
            if (this.state.input == datetime.format(this.format())) {
              this.toggle();
            } else {
              if (!this.state.visible) this.toggle(true);
              datetime = this.parse(this.state.input);
              this.save(datetime);
            }
          }
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var mainClasses = (0, _classnames2['default'])('react-kronos', this.props.id, this.props.classes.kronos);
      var inputClasses = (0, _classnames2['default'])(this.props.classes.input, { 'outside-range': this.state.dateTimeExceedsValidRange });

      return _react2['default'].createElement(
        'div',
        { className: mainClasses },
        _react2['default'].createElement('input', {
          type: 'text',
          ref: 'input',
          value: this.state.input,
          onClick: function () {
            return _this.toggle(true);
          },
          onFocus: function () {
            return _this.toggle(true);
          },
          onBlur: this.onBlur.bind(this),
          onKeyDown: function (e) {
            return _this.onKeyDown(e.keyCode);
          },
          onChange: this.onChange.bind(this),
          placeholder: this.props.placeholder,
          className: inputClasses
        }),
        this.state.visible && _react2['default'].createElement(_calendar2['default'], {
          id: this.props.id,
          datetime: this.state.datetime,
          onSelect: this.onSelect.bind(this),
          above: function (bool) {
            return _this.above = bool;
          },
          level: this.state.level,
          setLevel: function (level) {
            return _this.setState({ level: level });
          },
          validate: this.validate.bind(this)
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      date: _react.PropTypes.any,
      time: _react.PropTypes.any,
      min: _react.PropTypes.any,
      max: _react.PropTypes.any,
      shouldTriggerOnChangeForDateTimeOutsideRange: _react.PropTypes.bool,
      preventClickOnDateTimeOutsideRange: _react.PropTypes.bool,
      format: _react.PropTypes.string,
      onChange: _react.PropTypes.func,
      returnAs: _react.PropTypes.oneOf([_constants.Types.ISO, _constants.Types.JS_DATE, _constants.Types.MOMENT, _constants.Types.STRING]),
      closeOnSelect: _react.PropTypes.bool,
      closeOnBlur: _react.PropTypes.bool,
      placeholder: _react.PropTypes.string,
      options: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    // styles: React.PropTypes.object
    value: {
      closeOnSelect: true,
      closeOnBlur: true,
      shouldTriggerOnChangeForDateTimeOutsideRange: false,
      preventClickOnDateTimeOutsideRange: false
    },
    enumerable: true
  }, {
    key: 'above',
    value: false,
    enumerable: true
  }]);

  return Kronos;
})(_react.Component);

exports['default'] = (0, _styledComponent2['default'])(Kronos, function (props, id) {
  return (0, _styles2['default'])('index', props, id);
});
module.exports = exports['default'];