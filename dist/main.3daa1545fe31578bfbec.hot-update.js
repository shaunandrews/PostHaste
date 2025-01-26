"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./src/renderer/components/Interface/Input/index.jsx":
/*!***********************************************************!*\
  !*** ./src/renderer/components/Interface/Input/index.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/utils */ "./src/renderer/lib/utils.js");
/* harmony import */ var _Input_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input.module.css */ "./src/renderer/components/Interface/Input/Input.module.css");
var _excluded = ["className", "type", "icon"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }



var Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    type = _ref.type,
    icon = _ref.icon,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: _Input_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].wrapper
  }, icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: _Input_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].icon
  }, icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", _extends({
    type: type,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)(_Input_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].input, icon && _Input_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].hasIcon, className),
    ref: ref
  }, props)));
});
Input.displayName = "Input";


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("51686a9f09b8b06a0e12")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.3daa1545fe31578bfbec.hot-update.js.map