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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }





var EditorErrorBoundary = /*#__PURE__*/function (_React$Component) {
  function EditorErrorBoundary(props) {
    var _this;
    _classCallCheck(this, EditorErrorBoundary);
    _this = _callSuper(this, EditorErrorBoundary, [props]);
    _this.state = {
      hasError: false
    };
    return _this;
  }
  _inherits(EditorErrorBoundary, _React$Component);
  return _createClass(EditorErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.error('Editor Error:', error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].canvas
        }, "Something went wrong with the editor.");
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
  }]);
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));
function Canvas(_ref) {
  var content = _ref.content,
    onChange = _ref.onChange;
  var editor = (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_4__.useEditor)({
    extensions: [_tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_1__["default"].configure({
      history: true
    }), _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_2__["default"].configure({
      openOnClick: false,
      HTMLAttributes: {
        "class": _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].link,
        rel: 'noopener noreferrer nofollow',
        target: '_blank'
      },
      validate: function validate(url) {
        if (url) {
          return /^https?:\/\//.test(url);
        }
        return false;
      }
    })],
    content: typeof content === 'string' ? content : '',
    onUpdate: function onUpdate(_ref2) {
      var editor = _ref2.editor;
      if (editor && onChange) {
        onChange({
          target: {
            value: editor.getHTML()
          }
        });
      }
    },
    editorProps: {
      attributes: {
        "class": _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].canvas,
        'data-placeholder': "What's on your mind?"
      }
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (editor && typeof content === 'string' && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  var setLink = function setLink() {
    try {
      var _editor$getAttributes;
      if (!editor) return;
      var previousUrl = ((_editor$getAttributes = editor.getAttributes('link')) === null || _editor$getAttributes === void 0 ? void 0 : _editor$getAttributes.href) || '';
      var url = window.prompt('Enter URL:', previousUrl);
      if (url === null) return; // cancelled
      if (url === '') {
        editor.chain().focus().unsetLink().run();
        return;
      }

      // add https:// if no protocol is specified
      var validUrl = url.match(/^https?:\/\//) ? url : "https://".concat(url);
      editor.chain().focus().setLink({
        href: validUrl
      }).run();
    } catch (error) {
      console.error('Error setting link:', error);
    }
  };
  var removeLink = function removeLink() {
    try {
      editor === null || editor === void 0 || editor.chain().focus().unsetLink().run();
    } catch (error) {
      console.error('Error removing link:', error);
    }
  };
  if (!editor) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].canvas
    }, "Loading editor...");
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(EditorErrorBoundary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].toolbar
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: setLink,
    disabled: !(editor !== null && editor !== void 0 && editor.can().setLink()),
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].toolbarButton,
    title: "Add or edit link (\u2318K)"
  }, "Add Link"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: removeLink,
    disabled: !(editor !== null && editor !== void 0 && editor.isActive('link')),
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].toolbarButton,
    title: "Remove link"
  }, "Remove Link")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_tiptap_react__WEBPACK_IMPORTED_MODULE_4__.EditorContent, {
    editor: editor
  })));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("249ee897e8ccf16c2a63")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.42c0d10d1be5d851acf3.hot-update.js.map