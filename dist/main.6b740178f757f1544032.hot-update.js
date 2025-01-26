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
/* harmony import */ var _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImagePicker.module.css */ "./src/renderer/components/Interface/ImagePicker/ImagePicker.module.css");


function SelectedImage(_ref) {
  var image = _ref.image,
    onClick = _ref.onClick;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].imagePreview,
    onClick: onClick,
    role: "button",
    "aria-label": "Remove image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: image,
    alt: "Selected"
  }));
}

/***/ }),

/***/ "./src/renderer/components/Interface/ImagePicker/index.jsx":
/*!*****************************************************************!*\
  !*** ./src/renderer/components/Interface/ImagePicker/index.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImagePicker: () => (/* binding */ ImagePicker)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iconoir-react */ "./node_modules/iconoir-react/dist/esm/regular/MediaImage.mjs");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Button */ "./src/renderer/components/Interface/Button/index.jsx");
/* harmony import */ var _SelectedImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectedImage */ "./src/renderer/components/Interface/ImagePicker/SelectedImage.jsx");
/* harmony import */ var _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ImagePicker.module.css */ "./src/renderer/components/Interface/ImagePicker/ImagePicker.module.css");





function ImagePicker(_ref) {
  var selectedImage = _ref.selectedImage,
    onImageSelect = _ref.onImageSelect,
    onImageRemove = _ref.onImageRemove;
  var fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var handleImageClick = function handleImageClick() {
    if (selectedImage) {
      onImageRemove();
    } else {
      var _fileInputRef$current;
      (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 || _fileInputRef$current.click();
    }
  };
  var handleImageSelect = function handleImageSelect(e) {
    var _e$target$files;
    var file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (file) {
      onImageSelect(file);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleImageSelect,
    accept: "image/jpeg,image/png,image/gif,image/webp",
    style: {
      display: 'none'
    }
  }), selectedImage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SelectedImage__WEBPACK_IMPORTED_MODULE_2__.SelectedImage, {
    image: selectedImage,
    onClick: handleImageClick
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "default",
    onClick: handleImageClick,
    icon: iconoir_react__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, "Select image"));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2a6fe6031ecdcb0cd4c1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.6b740178f757f1544032.hot-update.js.map