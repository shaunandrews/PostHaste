"use strict";
global["webpackHotUpdatepost_haste"]("main",{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/renderer/styles/globals.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/renderer/styles/globals.css ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Colors */
:root {
  --background: #FBFDEB;
  --background-tint: rgba(0,0,0,0.1);
  --foreground: #1C1C18;
  --primary: #74AC4D;
  --primary-foreground: #FBFDEB;
  --secondary: #EBEECB;
  --destructive: #B11441;
  --border: #E7E9CF;
  --ring: #000fe2;
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #000000;
    --background-tint: rgba(255,255,255,0.1);
    --foreground: #fafafa;
    --primary: #74AC4D;
    --secondary: #222222;
    --destructive: #B11441;
    --border: #27272a;
    --ring: #000fe2;
  }
}

/* Typography */
:root {
  --font-family: -apple-system-medium, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* Body */
body {
  font-size: 16px;
  font-family: var(--font-family);
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.2;
  font-weight: var(--font-weight-regular);
  -webkit-font-smoothing: antialiased;
  height: 100vh;
  padding: 0;
}

/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
}`, "",{"version":3,"sources":["webpack://./src/renderer/styles/globals.css"],"names":[],"mappings":"AAAA,WAAW;AACX;EACE,qBAAqB;EACrB,kCAAkC;EAClC,qBAAqB;EACrB,kBAAkB;EAClB,6BAA6B;EAC7B,oBAAoB;EACpB,sBAAsB;EACtB,iBAAiB;EACjB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE;IACE,qBAAqB;IACrB,wCAAwC;IACxC,qBAAqB;IACrB,kBAAkB;IAClB,oBAAoB;IACpB,sBAAsB;IACtB,iBAAiB;IACjB,eAAe;EACjB;AACF;;AAEA,eAAe;AACf;EACE,oLAAoL;EACpL,0BAA0B;EAC1B,yBAAyB;EACzB,2BAA2B;EAC3B,uBAAuB;AACzB;;AAEA,SAAS;AACT;EACE,eAAe;EACf,+BAA+B;EAC/B,mCAAmC;EACnC,wBAAwB;EACxB,gBAAgB;EAChB,uCAAuC;EACvC,mCAAmC;EACnC,aAAa;EACb,UAAU;AACZ;;AAEA,wBAAwB;AACxB;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,YAAY;AACd","sourcesContent":["/* Colors */\n:root {\n  --background: #FBFDEB;\n  --background-tint: rgba(0,0,0,0.1);\n  --foreground: #1C1C18;\n  --primary: #74AC4D;\n  --primary-foreground: #FBFDEB;\n  --secondary: #EBEECB;\n  --destructive: #B11441;\n  --border: #E7E9CF;\n  --ring: #000fe2;\n  --radius: 0.5rem;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --background: #000000;\n    --background-tint: rgba(255,255,255,0.1);\n    --foreground: #fafafa;\n    --primary: #74AC4D;\n    --secondary: #222222;\n    --destructive: #B11441;\n    --border: #27272a;\n    --ring: #000fe2;\n  }\n}\n\n/* Typography */\n:root {\n  --font-family: -apple-system-medium, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;\n  --font-weight-regular: 400;\n  --font-weight-medium: 500;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n}\n\n/* Body */\nbody {\n  font-size: 16px;\n  font-family: var(--font-family);\n  background-color: var(--background);\n  color: var(--foreground);\n  line-height: 1.2;\n  font-weight: var(--font-weight-regular);\n  -webkit-font-smoothing: antialiased;\n  height: 100vh;\n  padding: 0;\n}\n\n/* Reset & Base Styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2d3b694f3f1dbac64eda")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.e4238c7e8c7173d8f44f.hot-update.js.map