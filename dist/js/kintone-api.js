/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@kintone/rest-api-client/lib/index.browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/@kintone/rest-api-client/lib/index.browser.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.KintoneRestAPIClient = void 0;\nvar platform_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './platform/'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar browserDeps = __importStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './platform/browser'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n(0, platform_1.injectPlatformDeps)(browserDeps);\nvar KintoneRestAPIClient_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './KintoneRestAPIClient'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nObject.defineProperty(exports, \"KintoneRestAPIClient\", ({ enumerable: true, get: function () { return KintoneRestAPIClient_1.KintoneRestAPIClient; } }));\n__exportStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './error'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), exports);\n//# sourceMappingURL=index.browser.js.map\n\n//# sourceURL=webpack://customize-dynamic-dropdown/./node_modules/@kintone/rest-api-client/lib/index.browser.js?");

/***/ }),

/***/ "./src/common/kintone-api.ts":
/*!***********************************!*\
  !*** ./src/common/kintone-api.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.kintoneApi = void 0;\r\nconst rest_api_client_1 = __webpack_require__(/*! ../../node_modules/@kintone/rest-api-client */ \"./node_modules/@kintone/rest-api-client/lib/index.browser.js\");\r\nclass kintoneApi {\r\n    constructor() {\r\n        this.client = new rest_api_client_1.KintoneRestAPIClient();\r\n    }\r\n    async GetTestingItems(params) {\r\n        return await this.client.record.getAllRecords(params).then((resp) => resp).catch((err) => err);\r\n    }\r\n}\r\nexports.kintoneApi = kintoneApi;\r\n\n\n//# sourceURL=webpack://customize-dynamic-dropdown/./src/common/kintone-api.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/common/kintone-api.ts");
/******/ 	
/******/ })()
;