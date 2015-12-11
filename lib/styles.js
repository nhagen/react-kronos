'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getStyle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

require('moment-range');

var _moment = false;
var _options = {};

function initializeMoment(options) {
  if (!_moment) {
    if (options && options.moment) {
      _moment3['default'].locale(options.moment.lang, options.moment.settings);
    } else {
      _moment3['default'].locale('en', {
        week: { dow: 1 },
        weekdaysMin: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      });
    }
  } else {
    _moment = true;
  }
}

function initializeOptions(options, uuid) {
  _options[uuid] = _lodash2['default'].omit(options, 'moment');
}

function getStyle(page, props, uuid) {
  initializeMoment(props.options);
  if (props.options) {
    initializeOptions(props.options, uuid);
  }
  var defaultOptions = {
    color: '#1e7e9e',
    corners: 4,
    font: 'Source Sans Pro'
  };
  var options = _lodash2['default'].assign(defaultOptions, _options[uuid]);

  var style = undefined;
  switch (page) {
    case 'index':
      style = index(options);
      break;
    case 'calendar':
      style = calendar(options);
      break;
    case 'navigation':
      style = navigation(options);
      break;
    case 'cell':
      style = cell(options);
      break;
  }

  return style;
}

// Styles for each page

function index(options) {
  return {
    kronos: {
      position: 'relative',
      display: 'flex',
      color: 'hsl(0, 0%, 50%)',
      '& *': {
        fontFamily: options.font,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        userSelect: 'none'
      }
    },
    input: {
      border: '1px solid transparent',
      borderRadius: options.corners,
      borderColor: (0, _color2['default'])(options.color).alpha(0.2).rgbString(),
      fontSize: 16,
      padding: '3px 6px',
      background: 'white',
      '&.outside-range': {
        color: 'white',
        background: '#d0021b'
      },
      '&:focus': {
        outline: 'none',
        borderColor: (0, _color2['default'])(options.color).alpha(0.5).rgbString()
      }
    }
  };
}

function calendar(options) {
  return {
    calendar: {
      position: 'absolute',
      top: '100%',
      left: 0,
      padding: 6,
      background: 'white',
      border: '1px solid hsla(0, 0%, 0%, 0.15)',
      borderRadius: options.corners,
      boxShadow: '0 0 7px 5px hsla(0, 0%, 0%, 0.05)',
      textAlign: 'center',
      zIndex: 2
    },
    grid: {
      width: 182,
      '&.hours': {
        height: 200,
        width: 96 + options.corners * 2,
        overflow: 'auto',
        paddingRight: 6
      },
      '&::-webkit-scrollbar': {
        width: options.corners <= 2 ? 4 : options.corners * 2
      },
      '&::-webkit-scrollbar-track': {
        background: (0, _color2['default'])(options.color).alpha(0.05).rgbString(),
        boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.15)',
        borderRadius: options.corners
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: options.corners,
        background: options.color,
        boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.3)'
      }
    },
    today: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      cursor: 'pointer',
      border: '1px solid transparent',
      borderRadius: options.corners,
      marginTop: 3,
      '&:hover': {
        borderColor: (0, _color2['default'])(options.color).alpha(0.5).rgbString(),
        color: options.color
      }
    },
    cell: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid transparent',
      borderRadius: options.corners,
      fontSize: 15,
      cursor: 'pointer',
      '&:not(.selected):not(.header):hover': {
        backgroundColor: (0, _color2['default'])(options.color).alpha(0.2).rgbString(),
        '&:not(.today)': {
          color: 'hsl(0, 0%, 25%)'
        },
        '&.outside-range': {
          color: '#d0021b',
          backgroundColor: (0, _color2['default'])('#d0021b').alpha(0.2).rgbString(),
          cursor: 'not-allowed'
        }
      },
      '&.years': {
        width: 58,
        height: 38
      },
      '&.months': {
        width: 58,
        height: 38
      },
      '&.days': {
        width: 26,
        height: 26
      },
      '&.hours': {
        display: 'flex',
        lineHeight: 1.5
      },
      '&.header': {
        cursor: 'default',
        color: (0, _color2['default'])(options.color).alpha(0.4).rgbString(),
        fontWeight: 700
      },
      '&.past': {
        opacity: 0.4
      },
      '&.future': {
        opacity: 0.4
      },
      '&.today': {
        fontWeight: 700,
        border: '1px solid',
        borderColor: (0, _color2['default'])(options.color).alpha(0.75).rgbString(),
        color: options.color
      },
      '&.selected': {
        backgroundColor: options.color,
        color: 'white',
        '&.outside-range': {
          backgroundColor: '#d0021b'
        }
      },
      '&:not(.selected).outside-range': {
        color: '#d0021b'
      }
    }
  };
}

function navigation(options) {
  return {
    nav: {
      display: 'flex',
      cursor: 'pointer',
      lineHeight: '32px',
      '& > div': {
        border: '1px solid',
        borderColor: 'transparent',
        borderRadius: options.corners,
        '&:hover': {
          borderColor: (0, _color2['default'])(options.color).alpha(0.5).rgbString(),
          color: options.color
        },
        '&.arrow': {
          flex: 1,
          fontSize: 24
        },
        '&.title': {
          flex: 2
        }
      }
    }
  };
}
module.exports = exports['default'];