"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./src/renderer/components/Interface/ImagePicker/SelectedImage.jsx":
/*!*************************************************************************!*\
  !*** ./src/renderer/components/Interface/ImagePicker/SelectedImage.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectedImage: () => (/* binding */ SelectedImage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconoir-react */ "./node_modules/iconoir-react/dist/esm/solid/XmarkCircle.mjs");
/* harmony import */ var _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImagePicker.module.css */ "./src/renderer/components/Interface/ImagePicker/ImagePicker.module.css");



function SelectedImage(_ref) {
  var image = _ref.image,
    onClick = _ref.onClick;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].imagePreview
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].removeButton,
    onClick: onClick,
    "aria-label": "Remove image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(iconoir_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    width: 16,
    height: 16
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: image,
    alt: "Selected"
  }));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3cc94c1cef66f3678c86")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.57fa158ab09138b2ce6f.hot-update.js.map