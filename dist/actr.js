(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ActR"] = factory();
	else
		root["ActR"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultPlug = __webpack_require__(2);

var _defaultPlug2 = _interopRequireDefault(_defaultPlug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* ACTION CREATOR FOR REDUX ACTIONS
                                                                                                                                                           *
                                                                                                                                                           * Since most Redux actions are the same in that they take the form of:
                                                                                                                                                           *
                                                                                                                                                           * function myAction(stuff) {
                                                                                                                                                           *   return {
                                                                                                                                                           *     type: ON_MY_ACTION,
                                                                                                                                                           *     stuff
                                                                                                                                                           *   };
                                                                                                                                                           * }
                                                                                                                                                           *
                                                                                                                                                           * This class aims to simplify the creation of actions similar to that of Reflux
                                                                                                                                                           * where you may simply invoke action creation as such:
                                                                                                                                                           *
                                                                                                                                                           * export default new ActionCreator([
                                                                                                                                                           *   'action1',
                                                                                                                                                           *   ...
                                                                                                                                                           * ]);
                                                                                                                                                           *
                                                                                                                                                           * Finally to dispatch actions with Redux you might have something like this:
                                                                                                                                                           *
                                                                                                                                                           * +=========================================================================+
                                                                                                                                                           * |-------------------------------- EXAMPLE --------------------------------|
                                                                                                                                                           * +=========================================================================+
                                                                                                                                                           * MyActions.js
                                                                                                                                                           * ------------
                                                                                                                                                           * import ActionCreator from '/path/to/ActionCreator';
                                                                                                                                                           *
                                                                                                                                                           * export default new ActionCreator([
                                                                                                                                                           *   'myAction'
                                                                                                                                                           * ]);
                                                                                                                                                           *
                                                                                                                                                           * -----------------
                                                                                                                                                           * UsingMyActions.js
                                                                                                                                                           * -----------------
                                                                                                                                                           * import MyActions from '/path/to/MyActions';
                                                                                                                                                           *
                                                                                                                                                           * dispatch(MyActions.myAction({ dataOrSomething: dataOrSomething }));
                                                                                                                                                           *
                                                                                                                                                           * NOTE: You MUST supply data to an action AS AN OBJECT so that when it reaches
                                                                                                                                                           *       the reducer you can access it as action.myKey where myKey is the key
                                                                                                                                                           *       in the object supplied to the action that points to the data
                                                                                                                                                           *
                                                                                                                                                           */


var ActionCreator = function ActionCreator(actions) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, ActionCreator);

  // Actions needs to be an array of strings
  if (actions.constructor.name !== 'Array') {
    throw 'You must supply an array of actions to ActionCreator!';
  } else {
    actions.forEach(function (action) {
      /* For each action we pass it to a plugin for naming in-case the user
       * has their own scheme they would rather use than the default
       *
       * Plugs are free to return an array, object, or string - they may opt
       * to then use either the built-in destructor or provide one themselves
       */
      var types = options.plug && options.plug.naming ? options.plug.naming(action) : _defaultPlug2.default.naming(action);

      options.plug && options.plug.destructor ? options.destructor(action, _this, types) : function () {
        _defaultPlug2.default.destructor(action, _this, types);
      }();
    }, this);
  }
};

exports.default = ActionCreator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultPlug = {
  naming: function naming(action) {
    // If the action is not a string then we throw an error
    if (action.constructor.name !== 'String') {
      throw 'Every action supplied to ActionCreator must be a string!';
    }
    // All actions should be in the format of "ON_SOME_EVENT"
    var actionEventName = 'ON';
    // We create some space to store the indexes of each capital character
    var indexes = [];
    // We look through the string and find and store the index of capital characters
    action.replace(/[A-Z]/g, function (match, index, actionName) {
      indexes.push(index);
    });
    // If there are no capital characters then we just capitalize the whole string
    if (indexes[0] === undefined) {
      actionEventName += '_' + action.toUpperCase();
    } else {
      /* Otherwise we capitalize the first part of an action like myAction
        * so that we get "_MY" */
      actionEventName += '_' + action.substr(0, indexes[0]).toUpperCase();
      /* Then for each index we found above we capitalize that part of the
        * string to "_ACTION" */
      indexes.forEach(function (index, i) {
        /* We want to check if we have reached the end of the string so that
          * we may properly calculate the length of the substr */
        var length = indexes[i + 1] === undefined ? action.length - index : indexes[i + 1] - index;
        actionEventName += '_' + action.substr(index, length).toUpperCase();
      });
      // We should now have an actionEventName like "ON_MY_ACTION"
    }

    return actionEventName;
  },
  /* destructor()
   *
   * @param action [String] A string like 'myAction'
   *
   * @param context [Function] this
   *
   * @param types [Any] Could be an Array, Object, or String
   *
   * @returns [null]
   */
  destructor: function destructor(action, context, types) {
    if (!!types) {
      switch (types.constructor.name) {
        case 'Array':
          {
            /* In this case our types are something like:
             * ['action1', 'action2', ...]
             *
             * And we want to return something like:
             * { action1: options => { ...options, type: 'action1' } }
             */
            types.map(function (type) {
              context[action] = _defineProperty({}, type, function (options) {
                return _extends({}, options, {
                  type: type
                });
              });
            });
            break;
          }
        case 'Object':
          {
            /* In this case our types should be something like:
             * {
             *   FAILURE: 'my-action/FAILURE',
             *   SUCCESS: 'my-action/SUCCESS'
             * }
             *
             * And we will return something like this:
             * { SUCCESS: options => { ...options, type: 'my-action/SUCCESS' } }
             *
             * And then it may be called like this:
             * actions.myAction.SUCCESS(options);
             */
            Object.keys(types).map(function (type) {
              context[action] = _extends({}, context[action] || {}, _defineProperty({}, type, function () {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return _extends({}, options, {
                  type: types[type]
                });
              }));
            });
            break;
          }
        case 'String':
          {
            /* Should give us something like this:
             * { myAction: options => ({ ...options, type: 'ON_MY_ACTION' })
             */
            context[action] = function (options) {
              return _extends({}, options, {
                type: types
              });
            };
            break;
          }
      }
    } else {
      throw 'You must supply action types!';
    }
  }
};

exports.default = defaultPlug;

/***/ })
/******/ ]);
});