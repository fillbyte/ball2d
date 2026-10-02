var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = "5532af7ca9da3779ea23", u = "e13e5d89", d = {
	X: 0,
	Y: 1,
	SPEED_X: 2,
	SPEED_Y: 3,
	RADIUS: 4,
	INVERSE_MASS: 5,
	DAMPING: 6,
	BOUNCE: 7,
	GRAVITY_X: 8,
	GRAVITY_Y: 9,
	COLLISION_GROUP: 10,
	COLLISION_MASK: 11,
	PLAYER_SLOT: 12,
	TEAM: 13,
	INPUT: 14,
	KICK_STATE: 15,
	SPAWN_X: 16,
	SPAWN_Y: 17,
	KICK_BUDGET: 17
}, f = 1023, p = 1024, m = 2048, h = [
	[
		"x",
		0,
		-8192,
		8192
	],
	[
		"y",
		1,
		-8192,
		8192
	],
	[
		"xspeed",
		2,
		-8192,
		8192
	],
	[
		"yspeed",
		3,
		-8192,
		8192
	],
	[
		"xgravity",
		8,
		-8192,
		8192
	],
	[
		"ygravity",
		9,
		-8192,
		8192
	],
	[
		"radius",
		4,
		.5,
		100
	],
	[
		"bCoeff",
		7,
		-1,
		8192
	],
	[
		"invMass",
		5,
		0,
		8192
	],
	[
		"damping",
		6,
		0,
		8192
	],
	[
		"color",
		-1,
		-1,
		16777215
	],
	[
		"cMask",
		11,
		-2147483648,
		2147483647
	],
	[
		"cGroup",
		10,
		-2147483648,
		2147483647
	]
];
function g(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid disc property update");
	let t = e, n = {};
	for (let e = 0; e < h.length; e++) {
		let [r, , i, a] = h[e], o = t[r];
		if (o == null) continue;
		if (typeof o != "number" || !Number.isFinite(o)) throw Error(`Invalid disc property: ${r}`);
		let s = e < 10 ? Math.fround(o) : o | 0;
		if (!Number.isFinite(s) || s < Math.fround(i) || s > a) throw Error(`Invalid disc property: ${r}`);
		n[r] = s;
	}
	return n;
}
var _ = 6619135;
function v(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isInteger)) throw Error("Invalid kick rate limit");
	return Math.max(0, Math.min(255, e)) | Math.max(0, Math.min(255, t)) << 8 | Math.max(0, Math.min(100, n)) << 16;
}
function y(e) {
	return [
		e & 255,
		e >>> 8 & 255,
		e >>> 16
	];
}
function b(e = "Emerald Arena", t = 440, n = 220) {
	let r = [
		[-t, -n],
		[t, -n],
		[-t, n],
		[t, n],
		[-t, -70],
		[-t, 70],
		[t, -70],
		[t, 70],
		[-t - 30, -70],
		[-t - 30, 70],
		[t + 30, -70],
		[t + 30, 70],
		[0, -n - 40],
		[0, -65],
		[0, 65],
		[0, n + 40]
	];
	return JSON.stringify({
		version: 1,
		physicsMode: "substeps",
		name: e,
		width: t + 75,
		height: n + 65,
		spawnDistance: t * .4,
		bg: {
			type: "grass",
			width: t,
			height: n,
			kickOffRadius: 65,
			color: "285B35"
		},
		vertexes: r.map(([e, t], n) => ({
			x: e,
			y: t,
			...n >= 12 ? {
				cGroup: ["redKO", "blueKO"],
				cMask: ["red", "blue"]
			} : { cMask: ["ball"] }
		})),
		segments: [
			...[
				[0, 1],
				[2, 3],
				[0, 4],
				[5, 2],
				[1, 6],
				[7, 3],
				[4, 8],
				[8, 9],
				[9, 5],
				[6, 10],
				[10, 11],
				[11, 7]
			].map(([e, t], n) => ({
				v0: e,
				v1: t,
				cMask: ["ball"],
				color: n < 6 ? "FFFFFF" : "C7D2CA",
				bCoef: n < 6 ? .8 : .15
			})),
			{
				v0: 12,
				v1: 13,
				vis: !1,
				cGroup: ["redKO", "blueKO"],
				cMask: ["red", "blue"]
			},
			{
				v0: 14,
				v1: 15,
				vis: !1,
				cGroup: ["redKO", "blueKO"],
				cMask: ["red", "blue"]
			},
			{
				v0: 14,
				v1: 13,
				curve: -180,
				vis: !1,
				cGroup: ["redKO"],
				cMask: ["red", "blue"]
			},
			{
				v0: 14,
				v1: 13,
				curve: 180,
				vis: !1,
				cGroup: ["blueKO"],
				cMask: ["red", "blue"]
			}
		],
		planes: [
			{
				normal: [0, 1],
				dist: -n - 40
			},
			{
				normal: [0, -1],
				dist: -n - 40
			},
			{
				normal: [1, 0],
				dist: -t - 50
			},
			{
				normal: [-1, 0],
				dist: -t - 50
			}
		],
		goals: [{
			p0: [-t, -70],
			p1: [-t, 70],
			team: "red"
		}, {
			p0: [t, -70],
			p1: [t, 70],
			team: "blue"
		}],
		discs: [...[-t, t].flatMap((e) => [-70, 70].map((t) => ({
			pos: [e, t],
			radius: 6,
			invMass: 0,
			color: "FFFFFF",
			bCoef: .5
		})))],
		ballPhysics: {
			radius: 9,
			damping: .991,
			bCoef: .6
		},
		playerPhysics: {
			radius: 15,
			acceleration: .11,
			damping: .96,
			kickStrength: 5.5
		}
	}, null, 2);
}
var x = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : n.JSON5 = r();
	})(e, (function() {
		function e(e, t) {
			return t = { exports: {} }, e(t, t.exports), t.exports;
		}
		var t = e(function(e) {
			var t = e.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
			typeof __g == "number" && (__g = t);
		}), n = e(function(e) {
			var t = e.exports = { version: "2.6.5" };
			typeof __e == "number" && (__e = t);
		});
		n.version;
		var r = function(e) {
			return typeof e == "object" ? e !== null : typeof e == "function";
		}, i = function(e) {
			if (!r(e)) throw TypeError(e + " is not an object!");
			return e;
		}, a = function(e) {
			try {
				return !!e();
			} catch {
				return !0;
			}
		}, o = !a(function() {
			return Object.defineProperty({}, "a", { get: function() {
				return 7;
			} }).a != 7;
		}), s = t.document, c = r(s) && r(s.createElement), l = function(e) {
			return c ? s.createElement(e) : {};
		}, u = !o && !a(function() {
			return Object.defineProperty(l("div"), "a", { get: function() {
				return 7;
			} }).a != 7;
		}), d = function(e, t) {
			if (!r(e)) return e;
			var n, i;
			if (t && typeof (n = e.toString) == "function" && !r(i = n.call(e)) || typeof (n = e.valueOf) == "function" && !r(i = n.call(e)) || !t && typeof (n = e.toString) == "function" && !r(i = n.call(e))) return i;
			throw TypeError("Can't convert object to primitive value");
		}, f = Object.defineProperty, p = { f: o ? Object.defineProperty : function(e, t, n) {
			if (i(e), t = d(t, !0), i(n), u) try {
				return f(e, t, n);
			} catch {}
			if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
			return "value" in n && (e[t] = n.value), e;
		} }, m = function(e, t) {
			return {
				enumerable: !(e & 1),
				configurable: !(e & 2),
				writable: !(e & 4),
				value: t
			};
		}, h = o ? function(e, t, n) {
			return p.f(e, t, m(1, n));
		} : function(e, t, n) {
			return e[t] = n, e;
		}, g = {}.hasOwnProperty, _ = function(e, t) {
			return g.call(e, t);
		}, v = 0, y = Math.random(), b = function(e) {
			return `Symbol(${e === void 0 ? "" : e})_${(++v + y).toString(36)}`;
		}, x = e(function(e) {
			var r = "__core-js_shared__", i = t[r] || (t[r] = {});
			(e.exports = function(e, t) {
				return i[e] || (i[e] = t === void 0 ? {} : t);
			})("versions", []).push({
				version: n.version,
				mode: "global",
				copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
			});
		})("native-function-to-string", Function.toString), ee = e(function(e) {
			var r = b("src"), i = "toString", a = ("" + x).split(i);
			n.inspectSource = function(e) {
				return x.call(e);
			}, (e.exports = function(e, n, i, o) {
				var s = typeof i == "function";
				s && (_(i, "name") || h(i, "name", n)), e[n] !== i && (s && (_(i, r) || h(i, r, e[n] ? "" + e[n] : a.join(String(n)))), e === t ? e[n] = i : o ? e[n] ? e[n] = i : h(e, n, i) : (delete e[n], h(e, n, i)));
			})(Function.prototype, i, function() {
				return typeof this == "function" && this[r] || x.call(this);
			});
		}), S = function(e) {
			if (typeof e != "function") throw TypeError(e + " is not a function!");
			return e;
		}, C = function(e, t, n) {
			if (S(e), t === void 0) return e;
			switch (n) {
				case 1: return function(n) {
					return e.call(t, n);
				};
				case 2: return function(n, r) {
					return e.call(t, n, r);
				};
				case 3: return function(n, r, i) {
					return e.call(t, n, r, i);
				};
			}
			return function() {
				return e.apply(t, arguments);
			};
		}, w = "prototype", T = function(e, r, i) {
			var a = e & T.F, o = e & T.G, s = e & T.S, c = e & T.P, l = e & T.B, u = o ? t : s ? t[r] || (t[r] = {}) : (t[r] || {})[w], d = o ? n : n[r] || (n[r] = {}), f = d[w] || (d[w] = {}), p, m, g, _;
			for (p in o && (i = r), i) m = !a && u && u[p] !== void 0, g = (m ? u : i)[p], _ = l && m ? C(g, t) : c && typeof g == "function" ? C(Function.call, g) : g, u && ee(u, p, g, e & T.U), d[p] != g && h(d, p, _), c && f[p] != g && (f[p] = g);
		};
		t.core = n, T.F = 1, T.G = 2, T.S = 4, T.P = 8, T.B = 16, T.W = 32, T.U = 64, T.R = 128;
		var E = T, D = Math.ceil, te = Math.floor, O = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? te : D)(e);
		}, ne = function(e) {
			if (e == null) throw TypeError("Can't call method on  " + e);
			return e;
		}, k = function(e) {
			return function(t, n) {
				var r = String(ne(t)), i = O(n), a = r.length, o, s;
				return i < 0 || i >= a ? e ? "" : void 0 : (o = r.charCodeAt(i), o < 55296 || o > 56319 || i + 1 === a || (s = r.charCodeAt(i + 1)) < 56320 || s > 57343 ? e ? r.charAt(i) : o : e ? r.slice(i, i + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
			};
		}(!1);
		E(E.P, "String", { codePointAt: function(e) {
			return k(this, e);
		} }), n.String.codePointAt;
		var A = Math.max, re = Math.min, j = function(e, t) {
			return e = O(e), e < 0 ? A(e + t, 0) : re(e, t);
		}, ie = String.fromCharCode, ae = String.fromCodePoint;
		E(E.S + E.F * (!!ae && ae.length != 1), "String", { fromCodePoint: function(e) {
			for (var t = arguments, n = [], r = arguments.length, i = 0, a; r > i;) {
				if (a = +t[i++], j(a, 1114111) !== a) throw RangeError(a + " is not a valid code point");
				n.push(a < 65536 ? ie(a) : ie(((a -= 65536) >> 10) + 55296, a % 1024 + 56320));
			}
			return n.join("");
		} }), n.String.fromCodePoint;
		var oe = {
			Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
			ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
			ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		}, M = {
			isSpaceSeparator: function(e) {
				return typeof e == "string" && oe.Space_Separator.test(e);
			},
			isIdStartChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || oe.ID_Start.test(e));
			},
			isIdContinueChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || oe.ID_Continue.test(e));
			},
			isDigit: function(e) {
				return typeof e == "string" && /[0-9]/.test(e);
			},
			isHexDigit: function(e) {
				return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
			}
		}, se, N, P, ce, le, F, I, ue, de, fe = function(e, t) {
			se = String(e), N = "start", P = [], ce = 0, le = 1, F = 0, I = void 0, ue = void 0, de = void 0;
			do
				I = ge(), Ce[N]();
			while (I.type !== "eof");
			return typeof t == "function" ? pe({ "": de }, "", t) : de;
		};
		function pe(e, t, n) {
			var r = e[t];
			if (typeof r == "object" && r) {
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
					var a = String(i), o = pe(r, a, n);
					o === void 0 ? delete r[a] : Object.defineProperty(r, a, {
						value: o,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
				else for (var s in r) {
					var c = pe(r, s, n);
					c === void 0 ? delete r[s] : Object.defineProperty(r, s, {
						value: c,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
			}
			return n.call(e, t, r);
		}
		var L, R, me, he, z;
		function ge() {
			for (L = "default", R = "", me = !1, he = 1;;) {
				z = _e();
				var e = ve[L]();
				if (e) return e;
			}
		}
		function _e() {
			if (se[ce]) return String.fromCodePoint(se.codePointAt(ce));
		}
		function B() {
			var e = _e();
			return e === "\n" ? (le++, F = 0) : e ? F += e.length : F++, e && (ce += e.length), e;
		}
		var ve = {
			default: function() {
				switch (z) {
					case "	":
					case "\v":
					case "\f":
					case " ":
					case "\xA0":
					case "﻿":
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						B();
						return;
					case "/":
						B(), L = "comment";
						return;
					case void 0: return B(), V("eof");
				}
				if (M.isSpaceSeparator(z)) {
					B();
					return;
				}
				return ve[N]();
			},
			comment: function() {
				switch (z) {
					case "*":
						B(), L = "multiLineComment";
						return;
					case "/":
						B(), L = "singleLineComment";
						return;
				}
				throw H(B());
			},
			multiLineComment: function() {
				switch (z) {
					case "*":
						B(), L = "multiLineCommentAsterisk";
						return;
					case void 0: throw H(B());
				}
				B();
			},
			multiLineCommentAsterisk: function() {
				switch (z) {
					case "*":
						B();
						return;
					case "/":
						B(), L = "default";
						return;
					case void 0: throw H(B());
				}
				B(), L = "multiLineComment";
			},
			singleLineComment: function() {
				switch (z) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						B(), L = "default";
						return;
					case void 0: return B(), V("eof");
				}
				B();
			},
			value: function() {
				switch (z) {
					case "{":
					case "[": return V("punctuator", B());
					case "n": return B(), ye("ull"), V("null", null);
					case "t": return B(), ye("rue"), V("boolean", !0);
					case "f": return B(), ye("alse"), V("boolean", !1);
					case "-":
					case "+":
						B() === "-" && (he = -1), L = "sign";
						return;
					case ".":
						R = B(), L = "decimalPointLeading";
						return;
					case "0":
						R = B(), L = "zero";
						return;
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						R = B(), L = "decimalInteger";
						return;
					case "I": return B(), ye("nfinity"), V("numeric", Infinity);
					case "N": return B(), ye("aN"), V("numeric", NaN);
					case "\"":
					case "'":
						me = B() === "\"", R = "", L = "string";
						return;
				}
				throw H(B());
			},
			identifierNameStartEscape: function() {
				if (z !== "u") throw H(B());
				B();
				var e = Se();
				switch (e) {
					case "$":
					case "_": break;
					default: if (!M.isIdStartChar(e)) throw De();
				}
				R += e, L = "identifierName";
			},
			identifierName: function() {
				switch (z) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						R += B();
						return;
					case "\\":
						B(), L = "identifierNameEscape";
						return;
				}
				if (M.isIdContinueChar(z)) {
					R += B();
					return;
				}
				return V("identifier", R);
			},
			identifierNameEscape: function() {
				if (z !== "u") throw H(B());
				B();
				var e = Se();
				switch (e) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default: if (!M.isIdContinueChar(e)) throw De();
				}
				R += e, L = "identifierName";
			},
			sign: function() {
				switch (z) {
					case ".":
						R = B(), L = "decimalPointLeading";
						return;
					case "0":
						R = B(), L = "zero";
						return;
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						R = B(), L = "decimalInteger";
						return;
					case "I": return B(), ye("nfinity"), V("numeric", he * Infinity);
					case "N": return B(), ye("aN"), V("numeric", NaN);
				}
				throw H(B());
			},
			zero: function() {
				switch (z) {
					case ".":
						R += B(), L = "decimalPoint";
						return;
					case "e":
					case "E":
						R += B(), L = "decimalExponent";
						return;
					case "x":
					case "X":
						R += B(), L = "hexadecimal";
						return;
				}
				return V("numeric", he * 0);
			},
			decimalInteger: function() {
				switch (z) {
					case ".":
						R += B(), L = "decimalPoint";
						return;
					case "e":
					case "E":
						R += B(), L = "decimalExponent";
						return;
				}
				if (M.isDigit(z)) {
					R += B();
					return;
				}
				return V("numeric", he * Number(R));
			},
			decimalPointLeading: function() {
				if (M.isDigit(z)) {
					R += B(), L = "decimalFraction";
					return;
				}
				throw H(B());
			},
			decimalPoint: function() {
				switch (z) {
					case "e":
					case "E":
						R += B(), L = "decimalExponent";
						return;
				}
				if (M.isDigit(z)) {
					R += B(), L = "decimalFraction";
					return;
				}
				return V("numeric", he * Number(R));
			},
			decimalFraction: function() {
				switch (z) {
					case "e":
					case "E":
						R += B(), L = "decimalExponent";
						return;
				}
				if (M.isDigit(z)) {
					R += B();
					return;
				}
				return V("numeric", he * Number(R));
			},
			decimalExponent: function() {
				switch (z) {
					case "+":
					case "-":
						R += B(), L = "decimalExponentSign";
						return;
				}
				if (M.isDigit(z)) {
					R += B(), L = "decimalExponentInteger";
					return;
				}
				throw H(B());
			},
			decimalExponentSign: function() {
				if (M.isDigit(z)) {
					R += B(), L = "decimalExponentInteger";
					return;
				}
				throw H(B());
			},
			decimalExponentInteger: function() {
				if (M.isDigit(z)) {
					R += B();
					return;
				}
				return V("numeric", he * Number(R));
			},
			hexadecimal: function() {
				if (M.isHexDigit(z)) {
					R += B(), L = "hexadecimalInteger";
					return;
				}
				throw H(B());
			},
			hexadecimalInteger: function() {
				if (M.isHexDigit(z)) {
					R += B();
					return;
				}
				return V("numeric", he * Number(R));
			},
			string: function() {
				switch (z) {
					case "\\":
						B(), R += be();
						return;
					case "\"":
						if (me) return B(), V("string", R);
						R += B();
						return;
					case "'":
						if (!me) return B(), V("string", R);
						R += B();
						return;
					case "\n":
					case "\r": throw H(B());
					case "\u2028":
					case "\u2029":
						Oe(z);
						break;
					case void 0: throw H(B());
				}
				R += B();
			},
			start: function() {
				switch (z) {
					case "{":
					case "[": return V("punctuator", B());
				}
				L = "value";
			},
			beforePropertyName: function() {
				switch (z) {
					case "$":
					case "_":
						R = B(), L = "identifierName";
						return;
					case "\\":
						B(), L = "identifierNameStartEscape";
						return;
					case "}": return V("punctuator", B());
					case "\"":
					case "'":
						me = B() === "\"", L = "string";
						return;
				}
				if (M.isIdStartChar(z)) {
					R += B(), L = "identifierName";
					return;
				}
				throw H(B());
			},
			afterPropertyName: function() {
				if (z === ":") return V("punctuator", B());
				throw H(B());
			},
			beforePropertyValue: function() {
				L = "value";
			},
			afterPropertyValue: function() {
				switch (z) {
					case ",":
					case "}": return V("punctuator", B());
				}
				throw H(B());
			},
			beforeArrayValue: function() {
				if (z === "]") return V("punctuator", B());
				L = "value";
			},
			afterArrayValue: function() {
				switch (z) {
					case ",":
					case "]": return V("punctuator", B());
				}
				throw H(B());
			},
			end: function() {
				throw H(B());
			}
		};
		function V(e, t) {
			return {
				type: e,
				value: t,
				line: le,
				column: F
			};
		}
		function ye(e) {
			for (var t = 0, n = e; t < n.length; t += 1) {
				var r = n[t];
				if (_e() !== r) throw H(B());
				B();
			}
		}
		function be() {
			switch (_e()) {
				case "b": return B(), "\b";
				case "f": return B(), "\f";
				case "n": return B(), "\n";
				case "r": return B(), "\r";
				case "t": return B(), "	";
				case "v": return B(), "\v";
				case "0":
					if (B(), M.isDigit(_e())) throw H(B());
					return "\0";
				case "x": return B(), xe();
				case "u": return B(), Se();
				case "\n":
				case "\u2028":
				case "\u2029": return B(), "";
				case "\r": return B(), _e() === "\n" && B(), "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw H(B());
				case void 0: throw H(B());
			}
			return B();
		}
		function xe() {
			var e = "", t = _e();
			if (!M.isHexDigit(t) || (e += B(), t = _e(), !M.isHexDigit(t))) throw H(B());
			return e += B(), String.fromCodePoint(parseInt(e, 16));
		}
		function Se() {
			for (var e = "", t = 4; t-- > 0;) {
				var n = _e();
				if (!M.isHexDigit(n)) throw H(B());
				e += B();
			}
			return String.fromCodePoint(parseInt(e, 16));
		}
		var Ce = {
			start: function() {
				if (I.type === "eof") throw Ee();
				we();
			},
			beforePropertyName: function() {
				switch (I.type) {
					case "identifier":
					case "string":
						ue = I.value, N = "afterPropertyName";
						return;
					case "punctuator":
						Te();
						return;
					case "eof": throw Ee();
				}
			},
			afterPropertyName: function() {
				if (I.type === "eof") throw Ee();
				N = "beforePropertyValue";
			},
			beforePropertyValue: function() {
				if (I.type === "eof") throw Ee();
				we();
			},
			beforeArrayValue: function() {
				if (I.type === "eof") throw Ee();
				if (I.type === "punctuator" && I.value === "]") {
					Te();
					return;
				}
				we();
			},
			afterPropertyValue: function() {
				if (I.type === "eof") throw Ee();
				switch (I.value) {
					case ",":
						N = "beforePropertyName";
						return;
					case "}": Te();
				}
			},
			afterArrayValue: function() {
				if (I.type === "eof") throw Ee();
				switch (I.value) {
					case ",":
						N = "beforeArrayValue";
						return;
					case "]": Te();
				}
			},
			end: function() {}
		};
		function we() {
			var e;
			switch (I.type) {
				case "punctuator":
					switch (I.value) {
						case "{":
							e = {};
							break;
						case "[": e = [];
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string": e = I.value;
			}
			if (de === void 0) de = e;
			else {
				var t = P[P.length - 1];
				Array.isArray(t) ? t.push(e) : Object.defineProperty(t, ue, {
					value: e,
					writable: !0,
					enumerable: !0,
					configurable: !0
				});
			}
			if (typeof e == "object" && e) P.push(e), N = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName";
			else {
				var n = P[P.length - 1];
				N = n == null ? "end" : Array.isArray(n) ? "afterArrayValue" : "afterPropertyValue";
			}
		}
		function Te() {
			P.pop();
			var e = P[P.length - 1];
			N = e == null ? "end" : Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue";
		}
		function H(e) {
			return Ae(e === void 0 ? "JSON5: invalid end of input at " + le + ":" + F : "JSON5: invalid character '" + ke(e) + "' at " + le + ":" + F);
		}
		function Ee() {
			return Ae("JSON5: invalid end of input at " + le + ":" + F);
		}
		function De() {
			return F -= 5, Ae("JSON5: invalid identifier character at " + le + ":" + F);
		}
		function Oe(e) {
			console.warn("JSON5: '" + ke(e) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function ke(e) {
			var t = {
				"'": "\\'",
				"\"": "\\\"",
				"\\": "\\\\",
				"\b": "\\b",
				"\f": "\\f",
				"\n": "\\n",
				"\r": "\\r",
				"	": "\\t",
				"\v": "\\v",
				"\0": "\\0",
				"\u2028": "\\u2028",
				"\u2029": "\\u2029"
			};
			if (t[e]) return t[e];
			if (e < " ") {
				var n = e.charCodeAt(0).toString(16);
				return "\\x" + ("00" + n).substring(n.length);
			}
			return e;
		}
		function Ae(e) {
			var t = SyntaxError(e);
			return t.lineNumber = le, t.columnNumber = F, t;
		}
		return {
			parse: fe,
			stringify: function(e, t, n) {
				var r = [], i = "", a, o, s = "", c;
				if (typeof t == "object" && t && !Array.isArray(t) && (n = t.space, c = t.quote, t = t.replacer), typeof t == "function") o = t;
				else if (Array.isArray(t)) {
					a = [];
					for (var l = 0, u = t; l < u.length; l += 1) {
						var d = u[l], f = void 0;
						typeof d == "string" ? f = d : (typeof d == "number" || d instanceof String || d instanceof Number) && (f = String(d)), f !== void 0 && a.indexOf(f) < 0 && a.push(f);
					}
				}
				return n instanceof Number ? n = Number(n) : n instanceof String && (n = String(n)), typeof n == "number" ? n > 0 && (n = Math.min(10, Math.floor(n)), s = "          ".substr(0, n)) : typeof n == "string" && (s = n.substr(0, 10)), p("", { "": e });
				function p(e, t) {
					var n = t[e];
					switch (n != null && (typeof n.toJSON5 == "function" ? n = n.toJSON5(e) : typeof n.toJSON == "function" && (n = n.toJSON(e))), o && (n = o.call(t, e, n)), n instanceof Number ? n = Number(n) : n instanceof String ? n = String(n) : n instanceof Boolean && (n = n.valueOf()), n) {
						case null: return "null";
						case !0: return "true";
						case !1: return "false";
					}
					if (typeof n == "string") return m(n, !1);
					if (typeof n == "number") return String(n);
					if (typeof n == "object") return Array.isArray(n) ? _(n) : h(n);
				}
				function m(e) {
					for (var t = {
						"'": .1,
						"\"": .2
					}, n = {
						"'": "\\'",
						"\"": "\\\"",
						"\\": "\\\\",
						"\b": "\\b",
						"\f": "\\f",
						"\n": "\\n",
						"\r": "\\r",
						"	": "\\t",
						"\v": "\\v",
						"\0": "\\0",
						"\u2028": "\\u2028",
						"\u2029": "\\u2029"
					}, r = "", i = 0; i < e.length; i++) {
						var a = e[i];
						switch (a) {
							case "'":
							case "\"":
								t[a]++, r += a;
								continue;
							case "\0": if (M.isDigit(e[i + 1])) {
								r += "\\x00";
								continue;
							}
						}
						if (n[a]) {
							r += n[a];
							continue;
						}
						if (a < " ") {
							var o = a.charCodeAt(0).toString(16);
							r += "\\x" + ("00" + o).substring(o.length);
							continue;
						}
						r += a;
					}
					var s = c || Object.keys(t).reduce(function(e, n) {
						return t[e] < t[n] ? e : n;
					});
					return r = r.replace(new RegExp(s, "g"), n[s]), s + r + s;
				}
				function h(e) {
					if (r.indexOf(e) >= 0) throw TypeError("Converting circular structure to JSON5");
					r.push(e);
					var t = i;
					i += s;
					for (var n = a || Object.keys(e), o = [], c = 0, l = n; c < l.length; c += 1) {
						var u = l[c], d = p(u, e);
						if (d !== void 0) {
							var f = g(u) + ":";
							s !== "" && (f += " "), f += d, o.push(f);
						}
					}
					var m;
					if (o.length === 0) m = "{}";
					else {
						var h;
						if (s === "") h = o.join(","), m = "{" + h + "}";
						else {
							var _ = ",\n" + i;
							h = o.join(_), m = "{\n" + i + h + ",\n" + t + "}";
						}
					}
					return r.pop(), i = t, m;
				}
				function g(e) {
					if (e.length === 0) return m(e, !0);
					var t = String.fromCodePoint(e.codePointAt(0));
					if (!M.isIdStartChar(t)) return m(e, !0);
					for (var n = t.length; n < e.length; n++) if (!M.isIdContinueChar(String.fromCodePoint(e.codePointAt(n)))) return m(e, !0);
					return e;
				}
				function _(e) {
					if (r.indexOf(e) >= 0) throw TypeError("Converting circular structure to JSON5");
					r.push(e);
					var t = i;
					i += s;
					for (var n = [], a = 0; a < e.length; a++) {
						var o = p(String(a), e);
						n.push(o === void 0 ? "null" : o);
					}
					var c;
					if (n.length === 0) c = "[]";
					else if (s === "") c = "[" + n.join(",") + "]";
					else {
						var l = ",\n" + i, u = n.join(l);
						c = "[\n" + i + u + ",\n" + t + "]";
					}
					return r.pop(), i = t, c;
				}
			}
		};
	}));
})))(), 1);
function ee(e, t, n, r) {
	let i = Math.ceil(2 * Math.SQRT2 * 100 / Math.max(.5, Math.min(10, r))), a = e + 32;
	if (a * (2 * t + a + 2 * n) * i * 13 > 26e6) throw Error("Stadium collision complexity exceeds the room budget");
}
var S = {
	ball: 1,
	red: 2,
	blue: 4,
	redKO: 8,
	blueKO: 16,
	wall: 32,
	kick: 64,
	score: 128,
	c0: 268435456,
	c1: 536870912,
	c2: 1073741824,
	c3: -2147483648,
	all: 63
}, C = 4096;
function w(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Expected an object");
	return e;
}
function T(e, t, n = -4096, r = C) {
	let i = e === void 0 ? t : e;
	if (typeof i != "number" || !Number.isFinite(i) || i < n || i > r) throw Error(`Number must be between ${n} and ${r}`);
	return i;
}
function E(e, t = [0, 0]) {
	if (e === void 0) return [...t];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Expected [x, y]");
	return [T(e[0], 0), T(e[1], 0)];
}
function D(e, t) {
	if (e === void 0) return [];
	if (!Array.isArray(e) || e.length > t) throw Error(`Array limit: ${t}`);
	return e;
}
function te(e, t) {
	return e === void 0 ? t : typeof e == "number" ? T(e, t, -2147483648, 4294967295) | 0 : D(e, 16).reduce((e, t) => {
		if (typeof t != "string" || !Object.hasOwn(S, t)) throw Error("Unknown collision flag");
		return e | S[t];
	}, 0);
}
function O(e, t = "FFFFFF") {
	if (e === void 0) return t;
	if (e === "transparent") return e;
	if (Array.isArray(e) && e.length === 3) return e.map((e) => Math.round(T(e, 0, 0, 255)).toString(16).padStart(2, "0")).join("");
	if (typeof e == "string" && /^[0-9a-f]{6}$/i.test(e)) return e;
	throw Error("Invalid color");
}
var ne = /^([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/, k = 64;
function A(e) {
	if (typeof e != "string" || e.length > k) return;
	let t = ne.exec(e);
	return t ? {
		family: t[1],
		variant: t[2]
	} : void 0;
}
function re(e, t) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (!Number.isFinite(e)) throw Error(`${t} is not a finite number`);
			return;
		}
		if (Array.isArray(e)) {
			for (let [n, r] of e.entries()) re(r, `${t}[${n}]`);
			return;
		}
		if (typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype) {
			for (let [n, r] of Object.entries(e)) re(r, `${t}.${n}`);
			return;
		}
		throw Error(`${t} must be plain data (strings, numbers, booleans, arrays, objects)`);
	}
}
function j(e) {
	if (e && typeof e == "object") {
		for (let t of Object.values(e)) j(t);
		Object.freeze(e);
	}
	return e;
}
var ie = /* @__PURE__ */ RegExp("ı", "g"), ae = (e) => e.normalize("NFD").replace(/\p{M}/gu, "").replace(ie, "i").toLowerCase();
function oe(e) {
	let { kind: t, families: n } = e, r = e.tags, i = Object.keys(r), a = e.translations ?? {};
	re(e.variants, `${t} variants`);
	let o = /* @__PURE__ */ new Map(), s = new Map(n.map((e) => [e.id, []]));
	for (let n of e.variants) {
		let e = A(n.id);
		if (!e || e.family !== n.family) throw Error(`${t} variant ${n.id} must be ${n.family}/<variant>`);
		if (o.has(n.id)) throw Error(`${t} variant ${n.id} is defined twice`);
		let r = s.get(n.family);
		if (!r) throw Error(`${t} variant ${n.id} names an unknown family`);
		for (let e of n.tags) if (!i.includes(e)) throw Error(`${t} variant ${n.id} has unknown tag ${e}`);
		o.set(n.id, n), r.push(n);
	}
	let c = /* @__PURE__ */ new Map();
	for (let e of n) {
		let n = o.get(e.defaultVariant);
		if (!n || n.family !== e.id) throw Error(`${t} family ${e.id} has no default variant ${e.defaultVariant}`);
		c.set(e.id, n);
	}
	let l = j(n.flatMap((e) => s.get(e.id) ?? [])), u = new Set(n.map((e) => e.id)), d = (e) => {
		let t = A(e)?.family;
		return t && u.has(t) ? t : void 0;
	}, f = (e, t = "en") => {
		let n = "tag" in e ? `tag:${e.tag}` : e.id, i = "tag" in e ? r[e.tag] ?? e.tag : e.name;
		return a[t]?.[n] ?? i;
	}, p = ["en", ...Object.keys(a)], m = /* @__PURE__ */ new Map(), h = (e) => {
		let t = m.get(e.id);
		if (t === void 0) {
			let n = [e.id, e.name];
			for (let t of p) n.push(f(e, t));
			for (let t of e.tags) {
				n.push(t);
				for (let e of p) n.push(f({ tag: t }, e));
			}
			t = ae(n.join(" ")), m.set(e.id, t);
		}
		return t;
	};
	return Object.freeze({
		kind: t,
		families: j([...n]),
		variants: l,
		tags: j(i),
		get: (e) => typeof e == "string" ? o.get(e) : void 0,
		has: (e) => typeof e == "string" && o.has(e),
		familyOf: d,
		inFamily: (e) => s.get(e) ?? [],
		defaultFor(e) {
			let n = c.get(e);
			if (!n) throw Error(`Unknown ${t} family ${e}`);
			return n;
		},
		resolve(e) {
			let t = typeof e == "string" ? o.get(e) : void 0;
			if (t) return t;
			let n = d(e);
			return n ? c.get(n) : void 0;
		},
		search(e, t = {}) {
			let n = ae(e).split(/\s+/).filter(Boolean);
			return l.filter((e) => (!t.family || e.family === t.family) && (t.tags ?? []).every((t) => e.tags.includes(t)) && n.every((t) => h(e).includes(t)));
		},
		name: f
	});
}
var M = [
	"grass",
	"asphalt",
	"felt"
], se = {
	grass: "grass/classic-stripes",
	asphalt: "asphalt/street-court",
	felt: "felt/town-roads"
};
function N(e) {
	let t = A(e)?.family;
	return !!t && M.includes(t);
}
function P(e) {
	let t = e.indexOf("/");
	return t < 0 ? e : e.slice(0, t);
}
function ce(e) {
	return e === "none" ? "none" : P(e);
}
var le = {
	...se,
	"carpet-town": "felt/town-roads",
	"carpet-park": "felt/park",
	"carpet-joga-bonito": "felt/joga-bonito"
};
function F(e) {
	return typeof e == "string" && Object.hasOwn(le, e) ? le[e] : N(e) ? e : void 0;
}
function I(e, t) {
	return e.bg.type === "none" ? "none" : t ?? e.bg.type;
}
var ue = 4096, de = 1024, fe = .15, pe = 1e-4, L = (e) => [T(e.x, 0), T(e.y, 0)];
function R(e) {
	return {
		a: L(e),
		b: L(e),
		bCoef: T(e.bCoef, 1, -1, 8192),
		cGroup: te(e.cGroup, 32),
		cMask: te(e.cMask, 63),
		bias: 0,
		color: "transparent",
		vis: !1
	};
}
function me(e) {
	return e.curveF === void 0 ? T(e.curve, 0, -359, 359) : 2 * Math.atan2(1, T(e.curveF, 0, -1e8, 1e8)) * 180 / Math.PI;
}
function he(e, t, n, r, i, a) {
	let o = r * Math.PI / 180, s = t[0] - e[0], c = t[1] - e[1];
	if (Math.hypot(s, c) < .001) throw Error("Arc endpoints overlap");
	let l = 1 / (2 * Math.tan(o / 2)), u = [(e[0] + t[0]) / 2 - c * l, (e[1] + t[1]) / 2 + s * l], d = Math.hypot(e[0] - u[0], e[1] - u[1]), f = Math.atan2(e[1] - u[1], e[0] - u[0]), p = Math.ceil(Math.abs(o) / Math.max(1e-8, 2 * Math.acos(Math.max(-1, 1 - fe / d))));
	if (a.segments.length + p > ue) throw Error("Compiled geometry exceeds 4096 segments");
	let m = {
		a: e,
		b: t,
		...n,
		center: u,
		radius: d,
		start: f,
		sweep: o,
		major: i.curveF === void 0 ? Math.abs(r) > 180 : Number(i.curveF) <= 0
	};
	a.arcs.push(m), a.colliders.push(m);
	let h = e;
	for (let e = 1; e <= p; e++) {
		let r = e === p ? t : [u[0] + d * Math.cos(f + o * e / p), u[1] + d * Math.sin(f + o * e / p)];
		a.segments.push({
			a: h,
			b: r,
			...n,
			renderOnly: !0
		}), h = r;
	}
}
function z(e, t, n) {
	let r = e.map(R), i = {
		segments: r,
		arcs: [],
		colliders: [...r]
	};
	for (let a of D(t, de)) {
		let t = n(a), o = T(t.v0, -1, 0, e.length - 1), s = T(t.v1, -1, 0, e.length - 1);
		if (!Number.isInteger(o) || !Number.isInteger(s)) throw Error("Vertex indices must be integers");
		let c = L(e[o]), l = L(e[s]), u = {
			bCoef: T(t.bCoef, 1, -1, 8192),
			cGroup: te(t.cGroup, 32),
			cMask: te(t.cMask, 63),
			bias: T(t.bias, 0, -100, 100),
			color: O(t.color, "000000"),
			vis: t.vis !== !1
		}, d = me(t);
		if (Math.abs(d) >= pe) {
			he(c, l, u, d, t, i);
			continue;
		}
		let f = {
			a: c,
			b: l,
			...u
		};
		r.push(f), (c[0] !== l[0] || c[1] !== l[1]) && i.colliders.push(f);
	}
	if (r.length > ue) throw Error("Compiled geometry exceeds 4096 segments");
	return i;
}
var ge = Object.fromEntries(Object.entries({
	root: "version physicsMode name width height maxViewWidth cameraFollow spawnDistance canBeStored kickOffReset bg traits vertexes segments goals discs planes joints redSpawnPoints blueSpawnPoints playerPhysics ballPhysics",
	bg: "type width height kickOffRadius cornerRadius color lineColor lineWidth lineOpacity showBoundary showHalfwayLine showCenterCircle",
	vertexes: "trait x y bCoef cMask cGroup",
	segments: "trait v0 v1 bCoef cMask cGroup curve curveF bias color vis",
	discs: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color",
	planes: "trait normal dist bCoef cMask cGroup",
	goals: "trait p0 p1 team",
	joints: "trait d0 d1 length strength color",
	playerPhysics: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color acceleration kickingAcceleration kickingDamping kickStrength kickback"
}).map(([e, t]) => [e, new Set(t.split(" "))])), _e = new Set([
	"vertexes",
	"segments",
	"discs",
	"planes",
	"goals",
	"joints",
	"playerPhysics"
].flatMap((e) => [...ge[e]]));
function B(e) {
	let t = [], n = (e, t) => {
		let n = t.length > 80 ? `${t.slice(0, 80)}…` : t;
		return e + (/^[A-Za-z_$][\w$]*$/.test(n) ? `.${n}` : `[${JSON.stringify(n)}]`);
	}, r = (e, r, i) => {
		if (e && typeof e == "object" && !Array.isArray(e)) for (let a of Object.keys(e)) r.has(a) || (t.length < 64 ? t.push(`Unsupported stadium field: ${n(i, a)}`) : t.length === 64 && t.push("Additional unsupported stadium fields omitted."));
	};
	r(e, ge.root, "$"), r(e.bg, ge.bg, "$.bg");
	for (let t of [
		"vertexes",
		"segments",
		"discs",
		"planes",
		"goals",
		"joints"
	]) {
		let n = e[t];
		Array.isArray(n) && n.forEach((e, n) => {
			r(e, ge[t], `$.${t}[${n}]`);
		});
	}
	if (r(e.ballPhysics, ge.discs, "$.ballPhysics"), r(e.playerPhysics, ge.playerPhysics, "$.playerPhysics"), e.traits && typeof e.traits == "object" && !Array.isArray(e.traits)) for (let [t, i] of Object.entries(e.traits)) r(i, _e, n("$.traits", t));
	return t;
}
var ve = 262144, V = 63, ye = 1024, be = 64, xe = 16, Se = 128, Ce = 192;
function we(e) {
	let t = e.traits === void 0 ? {} : w(e.traits);
	return (e) => {
		let n = w(e);
		if (n.trait === void 0) return n;
		if (typeof n.trait != "string" || !Object.hasOwn(t, n.trait)) throw Error("Unknown trait");
		return {
			...w(t[n.trait]),
			...n
		};
	};
}
function Te(e, t = !1) {
	return {
		pos: E(e.pos),
		speed: E(e.speed),
		gravity: E(e.gravity),
		radius: T(e.radius, 10, .5, 100),
		invMass: T(e.invMass, 1, 0, 8192),
		damping: T(e.damping, .99, 0, 8192),
		bCoef: T(e.bCoef, .5, -1, 8192),
		cGroup: te(e.cGroup, t ? 193 : 63),
		cMask: te(e.cMask, 63),
		color: O(e.color)
	};
}
function H(e, t) {
	let n = D(e.discs, V).map((e) => Te(t(e)));
	if (e.ballPhysics !== "disc0") {
		let r = Te(e.ballPhysics === void 0 ? {} : t(e.ballPhysics), !0);
		r.cGroup |= Ce, n.unshift(r);
	} else if (!n.length) throw Error("disc0 needs a disc");
	return n;
}
function Ee(e, t) {
	let n = e.playerPhysics === void 0 ? {} : t(e.playerPhysics);
	return {
		...Te({
			...n,
			radius: n.radius ?? 15,
			invMass: n.invMass ?? .5,
			damping: n.damping ?? .96,
			cGroup: n.cGroup ?? 0
		}),
		acceleration: T(n.acceleration, .1, -8192, 8192),
		kickingAcceleration: T(n.kickingAcceleration, .07, -8192, 8192),
		kickingDamping: T(n.kickingDamping, .96, 0, 8192),
		kickStrength: T(n.kickStrength, 5, -8192, 8192),
		kickback: T(n.kickback, 0, -8192, 8192)
	};
}
function De(e) {
	let t = e === void 0 ? {} : w(e);
	if (t.type !== void 0 && t.type !== "none" && !F(t.type)) throw Error("Unsupported stadium background type");
	return t;
}
function Oe(e) {
	for (let t of [
		"showBoundary",
		"showHalfwayLine",
		"showCenterCircle"
	]) if (e[t] !== void 0 && typeof e[t] != "boolean") throw Error(`Background ${t} must be a boolean`);
	if (e.lineColor !== void 0 && (typeof e.lineColor != "string" || !/^[0-9a-f]{6}$/i.test(e.lineColor))) throw Error("Background lineColor must be a six-digit hex color");
	return {
		type: F(e.type) ?? "none",
		cornerRadius: T(e.cornerRadius, 0, 0, 500),
		width: T(e.width, 0, 0, 2048),
		height: T(e.height, 0, 0, 2048),
		color: O(e.color, "718C5A"),
		...e.color === void 0 ? {} : { colorExplicit: !0 },
		kickOffRadius: T(e.kickOffRadius, 0, 0, 500),
		...e.lineColor === void 0 ? {} : { lineColor: e.lineColor },
		...e.lineWidth === void 0 ? {} : { lineWidth: T(e.lineWidth, 2.7, .1, 20) },
		...e.lineOpacity === void 0 ? {} : { lineOpacity: T(e.lineOpacity, 1, 0, 1) },
		...e.showBoundary === void 0 ? {} : { showBoundary: e.showBoundary },
		...e.showHalfwayLine === void 0 ? {} : { showHalfwayLine: e.showHalfwayLine },
		...e.showCenterCircle === void 0 ? {} : { showCenterCircle: e.showCenterCircle }
	};
}
function ke(e) {
	let t = E(e.normal);
	if (Math.hypot(...t) < 1e-6) throw Error("Plane normal is zero");
	return {
		normal: t,
		dist: T(e.dist, 0),
		bCoef: T(e.bCoef, 1, -1, 8192),
		cGroup: te(e.cGroup, 32),
		cMask: te(e.cMask, 63)
	};
}
function Ae(e) {
	if (e.team !== "red" && e.team !== "blue") throw Error("Invalid goal team");
	let t = E(e.p0), n = E(e.p1);
	if (Math.hypot(n[0] - t[0], n[1] - t[1]) < 1) throw Error("Goal has zero length");
	return {
		p0: t,
		p1: n,
		team: e.team === "red" ? 1 : 2
	};
}
function je(e, t) {
	let n = T(e.d0, -1, 0, t.length - 1), r = T(e.d1, -1, 0, t.length - 1);
	if (!Number.isInteger(n) || !Number.isInteger(r) || n === r) throw Error("Invalid joint indices");
	let i = Math.hypot(t[r].pos[0] - t[n].pos[0], t[r].pos[1] - t[n].pos[1]), a = e.length == null ? [i, i] : typeof e.length == "number" ? [e.length, e.length] : E(e.length);
	return {
		d0: n,
		d1: r,
		min: T(a[0], 0, 0),
		max: T(a[1], 0, 0),
		strength: e.strength === void 0 || e.strength === "rigid" ? "rigid" : T(e.strength, 0, -8192, 8192),
		color: O(e.color, "000000")
	};
}
function Me(e) {
	if (new TextEncoder().encode(e).length > ve) throw Error("Stadium exceeds 256 KB");
	let t = w(x.default.parse(e));
	if (t.physicsMode !== void 0 && t.physicsMode !== "stadium" && t.physicsMode !== "substeps") throw Error("Invalid physics mode");
	if (t.version !== void 0 && t.version !== 1) throw Error("Unsupported stadium version");
	let n = we(t), r = H(t, n), i = D(t.vertexes, ye).map(n), a = B(t), { segments: o, arcs: s, colliders: c } = z(i, t.segments, n), l = Ee(t, n), u = D(t.planes, be), d = D(t.joints, Se);
	ee(r.length, o.length, u.length + d.length, Math.min(l.radius, ...r.map((e) => e.radius)));
	let f = De(t.bg);
	return {
		version: 1,
		physicsMode: t.physicsMode === "substeps" ? "substeps" : "stadium",
		name: typeof t.name == "string" ? t.name.slice(0, 64) : "Untitled stadium",
		canBeStored: t.canBeStored !== !1,
		width: T(t.width, 520, 100, 2048),
		height: T(t.height, 300, 80, 2048),
		maxViewWidth: T(t.maxViewWidth, 0, 0, 4096),
		cameraFollow: t.cameraFollow === "player" ? "player" : "ball",
		bg: Oe(f),
		discs: r,
		segments: o,
		arcs: s,
		colliders: c,
		player: l,
		spawnDistance: T(t.spawnDistance, 200, 0, 1500),
		kickOffReset: t.kickOffReset === "full" ? "full" : "partial",
		redSpawnPoints: D(t.redSpawnPoints, 32).map((e) => E(e)),
		blueSpawnPoints: D(t.blueSpawnPoints, 32).map((e) => E(e)),
		warnings: a,
		planes: u.map((e) => ke(n(e))),
		goals: D(t.goals, xe).map((e) => Ae(n(e))),
		joints: d.map((e) => je(n(e), r))
	};
}
function Ne(e, t, n) {
	if (!Number.isFinite(e) || !Number.isInteger(t) || t < 0 || t > 16777215 || !Array.isArray(n) || n.length < 1 || n.length > 3 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 16777215)) throw Error("Invalid team colors");
	return {
		angle: (e % 360 + 360) % 360,
		textColor: t,
		colors: [...n]
	};
}
function Pe(e) {
	if (e === void 0) return [null, null];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Invalid team styles");
	return e.map((e) => e === null ? null : Ne(e.angle, e.textColor, e.colors));
}
var Fe = [15035990, 5671397], Ie = (e) => e.color === "transparent" ? -1 : Number.parseInt(e.color, 16);
function Le(e, t = 0) {
	return [
		...e.pos,
		...e.speed,
		e.radius,
		e.invMass,
		e.damping,
		e.bCoef,
		...e.gravity,
		e.cGroup,
		e.cMask,
		t,
		0,
		0,
		0,
		e.pos[0],
		t ? 0 : e.pos[1]
	];
}
function Re(e, t, n) {
	for (let n of t.colliders) if ("center" in n) {
		let t = n;
		e.arc(...t.center, t.radius, ...t.a, ...t.b, t.sweep, +t.major, t.bCoef, t.cGroup, t.cMask, t.bias);
	} else {
		let t = n;
		e.wall(...t.a, ...t.b, t.bCoef, t.cGroup, t.cMask, t.bias);
	}
	for (let n of t.planes) e.plane(...n.normal, n.dist, n.bCoef, n.cGroup, n.cMask);
	for (let n of t.joints) e.joint(n.d0, n.d1, n.min, n.max, n.strength === "rigid" ? Infinity : n.strength);
	for (let n of t.goals) e.goal(...n.p0, ...n.p1, n.team);
	let r = t.player;
	e.configure(r.acceleration, r.kickStrength, r.kickingAcceleration, r.kickingDamping, r.kickback, n & 255);
}
function ze(e, t) {
	ee(e.discs.length, e.segments.length, e.planes.length + e.joints.length, t);
}
function Be(e, t, n, r, i) {
	let a = n * 18;
	if (!h.some(([i, o]) => {
		let s = r[i];
		return s !== void 0 && !Object.is(o === -1 ? t[n] : e[a + o], s);
	})) return !1;
	if (r.radius !== void 0) {
		let a = r.radius;
		for (let r = 0; r < t.length; r++) r !== n && (a = Math.min(a, e[r * 18 + d.RADIUS]));
		ze(i, a);
	}
	for (let [i, o] of h) {
		let s = r[i];
		s !== void 0 && (o === -1 ? t[n] = s : e[a + o] = s);
	}
	return !0;
}
var Ve = 32, He = 11, Ue = 6, We = class {
	snapshots = [];
	players = [];
	complete = !0;
	kickPool = Array.from({ length: Ve }, (e, t) => ({
		order: t,
		contactIndex: null,
		disc: 0,
		slot: 0,
		team: 0,
		ball: {
			x: 0,
			y: 0,
			radius: 0,
			beforeVx: 0,
			beforeVy: 0,
			afterVx: 0,
			afterVy: 0
		}
	}));
	playerPool = Array.from({ length: Ve }, () => ({
		disc: 0,
		slot: 0,
		team: 0,
		x: 0,
		y: 0,
		radius: 0
	}));
	kicks;
	roster;
	clear() {
		this.snapshots.length = this.players.length = 0, this.complete = !0;
	}
	read(e) {
		let t = e.ball_kick_snapshots_count();
		if (this.complete = e.ball_kick_snapshots_overflow() === 0, !t) return;
		let n = e.memory.buffer, r = e.ball_kick_snapshots_ptr();
		(!this.kicks || this.kicks.buffer !== n || this.kicks.byteOffset !== r) && (this.kicks = new Float64Array(n, r, 352));
		for (let e = 0; e < t; e++) {
			let t = e * He, n = this.kickPool[e];
			n.contactIndex = this.kicks[t] < 0 ? null : this.kicks[t], n.disc = this.kicks[t + 1], n.slot = this.kicks[t + 2], n.team = this.kicks[t + 3], n.ball.x = this.kicks[t + 4], n.ball.y = this.kicks[t + 5], n.ball.radius = this.kicks[t + 6], n.ball.beforeVx = this.kicks[t + 7], n.ball.beforeVy = this.kicks[t + 8], n.ball.afterVx = this.kicks[t + 9], n.ball.afterVy = this.kicks[t + 10], this.snapshots.push(n);
		}
		let i = e.ball_kick_players_count(), a = e.ball_kick_players_ptr();
		(!this.roster || this.roster.buffer !== n || this.roster.byteOffset !== a) && (this.roster = new Float64Array(n, a, 192));
		for (let e = 0; e < i; e++) {
			let t = e * Ue, n = this.playerPool[e];
			n.disc = this.roster[t], n.slot = this.roster[t + 1], n.team = this.roster[t + 2], n.x = this.roster[t + 3], n.y = this.roster[t + 4], n.radius = this.roster[t + 5], this.players.push(n);
		}
	}
}, Ge = 55;
function Ke(e, t, n, r) {
	let i = t === 1 ? e.redSpawnPoints : e.blueSpawnPoints, a = t === 1 ? -1 : 1;
	if (i.length) return i[r ? i.length - 1 : Math.min(n, i.length - 1)];
	if (r) return [a * e.width, 0];
	let o = n ? Math.ceil(n / 2) * Ge * (n % 2 ? 1 : -1) : 0;
	return [a * e.spawnDistance, o];
}
var qe = 8192, Je = 2147483648, Ye = 25500, Xe = [
	"lobby",
	"playing",
	"goal",
	"finished"
], Ze = (e, t, n = 0) => Number.isInteger(e) && e >= n && e <= t;
function Qe(e) {
	for (let t = 0; t < e.length; t += 18) for (let n = 0; n < 18 && t + n < e.length; n++) {
		let r = e[t + n], i = n === d.COLLISION_GROUP || n === d.COLLISION_MASK ? Je : n === d.KICK_BUDGET ? Ye : qe;
		if (typeof r != "number" || !Number.isFinite(r) || Math.abs(r) > i) return !1;
	}
	return !0;
}
function $e(e, t) {
	if (!e || typeof e != "object" || !Array.isArray(e.discs) || e.discs.length !== t || !Qe(e.discs)) throw Error("Invalid state");
	if (!Array.isArray(e.colors) || e.colors.length !== e.discs.length / 18 || e.colors.some((e) => !Number.isInteger(e) || e < -1 || e > 16777215)) throw Error("Invalid disc colors");
}
function et(e) {
	if (!Ze(e.kickRate, 6619135) || !Ze(e.tick, 4294967295) || !Ze(e.elapsed, 4294967295) || !Ze(e.red, 65535) || !Ze(e.blue, 65535) || !Ze(e.countdown, 300) || !Ze(e.resumeTicks, 119) || (e.paused || e.phase === "lobby") && e.resumeTicks !== 0 || !Ze(e.scoreLimit, 99) || !Ze(e.timeLimit, 5940) || !Xe.includes(e.phase) || typeof e.paused != "boolean" || typeof e.kickoffActive != "boolean" || ![1, 2].includes(e.kickoff)) throw Error("Invalid match metadata");
	for (let t of [e.lastTouch, e.goalTouch]) if (t != null && (typeof t != "object" || !Ze(t.slot, 31) || ![1, 2].includes(t.team))) throw Error("Invalid goal attribution");
}
function tt(e) {
	for (let t = 0; t < e.length; t += 18) {
		let n = (n) => e[t + n];
		if (n(d.RADIUS) < .5 || n(d.RADIUS) > 100 || n(d.INVERSE_MASS) < 0 || n(d.INVERSE_MASS) > qe || n(d.DAMPING) < 0 || n(d.DAMPING) > qe || n(d.BOUNCE) < -1 || n(d.BOUNCE) > qe || !Ze(n(d.COLLISION_GROUP), 2147483647, -2147483648) || !Ze(n(d.COLLISION_MASK), 2147483647, -2147483648) || !Ze(n(d.TEAM), 2) || !Ze(n(d.INPUT), 31) || !Ze(n(d.KICK_STATE), 4095) || n(d.PLAYER_SLOT) > 0 && (!Number.isInteger(n(d.KICK_BUDGET)) || n(d.KICK_BUDGET) < -255 || n(d.KICK_BUDGET) > Ye)) throw Error("Invalid disc properties");
	}
}
function nt(e, t, n) {
	$e(e, t), et(e), tt(e.discs);
	let r = 10;
	for (let t = d.RADIUS; t < e.discs.length; t += 18) r = Math.min(r, e.discs[t]);
	ze(n, r);
}
async function rt(e) {
	return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", e))).map((e) => e.toString(16).padStart(2, "0")).join("");
}
async function it(e, t) {
	let n = e ?? await (await fetch("/core.wasm?v=5532af7ca9da3779ea23", { signal: t })).arrayBuffer();
	if (await rt(n) !== "3c2130944983498b4199e0351ace3302ada1aeda53bea4a105906c36fc580e39") throw Error("Physics build changed. Refresh the page to load a matching version.");
	return WebAssembly.instantiate(await WebAssembly.compile(n));
}
var U = 60, at = [
	0,
	S.red,
	S.blue
], ot = {
	1: S.redKO,
	2: S.blueKO
}, st = S.redKO | S.blueKO, ct = 210, lt = (e) => e ? { ...e } : null;
function ut(e) {
	let t = Array(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e[n];
	return t;
}
var dt = [
	"kick",
	"disc",
	"wall"
], ft = class e {
	core;
	stadium;
	source = "";
	colors = [];
	tick = 0;
	elapsed = 0;
	ballKicks = [];
	ballContacts = [];
	ballContactsComplete = !0;
	kickSnapshots = new We();
	kickSnapshotsEnabled = !1;
	setKickSnapshotsEnabled(e) {
		if (typeof e != "boolean") throw Error("Invalid kick snapshot setting");
		this.kickSnapshotsEnabled = e, this.core.configure_kick_snapshots(+e), this.kickSnapshots.clear();
	}
	get ballKickSnapshots() {
		return this.kickSnapshots.snapshots;
	}
	get ballKickPlayers() {
		return this.kickSnapshots.players;
	}
	get ballKickSnapshotsComplete() {
		return this.kickSnapshotsEnabled && this.kickSnapshots.complete;
	}
	contactPool = Array.from({ length: 32 }, () => ({
		kind: "disc",
		disc: -1,
		speed: 0
	}));
	contactView;
	ballContactSlot = {
		disc: 0,
		speed: 0
	};
	ballContact;
	playerContactSlot = {
		a: 0,
		b: 0,
		speed: 0
	};
	playerContact;
	red = 0;
	blue = 0;
	phase = "lobby";
	paused = !1;
	resumeTicks = 0;
	countdown = 0;
	kickoff = 1;
	kickoffActive = !0;
	scoreLimit = 5;
	timeLimit = 300;
	lastGoal = 0;
	lastTouch = null;
	goalTouch = null;
	kickRate = 2;
	constructor(e) {
		this.core = e.exports;
	}
	static async create(t, n) {
		return new e(await it(t, n));
	}
	view;
	get data() {
		let e = this.core.memory.buffer, t = this.core.data_ptr(), n = this.core.count() * 18, r = this.view;
		return r && r.buffer === e && r.byteOffset === t && r.length === n ? r : (this.view = new Float64Array(e, t, n), this.view);
	}
	setKickRateLimit(e, t, n) {
		this.kickRate = v(e, t, n), this.core.kick_limits(...y(this.kickRate));
	}
	load(e) {
		this.stadium = Me(e), this.source = e, this.core.reset(), this.kickSnapshotsEnabled = !1, this.kickSnapshots.clear(), this.clearEvents(), this.colors = [], this.core.physics_mode(+(this.stadium.physicsMode === "substeps")), this.tick = 0, this.elapsed = 0, this.red = this.blue = 0, this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0, this.countdown = 0, this.kickoffActive = !0;
		for (let e of this.stadium.discs) this.add(e);
		for (let e = 0; e < 32; e++) this.add(this.stadium.player, e + 1);
		Re(this.core, this.stadium, this.kickRate), this.setKickRateLimit(...y(this.kickRate));
	}
	add(e, t = 0) {
		let n = this.core.add_disc();
		if (n < 0) throw Error("Disc capacity exceeded");
		this.colors.push(Ie(e)), Le(e, t).forEach((e, t) => {
			this.core.set_disc(n, t, e);
		});
	}
	index(e) {
		if (!Number.isInteger(e) || e < 0 || e >= 32) throw Error("Invalid slot");
		return this.stadium.discs.length + e;
	}
	joinPlayer(e) {
		this.lastTouch?.slot === e && (this.lastTouch = null), this.goalTouch?.slot === e && (this.goalTouch = null);
		let t = this.index(e) * 18;
		this.data[t + d.KICK_STATE] = 0, this.data[t + d.KICK_BUDGET] = 0, this.setTeam(e, 0);
	}
	setTeam(e, t) {
		if (![
			0,
			1,
			2
		].includes(t)) throw Error("Invalid team");
		let n = this.index(e), r = n * 18, i = this.data;
		i[r + d.TEAM] = t, i[r + d.COLLISION_GROUP] = this.stadium.player.cGroup | at[t], i[r + d.INPUT] = 0, this.spawn(n, e, t, this.phase !== "lobby");
	}
	input(e, t) {
		let n = this.data, r = this.index(e) * 18, i = t & 31;
		i & 16 ? n[r + d.INPUT] & 16 || (n[r + d.KICK_STATE] |= p | m) : n[r + d.KICK_STATE] & 2048 || (n[r + d.KICK_STATE] &= f), n[r + d.INPUT] = i;
	}
	applyDiscProperties(e, t) {
		let n = this.data;
		return this.phase === "lobby" || !Number.isInteger(e) || e < 0 || e >= this.colors.length || n[e * 18 + d.PLAYER_SLOT] > 0 && n[e * 18 + d.TEAM] === 0 ? !1 : Be(n, this.colors, e, g(t), this.stadium);
	}
	restoreDiscProperties(e, t) {
		let n = e * 18, r = this.data;
		this.colors[e] = Ie(t), r[n + d.RADIUS] = t.radius, r[n + d.INVERSE_MASS] = t.invMass, r[n + d.DAMPING] = t.damping, r[n + d.BOUNCE] = t.bCoef, r[n + d.GRAVITY_X] = t.gravity[0], r[n + d.GRAVITY_Y] = t.gravity[1], r[n + d.COLLISION_GROUP] = t.cGroup, r[n + d.COLLISION_MASK] = t.cMask;
	}
	teamRank(e, t) {
		let n = 0;
		for (let r = 0; r < e; r++) this.data[this.index(r) * 18 + d.TEAM] === t && n++;
		return n;
	}
	spawn(e, t, n, r = !1) {
		this.restoreDiscProperties(e, this.stadium.player), this.colors[e] = n === 1 || n === 2 ? Fe[n - 1] : 16777215;
		let i = this.data, a = e * 18;
		i[a + d.COLLISION_GROUP] |= at[n] ?? 0;
		let [o, s] = Ke(this.stadium, n, this.teamRank(t, n), r);
		i[a + d.X] = o, i[a + d.Y] = s, i[a + d.SPEED_X] = i[a + d.SPEED_Y] = i[a + d.INPUT] = 0, i[a + d.KICK_STATE] &= f, i[a + d.COLLISION_MASK] = this.stadium.player.cMask & ~st;
	}
	resetPositions(e = !1) {
		this.kickSnapshots.clear(), this.kickoffActive = !0, this.lastTouch = null;
		let t = this.data;
		for (let n = 0; n < this.stadium.discs.length; n++) {
			let r = this.stadium.discs[n];
			(e || n === 0 || this.stadium.kickOffReset === "full") && (this.restoreDiscProperties(n, r), t[n * 18 + d.X] = r.pos[0], t[n * 18 + d.Y] = r.pos[1], t[n * 18 + d.SPEED_X] = r.speed[0], t[n * 18 + d.SPEED_Y] = r.speed[1]);
		}
		for (let e = 0; e < 32; e++) {
			let n = this.index(e);
			this.spawn(n, e, t[n * 18 + d.TEAM]);
		}
	}
	start() {
		(this.phase === "lobby" || this.phase === "finished") && (this.red = this.blue = this.elapsed = 0, this.goalTouch = null, this.phase = "playing", this.paused = !1, this.resumeTicks = 0, this.kickoff = 1, this.countdown = 0, this.resetPositions(!0));
	}
	stop() {
		this.kickSnapshots.clear(), this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0;
	}
	setPaused(e) {
		this.phase !== "lobby" && (e = !!e, this.paused !== e && (this.paused = e, this.resumeTicks = e ? 0 : 119));
	}
	finish() {
		this.phase = "finished", this.countdown = ct;
	}
	timeExpiredWithLeader() {
		return this.timeLimit > 0 && this.elapsed >= this.timeLimit * U && this.red !== this.blue;
	}
	step() {
		this.advance(), this.settleKickPresses();
	}
	settleKickPresses() {
		let e = this.data, t = this.stadium.discs.length;
		for (let n = 0; n < 32; n++) {
			let r = (t + n) * 18, i = e[r + d.KICK_STATE];
			i & 3072 && (e[r + d.KICK_STATE] = i & (e[r + d.INPUT] & 16 ? f | p : f));
		}
	}
	clearEvents() {
		this.kickSnapshotsEnabled && this.kickSnapshots.clear(), this.ballKicks.length = 0, this.ballContacts.length = 0, this.ballContactsComplete = !0, this.ballContact = void 0, this.playerContact = void 0;
	}
	advance() {
		if (this.clearEvents(), this.tick++, this.paused || this.phase === "lobby") return;
		if (this.resumeTicks > 0) {
			this.resumeTicks--;
			return;
		}
		if (this.core.step(), this.collectBallEvents(), this.phase === "finished") {
			--this.countdown <= 0 && this.stop();
			return;
		}
		if (this.phase === "goal") {
			--this.countdown <= 0 && this.afterGoalPause();
			return;
		}
		if (this.applyKickoffBarriers(), this.kickoffActive) {
			let e = this.data;
			e[d.SPEED_X] ** 2 + e[d.SPEED_Y] ** 2 > 0 && (this.kickoffActive = !1);
			return;
		}
		this.elapsed++;
		let e = this.core.goal_event();
		if (e === 1 || e === 2) return this.scoreGoal(e);
		this.timeExpiredWithLeader() && this.finish();
	}
	collectBallEvents() {
		this.kickSnapshotsEnabled && this.kickSnapshots.read(this.core);
		let e = this.core.ball_contacts_count();
		if (this.ballContactsComplete = this.core.ball_contacts_overflow() === 0, e > 0) {
			let t = this.core.memory.buffer, n = this.core.ball_contacts_ptr();
			(!this.contactView || this.contactView.buffer !== t || this.contactView.byteOffset !== n) && (this.contactView = new Float64Array(t, n, 96));
			for (let t = 0; t < e; t++) {
				let e = this.contactPool[t];
				e.kind = dt[this.contactView[t * 3]], e.disc = this.contactView[t * 3 + 1], e.speed = this.contactView[t * 3 + 2], this.ballContacts.push(e);
			}
		}
		if (this.phase === "playing") {
			let e = this.core.ball_touch_slot();
			if (e >= 0 && e < 32) {
				let t = this.data[this.index(e) * 18 + d.TEAM];
				(t === 1 || t === 2) && (this.lastTouch = {
					slot: e,
					team: t
				});
			}
		}
		let t = this.core.ball_contact_speed();
		t >= 1 ? (this.ballContactSlot.disc = this.core.ball_contact_disc(), this.ballContactSlot.speed = t, this.ballContact = this.ballContactSlot) : this.ballContact = void 0;
		let n = this.core.player_contact_speed();
		if (n > 0) {
			let e = this.core.player_contact_pair() >>> 0;
			this.playerContactSlot.a = e & 255, this.playerContactSlot.b = e >>> 8 & 255, this.playerContactSlot.speed = n, this.playerContact = this.playerContactSlot;
		} else this.playerContact = void 0;
		for (let e = this.core.ball_kick_events() >>> 0, t = 0; e; e >>>= 1, t++) e & 1 && this.ballKicks.push(t);
	}
	afterGoalPause() {
		this.scoreLimit > 0 && Math.max(this.red, this.blue) >= this.scoreLimit || this.timeExpiredWithLeader() ? this.finish() : (this.phase = "playing", this.resetPositions());
	}
	applyKickoffBarriers() {
		let e = this.data, t = this.stadium.player.cMask, n = this.kickoffActive ? t & ot[this.kickoff] : 0;
		for (let t = 0; t < 32; t++) {
			let r = this.index(t) * 18 + d.COLLISION_MASK;
			e[r] = e[r] & ~st | n;
		}
	}
	scoreGoal(e) {
		e === 1 ? this.red++ : this.blue++, this.kickoff = e === 1 ? 2 : 1, this.phase = "goal", this.countdown = 300, this.goalTouch = lt(this.lastTouch), this.lastGoal = this.tick;
	}
	configureRollback(e) {
		this.core.rollback_configure(U, e), this.core.rollback_clear();
	}
	recordRollback() {
		this.core.rollback_record(this.tick);
	}
	rewind(e) {
		return this.core.rollback_rewind(e.tick) ? (this.clearEvents(), this.restoreRules(e), !0) : !1;
	}
	clearRollback() {
		this.core.rollback_clear();
	}
	checksum() {
		return this.core.tick_checksum() >>> 0;
	}
	saveRules(e) {
		return e.tick = this.tick, e.elapsed = this.elapsed, e.red = this.red, e.blue = this.blue, e.phase = this.phase, e.paused = this.paused, e.resumeTicks = this.resumeTicks, e.countdown = this.countdown, e.kickoff = this.kickoff, e.kickoffActive = this.kickoffActive, e.lastGoal = this.lastGoal, e.lastTouchSlot = this.lastTouch?.slot ?? -1, e.lastTouchTeam = this.lastTouch?.team ?? 0, e.goalTouchSlot = this.goalTouch?.slot ?? -1, e.goalTouchTeam = this.goalTouch?.team ?? 0, e;
	}
	restoreRules(e) {
		this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.lastGoal = e.lastGoal, this.lastTouch = e.lastTouchSlot < 0 ? null : {
			slot: e.lastTouchSlot,
			team: e.lastTouchTeam
		}, this.goalTouch = e.goalTouchSlot < 0 ? null : {
			slot: e.goalTouchSlot,
			team: e.goalTouchTeam
		};
	}
	snapshot() {
		return {
			lastTouch: lt(this.lastTouch),
			goalTouch: lt(this.goalTouch),
			tick: this.tick,
			elapsed: this.elapsed,
			red: this.red,
			blue: this.blue,
			phase: this.phase,
			paused: this.paused,
			resumeTicks: this.resumeTicks,
			countdown: this.countdown,
			kickoff: this.kickoff,
			kickoffActive: this.kickoffActive,
			scoreLimit: this.scoreLimit,
			timeLimit: this.timeLimit,
			kickRate: this.kickRate,
			discs: ut(this.data),
			colors: this.colors.slice()
		};
	}
	restore(e) {
		nt(e, this.data.length, this.stadium), this.setKickSnapshotsEnabled(!1), this.clearEvents(), this.setKickRateLimit(...y(e.kickRate)), this.lastTouch = lt(e.lastTouch), this.goalTouch = lt(e.goalTouch), this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.scoreLimit = e.scoreLimit, this.timeLimit = e.timeLimit, this.data.set(e.discs), this.colors = e.colors.slice();
	}
}, pt = `ball2d-core/1/${l}`, mt = (e, t) => e !== t && (e - t + 65536) % 65536 > 32768;
function ht(e) {
	return !!e && [
		"lobby",
		"playing",
		"goal",
		"finished"
	].includes(e.phase) && Number.isFinite(e.elapsed) && e.elapsed >= 0 && Number.isFinite(e.timeLimit) && e.timeLimit >= 0 && Number.isSafeInteger(e.scoreLimit) && e.scoreLimit >= 0 && !!e.score && Number.isSafeInteger(e.score.red) && e.score.red >= 0 && Number.isSafeInteger(e.score.blue) && e.score.blue >= 0;
}
function gt(e, t) {
	let [n, r] = e.p0, i = e.p1[0] - n, a = e.p1[1] - r, o = Math.hypot(i, a);
	if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(i) || !Number.isFinite(a) || !Number.isFinite(e.pitchPoint[0]) || !Number.isFinite(e.pitchPoint[1]) || !Number.isFinite(t.x) || !Number.isFinite(t.y) || !Number.isFinite(t.vx) || !Number.isFinite(t.vy) || o < .001 || e.defendingTeam !== 1 && e.defendingTeam !== 2) return null;
	let s = ((e.pitchPoint[0] - n) * a - (e.pitchPoint[1] - r) * i) / o;
	if (Math.abs(s) < .001) return null;
	let c = Math.sign(s);
	return {
		along: ((t.x - n) * i + (t.y - r) * a) / o,
		across: c * ((t.x - n) * a - (t.y - r) * i) / o,
		length: o,
		alongSpeed: (t.vx * i + t.vy * a) / o,
		acrossSpeed: c * (t.vx * a - t.vy * i) / o
	};
}
var _t = {
	post: 100,
	"near-miss": 90,
	block: 80,
	"directed-shot": 70,
	pressure: 60
}, vt = class {
	ticksPerSecond;
	streamId = null;
	epoch = -1;
	tick = -1;
	goals = [];
	shot = null;
	constructor(e = 60) {
		if (this.ticksPerSecond = e, !Number.isFinite(e) || e <= 0) throw Error("Invalid tick rate");
	}
	reset() {
		this.streamId = null, this.epoch = this.tick = -1, this.goals = [], this.shot = null;
	}
	observe(e) {
		if (!ht(e.context) || !Number.isSafeInteger(e.tick) || !Number.isSafeInteger(e.epoch) || e.tick < 0 || e.epoch < 0 || !Number.isFinite(e.ball.radius) || e.ball.radius <= 0 || e.goals.length > 32) return [];
		if (this.streamId !== e.streamId || this.epoch !== e.epoch) {
			if (this.streamId === e.streamId && mt(e.epoch, this.epoch)) return [];
			this.reset(), this.streamId = e.streamId, this.epoch = e.epoch;
		}
		if (e.tick <= this.tick) return [];
		let t = this.tick >= 0 && e.tick - this.tick <= this.ticksPerSecond / 4;
		if (t || (this.goals = [], this.shot = null), this.tick = e.tick, e.context.phase !== "playing" || e.context.paused) return this.goals = [], this.shot = null, [];
		this.shot && e.tick - this.shot.tick > this.ticksPerSecond * 2 && (this.shot = null);
		let n = [], r = [], i = (t, r, i, a, o, s) => {
			if (n.length >= 4) {
				let e = n.reduce((e, t, r) => _t[t.kind] < _t[n[e].kind] ? r : e, 0);
				if (_t[t] <= _t[n[e].kind]) return;
				n.splice(e, 1);
			}
			n.push(Object.freeze({
				eventId: `${e.streamId}:${e.epoch}:analysis:${e.tick}:${r.id}:${t}`,
				streamId: e.streamId,
				epoch: e.epoch,
				tick: e.tick,
				kind: t,
				context: Object.freeze({
					...e.context,
					score: Object.freeze({ ...e.context.score })
				}),
				confidence: "supported",
				evidence: Object.freeze(a),
				attackingTeam: r.defendingTeam === 1 ? 2 : 1,
				intensity: i,
				...o ? { player: Object.freeze({ ...o }) } : {},
				...s ? { attackId: s } : {}
			}));
		};
		for (let n of e.goals) {
			let a = gt(n, e.ball);
			if (!a || r.some((e) => e.id === n.id)) continue;
			let o = `${n.p0}:${n.p1}:${n.pitchPoint}:${n.defendingTeam}`, s = this.goals.find((e) => e.id === n.id && e.shape === o), c = {
				id: n.id,
				shape: o,
				previous: a,
				pressure: s?.pressure ?? !1,
				lastReactionTick: s?.lastReactionTick ?? -Infinity,
				attackId: s?.attackId ?? null,
				attackStartedTick: s?.attackStartedTick ?? e.tick
			}, { along: l, across: u, length: d, acrossSpeed: f, alongSpeed: p } = a, m = f < -.001 ? -u / f : Infinity, h = l + p * m, g = u > e.ball.radius && m > 0 && m <= 1.2 && h >= e.ball.radius && h <= d - e.ball.radius, _ = g && u <= d * 2.5;
			!_ && (u > d * 3 || f >= 0) && (c.pressure = !1), (u > d * 3 || e.tick - c.attackStartedTick > this.ticksPerSecond * 6) && (c.attackId = null), _ && !c.attackId && (c.attackId = `${e.streamId}:${e.epoch}:attack:${e.tick}:${n.id}`, c.attackStartedTick = e.tick);
			let v = e.contact;
			g && v?.kind === "kick" && v.player?.team !== n.defendingTeam && v.player && (this.shot = {
				goalId: n.id,
				tick: e.tick,
				player: { ...v.player }
			}, i("directed-shot", n, .6, ["observed-kick", "projected-inside-goal-mouth"], v.player, c.attackId)), _ && !c.pressure && t && (c.pressure = !0, i("pressure", n, .45, ["approaching-field-side", "projected-inside-goal-mouth"], void 0, c.attackId));
			let y = e.tick - c.lastReactionTick >= this.ticksPerSecond * 2;
			if (y && v?.kind === "post" && v.goalId === n.id) c.lastReactionTick = e.tick, this.shot = null, i("post", n, .75, ["classified-post-contact", "explicit-goal-id"], void 0, c.attackId), c.attackId = null;
			else if (y && t && s && s.previous.across > 0 && u <= 0) {
				let t = s.previous.across / (s.previous.across - u), r = s.previous.along + t * (l - s.previous.along), a = r < 0 ? -r : r - d;
				a > e.ball.radius && a <= d * .35 && f < 0 && (c.lastReactionTick = e.tick, this.shot = null, i("near-miss", n, .62, [
					"observed-line-crossing",
					"outside-posts",
					"within-near-miss-band"
				], void 0, c.attackId), c.attackId = null);
			}
			this.shot?.goalId === n.id && t && v?.kind === "player" && v.player?.team === n.defendingTeam && s?.previous.acrossSpeed !== void 0 && s.previous.acrossSpeed < 0 && f >= 0 && (i("block", n, .55, [
				"prior-directed-kick",
				"defender-contact",
				"trajectory-reversed"
			], v.player, c.attackId), this.shot = null, c.attackId = null), (v?.kind === "wall" || v?.kind === "net") && (this.shot = null, c.attackId = null), f >= 0 && (c.attackId = null), r.push(c);
		}
		return this.goals = r, n.sort((e, t) => _t[t.kind] - _t[e.kind]);
	}
}, yt = (e) => `${e.sessionId.length}:${e.sessionId}:${e.playerId}:${e.team}`, bt = (e, t) => e.sessionId === t.sessionId && e.playerId === t.playerId && e.team === t.team, xt = (e) => Object.freeze({ ...e }), St = (e, t = 1e9) => Number.isFinite(e) && Math.abs(e) <= t, Ct = (e) => St(e.x) && St(e.y) && St(e.vx) && St(e.vy) && St(e.radius), wt = (e) => Array.isArray(e) && e.length === 2 && St(e[0]) && St(e[1]), Tt = (e) => typeof e == "string" && e.length > 0 && e.length <= 256, Et = (e) => !!e && Tt(e.sessionId) && Number.isSafeInteger(e.playerId) && e.playerId >= 0 && e.playerId <= 2147483647 && (e.team === 1 || e.team === 2), Dt = Et, Ot = [
	"kick",
	"player",
	"wall",
	"post"
];
function kt(e, t, n = e.length) {
	for (let r = 0; r < n; r++) {
		let n = e[r]?.identity;
		if (n?.sessionId === t.sessionId && n.playerId === t.playerId && n.team === t.team) return r;
	}
	return -1;
}
function At(e, t, n = e.length) {
	for (let r = 0; r < n; r++) if (e[r]?.id === t) return r;
	return -1;
}
function jt(e) {
	if (!e || !Tt(e.streamId) || !Number.isSafeInteger(e.epoch) || e.epoch < 0 || e.epoch > 65535 || !Number.isSafeInteger(e.tick) || e.tick < 0 || !ht(e.context) || !e.ball || !Array.isArray(e.players) || e.players.length > 32 || !Array.isArray(e.goals) || e.goals.length > 32 || !Array.isArray(e.contacts) || e.contacts.length > 32 || typeof e.contactsComplete != "boolean" || !Ct(e.ball) || e.ball.radius < .001 || e.ball.radius > 1e6) return !1;
	let { players: t, goals: n, contacts: r } = e;
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || !Dt(n.identity) || !Ct(n) || n.radius < .001 || n.radius > 1e6 || n.role !== void 0 && n.role !== "goalkeeper" && n.role !== "outfield" || kt(t, n.identity, e) >= 0) return !1;
	}
	for (let t = 0; t < n.length; t++) {
		let r = n[t];
		if (!r || !Tt(r.id) || !wt(r.p0) || !wt(r.p1) || !wt(r.pitchPoint) || At(n, r.id, t) >= 0 || !gt(r, e.ball)) return !1;
	}
	let i = -1;
	for (let a = 0; a < r.length; a++) {
		let o = r[a];
		if (!o || !Tt(o.id) || At(r, o.id, a) >= 0 || !Number.isSafeInteger(o.tick) || o.tick < 0 || o.tick > e.tick || o.tick < i || !Ot.includes(o.kind) || o.player && (!Dt(o.player) || kt(t, o.player) < 0) || (o.kind === "kick" || o.kind === "player") && !o.player || o.goalId !== void 0 && At(n, o.goalId) < 0) return !1;
		i = o.tick;
	}
	return !0;
}
function Mt(e, t) {
	let n;
	for (let r of e.goals) {
		if (r.defendingTeam === t) continue;
		let i = gt(r, e.ball);
		!i || i.across <= e.ball.radius || (!n || i.across / i.length < n.projection.across / n.projection.length) && (n = {
			goal: r,
			projection: i
		});
	}
	return n;
}
function Nt(e, t, n) {
	let r = e.goals.find((e) => e.id === t), i = r && gt(r, e.ball);
	if (!i || i.across <= e.ball.radius || i.acrossSpeed >= 0) return !1;
	let a = i.across / -i.acrossSpeed, o = i.along + i.alongSpeed * a;
	return a <= n && o > e.ball.radius && o < i.length - e.ball.radius;
}
function Pt(e, t, n, r) {
	let i = Math.hypot(e.ball.vx, e.ball.vy);
	if (!(i < e.ball.radius * 5)) return e.players.find((a) => {
		if (a.identity.team !== t.team || bt(a.identity, t)) return !1;
		let o = a.x - e.ball.x, s = a.y - e.ball.y, c = (o * e.ball.vx + s * e.ball.vy) / i, l = Math.abs(o * e.ball.vy - s * e.ball.vx) / i;
		return c >= e.ball.radius * r && c / i <= n / 1e3 && l <= a.radius + e.ball.radius * 2;
	});
}
function Ft(e, t, n) {
	let r = e.goals.find((e) => e.id === t);
	if (!r) return;
	let i = gt(r, e.ball);
	if (!i) return;
	let a = Math.atan2(r.p0[1] - e.ball.y, r.p0[0] - e.ball.x), o = Math.atan2(r.p1[1] - e.ball.y, r.p1[0] - e.ball.x), s = Math.abs(Math.atan2(Math.sin(a - o), Math.cos(a - o))), c = (r.p0[0] + r.p1[0]) / 2 - e.ball.x, l = (r.p0[1] + r.p1[1]) / 2 - e.ball.y, u = c * c + l * l, d = 0;
	for (let t of e.players) {
		if (t.identity.team === n) continue;
		let r = ((t.x - e.ball.x) * c + (t.y - e.ball.y) * l) / u;
		r > 0 && r < 1 && Math.hypot(t.x - e.ball.x - r * c, t.y - e.ball.y - r * l) <= t.radius + e.ball.radius && d++;
	}
	return Object.freeze({
		distanceGoalWidths: i.across / i.length,
		openingAngleRadians: s,
		speedBallRadiiPerSecond: Math.hypot(e.ball.vx, e.ball.vy) / e.ball.radius,
		defendersInLane: d
	});
}
var It = "kick-team-goal-before-next-kick-v1", Lt = Object.freeze([
	"distanceGoalWidths",
	"openingAngleRadians",
	"speedBallRadiiPerSecond",
	"defendersInLane",
	"timeToGoalLineSeconds",
	"crossesGoalMouth",
	"defendersReachingLaneCount",
	"ballLeadSeconds",
	"defenderLeadSeconds",
	"keeperCoverageRatio"
]), Rt = Object.freeze({
	distanceGoalWidths: 1e6,
	openingAngleRadians: Math.PI,
	speedBallRadiiPerSecond: 1e9,
	defendersInLane: 32,
	timeToGoalLineSeconds: 3,
	crossesGoalMouth: 1,
	defendersReachingLaneCount: 32,
	ballLeadSeconds: 3,
	defenderLeadSeconds: 3,
	keeperCoverageRatio: 1
}), zt = /* @__PURE__ */ new Set([
	"defendersInLane",
	"crossesGoalMouth",
	"defendersReachingLaneCount"
]), Bt = "shot-trajectory-v1", Vt = Lt.length, Ht = Lt.map((e) => Rt[e]), Ut = Lt.reduce((e, t, n) => (zt.has(t) && e.push(n), e), []), Wt = /^[a-f0-9]{64}$/u, Gt = (e, t = 512) => typeof e == "string" && e.length > 0 && e.length <= t && e.trim() === e && !/\p{Cc}/u.test(e), Kt = (e) => typeof e == "object" && !!e && !Array.isArray(e), qt = (e, t, n) => typeof e == "number" && Number.isFinite(e) && e >= t && e <= n, Jt = (e, t, n) => qt(e, t, n) && Number.isSafeInteger(e), Yt = (e) => typeof e == "string" && Wt.test(e), Xt = (e) => Array.isArray(e) && e.length === Vt && e.every((e) => qt(e, -1e9, 1e9)), Zt = (e) => Xt(e) && e.every((e, t) => qt(e, 0, Ht[t])) && Ut.every((t) => Number.isInteger(e[t])), Qt = (e) => Object.freeze([...e]);
function $t(e) {
	return Kt(e) && Gt(e.engineId, 128) && Yt(e.geometrySha256) && Yt(e.policySha256) && e.featuresRevision === "shot-trajectory-v1" && [
		"pre-kick",
		"post-kick",
		"end-step"
	].includes(e.featureStage) && [
		"all-kicks-v1",
		"goalward-release-v1",
		"legacy-end-step-on-target-v1"
	].includes(e.population) && e.featureStage === "end-step" == (e.population === "legacy-end-step-on-target-v1") && Gt(e.shotDefinitionRevision, 128) && Jt(e.outcomeHorizonMs, 100, 6e4);
}
function en(e) {
	return Object.freeze({
		engineId: e.engineId,
		geometrySha256: e.geometrySha256,
		policySha256: e.policySha256,
		featuresRevision: e.featuresRevision,
		featureStage: e.featureStage,
		population: e.population,
		shotDefinitionRevision: e.shotDefinitionRevision,
		outcomeHorizonMs: e.outcomeHorizonMs
	});
}
function tn(e, t) {
	return e.engineId === t.engineId && e.geometrySha256 === t.geometrySha256 && e.policySha256 === t.policySha256 && e.featuresRevision === t.featuresRevision && e.featureStage === t.featureStage && e.population === t.population && e.shotDefinitionRevision === t.shotDefinitionRevision && e.outcomeHorizonMs === t.outcomeHorizonMs;
}
function nn(e, t) {
	if (!$t(t)) return {
		ok: !1,
		reason: "invalid-domain"
	};
	let n = () => ({
		ok: !1,
		reason: "invalid-descriptor"
	});
	if (!Kt(e) || e.schemaVersion !== 1 || !Gt(e.id, 128) || e.purpose !== "production" && e.purpose !== "technical-fixture" || e.kind !== "logistic" || !$t(e.domain) || !qt(e.intercept, -100, 100) || !Xt(e.weights) || !e.weights.every((e) => Math.abs(e) <= 100) || !Xt(e.means) || !Xt(e.scales) || !e.scales.every((e) => qt(e, 1e-6, 1e6)) || !Zt(e.minimums) || !Zt(e.maximums) || !e.minimums.every((t, n) => t <= e.maximums[n]) || !e.means.every((t, n) => qt(t, e.minimums[n], e.maximums[n])) || !Kt(e.evaluation) || !Kt(e.provenance)) return n();
	let r = e.evaluation, i = e.provenance;
	return !Yt(r.trainingDatasetSha256) || !Yt(r.evaluationDatasetSha256) || r.trainingDatasetSha256 === r.evaluationDatasetSha256 || !Yt(r.evaluationReportSha256) || r.splitUnit !== "match" || !Jt(r.heldOutSamples, 2, 1e8) || !Jt(r.heldOutGoals, 1, r.heldOutSamples - 1) || !qt(r.brier, 0, 1) || !qt(r.logLoss, 0, 100) || !qt(r.ece, 0, 1) || !Jt(r.eceBins, 2, 100) || !Gt(i.provider) || !Gt(i.source) || !Gt(i.license) || !Gt(i.reviewedBy) || !Gt(i.reviewReference) ? n() : tn(e.domain, t) ? {
		ok: !0,
		model: Object.freeze({
			schemaVersion: 1,
			id: e.id,
			purpose: e.purpose,
			kind: "logistic",
			domain: en(e.domain),
			intercept: e.intercept,
			weights: Qt(e.weights),
			means: Qt(e.means),
			scales: Qt(e.scales),
			minimums: Qt(e.minimums),
			maximums: Qt(e.maximums),
			evaluation: Object.freeze({
				trainingDatasetSha256: r.trainingDatasetSha256,
				evaluationDatasetSha256: r.evaluationDatasetSha256,
				evaluationReportSha256: r.evaluationReportSha256,
				splitUnit: "match",
				heldOutSamples: r.heldOutSamples,
				heldOutGoals: r.heldOutGoals,
				brier: r.brier,
				logLoss: r.logLoss,
				ece: r.ece,
				eceBins: r.eceBins
			}),
			provenance: Object.freeze({
				provider: i.provider,
				source: i.source,
				license: i.license,
				reviewedBy: i.reviewedBy,
				reviewReference: i.reviewReference
			})
		}),
		evidence: "structure-only"
	} : {
		ok: !1,
		reason: "domain-mismatch"
	};
}
function rn(e, t) {
	return Object.freeze({
		xG: null,
		status: "uncalibrated",
		reason: e,
		...t ? { modelId: t } : {}
	});
}
function an(e, t, n = {}) {
	let r = e == null ? null : nn(e, t), i, a = rn("missing-model");
	if (!$t(t)) a = rn("invalid-domain");
	else if (r?.ok) {
		i = r.model;
		let e = n?.trustedModels, o = JSON.stringify(i), s = Array.isArray(e) && e.length <= 16 && e.some((e) => {
			let n = nn(e, t);
			return n.ok && JSON.stringify(n.model) === o;
		});
		a = i.purpose === "technical-fixture" ? rn("technical-fixture", i.id) : s ? void 0 : rn("untrusted-model", i.id);
	} else r && (a = rn(r.reason));
	let o = i && !a ? i : void 0, s = a ?? rn("untrusted-model", i?.id);
	return Object.freeze({
		domain: $t(t) ? en(t) : null,
		modelId: o?.id ?? null,
		status: o ? "reviewed-model" : "uncalibrated",
		estimate(e) {
			if (!o) return s;
			let t = Lt.map((t) => e?.[t]);
			if (!Zt(t)) return rn("invalid-features", o.id);
			if (t.some((e, t) => e < o.minimums[t] || e > o.maximums[t])) return rn("outside-model-support", o.id);
			let n = o.intercept;
			for (let e = 0; e < Vt; e++) n += o.weights[e] * (t[e] - o.means[e]) / o.scales[e];
			let r = Math.exp(n >= 0 ? -n : n), i = n >= 0 ? 1 / (1 + r) : r / (1 + r);
			return Object.freeze({
				xG: i,
				status: "reviewed-model",
				reason: "trusted-offline-model",
				modelId: o.id
			});
		}
	});
}
var on = (e, t = 256) => typeof e == "string" && e.length > 0 && e.length <= t && e.trim() === e && !/\p{Cc}/u.test(e), sn = (e, t = 1e9) => typeof e == "number" && Number.isFinite(e) && Math.abs(e) <= t, cn = (e, t) => e.sessionId === t.sessionId && e.playerId === t.playerId && e.team === t.team, ln = (e) => !!e && on(e.sessionId) && Number.isInteger(e.playerId) && e.playerId >= 0 && e.playerId <= 2147483647 && (e.team === 1 || e.team === 2);
function un(e, t, n) {
	if (!e || !on(e.id) || e.tick !== t.tick || e.order !== n || !Number.isInteger(e.contactIndex) || e.contactIndex < 0 || e.contactIndex >= t.contacts.length || !ln(e.player) || !e.ball || !Array.isArray(e.players) || e.players.length > 32 || e.players.length !== t.players.length) return !1;
	let r = t.contacts[e.contactIndex];
	if (r.kind !== "kick" || r.tick !== t.tick || !r.player || !cn(r.player, e.player)) return !1;
	let i = e.ball;
	return !(![
		i.x,
		i.y,
		i.radius,
		i.beforeVx,
		i.beforeVy,
		i.afterVx,
		i.afterVy
	].every((e) => sn(e)) || i.radius < .001 || i.radius > 1e6);
}
function dn(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e.players) {
		if (!r || !ln(r.identity) || ![
			r.x,
			r.y,
			r.radius
		].every((e) => sn(e)) || r.radius < .001 || r.radius > 1e6 || !t.players.some((e) => cn(e.identity, r.identity))) return !1;
		let e = yt(r.identity);
		if (n.has(e)) return !1;
		n.add(e);
	}
	return e.players.some((t) => cn(t.identity, e.player));
}
function fn(e, t, n) {
	return un(e, t, n) && dn(e, t);
}
var pn = [
	"sessionId",
	"playerId",
	"team"
], mn = [
	"identity",
	"x",
	"y",
	"radius"
], hn = [
	"id",
	"tick",
	"order",
	"contactIndex",
	"player",
	"ball",
	"players"
], gn = [
	"x",
	"y",
	"radius",
	"beforeVx",
	"beforeVy",
	"afterVx",
	"afterVy"
], _n = ["players"], vn = ["identity"];
function yn(e, t) {
	return !!e && typeof e == "object" && Object.isFrozen(e) && t.every((t) => {
		let n = Object.getOwnPropertyDescriptor(e, t);
		return n !== void 0 && "value" in n;
	});
}
function bn(e) {
	return Array.isArray(e) && Object.isFrozen(e) && Object.getPrototypeOf(e) === Array.prototype && !Object.hasOwn(e, Symbol.iterator) && !Object.hasOwn(e, "some");
}
function xn(e) {
	if (!yn(e, _n) || !bn(e.players) || e.players.length <= 16 || e.players.length > 32) return null;
	let t = /* @__PURE__ */ new Set();
	for (let n = 0; n < e.players.length; n++) {
		let r = Object.getOwnPropertyDescriptor(e.players, n);
		if (!r || !("value" in r)) return null;
		let i = r.value;
		if (!yn(i, vn) || !yn(i.identity, pn) || !ln(i.identity)) return null;
		t.add(yt(i.identity));
	}
	return t;
}
function Sn(e, t) {
	if (!bn(e)) return null;
	let n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.length; r++) {
		let i = Object.getOwnPropertyDescriptor(e, r);
		if (!i || !("value" in i)) return null;
		let a = i.value;
		if (!yn(a, mn) || !yn(a.identity, pn) || !ln(a.identity) || ![
			a.x,
			a.y,
			a.radius
		].every((e) => sn(e)) || a.radius < .001 || a.radius > 1e6) return null;
		let o = yt(a.identity);
		if (!t.has(o) || n.has(o)) return null;
		n.add(o);
	}
	return n;
}
function Cn(e, t) {
	if (!e.length) return !0;
	let n = xn(t);
	if (!n) return !e.some((n, r) => !fn(n, t, r) || r > 0 && n.contactIndex <= e[r - 1].contactIndex);
	let r = /* @__PURE__ */ new Map();
	return !e.some((i, a) => {
		let o;
		if (yn(i, hn) && yn(i.player, pn) && yn(i.ball, gn)) {
			if (!un(i, t, a)) return !0;
			let e = r.get(i.players);
			e === void 0 && (e = Sn(i.players, n), r.set(i.players, e)), o = e ? e.has(yt(i.player)) : dn(i, t);
		} else o = fn(i, t, a);
		return !o || a > 0 && i.contactIndex <= e[a - 1].contactIndex;
	});
}
function wn(e, t, n) {
	let r = {
		x: e.ball.x,
		y: e.ball.y,
		radius: e.ball.radius,
		vx: n.featureStage === "pre-kick" ? e.ball.beforeVx : e.ball.afterVx,
		vy: n.featureStage === "pre-kick" ? e.ball.beforeVy : e.ball.afterVy
	}, i, a = Infinity;
	for (let n of t.goals) {
		let t = gt(n, r);
		if (n.defendingTeam === e.player.team || !t || t.across < 0) continue;
		let o = Math.hypot((n.p0[0] + n.p1[0]) / 2 - r.x, (n.p0[1] + n.p1[1]) / 2 - r.y);
		(o < a || o === a && i && n.id < i.id) && (i = n, a = o);
	}
	if (!i) return null;
	let o = e.ball.afterVx * ((i.p0[0] + i.p1[0]) / 2 - r.x) + e.ball.afterVy * ((i.p0[1] + i.p1[1]) / 2 - r.y);
	return n.population === "goalward-release-v1" && !(o > 0) ? null : Object.freeze({
		ball: Object.freeze(r),
		target: i
	});
}
var Tn = [
	"timeToGoalLineSeconds",
	"crossesGoalMouth",
	"defendersReachingLaneCount",
	"ballLeadSeconds",
	"defenderLeadSeconds",
	"keeperCoverageRatio"
];
function En(e) {
	return !!e && Tn.every((t) => Number.isFinite(e[t]) && e[t] >= 0);
}
function Dn(e, t, n, r) {
	let i = wn(e, t, n);
	if (!i || !En(r)) return null;
	let { ball: a, target: o } = i, s = Ft({
		ball: a,
		goals: t.goals,
		players: e.players
	}, o.id, e.player.team);
	return !s || s.distanceGoalWidths > 1e6 || s.speedBallRadiiPerSecond > 1e9 || !Object.values(s).every((e) => Number.isFinite(e) && e >= 0) ? null : Object.freeze({
		features: Object.freeze({
			...s,
			distanceGoalWidths: Math.max(0, s.distanceGoalWidths),
			...r
		}),
		player: xt(e.player),
		goalId: o.id,
		ball: Object.freeze({ ...a })
	});
}
function On(e) {
	let t = e.stadium.goals;
	if (t.length !== 2 || t[0].team === t[1].team) return [];
	let n = e.stadium.discs[0]?.pos;
	if (!n) return [];
	let r = t.map(({ p0: e, p1: t }) => [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2]), i = r[1][0] - r[0][0], a = r[1][1] - r[0][1], o = i * i + a * a, s = (n[0] - r[0][0]) * i + (n[1] - r[0][1]) * a;
	return o <= 0 || s <= 0 || s >= o ? [] : t.map((e, t) => ({
		id: `goal-${t}`,
		p0: [...e.p0],
		p1: [...e.p1],
		defendingTeam: e.team,
		pitchPoint: [...n]
	}));
}
var kn = class {
	analyzer = new vt(U);
	stadium;
	geometry = null;
	defaults = [];
	sampled = -Infinity;
	reset() {
		this.analyzer.reset(), this.sampled = -Infinity;
	}
	configure(e, t) {
		if (t !== null) {
			if (!Array.isArray(t) || t.length > 32) throw Error("Invalid commentary geometry");
			let n = /* @__PURE__ */ new Set();
			for (let r of t) {
				if (!r || typeof r.id != "string" || !/^[a-zA-Z0-9._:-]{1,64}$/.test(r.id) || n.has(r.id) || !Array.isArray(r.p0) || !Array.isArray(r.p1) || !Array.isArray(r.pitchPoint) || r.p0.length !== 2 || r.p1.length !== 2 || r.pitchPoint.length !== 2 || ![
					...r.p0,
					...r.p1,
					...r.pitchPoint
				].every((e) => Number.isFinite(e) && Math.abs(e) <= 1e7) || !e.stadium.goals.some((e) => e.team === r.defendingTeam && e.p0.every((e, t) => e === r.p0[t]) && e.p1.every((e, t) => e === r.p1[t]))) throw Error("Commentary geometry must reference this stadium actual goals");
				let t = (r.pitchPoint[0] - r.p0[0]) * (r.p1[1] - r.p0[1]) - (r.pitchPoint[1] - r.p0[1]) * (r.p1[0] - r.p0[0]);
				if (Math.abs(t) < .001) throw Error("Pitch point cannot lie on the goal line");
				n.add(r.id);
			}
		}
		let n = this.stadium !== e.stadium, r = n ? On(e) : this.defaults, i = this.geometry ?? this.defaults, a = t ?? r;
		return n || i.length !== a.length || i.some((e, t) => {
			let n = a[t];
			return e.id !== n.id || e.defendingTeam !== n.defendingTeam || ![
				"p0",
				"p1",
				"pitchPoint"
			].every((t) => e[t].every((e, r) => e === n[t][r]));
		}) ? (this.stadium = e.stadium, this.defaults = r, this.geometry = t === null ? null : structuredClone(t), this.reset(), !0) : !1;
	}
	getGeometry(e) {
		return structuredClone(this.getAnalysisGeometry(e));
	}
	getAnalysisGeometry(e) {
		return this.stadium !== e.stadium && this.configure(e, null), this.geometry ?? this.defaults;
	}
	observe(e, t, n, r) {
		if (this.stadium !== e.stadium && this.configure(e, null), e.paused || e.resumeTicks > 0) return this.reset(), [];
		if (!e.ballKicks.length && !e.ballContact && e.tick - this.sampled < 6 && e.tick >= this.sampled) return [];
		this.sampled = e.tick;
		let i = e.data, a = this.geometry ?? this.defaults, o;
		if (e.ballKicks.length) {
			let t = r(e.ballKicks[e.ballKicks.length - 1]);
			t && (o = {
				kind: "kick",
				player: t
			});
		} else if (e.ballContact) {
			let t = e.ballContact.disc, n = t * 18, s = t > 0 && i[n + d.INVERSE_MASS] === 0 ? a.find((e) => [e.p0, e.p1].some((e) => Math.hypot(i[n] - e[0], i[n + d.Y] - e[1]) <= i[n + d.RADIUS])) : void 0;
			if (s) o = {
				kind: "post",
				goalId: s.id
			};
			else {
				for (let n = 0; n < 32; n++) {
					if (e.index(n) !== t) continue;
					let i = r(n);
					i && (o = {
						kind: "player",
						player: i
					});
					break;
				}
				o ??= { kind: "wall" };
			}
		}
		return this.analyzer.observe({
			streamId: n,
			epoch: t,
			tick: e.tick,
			context: {
				phase: e.phase,
				elapsed: e.elapsed / U,
				timeLimit: e.timeLimit,
				scoreLimit: e.scoreLimit,
				score: {
					red: e.red,
					blue: e.blue
				}
			},
			ball: {
				x: i[0],
				y: i[1],
				vx: i[2] * U,
				vy: i[3] * U,
				radius: i[d.RADIUS]
			},
			goals: a,
			...o ? { contact: o } : {}
		});
	}
};
function An(e, t) {
	t.length && e.broadcast({
		type: "match-analysis",
		version: 1,
		sentAtMs: performance.now(),
		streamId: t[0].streamId,
		observations: t
	});
}
var jn = (e) => typeof e == "string" && e.length > 0 && e.length <= 128 && e.trim() === e && !/\p{Cc}/u.test(e), Mn = (e) => Number.isFinite(e) && Math.abs(e) <= 1e9;
function Nn(e, t, n) {
	return !e || e.sessionId !== t || e.team !== n || n !== 1 && n !== 2 || !Number.isSafeInteger(e.playerId) || e.playerId < 0 || e.playerId > 2147483647 ? null : Object.freeze({
		sessionId: t,
		playerId: e.playerId,
		team: n
	});
}
var Pn = class {
	previous = null;
	continuous = !1;
	edited = !1;
	revision = 0;
	invalidate() {
		this.edited = !0, this.revision = Math.min(2 ** 53 - 1, this.revision + 1);
	}
	baseline(e, t) {
		return this.cursor(e, t), e.setKickSnapshotsEnabled(!0), this.continuous = !0, this.read(e, t, !1);
	}
	capture(e, t) {
		return this.advance(e, t), this.read(e, t, !0);
	}
	captureKicks(e, t) {
		return this.previous?.streamId === t.streamId && this.previous.epoch === t.epoch && this.previous.tick === e.tick ? null : (this.advance(e, t), e.ballKickSnapshots.length ? this.read(e, t, !0) : null);
	}
	advance(e, t) {
		let n = this.previous;
		(!n || n.streamId !== t.streamId || n.epoch !== t.epoch || e.tick !== n.tick + 1) && (this.continuous = !1), this.cursor(e, t);
	}
	cursor(e, t) {
		if (!jn(t.streamId) || !Number.isSafeInteger(t.epoch) || t.epoch < 0 || t.epoch > 65535 || !Number.isSafeInteger(e.tick) || e.tick < 0 || !Array.isArray(t.goals) || t.goals.length > 32) throw Error("Invalid explicit shot capture context");
		this.previous ? (this.previous.streamId = t.streamId, this.previous.epoch = t.epoch, this.previous.tick = e.tick) : this.previous = {
			streamId: t.streamId,
			epoch: t.epoch,
			tick: e.tick
		};
	}
	read(e, { streamId: t, epoch: n, resolve: r, goals: i }, a) {
		let o = e.data, s = this.continuous && !this.edited;
		o.length !== (e.stadium.discs.length + 32) * 18 && (s = !1);
		let c = [], l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
		for (let n = 0; n < 32; n++) {
			let i = e.index(n), a = i * 18, f = o[a + d.TEAM];
			if (f === 0) continue;
			let p = Nn(r(n), t, f);
			if (!p || u.has(p.playerId) || o[a + d.PLAYER_SLOT] !== n + 1) {
				s = !1;
				continue;
			}
			u.add(p.playerId), l.set(i, p), c.push(Object.freeze({
				identity: p,
				x: o[a],
				y: o[a + d.Y],
				vx: o[a + d.SPEED_X] * U,
				vy: o[a + d.SPEED_Y] * U,
				radius: o[a + d.RADIUS]
			}));
		}
		let f = !!(o[d.COLLISION_GROUP] & 128);
		for (let e = 18; e < o.length; e += 18) o[e + d.COLLISION_GROUP] & 128 && (f = !1);
		let p = i.map((e) => Object.freeze({
			id: e.id,
			defendingTeam: e.defendingTeam,
			p0: Object.freeze([...e.p0]),
			p1: Object.freeze([...e.p1]),
			pitchPoint: Object.freeze([...e.pitchPoint])
		})), m = [], h = [];
		if (a) {
			s &&= e.ballContactsComplete && e.ballKickSnapshotsComplete;
			for (let [r, a] of e.ballContacts.entries()) {
				let c = l.get(a.disc), u = {
					id: `${t}:${n}:${e.tick}:contact:${r}`,
					tick: e.tick
				};
				if (a.kind === "kick") c || (s = !1), m.push(Object.freeze({
					...u,
					kind: "kick",
					...c ? { player: c } : {}
				}));
				else if (c) m.push(Object.freeze({
					...u,
					kind: "player",
					player: c
				}));
				else {
					a.disc >= e.stadium.discs.length && (s = !1);
					let t = a.disc * 18, n = a.kind === "disc" && a.disc > 0 && o[t + d.INVERSE_MASS] === 0 ? i.find((e) => [e.p0, e.p1].some((e) => Math.hypot(o[t] - e[0], o[t + d.Y] - e[1]) <= o[t + d.RADIUS])) : void 0;
					m.push(Object.freeze(n ? {
						...u,
						kind: "post",
						goalId: n.id
					} : {
						...u,
						kind: "wall"
					}));
				}
			}
			let r = [], a = /* @__PURE__ */ new Set();
			for (let t of e.ballKickPlayers) {
				let n = l.get(t.disc);
				if (!n || n.team !== t.team || e.index(t.slot) !== t.disc || a.has(n.playerId) || ![
					t.x,
					t.y,
					t.radius
				].every(Mn) || t.radius <= 0) {
					s = !1;
					continue;
				}
				a.add(n.playerId), r.push(Object.freeze({
					identity: n,
					x: t.x,
					y: t.y,
					radius: t.radius
				}));
			}
			e.ballKickSnapshots.length && r.length !== c.length && (s = !1), Object.freeze(r);
			for (let [i, o] of e.ballKickSnapshots.entries()) {
				let c = l.get(o.disc), u = o.contactIndex === null ? void 0 : e.ballContacts[o.contactIndex];
				if (!c || c.team !== o.team || e.index(o.slot) !== o.disc || o.order !== i || !a.has(c.playerId) || !u || u.kind !== "kick" || u.disc !== o.disc || o.contactIndex === null || ![
					o.ball.x,
					o.ball.y,
					o.ball.radius,
					o.ball.beforeVx * U,
					o.ball.beforeVy * U,
					o.ball.afterVx * U,
					o.ball.afterVy * U
				].every(Mn) || o.ball.radius <= 0) {
					s = !1;
					continue;
				}
				h.push(Object.freeze({
					id: `${t}:${n}:${e.tick}:kick:${i}`,
					tick: e.tick,
					order: i,
					contactIndex: o.contactIndex,
					player: c,
					ball: Object.freeze({
						x: o.ball.x,
						y: o.ball.y,
						radius: o.ball.radius,
						beforeVx: o.ball.beforeVx * U,
						beforeVy: o.ball.beforeVy * U,
						afterVx: o.ball.afterVx * U,
						afterVy: o.ball.afterVy * U
					}),
					players: r
				}));
			}
			h.length !== e.ballContacts.filter((e) => e.kind === "kick").length && (s = !1);
		}
		let g = {
			streamId: t,
			epoch: n,
			tick: e.tick,
			context: Object.freeze({
				phase: e.phase,
				paused: e.paused || e.resumeTicks > 0,
				elapsed: e.elapsed / U,
				timeLimit: e.timeLimit,
				scoreLimit: e.scoreLimit,
				score: Object.freeze({
					red: e.red,
					blue: e.blue
				})
			}),
			ball: Object.freeze({
				x: o[0],
				y: o[1],
				vx: o[2] * U,
				vy: o[3] * U,
				radius: o[d.RADIUS]
			}),
			players: Object.freeze(c),
			goals: Object.freeze(p),
			contacts: Object.freeze(m),
			contactsComplete: s
		};
		return jt(g) || (s = !1), Object.freeze({
			frame: Object.freeze({
				...g,
				contactsComplete: s
			}),
			captures: Object.freeze(h),
			capturesComplete: s,
			physicsRevision: this.revision,
			primaryBallOnlyScoring: f
		});
	}
}, Fn = It, In = (e) => [
	e.pos,
	e.speed,
	e.gravity,
	e.radius,
	e.invMass,
	e.damping,
	e.bCoef,
	e.cGroup,
	e.cMask
];
function Ln(e) {
	let t = e.player;
	return {
		version: e.version,
		physicsMode: e.physicsMode,
		lateEntryBoundaryWidth: e.width,
		discs: e.discs.map(In),
		player: [
			...In(t),
			t.acceleration,
			t.kickingAcceleration,
			t.kickingDamping,
			t.kickStrength,
			t.kickback
		],
		colliders: e.colliders.map((e) => [
			e.a,
			e.b,
			e.bCoef,
			e.cGroup,
			e.cMask,
			e.bias,
			..."center" in e ? [
				e.center,
				e.radius,
				e.sweep,
				e.major
			] : []
		]),
		planes: e.planes.map((e) => [
			e.normal,
			e.dist,
			e.bCoef,
			e.cGroup,
			e.cMask
		]),
		joints: e.joints.map((e) => [
			e.d0,
			e.d1,
			e.min,
			e.max,
			e.strength
		]),
		goals: e.goals.map((e) => [
			e.p0,
			e.p1,
			e.team
		]),
		redSpawnPoints: e.redSpawnPoints,
		blueSpawnPoints: e.blueSpawnPoints,
		spawnDistance: e.spawnDistance,
		kickOffReset: e.kickOffReset
	};
}
function Rn(e) {
	return JSON.stringify(e, (e, t) => {
		if (typeof t == "number" && !Number.isFinite(t)) throw Error("Nonfinite xG domain configuration");
		return t;
	});
}
function zn(e, t) {
	if (!Number.isInteger(e.kickRate) || e.kickRate < 0 || e.kickRate > 6619135) throw Error("Invalid xG domain kick rate");
	let n = new kn();
	n.configure(e, t);
	let r = n.getAnalysisGeometry(e);
	if (!r.length) throw Error("xG collection requires supported oriented goal geometry");
	return Rn({
		revision: "stadium-physics-v1",
		physics: Ln(e.stadium),
		kickRate: e.kickRate,
		goals: r.map((e) => [
			e.id,
			e.p0,
			e.p1,
			e.defendingTeam,
			e.pitchPoint
		])
	});
}
async function Bn(e) {
	let t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e));
	return Array.from(new Uint8Array(t), (e) => e.toString(16).padStart(2, "0")).join("");
}
async function Vn(e, t, n = null) {
	if (!t || !["pre-kick", "post-kick"].includes(t.featureStage) || !["all-kicks-v1", "goalward-release-v1"].includes(t.population) || !Number.isInteger(t.outcomeHorizonMs) || t.outcomeHorizonMs < 100 || t.outcomeHorizonMs > 6e4) throw Error("Invalid xG collection policy");
	let r = zn(e, n), i = {
		featureStage: t.featureStage,
		population: t.population,
		outcomeHorizonMs: t.outcomeHorizonMs
	}, [a, o] = await Promise.all([Bn(r), Bn(Rn({
		revision: Fn,
		featuresRevision: Bt,
		hz: U,
		maximumGapTicks: 1,
		snapshot: "raw-before-after-impulse-before-integration-v1",
		featureGoal: "nearest-opposing-center-playable-side-inclusive-v1",
		populationRule: "all-supported-or-positive-post-impulse-dot-v1",
		outcomeRule: "unique-primary-crossing-awarded-team-before-next-kick-v1",
		horizonRounding: "ceil-to-ticks",
		...i
	}))]);
	if (r !== zn(e, n)) throw Error("xG domain changed during preparation");
	return Object.freeze({
		engineId: u,
		geometrySha256: a,
		policySha256: o,
		featuresRevision: Bt,
		shotDefinitionRevision: Fn,
		...i
	});
}
function Hn(e) {
	let t = e.data;
	for (let n = 0; n < e.colors.length; n++) {
		let r = n >= e.stadium.discs.length, i = r ? e.stadium.player : e.stadium.discs[n], a = n * 18;
		if ([
			i.radius,
			i.invMass,
			i.damping,
			i.bCoef,
			...i.gravity
		].some((e, n) => e !== t[a + d.RADIUS + n])) throw Error("Replay initial physics differs from its stadium; no mixed-domain collection");
		let o = i.cGroup | (r ? [
			0,
			S.red,
			S.blue
		][t[a + d.TEAM]] : 0), s = r ? ~(S.redKO | S.blueKO) : -1;
		if (t[a + d.COLLISION_GROUP] !== o || (t[a + d.COLLISION_MASK] & s) !== (i.cMask & s)) throw Error("Replay initial collision rules differ from its stadium");
		if (n > 0 && t[a + d.COLLISION_GROUP] & S.score) throw Error("Offline collection currently requires the primary ball to be the sole scoring disc");
	}
	if (!(t[d.COLLISION_GROUP] & S.score)) throw Error("Offline collection requires a scoring primary ball");
}
function Un(e, t) {
	let n = e.stadium.goals, r = new Set(t.map((e) => n.findIndex((t) => t.team === e.defendingTeam && t.p0.every((t, n) => t === e.p0[n]) && t.p1.every((t, n) => t === e.p1[n]))));
	if (t.length !== n.length || r.size !== n.length || r.has(-1)) throw Error("Offline collection geometry must cover every physical goal exactly once");
}
var Wn = Math.round(3 * U), Gn = .02, Kn = (e) => Math.min(1, Math.max(0, e)), qn = (e) => Math.min(3, Math.max(0, e));
function Jn(e, t, n, r) {
	let i = Math.max(0, e) / U, a = 0;
	for (let e = 0; e < r; e++) a += i, i = (i + t) * n;
	return a;
}
function Yn(e, t, n, r, i) {
	let a = e.x, o = e.y, s = e.vx / U, c = e.vy / U, l = t.length - 1;
	for (let e = 0; e <= l; e++) {
		let l = t[e];
		if (Math.hypot(a - l.x, o - l.y) <= n) return e;
		let u = l.x - a, d = l.y - o, f = Math.hypot(u, d);
		f > 1e-9 ? (u /= f, d /= f) : (u = 0, d = 0), a += s, o += c, s = (s + u * r) * i, c = (c + d * r) * i;
	}
	return l + 1;
}
function Xn(e, t, n) {
	if (t.source !== e.source) return null;
	let r = e.data, i = t.data;
	if (i.length !== r.length) return null;
	i.set(r), i[d.X] = n.ball.x, i[d.Y] = n.ball.y, i[d.SPEED_X] = n.ball.afterVx / U, i[d.SPEED_Y] = n.ball.afterVy / U;
	for (let e = 0; e < 32; e++) {
		let n = t.index(e) * 18;
		i[n + d.TEAM] !== 0 && (i[n + d.COLLISION_MASK] = 0, i[n + d.INPUT] = 0, i[n + d.KICK_STATE] = 0);
	}
	let a = [{
		x: i[d.X],
		y: i[d.Y]
	}], o = null, s = null;
	for (let e = 1; e <= Wn; e++) {
		t.core.step();
		let n = t.core.goal_event();
		if (a.push({
			x: i[d.X],
			y: i[d.Y]
		}), n === 1 || n === 2) {
			o = e, s = n;
			break;
		}
		if (Math.hypot(i[d.SPEED_X], i[d.SPEED_Y]) < Gn && e > 4) break;
	}
	return {
		path: a,
		goalTick: o,
		scoredForTeam: s
	};
}
function Zn(e, t, n, r) {
	let i = {
		x: n[0],
		y: n[1]
	}, a = {
		x: r[0],
		y: r[1]
	}, o = (e, t, n) => (n.x - e.x) * (t.y - e.y) - (n.y - e.y) * (t.x - e.x) > 0;
	return o(t, e, i) !== o(t, e, a) && o(i, a, t) !== o(i, a, e);
}
function Qn(e, t, n, r, i) {
	let a = Xn(e, t, n);
	if (!a) return null;
	let { path: o, goalTick: s, scoredForTeam: c } = a, l = s !== null && c === n.player.team && Zn(o[s - 1], o[s], i.p0, i.p1) ? 1 : 0, u = l === 1, d = u ? qn(s / U) : 3, f = d, p = u ? s : Wn, { acceleration: m, damping: h } = t.stadium.player, g = r.players.filter((e) => e.identity.team !== n.player.team), _ = 0, v = 3, y = g.find((e) => e.role === "goalkeeper") ?? null, b = Infinity;
	for (let e of g) {
		let t = Yn(e, o, e.radius + n.ball.radius, m, h), r = t > o.length - 1 ? 3 : qn(t / U);
		if (r <= d + 1e-9 && _++, v = Math.min(v, r), !y) {
			let t = (i.p0[0] + i.p1[0]) / 2, n = (i.p0[1] + i.p1[1]) / 2, r = Math.hypot(e.x - t, e.y - n);
			r < b && (b = r, y = e);
		}
	}
	let x = qn(v - d), ee = qn(d - v), S = 0;
	if (y) {
		let e = i.p1[0] - i.p0[0], t = i.p1[1] - i.p0[1], n = Math.hypot(e, t);
		if (n > 1e-9) {
			let r = e / n, a = t / n, o = Kn(((y.x - i.p0[0]) * r + (y.y - i.p0[1]) * a) / n) * n, s = Jn(Math.hypot(y.vx, y.vy), m, h, p) + y.radius, c = Math.max(0, o - s), l = Math.min(n, o + s);
			S = Kn(l > c ? (l - c) / n : 0);
		}
	}
	return Object.freeze({
		timeToGoalLineSeconds: f,
		crossesGoalMouth: l,
		defendersReachingLaneCount: _,
		ballLeadSeconds: x,
		defenderLeadSeconds: ee,
		keeperCoverageRatio: S
	});
}
var $n = Object.freeze([]), er = (e, t) => e.length === t.length && e.every((e, n) => {
	let r = t[n];
	return e.id === r.id && e.defendingTeam === r.defendingTeam && e.p0.every((e, t) => e === r.p0[t]) && e.p1.every((e, t) => e === r.p1[t]) && e.pitchPoint.every((e, t) => e === r.pitchPoint[t]);
}), tr = class {
	trust;
	shadowFactory;
	engine = null;
	stadium = null;
	shadow = null;
	generation = 0;
	edited = !1;
	closed = !1;
	estimator = null;
	adapter = null;
	goals = [];
	kickRate = 0;
	tick = -1;
	epoch = -1;
	streamId = "";
	wasPlaying = !1;
	status = Object.freeze({
		state: "disabled",
		reason: "disabled",
		domain: null,
		modelId: null,
		trustScope: "host-configuration"
	});
	constructor(e = {}, t = () => ft.create()) {
		if (!e || typeof e != "object" || Array.isArray(e) || e.trustedModels !== void 0 && (!Array.isArray(e.trustedModels) || e.trustedModels.length > 16)) throw TypeError("Invalid host-local xG trust list");
		if (typeof t != "function") throw TypeError("Invalid xG shadow engine factory");
		let n = (e.trustedModels ?? []).flatMap((e) => {
			let t = nn(e, e?.domain);
			return t.ok ? [t.model] : [];
		});
		this.trust = Object.freeze({ trustedModels: Object.freeze(n) }), this.shadowFactory = t;
	}
	get active() {
		return this.status.state === "ready";
	}
	getStatus() {
		return this.status;
	}
	async configure(e, t, n = null) {
		let r = ++this.generation;
		if (this.disable(), this.closed) return this.setStatus("disabled", "closed");
		if (t === null) return this.setStatus("disabled", "disabled");
		if (this.edited) return this.setStatus("invalidated", "physics-edit");
		this.engine = e, this.stadium = e.stadium, e.setKickSnapshotsEnabled(!1);
		let i = an(t?.model, t?.model?.domain, this.trust);
		if (i.status !== "reviewed-model") {
			let e = i.estimate({});
			return this.setStatus("unavailable", e.reason);
		}
		let a = nn(t.model, t.model.domain);
		if (!a.ok) return this.setStatus("unavailable", a.reason);
		let o = a.model, s = Object.freeze({ ...t.policy }), c;
		try {
			let t = new kn();
			t.configure(e, n), c = t.getGeometry(e), Un(e, c);
		} catch {
			return this.setStatus("unavailable", "unsupported-geometry");
		}
		try {
			Hn(e);
		} catch {
			return this.invalidate("physics-edit"), this.status;
		}
		this.setStatus("preparing", "preparing");
		try {
			let t = await Vn(e, s, c);
			if (r !== this.generation || this.closed) return this.status;
			if (e.stadium !== this.stadium) return this.setStatus("unavailable", "domain-change");
			Hn(e);
			let n = an(o, t, this.trust);
			if (n.status !== "reviewed-model") {
				let e = n.estimate({});
				return this.setStatus("unavailable", e.reason, t);
			}
			if (!e.source) return this.setStatus("unavailable", "unsupported-geometry");
			let i = await this.shadowFactory();
			return r !== this.generation || this.closed ? this.status : e.stadium === this.stadium ? (i.load(e.source), this.shadow = i, this.estimator = n, this.goals = c, this.kickRate = e.kickRate, this.setStatus("ready", "ready", t, n.modelId)) : this.setStatus("unavailable", "domain-change");
		} catch {
			return r !== this.generation || this.closed ? this.status : this.setStatus("unavailable", "domain-change");
		}
	}
	baseline(e, t) {
		if (!(!this.estimator || this.edited || this.closed || this.status.state !== "ready" && this.status.reason !== "capture-discontinuity") && this.matches(e, t)) try {
			let n = new Pn(), r = n.baseline(e, t);
			if (!r.capturesComplete || !r.primaryBallOnlyScoring) {
				e.setKickSnapshotsEnabled(!1), this.setStatus("invalidated", "capture-discontinuity", this.status.domain, this.status.modelId);
				return;
			}
			this.adapter = n, this.cursor(e, t), this.setStatus("ready", "ready", this.status.domain, this.status.modelId);
		} catch {
			e.setKickSnapshotsEnabled(!1), this.setStatus("invalidated", "capture-discontinuity", this.status.domain, this.status.modelId);
		}
	}
	capture(e, t) {
		if (!this.active || !this.estimator || !this.adapter || !this.matches(e, t) || this.tick === e.tick && this.epoch === t.epoch && this.streamId === t.streamId) return $n;
		if (this.tick + 1 !== e.tick || this.epoch !== t.epoch || this.streamId !== t.streamId) return e.setKickSnapshotsEnabled(!1), this.adapter = null, this.setStatus("invalidated", "capture-discontinuity", this.status.domain, this.status.modelId), $n;
		let n = this.wasPlaying;
		this.cursor(e, t);
		let r = this.adapter.captureKicks(e, t);
		if (!n || !r || !r.capturesComplete || !r.primaryBallOnlyScoring || !Cn(r.captures, r.frame)) return $n;
		let i = this.status.domain;
		if (!i || !this.shadow) return $n;
		let a = [];
		for (let n of r.captures) {
			let o = wn(n, r.frame, i), s = o ? Qn(e, this.shadow, n, r.frame, o.target) : null, c = Dn(n, r.frame, i, s);
			c && a.push(Object.freeze({
				eventId: `${n.id}:estimate`,
				streamId: t.streamId,
				epoch: t.epoch,
				tick: n.tick,
				order: n.order,
				player: c.player,
				goalId: c.goalId,
				features: c.features,
				estimate: this.estimator.estimate(c.features),
				domain: i,
				trustScope: "host-configuration"
			}));
		}
		return a.length ? Object.freeze(a) : $n;
	}
	invalidate(e) {
		++this.generation, e === "physics-edit" && (this.edited = !0), this.disable(), this.setStatus(this.closed ? "disabled" : "invalidated", this.closed ? "closed" : e);
	}
	reset() {
		++this.generation, this.disable(), this.setStatus("disabled", this.closed ? "closed" : "disabled");
	}
	resetForStadium(e) {
		let t = e !== this.engine || e.stadium !== this.stadium;
		if (this.reset(), !this.closed) {
			if (this.engine = e, this.stadium = e.stadium, t) try {
				Hn(e), this.edited = !1;
			} catch {
				this.edited = !0;
			}
			this.edited && this.setStatus("invalidated", "physics-edit");
		}
	}
	close() {
		this.closed = !0, this.reset();
	}
	matches(e, t) {
		return this.engine !== e || this.stadium !== e.stadium || this.kickRate !== e.kickRate || !er(this.goals, t.goals) ? (this.invalidate("domain-change"), !1) : !0;
	}
	cursor(e, t) {
		this.tick = e.tick, this.epoch = t.epoch, this.streamId = t.streamId, this.wasPlaying = e.phase === "playing" && !e.paused && e.resumeTicks === 0;
	}
	disable() {
		this.engine?.setKickSnapshotsEnabled(!1), this.estimator = null, this.adapter = null, this.shadow = null, this.tick = -1, this.wasPlaying = !1;
	}
	setStatus(e, t, n = null, r = null) {
		return this.status = Object.freeze({
			state: e,
			reason: t,
			domain: n,
			modelId: r,
			trustScope: "host-configuration"
		}), this.status;
	}
}, nr = {
	enabled: !0,
	maxGapMs: 250,
	controlHoldMs: 120,
	controlExtraRadii: 1.25,
	controlRelativeSpeedRadii: 12,
	passWindowMs: 3e3,
	passMinTravelRadii: 4,
	chainWindowMs: 1e4,
	assistWindowMs: 8e3,
	shotWindowMs: 2e3,
	shotMinSpeedRadii: 18,
	shotHorizonMs: 2e3,
	blockedAtSourceLeadMs: 600,
	saveAreaGoalWidths: 1.5,
	clearanceAreaGoalWidths: 1,
	clearanceOffLineGoalWidths: .3,
	turnoverConfirmMs: 180,
	progressGoalWidths: .75,
	counterWindowMs: 4e3,
	pressureHoldMs: 1800,
	pressureAreaGoalWidths: 1.5,
	summaryWindowMs: 15e3
}, rr = {
	maxGapMs: [16, 1e3],
	controlHoldMs: [50, 1e3],
	controlExtraRadii: [0, 4],
	controlRelativeSpeedRadii: [1, 40],
	passWindowMs: [300, 6e3],
	passMinTravelRadii: [2, 30],
	chainWindowMs: [1e3, 2e4],
	assistWindowMs: [500, 12e3],
	shotWindowMs: [200, 4e3],
	shotMinSpeedRadii: [5, 100],
	shotHorizonMs: [200, 3e3],
	blockedAtSourceLeadMs: [0, 1500],
	saveAreaGoalWidths: [.25, 3],
	clearanceAreaGoalWidths: [.25, 3],
	clearanceOffLineGoalWidths: [.05, 1.5],
	turnoverConfirmMs: [0, 2e3],
	progressGoalWidths: [.25, 3],
	counterWindowMs: [1e3, 8e3],
	pressureHoldMs: [500, 6e3],
	pressureAreaGoalWidths: [.5, 4],
	summaryWindowMs: [5e3, 6e4]
};
function ir(e = {}, t = nr) {
	let n = e && typeof e == "object" ? e : {}, r = {
		...nr,
		...t
	};
	r.enabled = typeof n.enabled == "boolean" ? n.enabled : typeof t.enabled == "boolean" ? t.enabled : nr.enabled;
	for (let e of Object.keys(rr)) {
		let i = n[e], a = Number.isFinite(t[e]) ? t[e] : nr[e], [o, s] = rr[e];
		r[e] = Math.max(o, Math.min(s, typeof i == "number" && Number.isFinite(i) ? i : a));
	}
	return Object.freeze(r);
}
var ar = () => ({
	controlledMs: 0,
	completedPasses: 0,
	failedPasses: 0,
	turnoversWon: 0,
	directedShots: 0,
	blocks: 0,
	clearances: 0,
	saves: 0,
	confirmedAssists: 0
}), or = Object.freeze([]), sr = (e, t = 1) => Math.min(2 ** 53 - 1, e + t), cr = {
	"player-retired": 120,
	"control-ended": 110,
	"assist-confirmed": 100,
	"scorer-tally": 98,
	"goalkeeper-save": 95,
	block: 90,
	clearance: 88,
	"directed-shot": 85,
	"blocked-at-source": 82,
	counterattack: 80,
	"pass-chain": 75,
	"attack-progress": 70,
	"pass-completed": 65,
	turnover: 60,
	"pass-failed": 55,
	"sustained-pressure": 50,
	"control-established": 30,
	"tactical-summary": 10
}, lr = (e, t) => e.identity.playerId === t.identity.playerId && e.identity.sessionId === t.identity.sessionId && e.identity.team === t.identity.team && e.role === t.role, ur = (e, t) => e.length === t.length && e.every((e, n) => lr(e, t[n]) || t.some((t) => lr(e, t))), dr = (e, t) => e.id === t.id && e.defendingTeam === t.defendingTeam && e.p0[0] === t.p0[0] && e.p0[1] === t.p0[1] && e.p1[0] === t.p1[0] && e.p1[1] === t.p1[1] && e.pitchPoint[0] === t.pitchPoint[0] && e.pitchPoint[1] === t.pitchPoint[1], fr = (e, t) => e.length === t.length && e.every((e, n) => dr(e, t[n]) || t.some((t) => dr(e, t))), pr = class {
	ticksPerSecond;
	policy;
	streamId = null;
	epoch = -1;
	tick = -1;
	confirmedSequence = 0;
	sequence = 0;
	status = "uninitialized";
	unknown = [];
	geometryBaseline = null;
	rosterBaseline = null;
	controller = null;
	candidate = null;
	lastController = null;
	pass = null;
	lastPass = null;
	shot = null;
	chain = {
		team: null,
		completed: 0,
		tick: -1
	};
	attack = null;
	pendingTurnover = null;
	goalTally = /* @__PURE__ */ new Map();
	contacts = /* @__PURE__ */ new Set();
	red = ar();
	blue = ar();
	observedMs = 0;
	uncontrolledMs = 0;
	summarySince = -1;
	summaryBase = {
		red: 0,
		blue: 0,
		observed: 0,
		redPasses: 0,
		bluePasses: 0
	};
	emitted = 0;
	dropped = 0;
	completeAtTick = !1;
	constructor(e = {}, t = 60) {
		if (this.ticksPerSecond = t, !Number.isFinite(t) || t < 1 || t > 1e3) throw Error("Invalid intelligence tick rate");
		this.policy = ir(e);
	}
	getPolicy() {
		return this.policy;
	}
	invalidate(e = "discontinuity") {
		this.clearContinuity(), this.completeAtTick = !1, this.unknown = [typeof e == "string" && e.length ? e.slice(0, 96) : "discontinuity"], this.status = this.policy.enabled ? "unknown" : "disabled";
	}
	configure(e) {
		return this.policy = ir(e, this.policy), this.reset(), this.policy;
	}
	reset() {
		this.clearContinuity(), this.streamId = null, this.epoch = this.tick = -1, this.confirmedSequence = this.sequence = 0, this.geometryBaseline = this.rosterBaseline = null, this.contacts.clear(), this.goalTally.clear(), this.red = ar(), this.blue = ar(), this.observedMs = this.uncontrolledMs = this.emitted = this.dropped = 0, this.summarySince = -1, this.summaryBase = {
			red: 0,
			blue: 0,
			observed: 0,
			redPasses: 0,
			bluePasses: 0
		}, this.status = this.policy.enabled ? "uninitialized" : "disabled", this.unknown = [], this.completeAtTick = !1;
	}
	clearContinuity() {
		this.controller = this.candidate = this.lastController = null, this.pass = this.lastPass = this.shot = null, this.chain = {
			team: null,
			completed: 0,
			tick: -1
		}, this.attack = null, this.pendingTurnover = null, this.summarySince = -1;
	}
	team(e) {
		return e === 1 ? this.red : this.blue;
	}
	ms(e) {
		return e * 1e3 / this.ticksPerSecond;
	}
	emit(e, t, n, r, i, a = {}) {
		let o = Object.freeze({
			eventId: `${t.streamId}:intelligence:${t.epoch}:${t.tick}:${++this.sequence}`,
			streamId: t.streamId,
			epoch: t.epoch,
			tick: t.tick,
			kind: n,
			team: r,
			context: Object.freeze({
				...t.context,
				score: Object.freeze({ ...t.context.score })
			}),
			confidence: a.confidence ?? "supported",
			evidence: Object.freeze(i),
			metrics: Object.freeze({ ...a.metrics ?? {} }),
			...a.player ? { player: xt(a.player) } : {},
			...a.otherPlayer ? { otherPlayer: xt(a.otherPlayer) } : {},
			...a.goalId ? { goalId: a.goalId } : {},
			...a.shotQuality ? { shotQuality: a.shotQuality } : {},
			...this.attack?.team === r ? { attackId: this.attack.id } : {}
		});
		e.length < 40 ? e.push(o) : this.dropped++;
	}
	finish(e) {
		return e.sort((e, t) => cr[t.kind] - cr[e.kind]), e.length > 8 && (this.dropped += e.length - 8, e.length = 8), this.emitted = sr(this.emitted, e.length), Object.freeze(e);
	}
	observe(e) {
		if (!this.policy.enabled) return this.status = "disabled", [];
		if (!jt(e)) return this.clearContinuity(), this.completeAtTick = !1, this.status = "unknown", this.unknown = ["invalid-or-overflow-frame"], [];
		if (this.streamId && e.streamId !== this.streamId || this.epoch >= 0 && mt(e.epoch, this.epoch) || e.epoch === this.epoch && e.tick <= this.tick) return [];
		this.epoch >= 0 && (e.epoch !== this.epoch || !this.rosterBaseline || !this.geometryBaseline || !ur(e.players, this.rosterBaseline) || !fr(e.goals, this.geometryBaseline)) && this.reset();
		let t = this.tick, n = t >= 0 ? this.ms(e.tick - t) : 0;
		this.streamId = e.streamId, this.epoch = e.epoch, this.tick = e.tick, this.rosterBaseline ||= e.players.map((e) => ({
			identity: xt(e.identity),
			role: e.role
		})), this.geometryBaseline ||= e.goals.map((e) => ({
			...e,
			p0: [...e.p0],
			p1: [...e.p1],
			pitchPoint: [...e.pitchPoint]
		})), this.unknown.length = 0, n > this.policy.maxGapMs && (this.clearContinuity(), this.unknown.push("sampling-gap"));
		let r = t < 0 ? e.tick - 1 : t, i = e.contacts.length ? e.contacts.filter((e) => e.tick > r && !this.contacts.has(e.id)) : or;
		for (let e of i) if (this.contacts.add(e.id), this.contacts.size > 128) {
			let e = this.contacts.values().next().value;
			e !== void 0 && this.contacts.delete(e);
		}
		let a = !1, o = -1, s = "";
		for (let e of i) {
			let t = e.player ? yt(e.player) : e.kind;
			if (e.tick !== o) o = e.tick, s = t;
			else if (t !== s) {
				a = !0;
				break;
			}
		}
		let c = e.contactsComplete && !a && n <= this.policy.maxGapMs;
		this.completeAtTick = c, c || (this.pass = this.lastPass = this.shot = null, this.chain = {
			team: null,
			completed: 0,
			tick: -1
		}, this.unknown.push(a ? "ambiguous-contact-order" : e.contactsComplete ? "sampling-gap" : "incomplete-contact-coverage"));
		for (let e of i) e.player && this.lastPass && !bt(e.player, this.lastPass.to) && (this.lastPass = null);
		if (e.context.paused || e.context.phase !== "playing") return (e.context.paused || e.context.phase === "lobby") && this.clearContinuity(), this.controller = this.candidate = null, this.summarySince = -1, this.status = "paused", [];
		e.goals.length || this.unknown.push("goal-geometry-unavailable");
		let l = [];
		if (this.pass && this.ms(e.tick - this.pass.tick) > this.policy.passWindowMs && (this.pass = null), this.lastPass && this.ms(e.tick - this.lastPass.tick) > this.policy.assistWindowMs && (this.lastPass = null), this.shot && this.ms(e.tick - this.shot.tick) > this.policy.shotWindowMs && (this.shot = null), this.chain.team && this.ms(e.tick - this.chain.tick) > this.policy.chainWindowMs && (this.chain = {
			team: null,
			completed: 0,
			tick: -1
		}), this.lastController && this.ms(e.tick - this.lastController.tick) > this.policy.chainWindowMs && (this.attack = null, this.lastController = null), c) for (let t of i) {
			let n = t.player;
			if (n && this.pass && n.team !== this.pass.player.team) {
				let t = this.pass;
				this.team(t.player.team).failedPasses++, this.emit(l, e, "pass-failed", t.player.team, ["verified-kick", "opponent-contact-before-reception"], {
					player: t.player,
					otherPlayer: n,
					metrics: { flightMs: this.ms(e.tick - t.tick) }
				}), this.pass = null, this.chain = {
					team: null,
					completed: 0,
					tick: -1
				};
			}
			let r = !1;
			if (n && this.shot && n.team !== this.shot.player.team && (t.tick === e.tick ? (this.defend(e, n, l), r = !0) : this.shot = null), t.kind === "kick" && n) {
				if (this.pass = null, t.tick !== e.tick) continue;
				let i = t.trajectory, a, o;
				if (i && t.goalId) {
					let r = e.goals.find((e) => e.id === t.goalId && e.defendingTeam !== n.team);
					if (r && i.crossesGoalMouth === 1) {
						let e = i.defenderLeadSeconds * 1e3;
						e < this.policy.blockedAtSourceLeadMs ? a = r : o = e;
					}
				} else a = e.goals.find((t) => t.defendingTeam !== n.team && Nt(e, t.id, this.policy.shotHorizonMs / 1e3));
				let s = Math.hypot(e.ball.vx, e.ball.vy) / e.ball.radius;
				if (o !== void 0) this.shot = null, this.emit(l, e, "blocked-at-source", n.team, [
					"verified-kick",
					"trajectory-crosses-goal-mouth",
					"defender-already-in-lane"
				], {
					player: n,
					metrics: { defenderLeadMs: o }
				});
				else if (a && s >= this.policy.shotMinSpeedRadii) this.shot = {
					player: xt(n),
					goalId: a.id,
					tick: e.tick,
					threatTick: e.tick
				}, this.team(n.team).directedShots++, this.emit(l, e, "directed-shot", n.team, [
					"verified-kick",
					"trajectory-crosses-goal-mouth",
					"finite-flight-horizon",
					...i ? ["shadow-engine-trajectory-confirmed", "no-immediate-blocker"] : []
				], {
					player: n,
					goalId: a.id,
					shotQuality: Ft(e, a.id, n.team)
				});
				else {
					this.shot = null;
					let t = !r && e.goals.find((e) => e.defendingTeam === n.team), i = t && gt(t, e.ball), a = e.players.some((t) => t.identity.team !== n.team && Math.hypot(t.x - e.ball.x, t.y - e.ball.y) <= t.radius + e.ball.radius * (1 + this.policy.controlExtraRadii)), o = !!this.lastController && this.lastController.player.team !== n.team && this.ms(e.tick - this.lastController.tick) <= this.policy.passWindowMs, s = a || o;
					i && i.across > e.ball.radius && i.across / i.length <= this.policy.clearanceAreaGoalWidths && i.acrossSpeed > 0 && s ? (this.team(n.team).clearances++, this.emit(l, e, "clearance", n.team, [
						"verified-kick",
						"defending-own-goal-area",
						"opponent-pressure-or-contested-control",
						"ball-sent-away-from-own-goal"
					], {
						player: n,
						metrics: { distanceGoalWidths: i.across / i.length }
					})) : Pt(e, n, this.policy.passWindowMs, this.policy.passMinTravelRadii) && (this.pass = {
						player: xt(n),
						tick: e.tick,
						x: e.ball.x,
						y: e.ball.y,
						radius: e.ball.radius
					});
				}
			}
		}
		this.shot && (Nt(e, this.shot.goalId, this.policy.shotHorizonMs / 1e3) ? this.shot.threatTick = e.tick : this.shot = null);
		let u = this.controller, d = !1;
		for (let e = 0; e < i.length; e++) i[e].kind === "kick" && (d = !0);
		let f = 0, p;
		for (let t = 0; t < e.players.length; t++) {
			let n = e.players[t];
			Math.hypot(n.x - e.ball.x, n.y - e.ball.y) <= n.radius + e.ball.radius * (1 + this.policy.controlExtraRadii) && (p ??= n, f++);
		}
		let m = f === 1 && p && !d && Math.hypot(p.vx - e.ball.vx, p.vy - e.ball.vy) <= e.ball.radius * this.policy.controlRelativeSpeedRadii ? p : void 0;
		if (m ? ((!this.candidate || !bt(this.candidate.player, m.identity)) && (this.candidate = {
			player: xt(m.identity),
			began: e.tick
		}), this.ms(e.tick - this.candidate.began) >= this.policy.controlHoldMs ? (this.controller = this.candidate.player, (!u || !bt(u, this.controller)) && this.establish(e, l)) : this.controller = null) : (this.controller = this.candidate = null, f > 1 && this.unknown.push("contested-control")), c && u && !this.controller && this.endReleasedControl(e, u, i, l), n > 0 && n <= this.policy.maxGapMs && (this.observedMs = sr(this.observedMs, n), this.controller && u && bt(this.controller, u) ? this.team(this.controller.team).controlledMs = sr(this.team(this.controller.team).controlledMs, n) : this.uncontrolledMs = sr(this.uncontrolledMs, n)), this.controller ? (this.lastController = {
			player: this.controller,
			tick: e.tick
		}, this.advanceAttack(e, l)) : this.attack && (this.attack.pressureSince = null), this.pendingTurnover) {
			if (!(this.controller && bt(this.controller, this.pendingTurnover.player))) this.pendingTurnover = null;
			else if (e.tick >= this.pendingTurnover.confirmAt) {
				let { player: t, otherPlayer: n } = this.pendingTurnover;
				this.pendingTurnover = null, this.team(t.team).turnoversWon++, this.emit(l, e, "turnover", t.team, [
					"previous-observed-opponent-control",
					"new-sustained-control",
					"confirmed-after-hold"
				], {
					player: t,
					otherPlayer: n
				});
			}
		}
		return this.summarize(e, l), this.status = this.unknown.length ? "unknown" : "tracking", this.finish(l);
	}
	endReleasedControl(e, t, n, r) {
		let i = yt(t);
		if (!n.some((t) => t.kind === "kick" && t.tick === e.tick && t.player && yt(t.player) === i)) return;
		let a = e.players.find((e) => yt(e.identity) === i);
		if (!a || !this.attack || this.attack.team !== t.team) return;
		let o = Math.hypot(a.x - e.ball.x, a.y - e.ball.y) / e.ball.radius, s = a.radius / e.ball.radius + 1 + this.policy.controlExtraRadii, c = Math.hypot(a.vx - e.ball.vx, a.vy - e.ball.vy) / e.ball.radius;
		o <= s && c <= this.policy.controlRelativeSpeedRadii || this.emit(r, e, "control-ended", t.team, [
			"previous-observed-control",
			"verified-controller-kick",
			"measured-control-separation"
		], {
			player: t,
			metrics: {
				distanceBallRadii: o,
				controlReachBallRadii: s,
				relativeSpeedBallRadiiPerSecond: c,
				controlRelativeSpeedRadii: this.policy.controlRelativeSpeedRadii
			}
		});
	}
	defend(e, t, n) {
		let r = this.shot;
		if (!r) return;
		this.shot = null;
		let i = e.goals.find((e) => e.id === r.goalId), a = i && gt(i, e.ball);
		if (!a || a.across <= e.ball.radius || this.ms(e.tick - r.threatTick) > this.policy.maxGapMs || Nt(e, r.goalId, this.policy.shotHorizonMs / 1e3)) return;
		let o = e.players.find((e) => bt(e.identity, t))?.role === "goalkeeper", s = a.across / a.length, c = a.along >= 0 && a.along <= a.length, l = o && s <= this.policy.saveAreaGoalWidths, u = !l && c && s <= this.policy.clearanceOffLineGoalWidths, d = l ? "goalkeeper-save" : u ? "clearance" : "block";
		this.team(t.team)[l ? "saves" : u ? "clearances" : "blocks"]++, this.emit(n, e, d, t.team, [
			"prior-directed-shot",
			"recent-goal-bound-trajectory",
			"verified-opponent-ball-contact",
			"trajectory-no-longer-goal-bound",
			...l ? ["explicit-goalkeeper-role", "inside-configured-save-area"] : [],
			...u ? ["inside-goal-mouth-projection", "goal-line-clearance"] : []
		], {
			player: t,
			otherPlayer: r.player,
			goalId: r.goalId,
			metrics: { shotAgeMs: this.ms(e.tick - r.tick) }
		});
	}
	establish(e, t) {
		let n = this.controller, r = this.candidate;
		if (!n || !r) return;
		let i = this.lastController, a = !!i && i.player.team !== n.team && this.ms(e.tick - i.tick) <= this.policy.passWindowMs;
		if (this.emit(t, e, "control-established", n.team, [
			"unique-nearby-player",
			"matched-relative-velocity",
			"sustained-control-window"
		], {
			player: n,
			metrics: { heldMs: this.ms(e.tick - r.began) }
		}), a && i && (this.pendingTurnover = {
			player: n,
			otherPlayer: i.player,
			confirmAt: e.tick + Math.ceil(this.policy.turnoverConfirmMs * this.ticksPerSecond / 1e3)
		}, this.chain = {
			team: null,
			completed: 0,
			tick: -1
		}), this.pass && !bt(this.pass.player, n)) {
			let r = this.pass, i = Math.hypot(e.ball.x - r.x, e.ball.y - r.y) / r.radius;
			r.player.team === n.team && i >= this.policy.passMinTravelRadii ? (this.team(n.team).completedPasses++, this.lastPass = {
				from: r.player,
				to: xt(n),
				tick: e.tick
			}, this.chain = {
				team: n.team,
				completed: Math.min(32, this.chain.team === n.team ? this.chain.completed + 1 : 1),
				tick: e.tick
			}, this.emit(t, e, "pass-completed", n.team, [
				"verified-kick",
				"distinct-teammate-sustained-control",
				"uninterrupted-contact-coverage",
				"minimum-ball-travel"
			], {
				player: r.player,
				otherPlayer: n,
				metrics: {
					travelBallRadii: i,
					flightMs: this.ms(e.tick - r.tick),
					chainLength: this.chain.completed
				}
			}), this.chain.completed >= 3 && this.emit(t, e, "pass-chain", n.team, ["consecutive-confirmed-passes"], {
				player: n,
				metrics: { completed: this.chain.completed }
			})) : r.player.team !== n.team && (this.team(r.player.team).failedPasses++, this.emit(t, e, "pass-failed", r.player.team, ["verified-kick", "opponent-sustained-control-before-reception"], {
				player: r.player,
				otherPlayer: n
			})), this.pass = null;
		} else this.pass && this.ms(e.tick - this.pass.tick) > this.policy.controlHoldMs && (this.pass = null);
		if (!this.attack || this.attack.team !== n.team) {
			let t = Mt(e, n.team);
			t && (this.attack = {
				id: `${e.streamId}:attack:${e.epoch}:${e.tick}:${n.team}`,
				team: n.team,
				goalId: t.goal.id,
				began: e.tick,
				startDistance: t.projection.across / t.projection.length,
				lastProgress: 0,
				turnover: a,
				counterCalled: !1,
				pressureSince: null,
				pressureCalled: !1
			});
		}
	}
	advanceAttack(e, t) {
		let n = this.attack, r = this.controller;
		if (!n || !r || n.team !== r.team) return;
		let i = e.goals.find((e) => e.id === n.goalId), a = i && gt(i, e.ball);
		if (!a || a.across <= e.ball.radius) return;
		let o = a.across / a.length, s = n.startDistance - o, c = this.ms(e.tick - n.began);
		s - n.lastProgress >= this.policy.progressGoalWidths && (n.lastProgress = s, this.emit(t, e, "attack-progress", n.team, ["same-team-controlled-attack", "measured-goalward-progression"], {
			player: r,
			goalId: n.goalId,
			metrics: {
				progressGoalWidths: s,
				elapsedMs: c
			}
		}), n.turnover && !n.counterCalled && n.startDistance >= 2 && c <= this.policy.counterWindowMs && (n.counterCalled = !0, this.emit(t, e, "counterattack", n.team, [
			"observed-control-turnover",
			"started-away-from-opponent-goal",
			"rapid-goalward-controlled-progression"
		], {
			player: r,
			goalId: n.goalId,
			metrics: {
				progressGoalWidths: s,
				elapsedMs: c
			}
		})));
		let l = a.along >= -a.length / 2 && a.along <= a.length * 1.5;
		if (o <= this.policy.pressureAreaGoalWidths && l) {
			n.pressureSince === null && (n.pressureSince = e.tick);
			let i = this.ms(e.tick - n.pressureSince);
			!n.pressureCalled && i >= this.policy.pressureHoldMs && (n.pressureCalled = !0, this.emit(t, e, "sustained-pressure", n.team, ["sustained-observed-control-near-opponent-goal", "goal-relative-area"], {
				player: r,
				goalId: n.goalId,
				metrics: {
					durationMs: i,
					distanceGoalWidths: o
				}
			}));
		} else n.pressureSince = null;
	}
	summarize(e, t) {
		if (this.summarySince < 0) {
			this.beginSummary(e.tick);
			return;
		}
		if (this.ms(e.tick - this.summarySince) < this.policy.summaryWindowMs) return;
		let n = this.observedMs - this.summaryBase.observed, r = this.red.controlledMs - this.summaryBase.red, i = this.blue.controlledMs - this.summaryBase.blue, a = n > 0 ? (r + i) / n : 0;
		if (n >= this.policy.summaryWindowMs * .8 && a >= .5) {
			let o = r >= i ? 1 : 2;
			this.emit(t, e, "tactical-summary", o, ["bounded-observation-window", "observed-control-coverage-at-least-half"], { metrics: {
				windowMs: n,
				controlCoverage: a,
				redControlledMs: r,
				blueControlledMs: i,
				redCompletedPasses: this.red.completedPasses - this.summaryBase.redPasses,
				blueCompletedPasses: this.blue.completedPasses - this.summaryBase.bluePasses
			} });
		}
		this.beginSummary(e.tick);
	}
	beginSummary(e) {
		this.summarySince = e, this.summaryBase = {
			red: this.red.controlledMs,
			blue: this.blue.controlledMs,
			observed: this.observedMs,
			redPasses: this.red.completedPasses,
			bluePasses: this.blue.completedPasses
		};
	}
	confirm(e) {
		if (!this.policy.enabled || !e || !ht(e.context) || e.streamId !== this.streamId || e.epoch !== this.epoch || !Number.isSafeInteger(e.sequence) || e.sequence <= this.confirmedSequence || !Number.isSafeInteger(e.tick) || e.tick < this.tick || e.kind === "goal" && e.tick !== this.tick) return [];
		this.confirmedSequence = e.sequence;
		let t = [];
		if (e.kind === "goal") {
			let n = this.lastPass, r = e.goal?.scorer;
			if (e.tick === this.tick && this.completeAtTick && e.context.phase !== "lobby" && e.goal && !e.goal.ownGoal && r && n && bt(n.to, r) && r.team === e.goal.team && n.from.team === e.goal.team && this.ms(e.tick - n.tick) <= this.policy.assistWindowMs && (this.team(r.team).confirmedAssists++, this.emit(t, e, "assist-confirmed", r.team, [
				"authoritative-goal",
				"confirmed-last-completed-pass-to-scorer",
				"no-intervening-other-player-contact",
				"assist-window"
			], {
				player: n.from,
				otherPlayer: r,
				confidence: "authoritative",
				metrics: { sincePassMs: this.ms(e.tick - n.tick) }
			})), e.context.phase !== "lobby" && e.goal && !e.goal.ownGoal && r && Et(r)) {
				let n = yt(r), i = Math.min(999, (this.goalTally.get(n) ?? 0) + 1);
				this.goalTally.set(n, i), this.emit(t, e, "scorer-tally", r.team, ["authoritative-goal", "confirmed-non-own-goal-scorer"], {
					player: r,
					confidence: "authoritative",
					metrics: { count: i }
				});
			}
			this.clearContinuity();
		} else if (e.kind === "kickoff") {
			let { streamId: t, epoch: n, tick: r } = e;
			this.reset(), this.streamId = t, this.epoch = n, this.tick = r, this.confirmedSequence = e.sequence;
		} else (e.kind === "pause" || e.kind === "stop" || e.kind === "end" || e.kind === "restart") && this.clearContinuity();
		return this.finish(t);
	}
	snapshot() {
		return Object.freeze({
			streamId: this.streamId,
			epoch: this.epoch < 0 ? null : this.epoch,
			tick: this.tick < 0 ? null : this.tick,
			status: this.status,
			unknownReasons: Object.freeze([...new Set(this.unknown)].slice(0, 8)),
			controller: this.controller ? xt(this.controller) : null,
			passChain: Object.freeze({
				team: this.chain.team,
				completed: this.chain.completed
			}),
			attack: this.attack ? Object.freeze({
				id: this.attack.id,
				team: this.attack.team,
				goalId: this.attack.goalId
			}) : null,
			observedMs: this.observedMs,
			uncontrolledMs: this.uncontrolledMs,
			teams: Object.freeze({
				red: Object.freeze({ ...this.red }),
				blue: Object.freeze({ ...this.blue })
			}),
			emittedEvents: this.emitted,
			droppedEvents: this.dropped
		});
	}
};
function mr(e, t) {
	for (let n = 0; n < t.length; n += 8) {
		let r = t.slice(n, n + 8);
		e.broadcast({
			type: "match-intelligence",
			version: 1,
			streamId: r[0].streamId,
			sentAtMs: performance.now(),
			events: r
		});
	}
}
var hr = (e, t) => e.sessionId === t.sessionId && e.playerId === t.playerId && e.team === t.team;
function gr(e, t) {
	for (let n = 0; n < e.length; n++) if (hr(e[n].identity, t)) return !0;
	return !1;
}
var _r = class {
	onFrame;
	shadowFactory;
	intelligence;
	roles = [];
	sampled;
	slots = Array(32);
	slotIdentity;
	resolveSlot = (e) => {
		let t = this.slots[e];
		return t === void 0 || !this.slotIdentity ? null : this.slotIdentity(t);
	};
	discontinuous = !1;
	shadow = null;
	shadowGeneration = 0;
	constructor(e = {}, t, n = () => ft.create()) {
		this.onFrame = t, this.shadowFactory = n, this.intelligence = new pr(e, U);
	}
	resetForStadium(e) {
		let t = ++this.shadowGeneration;
		if (this.shadow = null, !e.source) return;
		let n = e.source;
		this.shadowFactory().then((e) => {
			t === this.shadowGeneration && (e.load(n), this.shadow = e);
		}).catch(() => {});
	}
	closeTrajectory() {
		++this.shadowGeneration, this.shadow = null;
	}
	get trajectoryReady() {
		return this.shadow !== null;
	}
	configure(e) {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid match intelligence policy");
		let t = this.intelligence.getPolicy(), n = ir(e, t);
		Object.keys(t).every((e) => n[e] === t[e]) || this.intelligence.configure(n);
	}
	getPolicy() {
		return structuredClone(this.intelligence.getPolicy());
	}
	getSnapshot() {
		return structuredClone(this.intelligence.snapshot());
	}
	reset() {
		this.intelligence.reset(), this.sampled = void 0, this.discontinuous = !1;
	}
	invalidate() {
		this.breakContinuity("scripted-motion-or-geometry");
	}
	breakContinuity(e) {
		this.intelligence.invalidate(e), this.discontinuous = !0;
	}
	setRoles(e, t) {
		if (!Array.isArray(e) || e.length > 32) throw Error("At most 32 match intelligence role assignments");
		let n = /* @__PURE__ */ new Set(), r = e.map((e) => {
			if (!e || !Number.isSafeInteger(e.playerId) || e.playerId < 0 || n.has(e.playerId) || !["goalkeeper", "outfield"].includes(e.role)) throw Error("Invalid match intelligence role assignment");
			let r = t(e.playerId);
			if (!r || r.playerId !== e.playerId || r.team !== 1 && r.team !== 2) throw Error("Match intelligence role requires a current field player");
			return n.add(e.playerId), {
				player: { ...r },
				role: e.role
			};
		}), i = r.length !== this.roles.length || r.some((e) => !this.roles.some((t) => hr(t.player, e.player) && t.role === e.role));
		this.roles = r, i && this.sampled && this.breakContinuity("role-change");
	}
	getRoles() {
		return structuredClone(this.roles);
	}
	removePlayer(e, t = !0) {
		this.roles = this.roles.filter((t) => t.player.playerId !== e), t && this.sampled && this.breakContinuity("roster-change");
	}
	confirm(e) {
		return e.flatMap((e) => this.intelligence.confirm(e));
	}
	observePlayers(e, t, n, r, i, a) {
		if (!this.intelligence.getPolicy().enabled) return [];
		let o = this.slots;
		for (let e of r) Number.isInteger(e.slot) && e.slot >= 0 && e.slot < 32 && (o[e.slot] ??= e);
		this.slotIdentity = i;
		try {
			return this.observe(e, t, n, this.resolveSlot, a);
		} finally {
			o.fill(void 0), this.slotIdentity = void 0;
		}
	}
	roleOf(e) {
		let t = this.roles;
		for (let n = 0; n < t.length; n++) if (hr(t[n].player, e)) return t[n].role;
	}
	observe(e, t, n, r, i) {
		if (!this.intelligence.getPolicy().enabled) return [];
		let a = e.data, o = [], s = this.sampled?.streamId === n && this.sampled.epoch === t && this.sampled.tick === e.tick, c = !s && e.ballContacts.length ? /* @__PURE__ */ new Map() : void 0;
		for (let t = 0; t < 32; t++) {
			let n = r(t);
			if (!n) continue;
			let i = e.index(t), s = i * 18, l = this.roleOf(n);
			c?.set(i, n);
			let u = a[s], f = a[s + d.Y], p = a[s + d.SPEED_X] * U, m = a[s + d.SPEED_Y] * U, h = a[s + d.RADIUS];
			o.push(l ? {
				identity: { ...n },
				x: u,
				y: f,
				vx: p,
				vy: m,
				radius: h,
				role: l
			} : {
				identity: { ...n },
				x: u,
				y: f,
				vx: p,
				vy: m,
				radius: h
			});
		}
		this.roles.length && this.roles.some((e) => !gr(o, e.player)) && (this.roles = this.roles.filter((e) => gr(o, e.player)));
		let l = !this.sampled || s || this.sampled.streamId === n && this.sampled.epoch === t && e.tick === this.sampled.tick + 1;
		this.sampled ? (this.sampled.streamId = n, this.sampled.epoch = t, this.sampled.tick = e.tick) : this.sampled = {
			streamId: n,
			epoch: t,
			tick: e.tick
		};
		let u = [];
		if (!s) for (let [r, o] of e.ballContacts.entries()) {
			let s = c?.get(o.disc), l = {
				id: `${n}:${t}:${e.tick}:contact:${r}`,
				tick: e.tick
			};
			if (o.kind === "kick") s ? u.push({
				...l,
				kind: "kick",
				player: { ...s }
			}) : u.push({
				...l,
				kind: "wall"
			});
			else if (s) u.push({
				...l,
				kind: "player",
				player: { ...s }
			});
			else {
				let e = o.disc * 18, t = o.kind === "disc" && o.disc > 0 && a[e + d.INVERSE_MASS] === 0 ? i.find((t) => [t.p0, t.p1].some((t) => Math.hypot(a[e] - t[0], a[e + d.Y] - t[1]) <= a[e + d.RADIUS])) : void 0;
				u.push(t ? {
					...l,
					kind: "post",
					goalId: t.id
				} : {
					...l,
					kind: "wall"
				});
			}
		}
		let f = !this.discontinuous && l && (s || e.ballContactsComplete);
		s || (this.discontinuous = !1);
		let p = {
			streamId: n,
			epoch: t,
			tick: e.tick,
			context: {
				phase: e.phase,
				paused: e.paused || e.resumeTicks > 0,
				elapsed: e.elapsed / U,
				timeLimit: e.timeLimit,
				scoreLimit: e.scoreLimit,
				score: {
					red: e.red,
					blue: e.blue
				}
			},
			ball: {
				x: a[0],
				y: a[1],
				vx: a[2] * U,
				vy: a[3] * U,
				radius: a[d.RADIUS]
			},
			goals: i,
			players: o,
			contacts: u,
			contactsComplete: f
		}, m = f && u.some((e) => e.kind === "kick" && e.player), h = this.shadow && m ? this.withTrajectories(e, this.shadow, p, u) : u, g = h === u ? p : {
			...p,
			contacts: h
		}, _ = this.intelligence.observe(g);
		return this.onFrame?.(g, _), _;
	}
	withTrajectories(e, t, n, r) {
		return r.map((r, i) => {
			if (r.kind !== "kick" || !r.player) return r;
			try {
				let a = Mt(n, r.player.team);
				if (!a) return r;
				let o = Qn(e, t, {
					id: r.id,
					tick: r.tick,
					order: 0,
					contactIndex: i,
					player: r.player,
					ball: {
						x: n.ball.x,
						y: n.ball.y,
						radius: n.ball.radius,
						beforeVx: 0,
						beforeVy: 0,
						afterVx: n.ball.vx,
						afterVy: n.ball.vy
					},
					players: []
				}, n, a.goal);
				return o ? {
					...r,
					trajectory: o,
					goalId: a.goal.id
				} : r;
			} catch {
				return r;
			}
		});
	}
}, W = Uint8Array, vr = Uint16Array, yr = Int32Array, br = new W([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), xr = new W([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), Sr = new W([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), Cr = function(e, t) {
	for (var n = new vr(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new yr(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, wr = Cr(br, 2), Tr = wr.b, Er = wr.r;
Tr[28] = 258, Er[258] = 28;
for (var Dr = Cr(xr, 0), Or = Dr.b, kr = Dr.r, Ar = new vr(32768), G = 0; G < 32768; ++G) {
	var jr = (G & 43690) >> 1 | (G & 21845) << 1;
	jr = (jr & 52428) >> 2 | (jr & 13107) << 2, jr = (jr & 61680) >> 4 | (jr & 3855) << 4, Ar[G] = ((jr & 65280) >> 8 | (jr & 255) << 8) >> 1;
}
for (var Mr = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new vr(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new vr(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new vr(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[Ar[d] >> c] = l;
	} else for (s = new vr(r), i = 0; i < r; ++i) e[i] && (s[i] = Ar[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), Nr = new W(288), G = 0; G < 144; ++G) Nr[G] = 8;
for (var G = 144; G < 256; ++G) Nr[G] = 9;
for (var G = 256; G < 280; ++G) Nr[G] = 7;
for (var G = 280; G < 288; ++G) Nr[G] = 8;
for (var Pr = new W(32), G = 0; G < 32; ++G) Pr[G] = 5;
var Fr = /*#__PURE__*/ Mr(Nr, 9, 0), Ir = /*#__PURE__*/ Mr(Nr, 9, 1), Lr = /*#__PURE__*/ Mr(Pr, 5, 0), Rr = /*#__PURE__*/ Mr(Pr, 5, 1), zr = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, Br = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, Vr = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, Hr = function(e) {
	return (e + 7) / 8 | 0;
}, Ur = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new W(e.subarray(t, n));
}, Wr = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], Gr = function(e, t, n) {
	var r = Error(t || Wr[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, Gr), !n) throw r;
	return r;
}, Kr = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new W(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new W(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new W(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = Br(e, d, 1);
			var v = Br(e, d + 1, 3);
			if (d += 3, !v) {
				var y = Hr(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && Gr(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = Ir, m = Rr, h = 9, g = 5;
			else if (v == 2) {
				var ee = Br(e, d, 31) + 257, S = Br(e, d + 10, 15) + 4, C = ee + Br(e, d + 5, 31) + 1;
				d += 14;
				for (var w = new W(C), T = new W(19), E = 0; E < S; ++E) T[Sr[E]] = Br(e, d + E * 3, 7);
				d += S * 3;
				for (var D = zr(T), te = (1 << D) - 1, O = Mr(T, D, 1), E = 0; E < C;) {
					var ne = O[Br(e, d, te)];
					d += ne & 15;
					var y = ne >> 4;
					if (y < 16) w[E++] = y;
					else {
						var k = 0, A = 0;
						for (y == 16 ? (A = 3 + Br(e, d, 3), d += 2, k = w[E - 1]) : y == 17 ? (A = 3 + Br(e, d, 7), d += 3) : y == 18 && (A = 11 + Br(e, d, 127), d += 7); A--;) w[E++] = k;
					}
				}
				var re = w.subarray(0, ee), j = w.subarray(ee);
				h = zr(re), g = zr(j), p = Mr(re, h, 1), m = Mr(j, g, 1);
			} else Gr(1);
			if (d > _) {
				c && Gr(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var ie = (1 << h) - 1, ae = (1 << g) - 1, oe = d;; oe = d) {
			var k = p[Vr(e, d) & ie], M = k >> 4;
			if (d += k & 15, d > _) {
				c && Gr(0);
				break;
			}
			if (k || Gr(2), M < 256) n[f++] = M;
			else if (M == 256) {
				oe = d, p = null;
				break;
			} else {
				var se = M - 254;
				if (M > 264) {
					var E = M - 257, N = br[E];
					se = Br(e, d, (1 << N) - 1) + Tr[E], d += N;
				}
				var P = m[Vr(e, d) & ae], ce = P >> 4;
				P || Gr(3), d += P & 15;
				var j = Or[ce];
				if (ce > 3) {
					var N = xr[ce];
					j += Vr(e, d) & (1 << N) - 1, d += N;
				}
				if (d > _) {
					c && Gr(0);
					break;
				}
				s && l(f + 131072);
				var le = f + se;
				if (f < j) {
					var F = a - j, I = Math.min(j, le);
					for (F + f < 0 && Gr(3); f < I; ++f) n[f] = r[F + f];
				}
				for (; f < le; ++f) n[f] = n[f - j];
			}
		}
		t.l = p, t.p = oe, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? Ur(n, 0, f) : n.subarray(0, f);
}, qr = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, Jr = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, Yr = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: ni,
		l: 0
	};
	if (i == 1) {
		var o = new W(n[0].s + 1);
		return o[n[0].s] = 1, {
			t: o,
			l: 1
		};
	}
	n.sort(function(e, t) {
		return e.f - t.f;
	}), n.push({
		s: -1,
		f: 25001
	});
	var s = n[0], c = n[1], l = 0, u = 1, d = 2;
	for (n[0] = {
		s: -1,
		f: s.f + c.f,
		l: s,
		r: c
	}; u != i - 1;) s = n[n[l].f < n[d].f ? l++ : d++], c = n[l != u && n[l].f < n[d].f ? l++ : d++], n[u++] = {
		s: -1,
		f: s.f + c.f,
		l: s,
		r: c
	};
	for (var f = a[0].s, r = 1; r < i; ++r) a[r].s > f && (f = a[r].s);
	var p = new vr(f + 1), m = Xr(n[u - 1], p, 0);
	if (m > t) {
		var r = 0, h = 0, g = m - t, _ = 1 << g;
		for (a.sort(function(e, t) {
			return p[t.s] - p[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var v = a[r].s;
			if (p[v] > t) h += _ - (1 << m - p[v]), p[v] = t;
			else break;
		}
		for (h >>= g; h > 0;) {
			var y = a[r].s;
			p[y] < t ? h -= 1 << t - p[y]++ - 1 : ++r;
		}
		for (; r >= 0 && h; --r) {
			var b = a[r].s;
			p[b] == t && (--p[b], ++h);
		}
		m = t;
	}
	return {
		t: new W(p),
		l: m
	};
}, Xr = function(e, t, n) {
	return e.s == -1 ? Math.max(Xr(e.l, t, n + 1), Xr(e.r, t, n + 1)) : t[e.s] = n;
}, Zr = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new vr(++t), r = 0, i = e[0], a = 1, o = function(e) {
		n[r++] = e;
	}, s = 1; s <= t; ++s) if (e[s] == i && s != t) ++a;
	else {
		if (!i && a > 2) {
			for (; a > 138; a -= 138) o(32754);
			a > 2 && (o(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
		} else if (a > 3) {
			for (o(i), --a; a > 6; a -= 6) o(8304);
			a > 2 && (o(a - 3 << 5 | 8208), a = 0);
		}
		for (; a--;) o(i);
		a = 1, i = e[s];
	}
	return {
		c: n.subarray(0, r),
		n: t
	};
}, Qr = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, $r = function(e, t, n) {
	var r = n.length, i = Hr(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, ei = function(e, t, n, r, i, a, o, s, c, l, u) {
	qr(t, u++, n), ++i[256];
	for (var d = Yr(i, 15), f = d.t, p = d.l, m = Yr(a, 15), h = m.t, g = m.l, _ = Zr(f), v = _.c, y = _.n, b = Zr(h), x = b.c, ee = b.n, S = new vr(19), C = 0; C < v.length; ++C) ++S[v[C] & 31];
	for (var C = 0; C < x.length; ++C) ++S[x[C] & 31];
	for (var w = Yr(S, 7), T = w.t, E = w.l, D = 19; D > 4 && !T[Sr[D - 1]]; --D);
	var te = l + 5 << 3, O = Qr(i, Nr) + Qr(a, Pr) + o, ne = Qr(i, f) + Qr(a, h) + o + 14 + 3 * D + Qr(S, T) + 2 * S[16] + 3 * S[17] + 7 * S[18];
	if (c >= 0 && te <= O && te <= ne) return $r(t, u, e.subarray(c, c + l));
	var k, A, re, j;
	if (qr(t, u, 1 + (ne < O)), u += 2, ne < O) {
		k = Mr(f, p, 0), A = f, re = Mr(h, g, 0), j = h;
		var ie = Mr(T, E, 0);
		qr(t, u, y - 257), qr(t, u + 5, ee - 1), qr(t, u + 10, D - 4), u += 14;
		for (var C = 0; C < D; ++C) qr(t, u + 3 * C, T[Sr[C]]);
		u += 3 * D;
		for (var ae = [v, x], oe = 0; oe < 2; ++oe) for (var M = ae[oe], C = 0; C < M.length; ++C) {
			var se = M[C] & 31;
			qr(t, u, ie[se]), u += T[se], se > 15 && (qr(t, u, M[C] >> 5 & 127), u += M[C] >> 12);
		}
	} else k = Fr, A = Nr, re = Lr, j = Pr;
	for (var C = 0; C < s; ++C) {
		var N = r[C];
		if (N > 255) {
			var se = N >> 18 & 31;
			Jr(t, u, k[se + 257]), u += A[se + 257], se > 7 && (qr(t, u, N >> 23 & 31), u += br[se]);
			var P = N & 31;
			Jr(t, u, re[P]), u += j[P], P > 3 && (Jr(t, u, N >> 5 & 8191), u += xr[P]);
		} else Jr(t, u, k[N]), u += A[N];
	}
	return Jr(t, u, k[256]), u + A[256];
}, ti = /*#__PURE__*/ new yr([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), ni = /*#__PURE__*/ new W(0), ri = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new W(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = ti[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new vr(32768), g = a.h || new vr(m + 1), _ = Math.ceil(n / 3), v = 2 * _, y = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
		}, b = new yr(25e3), x = new vr(288), ee = new vr(32), S = 0, C = 0, w = a.i || 0, T = 0, E = a.w || 0, D = 0; w + 2 < o; ++w) {
			var te = y(w), O = w & 32767, ne = g[te];
			if (h[O] = ne, g[te] = O, E <= w) {
				var k = o - w;
				if ((S > 7e3 || T > 24576) && (k > 423 || !l)) {
					u = ei(e, c, 0, b, x, ee, C, T, D, w - D, u), T = S = C = 0, D = w;
					for (var A = 0; A < 286; ++A) x[A] = 0;
					for (var A = 0; A < 30; ++A) ee[A] = 0;
				}
				var re = 2, j = 0, ie = p, ae = O - ne & 32767;
				if (k > 2 && te == y(w - ae)) for (var oe = Math.min(f, k) - 1, M = Math.min(32767, w), se = Math.min(258, k); ae <= M && --ie && O != ne;) {
					if (e[w + re] == e[w + re - ae]) {
						for (var N = 0; N < se && e[w + N] == e[w + N - ae]; ++N);
						if (N > re) {
							if (re = N, j = ae, N > oe) break;
							for (var P = Math.min(ae, N - 2), ce = 0, A = 0; A < P; ++A) {
								var le = w - ae + A & 32767, F = le - h[le] & 32767;
								F > ce && (ce = F, ne = le);
							}
						}
					}
					O = ne, ne = h[O], ae += O - ne & 32767;
				}
				if (j) {
					b[T++] = 268435456 | Er[re] << 18 | kr[j];
					var I = Er[re] & 31, ue = kr[j] & 31;
					C += br[I] + xr[ue], ++x[257 + I], ++ee[ue], E = w + re, ++S;
				} else b[T++] = e[w], ++x[e[w]];
			}
		}
		for (w = Math.max(w, E); w < o; ++w) b[T++] = e[w], ++x[e[w]];
		u = ei(e, c, l, b, x, ee, C, T, D, w - D, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = w, a.w = E);
	} else {
		for (var w = a.w || 0; w < o + l; w += 65535) {
			var de = w + 65535;
			de >= o && (c[u / 8 | 0] = l, de = o), u = $r(c, u + 1, e.subarray(w, de));
		}
		a.i = o;
	}
	return Ur(s, 0, r + Hr(u) + i);
}, ii = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new W(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return ri(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
function ai(e, t) {
	return ii(e, t || {}, 0, 0);
}
var oi = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new W(32768), this.p = new W(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || Gr(5), this.d && Gr(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new W(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = Kr(this.p, this.s, this.o);
		this.ondata(Ur(n, t, this.s.b), this.d), this.o = Ur(n, this.s.b - 32768), this.s.b = this.o.length, this.p = Ur(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}(), si = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	si.decode(ni, { stream: !0 });
} catch {}
var K = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.code = e, this.name = "ReplayError";
	}
}, ci = 33554432;
function li(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function ui(e) {
	if (e.length > 33554432) throw new K("tooLarge", "Replay exceeds 32 MB");
	let t = ai(e, { level: 6 }), n = new Uint8Array(16 + t.length), r = new DataView(n.buffer);
	return n.set([
		66,
		50,
		68,
		90,
		1,
		0,
		0,
		0
	]), r.setUint32(8, e.length, !0), r.setUint32(12, li(e), !0), n.set(t, 16), n;
}
function di(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t.length > 33554432) throw new K("tooLarge", "Replay exceeds 32 MB");
	if (t.length < 17 || t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 90 || t[4] !== 1 || t[5] || t[6] || t[7]) throw new K("invalid", "Invalid compressed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0);
	if (!r || r > 33554432) throw new K("invalid", "Invalid expanded replay size");
	let i = new Uint8Array(r), a = 0, o = !1, s = new oi((e, t) => {
		if (a + e.length > r) throw new K("invalid", "Expanded replay exceeds declared size");
		i.set(e, a), a += e.length, o = t;
	});
	for (let e = 16; e < t.length; e += 1024) s.push(t.subarray(e, e + 1024), e + 1024 >= t.length);
	if (!o || a !== r || li(i) !== n.getUint32(12, !0)) throw new K("integrity", "Compressed replay integrity failure");
	return i;
}
var fi = "/api/v1", pi = {
	rooms: `${fi}/rooms`,
	sdkRooms: `${fi}/sdk/rooms`,
	account: `${fi}/account`,
	accountConfig: `${fi}/account/config`,
	profile: `${fi}/account/profile`,
	profileVisibility: `${fi}/account/profile/visibility`,
	publicProfile: (e, t) => `${fi}/community/${e}/${encodeURIComponent(t)}`,
	notifications: `${fi}/account/notifications`,
	keys: `${fi}/account/keys`,
	nameCheck: `${fi}/names/check`,
	competitionBoard: `${fi}/competition/board`,
	signal: (e) => `${fi}/rooms/${encodeURIComponent(e)}/signal`,
	liveness: (e) => `${fi}/rooms/${encodeURIComponent(e)}/liveness`,
	lease: (e) => `${fi}/sdk/rooms/${encodeURIComponent(e)}/lease`
};
function mi(e) {
	let t = new URL(e);
	if (!["http:", "https:"].includes(t.protocol) || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected an HTTP(S) service origin without credentials or a path");
	return t.origin;
}
function hi(e) {
	let t = new URL(e.assets);
	if (![
		"http:",
		"https:",
		"ball2d:"
	].includes(t.protocol) || !t.host || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected a root asset origin");
	let n = mi(e.service), r = mi(e.public);
	function i(e, t) {
		if (!e.startsWith("/") || e.startsWith("//") || e.includes("\\") || [...e].some((e) => e.charCodeAt(0) <= 32 || e.charCodeAt(0) === 127)) throw Error("Expected an absolute application path");
		let n = decodeURIComponent(e.split(/[?#]/, 1)[0]);
		if (n.includes("\\") || n.includes("//") || n.split("/").some((e) => e === "." || e === "..")) throw Error("Ambiguous application path");
		let r = new URL(e, t), i = new URL(t);
		if (r.protocol !== i.protocol || r.host !== i.host || r.username || r.password) throw Error("Application path escaped its runtime origin");
		return r;
	}
	return {
		serviceOrigin: n,
		publicOrigin: r,
		asset: (e) => i(e, t.href),
		public: (e) => i(e, r),
		api: (e) => {
			let t = i(e, n);
			if (!t.pathname.startsWith(`${fi}/`) || t.hash) throw Error("Expected a versioned application API path");
			return t;
		}
	};
}
function gi() {
	let e = location.origin;
	return hi({
		assets: e,
		service: e,
		public: e
	});
}
function _i(e, t) {
	let n = {
		get label() {
			return e.label;
		},
		get readyState() {
			return e.readyState;
		},
		get ordered() {
			return e.ordered;
		},
		get maxRetransmits() {
			return e.maxRetransmits ?? null;
		},
		get maxPacketLifeTime() {
			return e.maxPacketLifeTime ?? null;
		},
		get bufferedAmount() {
			return e.bufferedAmount;
		},
		onopen: null,
		onclose: null,
		onmessage: null,
		send(n) {
			e.send(t.encode(n));
		},
		close() {
			e.close();
		}
	};
	return t.prepare?.(e), e.onopen = () => n.onopen?.(), e.onclose = () => n.onclose?.(), e.onmessage = ({ data: e }) => n.onmessage?.({ data: t.decode(e) }), n;
}
function vi(e, t, n) {
	let r = {
		get connectionState() {
			return e.connectionState;
		},
		get iceConnectionState() {
			return e.iceConnectionState;
		},
		get signalingState() {
			return e.signalingState;
		},
		get localDescription() {
			return e.localDescription ?? null;
		},
		get remoteDescription() {
			return e.remoteDescription ?? null;
		},
		onicecandidate: null,
		ondatachannel: null,
		onconnectionstatechange: null,
		oniceconnectionstatechange: null,
		createDataChannel: (n, r) => _i(e.createDataChannel(n, r), t),
		createOffer: (t) => e.createOffer(t),
		createAnswer: () => e.createAnswer(),
		setLocalDescription: (t) => e.setLocalDescription(t),
		setRemoteDescription: async (t) => {
			await e.setRemoteDescription(t);
		},
		addIceCandidate: async (t) => {
			await e.addIceCandidate(t);
		},
		getStats: () => e.getStats(),
		close: n
	};
	return e.onicecandidate = ({ candidate: e }) => r.onicecandidate?.({ candidate: e ?? null }), e.ondatachannel = ({ channel: e }) => r.ondatachannel?.({ channel: _i(e, t) }), e.onconnectionstatechange = () => r.onconnectionstatechange?.(), e.oniceconnectionstatechange = () => r.oniceconnectionstatechange?.(), r;
}
var yi = null, bi = null;
function xi(e) {
	if (Object.keys(e).length !== 2 || e.bundlePolicy !== "max-bundle") return !1;
	let t = e.iceServers;
	if (t?.length !== 1) return !1;
	let n = t[0];
	return Object.keys(n).length === 1 && n.urls === "stun:stun.l.google.com:19302";
}
function Si() {
	bi?.removeEventListener("pagehide", Ci), bi = null;
}
function Ci() {
	let e = yi;
	yi = null, Si(), e?.close();
}
var wi = {
	prepare(e) {
		e.binaryType = "arraybuffer";
	},
	encode: (e) => e,
	decode: (e) => e
};
function Ti(e) {
	let t;
	return yi && xi(e) ? (t = yi, yi = null, Si(), t.signalingState === "closed" && (t = new RTCPeerConnection(e))) : (yi && Ci(), t = new RTCPeerConnection(e)), vi(t, wi, () => t.close());
}
function Ei(e = gi()) {
	return {
		serviceOrigin: e.serviceOrigin,
		createWebSocket: (e, t) => new WebSocket(e, t),
		createPeerConnection: Ti
	};
}
var Di = [
	{
		id: "small",
		name: "Small",
		displayName: "Small",
		tier: "small",
		shape: "square",
		pitch: {
			width: 640,
			height: 320
		},
		arena: {
			width: 790,
			height: 450
		},
		goalWidth: 120,
		cornerRadius: 0,
		teamSize: {
			min: 1,
			max: 3
		}
	},
	{
		id: "small_rounded",
		name: "Small Rounded",
		displayName: "Small Rounded",
		tier: "small",
		shape: "rounded",
		pitch: {
			width: 640,
			height: 320
		},
		arena: {
			width: 790,
			height: 450
		},
		goalWidth: 120,
		cornerRadius: 22,
		teamSize: {
			min: 1,
			max: 3
		}
	},
	{
		id: "classic",
		name: "Classic",
		displayName: "Classic",
		tier: "classic",
		shape: "square",
		pitch: {
			width: 880,
			height: 440
		},
		arena: {
			width: 1030,
			height: 570
		},
		goalWidth: 140,
		cornerRadius: 0,
		teamSize: {
			min: 3,
			max: 5
		}
	},
	{
		id: "rounded",
		name: "Rounded",
		displayName: "Classic Rounded",
		tier: "classic",
		shape: "rounded",
		pitch: {
			width: 880,
			height: 440
		},
		arena: {
			width: 1030,
			height: 570
		},
		goalWidth: 140,
		cornerRadius: 36,
		teamSize: {
			min: 3,
			max: 5
		}
	},
	{
		id: "big",
		name: "Big",
		displayName: "Big",
		tier: "big",
		shape: "square",
		pitch: {
			width: 1080,
			height: 520
		},
		arena: {
			width: 1230,
			height: 650
		},
		goalWidth: 140,
		cornerRadius: 0,
		teamSize: {
			min: 5,
			max: 8
		}
	},
	{
		id: "big_rounded",
		name: "Big Rounded",
		displayName: "Big Rounded",
		tier: "big",
		shape: "rounded",
		pitch: {
			width: 1080,
			height: 520
		},
		arena: {
			width: 1230,
			height: 650
		},
		goalWidth: 140,
		cornerRadius: 48,
		teamSize: {
			min: 5,
			max: 8
		}
	},
	{
		id: "huge",
		name: "Huge",
		displayName: "Huge",
		tier: "huge",
		shape: "square",
		pitch: {
			width: 1280,
			height: 620
		},
		arena: {
			width: 1430,
			height: 750
		},
		goalWidth: 180,
		cornerRadius: 0,
		teamSize: {
			min: 8,
			max: 11
		}
	},
	{
		id: "huge_rounded",
		name: "Huge Rounded",
		displayName: "Huge Rounded",
		tier: "huge",
		shape: "rounded",
		pitch: {
			width: 1280,
			height: 620
		},
		arena: {
			width: 1430,
			height: 750
		},
		goalWidth: 180,
		cornerRadius: 60,
		teamSize: {
			min: 8,
			max: 11
		}
	}
];
Di.map(({ id: e, name: t }) => [e, t]);
function Oi(e) {
	let t = /* @__PURE__ */ new Map();
	return async (n) => {
		let r = Di.find((e) => e.id === n || e.name === n || e.displayName === n);
		if (!r) throw Error("Unknown default stadium");
		let i = t.get(r.id);
		return i || (i = (async () => {
			let t = await e(`/stadiums/${r.id}.ball2dstadium`);
			if (!t.ok) throw Error("Could not load stadium");
			let n = await t.text();
			return Me(n), n;
		})(), t.set(r.id, i), i.catch(() => t.delete(r.id))), i;
	};
}
async function ki(e) {
	let t = new Uint8Array(await crypto.subtle.digest("SHA-256", e));
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
function Ai(e = gi()) {
	let t = Ei(e), n = (e, t) => fetch(e, t);
	return {
		network: t,
		publicOrigin: e.publicOrigin,
		request: n,
		loadEngine: async (t) => {
			let r = async (t) => {
				let r = await n(e.asset(`/core.wasm?v=${l}`), t);
				if (!r.ok) throw Error("Could not load bundled physics engine");
				return r.arrayBuffer();
			}, i = await r({ signal: t });
			return await ki(i) !== "3c2130944983498b4199e0351ace3302ada1aeda53bea4a105906c36fc580e39" && (i = await r({
				signal: t,
				cache: "reload"
			})), ft.create(i, t);
		},
		loadStadium: Oi((t) => n(e.asset(t)))
	};
}
function ji(e, t) {
	let n = e.engine.stadium.discs.length;
	return t < n ? t : e.engine.index(e.players.fielded()[t - n].slot);
}
function Mi(e, t) {
	let n = e.engine.data, r = t * 18;
	return {
		x: n[r],
		y: n[r + d.Y],
		xspeed: n[r + d.SPEED_X],
		yspeed: n[r + d.SPEED_Y],
		radius: n[r + d.RADIUS],
		invMass: n[r + d.INVERSE_MASS],
		damping: n[r + d.DAMPING],
		bCoeff: n[r + d.BOUNCE],
		xgravity: n[r + d.GRAVITY_X],
		ygravity: n[r + d.GRAVITY_Y],
		cGroup: n[r + d.COLLISION_GROUP],
		cMask: n[r + d.COLLISION_MASK],
		color: e.engine.colors[t]
	};
}
function Ni(e, t, n) {
	let r = g(n), i = Mi(e, t);
	Object.entries(r).every(([e, t]) => i[e] === t) || (e.match.command("disc", t, 0, r), t === 0 && e.commentaryAnalysis.reset(), Object.keys(r).some((e) => e !== "color") && (e.intelligence.invalidate(), e.xg.invalidate("physics-edit")), e.broadcastState());
}
function Pi(e) {
	return e.closed || e.engine.phase === "lobby" ? 0 : e.engine.stadium.discs.length + e.players.fielded().length;
}
var Fi = (e, t) => Number.isInteger(t) && t >= 0 && t < Pi(e);
function Ii(e, t) {
	return Fi(e, t) ? Mi(e, ji(e, t)) : null;
}
function Li(e, t, n) {
	e.assertOpen(), Fi(e, t) && Ni(e, ji(e, t), n);
}
var Ri = (e, t) => {
	let n = e.players.byId(t);
	return n && n.team !== 0 ? n : void 0;
};
function zi(e, t) {
	if (e.closed || e.engine.phase === "lobby") return null;
	let n = Ri(e, t);
	return n ? Mi(e, e.engine.index(n.slot)) : null;
}
function Bi(e, t, n) {
	if (e.assertOpen(), e.engine.phase === "lobby") return;
	let r = Ri(e, t);
	r && Ni(e, e.engine.index(r.slot), n);
}
function Vi(e) {
	return e.closed || e.engine.phase === "lobby" ? null : {
		x: e.engine.data[0],
		y: e.engine.data[1]
	};
}
function Hi(e, t) {
	e.assertOpen();
	let n = e.engine.phase;
	if (n !== "lobby" && n !== "finished") return;
	let r = e.command("start"), i = n !== e.engine.phase && e.engine.phase === "playing";
	e.stadiumSelection++, r.length || e.broadcastState(), e.notifyCommentary(r), i && e.invoke("onGameStart", e.hooks.onGameStart, e.publicOrNull(t));
}
function Ui(e, t) {
	e.assertOpen();
	let n = e.engine.phase !== "lobby";
	if (!n && !e.engine.paused) return;
	let r = e.command("stop");
	r.length || e.broadcastState(), e.notifyCommentary(r), n && e.invoke("onGameStop", e.hooks.onGameStop, e.publicOrNull(t));
}
function Wi(e, t, n) {
	if (e.assertOpen(), e.engine.phase === "lobby" || (t = !!t, e.engine.paused === t)) return;
	let r = e.command("pause", 0, +t);
	r.length || e.broadcastState(), e.notifyCommentary(r), t ? e.invoke("onGamePause", e.hooks.onGamePause, n) : e.invoke("onGameUnpause", e.hooks.onGameUnpause, n), e.invoke("onGamePauseChange", e.hooks.onGamePauseChange, t);
}
function Gi(e, t, n, r, i) {
	e.assertOpen();
	let a = v(t, n, r);
	a !== e.engine.kickRate && (e.command("kickRate", 0, a), e.broadcastState(), e.invoke("onKickRateLimitSet", e.hooks.onKickRateLimitSet, ...y(a), i));
}
function Ki(e, t) {
	if (e.assertOpen(), e.stopped()) {
		if (!Number.isInteger(t) || t < 0 || t > 99) throw Error("Invalid limit");
		t !== e.engine.scoreLimit && (e.command("scoreLimit", 0, t), e.syncLobby());
	}
}
function qi(e, t) {
	if (e.assertOpen(), e.stopped()) {
		if (!Number.isInteger(t) || t < 0 || t > 99) throw Error("Invalid time limit");
		t * 60 !== e.engine.timeLimit && (e.command("timeLimit", 0, t * 60), e.syncLobby());
	}
}
function Ji(e) {
	let t = e.engine;
	return e.closed || t.phase === "lobby" ? null : {
		red: t.red,
		blue: t.blue,
		time: t.elapsed / U,
		scoreLimit: t.scoreLimit,
		timeLimit: t.timeLimit
	};
}
var Yi = [
	"normal",
	"bold",
	"italic",
	"small",
	"small-bold",
	"small-italic"
];
function Xi(e, t, n, r) {
	if (typeof e != "string" || e.length > 1e3) throw Error("Announcement exceeds 1000 characters");
	if (t != null && (!Number.isInteger(t) || t < 0 || t > 16777215)) throw Error("Invalid announcement color");
	if (n != null && !Yi.includes(n)) throw Error("Invalid announcement style");
	if (r != null && ![
		0,
		1,
		2
	].includes(r)) throw Error("Invalid announcement sound");
	return {
		type: "announcement",
		text: e,
		color: t ?? null,
		style: n ?? "normal",
		sound: r ?? 1
	};
}
function Zi(e) {
	return e == null || Number.isSafeInteger(e) && e >= 0;
}
function Qi(e, t, n) {
	if (n == null) {
		e.network.broadcast(t);
		return;
	}
	let r = e.players.byId(n), i = r && e.network.peers.get(r.peerId);
	i && e.network.control(i, t);
}
function $i(e, t, n) {
	if (e.assertOpen(), typeof t != "string" || t.length > 200) throw Error("Chat must contain at most 200 characters");
	if (!Zi(n)) throw Error("Invalid chat target");
	let r = e.players.byPeer(e.network.hostId);
	if (!r) throw Error("sendChat requires a host player; use sendAnnouncement");
	t.trim() && Qi(e, {
		type: "chat",
		name: r.name,
		text: t,
		...n == null ? { playerId: r.peerId } : {}
	}, n);
}
function ea(e, t, n, r, i, a) {
	e.assertOpen();
	let o = Xi(t, r, i, a);
	if (!Zi(n)) throw Error("Invalid announcement target");
	Qi(e, o, n);
}
var ta = 524288, na = 16384, ra = 12, ia = 45635, aa = 1, oa = 32, sa = 1e4, ca = {
	MAGIC: 0,
	VERSION: 2,
	RESERVED: 3,
	ID: 4,
	INDEX: 8,
	COUNT: 10
};
function la(e, t) {
	let n = JSON.stringify(e);
	if (n === void 0) throw Error("Missing control message");
	let r = new TextEncoder().encode(n);
	if (r.length > ta) throw Error("Control message exceeds 512 KB");
	if (r.length <= na) return {
		packets: [n],
		byteLength: r.length
	};
	let i = Math.ceil(r.length / na), a = [];
	for (let e = 0; e < i; e++) {
		let n = r.subarray(e * na, (e + 1) * na), o = new ArrayBuffer(ra + n.length), s = new DataView(o);
		s.setUint16(ca.MAGIC, ia), s.setUint8(ca.VERSION, aa), s.setUint32(ca.ID, t, !0), s.setUint16(ca.INDEX, e, !0), s.setUint16(ca.COUNT, i, !0), new Uint8Array(o, ra).set(n), a.push(o);
	}
	return {
		packets: a,
		byteLength: r.length + i * ra
	};
}
var ua = class {
	partial;
	push(e, t = performance.now()) {
		if (typeof e == "string") {
			if (this.partial || new TextEncoder().encode(e).length > na) throw Error("Invalid control message");
			return JSON.parse(e);
		}
		if (e.byteLength < 13 || e.byteLength > 16396) throw Error("Control fragment length");
		let n = new DataView(e);
		if (n.getUint16(ca.MAGIC) !== ia || n.getUint8(ca.VERSION) !== aa || n.getUint8(ca.RESERVED) !== 0) throw Error("Control fragment version");
		let r = n.getUint32(ca.ID, !0), i = n.getUint16(ca.INDEX, !0), a = n.getUint16(ca.COUNT, !0);
		if (a < 2 || a > oa || i >= a) throw Error("Control fragment bounds");
		if (!this.partial) {
			if (i !== 0) throw Error("Missing first fragment");
			this.partial = {
				id: r,
				count: a,
				next: 0,
				bytes: 0,
				parts: [],
				since: t
			};
		}
		let o = this.partial;
		if (o.id !== r || o.count !== a || o.next !== i || t - o.since > sa) throw Error("Control fragment sequence");
		if (o.next++, o.bytes += e.byteLength - ra, o.bytes > ta) throw Error("Control size limit");
		if (o.parts.push(new Uint8Array(e.slice(ra))), o.next !== a) return;
		let s = new Uint8Array(o.bytes), c = 0;
		for (let e of o.parts) s.set(e, c), c += e.length;
		return this.partial = void 0, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s));
	}
}, da = {
	INPUT: 1,
	STATE: 2,
	RELAY: 3,
	TICKED_INPUT: 4
}, fa = {
	KIND: 0,
	PROTOCOL: 1,
	TICK: 2,
	EPOCH: 6,
	SPAN: 8
}, pa = {
	AGE: 0,
	SLOT: 1,
	KEYS: 2
}, ma = 397, ha = {
	KIND: 0,
	PROTOCOL: 1,
	SEQUENCE: 2,
	EPOCH: 6,
	KEYS: 8
}, ga = {
	KIND: 0,
	PROTOCOL: 1,
	TICK: 2,
	EPOCH: 6,
	CHANGES: 8,
	SEQUENCE: 16
}, _a = {
	KIND: 0,
	PROTOCOL: 1,
	TICK: 2,
	INDEX: 6,
	COUNT: 7,
	EPOCH: 8,
	SIZE: 10
}, va = 1188, q = {
	TICK: 0,
	ELAPSED: 4,
	RED: 8,
	BLUE: 10,
	PHASE: 12,
	PAUSED: 13,
	KICKOFF: 14,
	KICKOFF_ACTIVE: 15,
	COUNTDOWN: 16,
	SCORE_LIMIT: 18,
	TIME_LIMIT: 20,
	DISC_COUNT: 22,
	ACKNOWLEDGED: 24,
	BODY_COUNT: 28,
	RESUME_TICKS: 30,
	KICK_RATE: 32,
	LAST_TOUCH: 36,
	GOAL_TOUCH: 38,
	CHECKSUM: 40,
	ARRIVAL: 44,
	RESERVED: 45
}, ya = -128, ba = [
	"lobby",
	"playing",
	"goal",
	"finished"
], xa = {
	INDEX: 0,
	TEAM: 2,
	PACKED_INPUT: 3,
	MOTION: 4,
	KICK_STATE: 20,
	KICK_BUDGET: 22
}, Sa = 31;
function Ca(e, t) {
	if (e.byteLength !== 12) throw Error("Input length");
	let n = new Uint8Array(e);
	if (n[ha.KIND] !== da.INPUT || n[ha.PROTOCOL] !== 6) throw Error("Input format");
	for (let e = 0; e < 4; e++) {
		let r = n[ha.KEYS + e];
		if (r > Sa) throw Error("Input format");
		t.history[e] = r;
	}
	return t.seq = (n[ha.SEQUENCE] | n[ha.SEQUENCE + 1] << 8 | n[ha.SEQUENCE + 2] << 16 | n[ha.SEQUENCE + 3] << 24) >>> 0, t.epoch = n[ha.EPOCH] | n[ha.EPOCH + 1] << 8, t.keys = t.history[0], t;
}
function wa(e, t) {
	return e !== t && e - t >>> 0 < 2147483648;
}
var Ta = 8192;
function Ea(e) {
	return Number.isNaN(e) ? 0 : Math.fround(e < -8192 ? -8192 : e > 8192 ? Ta : e);
}
var Da = 31;
function Oa(e, t, n, r) {
	n = Math.max(1, Math.min(32, n, e + 1));
	let i = r.length;
	for (; i > 0 && r[i - 1].tick > e;) i--;
	let a = i;
	for (; i > 0 && r[i - 1].tick > e - n;) i--;
	for (; a - i > ma;) {
		let t = r[i].tick;
		for (; i < a && r[i].tick === t;) i++;
		n = e - t;
	}
	let o = a - i, s = /* @__PURE__ */ new ArrayBuffer(9 + o * 3), c = new DataView(s);
	c.setUint8(fa.KIND, da.RELAY), c.setUint8(fa.PROTOCOL, 6), c.setUint32(fa.TICK, e, !0), c.setUint16(fa.EPOCH, t, !0), c.setUint8(fa.SPAN, n);
	for (let t = 0; t < o; t++) {
		let n = r[i + t], a = 9 + t * 3;
		c.setUint8(a + pa.AGE, e - n.tick), c.setUint8(a + pa.SLOT, n.slot), c.setUint8(a + pa.KEYS, n.keys & Da);
	}
	return s;
}
function ka(e) {
	let t = [];
	for (let n = 0; n < e.length / 18; n++) {
		let r = n * 18, i = e[r + d.INVERSE_MASS] > 0 || e[r + d.SPEED_X] !== 0 || e[r + d.SPEED_Y] !== 0 || e[r + d.GRAVITY_X] !== 0 || e[r + d.GRAVITY_Y] !== 0 || e[r + d.X] !== e[r + d.SPAWN_X] || e[r + d.Y] !== e[r + d.SPAWN_Y];
		(e[r + d.PLAYER_SLOT] > 0 ? e[r + d.TEAM] > 0 : i) && t.push(n);
	}
	return t;
}
function Aa(e, t, n, r, i, a) {
	e.setUint32(q.TICK, t.tick, !0), e.setUint32(q.ELAPSED, t.elapsed, !0), e.setUint16(q.RED, t.red, !0), e.setUint16(q.BLUE, t.blue, !0), e.setUint8(q.PHASE, ba.indexOf(t.phase)), e.setUint8(q.PAUSED, +t.paused), e.setUint8(q.KICKOFF, t.kickoff), e.setUint8(q.KICKOFF_ACTIVE, +t.kickoffActive), e.setUint16(q.COUNTDOWN, t.countdown, !0), e.setUint16(q.SCORE_LIMIT, t.scoreLimit, !0), e.setUint16(q.TIME_LIMIT, t.timeLimit, !0), e.setUint16(q.DISC_COUNT, t.discs.length / 18, !0), e.setUint32(q.ACKNOWLEDGED, n, !0), e.setUint16(q.BODY_COUNT, r, !0), e.setUint16(q.RESUME_TICKS, t.resumeTicks, !0), e.setUint32(q.KICK_RATE, t.kickRate, !0), e.setUint8(q.LAST_TOUCH, t.lastTouch?.slot ?? 255), e.setUint8(q.LAST_TOUCH + 1, t.lastTouch?.team ?? 0), e.setUint8(q.GOAL_TOUCH, t.goalTouch?.slot ?? 255), e.setUint8(q.GOAL_TOUCH + 1, t.goalTouch?.team ?? 0), e.setUint32(q.CHECKSUM, i >>> 0, !0), e.setInt8(q.ARRIVAL, a);
}
function ja(e) {
	return e === -128 ? ya : Math.max(-127, Math.min(127, Math.round(e)));
}
function Ma(e, t, n, r) {
	let i = r * 18, a = n[i + d.PLAYER_SLOT] > 0;
	e.setUint16(t + xa.INDEX, r, !0), e.setUint8(t + xa.TEAM, n[i + d.TEAM]), e.setUint8(t + xa.PACKED_INPUT, n[i + d.INPUT] | (a ? (n[i + d.COLLISION_MASK] & 24) << 2 : 0));
	for (let r = 0; r < 4; r++) e.setFloat32(t + xa.MOTION + r * 4, Ea(n[i + r]), !0);
	e.setUint16(t + xa.KICK_STATE, n[i + d.KICK_STATE], !0), a && e.setUint16(t + xa.KICK_BUDGET, n[i + d.KICK_BUDGET] + 255, !0);
}
function Na(e, t, n = 0, r = {
	checksum: 0,
	arrival: ya
}) {
	let i = ka(e.discs), a = /* @__PURE__ */ new ArrayBuffer(48 + i.length * 24), o = new DataView(a);
	Aa(o, e, t, i.length, r.checksum, ja(r.arrival));
	for (let [t, n] of i.entries()) Ma(o, 48 + t * 24, e.discs, n);
	let s = new Uint8Array(a), c = [], l = Math.ceil(s.length / va);
	for (let t = 0; t < l; t++) {
		let r = s.subarray(t * va, (t + 1) * va), i = new ArrayBuffer(12 + r.length), a = new DataView(i);
		a.setUint8(_a.KIND, da.STATE), a.setUint8(_a.PROTOCOL, 6), a.setUint32(_a.TICK, e.tick, !0), a.setUint8(_a.INDEX, t), a.setUint8(_a.COUNT, l), a.setUint16(_a.EPOCH, n, !0), a.setUint16(_a.SIZE, r.length, !0), new Uint8Array(i, 12).set(r), c.push(i);
	}
	return c;
}
function Pa(e, t, n = 0, r = 0, i = []) {
	if (!t.length) return [];
	let a = Na(e, t[0], n, {
		checksum: r,
		arrival: i[0] ?? -128
	}), o = [a];
	for (let e = 1; e < t.length; e++) {
		let n = a.map((e) => e.slice(0)), r = new DataView(n[0]);
		r.setUint32(12 + q.ACKNOWLEDGED, t[e], !0), r.setInt8(12 + q.ARRIVAL, ja(i[e] ?? -128)), o.push(n);
	}
	return o;
}
var Fa = 31;
function Ia(e, t) {
	if (e.byteLength !== 20) throw Error("Input length");
	let n = new Uint8Array(e);
	if (n[ga.KIND] !== da.TICKED_INPUT || n[ga.PROTOCOL] !== 6) throw Error("Input format");
	let r = (n[ga.TICK] | n[ga.TICK + 1] << 8 | n[ga.TICK + 2] << 16 | n[ga.TICK + 3] << 24) >>> 0, i = -1;
	for (let e = 0; e < 4; e++) {
		let a = n[ga.CHANGES + 2 * e], o = n[ga.CHANGES + 2 * e + 1];
		if (o > Fa || a < i || a === i && a !== 255) throw Error("Input format");
		i = a;
		let s = t.changes[e];
		s || (s = {
			tick: 0,
			keys: 0
		}, t.changes[e] = s), s.tick = r - a, s.keys = o;
	}
	return t.changes.length = 4, t.seq = (n[ga.SEQUENCE] | n[ga.SEQUENCE + 1] << 8 | n[ga.SEQUENCE + 2] << 16 | n[ga.SEQUENCE + 3] << 24) >>> 0, t.tick = r, t.epoch = n[ga.EPOCH] | n[ga.EPOCH + 1] << 8, t;
}
function La(e) {
	let t = [...e], n = new Set(t.filter((e) => e.type === "transport" && e.selectedCandidatePairId).map((e) => e.selectedCandidatePairId)), r = t.filter((e) => e.type === "candidate-pair" && e.state === "succeeded"), i = n.size ? r.filter((e) => n.has(e.id)) : r.filter((e) => e.nominated === !0);
	if (i.length !== 1) return null;
	let a = i[0].currentRoundTripTime;
	return typeof a == "number" && Number.isFinite(a) && a >= 0 ? a * 1e3 : null;
}
var Ra = (e) => e?.match(/(?:^|\r?\n)a=ice-ufrag:([^\s]+)/)?.[1], za = (e) => e.usernameFragment ?? e.candidate?.match(/(?:^| )ufrag ([^ ]+)/)?.[1];
function Ba(e) {
	let t = e.pc.localDescription;
	if (!t?.sdp) throw Error("Local peer description is unavailable");
	return t.sdp;
}
function Va(e, t, n) {
	if (n()) {
		if (e.candidates.length >= 128) throw Error("Too many pending ICE candidates");
		e.candidates.push(t);
	}
}
async function Ha(e, t) {
	let n = e.candidates.splice(0);
	for (let r of n) {
		if (!t.current()) return;
		if (!t.versioned || e.remoteIceUfrag && za(r) === e.remoteIceUfrag) try {
			await e.pc.addIceCandidate(r);
		} catch {}
	}
}
async function Ua(e, t, n) {
	let r = await e.pc.createOffer(n);
	return !t.current() || (e.localIceUfrag = Ra(r.sdp), await e.pc.setLocalDescription(r), !t.current()) ? !1 : (t.publish({
		type: "offer",
		sdp: Ba(e)
	}), !0);
}
async function Wa(e, t, n) {
	if (await e.pc.setRemoteDescription({
		type: "offer",
		sdp: t
	}), !n.current() || (await Ha(e, n), !n.current())) return;
	let r = await e.pc.createAnswer();
	n.current() && (e.localIceUfrag = Ra(r.sdp), await e.pc.setLocalDescription(r), n.current() && n.publish({
		type: "answer",
		sdp: Ba(e)
	}));
}
async function Ga(e, t, n) {
	return await e.pc.setRemoteDescription({
		type: "answer",
		sdp: t
	}), n.current() ? (await Ha(e, n), !0) : !1;
}
async function Ka(e, t, n) {
	if (!(n.versioned && (!za(t) || e.remoteIceUfrag && za(t) !== e.remoteIceUfrag))) {
		if (!e.pc.remoteDescription) Va(e, t, n.current);
		else try {
			await e.pc.addIceCandidate(t);
		} catch {
			Va(e, t, n.current);
		}
	}
}
var qa = class {
	admission;
	assembler;
	constructor(e) {
		this.admission = e;
	}
	clear() {
		this.assembler = void 0;
	}
	read(e) {
		if (typeof e != "string" && !(e instanceof ArrayBuffer)) throw Error("Invalid control type");
		let t = typeof e != "string" || new TextEncoder().encode(e).length > 4096, n = this.admission.fromGuest();
		if (n && t && !this.admission.canUploadStadium()) throw Error("Guest control size or permission");
		this.assembler ??= new ua();
		let r = this.assembler.push(e);
		if (r !== void 0 && n && t && (!r || typeof r != "object" || !("type" in r) || r.type !== "action" || !("action" in r) || r.action !== "customStadium")) throw Error("Invalid bulk action");
		return r;
	}
}, Ja = 1e4, Ya = 1200, Xa = (e) => e.connectionState === "connected" && ["connected", "completed"].includes(e.iceConnectionState), Za = (e) => ["failed", "disconnected"].includes(e.connectionState) || ["failed", "disconnected"].includes(e.iceConnectionState);
function Qa(e, t, n) {
	let r = {
		id: t,
		pc: e,
		connected: !1,
		created: performance.now(),
		candidates: [],
		lastRestart: 0,
		restarts: 0,
		restarting: !1
	};
	e.onicecandidate = (e) => {
		n.current(r) && e.candidate && n.signalingOpen() && n.sendSignal(r, {
			type: "candidate",
			candidate: e.candidate.toJSON()
		});
	}, e.ondatachannel = (e) => to(r, e.channel, n);
	let i = () => {
		n.current(r) && (e.connectionState === "closed" ? (n.hooks.status("A peer disconnected.", "info"), n.remove(t)) : Xa(e) ? n.noteHealthy(r) : Za(e) && (r.lostAt ??= performance.now(), n.hooks.status("Direct connection interrupted. Attempting recovery…", "info")));
	};
	return e.onconnectionstatechange = i, e.oniceconnectionstatechange = i, r;
}
function $a(e, t) {
	return t.maxPacketLifeTime === null ? t.label === "control" ? t.ordered === !0 && t.maxRetransmits === null && !e.control : t.ordered === !1 && t.maxRetransmits === 0 && !e.fast : !1;
}
function eo(e) {
	if (typeof e == "string") {
		let t = 0;
		for (let n = 0; n < e.length; n++) {
			let r = e.charCodeAt(n);
			r < 128 ? t++ : r < 2048 ? t += 2 : r >= 55296 && r <= 56319 && e.charCodeAt(n + 1) >= 56320 && e.charCodeAt(n + 1) <= 57343 ? (t += 4, n++) : t += 3;
		}
		return t;
	}
	return e instanceof ArrayBuffer ? e.byteLength : 0;
}
function to(e, t, n) {
	if (!n.current(e) || !["control", "realtime"].includes(t.label)) {
		t.close();
		return;
	}
	if (!$a(e, t)) {
		t.close(), n.remove(e.id);
		return;
	}
	t.label === "control" ? (e.control = t, e.controlReader = new qa({
		fromGuest: () => n.isHost(),
		canUploadStadium: () => n.hooks.allowStadiumUpload?.(e) ?? !1
	})) : e.fast = t, t.onclose = () => {
		n.current(e) && (n.hooks.status("A peer closed its game channel.", "info"), n.remove(e.id));
	}, t.onopen = () => {
		n.current(e) && (e.control?.readyState !== "open" || e.fast?.readyState !== "open" || e.connected || (e.connected = !0, n.isHost() && (e.admissionTimer = setTimeout(() => {
			n.current(e) && (n.hooks.status("A peer did not complete room admission.", "error"), n.remove(e.id));
		}, Ja)), n.hooks.open(e)));
	}, t.onmessage = (r) => {
		if (n.current(e)) {
			n.countReceived(eo(r.data));
			try {
				if (t.label === "control") {
					let t = e.controlReader?.read(r.data);
					t !== void 0 && n.hooks.control(e, t);
				} else if (r.data instanceof ArrayBuffer && r.data.byteLength <= Ya) n.hooks.fast(e, r.data);
				else throw Error("Invalid realtime packet");
			} catch {
				n.hooks.status("Invalid peer message rejected.", "error"), n.remove(e.id);
			}
		}
	};
}
var no = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/* @__NO_SIDE_EFFECTS__ */
function ro(e) {
	return e ? {
		lang: e?.lang ?? void 0,
		message: e?.message,
		abortEarly: e?.abortEarly ?? void 0,
		abortPipeEarly: e?.abortPipeEarly ?? void 0
	} : no;
}
/* @__NO_SIDE_EFFECTS__ */
function io(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function J(e, t, n, r, i) {
	let a = i && "input" in i ? i.input : n.value, o = i?.expected ?? e.expects ?? null, s = i?.received ?? /* @__PURE__ */ io(a), c = {
		kind: e.kind,
		type: e.type,
		input: a,
		expected: o,
		received: s,
		message: `Invalid ${t}: ${o ? `Expected ${o} but r` : "R"}eceived ${s}`,
		requirement: e.requirement,
		path: i?.path,
		issues: i?.issues,
		lang: r.lang,
		abortEarly: r.abortEarly,
		abortPipeEarly: r.abortPipeEarly
	}, l = e.kind === "schema", u = i?.message ?? e.message ?? (e.reference, c.lang, void 0) ?? (l ? (c.lang, void 0) : null) ?? r.message ?? (c.lang, void 0);
	u !== void 0 && (c.message = typeof u == "function" ? u(c) : u), l && (n.typed = !1), n.issues ? n.issues.push(c) : n.issues = [c];
}
/* @__NO_SIDE_EFFECTS__ */
function ao(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
/* @__NO_SIDE_EFFECTS__ */
function oo(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
function so(e) {
	return e["~standard"] = {
		version: 1,
		vendor: "valibot",
		validate: (t) => e["~run"]({ value: t }, /* @__PURE__ */ ro())
	}, e;
}
/* @__NO_SIDE_EFFECTS__ */
function co(e, t) {
	return {
		kind: "validation",
		type: "check",
		reference: co,
		async: !1,
		expects: null,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && J(this, "input", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function lo(e) {
	return {
		kind: "validation",
		type: "finite",
		reference: lo,
		async: !1,
		expects: null,
		requirement: Number.isFinite,
		message: e,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && J(this, "finite", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function uo(e) {
	return {
		kind: "validation",
		type: "integer",
		reference: uo,
		async: !1,
		expects: null,
		requirement: Number.isInteger,
		message: e,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && J(this, "integer", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function fo(e, t) {
	return {
		kind: "validation",
		type: "max_length",
		reference: fo,
		async: !1,
		expects: `<=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length > this.requirement && J(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function po(e, t) {
	return {
		kind: "validation",
		type: "max_value",
		reference: po,
		async: !1,
		expects: `<=${e instanceof Date ? e.toJSON() : /* @__PURE__ */ io(e)}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !(e.value <= this.requirement) && J(this, "value", e, t, { received: e.value instanceof Date ? e.value.toJSON() : /* @__PURE__ */ io(e.value) }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function mo(e, t) {
	return {
		kind: "validation",
		type: "min_length",
		reference: mo,
		async: !1,
		expects: `>=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length < this.requirement && J(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function ho(e, t) {
	return {
		kind: "validation",
		type: "min_value",
		reference: ho,
		async: !1,
		expects: `>=${e instanceof Date ? e.toJSON() : /* @__PURE__ */ io(e)}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !(e.value >= this.requirement) && J(this, "value", e, t, { received: e.value instanceof Date ? e.value.toJSON() : /* @__PURE__ */ io(e.value) }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function go(e) {
	return {
		kind: "transformation",
		type: "raw_transform",
		reference: go,
		async: !1,
		"~run"(t, n) {
			let r = e({
				dataset: t,
				config: n,
				addIssue: (e) => J(this, e?.label ?? "input", t, n, e),
				NEVER: null
			});
			return t.issues ? t.typed = !1 : t.value = r, t;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function _o(e, t) {
	return {
		kind: "validation",
		type: "regex",
		reference: _o,
		async: !1,
		expects: `${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement.test(e.value) && J(this, "format", e, t), e;
		}
	};
}
var vo = { abortEarly: !0 };
/* @__NO_SIDE_EFFECTS__ */
function yo(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function bo(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function xo(e, t) {
	return !e["~run"]({ value: t }, vo).issues;
}
/* @__NO_SIDE_EFFECTS__ */
function So(e, t) {
	return so({
		kind: "schema",
		type: "array",
		reference: So,
		expects: "Array",
		async: !1,
		item: e,
		message: t,
		"~run"(e, t) {
			let n = e.value;
			if (Array.isArray(n)) {
				e.typed = !0, e.value = [];
				for (let r = 0; r < n.length; r++) {
					let i = n[r], a = this.item["~run"]({ value: i }, t);
					if (a.issues) {
						let o = {
							type: "array",
							origin: "value",
							input: n,
							key: r,
							value: i
						};
						for (let t of a.issues) t.path ? t.path.unshift(o) : t.path = [o], e.issues?.push(t);
						if (e.issues ||= a.issues, t.abortEarly) {
							e.typed = !1;
							break;
						}
					}
					a.typed || (e.typed = !1), e.value.push(a.value);
				}
			} else J(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Co(e) {
	return so({
		kind: "schema",
		type: "boolean",
		reference: Co,
		expects: "boolean",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : J(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function wo(e, t) {
	return so({
		kind: "schema",
		type: "custom",
		reference: wo,
		expects: "unknown",
		async: !1,
		check: e,
		message: t,
		"~run"(e, t) {
			return this.check(e.value) ? e.typed = !0 : J(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Y(e, t) {
	return so({
		kind: "schema",
		type: "literal",
		reference: Y,
		expects: /* @__PURE__ */ io(e),
		async: !1,
		literal: e,
		message: t,
		"~run"(e, t) {
			return /* @__PURE__ */ ao(e.value, this.literal) ? e.typed = !0 : J(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function To(e, t) {
	return so({
		kind: "schema",
		type: "nullable",
		reference: To,
		expects: `(${e.expects} | null)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ bo(this, e, t)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Eo(e) {
	return so({
		kind: "schema",
		type: "number",
		reference: Eo,
		expects: "number",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : J(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function X(e, t) {
	return so({
		kind: "schema",
		type: "object",
		reference: X,
		expects: "Object",
		async: !1,
		entries: e,
		message: t,
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in this.entries) {
					let i = this.entries[r];
					if (r in n || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
						let a = r in n ? n[r] : /* @__PURE__ */ bo(i), o = i["~run"]({ value: a }, t);
						if (o.issues) {
							let i = {
								type: "object",
								origin: "value",
								input: n,
								key: r,
								value: a
							};
							for (let t of o.issues) t.path ? t.path.unshift(i) : t.path = [i], e.issues?.push(t);
							if (e.issues ||= o.issues, t.abortEarly) {
								e.typed = !1;
								break;
							}
						}
						o.typed || (e.typed = !1), e.value[r] = o.value;
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ yo(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (J(this, "key", e, t, {
						input: void 0,
						expected: `"${r}"`,
						path: [{
							type: "object",
							origin: "key",
							input: n,
							key: r,
							value: n[r]
						}]
					}), t.abortEarly)) break;
				}
			} else J(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Z(e, t) {
	return so({
		kind: "schema",
		type: "optional",
		reference: Z,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ bo(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Do(e, t) {
	return so({
		kind: "schema",
		type: "picklist",
		reference: Do,
		expects: /* @__PURE__ */ oo(e.map(io), "|"),
		async: !1,
		options: e,
		message: t,
		"~run"(e, t) {
			return this.options.includes(e.value) ? e.typed = !0 : J(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Oo(e, t) {
	return so({
		kind: "schema",
		type: "strict_object",
		reference: Oo,
		expects: "Object",
		async: !1,
		entries: e,
		message: t,
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				e.typed = !0, e.value = {};
				for (let r in this.entries) {
					let i = this.entries[r];
					if (r in n || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
						let a = r in n ? n[r] : /* @__PURE__ */ bo(i), o = i["~run"]({ value: a }, t);
						if (o.issues) {
							let i = {
								type: "object",
								origin: "value",
								input: n,
								key: r,
								value: a
							};
							for (let t of o.issues) t.path ? t.path.unshift(i) : t.path = [i], e.issues?.push(t);
							if (e.issues ||= o.issues, t.abortEarly) {
								e.typed = !1;
								break;
							}
						}
						o.typed || (e.typed = !1), e.value[r] = o.value;
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ yo(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (J(this, "key", e, t, {
						input: void 0,
						expected: `"${r}"`,
						path: [{
							type: "object",
							origin: "key",
							input: n,
							key: r,
							value: n[r]
						}]
					}), t.abortEarly)) break;
				}
				if (!e.issues || !t.abortEarly) {
					for (let r in n) if (!Object.prototype.hasOwnProperty.call(this.entries, r)) {
						J(this, "key", e, t, {
							input: r,
							expected: "never",
							path: [{
								type: "object",
								origin: "key",
								input: n,
								key: r,
								value: n[r]
							}]
						});
						break;
					}
				}
			} else J(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Q(e) {
	return so({
		kind: "schema",
		type: "string",
		reference: Q,
		expects: "string",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : J(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ko(e, t) {
	return so({
		kind: "schema",
		type: "tuple",
		reference: ko,
		expects: "Array",
		async: !1,
		items: e,
		message: t,
		"~run"(e, t) {
			let n = e.value;
			if (Array.isArray(n)) {
				e.typed = !0, e.value = [];
				for (let r = 0; r < this.items.length; r++) {
					let i = n[r], a = this.items[r]["~run"]({ value: i }, t);
					if (a.issues) {
						let o = {
							type: "array",
							origin: "value",
							input: n,
							key: r,
							value: i
						};
						for (let t of a.issues) t.path ? t.path.unshift(o) : t.path = [o], e.issues?.push(t);
						if (e.issues ||= a.issues, t.abortEarly) {
							e.typed = !1;
							break;
						}
					}
					a.typed || (e.typed = !1), e.value.push(a.value);
				}
			} else J(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ao(e) {
	let t;
	if (e) for (let n of e) if (t) for (let e of n.issues) t.push(e);
	else t = n.issues;
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function jo(e, t) {
	return so({
		kind: "schema",
		type: "union",
		reference: jo,
		expects: /* @__PURE__ */ oo(e.map((e) => e.expects), "|"),
		async: !1,
		options: e,
		message: t,
		"~run"(e, t) {
			let n, r, i;
			for (let a of this.options) {
				let o = a["~run"]({ value: e.value }, t);
				if (o.typed) {
					if (o.issues) r ? r.push(o) : r = [o];
					else {
						n = o;
						break;
					}
				} else i ? i.push(o) : i = [o];
			}
			if (n) return n;
			if (r) {
				if (r.length === 1) return r[0];
				J(this, "type", e, t, { issues: /* @__PURE__ */ Ao(r) }), e.typed = !0;
			} else if (i?.length === 1) return i[0];
			else J(this, "type", e, t, { issues: /* @__PURE__ */ Ao(i) });
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Mo() {
	return so({
		kind: "schema",
		type: "unknown",
		reference: Mo,
		expects: "unknown",
		async: !1,
		"~run"(e) {
			return e.typed = !0, e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function No(e, t, n) {
	return so({
		kind: "schema",
		type: "variant",
		reference: No,
		expects: "Object",
		async: !1,
		key: e,
		options: t,
		message: n,
		"~run"(e, t) {
			let n = e.value;
			if (n && typeof n == "object") {
				let r, i = 0, a = this.key, o = [], s = (e, c) => {
					for (let l of e.options) {
						if (l.type === "variant") s(l, new Set(c).add(l.key));
						else {
							let e = !0, s = 0;
							for (let t of c) {
								let r = l.entries[t];
								if (t in n ? r["~run"]({
									typed: !1,
									value: n[t]
								}, vo).issues : r.type !== "exact_optional" && r.type !== "optional" && r.type !== "nullish") {
									e = !1, a !== t && (i < s || i === s && t in n && !(a in n)) && (i = s, a = t, o = []), a === t && o.push(l.entries[t].expects);
									break;
								}
								s++;
							}
							if (e) {
								let e = l["~run"]({ value: n }, t);
								(!r || !r.typed && e.typed) && (r = e);
							}
						}
						if (r && !r.issues) break;
					}
				};
				if (s(this, /* @__PURE__ */ new Set([this.key])), r) return r;
				J(this, "type", e, t, {
					input: n[a],
					expected: /* @__PURE__ */ oo(o, "|"),
					path: [{
						type: "object",
						origin: "value",
						input: n,
						key: a,
						value: n[a]
					}]
				});
			} else J(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function $(...e) {
	return so({
		...e[0],
		pipe: e,
		"~run"(t, n) {
			for (let r of e) if (r.kind !== "metadata") {
				if (t.issues && (r.kind === "schema" || r.kind === "transformation")) {
					t.typed = !1;
					break;
				}
				(!t.issues || !n.abortEarly && !n.abortPipeEarly) && (t = r["~run"](t, n));
			}
			return t;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Po(e, t, n) {
	let r = e["~run"]({ value: t }, /* @__PURE__ */ ro(n));
	return {
		typed: r.typed,
		success: !r.issues,
		output: r.value,
		issues: r.issues
	};
}
var Fo = /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ _o(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)), Io = (e) => /* @__PURE__ */ $(/* @__PURE__ */ wo((e) => typeof e == "object" && !!e && !Array.isArray(e)), e), Lo = (e) => Io(/* @__PURE__ */ Oo(e));
((e) => Io(/* @__PURE__ */ X(e)))({ error: /* @__PURE__ */ Q() });
var Ro = /* @__PURE__ */ $(/* @__PURE__ */ X({
	id: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ mo(1)),
	hostId: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ mo(1)),
	role: /* @__PURE__ */ Do(["host", "guest"]),
	generation: /* @__PURE__ */ Z(Fo),
	requireVerification: /* @__PURE__ */ Z(/* @__PURE__ */ Mo()),
	locked: /* @__PURE__ */ Z(/* @__PURE__ */ Mo()),
	iceServers: /* @__PURE__ */ Z(/* @__PURE__ */ So(/* @__PURE__ */ X({
		urls: /* @__PURE__ */ jo([/* @__PURE__ */ Q(), /* @__PURE__ */ So(/* @__PURE__ */ Q())]),
		username: /* @__PURE__ */ Z(/* @__PURE__ */ Q()),
		credential: /* @__PURE__ */ Z(/* @__PURE__ */ Q())
	})))
}), /* @__PURE__ */ co((e) => e.role === "host" == (e.id === e.hostId))), zo = /* @__PURE__ */ X({
	roomId: /* @__PURE__ */ Q(),
	siteKey: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ _o(/^[A-Za-z0-9_-]{1,100}$/))
}), Bo = 6e4, Vo = 5e3, Ho = 3e5;
function Uo(e, t = Math.random()) {
	let n = Math.min(Ho, Vo * 2 ** Math.max(0, e - 1));
	return Math.round(n * (.5 + t / 2));
}
var Wo = class {
	roomId;
	hostToken;
	runtime;
	socket;
	retry;
	handshake;
	stopped = !1;
	admitted = !1;
	failures = 0;
	lastAcknowledgedAt;
	lastPulseAt;
	constructor(e, t, n) {
		this.roomId = e, this.hostToken = t, this.runtime = n, this.connect();
	}
	acknowledged() {
		this.stopped || (this.lastAcknowledgedAt = performance.now(), this.admitted && this.socket?.readyState === 1 && this.pulse(this.socket));
	}
	pulse(e) {
		let t = performance.now();
		this.lastPulseAt !== void 0 && t - this.lastPulseAt < Bo || (e.send("hb"), this.lastPulseAt = t);
	}
	connect() {
		if (this.stopped) return;
		let e = new URL(pi.liveness(this.roomId), mi(this.runtime.serviceOrigin));
		e.protocol = e.protocol === "https:" ? "wss:" : "ws:";
		let t;
		try {
			t = this.runtime.createWebSocket(e);
		} catch {
			this.scheduleRetry();
			return;
		}
		this.socket = t, this.admitted = !1, this.lastPulseAt = void 0, this.handshake = setTimeout(() => t.close(), 1e4), t.onopen = () => {
			!this.stopped && t === this.socket && t.send(JSON.stringify({
				type: "hello",
				hostToken: this.hostToken
			}));
		}, t.onmessage = ({ data: e }) => {
			this.stopped || t !== this.socket || (e === "ready" && !this.admitted ? (this.admitted = !0, this.failures = 0, clearTimeout(this.handshake), this.lastAcknowledgedAt !== void 0 && performance.now() - this.lastAcknowledgedAt < 1e4 && this.pulse(t)) : e !== "ok" && t.close());
		}, t.onclose = () => {
			clearTimeout(this.handshake), t === this.socket && (this.socket = void 0, this.admitted = !1, this.scheduleRetry());
		}, t.onerror = () => t.close();
	}
	scheduleRetry() {
		this.stopped || (this.failures += 1, this.retry = setTimeout(() => this.connect(), Uo(this.failures)));
	}
	close() {
		this.stopped || (this.stopped = !0, clearTimeout(this.retry), clearTimeout(this.handshake), this.socket?.close(1e3, "Host left"), this.socket = void 0);
	}
}, Go = class extends Error {}, Ko = class {
	messages;
	unconfirmed;
	sequence = 0;
	pending;
	constructor(e, t = (e) => Error(e)) {
		this.messages = e, this.unconfirmed = t;
	}
	matches(e) {
		return !!this.pending && this.pending.id === e;
	}
	start(e) {
		return this.pending ? Promise.reject(Error(this.messages.pending)) : new Promise((t, n) => {
			let r = ++this.sequence, i = setTimeout(() => this.fail(this.messages.timeout), 1e4);
			this.pending = {
				id: r,
				resolve: t,
				reject: n,
				timer: i
			};
			try {
				e(r);
			} catch {
				this.fail(this.messages.send);
			}
		});
	}
	resolve(e) {
		this.take()?.resolve(e);
	}
	fail(e, t = !1) {
		let n = this.take();
		n && n.reject(t ? Error(e) : this.unconfirmed(e));
	}
	take() {
		let e = this.pending;
		return this.pending = void 0, e && clearTimeout(e.timer), e;
	}
}, qo = class {
	available;
	send;
	verification = null;
	verificationRequest = new Ko({
		pending: "A verification update is already pending.",
		timeout: "Verification update was not confirmed.",
		send: "Verification update could not be sent."
	}, (e) => (this.verification = null, Error(e)));
	passwordRequest = new Ko({
		pending: "A password update is already pending.",
		timeout: "Password update was not confirmed.",
		send: "Password update could not be sent."
	});
	banRequest = new Ko({
		pending: "A ban operation is already pending.",
		timeout: "Ban operation was not confirmed.",
		send: "Ban operation could not be sent."
	}, (e) => new Go(e));
	constructor(e, t) {
		this.available = e, this.send = t;
	}
	setRequireVerification(e) {
		return typeof e == "boolean" ? this.available() ? this.verificationRequest.start((t) => this.send({
			type: "setVerification",
			required: e,
			requestId: t
		})) : Promise.reject(Error("An active room-owner connection is required.")) : Promise.reject(Error("Expected a boolean."));
	}
	setPassword(e) {
		return e !== null && (typeof e != "string" || e.length > 64) ? Promise.reject(Error("Password must contain at most 64 characters.")) : this.available() ? this.passwordRequest.start((t) => this.send({
			type: "setPassword",
			requestId: t,
			password: e ?? ""
		})) : Promise.reject(Error("An active room-owner connection is required."));
	}
	updateBan(e, t, n) {
		return this.available() ? this.banRequest.start((r) => this.send({
			type: e,
			id: t,
			requestId: r,
			...e === "ban" && n !== void 0 ? { reason: n } : {}
		})) : Promise.reject(Error("An active room-owner connection is required."));
	}
	accept(e) {
		if (e.type === "verificationUpdated" && this.verificationRequest.matches(e.requestId)) return e.ok !== !0 || typeof e.required != "boolean" ? this.verificationRequest.fail(typeof e.error == "string" ? e.error : "Verification update failed.", e.ok === !1) : (this.verification = e.required, this.verificationRequest.resolve(e.required)), !0;
		if (e.type === "passwordUpdated" && this.passwordRequest.matches(e.requestId)) {
			if (e.ok === !1) return this.passwordRequest.fail(typeof e.error == "string" ? e.error : "Password update failed."), !0;
			if (typeof e.locked == "boolean") return this.passwordRequest.resolve(e.locked), !0;
		}
		return e.type === "banResult" && this.banRequest.matches(e.requestId) ? (e.ok === !0 ? this.banRequest.resolve() : this.banRequest.fail(typeof e.error == "string" ? e.error : "Ban operation failed.", !0), !0) : !1;
	}
	cancel(e) {
		let t = e === "closed" ? "Room closed" : "Signaling disconnected";
		this.verificationRequest.fail(`${t} before verification confirmation.`), this.banRequest.fail(`${t} before ban confirmation.`), this.passwordRequest.fail(`${t} before password confirmation.`), e === "closed" && (this.verification = null);
	}
}, Jo = "ECDSA-P256-SHA256", Yo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", Xo = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/, Zo = /^(?:[0-9a-hjkmnp-tv-z]{8}|[0-9a-f]{10})$/, Qo = /^[0-9a-f]{64}$/, $o = new TextEncoder();
function es(e) {
	if (!(e instanceof Uint8Array) || e.length > 1024) throw TypeError("Invalid evidence byte string");
	let t = "";
	for (let n = 0; n < e.length; n += 3) {
		let r = e[n], i = e[n + 1] ?? 0, a = e[n + 2] ?? 0;
		t += Yo[r >> 2], t += Yo[(r & 3) << 4 | i >> 4], n + 1 < e.length && (t += Yo[(i & 15) << 2 | a >> 6]), n + 2 < e.length && (t += Yo[a & 63]);
	}
	return t;
}
function ts(e, t) {
	if (![
		32,
		64,
		65
	].includes(t) || typeof e != "string" || e.length !== Math.ceil(t * 8 / 6) || !/^[A-Za-z0-9_-]+$/.test(e)) return null;
	let n = new Uint8Array(t), r = 0, i = 0, a = 0;
	for (let t of e) r = r << 6 | Yo.indexOf(t), i += 6, i >= 8 && (i -= 8, n[a++] = r >> i & 255, r &= (1 << i) - 1);
	return a === t && es(n) === e ? n : null;
}
function ns(e, t) {
	try {
		if (typeof e != "object" || !e || Array.isArray(e)) return null;
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return null;
		let r = Reflect.ownKeys(e);
		if (r.length !== t.length || r.some((e) => !t.includes(String(e)))) return null;
		let i = Object.create(null);
		for (let n of t) {
			let t = Object.getOwnPropertyDescriptor(e, n);
			if (!t?.enumerable || !Object.hasOwn(t, "value")) return null;
			let r = t.value;
			if ((typeof r != "string" || r.length > 1024) && (typeof r != "number" || !Number.isSafeInteger(r) || r < 0)) return null;
			i[n] = r;
		}
		return $o.encode(JSON.stringify(i)).byteLength > 1024 ? null : i;
	} catch {
		return null;
	}
}
var rs = (e) => typeof e == "string" && Xo.test(e), is = (e) => typeof e == "string" && Qo.test(e), as = (e) => typeof e == "number" && Number.isSafeInteger(e) && e >= 0 && !Object.is(e, -0), os = (e) => typeof e == "string" && Zo.test(e);
function ss(e) {
	if (typeof e != "string" || e.length > 256) return !1;
	try {
		let t = new URL(e);
		return ["http:", "https:"].includes(t.protocol) && !t.username && !t.password && t.origin === e;
	} catch {
		return !1;
	}
}
function cs(e) {
	return ts(e, 65)?.[0] === 4;
}
function ls(e, t) {
	return as(e) && as(t) && t > e && t - e <= 15e3;
}
function us(e) {
	let t = ns(e, [
		"version",
		"serviceOrigin",
		"roomId",
		"generation",
		"matchId",
		"expiresAt"
	]);
	return t?.version !== 1 || !ss(t.serviceOrigin) || !os(t.roomId) || !rs(t.generation) || !rs(t.matchId) || !as(t.expiresAt) || t.expiresAt === 0 ? null : Object.freeze({
		version: 1,
		serviceOrigin: t.serviceOrigin,
		roomId: t.roomId,
		generation: t.generation,
		matchId: t.matchId,
		expiresAt: t.expiresAt
	});
}
function ds(e) {
	let t = ns(e, [
		"version",
		"algorithm",
		"serviceOrigin",
		"requestId",
		"challengeId",
		"nonce",
		"roomId",
		"generation",
		"matchId",
		"contextDigest",
		"publicKey",
		"issuedAt",
		"expiresAt"
	]);
	return t?.version !== 1 || t.algorithm !== "ECDSA-P256-SHA256" || !ss(t.serviceOrigin) || !rs(t.requestId) || !rs(t.challengeId) || typeof t.nonce != "string" || !ts(t.nonce, 32) || !os(t.roomId) || !rs(t.generation) || !rs(t.matchId) || !is(t.contextDigest) || !cs(t.publicKey) || !as(t.issuedAt) || !as(t.expiresAt) || !ls(t.issuedAt, t.expiresAt) ? null : Object.freeze({
		version: 1,
		algorithm: Jo,
		serviceOrigin: t.serviceOrigin,
		requestId: t.requestId,
		challengeId: t.challengeId,
		nonce: t.nonce,
		roomId: t.roomId,
		generation: t.generation,
		matchId: t.matchId,
		contextDigest: t.contextDigest,
		publicKey: t.publicKey,
		issuedAt: t.issuedAt,
		expiresAt: t.expiresAt
	});
}
new TextEncoder();
var fs = (e) => typeof e == "string" && /^[a-f0-9]{64}$/u.test(e), ps = (e, t = 4294967295) => typeof e == "number" && Number.isSafeInteger(e) && e >= 0 && e <= t && !Object.is(e, -0);
function ms(e) {
	let t = hs(e, [
		"version",
		"serviceOrigin",
		"roomId",
		"matchId",
		"generation",
		"admissionDigest",
		"ownSlot",
		"epoch",
		"initialTick",
		"windowId",
		"issuedAt",
		"expiresAt",
		"matchDeadline"
	]), n = (e) => typeof e == "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/u.test(e);
	if (t?.version !== 1 || typeof t.serviceOrigin != "string" || t.serviceOrigin.length > 256 || typeof t.roomId != "string" || !/^(?:[0-9a-hjkmnp-tv-z]{8}|[0-9a-f]{10})$/u.test(t.roomId) || typeof t.matchId != "string" || !/^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,127}$/u.test(t.matchId) || !n(t.generation) || !n(t.windowId) || !fs(t.admissionDigest) || !ps(t.ownSlot, 31) || !ps(t.epoch, 65535) || !ps(t.initialTick, 4294751295) || !ps(t.issuedAt, 2 ** 53 - 1) || !ps(t.expiresAt, 2 ** 53 - 1) || !ps(t.matchDeadline, 2 ** 53 - 1) || t.expiresAt <= t.issuedAt || t.expiresAt - t.issuedAt > 6e4 || t.matchDeadline <= t.expiresAt || t.matchDeadline - t.issuedAt > 366e4) return null;
	try {
		let e = new URL(t.serviceOrigin);
		if (!["http:", "https:"].includes(e.protocol) || e.origin !== t.serviceOrigin) return null;
	} catch {
		return null;
	}
	return Object.freeze(t);
}
function hs(e, t) {
	try {
		if (!e || typeof e != "object" || Array.isArray(e) || ![Object.prototype, null].includes(Object.getPrototypeOf(e))) return null;
		let n = Reflect.ownKeys(e);
		if (n.length !== t.length || n.some((e) => typeof e != "string" || !t.includes(e))) return null;
		let r = {};
		for (let n of t) {
			let t = Object.getOwnPropertyDescriptor(e, n);
			if (!t?.enumerable || !Object.hasOwn(t, "value")) return null;
			r[n] = t.value;
		}
		return r;
	} catch {
		return null;
	}
}
es(/* @__PURE__ */ new Uint8Array(64));
function gs(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e) || ![Object.prototype, null].includes(Object.getPrototypeOf(e))) throw Error("Invalid evidence object");
	let n = t.split(" "), r = Object.getOwnPropertyDescriptors(e);
	if (Reflect.ownKeys(e).length !== n.length || n.some((e) => !Object.hasOwn(r, e) || !Object.hasOwn(r[e], "value") || !r[e].enumerable)) throw Error("Invalid evidence fields");
	return Object.fromEntries(n.map((e) => [e, r[e].value]));
}
var _s = (e, t = 2 ** 53 - 1) => typeof e == "number" && Number.isSafeInteger(e) && e >= 0 && e <= t && !Object.is(e, -0), vs = (e) => typeof e == "string" && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(e), ys = (e) => typeof e == "string" && /^[a-f0-9]{64}$/.test(e);
function bs(e) {
	if (!Array.isArray(e) || Object.getPrototypeOf(e) !== Array.prototype || e.length < 2 || e.length > 22 || Reflect.ownKeys(e).length !== e.length + 1) throw Error("Invalid roster");
	return Array.from({ length: e.length }, (t, n) => {
		let r = Object.getOwnPropertyDescriptor(e, String(n));
		if (!r?.enumerable || !Object.hasOwn(r, "value")) throw Error("Invalid roster");
		return r.value;
	});
}
function xs(e, t) {
	let n = bs(e).map((e) => {
		let n = gs(e, t ? "peerId slot team keyDigest" : "peerId slot");
		if (!vs(n.peerId) || !_s(n.slot, 31) || t && (n.team !== 1 && n.team !== 2 || !ys(n.keyDigest))) throw Error("Invalid slot");
		return Object.freeze(n);
	});
	if (new Set(n.map((e) => e.peerId)).size !== n.length || new Set(n.map((e) => e.slot)).size !== n.length) throw Error("Duplicate slot");
	return Object.freeze(n);
}
function Ss(e) {
	try {
		return e();
	} catch {
		return null;
	}
}
function Cs(e) {
	return Ss(() => {
		let t = gs(e, "version serviceOrigin roomId matchId generation admissionDigest ownSlot epoch initialTick windowId issuedAt expiresAt matchDeadline ownPeerId slots"), { ownPeerId: n, slots: r, ...i } = t;
		if (!ms(i) || !vs(n)) throw Error("Invalid proposal");
		let a = xs(r, !0);
		if (!a.some((e) => e.peerId === n && e.slot === t.ownSlot)) throw Error("Missing own slot");
		return Object.freeze({
			...t,
			slots: a
		});
	});
}
function ws(e) {
	return Ss(() => {
		let t = gs(e, "version windowId admissionDigest nonce sequence fromTick targetTick issuedAt expiresAt");
		if (t.version !== 1 || !vs(t.windowId) || !ys(t.admissionDigest) || !vs(t.nonce) || !_s(t.sequence, 720) || !_s(t.fromTick, 4294966995) || t.targetTick !== t.fromTick + 300 || !_s(t.issuedAt) || !_s(t.expiresAt) || t.expiresAt <= t.issuedAt || t.expiresAt - t.issuedAt > 15e3) throw Error("Invalid window");
		return Object.freeze(t);
	});
}
new TextEncoder(), es(/* @__PURE__ */ new Uint8Array(64));
function Ts(e) {
	try {
		let t = gs(e, "version serviceOrigin roomId matchId generation hostPeerId ownPeerId committedPayloadDigest issuedAt expiresAt matchDeadline participants");
		if (!us({
			version: t.version,
			serviceOrigin: t.serviceOrigin,
			roomId: t.roomId,
			matchId: t.matchId,
			generation: t.generation,
			expiresAt: t.expiresAt
		}) || !vs(t.hostPeerId) || !vs(t.ownPeerId) || !ys(t.committedPayloadDigest) || !_s(t.issuedAt) || !_s(t.expiresAt) || !_s(t.matchDeadline) || t.expiresAt <= t.issuedAt || t.expiresAt - t.issuedAt > 3e4 || t.expiresAt >= t.matchDeadline || !Array.isArray(t.participants) || Object.getPrototypeOf(t.participants) !== Array.prototype || t.participants.length < 2 || t.participants.length > 22 || Reflect.ownKeys(t.participants).length !== t.participants.length + 1) return null;
		let n = Array.from({ length: t.participants.length }, (e, n) => {
			let r = Object.getOwnPropertyDescriptor(t.participants, String(n));
			if (!r?.enumerable || !Object.hasOwn(r, "value")) throw Error("Invalid roster");
			let i = gs(r.value, "peerId team keyDigest");
			if (!vs(i.peerId) || !ys(i.keyDigest) || i.team !== 1 && i.team !== 2) throw Error("Invalid participant");
			return Object.freeze(i);
		});
		return new Set(n.map((e) => e.peerId)).size !== n.length || !n.some((e) => e.peerId === t.hostPeerId) || !n.some((e) => e.peerId === t.ownPeerId) || n.filter((e) => e.team === 1).length * 2 !== n.length ? null : Object.freeze({
			...t,
			participants: Object.freeze(n)
		});
	} catch {
		return null;
	}
}
var Es = 1, Ds = 2048, Os = [
	1001,
	1008,
	1009,
	1011,
	1013
], ks = "Room connection closed", As = 500, js = 8e3, Ms = 45e3, Ns = (e) => typeof e == "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(e), Ps = (e) => typeof e == "string" && e.length <= 123 ? e : "Room connection ended.";
function Fs({ team: e, atTick: t, remainingMs: n }) {
	return e === null ? { due: null } : (e === 1 || e === 2) && Number.isSafeInteger(t) && Number(t) >= 0 && typeof n == "number" && n >= 0 && n <= 6e4 ? { due: {
		team: e,
		atTick: Number(t),
		remainingMs: n
	} } : null;
}
var Is = {
	"Host left": "The host left. Return to Rooms and join again.",
	"Host connection ended": "Host connection ended. Return to Rooms and join again."
};
function Ls(e) {
	return Object.hasOwn(Is, e.reason) ? Is[e.reason] : Os.includes(e.code) && e.reason ? e.reason : "Room connection ended. Return to Rooms and join again.";
}
function Rs(e) {
	return !e.reason || e.reason === ks;
}
function zs(e) {
	if (e.matchEntry && (e.hostToken || !/^[a-f0-9]{64}$/.test(e.matchEntry.token) || !Ns(e.matchEntry.generation))) throw Error("Invalid match entry credentials.");
	return {
		hostToken: e.hostToken,
		password: e.password,
		...e.matchEntry ? { matchEntry: { ...e.matchEntry } } : {},
		...e.name === void 0 ? {} : { name: e.name }
	};
}
var Bs = class {
	room;
	hooks;
	events;
	runtime;
	ws;
	id = "";
	host = !1;
	hostId = "";
	closed = !1;
	generation = null;
	locked = null;
	iceServers = null;
	serial = 0;
	ownerRequests = new qo(() => this.host && this.ready, (e) => this.send(e));
	credentials;
	challenge;
	socketLifetime = new AbortController();
	queue = Promise.resolve();
	hostMonitor;
	resumeToken;
	reconnecting = !1;
	reconnectAttempt = 0;
	reconnectDeadline;
	reconnectTimer;
	constructor(e, t, n, r, i) {
		this.room = e, this.hooks = n, this.events = r, this.runtime = i, this.credentials = zs(t), this.ws = this.openSocket();
	}
	openSocket() {
		let e = new URL(pi.signal(this.room), mi(this.runtime.serviceOrigin));
		e.protocol = e.protocol === "https:" ? "wss:" : "ws:";
		let t = this.runtime.createWebSocket(e);
		return this.ws = t, this.attach(t), t;
	}
	get socketOpen() {
		return this.ws.readyState === Es;
	}
	get ready() {
		return !this.closed && !!this.id && this.socketOpen;
	}
	isCurrent(e) {
		return e === this.serial;
	}
	send(e) {
		!this.closed && this.socketOpen && this.ws.send(JSON.stringify(e));
	}
	sendPeerSignal(e, t) {
		this.send({
			type: "signal",
			to: e,
			signal: t
		});
	}
	attach(e) {
		this.socketLifetime.abort(), this.socketLifetime = new AbortController();
		let t = ++this.serial, n = () => !this.closed && this.ws === e && this.serial === t;
		e.onopen = () => {
			n() && this.send({
				type: "hello",
				...this.helloCredentials()
			});
		}, e.onmessage = (e) => {
			n() && (this.queue = this.queue.then(async () => {
				n() && await this.receive(JSON.parse(e.data), t);
			}).catch(() => {
				n() && this.hooks.status("Connection negotiation failed. Try another room or network.", "error");
			}));
		}, e.onclose = (e) => {
			if (n()) {
				if (this.socketLifetime.abort(), this.challenge?.abort(), this.ownerRequests.cancel("disconnected"), !Rs(e)) {
					this.serial++, this.events.ended(Ls(e));
					return;
				}
				this.events.dropped(), this.host && this.retryReconnect();
			}
		}, e.onerror = () => {
			n() && (this.socketLifetime.abort(), this.hooks.status("Room service is unavailable.", "error"));
		};
	}
	retryReconnect() {
		if (this.closed) return;
		if (this.reconnecting || (this.reconnecting = !0, this.reconnectAttempt = 0, this.reconnectDeadline = Date.now() + Ms, this.hooks.status("Reconnecting to the room service…", "info")), Date.now() >= (this.reconnectDeadline ?? 0)) {
			this.reconnecting = !1, this.events.ended("Room service connection lost. Return to Rooms and try again.");
			return;
		}
		let e = Math.min(js, As * 2 ** this.reconnectAttempt);
		this.reconnectAttempt++, clearTimeout(this.reconnectTimer), this.reconnectTimer = setTimeout(() => {
			!this.closed && this.reconnecting && this.openSocket();
		}, e * (.5 + Math.random() * .5));
	}
	async receive(e, t) {
		if (!(this.closed || t !== this.serial)) {
			if (e.type === "terminal") return this.socketLifetime.abort(), this.events.ended(Ps(e.reason));
			if (e.type === "evidence-key-invitation" || e.type === "evidence-key-challenge") return this.evidenceKey(e, t);
			if (e.type.startsWith("match-evidence-")) return this.matchEvidence(e, t);
			if (!this.ownerRequests.accept(e)) switch (e.type) {
				case "heartbeat":
					this.host && this.hostMonitor?.acknowledged();
					return;
				case "verificationRequired": return this.answerVerification(e);
				case "ready": return this.admit(e);
				case "hostResume":
					this.host && typeof e.resumeToken == "string" && (this.resumeToken = e.resumeToken);
					return;
				case "peer":
				case "leave": return this.events.peer(e, t);
				case "signal": return this.events.negotiate(e, t);
			}
		}
	}
	evidenceKey(e, t) {
		if (!this.ready || this.socketLifetime.signal.aborted || !this.hooks.evidenceKey) return;
		let n = e.type === "evidence-key-invitation" ? us(e.invitation) : null, r = e.type === "evidence-key-challenge" ? ds(e.challenge) : null, i = n ?? r;
		if (!i || i.roomId !== this.room || i.serviceOrigin !== mi(this.runtime.serviceOrigin) || i.generation !== this.generation) return;
		let a = n ? {
			type: "invitation",
			invitation: n
		} : r ? {
			type: "challenge",
			challenge: r
		} : null;
		if (a) {
			let e = this.hooks.evidenceKey, n = Object.freeze({
				serial: t,
				signal: this.socketLifetime.signal
			});
			Promise.resolve().then(() => {
				if (this.isCurrent(t) && !n.signal.aborted) return e(a, n);
			}).catch(() => {});
		}
	}
	matchEvidence(e, t) {
		let n = this.hooks.matchEvidence;
		if (!n || !this.ready || this.socketLifetime.signal.aborted) return;
		let r = e.type === "match-evidence-ready" ? Ts(e.ready) : null, i = e.type === "match-evidence-proposal" ? Cs(e.proposal) : null, a = e.type === "match-evidence-start" ? ms(e.start) : null, o = e.type === "match-evidence-window" ? ws(e.window) : null, s = r ?? i ?? a;
		if (s && (s.roomId !== this.room || s.generation !== this.generation || s.serviceOrigin !== mi(this.runtime.serviceOrigin))) return;
		let c = e.type === "match-evidence-rejoined" && typeof e.peerId == "string" && e.peerId.length <= 64 ? e.peerId : null, l = e.type === "match-evidence-forfeit" ? Fs(e) : null, u = l ? {
			type: "forfeit",
			forfeit: l.due
		} : c ? {
			type: "rejoined",
			peerId: c
		} : r ? {
			type: "ready",
			ready: r
		} : i ? {
			type: "proposal",
			proposal: i
		} : a ? {
			type: "start",
			start: a
		} : o ? {
			type: "window",
			window: o
		} : null;
		if (!u) return;
		let d = Object.freeze({
			serial: t,
			signal: this.socketLifetime.signal
		});
		Promise.resolve().then(() => {
			if (this.isCurrent(t) && !d.signal.aborted) return n(u, d);
		}).catch(() => {});
	}
	async answerVerification(e) {
		if (this.closed || this.id || this.credentials.hostToken || this.challenge || !/* @__PURE__ */ xo(zo, e) || e.roomId !== this.room) return;
		if (!this.hooks.verify) {
			this.events.ended("This client cannot complete the room verification challenge.");
			return;
		}
		let t = new AbortController();
		this.challenge = t;
		try {
			let n = await this.hooks.verify({
				siteKey: e.siteKey,
				roomId: this.room
			}, t.signal);
			if (t.signal.aborted || this.closed || !this.socketOpen) return;
			if (typeof n != "string" || n.length === 0 || n.length > Ds) throw Error("Invalid verification response.");
			this.send({
				type: "hello",
				...this.helloCredentials(),
				verificationToken: n
			});
		} catch (e) {
			this.closed || this.events.ended(e instanceof Error ? e.message : "Room verification failed.");
		} finally {
			this.challenge === t && (this.challenge = void 0);
		}
	}
	admit(e) {
		let t = this.reconnecting && !!this.id;
		if (this.id && !t) return;
		let n = this.credentials.matchEntry;
		if (!/* @__PURE__ */ xo(Ro, e) || n && (e.role !== "guest" || !Ns(e.id) || !Ns(e.hostId) || e.generation !== n.generation) || t && (e.id !== this.id || e.role !== "host")) {
			this.events.ended("Invalid room admission.");
			return;
		}
		if (t) {
			this.reconnecting = !1, this.reconnectAttempt = 0, this.reconnectDeadline = void 0, clearTimeout(this.reconnectTimer), this.iceServers = Array.isArray(e.iceServers) ? e.iceServers : this.iceServers, this.hooks.status("Room service connection restored.", "info");
			return;
		}
		this.id = e.id, this.host = e.role === "host", this.host && this.credentials.hostToken && (this.hostMonitor = new Wo(this.room, this.credentials.hostToken, this.runtime), this.hostMonitor.acknowledged()), this.hostId = e.hostId, this.generation = e.generation ?? null, delete this.credentials.matchEntry, this.ownerRequests.verification = typeof e.requireVerification == "boolean" ? e.requireVerification : null, this.locked = typeof e.locked == "boolean" ? e.locked : null, this.iceServers = Array.isArray(e.iceServers) ? e.iceServers : null, this.events.admitted(this.id, this.host);
	}
	helloCredentials() {
		return this.host && this.resumeToken ? { resumeToken: this.resumeToken } : {
			hostToken: this.credentials.hostToken,
			password: this.credentials.password,
			...this.credentials.matchEntry ? { matchEntryToken: this.credentials.matchEntry.token } : {},
			...!this.credentials.hostToken && this.credentials.name !== void 0 ? { name: this.credentials.name } : {}
		};
	}
	close() {
		this.closed || (this.serial++, this.socketLifetime.abort(), this.challenge?.abort(), this.ownerRequests.cancel("closed"), this.closed = !0, this.reconnecting = !1, clearTimeout(this.reconnectTimer), this.hostMonitor?.close(), this.hostMonitor = void 0, this.credentials = {}, this.ws.close(1e3, "Left room"));
	}
}, Vs = 2e4, Hs = 5e3, Us = 2, Ws = 3e4, Gs = 5e3, Ks = 1048576, qs = 32768, Js = 1e3, Ys = [{ urls: "stun:stun.l.google.com:19302" }], Xs = class {
	hooks;
	runtime;
	peers = /* @__PURE__ */ new Map();
	timer;
	bytesSent = 0;
	bytesReceived = 0;
	signaling;
	link;
	pollingStats = !1;
	lastHeartbeat = 0;
	controlId = 0;
	controlSignatures;
	controlBatchDepth = 0;
	deferredControlRemovals;
	markedControlPeers;
	hostCloseTimer;
	guestAdmittedAt;
	constructor(e, t, n, r = Ei()) {
		this.hooks = n, this.runtime = r, this.link = {
			isHost: () => this.host,
			hooks: n,
			current: (e) => this.current(e),
			signalingOpen: () => this.signaling.socketOpen,
			sendSignal: (e, t) => this.signaling.sendPeerSignal(e.id, t),
			noteHealthy: (e) => this.noteHealthy(e),
			remove: (e) => this.remove(e),
			countReceived: (e) => {
				this.bytesReceived += e;
			}
		}, this.signaling = new Bs(e, t, n, {
			admitted: (e, t) => {
				t || (this.guestAdmittedAt = performance.now()), n.ready(e, t);
			},
			peer: (e, t) => this.peerChanged(e, t),
			negotiate: (e, t) => this.negotiate(e, t),
			ended: (e) => this.end(e),
			dropped: () => this.signalingDropped()
		}, r), this.timer = setInterval(() => this.maintain(), Gs);
	}
	get ws() {
		return this.signaling.ws;
	}
	get id() {
		return this.signaling.id;
	}
	get host() {
		return this.signaling.host;
	}
	get hostId() {
		return this.signaling.hostId;
	}
	get closed() {
		return this.signaling.closed;
	}
	get locked() {
		return this.signaling.locked;
	}
	get signalingReady() {
		return this.signaling.ready;
	}
	get roomGeneration() {
		return this.signaling.generation;
	}
	get requireVerification() {
		return this.signaling.ownerRequests.verification;
	}
	setRequireVerification(e) {
		return this.signaling.ownerRequests.setRequireVerification(e);
	}
	setPassword(e) {
		return this.signaling.ownerRequests.setPassword(e);
	}
	updateBan(e, t, n) {
		return this.signaling.ownerRequests.updateBan(e, t, n);
	}
	get rtt() {
		let e = [...this.peers.values()].filter((e) => e.connected && e.lostAt === void 0).map((e) => e.rtt).filter((e) => typeof e == "number");
		return e.length ? Math.max(...e) : null;
	}
	signal(e) {
		this.signaling.send(e);
	}
	maintain() {
		let e = performance.now();
		if (this.host && this.signalingReady && e - this.lastHeartbeat >= Ws && (this.signal({ type: "heartbeat" }), this.lastHeartbeat = e), this.guestAdmittedAt !== void 0 && this.peers.size === 0 && e - this.guestAdmittedAt > Vs) {
			this.hooks.status("Could not reach the host. Try again or a different room.", "error"), this.end("Could not reach the host. Return to Rooms and try again.");
			return;
		}
		for (let t of this.peers.values()) !t.connected && e - t.created > Vs ? (this.hooks.status(this.host ? "A player could not connect directly to you." : "Could not connect directly to this room. Try another network or room.", "error"), this.remove(t.id, !0, "unreachable")) : t.lostAt !== void 0 && e - t.lostAt > Vs ? (this.hooks.status(this.host ? "Your direct connection to a player could not be recovered." : "The direct connection could not be recovered. Rejoin the room.", "error"), this.remove(t.id, !0, "lost")) : t.lostAt !== void 0 && this.host && e - t.lastRestart > Hs && this.restartPeer(t.id);
	}
	signalingDropped() {
		this.host || ([...this.peers.values()].some((e) => e.connected && e.lostAt === void 0) ? this.hooks.status("Direct play continues without the room service.", "info") : this.end("Room connection ended. Return to Rooms and join again."));
	}
	async peerChanged(e, t) {
		typeof e.id == "string" && e.id && e.id !== this.id && (e.type === "leave" ? this.remove(e.id, !1) : this.host && !this.peers.has(e.id) && await this.offerPeer(e.id, t, typeof e.name == "string" ? e.name : void 0));
	}
	async negotiate(e, t) {
		if (typeof e.from != "string" || !e.from) return;
		let { signal: n } = e, r = this.peers.get(e.from);
		if (!r) {
			if (this.host || e.from !== this.hostId || !["offer", "candidate"].includes(n.type)) return;
			r = this.make(e.from);
		}
		let i = this.negotiationScope(r, t);
		if (n.type === "offer") {
			if (this.host) throw Error("Only the host can offer");
			await Wa(r, n.sdp, i);
		} else if (n.type === "answer") {
			if (!this.host) throw Error("Only guests can answer");
			await Ga(r, n.sdp, i) && this.noteHealthy(r);
		} else n.type === "candidate" && n.candidate && await Ka(r, n.candidate, i);
	}
	async offerPeer(e, t, n) {
		let r = this.make(e);
		n !== void 0 && (r.name = n), this.bind(r, r.pc.createDataChannel("control", { ordered: !0 })), this.bind(r, r.pc.createDataChannel("realtime", {
			ordered: !1,
			maxRetransmits: 0
		})), await Ua(r, this.negotiationScope(r, t));
	}
	negotiationScope(e, t) {
		return {
			current: () => this.current(e) && this.signaling.isCurrent(t) && this.signaling.socketOpen,
			versioned: !1,
			publish: (t) => this.signaling.sendPeerSignal(e.id, t)
		};
	}
	current(e) {
		return !this.closed && this.peers.get(e.id) === e;
	}
	noteHealthy(e) {
		if (!this.current(e) || e.pc.connectionState !== "connected" || !["connected", "completed"].includes(e.pc.iceConnectionState)) return;
		let t = e.lostAt !== void 0;
		e.lostAt = void 0, e.restarts = 0, t && this.hooks.status("Direct connection restored.", "info");
	}
	async restartPeer(e) {
		let t = this.peers.get(e);
		if (this.closed || !this.host || !t || t.restarting || t.restarts >= Us || t.pc.signalingState !== "stable" || !this.signaling.socketOpen) return !1;
		let n = this.signaling.serial;
		t.restarting = !0, t.lastRestart = performance.now(), t.lostAt ??= t.lastRestart, t.restarts++;
		try {
			return await Ua(t, this.negotiationScope(t, n), { iceRestart: !0 });
		} catch {
			return this.current(t) && this.hooks.status("Direct connection recovery is still pending.", "info"), !1;
		} finally {
			t.restarting = !1;
		}
	}
	make(e) {
		this.guestAdmittedAt = void 0;
		let t = Qa(this.runtime.createPeerConnection({
			iceServers: this.signaling.iceServers ?? Ys,
			bundlePolicy: "max-bundle"
		}), e, this.link);
		return this.peers.set(e, t), t;
	}
	bind(e, t) {
		to(e, t, this.link);
	}
	admit(e) {
		clearTimeout(e.admissionTimer), e.admissionTimer = void 0;
	}
	control(e, t) {
		e.control?.readyState === "open" && (this.controlSignatures?.delete(e.control), this.sendControl(e, la(t, this.controlId++)));
	}
	controlBatch(e) {
		this.controlBatchDepth = (this.controlBatchDepth ?? 0) + 1;
		let t = !1, n;
		try {
			e();
		} catch (e) {
			t = !0, n = e;
		} finally {
			if (this.controlBatchDepth--, this.controlBatchDepth === 0) {
				let e = this.deferredControlRemovals;
				this.deferredControlRemovals = void 0;
				for (let r of e?.values() ?? []) try {
					this.peers.get(r.id) === r && this.remove(r.id);
				} catch (e) {
					t || (n = e), t = !0;
				} finally {
					this.markedControlPeers?.delete(r);
				}
			}
		}
		if (t) throw n;
	}
	sendControl(e, t) {
		let n = e.control;
		if (n?.readyState !== "open" || this.markedControlPeers?.has(e)) return !1;
		if (n.bufferedAmount + t.byteLength > Ks) return this.controlBatchDepth > 0 ? (this.deferredControlRemovals ??= /* @__PURE__ */ new Map(), this.deferredControlRemovals.set(e.id, e), this.markedControlPeers ??= /* @__PURE__ */ new WeakSet(), this.markedControlPeers.add(e)) : this.remove(e.id), !1;
		for (let e of t.packets) n.send(e);
		return this.bytesSent += t.byteLength, !0;
	}
	fast(e, t) {
		return e.fast?.readyState === "open" && e.fast.bufferedAmount < qs && (e.fast.send(t), this.bytesSent += t.byteLength, !0);
	}
	broadcast(e, t = Infinity, n) {
		let r, i, a = typeof n == "string" ? n : n?.signature;
		for (let o of this.peers.values()) {
			let s = o.control;
			if (s?.readyState !== "open" || s.bufferedAmount >= t) continue;
			let c = this.controlSignatures?.get(s);
			if (typeof n == "string" && c === a) continue;
			let l = typeof n == "object" && n.previous !== void 0 && c === n.previous;
			if (l && n.delta === null) continue;
			let u;
			l ? (i ??= la(n.delta, this.controlId++), u = i) : (r ??= la(e, this.controlId++), u = r), this.sendControl(o, u) && (a === void 0 ? this.controlSignatures?.delete(s) : (this.controlSignatures ??= /* @__PURE__ */ new WeakMap(), this.controlSignatures.set(s, a)));
		}
	}
	async stats() {
		if (!(this.pollingStats || this.closed)) {
			this.pollingStats = !0;
			try {
				await Promise.allSettled([...this.peers.values()].map(async (e) => {
					if (!e.connected || e.lostAt !== void 0) {
						e.rtt = null;
						return;
					}
					try {
						let t = await e.pc.getStats();
						this.current(e) && (e.rtt = La(t.values()));
					} catch {
						e.rtt = null;
					}
				}));
			} finally {
				this.pollingStats = !1;
			}
		}
	}
	end(e) {
		this.closed || (this.close(), this.hooks.ended?.(e));
	}
	remove(e, t = !0, n) {
		if (this.closed) return;
		let r = this.peers.get(e);
		if (!r) return;
		if (clearTimeout(r.admissionTimer), this.peers.delete(e), r.controlReader?.clear(), r.pc.close(), this.host && t) try {
			this.signal({
				type: "evict",
				id: e,
				...n ? { reason: n } : {}
			});
		} catch {}
		if (this.hooks.leave(e), this.host) return;
		let i = this.signalingReady, a = () => this.end(i ? "The host connection ended. Return to Rooms and join again." : "Room connection ended. Return to Rooms and join again.");
		i ? this.hostCloseTimer = setTimeout(a, Js) : a();
	}
	close() {
		if (!this.closed) {
			clearTimeout(this.hostCloseTimer), this.hostCloseTimer = void 0, this.signaling.close(), clearInterval(this.timer);
			for (let e of this.peers.values()) clearTimeout(e.admissionTimer), e.controlReader?.clear(), e.pc.close();
			this.peers.clear();
		}
	}
}, Zs = 256, Qs = (e) => e.slice(0, 100);
function $s(e, t, n, r) {
	if (e.assertOpen(), typeof n != "string") throw Error("Invalid kick reason");
	let i = e.players.byId(t);
	if (!i || e.isHost(i)) return;
	let a = e.publicPlayer(i), o = Qs(n), s = e.network.peers.get(i.peerId);
	s && e.network.control(s, {
		type: "kicked",
		reason: o
	}), e.network.remove(i.peerId), e.players.has(i) || e.invoke("onPlayerKicked", e.hooks.onPlayerKicked, a, o, !1, r);
}
async function ec(e, t, n, r = null) {
	if (typeof n != "string") throw Error("Invalid kick reason");
	let i = e.players.byId(t);
	if (!i || e.isHost(i)) return;
	let a = e.publicPlayer(i), o = Qs(n);
	if (e.bans.size >= Zs && !e.bans.has(t)) throw Error("Clear existing bans before adding more.");
	try {
		await e.network.updateBan("ban", i.peerId, o);
	} catch (n) {
		throw n instanceof Go && e.bans.set(t, i.peerId), n;
	}
	e.bans.set(t, i.peerId), e.network.remove(i.peerId), e.invoke("onPlayerKicked", e.hooks.onPlayerKicked, a, o, !0, r);
}
async function tc(e, t) {
	e.assertOpen();
	let n = e.bans.get(t);
	n && (await e.network.updateBan("clearBan", n), e.bans.delete(t));
}
async function nc(e) {
	e.assertOpen(), await e.network.updateBan("clearBans"), e.bans.clear();
}
var rc = [
	"profanity",
	"hate",
	"reserved",
	"religion",
	"club",
	"brand",
	"name"
], ic = /^[a-z0-9]+(?:-[a-z0-9]+)*$/, ac = rc, oc = {
	nickname: {
		min: 1,
		max: 24,
		measure: "codeUnits",
		categories: ac
	},
	displayName: {
		min: 1,
		max: 32,
		measure: "codePoints",
		categories: ac
	},
	handle: {
		min: 3,
		max: 24,
		measure: "codePoints",
		pattern: ic,
		categories: ac
	},
	teamName: {
		min: 1,
		max: 64,
		measure: "codePoints",
		categories: ac
	},
	teamSlug: {
		min: 3,
		max: 32,
		measure: "codePoints",
		pattern: ic,
		categories: ac
	},
	teamTag: {
		min: 2,
		max: 8,
		measure: "codePoints",
		pattern: /^[A-Z0-9]+$/,
		categories: [
			"profanity",
			"hate",
			"reserved",
			"club",
			"brand"
		]
	},
	roomName: {
		min: 1,
		max: 64,
		measure: "codeUnits",
		categories: ac
	},
	description: {
		min: 0,
		max: 280,
		measure: "codePoints",
		categories: ["profanity", "hate"]
	}
}, sc = /[\p{Cc}\p{Zl}\p{Zp}]|(?![\u200c\u200d])\p{Cf}/u, cc = /[^\p{White_Space}\p{Default_Ignorable_Code_Point}\p{M}\u2800]/u, lc = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
function uc(e, t) {
	if (typeof t != "string") return "type";
	let n = oc[e];
	if (sc.test(t) || lc.test(t) || n.pattern && !n.pattern.test(t)) return "format";
	let r = t.trim();
	if (r && !cc.test(r)) return "format";
	let i = n.measure === "codeUnits" ? t.length : Array.from(r).length;
	return (n.measure === "codeUnits" ? r.length : i) < n.min || i > n.max ? "length" : null;
}
function dc(e, t) {
	return uc(e, t) === null;
}
function fc(e) {
	return e === null || typeof e == "string" && Array.from(e).length <= 2 && !/[\p{Cc}\p{Cf}]/u.test(e);
}
function pc(e, t, n, r) {
	return {
		id: `asphalt/${e}`,
		family: "asphalt",
		name: t,
		tags: n,
		thumbnail: {
			swatch: [r.tone, r.paint],
			stadium: "classic"
		},
		look: r
	};
}
var mc = {
	grain: .35,
	patches: .4,
	cracks: .08,
	paint: "F2F0E8",
	paintStrength: 1
}, hc = [
	pc("street-court", "Street court", ["street", "classic"], {
		tone: "41464A",
		grain: 1,
		patches: 1,
		cracks: .3,
		paint: "E0DECC",
		paintStrength: .96
	}),
	pc("street-worn", "Worn street", ["street", "worn"], {
		tone: "524E47",
		grain: 1.35,
		patches: 1.6,
		cracks: .9,
		paint: "D6CFB8",
		paintStrength: .68
	}),
	pc("fresh-blacktop", "Fresh blacktop", ["street", "pro"], {
		tone: "2C2F32",
		grain: .6,
		patches: .25,
		cracks: 0,
		paint: "F4F4EE",
		paintStrength: 1
	}),
	pc("sun-bleached", "Sun-bleached", [
		"street",
		"summer",
		"worn"
	], {
		tone: "7C7B74",
		grain: .9,
		patches: 1.2,
		cracks: .5,
		paint: "E8E0C6",
		paintStrength: .55
	}),
	pc("schoolyard", "Schoolyard", ["retro", "kids"], {
		tone: "4E5256",
		grain: 1,
		patches: 1,
		cracks: .45,
		paint: "E8C547",
		paintStrength: .9
	}),
	pc("night-street", "Night street", ["street", "night"], {
		tone: "24272B",
		grain: 1,
		patches: 1,
		cracks: .5,
		paint: "CFC8B0",
		paintStrength: .8
	}),
	pc("blue-court", "Blue court", ["court"], {
		tone: "2E5079",
		...mc
	}),
	pc("terracotta-court", "Terracotta court", ["court", "summer"], {
		tone: "8A4B36",
		...mc
	}),
	pc("green-court", "Green court", ["court"], {
		tone: "2E6B4A",
		...mc
	}),
	pc("purple-court", "Purple court", ["court", "bold"], {
		tone: "5A3B7A",
		...mc
	}),
	pc("rain-slick", "Rain-slick street", ["street", "worn"], {
		tone: "2A3138",
		grain: .5,
		patches: .3,
		cracks: .1,
		paint: "B9C6CC",
		paintStrength: .7
	}),
	pc("fine-gravel", "Fine gravel court", ["street", "training"], {
		tone: "55524A",
		grain: .2,
		patches: .15,
		cracks: .02,
		paint: "E6E2D2",
		paintStrength: .85
	})
], gc = {
	seed: 76141,
	hue: 0,
	saturation: 1,
	brightness: 1,
	warmth: 0
};
function _c(e, t, n, r, i) {
	return {
		id: `felt/${e}`,
		family: "felt",
		name: t,
		tags: n,
		thumbnail: {
			swatch: i,
			stadium: "classic"
		},
		look: {
			...gc,
			...r
		}
	};
}
var vc = [
	_c("town-roads", "Town roads", ["town", "kids"], { print: "town" }, ["6B7A3A", "2E2F2A"]),
	_c("park", "Park", ["park", "kids"], { print: "park" }, ["7E9140", "5C8FA6"]),
	_c("joga-bonito", "Joga Bonito", ["beach", "bold"], { print: "joga-bonito" }, [
		"2F7A4A",
		"F2C530",
		"2C5FA8"
	]),
	_c("sunset-beach", "Sunset beach", ["beach", "summer"], {
		print: "joga-bonito",
		seed: 2718,
		hue: 14,
		saturation: 1.08,
		brightness: .92,
		warmth: .6
	}, [
		"7A5A2E",
		"F08A3A",
		"6A3D7A"
	]),
	_c("autumn-park", "Autumn park", ["park", "seasonal"], {
		print: "park",
		seed: 33117,
		hue: 26,
		saturation: 1.05,
		brightness: .95,
		warmth: .45
	}, ["9A7A34", "B5552F"]),
	_c("winter-town", "Winter town", [
		"town",
		"seasonal",
		"winter"
	], {
		print: "town",
		seed: 90210,
		saturation: .35,
		brightness: 1.22,
		warmth: -.35
	}, ["A9B4B8", "5A6166"]),
	_c("night-town", "Night town", ["town", "night"], {
		print: "town",
		seed: 5021,
		hue: -8,
		saturation: .72,
		brightness: .62,
		warmth: -.5
	}, ["2F3A4A", "D9B94A"]),
	_c("retro-town", "Retro print", ["town", "retro"], {
		print: "town",
		seed: 1966,
		saturation: .3,
		brightness: 1.02,
		warmth: .75
	}, ["8A7650", "4A3C28"]),
	_c("dawn-park", "Dawn park", ["park", "seasonal"], {
		print: "park",
		seed: 4821,
		hue: -15,
		saturation: .85,
		brightness: 1.1,
		warmth: -.2
	}, ["6F86A8", "C98BA0"]),
	_c("carnival", "Carnival", ["beach", "bold"], {
		print: "joga-bonito",
		seed: 8842,
		hue: 40,
		saturation: 1.15,
		brightness: 1.05,
		warmth: .3
	}, [
		"E0562F",
		"2F8F6B",
		"F2C530"
	]),
	_c("harbor-town", "Harbor town", ["town", "bold"], {
		print: "town",
		seed: 6633,
		hue: -30,
		saturation: .9,
		brightness: .95,
		warmth: -.15
	}, ["3A5F7A", "9AA6AA"]),
	_c("festival-town", "Festival town", [
		"town",
		"seasonal",
		"summer"
	], {
		print: "town",
		seed: 7410,
		hue: 55,
		saturation: 1.2,
		brightness: 1.08,
		warmth: .5
	}, ["D9A23B", "7A3B5E"])
], yc = "E0E6DB";
function bc(e, t, n, r) {
	let i = {
		stripeScale: 1,
		stripeContrast: 1,
		paint: yc,
		paintStrength: .98,
		...r
	};
	return {
		id: `grass/${e}`,
		family: "grass",
		name: t,
		tags: n,
		thumbnail: {
			swatch: [i.turf, i.paint],
			stadium: "classic"
		},
		look: i
	};
}
var xc = [
	bc("classic-stripes", "Classic stripes", ["classic"], {
		pattern: "stripes",
		turf: "285B35"
	}),
	bc("natural", "Natural", ["natural"], {
		pattern: "natural",
		turf: "276236"
	}),
	bc("checkerboard", "Checkerboard", ["classic", "pro"], {
		pattern: "checker",
		turf: "22603A"
	}),
	bc("diagonal", "Diagonal", ["pro"], {
		pattern: "diagonal",
		turf: "1F6538"
	}),
	bc("crosswise", "Crosswise stripes", ["classic"], {
		pattern: "crosswise",
		turf: "2B6035"
	}),
	bc("wide-stripes", "Wide stripes", ["pro"], {
		pattern: "wide",
		turf: "1E502D",
		stripeContrast: 1.15
	}),
	bc("diamonds", "Diamonds", ["pro", "bold"], {
		pattern: "diamonds",
		turf: "21633A"
	}),
	bc("chevrons", "Chevrons", ["bold"], {
		pattern: "chevrons",
		turf: "356A2E"
	}),
	bc("waves", "Waves", ["bold"], {
		pattern: "waves",
		turf: "236442"
	}),
	bc("concentric-rings", "Concentric rings", ["bold"], {
		pattern: "rings",
		turf: "2C6532"
	}),
	bc("spiral", "Spiral", ["bold"], {
		pattern: "spiral",
		turf: "275A34"
	}),
	bc("nested-frames", "Nested rectangles", ["retro"], {
		pattern: "frames",
		turf: "2A5A33"
	})
], Sc = {
	grass: "Çim",
	asphalt: "Asfalt",
	felt: "Keçe",
	"grass/classic-stripes": "Klasik şerit",
	"grass/natural": "Doğal",
	"grass/checkerboard": "Dama",
	"grass/diagonal": "Çapraz",
	"grass/crosswise": "Enine şerit",
	"grass/wide-stripes": "Geniş şerit",
	"grass/diamonds": "Baklava",
	"grass/chevrons": "Ok başı",
	"grass/waves": "Dalga",
	"grass/concentric-rings": "İç içe halka",
	"grass/spiral": "Sarmal",
	"grass/nested-frames": "İç içe çerçeve",
	"asphalt/street-court": "Sokak sahası",
	"asphalt/street-worn": "Yıpranmış sokak",
	"asphalt/fresh-blacktop": "Yeni asfalt",
	"asphalt/sun-bleached": "Güneşte solmuş",
	"asphalt/schoolyard": "Okul bahçesi",
	"asphalt/night-street": "Gece sokağı",
	"asphalt/blue-court": "Mavi kort",
	"asphalt/terracotta-court": "Toprak rengi kort",
	"asphalt/green-court": "Yeşil kort",
	"asphalt/purple-court": "Mor kort",
	"asphalt/rain-slick": "Islak sokak",
	"asphalt/fine-gravel": "İnce çakıllı kort",
	"felt/town-roads": "Kasaba yolları",
	"felt/park": "Park",
	"felt/joga-bonito": "Joga Bonito",
	"felt/sunset-beach": "Gün batımı plajı",
	"felt/autumn-park": "Sonbahar parkı",
	"felt/winter-town": "Kış kasabası",
	"felt/night-town": "Gece kasabası",
	"felt/retro-town": "Eski baskı",
	"felt/dawn-park": "Şafak parkı",
	"felt/carnival": "Karnaval",
	"felt/harbor-town": "Liman kasabası",
	"felt/festival-town": "Festival kasabası",
	"tag:classic": "Klasik",
	"tag:natural": "Doğal",
	"tag:pro": "Profesyonel",
	"tag:bold": "Cesur",
	"tag:retro": "Retro",
	"tag:training": "Antrenman",
	"tag:worn": "Yıpranmış",
	"tag:seasonal": "Mevsimlik",
	"tag:summer": "Yaz",
	"tag:winter": "Kış",
	"tag:night": "Gece",
	"tag:street": "Sokak",
	"tag:court": "Kort",
	"tag:kids": "Çocuk",
	"tag:town": "Kasaba",
	"tag:park": "Park",
	"tag:beach": "Plaj"
}, Cc = {
	grass: "Grass",
	asphalt: "Asphalt",
	felt: "Felt carpet"
}, wc = oe({
	kind: "surface",
	families: M.map((e) => ({
		id: e,
		name: Cc[e],
		defaultVariant: se[e]
	})),
	tags: {
		classic: "Classic",
		natural: "Natural",
		pro: "Pro",
		bold: "Bold",
		retro: "Retro",
		training: "Training",
		worn: "Worn",
		seasonal: "Seasonal",
		summer: "Summer",
		winter: "Winter",
		night: "Night",
		street: "Street",
		court: "Court",
		kids: "Kids",
		town: "Town",
		park: "Park",
		beach: "Beach"
	},
	variants: [
		...xc,
		...hc,
		...vc
	],
	translations: { tr: Sc }
});
function Tc(e) {
	return wc.has(e);
}
function Ec(e, t = !1) {
	return `Unknown stadium surface: ${typeof e == "string" ? JSON.stringify(e.slice(0, 64)) : typeof e}. Expected a surface id (${M.map((e) => `${e}/…`).join(", ")}) from listSurfaces()${t ? " or null" : ""}`;
}
var Dc;
function Oc() {
	return Dc ??= Object.freeze(wc.variants.map((e) => Object.freeze({
		id: e.id,
		family: e.family,
		name: e.name,
		tags: e.tags,
		isDefault: se[e.family] === e.id
	}))), Dc;
}
var kc = (e) => /* @__PURE__ */ $(/* @__PURE__ */ Eo(), /* @__PURE__ */ uo(), /* @__PURE__ */ ho(0), /* @__PURE__ */ po(e)), Ac = kc(31), jc = /* @__PURE__ */ Do([1, 2]), Mc = /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ fo(200), /* @__PURE__ */ co((e) => !!e.trim())), Nc = /* @__PURE__ */ X({
	score: kc(99),
	minutes: kc(99),
	locked: /* @__PURE__ */ Co(),
	kickRate: /* @__PURE__ */ Z(kc(_))
}), Pc = /* @__PURE__ */ $(/* @__PURE__ */ X({
	angle: /* @__PURE__ */ Eo(),
	textColor: /* @__PURE__ */ Eo(),
	colors: /* @__PURE__ */ So(/* @__PURE__ */ Eo())
}), /* @__PURE__ */ go(({ dataset: e, addIssue: t, NEVER: n }) => {
	try {
		let { angle: t, textColor: n, colors: r } = e.value;
		return Ne(t, n, r);
	} catch {
		return t({ message: "Invalid team colors" }), n;
	}
})), Fc = (e) => /* @__PURE__ */ X({ action: /* @__PURE__ */ Y(e) }), Ic = /* @__PURE__ */ No("action", [
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("typing"),
		active: /* @__PURE__ */ Co()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("chat"),
		text: Mc
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("directChat"),
		recipientId: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ mo(1), /* @__PURE__ */ fo(128)),
		text: Mc
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("avatar"),
		avatar: /* @__PURE__ */ wo(fc)
	}),
	Fc("autoTeams"),
	Fc("clearBans"),
	Fc("start"),
	Fc("stop"),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("teamsLock"),
		locked: /* @__PURE__ */ Co()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("resetTeams"),
		team: /* @__PURE__ */ Z(jc)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("team"),
		team: /* @__PURE__ */ Do([
			0,
			1,
			2
		]),
		slot: /* @__PURE__ */ Z(Ac)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("defaultStadium"),
		name: /* @__PURE__ */ Q()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("customStadium"),
		source: /* @__PURE__ */ Q()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("surface"),
		surface: /* @__PURE__ */ To(/* @__PURE__ */ wo(Tc))
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("ban"),
		slot: Ac
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("kick"),
		slot: Ac
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("admin"),
		slot: Ac
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("mute"),
		slot: Ac,
		muted: /* @__PURE__ */ Co()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("teamColors"),
		team: jc,
		palette: /* @__PURE__ */ To(Pc)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("pause"),
		paused: /* @__PURE__ */ Z(/* @__PURE__ */ Co())
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("kickRate"),
		value: kc(_)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("settings"),
		...Nc.entries
	})
]);
function Lc(e, t) {
	let n = /* @__PURE__ */ Po(Ic, {
		...t,
		action: e
	});
	return n.success ? n.output : null;
}
var Rc = 0xe8d4a51000, zc = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= Rc;
function Bc(e, t, n = performance.now()) {
	if (zc(e) && zc(n)) return {
		version: 1,
		requestAtMs: e,
		hostNowMs: n,
		streamId: t
	};
}
var Vc = /* @__PURE__ */ new WeakMap();
function Hc(e, t, n, r = performance.now()) {
	if (r - (Vc.get(e) ?? -Infinity) < 1e4) return;
	let i = Bc(t, n, r);
	return i && Vc.set(e, r), i;
}
function Uc(e, t, n, r, i) {
	let a = e.snapshot(), o = i.relayApplied(), s = [];
	for (let e of r) {
		let r = n.predictionAcknowledgment(e.id, t);
		if (r !== void 0 && (s.push([e.id, r]), s.length === 32)) break;
	}
	return {
		type: "state",
		epoch: t,
		state: a,
		...o ? { relayApplied: o } : {},
		...s.length ? { predictionAcks: Object.fromEntries(s) } : {}
	};
}
function Wc(e, t, n, r) {
	let i = e.find((e) => e.id === t), a = e.find((e) => e.id === n);
	return !i || i.muted || !a || a.bot || t === n || !r.trim() || r.length > 200 ? null : {
		type: "directChat",
		fromId: i.id,
		fromName: i.name,
		toId: a.id,
		toName: a.name,
		text: r
	};
}
var Gc = /^[a-z][a-zA-Z0-9.]{0,63}$/, Kc = /^[a-z][a-zA-Z0-9]{0,31}$/, qc = 8, Jc = 200;
function Yc(e, t) {
	if (typeof e != "string" || !Gc.test(e)) return {};
	if (t === void 0) return { id: e };
	if (typeof t != "object" || !t || Array.isArray(t)) return {};
	let n = Object.entries(t);
	if (n.length > qc) return {};
	let r = {};
	for (let [e, t] of n) {
		if (!Kc.test(e)) return {};
		if (typeof t == "number") {
			if (!Number.isFinite(t)) return {};
			r[e] = t;
		} else if (typeof t == "string") {
			if (t.length > Jc) return {};
			r[e] = t;
		} else return {};
	}
	return {
		id: e,
		vars: r
	};
}
function Xc(e, t, n) {
	return t !== void 0 && (e.admin || !n && t === e);
}
function Zc(e, t, n) {
	return t !== void 0 && e.admin && t !== e && !n(t);
}
function Qc(e, t, n) {
	let r = e.indexOf(t);
	return r < 0 || t.team === n ? !1 : (t.team = n, e.splice(r, 1), e.push(t), !0);
}
function $c(e, t) {
	let n = e.filter((e) => e.team === 0), r = e.filter((e) => e.team === 1).length, i = e.filter((e) => e.team === 2).length;
	if (!n.length || r === i && n.length < 2) return [];
	let a = () => n.splice(t ? Math.floor(t() * n.length) : 0, 1)[0];
	return r < i ? [{
		player: a(),
		team: 1
	}] : i < r ? [{
		player: a(),
		team: 2
	}] : [{
		player: a(),
		team: 1
	}, {
		player: a(),
		team: 2
	}];
}
function el(e, t) {
	return (t ? [t] : [2, 1]).flatMap((t) => e.filter((e) => e.team === t));
}
function tl(e, t, n) {
	switch (t.action) {
		case "team": {
			let r = t.slot === void 0 ? e : n.players().find((e) => e.slot === t.slot);
			return Xc(e, r, n.locked()) && n.move(r, t.team), !0;
		}
		case "teamsLock": return e.admin && n.lock(t.locked), !0;
		case "autoTeams":
		case "resetTeams": {
			if (!e.admin) return !0;
			let r = t.action === "resetTeams" ? el(n.players(), t.team).map((e) => ({
				player: e,
				team: 0
			})) : $c(n.players());
			for (let { player: i, team: a } of r) {
				if (!n.current() || !n.players().includes(e) || !e.admin || t.action === "resetTeams" && !n.stopped()) break;
				n.players().includes(i) && ((t.action === "autoTeams" ? i.team !== 0 : i.team === 0) || n.move(i, a));
			}
			return !0;
		}
		default: return !1;
	}
}
function nl(e, t, n, r) {
	if (e.assertOpen(), ![
		0,
		1,
		2
	].includes(n)) throw Error("Invalid team");
	let i = e.players.byId(t);
	if (!i) return;
	let a = i.team;
	if (!e.players.assignTeam(i, n)) return;
	e.intelligence.removePlayer(i.id), e.commentary.removePlayer(i.id) && e.network.broadcast({
		type: "commentary-config",
		config: e.commentary.snapshot()
	}), e.command("team", i.slot, n), e.match.recordOrder(e.players.all.map((e) => e.slot)), e.syncLobby();
	let o = e.publicPlayer(i), s = e.publicOrNull(r);
	e.publishPlayerRetirement(i, a, "player-changed-team"), e.invoke("onPlayerTeamChange", e.hooks.onPlayerTeamChange, o, s);
}
function rl(e, t, n) {
	e.assertOpen();
	let r = e.players.byId(t);
	r && r.admin !== !!n && (r.admin = !!n, e.syncLobby(), e.invoke("onPlayerAdminChange", e.hooks.onPlayerAdminChange, e.publicPlayer(r), null));
}
function il(e, t, n, r) {
	if (e.assertOpen(), !Number.isInteger(t) || typeof n != "boolean") throw Error("Invalid player mute");
	let i = e.players.byId(t);
	i && !e.isHost(i) && !!i.muted !== n && (i.muted = n, e.syncLobby(), e.invoke("onPlayerMuteChange", e.hooks.onPlayerMuteChange, e.publicPlayer(i), r));
}
function al(e, t, n) {
	e.assertOpen(), e.locked !== !!t && (e.locked = !!t, e.syncLobby(), e.invoke("onTeamsLockChange", e.hooks.onTeamsLockChange, e.locked, n));
}
function ol(e, t, n) {
	if (e.assertOpen(), t !== 1 && t !== 2) throw Error("Invalid team");
	JSON.stringify(e.teamStyles[t - 1]) !== JSON.stringify(n) && (e.teamStyles[t - 1] = n, e.match.recordStyles(e.teamStyles), e.syncLobby());
}
function sl(e, t, n, r, i) {
	let a = Ne(n, r, i);
	a.angle = ((256 * n / 360 | 0) & 255) * (360 / 256), ol(e, t, a);
}
function cl(e, t, n) {
	if (e.assertOpen(), !Array.isArray(t) || t.length > 32 || t.some((e) => !Number.isSafeInteger(e) || e < 0) || typeof n != "boolean") throw Error("Invalid player order");
	let r = new Set(t), i = [...r].flatMap((t) => {
		let n = e.players.byId(t);
		return n ? [n] : [];
	}), a = e.players.all.filter((e) => !r.has(e.id)), o = n ? [...i, ...a] : [...a, ...i];
	e.players.reorder(o) && (e.match.recordOrder(o.map((e) => e.slot)), e.syncLobby());
}
function ll(e, t, n) {
	if (e.assertOpen(), !fc(n)) throw Error("Avatar must be null or at most two visible characters.");
	let r = e.players.byId(t);
	r && (r.avatarOverride = n, e.match.recordPlayer(r.slot, r.name, n ?? r.avatar), e.syncLobby());
}
function ul(e, t, n) {
	if (e.assertOpen(), !e.stopped()) return;
	Me(t);
	let r = ++e.stadiumSelection;
	if (e.match.finishRecording("Stadium changed"), e.assertOpen(), e.stopped()) {
		if (r !== e.stadiumSelection) throw Error("Stadium selection superseded");
		e.engine.load(t), e.commentaryAnalysis.configure(e.engine, null), e.xg.resetForStadium(e.engine), e.intelligence.resetForStadium(e.engine);
		for (let t of e.players.all) e.engine.setTeam(t.slot, t.team);
		e.epoch = e.epoch + 1 & 65535, e.factStream.rebase(e.engine, e.epoch), e.intelligence.reset(), e.matchStats.reset(), e.matchStats.bindArena(e.engine.stadium.width, e.engine.stadium.height), e.inputs.reset(), e.network.broadcast({
			type: "stadium",
			epoch: e.epoch,
			source: t,
			state: e.engine.snapshot()
		}), e.invoke("onStadiumChange", e.hooks.onStadiumChange, e.engine.stadium.name, n);
	}
}
function dl(e, t, n = null) {
	if (e.assertOpen(), t !== null && !Tc(t)) throw Error(Ec(t, !0));
	e.surface !== t && (e.surface = t, e.match.recordSurface(t), e.syncLobby(), e.invoke("onSurfaceChange", e.hooks.onSurfaceChange, t, n));
}
async function fl(e, t) {
	if (e.assertOpen(), !e.stopped()) return;
	let n = ++e.stadiumSelection, r = await e.runtime.loadStadium(t);
	if (e.assertOpen(), n !== e.stadiumSelection) throw Error("Stadium selection superseded");
	ul(e, r, null);
}
var pl = "You are muted in this room.", ml = "Message not sent. Please wait a moment before sending again.";
function hl({ room: e, peer: t, actor: n }, r, i) {
	return !n.muted && e.traffic.allow(t.id, "chat") ? !1 : (e.traffic.allow(t.id, "feedback") && e.network.control(t, {
		type: "chatError",
		rejectedText: r,
		recipientId: i,
		text: n.muted ? pl : ml,
		...Yc(n.muted ? "host.muted" : "host.throttled")
	}), !0);
}
var gl = ({ room: e, actor: t }) => !e.closed && e.players.has(t);
function _l(e, t) {
	let { room: n, peer: r, actor: i } = e;
	n.traffic.allow(r.id, "typing") && n.network.broadcast({
		type: "typing",
		playerId: i.peerId,
		active: t.active && !i.muted
	});
}
function vl(e, t) {
	let { room: n, peer: r, actor: i } = e;
	if (hl(e, t.text, t.recipientId)) return;
	let a = Wc(n.players.all.map((e) => ({
		...e,
		id: e.peerId
	})), r.id, t.recipientId, t.text);
	if (!a) {
		n.network.control(r, {
			type: "directChatError",
			recipientId: t.recipientId,
			text: "This player is no longer available.",
			...Yc("host.directRecipientGone")
		});
		return;
	}
	let o = n.players.byPeer(a.toId);
	if (!o) return;
	let s = !1, c = n.invoke("onPlayerDirectChat", () => {
		let e = n.hooks.onPlayerDirectChat?.(n.publicPlayer(i), n.publicPlayer(o), a.text);
		return s = !0, e;
	});
	if (!(!s || c instanceof Promise || c === !1 || !gl(e) || i.muted || !n.players.has(o))) for (let e of [a.fromId, a.toId]) {
		let t = n.network.peers.get(e);
		t && n.network.control(t, a);
	}
}
function yl(e, t) {
	let { room: n, actor: r } = e;
	hl(e, t.text, "") || (n.invoke("onPlayerActivity", n.hooks.onPlayerActivity, n.publicPlayer(r)), gl(e) && n.invoke("onPlayerChat", n.hooks.onPlayerChat, n.publicPlayer(r), t.text) !== !1 && gl(e) && !r.muted && n.network.broadcast({
		type: "chat",
		playerId: r.peerId,
		name: r.name,
		text: t.text
	}));
}
function bl({ room: e, actor: t }, n) {
	t.avatar = n.avatar, e.match.recordPlayer(t.slot, t.name, t.avatarOverride ?? t.avatar), e.syncLobby();
}
function xl(e, t) {
	let { room: n, peer: r, actor: i } = e, a = (t, i) => {
		gl(e) && n.network.control(r, {
			type: "stadiumResult",
			text: t,
			...Yc(i)
		});
	};
	if (!i.admin || !n.stopped()) {
		a("Stadium change rejected: admin permission and a stopped match are required.", "host.stadiumRejected");
		return;
	}
	let o = ++n.stadiumSelection;
	(t.action === "defaultStadium" ? n.runtime.loadStadium(t.name) : Promise.resolve(t.source)).then((t) => {
		if (gl(e)) {
			if (o !== n.stadiumSelection || !i.admin || !n.stopped()) {
				a("Stadium change cancelled: room state or permissions changed.", "host.stadiumCancelled");
				return;
			}
			ul(n, t, n.publicPlayer(i)), a("Stadium applied.", "host.stadiumApplied");
		}
	}).catch(() => a("Stadium could not be loaded. Please try again.", "host.stadiumLoadFailedRetry"));
}
function Sl({ room: e, actor: t }, n) {
	let r = e.players.bySlot(n);
	return Zc(t, r, (t) => e.isHost(t)) ? r : void 0;
}
function Cl({ room: e, peer: t }, n, r) {
	!e.closed && e.network.peers.has(t.id) && e.network.control(t, {
		type: "moderationResult",
		text: n,
		...Yc(r)
	});
}
function wl(e, t) {
	let { room: n, actor: r } = e, i = Sl(e, t);
	i && ec(n, i.id, "Removed by admin", n.publicPlayer(r)).then(() => Cl(e, "Player banned.", "host.playerBanned")).catch((t) => t instanceof Error ? Cl(e, t.message) : Cl(e, "Moderation failed.", "host.moderationFailed"));
}
function Tl(e, t, n) {
	Gi(e, ...y(t), e.publicPlayer(n));
}
function El({ room: e, actor: t }, n) {
	e.stopped() && (Ki(e, n.score), qi(e, n.minutes), al(e, n.locked, e.publicPlayer(t)), !e.closed && n.kickRate !== void 0 && n.kickRate !== e.engine.kickRate && Tl(e, n.kickRate, t));
}
function Dl(e, t) {
	let { room: n, actor: r } = e;
	switch (t.action) {
		case "mute": {
			let i = Sl(e, t.slot);
			i && il(n, i.id, t.muted, n.publicPlayer(r));
			return;
		}
		case "ban": return wl(e, t.slot);
		case "clearBans": return Cl(e, "Only the room owner can clear bans.", "host.onlyOwnerClearsBans");
		case "teamColors": return ol(n, t.team, t.palette);
		case "surface": return dl(n, t.surface, n.publicPlayer(r));
		case "kickRate": return Tl(n, t.value, r);
		case "start": return Hi(n, r);
		case "stop": return Ui(n, r);
		case "pause": return Wi(n, t.paused === void 0 ? !n.engine.paused : t.paused, n.publicPlayer(r));
		case "settings": return El(e, t);
		case "kick": {
			let i = Sl(e, t.slot);
			i && $s(n, i.id, "Removed by host", n.publicPlayer(r));
			return;
		}
	}
}
function Ol(e, t, n, r) {
	let i = {
		room: e,
		peer: t,
		actor: n
	};
	switch (r.action) {
		case "typing": return _l(i, r);
		case "directChat": return vl(i, r);
		case "chat": return yl(i, r);
		case "avatar": return bl(i, r);
		case "defaultStadium":
		case "customStadium": return xl(i, r);
	}
	!tl(n, r, {
		players: () => e.players.all,
		current: () => !e.closed,
		stopped: () => e.stopped(),
		locked: () => e.locked,
		move: (t, r) => nl(e, t.id, r, n),
		lock: (t) => al(e, t, e.publicPlayer(n))
	}) && n.admin && Dl(i, r);
}
var kl = /* @__PURE__ */ new Set([
	"chat",
	"directChat",
	"typing"
]);
function Al(e, t) {
	return e.traffic.allow(t.id, "message") ? !0 : (e.network.remove(t.id), !1);
}
function jl(e, t) {
	return t.version === 1 && t.engine === pt && dc("nickname", t.name) && e.name !== void 0 && t.name.trim() === e.name;
}
function Ml(e, t, n) {
	let r = jl(t, n) ? e.players.freeSlot() : void 0;
	if (!jl(t, n) || r === void 0) {
		e.network.remove(t.id);
		return;
	}
	let i = e.players.add({
		slot: r,
		peerId: t.id,
		name: n.name.trim(),
		team: 0,
		admin: !1
	});
	e.network.admit(t), e.match.recordPlayer(i.slot, i.name), e.command("join", r, 0), e.turfState.capture(e.engine, e.surface), e.network.control(t, {
		type: "welcome",
		features: ["directChat", "playerConversation"],
		...n.turfVersion === 1 ? { turf: e.turfState.checkpoint() } : {},
		soundStream: e.soundStream.checkpoint(),
		commentaryStream: e.factStream.checkpoint(),
		commentaryClock: Bc(n.commentaryClock, e.factStream.streamId),
		commentary: e.commentary.snapshot(),
		epoch: e.epoch,
		roomName: e.roomName,
		engine: pt,
		slot: r,
		stadium: e.engine.source,
		state: e.engine.snapshot(),
		relayApplied: e.match.relayApplied(),
		players: e.players.roster(),
		teamStyles: e.teamStyles,
		surface: e.surface,
		locked: e.locked
	}), e.network.control(t, {
		type: "commentary-config",
		config: e.commentary.snapshot(Date.now(), !0)
	}), e.syncLobby(), e.invoke("onPlayerJoin", e.hooks.onPlayerJoin, e.publicPlayer(i));
}
function Nl(e) {
	return {
		control(t, n) {
			if (!Al(e, t) || !n || typeof n != "object") return;
			let r = n, i = e.players.byPeer(t.id);
			if (r.type === "join" && !i) return Ml(e, t, r);
			if (i && r.type === "commentary-clock") {
				let n = Hc(t, r.requestAtMs, e.factStream.streamId);
				n && e.network.control(t, {
					type: "commentary-clock",
					clock: n
				});
				return;
			}
			if (i && r.type === "resync") {
				e.traffic.allow(t.id, "action") && e.network.control(t, Uc(e.engine, e.epoch, e.inputs, [t], e.match));
				return;
			}
			if (i && r.type === "relay") {
				t.relay = r.enabled === !0;
				return;
			}
			if (!i || r.type !== "action" || !(typeof r.action == "string" && kl.has(r.action)) && !e.traffic.allow(t.id, "action")) return;
			let a = Lc(r.action, r);
			a && Ol(e, t, i, a);
		},
		fast(t, n) {
			if (!Al(e, t)) return;
			let r = e.players.byPeer(t.id);
			if (!r) return;
			let i = e.inputs.accept(t.id, r.slot, n, e.epoch, (t) => e.invoke("onPlayerInput", e.hooks.onPlayerInput, e.publicPlayer(r), t));
			i !== void 0 && i && e.invoke("onPlayerActivity", e.hooks.onPlayerActivity, e.publicPlayer(r));
		},
		leave(t) {
			e.traffic.delete(t);
			let n = e.players.byPeer(t);
			if (!n) return;
			e.match.recordPlayer(n.slot, null), e.command("team", n.slot, 0), e.players.removePeer(t), e.intelligence.removePlayer(n.id, n.team !== 0), e.commentary.removePlayer(n.id) && e.network.broadcast({
				type: "commentary-config",
				config: e.commentary.snapshot()
			}), e.inputs.remove(t), e.syncLobby();
			let r = e.publicPlayer(n);
			e.publishPlayerRetirement(n, n.team, "player-left-room"), e.invoke("onPlayerLeave", e.hooks.onPlayerLeave, r);
		},
		allowStadiumUpload(t) {
			return !!e.players.byPeer(t.id)?.admin && e.stopped() && e.traffic.allow(t.id, "message");
		}
	};
}
var Pl = class {
	committed = /* @__PURE__ */ new Map();
	maxLeadTicks;
	constructor(e = 600) {
		this.maxLeadTicks = Math.round(e * U / 1e3);
	}
	accept(e, t, n, r, i) {
		if (n > i + this.maxLeadTicks) return;
		let a = this.committed.get(e);
		if (!(a !== void 0 && n <= a)) return this.committed.set(e, n), {
			tick: n,
			slot: t,
			keys: r
		};
	}
	remove(e) {
		this.committed.delete(e);
	}
	reset() {
		this.committed.clear();
	}
}, Fl = 250, Il = 100, Ll = class {
	match;
	now;
	peers = /* @__PURE__ */ new Map();
	accepted = /* @__PURE__ */ new Map();
	ticked = /* @__PURE__ */ new Map();
	claims = new Pl();
	closed = !1;
	accepting = 0;
	reentered = !1;
	input = {
		seq: 0,
		keys: 0,
		epoch: 0,
		history: []
	};
	tickedInput = {
		seq: 0,
		tick: 0,
		epoch: 0,
		changes: []
	};
	constructor(e, t = () => performance.now()) {
		this.match = e, this.now = t;
	}
	accept(e, t, n, r, i) {
		if (!this.closed) {
			this.accepting++ && (this.reentered = !0);
			try {
				return this.acceptPacket(e, t, n, r, i);
			} finally {
				if (--this.accepting === 0) {
					if (this.reentered) for (let e of this.peers.values()) e.committed = void 0;
					this.reentered = !1;
				}
			}
		}
	}
	acceptPacket(e, t, n, r, i) {
		if (new Uint8Array(n)[0] === da.TICKED_INPUT) return this.acceptTicked(e, t, n, r, i);
		let a = Ca(n, this.input);
		if (a.epoch !== r || !this.fresh(e, a.seq, r)) return;
		let o = a.seq;
		this.recordSequence(e, a.seq, r), this.leaveTicked(e);
		let s = this.peers.get(e), c = s ? Math.min(a.history.length, a.seq - s.seq >>> 0) : 1, l = s?.keys ?? 0, u = !1, f = this.now(), p = s ?? {
			seq: o,
			keys: a.keys,
			silent: 0,
			checked: f,
			committed: void 0
		};
		s ? (s.seq = a.seq, s.keys = a.keys, Rl(s, f)) : this.peers.set(e, p);
		let m = this.match.engine, h = m.index(t) * 18 + d.INPUT;
		for (let e = c - 1; e >= 0; e--) {
			let n = a.history[e], r = n !== l;
			if (u ||= r, l = n, this.closed) return;
			if (r && !i) {
				this.match.command("input", t, n);
				continue;
			}
			let o = m.data[h];
			o !== n && (this.match.command("input", t, n), i?.(o));
		}
		if (!this.closed) return !this.reentered && this.peers.get(e) === p && p.seq === o && this.accepted.get(e)?.epoch === r && (p.committed = o), u;
	}
	acceptTicked(e, t, n, r, i) {
		let a = Ia(n, this.tickedInput);
		if (a.epoch !== r || !this.fresh(e, a.seq, r)) return;
		let o = this.match.engine.tick + 1;
		if (!this.claims.accept(e, t, a.tick, 0, o - 1)) return;
		this.recordSequence(e, a.seq, r), this.peers.delete(e);
		let s = this.match.engine, c = s.index(t) * 18 + d.INPUT, l = this.ticked.get(e), u = !l;
		l || (l = {
			slot: t,
			lastChange: -1,
			held: s.data[c],
			silent: 0,
			checked: 0,
			arrival: 0,
			queue: []
		}, this.ticked.set(e, l)), l.slot = t, Rl(l, this.now()), l.arrival = a.tick - o, l.applied = i;
		let f = l.queue.at(-1)?.keys ?? l.held, p = !1, m = !1;
		for (let e = u ? 0 : a.changes.length - 1; e >= 0; e--) {
			let t = a.changes[e];
			if (!(e > 0 && t.tick === a.changes[e - 1].tick) && !(t.tick <= l.lastChange) && (l.lastChange = t.tick, p ||= t.keys !== f, f = t.keys, t.tick <= o ? (this.commit(l, t.keys), m = !0) : l.queue.push({
				tick: t.tick,
				keys: t.keys
			}), this.closed)) return;
		}
		if (!m && (!l.queue.length || l.queue[0].tick > o) && this.commit(l, l.held), !this.closed) return p;
	}
	release(e) {
		if (!this.closed) for (let t of this.ticked.values()) for (; t.queue.length && t.queue[0].tick <= e;) {
			let e = t.queue.shift();
			if (e && this.commit(t, e.keys), this.closed) return;
		}
	}
	commit(e, t) {
		e.held = t;
		let n = this.match.engine, r = n.data[n.index(e.slot) * 18 + d.INPUT];
		r !== t && (this.match.command("input", e.slot, t), e.applied?.(r));
	}
	leaveTicked(e) {
		let t = this.ticked.get(e);
		if (t) {
			this.ticked.delete(e), this.claims.remove(e);
			for (let e of t.queue) this.commit(t, e.keys);
		}
	}
	arrival(e) {
		return this.ticked.get(e)?.arrival ?? -128;
	}
	expire(e, t, n = this.now()) {
		if (this.closed) return;
		let r = this.peers.get(e) ?? this.ticked.get(e);
		if (!r) return;
		r.silent += Math.max(0, Math.min(Il, n - r.checked)), r.checked = Math.max(r.checked, n);
		let i = this.match.engine;
		r.silent > Fl && i.data[i.index(t) * 18 + d.INPUT] !== 0 && this.match.command("input", t, 0);
	}
	acknowledgment(e) {
		return this.accepted.get(e)?.seq ?? 0;
	}
	predictionAcknowledgment(e, t) {
		if (this.closed || this.accepting) return;
		let n = this.peers.get(e), r = this.accepted.get(e);
		if (n && r?.epoch === t && n.committed === n.seq && n.seq === r.seq) return n.seq;
	}
	fresh(e, t, n) {
		let r = this.accepted.get(e);
		return r ? r.epoch === n ? wa(t, r.seq) : (this.remove(e), !0) : !0;
	}
	recordSequence(e, t, n) {
		let r = this.accepted.get(e);
		r ? r.seq = t : this.accepted.set(e, {
			seq: t,
			epoch: n
		});
	}
	remove(e) {
		this.accepted.delete(e), this.peers.delete(e), this.ticked.delete(e), this.claims.remove(e);
	}
	reset() {
		this.accepted.clear(), this.peers.clear(), this.ticked.clear(), this.claims.reset();
	}
	close() {
		this.closed = !0, this.reset();
	}
};
function Rl(e, t) {
	e.silent = 0, e.checked = Math.max(e.checked, t);
}
var zl = {
	input: {
		slot: 31,
		value: 31
	},
	team: {
		slot: 31,
		value: 2
	},
	start: {
		slot: 31,
		value: 31
	},
	stop: {
		slot: 31,
		value: 31
	},
	pause: {
		slot: 31,
		value: 1
	},
	scoreLimit: {
		slot: 31,
		value: 99
	},
	timeLimit: {
		slot: 31,
		value: 5940
	},
	kickRate: {
		slot: 31,
		value: _
	},
	join: {
		slot: 31,
		value: 0
	},
	disc: {
		slot: 95,
		value: 0
	}
};
function Bl(e, t) {
	switch (t.kind) {
		case "disc":
			if (!t.properties) throw new K("invalid", "Missing replay disc properties");
			e.applyDiscProperties(t.slot, t.properties);
			break;
		case "input":
			e.input(t.slot, t.value);
			break;
		case "join":
			e.joinPlayer(t.slot);
			break;
		case "team":
			e.setTeam(t.slot, t.value);
			break;
		case "start":
			e.start();
			break;
		case "stop":
			e.stop();
			break;
		case "scoreLimit":
			e.scoreLimit = t.value;
			break;
		case "timeLimit":
			e.timeLimit = t.value;
			break;
		case "kickRate":
			e.setKickRateLimit(...y(t.value));
			break;
		case "pause": e.setPaused(!!t.value);
	}
}
function Vl(e) {
	let t = JSON.stringify(e), n = 2166136261;
	for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return (n >>> 0).toString(16).padStart(8, "0");
}
var Hl = [
	"input",
	"team",
	"start",
	"stop",
	"pause",
	"scoreLimit",
	"timeLimit",
	"kickRate",
	"join",
	"disc"
], Ul = new TextEncoder(), Wl = new TextDecoder("utf-8", { fatal: !0 });
function Gl(e) {
	return ui(Kl(e));
}
function Kl(e) {
	let { commands: t, ...n } = e, r = 0, i = e.checkpoints.map((e) => {
		let t = e.state.discs;
		if (!Array.isArray(t) || t.length > 1728 || t.some((e) => !Number.isFinite(e))) throw new K("invalid", "Invalid checkpoint discs");
		return r += t.length * 8, {
			...e,
			state: {
				...e.state,
				discs: t.length
			}
		};
	});
	if (i.length > 721) throw new K("invalid", "Too many replay checkpoints");
	let a = Ul.encode(JSON.stringify({
		...n,
		checkpoints: i
	}));
	if (t.length > 5e5 || a.length + 16 > 33554432) throw new K("invalid", "Replay exceeds bounds");
	let o = t.length * 12 + t.filter((e) => e.kind === "disc").length * 106, s = new Uint8Array(Math.min(ci, o)), c = new DataView(s.buffer), l = (e) => {
		if (u + e > s.length) throw new K("invalid", "Replay exceeds bounds");
	}, u = 0, d = e.initial.tick, f = (e) => {
		if (!Number.isInteger(e) || e < 0 || e > 4294967295) throw new K("invalid", "Invalid replay integer");
		do {
			l(1);
			let t = Math.floor(e / 128);
			s[u++] = e % 128 | (t ? 128 : 0), e = t;
		} while (e);
	};
	for (let e of t) {
		let t = Hl.indexOf(e.kind);
		if (e.kind === "join" && e.value !== 0 || e.kind === "team" && e.value > 2) throw new K("invalid", "Invalid replay team command");
		if (t < 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31)) throw new K("invalid", "Invalid replay command");
		if (f(e.tick - d), l(1), s[u++] = t, f(e.slot), f(e.value), e.kind === "disc") {
			let t = g(e.properties), n = 0;
			h.forEach(([e], r) => {
				t[e] !== void 0 && (n |= 1 << r);
			}), f(n);
			for (let [e] of h) {
				let n = t[e];
				n !== void 0 && (l(8), c.setFloat64(u, n, !0), u += 8);
			}
		}
		d = e.tick;
	}
	let p = 16 + a.length + r + u;
	if (p > 33554432) throw new K("tooLarge", "Replay exceeds 32 MB");
	let m = new Uint8Array(p), _ = new DataView(m.buffer);
	m.set([
		66,
		50,
		68,
		49,
		1,
		0,
		0,
		0
	]), _.setUint32(8, a.length, !0), _.setUint32(12, t.length, !0), m.set(a, 16);
	let v = 16 + a.length;
	for (let t of e.checkpoints) for (let e of t.state.discs) _.setFloat64(v, e, !0), v += 8;
	return m.set(s.subarray(0, u), v), m;
}
function ql(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e), n = t[0] === 66 && t[1] === 50 && t[2] === 68 && t[3] === 49;
	if (n && t.length > 33554432) throw new K("tooLarge", "Replay exceeds 32 MB");
	return Jl(n ? t : di(t));
}
function Jl(e) {
	if (e.length < 16 || e[0] !== 66 || e[1] !== 50 || e[2] !== 68 || e[3] !== 49 || e[4] !== 1 || e[5] || e[6] || e[7]) throw new K("invalid", "Invalid packed replay header");
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = t.getUint32(8, !0), r = t.getUint32(12, !0);
	if (n > e.length - 16 || r > 5e5 || r > (e.length - 16 - n) / 3) throw new K("invalid", "Invalid packed replay bounds");
	let i = JSON.parse(Wl.decode(e.subarray(16, 16 + n)));
	if (!i || !Number.isSafeInteger(i.initial?.tick) || i.initial.tick < 0) throw new K("invalid", "Invalid replay initial tick");
	i.commands = [];
	let a = 16 + n, o = i.initial.tick;
	if (!Array.isArray(i.checkpoints) || i.checkpoints.length > 721) throw new K("invalid", "Invalid packed checkpoints");
	let s = i.checkpoints.map((e) => {
		let t = e?.state?.discs;
		if (typeof t != "number" || !Number.isInteger(t) || t < 0 || t > 1728) throw new K("invalid", "Invalid checkpoint disc count");
		return t;
	});
	if (s.reduce((e, t) => e + t * 8, 0) > e.length - a - r * 3) throw new K("invalid", "Truncated checkpoint discs");
	for (let [e, n] of i.checkpoints.entries()) {
		let r = s[e], i = Array(r);
		for (let e = 0; e < r; e++) {
			let n = t.getFloat64(a, !0);
			if (!Number.isFinite(n)) throw new K("invalid", "Nonfinite checkpoint disc");
			i[e] = n, a += 8;
		}
		n.state.discs = i;
	}
	let c = () => {
		let t = 0;
		for (let n = 0; n <= 28; n += 7) {
			if (a >= e.length) throw new K("invalid", "Truncated replay command");
			let r = e[a++];
			if (n === 28 && r > 15) throw new K("invalid", "Replay integer overflow");
			if (t += (r & 127) * 2 ** n, !(r & 128)) {
				if (n && r === 0) throw new K("invalid", "Noncanonical replay integer");
				return t;
			}
		}
		throw new K("invalid", "Invalid replay integer");
	};
	for (let n = 0; n < r; n++) {
		if (o += c(), !Number.isSafeInteger(o) || a >= e.length) throw new K("invalid", "Invalid replay tick");
		let n = Hl[e[a++]];
		if (!n) throw new K("invalid", "Unknown replay command");
		let r = c(), s = c();
		if (n === "disc") {
			let l = c();
			if (l > 8191) throw new K("invalid", "Invalid disc property mask");
			let u = {};
			h.forEach(([n], r) => {
				if (l & 1 << r) {
					if (a + 8 > e.length) throw new K("invalid", "Truncated disc properties");
					u[n] = t.getFloat64(a, !0), a += 8;
				}
			}), i.commands.push({
				tick: o,
				kind: n,
				slot: r,
				value: s,
				properties: g(u)
			});
			continue;
		}
		i.commands.push({
			tick: o,
			kind: n,
			slot: r,
			value: s
		});
	}
	if (a !== e.length) throw new K("invalid", "Trailing replay command data");
	return i;
}
var Yl = 31457280, Xl = 5e5, Zl = 4096, Ql = U * 5, $l = class {
	replay;
	playerOrder = [];
	lastInputs = /* @__PURE__ */ new Map();
	bytes = 0;
	full = !1;
	canRecord(e) {
		return !this.full && e.tick - this.replay.initial.tick < U * 3600;
	}
	constructor(e, t = [], n = [null, null], r = null) {
		let i = e.snapshot();
		this.playerOrder = t.map((e) => e.slot), this.replay = {
			magic: "B2DR",
			version: 1,
			engine: pt,
			stadium: e.source,
			initial: i,
			commands: [],
			checkpoints: [],
			roster: t.map((e) => ({
				...e,
				tick: i.tick
			})),
			styles: [{
				tick: i.tick,
				teams: Pe(n)
			}],
			orders: [{
				tick: i.tick,
				slots: [...this.playerOrder]
			}],
			...r ? { surfaces: [{
				tick: i.tick,
				surface: r
			}] } : {},
			end: i.tick,
			finalHash: Vl(i)
		}, this.bytes = new TextEncoder().encode(JSON.stringify(this.replay)).length;
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + d.INPUT]);
	}
	reserve(e) {
		let t = new TextEncoder().encode(JSON.stringify(e)).length + 1;
		return this.full || this.bytes + t > Yl ? (this.full = !0, !1) : (this.bytes += t, !0);
	}
	player(e, t, n, r) {
		let i = {
			tick: e,
			slot: t,
			name: n,
			avatar: r
		};
		return this.replay.roster.length >= Zl || !this.reserve(i) ? (this.full = !0, !1) : (this.replay.roster.push(i), n === null ? this.order(e, this.playerOrder.filter((e) => e !== t)) : this.playerOrder.includes(t) ? !0 : this.order(e, [...this.playerOrder, t]));
	}
	style(e, t) {
		let n = {
			tick: e,
			teams: Pe(t)
		}, r = this.replay.styles;
		return r.length >= Zl || !this.reserve(n) ? (this.full = !0, !1) : (r.push(n), !0);
	}
	commentary(e, t) {
		let n = {
			tick: e,
			policy: structuredClone(t)
		}, r = this.replay.commentary ?? [];
		return r.length >= Zl || !this.reserve(n) ? (this.full = !0, !1) : (r.push(n), this.replay.commentary = r, !0);
	}
	surface(e, t) {
		let n = this.replay.surfaces ?? [];
		if ((n.at(-1)?.surface ?? null) === t) return !0;
		let r = {
			tick: e,
			surface: t
		};
		return n.length >= Zl || !this.reserve(r) ? (this.full = !0, !1) : (n.push(r), this.replay.surfaces = n, !0);
	}
	order(e, t) {
		if (t.length === this.playerOrder.length && t.every((e, t) => e === this.playerOrder[t])) return !0;
		let n = {
			tick: e,
			slots: [...t]
		}, r = this.replay.orders;
		return r.length >= Zl || !this.reserve(n) ? (this.full = !0, !1) : (this.playerOrder = [...t], r.push(n), !0);
	}
	command(e) {
		return e.kind === "input" && this.lastInputs.get(e.slot) === e.value ? !0 : this.replay.commands.length >= Xl || !this.reserve(e) ? (this.full = !0, !1) : (e.kind === "input" && this.lastInputs.set(e.slot, e.value), (e.kind === "team" || e.kind === "join") && this.lastInputs.set(e.slot, 0), e.kind === "start" && this.lastInputs.clear(), this.replay.commands.push(e.kind === "disc" ? {
			...e,
			properties: g(e.properties)
		} : { ...e }), !0);
	}
	step(e) {
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + d.INPUT]);
		if (e.tick % Ql === 0) {
			let t = e.snapshot(), n = {
				tick: e.tick,
				state: t,
				hash: Vl(t)
			};
			this.reserve(n) && this.replay.checkpoints.push(n);
		}
		this.replay.end = e.tick;
	}
	pack(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Vl(e.snapshot()), Kl(this.replay);
	}
	finish(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Vl(e.snapshot()), new Blob([Gl(this.replay)], { type: "application/x-ball2d-replay" });
	}
}, eu = 5e5, tu = 721, nu = 4096, ru = U * 3600, iu = 16384, au = (e, t, n) => Number.isInteger(e) && e >= t && e <= n;
function ou(e) {
	if (e.magic !== "B2DR" || e.version !== 1 || e.engine !== pt) throw new K("unsupported", "Unsupported replay engine/version");
	if (!Array.isArray(e.commands) || e.commands.length > eu || !Array.isArray(e.checkpoints) || e.checkpoints.length > tu || !Number.isInteger(e.end) || e.end < e.initial.tick || e.end - e.initial.tick > ru) throw new K("invalid", "Invalid replay bounds");
}
function su(e) {
	let t = e.initial.tick;
	for (let n of e.commands) {
		let r = Object.hasOwn(zl, n.kind) ? zl[n.kind] : void 0;
		if (!r || !au(n.tick, t, e.end) || !au(n.slot, 0, r.slot) || !au(n.value, 0, r.value)) throw new K("invalid", "Invalid replay command");
		n.kind === "disc" && (n.properties = g(n.properties)), t = n.tick;
	}
}
function cu(e) {
	if (!Array.isArray(e.roster) || e.roster.length > nu) throw new K("invalid", "Invalid replay roster");
	let t = e.initial.tick;
	for (let n of e.roster) {
		if (!au(n.tick, t, e.end) || !au(n.slot, 0, 31) || n.name !== null && (typeof n.name != "string" || n.name.length > 24) || n.avatar !== void 0 && !fc(n.avatar)) throw new K("invalid", "Invalid roster event");
		t = n.tick;
	}
}
function lu(e) {
	if (e.styles === void 0) return;
	if (!Array.isArray(e.styles) || e.styles.length > nu) throw new K("invalid", "Invalid replay styles");
	let t = e.initial.tick;
	for (let n of e.styles) {
		if (!n || !au(n.tick, t, e.end) || n.teams === void 0) throw new K("invalid", "Invalid replay style");
		n.teams = Pe(n.teams), t = n.tick;
	}
}
function uu(e) {
	if (e.orders === void 0) return;
	if (!Array.isArray(e.orders) || e.orders.length > nu) throw new K("invalid", "Invalid replay orders");
	let t = e.initial.tick;
	for (let n of e.orders) {
		if (!n || !au(n.tick, t, e.end) || !Array.isArray(n.slots) || n.slots.length > 32 || n.slots.some((e) => !au(e, 0, 31)) || new Set(n.slots).size !== n.slots.length) throw new K("invalid", "Invalid replay order");
		t = n.tick;
	}
}
function du(e) {
	if (e.commentary === void 0) return;
	if (!Array.isArray(e.commentary) || e.commentary.length > nu) throw Error("Invalid replay commentary");
	let t = e.initial.tick;
	for (let n of e.commentary) {
		if (!n || !au(n.tick, t, e.end) || !n.policy || typeof n.policy != "object" || Array.isArray(n.policy) || JSON.stringify(n.policy).length > iu) throw Error("Invalid replay commentary");
		t = n.tick;
	}
}
function fu(e) {
	if (e.surfaces === void 0) return;
	if (!Array.isArray(e.surfaces) || e.surfaces.length > nu) throw new K("invalid", "Invalid replay surfaces");
	let t = e.initial.tick;
	for (let n of e.surfaces) {
		if (!n || !au(n.tick, t, e.end) || n.surface !== null && !N(n.surface)) throw new K("invalid", "Invalid replay surface");
		t = n.tick;
	}
}
function pu(e) {
	let t = e.initial.tick;
	for (let n of e.checkpoints) {
		if (!au(n.tick, t + 1, e.end) || n.state.tick !== n.tick || typeof n.hash != "string") throw new K("invalid", "Invalid checkpoint");
		t = n.tick;
	}
}
function mu(e) {
	let t = ql(e);
	return ou(t), su(t), cu(t), lu(t), uu(t), du(t), fu(t), pu(t), t;
}
async function hu(e) {
	if (e.size > 33554432) throw new K("tooLarge", "Replay exceeds 32 MB");
	return mu(await e.arrayBuffer());
}
U * 4;
var gu = class {
	entries = [];
	record(e, t, n) {
		let r = this.entries;
		r.length && r[r.length - 1].tick > e && (r.length = 0), r.push({
			tick: e,
			slot: t,
			keys: n
		});
		let i = 0;
		for (; i < r.length && r[i].tick <= e - 32;) i++;
		i && r.splice(0, i);
	}
	applied(e) {
		let t = 0;
		for (let n = this.entries.length - 1; n >= 0 && this.entries[n].tick >= e; n--) this.entries[n].tick === e && t++;
		return t;
	}
	packet(e, t) {
		return Oa(e, t, 6, this.entries);
	}
	clear() {
		this.entries.length = 0;
	}
}, _u = class {
	engine;
	onRecordingComplete;
	recorder;
	evidence;
	closed = !1;
	completing = !1;
	relay = new gu();
	constructor(e, t) {
		this.engine = e, this.onRecordingComplete = t;
	}
	assertOpen() {
		if (this.closed) throw Error("Room is closed");
	}
	observeEvidence(e) {
		if (this.assertOpen(), this.evidence) throw Error("Evidence observer already active");
		return this.evidence = e, () => {
			this.evidence === e && (this.evidence = void 0);
		};
	}
	evidenceFailed() {
		let e = this.evidence;
		this.evidence = void 0;
		try {
			e?.closed();
		} catch {}
	}
	get recording() {
		return !!this.recorder;
	}
	command(e, t = 0, n = 0, r) {
		this.assertOpen();
		let i = {
			tick: this.engine.tick,
			kind: e,
			slot: t,
			value: n
		};
		if (r && (i.properties = r), this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(i)) && this.finishRecording("Recording limit reached"), this.assertOpen(), Bl(this.engine, i), e === "input" && this.relay.record(i.tick + 1, t, n), this.evidence) try {
			this.evidence.command(i);
		} catch {
			this.evidenceFailed();
		}
	}
	relayApplied() {
		return this.relay.applied(this.engine.tick + 1);
	}
	checkRecordingLimit() {
		this.recorder && !this.recorder.canRecord(this.engine) && this.finishRecording("Recording limit reached");
	}
	step() {
		if (this.assertOpen(), this.engine.step(), this.recorder?.step(this.engine), this.evidence) try {
			this.evidence.stepped(this.engine);
		} catch {
			this.evidenceFailed();
		}
	}
	recordPlayer(e, t, n) {
		this.recorder?.player(this.engine.tick, e, t, n);
	}
	recordStyles(e) {
		this.recorder?.style(this.engine.tick, e);
	}
	recordOrder(e) {
		this.recorder?.order(this.engine.tick, e);
	}
	recordCommentaryPolicy(e) {
		this.recorder?.commentary(this.engine.tick, e);
	}
	recordSurface(e) {
		this.recorder?.surface(this.engine.tick, e);
	}
	startRecording(e, t, n = null) {
		if (this.assertOpen(), this.completing) throw Error("Recording completion is in progress");
		if (this.recorder) throw Error("Recording is already active");
		this.recorder = new $l(this.engine, e, t, n);
	}
	stopRecording() {
		if (!this.recorder) return null;
		let e = this.recorder.pack(this.engine);
		return this.recorder = void 0, e;
	}
	finishRecording(e) {
		let t = this.stopRecording();
		if (t) {
			this.completing = !0;
			try {
				this.onRecordingComplete(t, e);
			} finally {
				this.completing = !1;
			}
		}
	}
	discardRecording() {
		this.recorder = void 0;
	}
	close(e = "Room closed") {
		this.closed || (this.closed = !0, this.evidenceFailed(), this.finishRecording(e));
	}
}, vu = /* @__PURE__ */ new Set([
	"start",
	"goal",
	"end"
]), yu = (e) => Math.max(0, Math.min(1, e));
function bu({ p0: e, p1: t }, n, r) {
	let i = t[0] - e[0], a = t[1] - e[1], o = Math.hypot(i, a) || 1, s = ((n - e[0]) * i + (r - e[1]) * a) / o, c = ((n - e[0]) * a - (r - e[1]) * i) / o;
	return {
		along: s,
		across: (-e[0] * a + e[1] * i) / o < 0 ? -c : c,
		length: o
	};
}
function xu(e, t) {
	let n = e.data, [r, i, a] = [
		n[0],
		n[1],
		n[d.RADIUS]
	], o = t * 18;
	return t > 0 && n[o + d.INVERSE_MASS] !== 0 ? "touch" : t > 0 && e.stadium.goals.some(({ p0: e, p1: t }) => [e, t].some(([e, t]) => Math.hypot(n[o] - e, n[o + d.Y] - t) <= n[o + d.RADIUS])) ? "post" : e.stadium.goals.some((e) => {
		let { along: t, across: n, length: o } = bu(e, r, i);
		return t > -a && t < o + a && n < 0;
	}) ? "net" : "wall";
}
var Su = class {
	stream;
	sequence = 0;
	pending = [];
	lastSent = -Infinity;
	phase = "lobby";
	lastContactTick = -Infinity;
	lastBumpTick = -Infinity;
	constructor(e = crypto.randomUUID()) {
		this.stream = e;
	}
	checkpoint() {
		return {
			stream: this.stream,
			sequence: this.sequence
		};
	}
	capture(e, t, n = this.phase) {
		let r = e.data, i = (n, i, a = r[0], o = r[1]) => ({
			kind: n,
			intensity: Math.round(Math.max(0, Math.min(1, i)) * 100) / 100,
			sequence: ++this.sequence,
			tick: e.tick,
			epoch: t,
			slot: 0,
			x: a,
			y: o
		}), a = .3 + .7 * yu((Math.hypot(r[2], r[3]) - 4) / 5), o = (e.ballKicks ?? []).map((e) => ({
			...i("kick", a),
			slot: e
		})), s = e.phase === "playing" || e.phase === "goal", c = e.ballContact;
		c && !o.length && s && (e.tick < this.lastContactTick || e.tick - this.lastContactTick >= 6) && (o.push(i(xu(e, c.disc), (c.speed - 1) / 10)), this.lastContactTick = e.tick);
		let l = e.playerContact;
		if (l && s) {
			let t = l.speed >= .6, n = e.tick - this.lastBumpTick;
			if (l.speed >= .06 && (n < 0 || n >= (t ? 6 : 15))) {
				let n = l.a * 18, a = l.b * 18;
				o.push(i("bump", t ? .15 + .85 * yu(l.speed / 5) : l.speed / 4, (r[n] + r[a]) / 2, (r[n + d.Y] + r[a + d.Y]) / 2)), this.lastBumpTick = e.tick;
			}
		}
		if (e.phase !== n) {
			let t = e.phase === "goal" ? "goal" : e.phase === "playing" ? "start" : e.phase === "finished" || e.phase === "lobby" && n !== "finished" ? "end" : void 0;
			t && o.push(i(t, 1, 0, 0));
		}
		for (this.phase = e.phase, this.pending.push(...o); this.pending.length > 8;) {
			let e = this.pending.findIndex((e) => e.kind === "bump"), t = this.pending.findIndex((e) => !vu.has(e.kind));
			this.pending.splice(Math.max(0, e >= 0 ? e : t), 1);
		}
		return o;
	}
	drain(e) {
		if (!this.pending.length || e - this.lastSent < 50) return;
		this.lastSent = e;
		let t = this.pending;
		return this.pending = [], {
			type: "match-sounds",
			stream: this.stream,
			events: t
		};
	}
};
function Cu(e, t) {
	t && e.broadcast(t, 16384);
}
var wu = (e) => ({
	phase: e.phase,
	red: e.red,
	blue: e.blue,
	paused: e.paused,
	tick: e.tick
}), Tu = class {
	streamId;
	sequence = 0;
	epoch = 0;
	touch = null;
	touchPlayer = null;
	previous = {
		phase: "lobby",
		red: 0,
		blue: 0,
		paused: !1,
		tick: 0
	};
	constructor(e = crypto.randomUUID()) {
		this.streamId = e;
	}
	checkpoint() {
		return {
			streamId: this.streamId,
			sequence: this.sequence,
			epoch: this.epoch
		};
	}
	rebase(e, t) {
		this.previous = wu(e), this.epoch = t, this.touch = e.lastTouch, this.touchPlayer = null;
	}
	capture(e, t, n = () => null, r) {
		if (t !== this.epoch || e.tick < this.previous.tick) return this.rebase(e, t), [];
		let i = this.previous;
		if (this.previous = wu(e), e.lastTouch !== this.touch) {
			this.touch = e.lastTouch;
			let t = this.touch ? n(this.touch.slot) : null;
			this.touchPlayer = t && this.touch ? {
				...t,
				team: this.touch.team
			} : null;
		}
		let a = [], o = (n, r = {}) => {
			let i = ++this.sequence, o = {
				eventId: `${this.streamId}:${i}`,
				streamId: this.streamId,
				sequence: i,
				tick: e.tick,
				epoch: t,
				kind: n,
				context: {
					phase: e.phase,
					elapsed: e.elapsed / U,
					timeLimit: e.timeLimit,
					scoreLimit: e.scoreLimit,
					score: {
						red: e.red,
						blue: e.blue
					},
					paused: e.paused
				},
				...r
			};
			a.push(o);
		};
		if (e.phase === "goal" && i.phase !== "goal") {
			let t = e.red > i.red ? 1 : e.blue > i.blue ? 2 : null;
			if (t) {
				let n = e.goalTouch, r = n && this.touch?.slot === n.slot && this.touch.team === n.team ? this.touchPlayer : null;
				o("goal", { goal: {
					team: t,
					scorer: r && n ? {
						...r,
						team: n.team
					} : null,
					ownGoal: !!n && n.team !== t
				} });
			}
		}
		return e.phase !== i.phase && (e.phase === "playing" ? o(i.phase === "goal" ? "restart" : "kickoff") : e.phase === "finished" ? o("end", { endReason: e.scoreLimit > 0 && Math.max(e.red, e.blue) >= e.scoreLimit ? "score-limit" : e.timeLimit > 0 && e.elapsed / U >= e.timeLimit ? "time-limit" : e.red === e.blue ? "draw" : "script" }) : e.phase === "lobby" && (i.phase !== "finished" || r === "stop") && o("stop")), e.phase !== "lobby" && e.phase === i.phase && e.paused !== i.paused && o(e.paused ? "pause" : "resume"), a;
	}
};
function Eu(e, t) {
	t.length && e.broadcast({
		type: "match-facts",
		version: 1,
		sentAtMs: performance.now(),
		streamId: t[0].streamId,
		facts: t
	});
}
var Du = Object.freeze({
	locale: "en",
	dose: "balanced",
	reactionIntensity: .7,
	maxDurationMs: 2800,
	minGapMs: 3500,
	semanticCooldownMs: 3e4,
	historySize: 64,
	traceSize: 128,
	seed: 1,
	families: Object.freeze({}),
	contextFactsEnabled: !1,
	dullMomentMs: 22e3,
	maxAnecdotesPerMatch: 2,
	channels: Object.freeze({
		audio: !0,
		caption: !0,
		chat: !0
	})
}), Ou = (e, t, n, r) => Number.isFinite(e) ? Math.max(n, Math.min(r, e)) : t;
function ku(e = {}, t = Du) {
	let n = { ...t.families };
	for (let [t, r] of Object.entries(e.families ?? {})) Au.includes(t) && r && (n[t] = Object.freeze({
		...n[t],
		...typeof r.enabled == "boolean" ? { enabled: r.enabled } : {},
		...r.cooldownMs === void 0 ? {} : { cooldownMs: Ou(r.cooldownMs, 0, 0, 3e5) },
		...r.priority === void 0 ? {} : { priority: Ou(r.priority, 50, 0, 100) },
		...r.ttlMs === void 0 ? {} : { ttlMs: Ou(r.ttlMs, 1500, 100, 1e4) }
	}));
	return Object.freeze({
		locale: e.locale === "tr" || e.locale === "en" ? e.locale : t.locale,
		dose: [
			"off",
			"minimal",
			"balanced",
			"rich"
		].includes(e.dose ?? "") ? e.dose ?? t.dose : t.dose,
		reactionIntensity: Ou(e.reactionIntensity ?? t.reactionIntensity, .7, 0, 1),
		maxDurationMs: Ou(e.maxDurationMs ?? t.maxDurationMs, 2800, 250, 6e3),
		minGapMs: Ou(e.minGapMs ?? t.minGapMs, 3500, 0, 6e4),
		semanticCooldownMs: Ou(e.semanticCooldownMs ?? t.semanticCooldownMs, 3e4, 0, 3e5),
		historySize: Math.floor(Ou(e.historySize ?? t.historySize, 64, 1, 256)),
		traceSize: Math.floor(Ou(e.traceSize ?? t.traceSize, 128, 0, 512)),
		seed: Math.floor(Ou(e.seed ?? t.seed, 1, 0, 4294967295)),
		families: Object.freeze(n),
		contextFactsEnabled: typeof e.contextFactsEnabled == "boolean" ? e.contextFactsEnabled : t.contextFactsEnabled,
		dullMomentMs: Ou(e.dullMomentMs ?? t.dullMomentMs, 22e3, 3e3, 12e4),
		maxAnecdotesPerMatch: Math.floor(Ou(e.maxAnecdotesPerMatch ?? t.maxAnecdotesPerMatch, 2, 0, 20)),
		channels: Object.freeze({
			audio: typeof e.channels?.audio == "boolean" ? e.channels.audio : t.channels?.audio ?? !0,
			caption: typeof e.channels?.caption == "boolean" ? e.channels.caption : t.channels?.caption ?? !0,
			chat: typeof e.channels?.chat == "boolean" ? e.channels.chat : t.channels?.chat ?? !0
		})
	});
}
var Au = Object.freeze(/* @__PURE__ */ "kickoff,restart,goal.neutral,goal.first,goal.equalizer,goal.lead,goal.late-winner,goal.consolation,goal.own-goal,post,near-miss,pressure,pass,pass-chain,turnover,assist,save,shot,block,clearance,clearance.line,shot.blocked-source,counterattack,attack-progress,sustained-pressure,tactical-summary,goal.count.1,goal.count.2,goal.count.3,goal.count.4,goal.count.5,goal.count.lost,context.anecdote,match-end.win,match-end.draw,match-stop,pause,resume,context.fact".split(",")), ju = (e) => typeof e == "string" && /^[a-f0-9]{64}$/u.test(e), Mu = (e) => !!e && typeof e == "object" && !Array.isArray(e), Nu = (e, t) => Object.keys(e).length === t.length && t.every((t) => Object.hasOwn(e, t)), Pu = (e) => typeof e == "string" && e.trim().length > 0 && e.length <= 512;
function Fu(e, t) {
	if (!Mu(e) || !Nu(e, [
		"schemaVersion",
		"audioSha256",
		"textSha256",
		"durationMs",
		"words",
		"annotation"
	]) || e.schemaVersion !== 1 || !ju(e.audioSha256) || e.audioSha256 !== t.audio?.sha256 || !ju(e.textSha256) || !Number.isFinite(t.durationMs) || t.durationMs <= 0 || e.durationMs !== t.durationMs || !Pu(t.text) || !Array.isArray(e.words) || e.words.length < 1 || e.words.length > 128 || !Mu(e.annotation) || !Nu(e.annotation, [
		"source",
		"reviewer",
		"reference"
	]) || ![
		e.annotation.source,
		e.annotation.reviewer,
		e.annotation.reference
	].every(Pu)) throw Error("Invalid commentary word timing binding");
	let n = [...t.text.matchAll(/\S+/gu)];
	if (n.length !== e.words.length) throw Error("Word timing requires complete token coverage");
	let r = 0, i = e.words.map((e, i) => {
		let a = n[i];
		if (!Mu(e) || !Nu(e, [
			"startChar",
			"endChar",
			"startMs",
			"endMs"
		]) || e.startChar !== a.index || e.endChar !== a.index + a[0].length || typeof e.startMs != "number" || typeof e.endMs != "number" || !Number.isFinite(e.startMs) || !Number.isFinite(e.endMs) || e.startMs < r || e.endMs <= e.startMs || e.endMs > t.durationMs) throw Error("Invalid commentary word timing order, token or clip bounds");
		return r = e.endMs, Object.freeze({
			startChar: a.index,
			endChar: a.index + a[0].length,
			startMs: e.startMs,
			endMs: e.endMs
		});
	});
	return Object.freeze({
		schemaVersion: 1,
		audioSha256: e.audioSha256,
		textSha256: e.textSha256,
		durationMs: t.durationMs,
		words: Object.freeze(i),
		annotation: Object.freeze({
			source: e.annotation.source,
			reviewer: e.annotation.reviewer,
			reference: e.annotation.reference
		})
	});
}
var Iu = (e) => /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ mo(1), /* @__PURE__ */ fo(e)), Lu = /* @__PURE__ */ $(Iu(96), /* @__PURE__ */ _o(/^[a-zA-Z0-9._:-]+$/)), Ru = (e, t) => /* @__PURE__ */ $(/* @__PURE__ */ Eo(), /* @__PURE__ */ lo(), /* @__PURE__ */ ho(e), /* @__PURE__ */ po(t)), zu = /* @__PURE__ */ $(/* @__PURE__ */ ko([Ru(0, 1), Ru(0, 1)]), /* @__PURE__ */ co((e) => e[0] <= e[1])), Bu = /* @__PURE__ */ X({
	source: Iu(200),
	license: Iu(200),
	status: /* @__PURE__ */ Do(["draft", "approved"])
}), Vu = /* @__PURE__ */ X({
	url: /* @__PURE__ */ $(Iu(1024), /* @__PURE__ */ co((e) => {
		if ((!e.startsWith("/") || e.startsWith("//") || e.includes("\\")) && !e.startsWith("https://")) return !1;
		try {
			let t = new URL(e, "https://ball2d.invalid");
			return t.protocol === "https:" && !t.username && !t.password;
		} catch {
			return !1;
		}
	})),
	sha256: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ _o(/^[a-f0-9]{64}$/))
}), Hu = /* @__PURE__ */ X({
	id: Lu,
	locale: /* @__PURE__ */ Do(["tr", "en"]),
	role: /* @__PURE__ */ Do(["play-by-play", "analyst"]),
	family: /* @__PURE__ */ Do(Au),
	semanticKey: Iu(96),
	openingKey: Iu(96),
	text: Iu(300),
	intensity: zu,
	durationMs: Ru(1, 12e3),
	onsetMs: Ru(0, 11999),
	interruptibleAtMs: /* @__PURE__ */ $(/* @__PURE__ */ So(Ru(0, 12e3)), /* @__PURE__ */ fo(16)),
	cooldownMs: Ru(0, 3e5),
	audio: /* @__PURE__ */ To(Vu),
	wordTiming: /* @__PURE__ */ Z(/* @__PURE__ */ Mo()),
	provenance: Bu,
	fallbackId: /* @__PURE__ */ Z(Lu),
	contextFactKey: /* @__PURE__ */ Z(Lu),
	contextFactValue: /* @__PURE__ */ Z(/* @__PURE__ */ jo([/* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ fo(80)), /* @__PURE__ */ $(/* @__PURE__ */ Eo(), /* @__PURE__ */ lo())]))
}), Uu = /* @__PURE__ */ X({
	id: Lu,
	kind: /* @__PURE__ */ Do([
		"bed",
		"tension",
		"goal",
		"disappointment",
		"chant",
		"post",
		"near-miss",
		"release"
	]),
	team: /* @__PURE__ */ jo([
		/* @__PURE__ */ Y("neutral"),
		/* @__PURE__ */ Y(1),
		/* @__PURE__ */ Y(2)
	]),
	intensity: zu,
	durationMs: Ru(100, 6e4),
	loop: /* @__PURE__ */ To(/* @__PURE__ */ X({
		startMs: Ru(0, 6e4),
		endMs: Ru(1, 6e4)
	})),
	audio: Vu,
	provenance: Bu
}), Wu = (e) => {
	if (new TextEncoder().encode(JSON.stringify(e)).length > 262144) throw Error("Commentary assets exceed 256 KiB control budget");
};
function Gu(e) {
	if (e === null) return null;
	let t = /* @__PURE__ */ Po(/* @__PURE__ */ $(/* @__PURE__ */ So(Hu), /* @__PURE__ */ fo(4096)), e);
	if (!t.success) throw Error("Invalid commentary catalog");
	let n = t.output.map(({ wordTiming: e, ...t }) => ({
		...t,
		...e === void 0 ? {} : { wordTiming: Fu(e, t) }
	}));
	Wu(n);
	let r = new Map(n.map((e) => [e.id, e]));
	if (r.size !== n.length) throw Error("Duplicate commentary cue");
	let i = /* @__PURE__ */ new Set();
	for (let e of n) {
		if (e.onsetMs >= e.durationMs || e.interruptibleAtMs.some((t, n) => t >= e.durationMs || n > 0 && t <= e.interruptibleAtMs[n - 1]) || e.provenance.status === "approved" && !e.audio || e.family === "context.fact" && (!e.contextFactKey || e.contextFactValue === void 0)) throw Error("Invalid commentary cue timing or context");
		let t = e, n = /* @__PURE__ */ new Set();
		for (; t.fallbackId && !i.has(t.id);) {
			if (n.has(t.id)) throw Error("Cyclic commentary fallback");
			n.add(t.id);
			let e = r.get(t.fallbackId);
			if (!e || e.locale !== t.locale || e.role !== t.role || !(e.family === t.family || t.family.startsWith("goal.") && e.family === "goal.neutral") || t.family === "context.fact" && (e.contextFactKey !== t.contextFactKey || e.contextFactValue !== t.contextFactValue)) throw Error("Missing or incompatible commentary fallback");
			t = e;
		}
		for (let e of n) i.add(e);
	}
	return n;
}
function Ku(e) {
	if (e === null) return null;
	let t = /* @__PURE__ */ Po(/* @__PURE__ */ X({
		id: Lu,
		version: Iu(32),
		cues: /* @__PURE__ */ $(/* @__PURE__ */ So(Uu), /* @__PURE__ */ fo(64))
	}), e);
	if (!t.success) throw Error("Invalid atmosphere pack");
	let n = t.output, r = /* @__PURE__ */ new Set();
	for (let e of n.cues) {
		if (r.has(e.id) || e.provenance.status !== "approved" || e.loop && (e.loop.endMs - e.loop.startMs < 100 || e.loop.endMs > e.durationMs || ![
			"bed",
			"tension",
			"chant"
		].includes(e.kind))) throw Error("Invalid atmosphere cue identity, loop or approval");
		r.add(e.id);
	}
	return Wu(n), n;
}
var qu = Object.freeze({
	enabled: !0,
	bedIntensity: 1,
	reactionIntensity: 1,
	chantIntensity: .5,
	chantCooldownMs: 45e3,
	preferredTeam: "neutral"
}), Ju = /* @__PURE__ */ X({
	enabled: /* @__PURE__ */ Co(),
	bedIntensity: Ru(0, 1),
	reactionIntensity: Ru(0, 1),
	chantIntensity: Ru(0, 1),
	chantCooldownMs: Ru(5e3, 3e5),
	preferredTeam: /* @__PURE__ */ jo([
		/* @__PURE__ */ Y("neutral"),
		/* @__PURE__ */ Y(1),
		/* @__PURE__ */ Y(2)
	])
});
function Yu(e, t = qu) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid atmosphere policy");
	let n = /* @__PURE__ */ Po(Ju, {
		...t,
		...e
	});
	if (!n.success) throw Error("Invalid atmosphere policy");
	return n.output;
}
var Xu = class {
	policy = ku();
	context = /* @__PURE__ */ new Map();
	catalog = null;
	atmosphere = qu;
	atmospherePack = null;
	setCatalog(e) {
		this.catalog = Gu(e);
	}
	getCatalog() {
		return structuredClone(this.catalog);
	}
	setAtmosphere(e) {
		this.atmosphere = Yu(e, this.atmosphere);
	}
	getAtmosphere() {
		return structuredClone(this.atmosphere);
	}
	setAtmospherePack(e) {
		this.atmospherePack = Ku(e);
	}
	getAtmospherePack() {
		return structuredClone(this.atmospherePack);
	}
	configure(e) {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid commentary policy");
		this.policy = ku(e, this.policy);
	}
	getPolicy() {
		return structuredClone(this.policy);
	}
	setPlayer(e, t, n = Date.now()) {
		if (t === null) {
			this.context.delete(e.playerId);
			return;
		}
		if (!Array.isArray(t) || t.length > 4) throw Error("At most four commentary facts per player");
		let r = /* @__PURE__ */ new Set(), i = t.map((t) => {
			if (!t || typeof t != "object" || typeof t.id != "string" || !/^[a-zA-Z0-9._:-]{1,64}$/.test(t.id) || r.has(t.id) || typeof t.key != "string" || !/^[a-zA-Z0-9._:-]{1,64}$/.test(t.key) || typeof t.source != "string" || !t.source.trim() || t.source.length > 120 || !(typeof t.value == "string" && t.value.length <= 80 || typeof t.value == "number" && Number.isFinite(t.value)) || !Number.isFinite(t.issuedAtMs) || !Number.isFinite(t.expiresAtMs) || t.issuedAtMs > n + 5e3 || t.expiresAtMs <= n || t.expiresAtMs <= t.issuedAtMs || t.expiresAtMs - t.issuedAtMs > 36e5) throw Error("Invalid or expired commentary player fact");
			return r.add(t.id), {
				id: t.id,
				key: t.key,
				source: t.source,
				value: t.value,
				issuedAtMs: t.issuedAtMs,
				expiresAtMs: t.expiresAtMs,
				player: { ...e },
				trusted: !0
			};
		});
		this.context.set(e.playerId, i);
	}
	getPlayer(e, t = Date.now()) {
		let n = (this.context.get(e) ?? []).filter((e) => e.expiresAtMs > t);
		return n.length ? this.context.set(e, n) : this.context.delete(e), structuredClone(n);
	}
	removePlayer(e) {
		return this.context.delete(e);
	}
	snapshot(e = Date.now(), t = !1) {
		let n = [...this.context.keys()].flatMap((t) => this.getPlayer(t, e));
		return {
			version: 1,
			policy: this.getPolicy(),
			playerFacts: n,
			hostNowMs: e,
			sentAtMs: performance.now(),
			atmosphere: this.getAtmosphere(),
			...t === !0 || t === "catalog" ? { catalog: this.getCatalog() } : {},
			...t === !0 || t === "atmospherePack" ? { atmospherePack: this.getAtmospherePack() } : {}
		};
	}
};
function Zu(e, t, n, r) {
	for (let i = 0; i < r.length; i += 8) {
		let a = r.slice(i, i + 8);
		e.broadcast({
			type: "match-xg",
			version: 1,
			streamId: t,
			epoch: n,
			sentAtMs: performance.now(),
			shots: a
		});
	}
}
var Qu = 24, $u = 14, ed = 520, td = 300;
function nd(e, t) {
	return Object.freeze({
		cols: Qu,
		rows: $u,
		halfWidth: Number.isFinite(e) && e > 0 ? e : ed,
		halfHeight: Number.isFinite(t) && t > 0 ? t : td
	});
}
function rd(e, t, n) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return null;
	let { cols: r, rows: i, halfWidth: a, halfHeight: o } = n, s = Math.floor((e + a) / (2 * a) * r), c = Math.floor((t + o) / (2 * o) * i);
	return s < 0 || s >= r || c < 0 || c >= i ? null : c * r + s;
}
var id = /* @__PURE__ */ new WeakMap();
function ad(e, t) {
	let n = (e) => JSON.stringify([
		e.identity.sessionId,
		e.identity.playerId,
		e.identity.team
	]), r = JSON.stringify([
		"match-stats-spatial",
		t.streamId,
		t.epoch,
		t.arena.width,
		t.arena.height,
		t.players.every((e) => e.cells.length === 0),
		t.players.map(n)
	]), i = new Map(t.players.map((e) => [n(e), JSON.stringify([e.identity.name ?? null, e.distanceUnits])])), a = JSON.stringify([r, [...i].sort(([e], [t]) => e.localeCompare(t))]), o = id.get(e), s = o?.context === r, c = s ? t.players.findIndex((e) => e.cells.length > 0 || o.rows.get(n(e)) !== i.get(n(e))) : 0, l = c < 0 ? [] : t.players.slice(c), u = {
		type: "match-stats-spatial",
		version: 1,
		...t
	};
	e.broadcast(u, Infinity, {
		previous: s ? o.signature : void 0,
		signature: a,
		delta: l.length ? {
			...u,
			players: l
		} : null
	}), id.set(e, {
		context: r,
		signature: a,
		rows: i
	});
}
var od = (e) => ({
	identity: { ...e },
	name: e.name ?? "",
	team: e.team,
	goals: 0,
	ownGoals: 0,
	directedShots: 0,
	blocks: 0,
	saves: 0,
	completedPasses: 0,
	failedPasses: 0,
	turnoversWon: 0,
	turnoversLost: 0,
	assists: 0,
	touches: 0,
	controlledMs: 0,
	distanceUnits: 0,
	heatmapMs: Array(336).fill(0),
	heatmapPendingMs: Array(336).fill(0),
	outOfDomainSamples: 0
}), sd = () => ({
	goals: 0,
	directedShots: 0,
	blocks: 0,
	saves: 0,
	completedPasses: 0,
	failedPasses: 0,
	turnoversWon: 0,
	assists: 0,
	touches: 0,
	controlledMs: 0,
	distanceUnits: 0,
	heatmapMs: Array(336).fill(0),
	outOfDomainSamples: 0
}), cd = (e) => ({
	goals: e.goals,
	ownGoals: "ownGoals" in e ? e.ownGoals : 0,
	directedShots: e.directedShots,
	blocks: e.blocks,
	saves: e.saves,
	completedPasses: e.completedPasses,
	failedPasses: e.failedPasses,
	turnoversWon: e.turnoversWon,
	turnoversLost: "turnoversLost" in e ? e.turnoversLost : 0,
	assists: e.assists,
	touches: e.touches,
	controlledMs: e.controlledMs
}), ld = (e, t, n) => {
	if (!n) return null;
	let r = Object.freeze({
		transform: t,
		cellMs: Object.freeze([...e.heatmapMs]),
		outOfDomainSamples: e.outOfDomainSamples
	});
	return Object.freeze({
		distanceUnits: e.distanceUnits,
		heatmap: r
	});
}, ud = 40, dd = 250, fd = 2e3, pd = 256, md = 128, hd = 32, gd = 8, _d = 60, vd = Object.freeze([]), yd = class {
	ticksPerSecond;
	maxGapMs;
	role;
	streamId = null;
	epoch = null;
	tick = null;
	fromTick = null;
	transform = nd(0, 0);
	spatialAvailable = !1;
	observedTicks = 0;
	clockTick = null;
	clockPlaying = !1;
	lastElapsedMs = 0;
	controller = null;
	lastPositionTick = null;
	lastPosition = /* @__PURE__ */ new Map();
	rows = /* @__PURE__ */ new Map();
	rowIndex = /* @__PURE__ */ new Map();
	teamRows = {
		1: sd(),
		2: sd()
	};
	timeline = [];
	xgShots = [];
	xgTeamTotals = {
		1: 0,
		2: 0
	};
	xgAvailable = !1;
	xgModelId = null;
	lastSpatialPublishTick = null;
	spatialSequence = 0;
	rebuilding = !1;
	constructor(e = {}) {
		this.ticksPerSecond = e.ticksPerSecond ?? 60, this.maxGapMs = e.maxGapMs ?? dd, this.role = e.role ?? "host";
	}
	setRebuilding(e) {
		this.rebuilding = e;
	}
	setRole(e) {
		this.role = e;
	}
	numericKey(e) {
		return e.playerId * 4 + e.team;
	}
	resetHeatmaps() {
		for (let e of this.rows.values()) e.heatmapMs = Array(336).fill(0), e.heatmapPendingMs = Array(336).fill(0);
		for (let e of [1, 2]) this.teamRows[e].heatmapMs = Array(336).fill(0);
	}
	bindArena(e, t) {
		this.transform = nd(e, t), this.resetHeatmaps();
	}
	reset() {
		this.streamId = this.epoch = this.tick = this.fromTick = null, this.spatialAvailable = !1, this.observedTicks = 0, this.clockTick = null, this.clockPlaying = !1, this.lastElapsedMs = 0, this.controller = null, this.lastPositionTick = null, this.lastPosition.clear(), this.rows.clear(), this.rowIndex.clear(), this.timeline.length = 0, this.xgShots.length = 0, this.xgTeamTotals[1] = this.xgTeamTotals[2] = 0, this.xgAvailable = !1, this.xgModelId = null, this.lastSpatialPublishTick = null, this.spatialSequence = 0, this.rebuilding = !1;
		for (let e of [1, 2]) Object.assign(this.teamRows[e], sd());
	}
	bindStream(e, t) {
		(this.streamId !== e || this.epoch !== t) && (this.reset(), this.streamId = e, this.epoch = t);
	}
	ms(e) {
		return e * 1e3 / this.ticksPerSecond;
	}
	accrueObserved(e, t) {
		if (this.clockTick !== null && e < this.clockTick) return;
		let n = this.clockTick === null ? 0 : e - this.clockTick;
		t && this.clockPlaying && n > 0 && this.ms(n) <= fd && (this.observedTicks += n), this.clockTick = e, this.clockPlaying = t;
	}
	player(e) {
		let t = yt(e), n = this.rows.get(t);
		if (n) return e.name && (n.name = e.name), this.rows.delete(t), this.rows.set(t, n), n;
		if (n = od(e), this.rows.size >= ud) {
			let e = this.rows.keys().next().value;
			if (e !== void 0) {
				let t = this.rows.get(e);
				this.rows.delete(e), t && this.rowIndex.delete(this.numericKey(t.identity));
			}
		}
		return this.rows.set(t, n), this.rowIndex.set(this.numericKey(e), n), n;
	}
	closeControlAt(e) {
		let t = this.controller;
		if (!t) return;
		this.controller = null;
		let n = e - t.sinceTick;
		if (n <= 0) return;
		let r = this.ms(n);
		this.player(t.identity).controlledMs += r, this.teamRows[t.identity.team].controlledMs += r;
	}
	openControlInterval(e, t) {
		let n = yt(e);
		this.controller && this.controller.key !== n && this.closeControlAt(t);
		let r = this.player(e);
		this.controller || (this.controller = {
			key: n,
			identity: { ...e },
			sinceTick: t
		}, r.touches++, this.teamRows[e.team].touches++);
	}
	closeControlIntervalFor(e, t) {
		this.controller?.key === yt(e) && this.closeControlAt(t);
	}
	positionRow(e) {
		let t = this.rowIndex.get(this.numericKey(e));
		return t ? (e.name && e.name !== t.name && (t.name = e.name), t) : this.player(e);
	}
	breakPositionContinuity() {
		this.lastPositionTick = null, this.lastPosition.clear();
	}
	pushTimeline(e) {
		this.timeline.push(e), this.timeline.length > pd && this.timeline.shift();
	}
	observeFacts(e) {
		for (let t of e) switch (this.bindStream(t.streamId, t.epoch), this.tick = t.tick, this.fromTick ??= t.tick, this.lastElapsedMs = t.context.elapsed * 1e3, this.accrueObserved(t.tick, t.context.phase === "playing" && !t.context.paused), t.kind) {
			case "goal": {
				let e = t.goal;
				if (!e || e.team !== 1 && e.team !== 2) break;
				if (this.teamRows[e.team].goals++, e.scorer) {
					let t = this.player(e.scorer);
					e.ownGoal ? t.ownGoals++ : t.goals++;
				}
				this.pushTimeline(Object.freeze({
					kind: e.ownGoal ? "own-goal" : "goal",
					tick: t.tick,
					elapsedMs: t.context.elapsed * 1e3,
					team: e.team,
					player: e.scorer ? { ...e.scorer } : null
				}));
				break;
			}
			case "kickoff":
			case "restart":
				this.closeControlInterval(), this.breakPositionContinuity();
				break;
			case "pause":
				this.closeControlInterval();
				break;
			case "stop":
			case "end": this.closeControlInterval(), this.breakPositionContinuity();
		}
	}
	closeControlInterval() {
		this.controller && this.tick !== null && this.closeControlAt(this.tick);
	}
	observeEvents(e) {
		for (let t of e) switch (this.bindStream(t.streamId, t.epoch), this.tick = t.tick, this.fromTick ??= t.tick, this.lastElapsedMs = t.context.elapsed * 1e3, this.accrueObserved(t.tick, t.context.phase === "playing" && !t.context.paused), t.kind) {
			case "control-established":
				t.player && this.openControlInterval(t.player, t.tick);
				break;
			case "control-ended":
			case "player-retired":
				t.player && this.closeControlIntervalFor(t.player, t.tick);
				break;
			case "pass-completed":
				t.player && this.player(t.player).completedPasses++, t.player && this.teamRows[t.player.team].completedPasses++;
				break;
			case "pass-failed":
				t.player && this.player(t.player).failedPasses++, t.player && this.teamRows[t.player.team].failedPasses++;
				break;
			case "turnover":
				t.player && (this.player(t.player).turnoversWon++, this.teamRows[t.player.team].turnoversWon++), t.otherPlayer && this.player(t.otherPlayer).turnoversLost++;
				break;
			case "directed-shot":
				t.player && (this.player(t.player).directedShots++, this.teamRows[t.player.team].directedShots++, this.pushTimeline(Object.freeze({
					kind: "shot",
					tick: t.tick,
					elapsedMs: t.context.elapsed * 1e3,
					team: t.player.team,
					player: { ...t.player }
				})));
				break;
			case "block":
				t.player && (this.player(t.player).blocks++, this.teamRows[t.player.team].blocks++);
				break;
			case "goalkeeper-save":
				t.player && (this.player(t.player).saves++, this.teamRows[t.player.team].saves++);
				break;
			case "assist-confirmed": t.player && (this.player(t.player).assists++, this.teamRows[t.player.team].assists++);
		}
	}
	observePositions(e) {
		this.bindStream(e.streamId, e.epoch), this.tick = e.tick, this.fromTick ??= e.tick, this.spatialAvailable = !0;
		let t = e.phase === "playing" && !e.paused;
		this.accrueObserved(e.tick, t);
		let n = this.lastPositionTick === null ? 0 : e.tick - this.lastPositionTick, r = t && this.lastPositionTick !== null && n > 0 && this.ms(n) <= this.maxGapMs;
		for (let i of e.players) {
			let a = this.positionRow(i.identity), o = this.numericKey(i.identity), s = this.lastPosition.get(o);
			if (r && s && s.tick === this.lastPositionTick) {
				let e = Math.hypot(i.x - s.x, i.y - s.y);
				a.distanceUnits += e, this.teamRows[i.identity.team].distanceUnits += e;
			}
			if (s ? (s.tick = e.tick, s.x = i.x, s.y = i.y) : this.lastPosition.set(o, {
				tick: e.tick,
				x: i.x,
				y: i.y
			}), t) {
				let e = rd(i.x, i.y, this.transform);
				if (e === null) a.outOfDomainSamples++, this.teamRows[i.identity.team].outOfDomainSamples++;
				else if (r) {
					let t = this.ms(n);
					a.heatmapMs[e] += t, a.heatmapPendingMs[e] += t, this.teamRows[i.identity.team].heatmapMs[e] += t;
				}
			}
		}
		t ? this.lastPositionTick = e.tick : this.breakPositionContinuity();
	}
	observeClock(e, t, n, r, i) {
		this.bindStream(e, t), this.tick = n, this.fromTick ??= n, this.accrueObserved(n, r === "playing" && !i);
	}
	observeKickEstimates(e) {
		let t = [];
		for (let n of e) {
			this.bindStream(n.streamId, n.epoch), this.tick = n.tick, this.fromTick ??= n.tick;
			let e = n.player.team, r = n.estimate.status === "reviewed-model";
			r && (this.xgAvailable = !0, this.xgModelId = n.estimate.modelId, this.xgTeamTotals[e] += n.estimate.xG);
			let i = Object.freeze({
				eventId: n.eventId,
				tick: n.tick,
				elapsedMs: this.lastElapsedMs,
				team: e,
				player: { ...n.player },
				goalId: n.goalId,
				xG: r ? n.estimate.xG : null,
				status: n.estimate.status,
				reason: n.estimate.reason,
				modelId: n.estimate.modelId ?? null
			});
			this.xgShots.push(i), t.push(i), this.xgShots.length > md && this.xgShots.shift();
		}
		return Object.freeze(t);
	}
	observeGuestXgShots(e) {
		for (let t of e) t.status === "reviewed-model" && t.xG !== null && (this.xgAvailable = !0, this.xgModelId = t.modelId, this.xgTeamTotals[t.team] += t.xG), this.xgShots.push(t), this.xgShots.length > md && this.xgShots.shift();
	}
	hostSpatialSummaries(e, t = _d) {
		if (this.role !== "host" || this.tick === null || this.streamId === null || this.epoch === null || this.lastSpatialPublishTick !== null && this.tick - this.lastSpatialPublishTick < t) return vd;
		this.lastSpatialPublishTick = this.tick;
		let n = [];
		for (let e of this.rows.values()) {
			let t = [];
			for (let n = 0; n < e.heatmapPendingMs.length; n++) {
				let r = e.heatmapPendingMs[n];
				r > 0 && t.length < gd && t.push([n, Math.round(r)]);
			}
			e.heatmapPendingMs.fill(0), (t.length || e.distanceUnits !== 0) && n.push(Object.freeze({
				identity: { ...e.identity },
				cells: t,
				distanceUnits: e.distanceUnits
			}));
		}
		if (!n.length) return vd;
		let r = [];
		for (let t = 0; t < n.length; t += hd) r.push(Object.freeze({
			streamId: this.streamId,
			epoch: this.epoch,
			tick: this.tick,
			sequence: this.spatialSequence++,
			arena: {
				width: e.width,
				height: e.height
			},
			players: Object.freeze(n.slice(t, t + hd))
		}));
		return Object.freeze(r);
	}
	applySpatialSummary(e) {
		this.bindStream(e.streamId, e.epoch), (this.tick === null || e.tick > this.tick) && (this.tick = e.tick), this.fromTick ??= e.tick, this.spatialAvailable = !0;
		let t = nd(e.arena.width, e.arena.height);
		(t.halfWidth !== this.transform.halfWidth || t.halfHeight !== this.transform.halfHeight) && (this.transform = t, this.resetHeatmaps());
		for (let t of e.players) {
			let e = this.player(t.identity);
			for (let [n, r] of t.cells) n < 0 || n >= e.heatmapMs.length || (e.heatmapMs[n] += r, this.teamRows[t.identity.team].heatmapMs[n] += r);
			t.distanceUnits > e.distanceUnits && (this.teamRows[t.identity.team].distanceUnits += t.distanceUnits - e.distanceUnits, e.distanceUnits = t.distanceUnits);
		}
	}
	snapshot() {
		let e = (e) => Object.freeze({
			counters: cd(this.teamRows[e]),
			spatial: ld(this.teamRows[e], this.transform, this.spatialAvailable)
		}), t = [...this.rows.values()].reverse().map((e) => Object.freeze({
			identity: { ...e.identity },
			name: e.name,
			team: e.team,
			counters: cd(e),
			spatial: ld(e, this.transform, this.spatialAvailable)
		})), n = this.ms(this.observedTicks);
		return Object.freeze({
			streamId: this.streamId,
			epoch: this.epoch,
			tick: this.tick,
			observedMs: n,
			contestedOrUnknownMs: Math.max(0, n - this.teamRows[1].controlledMs - this.teamRows[2].controlledMs),
			teams: {
				1: e(1),
				2: e(2)
			},
			players: Object.freeze(t),
			timeline: Object.freeze([...this.timeline]),
			xg: Object.freeze({
				available: this.xgAvailable,
				modelId: this.xgModelId,
				teams: {
					1: this.xgAvailable ? this.xgTeamTotals[1] : null,
					2: this.xgAvailable ? this.xgTeamTotals[2] : null
				},
				shots: Object.freeze([...this.xgShots])
			}),
			coverage: Object.freeze({
				fromTick: this.fromTick,
				possiblyIncomplete: this.role === "guest",
				spatialAvailable: this.spatialAvailable,
				rebuilding: this.rebuilding
			})
		});
	}
}, bd = class {
	sequence = 0;
	capture(e, t, n, r) {
		return Object.freeze({
			eventId: `${n.sessionId}:retirement:${t}:${e.tick}:${++this.sequence}`,
			streamId: n.sessionId,
			epoch: t,
			tick: e.tick,
			kind: "player-retired",
			team: n.team,
			player: Object.freeze({ ...n }),
			confidence: "authoritative",
			context: Object.freeze({
				phase: e.phase,
				paused: e.paused || e.resumeTicks > 0,
				elapsed: e.elapsed / U,
				timeLimit: e.timeLimit,
				scoreLimit: e.scoreLimit,
				score: Object.freeze({
					red: e.red,
					blue: e.blue
				})
			}),
			evidence: Object.freeze(["authoritative-roster-change", r]),
			metrics: Object.freeze({})
		});
	}
}, xd = {
	message: {
		burst: 240,
		perSecond: 160
	},
	relay: {
		burst: 120,
		perSecond: 90
	},
	action: {
		burst: 12,
		perSecond: 6
	},
	chat: {
		burst: 4,
		perSecond: 1
	},
	typing: {
		burst: 6,
		perSecond: 3
	},
	feedback: {
		burst: 1,
		perSecond: .5
	}
}, Sd = class {
	peers = /* @__PURE__ */ new Map();
	allow(e, t, n = performance.now()) {
		let r = this.peers.get(e);
		r || (r = {}, this.peers.set(e, r));
		let { burst: i, perSecond: a } = xd[t], o = r[t] ?? {
			tokens: i,
			at: n
		};
		return o.tokens = Math.min(i, o.tokens + Math.max(0, n - o.at) * a / 1e3), o.at = Math.max(o.at, n), r[t] = o, o.tokens < 1 ? !1 : (o.tokens--, !0);
	}
	delete(e) {
		this.peers.delete(e);
	}
	clear() {
		this.peers.clear();
	}
};
function Cd(e, t, n, r) {
	let i, a = r.relayApplied();
	for (let r of e.peers.values()) r.relay && r.control?.readyState === "open" && (i ??= t.snapshot(), e.control(r, {
		type: "state",
		epoch: n,
		state: i,
		...a ? { relayApplied: a } : {}
	}));
}
var wd = 32768, Td = 62258, Ed = 4, Dd = 32, Od = (e, t) => typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t, kd = (e) => Math.max(-32768, Math.min(32767, Math.round(e * Ed)));
function Ad(e) {
	return Od(e.halfWidthQ, 65535) && Od(e.halfHeightQ, 65535) && e.halfWidthQ !== 0 && e.halfHeightQ !== 0 && Od(e.grassWidthQ, e.halfWidthQ) && Od(e.grassHeightQ, e.halfHeightQ) && Od(e.cornerQ, Math.min(e.grassWidthQ, e.grassHeightQ));
}
function jd(e) {
	let { bg: t } = e, n = {
		halfWidthQ: Math.round((Math.max(e.width, t.width) + Dd) * Ed),
		halfHeightQ: Math.round((Math.max(e.height, t.height) + Dd) * Ed),
		grassWidthQ: Math.round(t.width * Ed),
		grassHeightQ: Math.round(t.height * Ed),
		cornerQ: Math.round(Math.min(t.cornerRadius ?? 0, t.width, t.height) * Ed)
	};
	if (!Ad(n)) throw Error("Invalid turf field");
	return n;
}
var Md = (e, t) => e.halfWidthQ === t.halfWidthQ && e.halfHeightQ === t.halfHeightQ && e.grassWidthQ === t.grassWidthQ && e.grassHeightQ === t.grassHeightQ && e.cornerQ === t.cornerQ, Nd = (e) => [e.halfWidthQ / Ed, e.halfHeightQ / Ed];
function Pd(e, t, { grassWidthQ: n, grassHeightQ: r, cornerQ: i }) {
	let a = Math.abs(e), o = Math.abs(t);
	return a > n || o > r ? !1 : !(i > 0 && a > n - i && o > r - i && (a - n + i) ** 2 + (o - r + i) ** 2 > i ** 2);
}
function Fd(e, [t, n, r, i], a, o, s) {
	let { halfWidthQ: c, halfHeightQ: l } = s, u = Math.max(0, Math.floor((Math.min(t, r) - a + c) * 256 / (2 * c))), d = Math.min(255, Math.ceil((Math.max(t, r) + a + c) * 256 / (2 * c))), f = Math.max(0, Math.floor((Math.min(n, i) - a + l) * 128 / (2 * l))), p = Math.min(127, Math.ceil((Math.max(n, i) + a + l) * 128 / (2 * l)));
	if (d < u || p < f) return !1;
	let m = r - t, h = i - n, g = m * m + h * h;
	if (!g) return !1;
	let _ = Math.sqrt(g), v = a * a, y = !1;
	for (let r = f; r <= p; r++) {
		let i = (2 * r + 1 - 128) * l / 128;
		for (let a = u; a <= d; a++) {
			let l = (2 * a + 1 - 256) * c / 256;
			if (!Pd(l, i, s)) continue;
			let u = Math.max(0, Math.min(1, ((l - t) * m + (i - n) * h) / g)), d = l - t - m * u, f = i - n - h * u, p = d * d + f * f;
			if (p >= v) continue;
			let b = r * 256 + a, x = Math.round(_ * o * (1 - p / v) * (1 - e[b] / 65535) / 32);
			if (!x) continue;
			let ee = Math.min(Td, e[b] + x);
			ee !== e[b] && (e[b] = ee, y = !0);
		}
	}
	return y;
}
var Id = wd * 3, Ld = 102400, Rd = 1, zd = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, Bd = (e, t) => Math.imul(e ^ t, 16777619);
function Vd(e) {
	let t = 2166136261;
	for (let n of e) t = Bd(t, n);
	return t >>> 0;
}
function Hd(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t = Bd(Bd(t, r & 255), r >>> 8);
	}
	return t >>> 0;
}
function Ud(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return btoa(t);
}
function Wd(e, t, n) {
	if (typeof e != "string" || e.length > Math.ceil(t / 3) * 4 || !zd.test(e)) throw Error(n);
	return Uint8Array.from(atob(e), (e) => e.charCodeAt(0));
}
function Gd(e) {
	let t = Wd(e, wd * 2, "Invalid turf payload");
	if (t.length !== 65536) throw Error("Invalid turf atlas length");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = new Uint16Array(wd);
	for (let e = 0; e < wd; e++) if (r[e] = n.getUint16(e * 2, !0), r[e] > 62258) throw Error("Invalid turf wear");
	return r;
}
function Kd(e) {
	let t = Wd(e, Ld, "Invalid turf surface payload");
	if (!t.length || t.length > Ld) throw Error("Invalid turf surface length");
	let n = new Uint8Array(Id), r = 0, i = !1, a = new oi((e, t) => {
		if (r + e.length > Id) throw Error("Expanded turf surface exceeds size limit");
		n.set(e, r), r += e.length, i = t;
	});
	for (let e = 0; e < t.length; e += 256) a.push(t.subarray(e, e + 256), e + 256 >= t.length);
	if (!i || r !== Id) throw Error("Invalid turf surface length");
	return n;
}
function qd(e) {
	let t = new Uint8Array(wd * 2), n = new DataView(t.buffer);
	for (let t = 0; t < wd; t++) n.setUint16(t * 2, e.atlas[t], !0);
	let r = {
		type: "turf-checkpoint",
		version: Rd,
		generation: e.generation,
		...e.field,
		digest: e.digest,
		atlas: Ud(t)
	};
	if (e.surfaceRgb) {
		let t = ai(e.surfaceRgb, { level: 1 });
		if (t.length > Ld) throw Error("Compressed turf surface exceeds size limit");
		r.surface = Ud(t), r.surfaceDigest = Vd(e.surfaceRgb);
	}
	return r;
}
function Jd(e) {
	if (!e || typeof e != "object") throw Error("Invalid turf checkpoint");
	let t = e, n = {
		halfWidthQ: t.halfWidthQ,
		halfHeightQ: t.halfHeightQ,
		grassWidthQ: t.grassWidthQ,
		grassHeightQ: t.grassHeightQ,
		cornerQ: t.cornerQ
	};
	if (t.type !== "turf-checkpoint" || t.version !== Rd || !Od(t.generation, 4294967295) || !Ad(n) || !Od(t.digest, 4294967295)) throw Error("Invalid turf checkpoint");
	let r = Gd(t.atlas);
	if (Hd(r) !== t.digest) throw Error("Turf checksum mismatch");
	if (t.surface === void 0 != (t.surfaceDigest === void 0)) throw Error("Invalid turf surface envelope");
	let i;
	if (t.surface !== void 0) {
		if (!Od(t.surfaceDigest, 4294967295)) throw Error("Invalid turf surface checksum");
		if (i = Kd(t.surface), Vd(i) !== t.surfaceDigest) throw Error("Turf surface checksum mismatch");
	}
	return {
		field: n,
		generation: t.generation,
		digest: t.digest,
		atlas: r,
		surfaceRgb: i
	};
}
var Yd = 6, Xd = 33, Zd = 31, Qd = 255, $d = {
	halfWidthQ: 0,
	halfHeightQ: 0,
	grassWidthQ: 0,
	grassHeightQ: 0,
	cornerQ: 0
}, ef = (e) => Math.min(Td, Math.round(e * 65535 / 255)), tf = class {
	atlas = new Uint16Array(wd);
	image = new Uint8Array(wd);
	surfaceRgb;
	surfaceImage = new Uint8Array(wd * 4);
	surfaceDirty = !0;
	imageDirty = !0;
	digestDirty = !0;
	digestValue = 0;
	previous = /* @__PURE__ */ new Map();
	stadium;
	lastTick = -1;
	lastElapsed = -1;
	lastPhase = "lobby";
	bounds = $d;
	generation = 0;
	revision = 0;
	field = [0, 0];
	get digest() {
		return this.digestDirty &&= (this.digestValue = Hd(this.atlas), !1), this.digestValue;
	}
	get hasPressure() {
		let e = this.surfaceRgb;
		if (!e) return !1;
		for (let t = 0; t < Id; t += 3) if (e[t] !== 0) return !0;
		return !1;
	}
	pixels() {
		if (this.imageDirty) {
			for (let e = 0; e < wd; e++) this.image[e] = Math.round(this.atlas[e] * 255 / 65535);
			this.imageDirty = !1;
		}
		return this.image;
	}
	surfacePixels() {
		if (this.surfaceDirty || this.imageDirty) {
			let e = this.pixels(), t = this.surfaceRgb;
			for (let n = 0; n < wd; n++) {
				let r = n * 4, i = n * 3;
				this.surfaceImage[r] = t ? t[i] : 0, this.surfaceImage[r + 1] = t ? t[i + 1] : 128, this.surfaceImage[r + 2] = t ? t[i + 2] : 128, this.surfaceImage[r + 3] = e[n];
			}
			this.surfaceDirty = !1;
		}
		return this.surfaceImage;
	}
	changed() {
		this.imageDirty = !0, this.surfaceDirty = !0, this.digestDirty = !0, this.revision++;
	}
	reset(e) {
		this.atlas.fill(0), this.surfaceRgb = void 0, this.previous.clear(), this.generation = this.generation + 1 >>> 0, this.bounds = e, this.field = Nd(e), this.changed();
	}
	startsOver(e, t) {
		return this.stadium !== e.stadium || this.lastTick > e.tick || this.lastElapsed > 0 && e.elapsed < this.lastElapsed || e.phase === "lobby" && this.lastPhase !== "lobby" || !Md(this.bounds, t);
	}
	capture(e, t = null) {
		let n = e.stadium, r = jd(n);
		if (this.startsOver(e, r) && this.reset(r), this.stadium = n, this.lastTick = e.tick, this.lastElapsed = e.elapsed, this.lastPhase = e.phase, e.phase !== "playing" || e.paused || e.resumeTicks || ce(I(n, t)) !== "grass") {
			this.previous.clear();
			return;
		}
		e.tick % Yd === 0 && this.sampleBodies(e.data);
	}
	sampleBodies(e) {
		let t = /* @__PURE__ */ new Set(), n = 0;
		for (let r = 0; r < e.length / 18; r++) {
			let i = r * 18;
			if (r !== 0 && (!e[i + d.PLAYER_SLOT] || e[i + d.TEAM] === 0)) continue;
			let a = e[i + d.X], o = e[i + d.Y], s = e[i + d.RADIUS];
			if (!Number.isFinite(a) || !Number.isFinite(o) || !Number.isFinite(s)) continue;
			t.add(r);
			let c = this.previous.get(r);
			if (c && n < Xd) {
				let e = Math.hypot(a - c[0], o - c[1]);
				if (e > .1 && e < 60) {
					n++;
					let e = [
						kd(c[0]),
						kd(c[1]),
						kd(a),
						kd(o)
					], t = Math.max(1, Math.min(96, Math.round(Math.max(3.5, s * .78) * 4))), i = r === 0 ? Zd : Qd;
					Fd(this.atlas, e, t, i, this.bounds) && this.changed();
				}
			}
			this.previous.set(r, [a, o]);
		}
		for (let e of this.previous.keys()) t.has(e) || this.previous.delete(e);
	}
	seed(e) {
		if (!(e instanceof Uint8Array) || e.length !== 32768) throw Error("Invalid turf seed");
		for (let t = 0; t < wd; t++) this.atlas[t] = ef(e[t]);
		this.surfaceRgb = void 0, this.changed();
	}
	seedSurface(e) {
		if (!(e instanceof Uint8Array) || e.length !== 131072) throw Error("Invalid turf surface seed");
		let t = new Uint8Array(Id);
		for (let n = 0; n < wd; n++) {
			let r = n * 4, i = n * 3;
			t[i] = e[r], t[i + 1] = e[r + 1], t[i + 2] = e[r + 2], this.atlas[n] = ef(e[r + 3]);
		}
		this.surfaceRgb = t, this.changed();
	}
	checkpoint() {
		if (!this.bounds.halfWidthQ || !this.bounds.halfHeightQ) throw Error("Turf field is not initialized");
		return qd({
			field: this.bounds,
			generation: this.generation,
			digest: this.digest,
			atlas: this.atlas,
			surfaceRgb: this.surfaceRgb
		});
	}
	restore(e) {
		let t = Jd(e);
		this.generation > t.generation && this.generation - t.generation < 2147483648 || (this.atlas = t.atlas, this.surfaceRgb = t.surfaceRgb, this.generation = t.generation, this.bounds = t.field, this.field = Nd(t.field), this.previous.clear(), this.changed(), this.digestValue = t.digest, this.digestDirty = !1);
	}
}, nf = class {
	players = [];
	nextId = 0;
	get all() {
		return this.players;
	}
	get size() {
		return this.players.length;
	}
	byId(e) {
		return this.players.find((t) => t.id === e);
	}
	byPeer(e) {
		return this.players.find((t) => t.peerId === e);
	}
	bySlot(e) {
		return this.players.find((t) => t.slot === e);
	}
	has(e) {
		return this.players.includes(e);
	}
	fielded() {
		return this.players.filter((e) => e.team !== 0);
	}
	freeSlot() {
		return Array.from({ length: 32 }, (e, t) => t).find((e) => !this.players.some((t) => t.slot === e));
	}
	add(e) {
		let t = {
			...e,
			id: this.nextId++
		};
		return this.players.push(t), t;
	}
	assignTeam(e, t) {
		return Qc(this.players, e, t);
	}
	removePeer(e) {
		this.players = this.players.filter((t) => t.peerId !== e);
	}
	reorder(e) {
		return !e.every((e, t) => e === this.players[t]) && (this.players = e, !0);
	}
	clear() {
		this.players = [];
	}
	roster() {
		return this.players.map((e) => ({
			avatar: e.avatarOverride ?? e.avatar ?? null,
			id: e.peerId,
			slot: e.slot,
			name: e.name,
			team: e.team,
			admin: e.admin,
			muted: !!e.muted
		}));
	}
}, rf = Object.freeze([]), af = class {
	engine;
	runtime;
	hooks;
	xg;
	intelligence;
	players = new nf();
	match;
	inputs;
	traffic = new Sd();
	soundStream = new Su();
	factStream = new Tu();
	commentary = new Xu();
	commentaryAnalysis = new kn();
	matchStats = new yd({
		role: "host",
		ticksPerSecond: U
	});
	kickEstimates = rf;
	intelligenceEvents = [];
	playerRetirements = new bd();
	turfState = new tf();
	bans = /* @__PURE__ */ new Map();
	network;
	roomId = "";
	roomName = "";
	roomLink = "";
	epoch = 0;
	locked = !1;
	teamStyles = [null, null];
	surface = null;
	closed = !1;
	stadiumSelection = 0;
	constructor(e, t, n, r, i = new tr(), a = new _r()) {
		this.engine = e, this.runtime = t, this.hooks = n, this.xg = i, this.intelligence = a, this.match = new _u(e, r), this.inputs = new Ll(this.match), this.xg.resetForStadium(e), this.intelligence.resetForStadium(e), this.matchStats.bindArena(e.stadium.width, e.stadium.height);
	}
	report(e) {
		try {
			let t = this.hooks.onError?.(e);
			t instanceof Promise && t.catch(() => {});
		} catch {}
	}
	invoke(e, t, ...n) {
		if (!(this.closed && e !== "onRecordingComplete")) try {
			let r = t?.apply(this.hooks, n);
			return r instanceof Promise && r.catch((t) => this.report(`${e}: ${String(t)}`)), r;
		} catch (t) {
			this.report(`${e}: ${String(t)}`);
			return;
		}
	}
	assertOpen() {
		if (this.closed) throw Error("Room is closed");
	}
	stopped() {
		return this.engine.phase === "lobby" || this.engine.phase === "finished";
	}
	isHost(e) {
		return e.peerId === this.network.hostId;
	}
	command(e, t = 0, n = 0) {
		this.assertOpen();
		let r = this.engine.kickRate, i = e === "scoreLimit" && n !== this.engine.scoreLimit || e === "timeLimit" && n !== this.engine.timeLimit;
		if (this.match.command(e, t, n), (e === "team" || e === "join" || i) && Cd(this.network, this.engine, this.epoch, this.match), e === "kickRate" && this.engine.kickRate !== r && (this.xg.invalidate("domain-change"), this.intelligence.resetForStadium(this.engine)), [
			"start",
			"stop",
			"pause",
			"team",
			"join"
		].includes(e) && this.baselineXg(), (e === "start" || e === "stop") && this.turfState.capture(this.engine), e === "start" || e === "stop" || e === "pause") {
			let t = this.captureCommentary(e === "stop" ? "stop" : void 0);
			return this.captureIntelligence(t), t;
		}
		return [];
	}
	captureCommentary(e) {
		let t = this.factStream.capture(this.engine, this.epoch, (e) => {
			let t = this.players.bySlot(e);
			return t && t.team !== 0 ? {
				sessionId: this.factStream.streamId,
				playerId: t.id,
				team: t.team,
				name: t.name
			} : null;
		}, e);
		return t.length && (this.broadcastState(), Eu(this.network, t)), t;
	}
	notifyCommentary(e) {
		let t = this.intelligenceEvents, n = this.kickEstimates;
		this.intelligenceEvents = [], this.kickEstimates = rf, this.matchStats.observeFacts(e), this.matchStats.observeEvents(t);
		let r = this.matchStats.observeKickEstimates(n);
		r.length && Zu(this.network, this.factStream.streamId, this.epoch, r);
		for (let t of e) this.invoke("onMatchFact", this.hooks.onMatchFact, structuredClone(t));
		for (let e of n) this.invoke("onMatchKickEstimate", this.hooks.onMatchKickEstimate, structuredClone(e));
		for (let e of t) this.invoke("onMatchIntelligenceEvent", this.hooks.onMatchIntelligenceEvent, structuredClone(e));
	}
	publishPlayerRetirement(e, t, n) {
		if (t !== 1 && t !== 2) return;
		let r = this.playerRetirements.capture(this.engine, this.epoch, {
			sessionId: this.factStream.streamId,
			playerId: e.id,
			team: t,
			name: e.name
		}, n);
		mr(this.network, [r]), this.invoke("onMatchIntelligenceEvent", this.hooks.onMatchIntelligenceEvent, structuredClone(r));
	}
	xgContext() {
		return {
			streamId: this.factStream.streamId,
			epoch: this.epoch,
			goals: this.commentaryAnalysis.getAnalysisGeometry(this.engine),
			resolve: (e) => {
				let t = this.players.bySlot(e);
				return t && t.team !== 0 ? {
					sessionId: this.factStream.streamId,
					playerId: t.id,
					team: t.team
				} : null;
			}
		};
	}
	baselineXg() {
		this.xg.baseline(this.engine, this.xgContext());
	}
	captureXg() {
		this.kickEstimates = this.xg.active ? this.xg.capture(this.engine, this.xgContext()) : rf;
	}
	captureIntelligence(e) {
		let t = [...this.intelligence.observePlayers(this.engine, this.epoch, this.factStream.streamId, this.players.all, (e) => e.team === 0 ? null : {
			sessionId: this.factStream.streamId,
			playerId: e.id,
			team: e.team,
			name: e.name
		}, this.commentaryAnalysis.getAnalysisGeometry(this.engine)), ...this.intelligence.confirm(e)];
		mr(this.network, t), this.intelligenceEvents = t;
	}
	captureAnalysis() {
		let e = this.commentaryAnalysis.observe(this.engine, this.epoch, this.factStream.streamId, (e) => {
			let t = this.players.bySlot(e);
			return t && t.team !== 0 ? {
				sessionId: this.factStream.streamId,
				playerId: t.id,
				team: t.team,
				name: t.name
			} : null;
		});
		return An(this.network, e), e;
	}
	captureMatchStatsPositions() {
		let { engine: e } = this, t = e.data, n = [];
		for (let r of this.players.all) {
			if (r.team !== 1 && r.team !== 2) continue;
			let i = e.index(r.slot) * 18;
			n.push({
				identity: {
					sessionId: this.factStream.streamId,
					playerId: r.id,
					team: r.team,
					name: r.name
				},
				x: t[i],
				y: t[i + d.Y]
			});
		}
		n.length && this.matchStats.observePositions({
			streamId: this.factStream.streamId,
			epoch: this.epoch,
			tick: e.tick,
			phase: e.phase,
			paused: e.paused,
			players: n
		});
	}
	broadcastMatchStatsSpatial() {
		let e = this.matchStats.hostSpatialSummaries({
			width: this.engine.stadium.width,
			height: this.engine.stadium.height
		});
		e.length && this.network.controlBatch(() => {
			for (let t of e) ad(this.network, t);
		});
	}
	syncLobby() {
		this.network.broadcast({
			type: "lobby",
			players: this.players.roster(),
			teamStyles: this.teamStyles,
			surface: this.surface,
			locked: this.locked,
			scoreLimit: this.engine.scoreLimit,
			timeLimit: this.engine.timeLimit
		});
	}
	broadcastState() {
		this.network.broadcast(Uc(this.engine, this.epoch, this.inputs, this.network.peers.values(), this.match));
	}
	publicPlayer(e) {
		let t = this.engine.index(e.slot) * 18, n = !this.closed && this.engine.phase !== "lobby" && this.engine.data[t + d.TEAM] > 0, { slot: r, avatarOverride: i, ...a } = e;
		return {
			...a,
			muted: !!e.muted,
			avatar: e.avatarOverride ?? e.avatar ?? null,
			position: n ? {
				x: this.engine.data[t],
				y: this.engine.data[t + d.Y]
			} : null,
			input: this.engine.data[t + d.INPUT]
		};
	}
	publicOrNull(e) {
		return e ? this.publicPlayer(e) : null;
	}
}, of = "0123456789abcdefghjkmnpqrstvwxyz", sf = 8, cf = /* @__PURE__ */ new Set(of), lf = /^[0-9a-f]{10}$/, uf = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function df(e) {
	return e.length === sf && [...e].every((e) => cf.has(e));
}
function ff(e) {
	return e.toLowerCase().replaceAll("o", "0").replaceAll("i", "1").replaceAll("l", "1");
}
function pf(e) {
	let t = ff(e);
	return df(t) || lf.test(t) || uf.test(t) ? t : null;
}
function mf(e) {
	let t = pf(e);
	if (!t) throw Error("Invalid room code");
	return `/r/${t}`;
}
var hf = "[0-9a-hjkmnp-tv-z]{8}", gf = "[0-9a-f]{10}", _f = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
RegExp(`^(?:${hf}|${gf})$`), Lo({ password: /* @__PURE__ */ Mo() }), Lo({
	password: /* @__PURE__ */ Mo(),
	verifier: /* @__PURE__ */ Mo()
}), Lo({ verifier: /* @__PURE__ */ Mo() }), Lo({ verified: /* @__PURE__ */ Co() });
var vf = /* @__PURE__ */ X({ error: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ fo(300), /* @__PURE__ */ co((e) => e.trim() !== ""), /* @__PURE__ */ co((e) => !/[<>]/.test(e)), /* @__PURE__ */ co((e) => !/[\u0000-\u001f\u007f]/.test(e))) });
RegExp(`^(?:${hf}|${gf}|${_f})$`, "i"), oc.roomName.max, Object.keys(oc);
async function yf(e, t, n) {
	let r = e.getReader(), i = () => {
		r.cancel().catch(() => {});
	};
	n?.addEventListener("abort", i, { once: !0 });
	let a = [], o = 0;
	try {
		for (;;) {
			if (n?.aborted) return {
				ok: !1,
				reason: "aborted"
			};
			let e = await r.read();
			if (e.done) break;
			if (o += e.value.byteLength, o > t) return {
				ok: !1,
				reason: "too-large"
			};
			a.push(e.value);
		}
	} catch (e) {
		if (n?.aborted) return {
			ok: !1,
			reason: "aborted"
		};
		throw e;
	} finally {
		n?.removeEventListener("abort", i), i();
		try {
			r.releaseLock();
		} catch {}
	}
	if (n?.aborted) return {
		ok: !1,
		reason: "aborted"
	};
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return {
		ok: !0,
		bytes: s
	};
}
var bf = 2048, xf = class extends Error {
	status;
	retryAfterSeconds;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.retryAfterSeconds = n, this.name = "RoomAdmissionError";
	}
};
async function Sf(e, t) {
	let n = `Room creation failed (${e.status})`, r = e.status === 429 ? e.headers.get("Retry-After") : null, i = r && /^\d+$/.test(r) && Number.isSafeInteger(Number(r)) ? Number(r) : null, a = (t) => new xf(t, e.status, i), o = e.body;
	if (!o) return a(n);
	try {
		if (t.throwIfAborted(), e.status < 400 || e.status >= 500 || e.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return a(n);
		let r = await yf(o, bf, t);
		if (!r.ok) return t.throwIfAborted(), a(n);
		let i = /* @__PURE__ */ Po(vf, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r.bytes)));
		return i.success ? a(`${i.output.error.trim()} (${e.status})`) : a(n);
	} catch {
		return t.throwIfAborted(), a(n);
	} finally {
		o.cancel().catch(() => {});
	}
}
function Cf(e) {
	if (e === void 0) return;
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("Geolocation must contain a country code, latitude and longitude.");
	let { code: t, lat: n, lon: r } = e;
	if (typeof t != "string" || !/^[a-z]{2}$/i.test(t) || typeof n != "number" || !Number.isFinite(n) || n < -90 || n > 90 || typeof r != "number" || !Number.isFinite(r) || r < -180 || r > 180) throw TypeError("Geolocation must contain a country code, latitude and longitude.");
	return {
		code: t.toUpperCase(),
		lat: n === 0 ? 0 : n,
		lon: r === 0 ? 0 : r
	};
}
var { roomName: wf } = oc, Tf = `Room name must contain ${wf.min}–${wf.max} characters`, Ef = (e) => /* @__PURE__ */ Z(/* @__PURE__ */ Co(`Invalid ${e} setting: expected a boolean`)), Df = "maxPlayers must be an integer between 2 and 32", Of = /* @__PURE__ */ $(/* @__PURE__ */ X({
	roomName: /* @__PURE__ */ $(/* @__PURE__ */ Q(Tf), /* @__PURE__ */ co((e) => dc("roomName", e), Tf)),
	public: Ef("public"),
	noPlayer: Ef("noPlayer"),
	maxPlayers: /* @__PURE__ */ Z(/* @__PURE__ */ $(/* @__PURE__ */ Eo(Df), /* @__PURE__ */ uo(Df), /* @__PURE__ */ ho(2, Df), /* @__PURE__ */ po(32, Df))),
	password: /* @__PURE__ */ Z(/* @__PURE__ */ $(/* @__PURE__ */ Q("Password must be a string of at most 64 characters"), /* @__PURE__ */ fo(64, "Password must be a string of at most 64 characters"))),
	stadium: /* @__PURE__ */ Z(/* @__PURE__ */ Q("Stadium must be a Ball2D stadium source string")),
	surface: /* @__PURE__ */ Z(/* @__PURE__ */ wo(Tc, (e) => Ec(e.input))),
	playerName: /* @__PURE__ */ Z(/* @__PURE__ */ Mo()),
	geo: /* @__PURE__ */ Z(/* @__PURE__ */ Mo())
}), /* @__PURE__ */ co((e) => e.noPlayer !== !1 || e.playerName === void 0 || dc("nickname", e.playerName), "Invalid host player name")), kf = new Set(Object.keys(Of.pipe[0].entries));
function Af(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	for (let t of Object.keys(e)) {
		if (t === "token") throw Error("External service tokens are not supported. Ball2D join verification is configured on the room.");
		if (!kf.has(t)) throw Error(`Unknown room setting: ${t}`);
	}
	let t = /* @__PURE__ */ Po(Of, e, { abortEarly: !0 });
	if (!t.success) throw Error(t.issues[0].message);
	let n = t.output;
	return {
		roomName: n.roomName,
		maxPlayers: n.maxPlayers ?? 16,
		password: n.password ?? "",
		public: n.public ?? !0,
		noPlayer: n.noPlayer ?? !0,
		playerName: n.noPlayer === !1 ? (n.playerName ?? "Host").trim() : void 0,
		stadium: n.stadium,
		...n.surface ? { surface: n.surface } : {},
		...n.geo === void 0 ? {} : { geo: Cf(n.geo) }
	};
}
function jf(e) {
	let t = new AbortController(), n = () => t.abort(e?.reason);
	e?.aborted ? n() : e?.addEventListener("abort", n, { once: !0 });
	let r = setTimeout(() => t.abort(new DOMException("Room startup timed out", "TimeoutError")), 15e3);
	return {
		signal: t.signal,
		async run(e) {
			let n, r = new Promise((e, t) => {
				n = t;
			}), i = () => n(t.signal.reason);
			t.signal.addEventListener("abort", i, { once: !0 }), t.signal.aborted && i();
			try {
				return await Promise.race([e, r]);
			} finally {
				t.signal.removeEventListener("abort", i);
			}
		},
		dispose() {
			clearTimeout(r), e?.removeEventListener("abort", n);
		}
	};
}
var Mf = 12e3;
function Nf(e) {
	if (e.noPlayer !== void 0 && typeof e.noPlayer != "boolean") throw Error("Invalid noPlayer setting");
	if (e.noPlayer !== !1) return null;
	let t = e.playerName ?? "Host";
	if (!dc("nickname", t)) throw Error("Invalid host player name");
	return t.trim();
}
function Pf(e, t, n, r, i, a) {
	let o;
	return {
		ready: new Promise((s, c) => {
			o = setTimeout(() => c(Error("Signaling timed out")), Mf), e.network = new Xs(n.id, { hostToken: n.hostToken }, {
				ready: (t, n) => {
					if (!n) {
						c(Error("Host authority was not granted"));
						return;
					}
					r !== null && (e.players.add({
						slot: 0,
						peerId: t,
						name: r,
						team: 0,
						admin: !0
					}), e.engine.joinPlayer(0)), clearTimeout(o), s();
				},
				allowStadiumUpload: (e) => t.allowStadiumUpload(e),
				open: () => {},
				control: (e, n) => t.control(e, n),
				fast: (e, n) => t.fast(e, n),
				leave: (e) => t.leave(e),
				status: (t, n) => {
					n === "error" && e.report(t);
				},
				ended: (t) => {
					clearTimeout(o), c(Error(t)), a(), e.report(t);
				}
			}, i.network);
		}),
		cancel: () => clearTimeout(o)
	};
}
async function Ff(e, t, n, r) {
	let i = mi(t.network.serviceOrigin), a = mi(t.publicOrigin ?? i), o = Af(e), s = Nf(o), c = jf(n), l;
	try {
		c.signal.throwIfAborted();
		let e = await c.run(t.loadEngine(c.signal));
		e.load(o.stadium ?? b());
		let n = r.construct(e);
		l = n;
		let u = r.core(n);
		u.surface = o.surface ?? null;
		let d = await c.run(t.request(new URL(pi.rooms, i), {
			signal: c.signal,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: o.roomName,
				maxPlayers: o.maxPlayers,
				password: o.password ?? "",
				private: o.public === !1,
				hostPlayer: s !== null,
				...s === null ? {} : { hostName: s },
				...o.geo ? { geo: o.geo } : {}
			})
		}));
		if (!d.ok) throw await c.run(Sf(d, c.signal));
		let f = await c.run(d.json());
		u.roomId = f.id, u.roomName = o.roomName, u.roomLink = `${a}${mf(f.id)}`;
		let p = Pf(u, r.gateway(n), f, s, t, () => r.close(n));
		try {
			await c.run(p.ready);
		} catch (e) {
			throw r.close(n), e;
		} finally {
			p.cancel();
		}
		if (u.closed) throw Error("Room closed during startup");
		return r.start(n), n;
	} catch (e) {
		throw l && r.close(l), e;
	} finally {
		c.dispose();
	}
}
var If = 32768;
function Lf(e, t, n, r) {
	let i;
	for (let a of e.peers.values()) !a.relay || a.fast?.readyState !== "open" || a.fast.bufferedAmount >= If || (i ??= t.packet(n, r), e.fast(a, i));
}
function Rf(e, t, n, r, i = 0) {
	let a = [...e.peers.values()].filter((e) => e.fast?.readyState === "open" && e.fast.bufferedAmount < If);
	if (!a.length) return;
	let o = Pa(t, a.map((e) => r.acknowledgment(e.id)), n, i, a.map((e) => r.arrival(e.id)));
	for (let t = 0; t < a.length; t++) {
		let n = a[t], r = o[t], i = r.reduce((e, t) => e + t.byteLength, 0);
		if (!(n.fast?.readyState !== "open" || n.fast.bufferedAmount + i > If)) for (let t of r) e.fast(n, t);
	}
}
var zf = 1e3 / U, Bf = 500, Vf = 32, Hf = U / 30;
function Uf(e) {
	let { engine: t } = e, n = t.red, r = t.blue, i = t.phase;
	e.match.step(), e.turfState.capture(t, e.surface), e.soundStream.capture(t, e.epoch);
	let a = {
		kickers: t.ballKicks.map((t) => {
			let n = e.players.bySlot(t);
			return n ? e.publicPlayer(n) : null;
		}).filter((e) => !!e),
		redGoal: t.red > n,
		blueGoal: t.blue > r,
		positionsReset: i === "goal" && t.phase === "playing",
		stopped: i === "finished" && t.phase === "lobby",
		victory: i !== "finished" && t.phase === "finished" ? Ji(e) : null
	}, o = e.captureCommentary();
	t.phase !== i && !o.length && e.broadcastState();
	let s = e.captureAnalysis();
	e.captureIntelligence(o), e.captureXg(), e.captureMatchStatsPositions(), e.notifyCommentary(o), e.broadcastMatchStatsSpatial();
	for (let t of s) e.invoke("onMatchObservation", e.hooks.onMatchObservation, structuredClone(t));
	return a;
}
var Wf = class {
	room;
	accumulator = 0;
	last = performance.now();
	constructor(e) {
		this.room = e;
	}
	restart() {
		this.last = performance.now(), this.accumulator = 0;
	}
	advance() {
		let { room: e } = this;
		if (e.closed) return;
		let t = performance.now(), n = t - this.last;
		this.last = t, n > Bf && e.engine.phase === "playing" && !e.engine.paused && (Wi(e, !0, null), e.report("Host scheduler stalled; match paused.")), this.accumulator += Math.max(0, Math.min(n, Bf));
		let r = 0;
		try {
			for (; !e.closed && this.accumulator >= zf && r++ < Vf && (this.tick(t), !e.closed);) this.accumulator -= zf;
			e.closed || Cu(e.network, e.soundStream.drain(t));
		} catch (t) {
			e.closed || (e.engine.setPaused(!0), e.report(String(t)));
		}
	}
	tick(e) {
		let { room: t } = this, { engine: n, hooks: r } = t;
		for (let n of t.players.all) t.inputs.expire(n.peerId, n.slot, e);
		if (t.inputs.release(n.tick + 1), t.match.checkRecordingLimit(), t.closed || (n.phase !== "lobby" && !n.paused && !n.resumeTicks && t.invoke("onGameTick", r.onGameTick), t.closed)) return;
		let i = Uf(t);
		i.stopped && t.invoke("onGameStop", r.onGameStop, null), i.victory && (t.invoke("onTeamVictory", r.onTeamVictory, { ...i.victory }), t.invoke("onGameVictory", r.onGameVictory, { ...i.victory }));
		for (let e of i.kickers) t.invoke("onPlayerBallKick", r.onPlayerBallKick, e);
		i.redGoal && t.invoke("onTeamGoal", r.onTeamGoal, 1), i.blueGoal && t.invoke("onTeamGoal", r.onTeamGoal, 2), i.positionsReset && t.invoke("onPositionsReset", r.onPositionsReset), !t.closed && (Lf(t.network, t.match.relay, n.tick, t.epoch), n.tick % Hf === 0 && Rf(t.network, n.snapshot(), t.epoch, t.inputs, n.checksum()));
	}
}, Gf = Object.freeze({ ...S }), Kf = (e) => new Blob([ui(e)], { type: "application/x-ball2d-replay" }), qf = class e {
	engine;
	core;
	loop;
	timer;
	linkNotification;
	closeController = new AbortController();
	signal = this.closeController.signal;
	gateway;
	lastRecording = null;
	constructor(e, t, n, r) {
		this.engine = e, this.core = new af(e, t, this, (e, t) => {
			let n = Kf(e);
			this.lastRecording = n, this.core.invoke("onRecordingComplete", this.onRecordingComplete, n, t);
		}, n, r), this.loop = new Wf(this.core), this.gateway = Nl(this.core);
	}
	static async create(t, n = Ai(), r, i = {}) {
		let a = () => n.loadEngine(new AbortController().signal), o = new tr(i, a), s = new _r({}, void 0, a);
		return Ff(t, n, r, {
			construct: (t) => new e(t, n, o, s),
			core: (e) => e.core,
			gateway: (e) => e.gateway,
			start: (e) => e.start(),
			close: (e) => e.close()
		});
	}
	start() {
		this.loop.restart(), this.timer = setInterval(() => this.loop.advance(), 1e3 / U);
		let e = this.core.roomLink;
		this.linkNotification = setTimeout(() => {
			this.linkNotification = void 0, this.core.invoke("onRoomLink", this.onRoomLink, e);
		}, 0);
	}
	advance() {
		this.loop.advance();
	}
	get network() {
		return this.core.network;
	}
	get roomId() {
		return this.core.roomId;
	}
	get roomLink() {
		return this.core.roomLink;
	}
	get roomName() {
		return this.core.roomName;
	}
	get teamsLocked() {
		return this.core.locked;
	}
	get requireVerification() {
		return this.core.network.requireVerification;
	}
	get CollisionFlags() {
		return Gf;
	}
	getPlayerList() {
		return this.core.players.all.map((e) => this.core.publicPlayer(e));
	}
	getPlayer(e) {
		return this.core.publicOrNull(this.core.players.byId(e) ?? null);
	}
	getScores() {
		return Ji(this.core);
	}
	getBallPosition() {
		return Vi(this.core);
	}
	getDiscCount() {
		return Pi(this.core);
	}
	getDiscProperties(e) {
		return Ii(this.core, e);
	}
	getPlayerDiscProperties(e) {
		return zi(this.core, e);
	}
	getState() {
		return this.engine.snapshot();
	}
	async setMatchXgConfig(e) {
		this.core.assertOpen(), await this.core.xg.configure(this.engine, e, this.core.commentaryAnalysis.getAnalysisGeometry(this.engine)), this.core.assertOpen(), this.core.baselineXg();
	}
	getMatchXgStatus() {
		return structuredClone(this.core.xg.getStatus());
	}
	setCommentaryPolicy(e) {
		this.core.assertOpen(), this.core.commentary.configure(e), this.core.match.recordCommentaryPolicy(this.core.commentary.getPolicy()), this.core.network.broadcast({
			type: "commentary-config",
			config: this.core.commentary.snapshot()
		});
	}
	getCommentaryPolicy() {
		return this.core.commentary.getPolicy();
	}
	setMatchIntelligencePolicy(e) {
		this.core.assertOpen(), this.core.intelligence.configure(e);
	}
	getMatchIntelligencePolicy() {
		return this.core.intelligence.getPolicy();
	}
	setMatchIntelligenceRoles(e) {
		this.core.assertOpen(), this.core.intelligence.setRoles(e, (e) => {
			let t = this.core.players.byId(e);
			return t && t.team !== 0 ? {
				sessionId: this.core.factStream.streamId,
				playerId: e,
				team: t.team,
				name: t.name
			} : null;
		});
	}
	getMatchIntelligenceRoles() {
		return this.core.intelligence.getRoles();
	}
	getMatchIntelligenceSnapshot() {
		return this.core.intelligence.getSnapshot();
	}
	getMatchStatsSnapshot() {
		return this.core.matchStats.snapshot();
	}
	setCommentaryCatalog(e) {
		this.core.assertOpen(), this.core.commentary.setCatalog(e), this.broadcastCommentaryAssets("catalog");
	}
	getCommentaryCatalog() {
		return this.core.commentary.getCatalog();
	}
	setAtmospherePolicy(e) {
		this.core.assertOpen(), this.core.commentary.setAtmosphere(e), this.core.network.broadcast({
			type: "commentary-config",
			config: this.core.commentary.snapshot()
		});
	}
	getAtmospherePolicy() {
		return this.core.commentary.getAtmosphere();
	}
	setAtmospherePack(e) {
		this.core.assertOpen(), this.core.commentary.setAtmospherePack(e), this.broadcastCommentaryAssets("atmospherePack");
	}
	getAtmospherePack() {
		return this.core.commentary.getAtmospherePack();
	}
	broadcastCommentaryAssets(e) {
		this.core.network.broadcast({
			type: "commentary-config",
			config: this.core.commentary.snapshot(Date.now(), e)
		});
	}
	setPlayerCommentaryContext(e, t) {
		this.core.assertOpen();
		let n = this.core.players.byId(e);
		if (!n || n.team === 0) throw Error("Commentary context requires a current field player");
		this.core.commentary.setPlayer({
			sessionId: this.core.factStream.streamId,
			playerId: e,
			team: n.team,
			name: n.name
		}, t), this.core.network.broadcast({
			type: "commentary-config",
			config: this.core.commentary.snapshot()
		});
	}
	getPlayerCommentaryContext(e) {
		return this.core.players.byId(e) ? this.core.commentary.getPlayer(e) : [];
	}
	setCommentaryGeometry(e) {
		this.core.assertOpen(), this.core.commentaryAnalysis.getAnalysisGeometry(this.engine), this.core.commentaryAnalysis.configure(this.engine, e) && (this.core.intelligence.invalidate(), this.core.xg.invalidate("domain-change"));
	}
	getCommentaryGeometry() {
		return this.core.commentaryAnalysis.getGeometry(this.engine);
	}
	setTeamColors(e, t, n, r) {
		sl(this.core, e, t, n, r);
	}
	reorderPlayers(e, t) {
		cl(this.core, e, t);
	}
	setPlayerAvatar(e, t) {
		ll(this.core, e, t);
	}
	setPlayerTeam(e, t) {
		nl(this.core, e, t, null);
	}
	setPlayerAdmin(e, t) {
		rl(this.core, e, t);
	}
	setPlayerMuted(e, t) {
		il(this.core, e, t, null);
	}
	setTeamsLock(e) {
		al(this.core, e, null);
	}
	kickPlayer(e, t = "Removed by host", n = !1) {
		if (this.core.assertOpen(), typeof n != "boolean") throw Error("Invalid ban flag");
		if (n) return ec(this.core, e, t);
		$s(this.core, e, t, null);
	}
	clearBan(e) {
		return tc(this.core, e);
	}
	clearBans() {
		return nc(this.core);
	}
	sendChat(e, t) {
		$i(this.core, e, t);
	}
	sendAnnouncement(e, t, n, r, i) {
		ea(this.core, e, t, n, r, i);
	}
	startGame() {
		Hi(this.core, null);
	}
	stopGame() {
		Ui(this.core, null);
	}
	pauseGame(e) {
		Wi(this.core, e, null);
	}
	setKickRateLimit(e = 2, t = 0, n = 0) {
		Gi(this.core, e, t, n, null);
	}
	setScoreLimit(e) {
		Ki(this.core, e);
	}
	setTimeLimit(e) {
		qi(this.core, e);
	}
	async setPassword(e) {
		this.core.assertOpen(), await this.core.network.setPassword(e);
	}
	async setRequireVerification(e) {
		this.core.assertOpen(), await this.core.network.setRequireVerification(e);
	}
	setDefaultStadium(e) {
		return fl(this.core, e);
	}
	setCustomStadium(e) {
		ul(this.core, e, null);
	}
	setSurface(e) {
		dl(this.core, e);
	}
	getSurface() {
		return this.core.surface;
	}
	setDiscProperties(e, t) {
		Li(this.core, e, t);
	}
	setPlayerDiscProperties(e, t) {
		Bi(this.core, e, t);
	}
	startRecording() {
		this.core.assertOpen(), this.core.match.startRecording(this.core.players.all.map((e) => ({
			slot: e.slot,
			name: e.name,
			avatar: e.avatarOverride ?? e.avatar
		})), this.core.teamStyles, this.core.surface), this.core.match.recordCommentaryPolicy(this.core.commentary.getPolicy());
	}
	stopRecording() {
		let e = this.core.match.stopRecording();
		return e ? Kf(e) : null;
	}
	close() {
		let { core: e } = this;
		if (!e.closed) {
			e.closed = !0, e.xg.close(), e.intelligence.closeTrajectory(), e.inputs.close(), this.closeController.abort();
			try {
				e.match.close();
			} finally {
				clearInterval(this.timer), clearTimeout(this.linkNotification), this.linkNotification = void 0, e.network?.close(), e.players.clear(), e.intelligence.reset(), e.intelligence.setRoles([], () => null), e.matchStats.reset(), e.traffic.clear();
			}
		}
	}
};
function Jf(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	let t = { ...e }, n = t.maxPlayers ?? 12;
	if (typeof n != "number" || !Number.isFinite(n) || !Number.isInteger(n)) throw Error("maxPlayers must be a finite integer");
	return Af({
		...t,
		roomName: t.roomName ?? "Headless Room",
		playerName: t.playerName ?? "Host",
		noPlayer: t.noPlayer ?? !1,
		public: t.public ?? !1,
		maxPlayers: Math.max(2, Math.min(32, n)),
		password: t.password ?? ""
	});
}
var Yf = class {
	onError;
	pending = [];
	active;
	scheduled = !1;
	closed = !1;
	constructor(e = () => {}) {
		this.onError = e;
	}
	enqueue(e) {
		let t = new Promise((t, n) => {
			if (this.closed) {
				n(Error("Room is closed"));
				return;
			}
			if (this.pending.length >= 256) {
				n(Error("Room command queue is full"));
				return;
			}
			this.pending.push({
				run: e,
				resolve: (e) => t(e),
				reject: n
			}), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
				this.drain();
			}));
		});
		return t.catch((e) => {
			if (!this.closed) try {
				this.onError(e);
			} catch {}
		}), t;
	}
	async drain() {
		for (; !this.closed && this.pending.length;) {
			let e = this.pending.shift();
			if (!e) break;
			this.active = e;
			try {
				e.resolve(await e.run());
			} catch (t) {
				e.reject(t);
			}
			this.active = void 0;
		}
		this.scheduled = !1;
	}
	close() {
		if (this.closed) return;
		this.closed = !0;
		let e = Error("Room is closed");
		this.active?.reject(e);
		for (let t of this.pending.splice(0)) t.reject(e);
	}
}, Xf = /* @__PURE__ */ "sendChat.sendAnnouncement.setPlayerAdmin.setPlayerMuted.setPlayerTeam.kickPlayer.clearBan.clearBans.setScoreLimit.setTimeLimit.setCustomStadium.setDefaultStadium.setSurface.setTeamsLock.setTeamColors.startGame.stopGame.pauseGame.setPassword.setRequireVerification.reorderPlayers.setKickRateLimit.setPlayerAvatar.setDiscProperties.setPlayerDiscProperties.setMatchXgConfig.setCommentaryPolicy.setMatchIntelligencePolicy.setMatchIntelligenceRoles.setPlayerCommentaryContext.setCommentaryGeometry.setCommentaryCatalog.setAtmospherePolicy.setAtmospherePack".split(".");
function Zf(e, t) {
	let n = Object.create(null);
	t && Object.defineProperty(n, "closed", {
		enumerable: !0,
		value: t
	});
	let r = new Yf((t) => {
		let n = e.onError?.(String(t));
		n instanceof Promise && n.catch(() => {});
	});
	e.signal.addEventListener("abort", () => r.close(), { once: !0 }), e.signal.aborted && r.close();
	for (let t of Xf) Object.defineProperty(n, t, {
		enumerable: !0,
		value: (...n) => {
			try {
				let i = structuredClone(n);
				return (t === "setScoreLimit" || t === "setTimeLimit") && typeof i[0] == "number" && Number.isInteger(i[0]) && (i[0] = Math.max(0, Math.min(99, i[0]))), r.enqueue(() => Reflect.apply(e[t], e, i));
			} catch (e) {
				return r.enqueue(() => {
					throw e;
				});
			}
		}
	});
	for (let t of [
		"getPlayer",
		"getPlayerList",
		"getScores",
		"getBallPosition",
		"getDiscCount",
		"getDiscProperties",
		"getPlayerDiscProperties",
		"getState",
		"getMatchXgStatus",
		"getCommentaryPolicy",
		"getMatchIntelligencePolicy",
		"getMatchIntelligenceRoles",
		"getMatchIntelligenceSnapshot",
		"getMatchStatsSnapshot",
		"getPlayerCommentaryContext",
		"getCommentaryGeometry",
		"getCommentaryCatalog",
		"getAtmospherePolicy",
		"getAtmospherePack",
		"getSurface",
		"startRecording",
		"stopRecording"
	]) Object.defineProperty(n, t, {
		enumerable: !0,
		value: e[t].bind(e)
	});
	for (let t of [
		"roomId",
		"roomLink",
		"roomName",
		"lastRecording",
		"requireVerification",
		"CollisionFlags",
		"signal"
	]) Object.defineProperty(n, t, {
		enumerable: !0,
		get: () => e[t]
	});
	for (let t of /* @__PURE__ */ "onRoomLink.onMatchKickEstimate.onMatchFact.onMatchIntelligenceEvent.onMatchObservation.onPlayerJoin.onPlayerLeave.onPlayerChat.onPlayerDirectChat.onPlayerTeamChange.onPlayerAdminChange.onPlayerMuteChange.onPlayerKicked.onPlayerActivity.onPlayerInput.onPlayerBallKick.onTeamGoal.onTeamVictory.onGameVictory.onGameStart.onGameStop.onGameTick.onGamePause.onGameUnpause.onGamePauseChange.onPositionsReset.onStadiumChange.onSurfaceChange.onTeamsLockChange.onKickRateLimitSet.onRecordingComplete.onError".split(".")) {
		let r;
		Object.defineProperty(n, t, {
			enumerable: !0,
			get: () => r,
			set: (i) => {
				if (i != null && typeof i != "function") throw Error("Callback must be a function");
				r = i, Reflect.set(e, t, i == null ? void 0 : (...e) => Reflect.apply(i, n, e));
			}
		});
	}
	return Object.defineProperty(n, "close", {
		enumerable: !0,
		value: () => {
			r.close(), e.close();
		}
	}), Object.preventExtensions(n);
}
function Qf(e) {
	return hu(e);
}
function $f(e) {
	if (typeof e != "string") throw TypeError("Stadium source must be a string");
	let t = Me(e);
	return Object.freeze({
		name: t.name,
		surface: t.bg.type,
		canBeStored: t.canBeStored,
		warnings: Object.freeze([...t.warnings])
	});
}
var ep = Object.freeze(Di.map((e) => Object.freeze({
	id: e.id,
	name: e.name,
	displayName: e.displayName,
	tier: e.tier,
	shape: e.shape,
	goalWidth: e.goalWidth,
	cornerRadius: e.cornerRadius,
	pitch: Object.freeze({ ...e.pitch }),
	arena: Object.freeze({ ...e.arena }),
	teamSize: Object.freeze({ ...e.teamSize })
})));
function tp() {
	return ep;
}
async function np(e = {}, t = {}) {
	return Zf(await qf.create(Jf(e), void 0, t.signal, t.matchXgTrust));
}
export { xf as RoomAdmissionError, np as createRoom, tp as listStadiums, Oc as listSurfaces, Qf as readReplay, $f as validateStadium };
