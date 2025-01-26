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
  align-items: center;
  padding: 18px;
  min-height: 240px;
}

.BlFS2adwYaFQMpILFslP {
  font-weight: var(--font-weight-semibold);
  font-size: 12px;
  margin-top: -6px;
  padding: 4px 6px;
  border-radius: var(--radius);
  width: fit-content;
  outline: none;
  border: none;
  cursor: text;
  -webkit-app-region: no-drag;
}

.BlFS2adwYaFQMpILFslP:empty {
  cursor: pointer;
}

.BlFS2adwYaFQMpILFslP:hover,
.BlFS2adwYaFQMpILFslP:focus {
  background: var(--secondary);
}

.BlFS2adwYaFQMpILFslP:empty:before {
  content: attr(data-placeholder);
  opacity: 0.5;
  font-style: italic;
}

.BlFS2adwYaFQMpILFslP:empty:focus:before {
  opacity: 0.35;
}

.qUG5GC5gLhw1O5USXNEw {
  flex-grow: 1;
  width: 100%;
  outline: none;
  padding: 12px;
  -webkit-app-region: no-drag;
}

.qUG5GC5gLhw1O5USXNEw:empty:before {
  content: attr(data-placeholder);
  pointer-events: none;
}

.qUG5GC5gLhw1O5USXNEw:empty:focus:before {
  opacity: 0.5;
}

.tnaEj53sGq_txp5zLva8 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.zKIZKNZnhMDRqePgl03G,
.gSj4jIN3yZoexlYAavNf {
  display: flex;
  align-items: center;
  gap: 12px;
}

.YqLuuAV08b6oE1E3ELzW {
  width: 140px;
}

.zE97qEWVwX4fBdQoqMuY {
  color: #dc2626;
}
`, "",{"version":3,"sources":["webpack://./src/renderer/components/Editor/Editor.module.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,wCAAwC;EACxC,eAAe;EACf,gBAAgB;EAChB,gBAAgB;EAChB,4BAA4B;EAC5B,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,2BAA2B;AAC7B;;AAEA;EACE,eAAe;AACjB;;AAEA;;EAEE,4BAA4B;AAC9B;;AAEA;EACE,+BAA+B;EAC/B,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,+BAA+B;EAC/B,oBAAoB;AACtB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;EACX,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;AACvB;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;AAChB","sourcesContent":[".container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 18px;\n  min-height: 240px;\n}\n\n.title {\n  font-weight: var(--font-weight-semibold);\n  font-size: 12px;\n  margin-top: -6px;\n  padding: 4px 6px;\n  border-radius: var(--radius);\n  width: fit-content;\n  outline: none;\n  border: none;\n  cursor: text;\n  -webkit-app-region: no-drag;\n}\n\n.title:empty {\n  cursor: pointer;\n}\n\n.title:hover,\n.title:focus {\n  background: var(--secondary);\n}\n\n.title:empty:before {\n  content: attr(data-placeholder);\n  opacity: 0.5;\n  font-style: italic;\n}\n\n.title:empty:focus:before {\n  opacity: 0.35;\n}\n\n.canvas {\n  flex-grow: 1;\n  width: 100%;\n  outline: none;\n  padding: 12px;\n  -webkit-app-region: no-drag;\n}\n\n.canvas:empty:before {\n  content: attr(data-placeholder);\n  pointer-events: none;\n}\n\n.canvas:empty:focus:before {\n  opacity: 0.5;\n}\n\n.actions {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n.leftActions,\n.rightActions {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.publishButton {\n  width: 140px;\n}\n\n.error {\n  color: #dc2626;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"container": `Ua5dcXBWxFprimKlev2Y`,
	"title": `BlFS2adwYaFQMpILFslP`,
	"canvas": `qUG5GC5gLhw1O5USXNEw`,
	"actions": `tnaEj53sGq_txp5zLva8`,
	"leftActions": `zKIZKNZnhMDRqePgl03G`,
	"rightActions": `gSj4jIN3yZoexlYAavNf`,
	"publishButton": `YqLuuAV08b6oE1E3ELzW`,
	"error": `zE97qEWVwX4fBdQoqMuY`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ae2b651a0e25feef41e3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.c4188d2b3ab73b896163.hot-update.js.map