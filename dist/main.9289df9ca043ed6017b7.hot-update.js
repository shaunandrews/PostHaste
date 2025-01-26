"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./src/renderer/components/Interface/Button/index.jsx":
/*!************************************************************!*\
  !*** ./src/renderer/components/Interface/Button/index.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.module.css */ "./src/renderer/components/Interface/Button/Button.module.css");
var _excluded = ["children", "variant", "className", "icon", "iconProps"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


function Button(_ref) {
  var children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'default' : _ref$variant,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    Icon = _ref.icon,
    _ref$iconProps = _ref.iconProps,
    iconProps = _ref$iconProps === void 0 ? {
      width: 20,
      height: 20
    } : _ref$iconProps,
    props = _objectWithoutProperties(_ref, _excluded);
  if (!['default', 'primary'].includes(variant)) {
    console.warn("Unknown button variant: ".concat(variant, ". Using default."));
    variant = 'default';
  }
  var isIconOnly = !!Icon;
  var buttonClasses = [_Button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].button, _Button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"][variant], isIconOnly ? _Button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].iconOnly : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", _extends({
    className: buttonClasses,
    title: isIconOnly ? children : undefined
  }, props), Icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Icon, _extends({}, iconProps, {
    className: _Button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: isIconOnly ? _Button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].visuallyHidden : undefined
  }, children));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("60ca09437ae6bc98b0aa")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.9289df9ca043ed6017b7.hot-update.js.map