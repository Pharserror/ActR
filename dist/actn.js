/******/ (function(modules) { // webpackBootstrap
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ACTION CREATOR FOR REDUX ACTIONS
 *
 * Since most Redux actions are the same in that they take the form of:
 *
 * function myAction(stuff) {
 *   return {
 *     type: SOME_EVENT,
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
 * NOTE: You MUST supply data to an action as an object so that when it reaches
 *       the reducer you can access it as action.myKey where myKey is the key
 *       in the object supplied to the action that points to the data
 *
 */

var ActionCreator = function ActionCreator(actions) {
  var _this = this;

  _classCallCheck(this, ActionCreator);

  // Actions needs to be an array of strings
  if (actions.constructor.name !== 'Array') {
    throw "You must supply an array of actions to ActionCreator!";
  } else {
    actions.forEach(function (action) {
      // If the action is not a string then we throw an error
      if (action.constructor.name !== 'String') {
        throw "Every action supplied to ActionCreator must be a string!";
      }
      // All actions should be in the format of "ON_SOME_EVENT"
      var actionEventName = "ON";
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
      _this[action] = function (options) {
        var prop = void 0;
        var returnValue = { type: actionEventName };
        if (!!options) {
          if (options.constructor.name !== 'Object') {
            throw "You must supply arguments to an action as an object!";
          }
          // For every prop in options we add it to the return value
          for (prop in options) {
            returnValue[prop] = options[prop];
          }
        }
        /* Finally we have a return value like:
         * {
         *   type: "ON_MY_ACTION",
         *   otherStuff: otherStuff
         * }
         * And we should be able to dispatch this action as myAction
         */
        return returnValue;
      };
    }, this);
  }
};

exports.default = ActionCreator;

/***/ })
/******/ ]);