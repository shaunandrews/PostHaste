"use strict";
global["webpackHotUpdatepost_haste"]("main",{

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
  var _ref$selectedImages = _ref.selectedImages,
    selectedImages = _ref$selectedImages === void 0 ? [] : _ref$selectedImages,
    onImageSelect = _ref.onImageSelect,
    onImageRemove = _ref.onImageRemove,
    fileInputRef = _ref.fileInputRef;
  var handleImageClick = function handleImageClick(index) {
    if (typeof index === 'number') {
      onImageRemove(index);
      // Reset the file input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      var _fileInputRef$current;
      (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 || _fileInputRef$current.click();
    }
  };
  var handleImageSelect = function handleImageSelect(e) {
    var files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onImageSelect(files);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleImageSelect,
    accept: "image/jpeg,image/png,image/gif,image/webp",
    style: {
      display: 'none'
    },
    multiple: true
  }), selectedImages.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _ImagePicker_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].imagL
  }, selectedImages.map(function (image, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SelectedImage__WEBPACK_IMPORTED_MODULE_2__.SelectedImage, {
      key: index,
      image: image,
      onClick: function onClick() {
        return handleImageClick(index);
      }
    });
  })), selectedImages.length < 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "default",
    onClick: function onClick() {
      return handleImageClick();
    },
    icon: iconoir_react__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, selectedImages.length > 0 ? 'Add more images' : 'Select images'));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3d8296ab4180efab4f80")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.036de3c921454ed3590e.hot-update.js.map