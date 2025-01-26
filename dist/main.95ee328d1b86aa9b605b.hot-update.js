"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/renderer/components/Editor/Editor.module.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/renderer/components/Editor/Editor.module.css ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.Ua5dcXBWxFprimKlev2Y {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
}

.qiN5dTbwkTmuAGyWPBmH {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.qUG5GC5gLhw1O5USXNEw {
  flex-grow: 1;
  padding: 24px;
  outline: none;
}

.qUG5GC5gLhw1O5USXNEw:empty:before {
  content: attr(data-placeholder);
}

.qUG5GC5gLhw1O5USXNEw:empty:focus:before {
  opacity: 0.5;
}

.SNLxOwu6PGPuCjSVm9tj {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
  font-size: 14px;
  gap: 12px;
  position: sticky;
  bottom: 0;
}

.tnaEj53sGq_txp5zLva8 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 6px;
  /* border-top: 1px solid var(--border); */
  background-color: var(--background-tint);
}

.kTUSyQMV8G9BoRm7nqlg {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: opacity 0.2s ease;
}

.kTUSyQMV8G9BoRm7nqlg:hover {
  opacity: 0.8;
}

.kTUSyQMV8G9BoRm7nqlg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`, "",{"version":3,"sources":["webpack://./src/renderer/components/Editor/Editor.module.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;AACf;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,SAAS;EACT,gBAAgB;EAChB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;EACb,WAAW;EACX,yCAAyC;EACzC,wCAAwC;AAC1C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,+BAA+B;EAC/B,6BAA6B;AAC/B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB","sourcesContent":[".container {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  height: 100vh;\n}\n\n.editor {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n\n.canvas {\n  flex-grow: 1;\n  padding: 24px;\n  outline: none;\n}\n\n.canvas:empty:before {\n  content: attr(data-placeholder);\n}\n\n.canvas:empty:focus:before {\n  opacity: 0.5;\n}\n\n.tools {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 12px 24px;\n  font-size: 14px;\n  gap: 12px;\n  position: sticky;\n  bottom: 0;\n}\n\n.actions {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  margin: 6px;\n  /* border-top: 1px solid var(--border); */\n  background-color: var(--background-tint);\n}\n\n.imagePreview {\n  width: 40px;\n  height: 40px;\n  border-radius: 4px;\n  overflow: hidden;\n  cursor: pointer;\n  border: 1px solid var(--border);\n  transition: opacity 0.2s ease;\n}\n\n.imagePreview:hover {\n  opacity: 0.8;\n}\n\n.imagePreview img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"container": `Ua5dcXBWxFprimKlev2Y`,
	"editor": `qiN5dTbwkTmuAGyWPBmH`,
	"canvas": `qUG5GC5gLhw1O5USXNEw`,
	"tools": `SNLxOwu6PGPuCjSVm9tj`,
	"actions": `tnaEj53sGq_txp5zLva8`,
	"imagePreview": `kTUSyQMV8G9BoRm7nqlg`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a0e25d9f51ec7e133730")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.95ee328d1b86aa9b605b.hot-update.js.map