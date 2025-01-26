"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./src/renderer/components/Editor/Canvas.jsx":
/*!***************************************************!*\
  !*** ./src/renderer/components/Editor/Canvas.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Canvas: () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tiptap_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tiptap/react */ "./node_modules/@tiptap/react/dist/index.js");
/* harmony import */ var _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tiptap/starter-kit */ "./node_modules/@tiptap/starter-kit/dist/index.js");
/* harmony import */ var _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tiptap/extension-link */ "./node_modules/@tiptap/extension-link/dist/index.js");
/* harmony import */ var _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Editor.module.css */ "./src/renderer/components/Editor/Editor.module.css");





function Canvas(_ref) {
  var content = _ref.content,
    onChange = _ref.onChange;
  var editor = (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_4__.useEditor)({
    extensions: [_tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_1__["default"], _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_2__["default"].configure({
      openOnClick: false,
      validate: function validate(href) {
        return /^https?:\/\//.test(href);
      },
      HTMLAttributes: {
        "class": _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].link,
        rel: 'noopener noreferrer nofollow',
        target: '_blank'
      }
    })],
    content: content || '',
    onUpdate: function onUpdate(_ref2) {
      var editor = _ref2.editor;
      onChange({
        target: {
          value: editor.getHTML()
        }
      });
    },
    editorProps: {
      attributes: {
        "class": _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].canvas,
        'data-placeholder': "What's on your mind?"
      }
    }
  });
  var setLink = function setLink() {
    var _editor$getAttributes, _editor$getAttributes2;
    var previousUrl = (_editor$getAttributes = editor === null || editor === void 0 || (_editor$getAttributes2 = editor.getAttributes('link')) === null || _editor$getAttributes2 === void 0 ? void 0 : _editor$getAttributes2.href) !== null && _editor$getAttributes !== void 0 ? _editor$getAttributes : '';
    var url = window.prompt('Enter URL:', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor === null || editor === void 0 || editor.chain().focus().unsetLink().run();
      return;
    }

    // add http:// if no protocol is specified
    var validUrl = url.match(/^https?:\/\//) ? url : "https://".concat(url);
    editor === null || editor === void 0 || editor.chain().focus().setLink({
      href: validUrl
    }).run();
  };
  var removeLink = function removeLink() {
    editor === null || editor === void 0 || editor.chain().focus().unsetLink().run();
  };
  if (!editor) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].toolbar
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: setLink,
    disabled: !editor.can().setLink(),
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].toolbarButton,
    title: "Add or edit link (\u2318K)"
  }, "Add Link"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: removeLink,
    disabled: !editor.isActive('link'),
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].toolbarButton,
    title: "Remove link"
  }, "Remove Link")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_tiptap_react__WEBPACK_IMPORTED_MODULE_4__.EditorContent, {
    editor: editor
  }));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f1c6d2246088242000cb")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.fc4b4e77181cc743ef32.hot-update.js.map