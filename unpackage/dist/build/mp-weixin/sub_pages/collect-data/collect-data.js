(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["sub_pages/collect-data/collect-data"],{"389e":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return n}));var c=function(){var e=this,t=e.$createElement;e._self._c},u=[]},"577d":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{}},methods:{handleCfy:function(){var t=this;e.request({url:"https://h5.mcake.com/api/5e90690f0e270d04?cityId=110",method:"GET",header:{"access-token":"bb15f4da64bd6c650de80b0125ad411b",version:"v1.0"},success:function(e){var a=e.data.data,n={requests:[]};a.forEach((function(e){n.requests.push({method:"POST",path:"/1.1/classes/classify",body:e})})),t.$post("/1.1/batch",n)}})},handleGoods:function(){var t=this;e.request({url:"https://h5.mcake.com/api/0434b49d1ac28f9d?cityId=110&page=2&bid=6",method:"GET",header:{"access-token":"cea1733a84af6414e3a5c20d5832ed88",version:"v1.0"},success:function(e){console.log(e);var a=e.data.data.list,n={requests:[]};a.forEach((function(e){n.requests.push({method:"POST",path:"/1.1/classes/goods",body:e})})),t.$post("/1.1/batch",n)}})}}};t.default=a}).call(this,a("543d")["default"])},"5b62":function(e,t,a){"use strict";(function(e){a("02e0");n(a("66fd"));var t=n(a("fbef"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},"848e":function(e,t,a){"use strict";a.r(t);var n=a("577d"),c=a.n(n);for(var u in n)"default"!==u&&function(e){a.d(t,e,(function(){return n[e]}))}(u);t["default"]=c.a},fbef:function(e,t,a){"use strict";a.r(t);var n=a("389e"),c=a("848e");for(var u in c)"default"!==u&&function(e){a.d(t,e,(function(){return c[e]}))}(u);var o,s=a("f0c5"),r=Object(s["a"])(c["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=r.exports}},[["5b62","common/runtime","common/vendor"]]]);