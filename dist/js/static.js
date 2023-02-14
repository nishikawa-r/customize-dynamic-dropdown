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

/***/ "./src/static/static.ts":
/*!******************************!*\
  !*** ./src/static/static.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.kucTable = exports.spaceCode = exports.tableLabel = exports.tableCode = exports.events = void 0;\r\nexports.events = ['app.record.create.show', 'app.record.edit.show'];\r\nexports.tableCode = 'セット項目テーブル';\r\nexports.tableLabel = 'セット項目テーブル';\r\nexports.spaceCode = 'LookUp_Space';\r\nexports.kucTable = {\r\n    枝番号: {\r\n        type: \"dropdown\",\r\n        columnLabel: \"枝番号\",\r\n        defaultRowData: [{ label: \"-----\", value: \"-----\" }],\r\n        isLookUp: false,\r\n        lookUpField: null,\r\n        lookUpTable: \"\",\r\n        lookUpkey: \"\",\r\n        doLookUpchange: \"\",\r\n        parent: \"検査項目コード\",\r\n        parentOptionCode: \"枝番号\",\r\n        parentOptionTable: \"検査内容テーブル\",\r\n        subTitle: \"枝名\",\r\n        app: 569\r\n    },\r\n    検査項目コード: {\r\n        type: \"dropdown\",\r\n        columnLabel: \"検査項目コード\",\r\n        defaultRowData: \"\",\r\n        isLookUp: false,\r\n        lookUpField: null,\r\n        lookUpTable: \"\",\r\n        lookUpkey: \"\",\r\n        doLookUpchange: \"\",\r\n        parent: \"\",\r\n        parentOptionCode: \"検査項目コード\",\r\n        parentOptionTable: \"\",\r\n        subTitle: \"検査項目名\",\r\n        app: 569\r\n    },\r\n    検査項目名: {\r\n        type: \"text\",\r\n        columnLabel: \"検査項目名\",\r\n        defaultRowData: \"\",\r\n        isLookUp: true,\r\n        lookUpField: \"検査項目名\",\r\n        lookUpTable: \"\",\r\n        lookUpkey: \"検査項目コード\",\r\n        doLookUpchange: \"検査項目コード\",\r\n        parent: \"\",\r\n        parentOptionCode: \"\",\r\n        parentOptionTable: \"\",\r\n        subTitle: \"\",\r\n        app: 569\r\n    },\r\n    枝名: {\r\n        type: \"text\",\r\n        columnLabel: \"枝名\",\r\n        defaultRowData: \"\",\r\n        isLookUp: true,\r\n        lookUpField: \"枝名\",\r\n        lookUpTable: \"検査内容テーブル\",\r\n        lookUpkey: \"枝番号\",\r\n        doLookUpchange: \"枝番号\",\r\n        parent: \"\",\r\n        parentOptionCode: \"\",\r\n        parentOptionTable: \"\",\r\n        subTitle: \"\",\r\n        app: 569\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://customize-dynamic-dropdown/./src/static/static.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/static/static.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;