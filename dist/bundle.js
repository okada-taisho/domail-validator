/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MailcheckLibrary"] = factory();
	else
		root["MailcheckLibrary"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mailcheck/src/mailcheck.js":
/*!*************************************************!*\
  !*** ./node_modules/mailcheck/src/mailcheck.js ***!
  \*************************************************/
/***/ ((module, exports) => {

eval("{var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n * Mailcheck https://github.com/mailcheck/mailcheck\n * Author\n * Derrick Ko (@derrickko)\n *\n * Released under the MIT License.\n *\n * v 1.1.1\n */\n\nvar Mailcheck = {\n  domainThreshold: 2,\n  secondLevelThreshold: 2,\n  topLevelThreshold: 2,\n\n  defaultDomains: ['msn.com', 'bellsouth.net',\n    'telus.net', 'comcast.net', 'optusnet.com.au',\n    'earthlink.net', 'qq.com', 'sky.com', 'icloud.com',\n    'mac.com', 'sympatico.ca', 'googlemail.com',\n    'att.net', 'xtra.co.nz', 'web.de',\n    'cox.net', 'gmail.com', 'ymail.com',\n    'aim.com', 'rogers.com', 'verizon.net',\n    'rocketmail.com', 'google.com', 'optonline.net',\n    'sbcglobal.net', 'aol.com', 'me.com', 'btinternet.com',\n    'charter.net', 'shaw.ca'],\n\n  defaultSecondLevelDomains: [\"yahoo\", \"hotmail\", \"mail\", \"live\", \"outlook\", \"gmx\"],\n\n  defaultTopLevelDomains: [\"com\", \"com.au\", \"com.tw\", \"ca\", \"co.nz\", \"co.uk\", \"de\",\n    \"fr\", \"it\", \"ru\", \"net\", \"org\", \"edu\", \"gov\", \"jp\", \"nl\", \"kr\", \"se\", \"eu\",\n    \"ie\", \"co.il\", \"us\", \"at\", \"be\", \"dk\", \"hk\", \"es\", \"gr\", \"ch\", \"no\", \"cz\",\n    \"in\", \"net\", \"net.au\", \"info\", \"biz\", \"mil\", \"co.jp\", \"sg\", \"hu\"],\n\n  run: function(opts) {\n    opts.domains = opts.domains || Mailcheck.defaultDomains;\n    opts.secondLevelDomains = opts.secondLevelDomains || Mailcheck.defaultSecondLevelDomains;\n    opts.topLevelDomains = opts.topLevelDomains || Mailcheck.defaultTopLevelDomains;\n    opts.distanceFunction = opts.distanceFunction || Mailcheck.sift3Distance;\n\n    var defaultCallback = function(result){ return result };\n    var suggestedCallback = opts.suggested || defaultCallback;\n    var emptyCallback = opts.empty || defaultCallback;\n\n    var result = Mailcheck.suggest(Mailcheck.encodeEmail(opts.email), opts.domains, opts.secondLevelDomains, opts.topLevelDomains, opts.distanceFunction);\n\n    return result ? suggestedCallback(result) : emptyCallback()\n  },\n\n  suggest: function(email, domains, secondLevelDomains, topLevelDomains, distanceFunction) {\n    email = email.toLowerCase();\n\n    var emailParts = this.splitEmail(email);\n\n    if (secondLevelDomains && topLevelDomains) {\n        // If the email is a valid 2nd-level + top-level, do not suggest anything.\n        if (secondLevelDomains.indexOf(emailParts.secondLevelDomain) !== -1 && topLevelDomains.indexOf(emailParts.topLevelDomain) !== -1) {\n            return false;\n        }\n    }\n\n    var closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction, this.domainThreshold);\n\n    if (closestDomain) {\n      if (closestDomain == emailParts.domain) {\n        // The email address exactly matches one of the supplied domains; do not return a suggestion.\n        return false;\n      } else {\n        // The email address closely matches one of the supplied domains; return a suggestion\n        return { address: emailParts.address, domain: closestDomain, full: emailParts.address + \"@\" + closestDomain };\n      }\n    }\n\n    // The email address does not closely match one of the supplied domains\n    var closestSecondLevelDomain = this.findClosestDomain(emailParts.secondLevelDomain, secondLevelDomains, distanceFunction, this.secondLevelThreshold);\n    var closestTopLevelDomain    = this.findClosestDomain(emailParts.topLevelDomain, topLevelDomains, distanceFunction, this.topLevelThreshold);\n\n    if (emailParts.domain) {\n      var closestDomain = emailParts.domain;\n      var rtrn = false;\n\n      if(closestSecondLevelDomain && closestSecondLevelDomain != emailParts.secondLevelDomain) {\n        // The email address may have a mispelled second-level domain; return a suggestion\n        closestDomain = closestDomain.replace(emailParts.secondLevelDomain, closestSecondLevelDomain);\n        rtrn = true;\n      }\n\n      if(closestTopLevelDomain && closestTopLevelDomain != emailParts.topLevelDomain) {\n        // The email address may have a mispelled top-level domain; return a suggestion\n        closestDomain = closestDomain.replace(emailParts.topLevelDomain, closestTopLevelDomain);\n        rtrn = true;\n      }\n\n      if (rtrn == true) {\n        return { address: emailParts.address, domain: closestDomain, full: emailParts.address + \"@\" + closestDomain };\n      }\n    }\n\n    /* The email address exactly matches one of the supplied domains, does not closely\n     * match any domain and does not appear to simply have a mispelled top-level domain,\n     * or is an invalid email address; do not return a suggestion.\n     */\n    return false;\n  },\n\n  findClosestDomain: function(domain, domains, distanceFunction, threshold) {\n    threshold = threshold || this.topLevelThreshold;\n    var dist;\n    var minDist = 99;\n    var closestDomain = null;\n\n    if (!domain || !domains) {\n      return false;\n    }\n    if(!distanceFunction) {\n      distanceFunction = this.sift3Distance;\n    }\n\n    for (var i = 0; i < domains.length; i++) {\n      if (domain === domains[i]) {\n        return domain;\n      }\n      dist = distanceFunction(domain, domains[i]);\n      if (dist < minDist) {\n        minDist = dist;\n        closestDomain = domains[i];\n      }\n    }\n\n    if (minDist <= threshold && closestDomain !== null) {\n      return closestDomain;\n    } else {\n      return false;\n    }\n  },\n\n  sift3Distance: function(s1, s2) {\n    // sift3: http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html\n    if (s1 == null || s1.length === 0) {\n      if (s2 == null || s2.length === 0) {\n        return 0;\n      } else {\n        return s2.length;\n      }\n    }\n\n    if (s2 == null || s2.length === 0) {\n      return s1.length;\n    }\n\n    var c = 0;\n    var offset1 = 0;\n    var offset2 = 0;\n    var lcs = 0;\n    var maxOffset = 5;\n\n    while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {\n      if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {\n        lcs++;\n      } else {\n        offset1 = 0;\n        offset2 = 0;\n        for (var i = 0; i < maxOffset; i++) {\n          if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {\n            offset1 = i;\n            break;\n          }\n          if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {\n            offset2 = i;\n            break;\n          }\n        }\n      }\n      c++;\n    }\n    return (s1.length + s2.length) /2 - lcs;\n  },\n\n  splitEmail: function(email) {\n    var parts = email.trim().split('@');\n\n    if (parts.length < 2) {\n      return false;\n    }\n\n    for (var i = 0; i < parts.length; i++) {\n      if (parts[i] === '') {\n        return false;\n      }\n    }\n\n    var domain = parts.pop();\n    var domainParts = domain.split('.');\n    var sld = '';\n    var tld = '';\n\n    if (domainParts.length == 0) {\n      // The address does not have a top-level domain\n      return false;\n    } else if (domainParts.length == 1) {\n      // The address has only a top-level domain (valid under RFC)\n      tld = domainParts[0];\n    } else {\n      // The address has a domain and a top-level domain\n      sld = domainParts[0];\n      for (var i = 1; i < domainParts.length; i++) {\n        tld += domainParts[i] + '.';\n      }\n      tld = tld.substring(0, tld.length - 1);\n    }\n\n    return {\n      topLevelDomain: tld,\n      secondLevelDomain: sld,\n      domain: domain,\n      address: parts.join('@')\n    }\n  },\n\n  // Encode the email address to prevent XSS but leave in valid\n  // characters, following this official spec:\n  // http://en.wikipedia.org/wiki/Email_address#Syntax\n  encodeEmail: function(email) {\n    var result = encodeURI(email);\n    result = result.replace('%20', ' ').replace('%25', '%').replace('%5E', '^')\n                   .replace('%60', '`').replace('%7B', '{').replace('%7C', '|')\n                   .replace('%7D', '}');\n    return result;\n  }\n};\n\n// Export the mailcheck object if we're in a CommonJS env (e.g. Node).\n// Modeled off of Underscore.js.\nif ( true && module.exports) {\n    module.exports = Mailcheck;\n}\n\n// Support AMD style definitions\n// Based on jQuery (see http://stackoverflow.com/a/17954882/1322410)\nif (true) {\n  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n    return Mailcheck;\n  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n}\n\nif (typeof window !== 'undefined' && window.jQuery) {\n  (function($){\n    $.fn.mailcheck = function(opts) {\n      var self = this;\n      if (opts.suggested) {\n        var oldSuggested = opts.suggested;\n        opts.suggested = function(result) {\n          oldSuggested(self, result);\n        };\n      }\n\n      if (opts.empty) {\n        var oldEmpty = opts.empty;\n        opts.empty = function() {\n          oldEmpty.call(null, self);\n        };\n      }\n\n      opts.email = this.val();\n      Mailcheck.run(opts);\n    }\n  })(jQuery);\n}\n\n\n//# sourceURL=webpack://MailcheckLibrary/./node_modules/mailcheck/src/mailcheck.js?\n}");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MailcheckConfig: () => (/* binding */ MailcheckConfig),\n/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig)\n/* harmony export */ });\n/* harmony import */ var _data_domains_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/domains.js */ \"./src/data/domains.js\");\n/* harmony import */ var _data_second_level_domains_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/second-level-domains.js */ \"./src/data/second-level-domains.js\");\n/* harmony import */ var _data_top_level_domains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/top-level-domains.js */ \"./src/data/top-level-domains.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\n\nvar MailcheckConfig = /*#__PURE__*/function () {\n  function MailcheckConfig() {\n    _classCallCheck(this, MailcheckConfig);\n    this.domains = _toConsumableArray(_data_domains_js__WEBPACK_IMPORTED_MODULE_0__.domains);\n    this.secondLevelDomains = _toConsumableArray(_data_second_level_domains_js__WEBPACK_IMPORTED_MODULE_1__.secondLevelDomains);\n    this.topLevelDomains = _toConsumableArray(_data_top_level_domains_js__WEBPACK_IMPORTED_MODULE_2__.topLevelDomains);\n  }\n  return _createClass(MailcheckConfig, [{\n    key: \"getDomains\",\n    value: function getDomains() {\n      return this.domains;\n    }\n  }, {\n    key: \"getSecondLevelDomains\",\n    value: function getSecondLevelDomains() {\n      return this.secondLevelDomains;\n    }\n  }, {\n    key: \"getTopLevelDomains\",\n    value: function getTopLevelDomains() {\n      return this.topLevelDomains;\n    }\n  }, {\n    key: \"addDomain\",\n    value: function addDomain(domain) {\n      if (!this.domains.includes(domain)) {\n        this.domains.push(domain);\n      }\n    }\n  }, {\n    key: \"addSecondLevelDomain\",\n    value: function addSecondLevelDomain(domain) {\n      if (!this.secondLevelDomains.includes(domain)) {\n        this.secondLevelDomains.push(domain);\n      }\n    }\n  }, {\n    key: \"addTopLevelDomain\",\n    value: function addTopLevelDomain(domain) {\n      if (!this.topLevelDomains.includes(domain)) {\n        this.topLevelDomains.push(domain);\n      }\n    }\n  }]);\n}();\nvar defaultConfig = new MailcheckConfig();\n\n//# sourceURL=webpack://MailcheckLibrary/./src/config.js?\n}");

