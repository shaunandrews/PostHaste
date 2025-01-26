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
/* harmony import */ var _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor.module.css */ "./src/renderer/components/Editor/Editor.module.css");


function TextEditor(_ref) {
  var content = _ref.content,
    onChange = _ref.onChange;
  var editorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var charCount = content.length;
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].editor
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].editorSite
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].editorSiteTitle
  }, siteTitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: editorRef,
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].editorCanvas,
    contentEditable: true,
    onInput: handleInput,
    onPaste: handlePaste,
    onKeyDown: handleKeyDown,
    role: "textbox",
    "aria-multiline": "true",
    "aria-label": "Post content",
    "data-placeholder": "What's on your mind?"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].editorTools
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].charCount
  }, charCount, " characters")));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9a4f9ea987ee72e5905b")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.cacf2e381317f1f95deb.hot-update.js.map