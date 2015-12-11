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

var _styledComponent = require('./styled-component');

var _styledComponent2 = _interopRequireDefault(_styledComponent);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var Navigation = (function (_Component) {
  _inherits(Navigation, _Component);

  function Navigation() {
    _classCallCheck(this, Navigation);

    _get(Object.getPrototypeOf(Navigation.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.classes.nav },
        _react2['default'].createElement(
          'div',
          { className: 'arrow', onClick: this.props.onPrev },
          '«'
        ),
        _react2['default'].createElement(
          'div',
          { className: 'title', onClick: this.props.onTitle },
          this.props.title
        ),
        _react2['default'].createElement(
          'div',
          { className: 'arrow', onClick: this.props.onNext },
          '»'
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      onPrev: _react.PropTypes.func,
      onNext: _react.PropTypes.func,
      onTitle: _react.PropTypes.func,
      title: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Navigation;
})(_react.Component);

exports['default'] = (0, _styledComponent2['default'])(Navigation, function (props, id) {
  return (0, _styles2['default'])('navigation', props, id);
});
module.exports = exports['default'];