/***/ }),

/***/ "./src/data/domains.js":
/*!*****************************!*\
  !*** ./src/data/domains.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   domains: () => (/* binding */ domains)\n/* harmony export */ });\nvar domains = [\"gmail.com\", \"yahoo.co.jp\", \"outlook.com\", \"hotmail.com\", \"icloud.com\", \"me.com\", \"mac.com\", \"docomo.ne.jp\", \"ezweb.ne.jp\", \"au.com\", \"softbank.ne.jp\", \"i.softbank.jp\", \"vodafone.ne.jp\", \"ymobile.ne.jp\", \"willcom.com\", \"pdx.ne.jp\", \"nifty.com\", \"nifty.ne.jp\", \"ocn.ne.jp\", \"biglobe.ne.jp\", \"so-net.ne.jp\", \"plala.or.jp\"];\n\n//# sourceURL=webpack://MailcheckLibrary/./src/data/domains.js?\n}");

/***/ }),

/***/ "./src/data/second-level-domains.js":
/*!******************************************!*\
  !*** ./src/data/second-level-domains.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   secondLevelDomains: () => (/* binding */ secondLevelDomains)\n/* harmony export */ });\nvar secondLevelDomains = [\"yahoo\", \"hotmail\", \"outlook\", \"docomo\", \"softbank\", \"au\", \"icloud\", \"nifty\", \"ocn\", \"biglobe\", \"so-net\", \"plala\"];\n\n//# sourceURL=webpack://MailcheckLibrary/./src/data/second-level-domains.js?\n}");

