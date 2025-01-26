"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./src/renderer/components/Editor/TextEditor.jsx":
/*!*******************************************************!*\
  !*** ./src/renderer/components/Editor/TextEditor.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextEditor: () => (/* binding */ TextEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Interface_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Interface/Button */ "./src/renderer/components/Interface/Button/index.jsx");
/* harmony import */ var _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Editor.module.css */ "./src/renderer/components/Editor/Editor.module.css");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




// Common image formats supported by WordPress
var ALLOWED_IMAGE_TYPES = "image/jpeg,image/png,image/gif,image/webp";
function TextEditor(_ref) {
  var content = _ref.content,
    onChange = _ref.onChange,
    onImageSelect = _ref.onImageSelect;
  var editorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var charCount = content.length;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedImage = _useState2[0],
    setSelectedImage = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Keep the editor content in sync with the content prop
    if (editorRef.current && editorRef.current.textContent !== content) {
      editorRef.current.textContent = content;
    }
  }, [content]);
  var handleInput = function handleInput(e) {
    var newContent = e.target.textContent;
    onChange({
      target: {
        value: newContent
      }
    });
  };
  var handlePaste = function handlePaste(e) {
    e.preventDefault();
    var text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };
  var handleImageClick = function handleImageClick() {
    var _fileInputRef$current;
    setError('');
    (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 || _fileInputRef$current.click();
  };
  var handleImageSelect = function handleImageSelect(e) {
    var _e$target$files;
    var file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (file) {
      if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setSelectedImage(file);
        setError('');
        onImageSelect === null || onImageSelect === void 0 || onImageSelect(file);
      } else {
        setError('Please select a JPG, PNG, GIF, or WebP image.');
        setSelectedImage(null);
        onImageSelect === null || onImageSelect === void 0 || onImageSelect(null);
      }
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].editor
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: editorRef,
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].canvas,
    contentEditable: true,
    onInput: handleInput,
    onPaste: handlePaste,
    onKeyDown: handleKeyDown,
    role: "textbox",
    "aria-multiline": "true",
    "aria-label": "Post content",
    "data-placeholder": "What's on your mind?"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].tools
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].site
  }, "shaunandrews.com"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].imageUpload
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleImageSelect,
    accept: ALLOWED_IMAGE_TYPES,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Interface_Button__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "default",
    onClick: handleImageClick,
    title: "Supported formats: JPG, PNG, GIF, WebP"
  }, selectedImage ? selectedImage.name : 'Select image'), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].error
  }, error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].count
  }, charCount, " characters")));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f8c18f22f27f563285e1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.794c417347d3a5b2f771.hot-update.js.map