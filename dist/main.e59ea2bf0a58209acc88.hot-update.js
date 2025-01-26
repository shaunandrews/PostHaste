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
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconoir-react */ "./node_modules/iconoir-react/dist/esm/solid/XmarkCircle.mjs");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Button */ "./src/renderer/components/Interface/Button/index.jsx");
/* harmony import */ var _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImagePicker.module.css */ "./src/renderer/components/Interface/ImagePicker/ImagePicker.module.css");




function SelectedImage(_ref) {
  var image = _ref.image,
    onClick = _ref.onClick;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].imagePreview
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: onClick,
    className: _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].removeButton,
    icon: iconoir_react__WEBPACK_IMPORTED_MODULE_3__["default"],
    "aria-label": "Remove image"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: image,
    alt: "Selected"
  }));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("609994c565d714a02bc2")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.e59ea2bf0a58209acc88.hot-update.js.map