/***/ }),

/***/ "./src/data/top-level-domains.js":
/*!***************************************!*\
  !*** ./src/data/top-level-domains.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   topLevelDomains: () => (/* binding */ topLevelDomains)\n/* harmony export */ });\nvar topLevelDomains = [\"com\", \"net\", \"org\", \"jp\", \"co.jp\", \"ne.jp\", \"or.jp\"];\n\n//# sourceURL=webpack://MailcheckLibrary/./src/data/top-level-domains.js?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MailcheckConfig: () => (/* reexport safe */ _config_js__WEBPACK_IMPORTED_MODULE_1__.MailcheckConfig),\n/* harmony export */   MailcheckLibrary: () => (/* reexport safe */ _mailcheck_library_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   defaultConfig: () => (/* reexport safe */ _config_js__WEBPACK_IMPORTED_MODULE_1__.defaultConfig)\n/* harmony export */ });\n/* harmony import */ var _mailcheck_library_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mailcheck-library.js */ \"./src/mailcheck-library.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ \"./src/config.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  if (document.querySelector('.js-mailcheck-input')) {\n    new _mailcheck_library_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n});\n\n\n//# sourceURL=webpack://MailcheckLibrary/./src/index.js?\n}");

/***/ }),

/***/ "./src/mailcheck-library.js":
/*!**********************************!*\
  !*** ./src/mailcheck-library.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./src/config.js\");\n/* harmony import */ var mailcheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mailcheck */ \"./node_modules/mailcheck/src/mailcheck.js\");\n/* harmony import */ var mailcheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mailcheck__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\nvar MailcheckLibrary = /*#__PURE__*/function () {\n  function MailcheckLibrary() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    _classCallCheck(this, MailcheckLibrary);\n    this.options = Object.assign({\n      selector: '.js-mailcheck-input',\n      suggestionClass: 'js-mailcheck-suggestion',\n      domains: _config_js__WEBPACK_IMPORTED_MODULE_0__.defaultConfig.getDomains(),\n      secondLevelDomains: _config_js__WEBPACK_IMPORTED_MODULE_0__.defaultConfig.getSecondLevelDomains(),\n      topLevelDomains: _config_js__WEBPACK_IMPORTED_MODULE_0__.defaultConfig.getTopLevelDomains(),\n      suggestionTemplate: '💡 もしかして、「<a href=\"#\" class=\"js-mailcheck-suggested\">{suggestion}</a>」でしょうか？'\n    }, options);\n    this.init();\n  }\n  return _createClass(MailcheckLibrary, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      var inputs = document.querySelectorAll(this.options.selector);\n      inputs.forEach(function (input) {\n        return _this.attachToInput(input);\n      });\n    }\n  }, {\n    key: \"attachToInput\",\n    value: function attachToInput(input) {\n      var _this2 = this;\n      var suggestionElement = this.createSuggestionElement(input);\n      input.addEventListener('blur', function () {\n        _this2.checkEmail(input, suggestionElement);\n      });\n    }\n  }, {\n    key: \"createSuggestionElement\",\n    value: function createSuggestionElement(input) {\n      var existing = input.parentNode.querySelector('.' + this.options.suggestionClass);\n      if (existing) {\n        return existing;\n      }\n\n      // input要素をrelativeポジションに設定\n      if (getComputedStyle(input.parentNode).position === 'static') {\n        input.parentNode.style.position = 'relative';\n      }\n\n      // スペーサー要素（提案を表示するエリア）\n      var spacer = document.createElement('div');\n      spacer.className = this.options.suggestionClass + '-spacer';\n      spacer.style.height = '35px';\n      spacer.style.position = 'relative';\n      spacer.style.marginTop = '8px';\n      spacer.style.display = 'none';\n\n      // suggestion要素（スペーサー内に配置）\n      var suggestionDiv = document.createElement('div');\n      suggestionDiv.className = this.options.suggestionClass;\n      suggestionDiv.style.position = 'absolute';\n      suggestionDiv.style.top = '0';\n      suggestionDiv.style.left = '0';\n      suggestionDiv.style.width = '100%';\n      suggestionDiv.style.height = '100%';\n      suggestionDiv.style.color = '#666';\n      suggestionDiv.style.fontSize = '13px';\n      suggestionDiv.style.display = 'flex';\n      suggestionDiv.style.alignItems = 'center';\n      suggestionDiv.style.backgroundColor = '#f8f9fa';\n      suggestionDiv.style.border = '1px solid #e9ecef';\n      suggestionDiv.style.borderRadius = '4px';\n      suggestionDiv.style.padding = '0 12px';\n      suggestionDiv.style.boxSizing = 'border-box';\n      suggestionDiv.style.transition = 'all 0.2s ease';\n      spacer.appendChild(suggestionDiv);\n      input.parentNode.insertBefore(spacer, input.nextSibling);\n      return suggestionDiv;\n    }\n  }, {\n    key: \"checkEmail\",\n    value: function checkEmail(input, suggestionElement) {\n      var _this3 = this;\n      var email = input.value.trim();\n      var spacer = input.parentNode.querySelector('.' + this.options.suggestionClass + '-spacer');\n      if (!email || !email.includes('@')) {\n        suggestionElement.innerHTML = '';\n        if (spacer) spacer.style.display = 'none';\n        return;\n      }\n      mailcheck__WEBPACK_IMPORTED_MODULE_1___default().run({\n        email: email,\n        domains: this.options.domains,\n        secondLevelDomains: this.options.secondLevelDomains,\n        topLevelDomains: this.options.topLevelDomains,\n        suggested: function suggested(suggestion) {\n          _this3.showSuggestion(input, suggestionElement, suggestion);\n          if (spacer) spacer.style.display = 'block';\n        },\n        empty: function empty() {\n          suggestionElement.innerHTML = '';\n          if (spacer) spacer.style.display = 'none';\n        }\n      });\n    }\n  }, {\n    key: \"showSuggestion\",\n    value: function showSuggestion(input, suggestionElement, suggestion) {\n      var _this4 = this;\n      var html = this.options.suggestionTemplate.replace('{suggestion}', suggestion.full);\n      suggestionElement.innerHTML = html;\n      var suggestionLink = suggestionElement.querySelector('.js-mailcheck-suggested');\n      if (suggestionLink) {\n        // リンクのスタイル設定\n        suggestionLink.style.color = '#007bff';\n        suggestionLink.style.textDecoration = 'none';\n        suggestionLink.style.fontWeight = '500';\n        suggestionLink.style.padding = '2px 6px';\n        suggestionLink.style.borderRadius = '3px';\n        suggestionLink.style.backgroundColor = '#e3f2fd';\n        suggestionLink.style.transition = 'all 0.15s ease';\n\n        // ホバー効果\n        suggestionLink.addEventListener('mouseenter', function () {\n          suggestionLink.style.backgroundColor = '#bbdefb';\n          suggestionLink.style.transform = 'translateY(-1px)';\n        });\n        suggestionLink.addEventListener('mouseleave', function () {\n          suggestionLink.style.backgroundColor = '#e3f2fd';\n          suggestionLink.style.transform = 'translateY(0)';\n        });\n        suggestionLink.addEventListener('click', function (e) {\n          e.preventDefault();\n          input.value = suggestion.full;\n          suggestionElement.innerHTML = '';\n          var spacer = input.parentNode.querySelector('.' + _this4.options.suggestionClass + '-spacer');\n          if (spacer) spacer.style.display = 'none';\n          input.focus();\n        });\n      }\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MailcheckLibrary);\n\n//# sourceURL=webpack://MailcheckLibrary/./src/mailcheck-library.js?\n}");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});