var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = "694293262fc3a50a2786", u = {
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
}, d = 1023, f = 1024, p = [
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
function m(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid disc property update");
	let t = e, n = {};
	for (let e = 0; e < p.length; e++) {
		let [r, , i, a] = p[e], o = t[r];
		if (o == null) continue;
		if (typeof o != "number" || !Number.isFinite(o)) throw Error(`Invalid disc property: ${r}`);
		let s = e < 10 ? Math.fround(o) : o | 0;
		if (!Number.isFinite(s) || s < Math.fround(i) || s > a) throw Error(`Invalid disc property: ${r}`);
		n[r] = s;
	}
	return n;
}
var h = 6619135;
function g(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isInteger)) throw Error("Invalid kick rate limit");
	return Math.max(0, Math.min(255, e)) | Math.max(0, Math.min(255, t)) << 8 | Math.max(0, Math.min(100, n)) << 16;
}
function _(e) {
	return [
		e & 255,
		e >>> 8 & 255,
		e >>> 16
	];
}
function v(e = "Emerald Arena", t = 440, n = 220) {
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
var y = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
		}, k = function(e) {
			if (e == null) throw TypeError("Can't call method on  " + e);
			return e;
		}, A = function(e) {
			return function(t, n) {
				var r = String(k(t)), i = O(n), a = r.length, o, s;
				return i < 0 || i >= a ? e ? "" : void 0 : (o = r.charCodeAt(i), o < 55296 || o > 56319 || i + 1 === a || (s = r.charCodeAt(i + 1)) < 56320 || s > 57343 ? e ? r.charAt(i) : o : e ? r.slice(i, i + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
			};
		}(!1);
		E(E.P, "String", { codePointAt: function(e) {
			return A(this, e);
		} }), n.String.codePointAt;
		var j = Math.max, ne = Math.min, M = function(e, t) {
			return e = O(e), e < 0 ? j(e + t, 0) : ne(e, t);
		}, re = String.fromCharCode, ie = String.fromCodePoint;
		E(E.S + E.F * (!!ie && ie.length != 1), "String", { fromCodePoint: function(e) {
			for (var t = arguments, n = [], r = arguments.length, i = 0, a; r > i;) {
				if (a = +t[i++], M(a, 1114111) !== a) throw RangeError(a + " is not a valid code point");
				n.push(a < 65536 ? re(a) : re(((a -= 65536) >> 10) + 55296, a % 1024 + 56320));
			}
			return n.join("");
		} }), n.String.fromCodePoint;
		var N = {
			Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
			ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
			ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		}, P = {
			isSpaceSeparator: function(e) {
				return typeof e == "string" && N.Space_Separator.test(e);
			},
			isIdStartChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || N.ID_Start.test(e));
			},
			isIdContinueChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || N.ID_Continue.test(e));
			},
			isDigit: function(e) {
				return typeof e == "string" && /[0-9]/.test(e);
			},
			isHexDigit: function(e) {
				return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
			}
		}, ae, F, I, oe, se, L, R, ce, le, ue = function(e, t) {
			ae = String(e), F = "start", I = [], oe = 0, se = 1, L = 0, R = void 0, ce = void 0, le = void 0;
			do
				R = me(), xe[F]();
			while (R.type !== "eof");
			return typeof t == "function" ? de({ "": le }, "", t) : le;
		};
		function de(e, t, n) {
			var r = e[t];
			if (typeof r == "object" && r) {
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
					var a = String(i), o = de(r, a, n);
					o === void 0 ? delete r[a] : Object.defineProperty(r, a, {
						value: o,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
				else for (var s in r) {
					var c = de(r, s, n);
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
		var z, B, fe, pe, V;
		function me() {
			for (z = "default", B = "", fe = !1, pe = 1;;) {
				V = he();
				var e = ge[z]();
				if (e) return e;
			}
		}
		function he() {
			if (ae[oe]) return String.fromCodePoint(ae.codePointAt(oe));
		}
		function H() {
			var e = he();
			return e === "\n" ? (se++, L = 0) : e ? L += e.length : L++, e && (oe += e.length), e;
		}
		var ge = {
			default: function() {
				switch (V) {
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
						H();
						return;
					case "/":
						H(), z = "comment";
						return;
					case void 0: return H(), U("eof");
				}
				if (P.isSpaceSeparator(V)) {
					H();
					return;
				}
				return ge[F]();
			},
			comment: function() {
				switch (V) {
					case "*":
						H(), z = "multiLineComment";
						return;
					case "/":
						H(), z = "singleLineComment";
						return;
				}
				throw W(H());
			},
			multiLineComment: function() {
				switch (V) {
					case "*":
						H(), z = "multiLineCommentAsterisk";
						return;
					case void 0: throw W(H());
				}
				H();
			},
			multiLineCommentAsterisk: function() {
				switch (V) {
					case "*":
						H();
						return;
					case "/":
						H(), z = "default";
						return;
					case void 0: throw W(H());
				}
				H(), z = "multiLineComment";
			},
			singleLineComment: function() {
				switch (V) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						H(), z = "default";
						return;
					case void 0: return H(), U("eof");
				}
				H();
			},
			value: function() {
				switch (V) {
					case "{":
					case "[": return U("punctuator", H());
					case "n": return H(), _e("ull"), U("null", null);
					case "t": return H(), _e("rue"), U("boolean", !0);
					case "f": return H(), _e("alse"), U("boolean", !1);
					case "-":
					case "+":
						H() === "-" && (pe = -1), z = "sign";
						return;
					case ".":
						B = H(), z = "decimalPointLeading";
						return;
					case "0":
						B = H(), z = "zero";
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
						B = H(), z = "decimalInteger";
						return;
					case "I": return H(), _e("nfinity"), U("numeric", Infinity);
					case "N": return H(), _e("aN"), U("numeric", NaN);
					case "\"":
					case "'":
						fe = H() === "\"", B = "", z = "string";
						return;
				}
				throw W(H());
			},
			identifierNameStartEscape: function() {
				if (V !== "u") throw W(H());
				H();
				var e = be();
				switch (e) {
					case "$":
					case "_": break;
					default: if (!P.isIdStartChar(e)) throw Te();
				}
				B += e, z = "identifierName";
			},
			identifierName: function() {
				switch (V) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						B += H();
						return;
					case "\\":
						H(), z = "identifierNameEscape";
						return;
				}
				if (P.isIdContinueChar(V)) {
					B += H();
					return;
				}
				return U("identifier", B);
			},
			identifierNameEscape: function() {
				if (V !== "u") throw W(H());
				H();
				var e = be();
				switch (e) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default: if (!P.isIdContinueChar(e)) throw Te();
				}
				B += e, z = "identifierName";
			},
			sign: function() {
				switch (V) {
					case ".":
						B = H(), z = "decimalPointLeading";
						return;
					case "0":
						B = H(), z = "zero";
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
						B = H(), z = "decimalInteger";
						return;
					case "I": return H(), _e("nfinity"), U("numeric", pe * Infinity);
					case "N": return H(), _e("aN"), U("numeric", NaN);
				}
				throw W(H());
			},
			zero: function() {
				switch (V) {
					case ".":
						B += H(), z = "decimalPoint";
						return;
					case "e":
					case "E":
						B += H(), z = "decimalExponent";
						return;
					case "x":
					case "X":
						B += H(), z = "hexadecimal";
						return;
				}
				return U("numeric", pe * 0);
			},
			decimalInteger: function() {
				switch (V) {
					case ".":
						B += H(), z = "decimalPoint";
						return;
					case "e":
					case "E":
						B += H(), z = "decimalExponent";
						return;
				}
				if (P.isDigit(V)) {
					B += H();
					return;
				}
				return U("numeric", pe * Number(B));
			},
			decimalPointLeading: function() {
				if (P.isDigit(V)) {
					B += H(), z = "decimalFraction";
					return;
				}
				throw W(H());
			},
			decimalPoint: function() {
				switch (V) {
					case "e":
					case "E":
						B += H(), z = "decimalExponent";
						return;
				}
				if (P.isDigit(V)) {
					B += H(), z = "decimalFraction";
					return;
				}
				return U("numeric", pe * Number(B));
			},
			decimalFraction: function() {
				switch (V) {
					case "e":
					case "E":
						B += H(), z = "decimalExponent";
						return;
				}
				if (P.isDigit(V)) {
					B += H();
					return;
				}
				return U("numeric", pe * Number(B));
			},
			decimalExponent: function() {
				switch (V) {
					case "+":
					case "-":
						B += H(), z = "decimalExponentSign";
						return;
				}
				if (P.isDigit(V)) {
					B += H(), z = "decimalExponentInteger";
					return;
				}
				throw W(H());
			},
			decimalExponentSign: function() {
				if (P.isDigit(V)) {
					B += H(), z = "decimalExponentInteger";
					return;
				}
				throw W(H());
			},
			decimalExponentInteger: function() {
				if (P.isDigit(V)) {
					B += H();
					return;
				}
				return U("numeric", pe * Number(B));
			},
			hexadecimal: function() {
				if (P.isHexDigit(V)) {
					B += H(), z = "hexadecimalInteger";
					return;
				}
				throw W(H());
			},
			hexadecimalInteger: function() {
				if (P.isHexDigit(V)) {
					B += H();
					return;
				}
				return U("numeric", pe * Number(B));
			},
			string: function() {
				switch (V) {
					case "\\":
						H(), B += ve();
						return;
					case "\"":
						if (fe) return H(), U("string", B);
						B += H();
						return;
					case "'":
						if (!fe) return H(), U("string", B);
						B += H();
						return;
					case "\n":
					case "\r": throw W(H());
					case "\u2028":
					case "\u2029":
						Ee(V);
						break;
					case void 0: throw W(H());
				}
				B += H();
			},
			start: function() {
				switch (V) {
					case "{":
					case "[": return U("punctuator", H());
				}
				z = "value";
			},
			beforePropertyName: function() {
				switch (V) {
					case "$":
					case "_":
						B = H(), z = "identifierName";
						return;
					case "\\":
						H(), z = "identifierNameStartEscape";
						return;
					case "}": return U("punctuator", H());
					case "\"":
					case "'":
						fe = H() === "\"", z = "string";
						return;
				}
				if (P.isIdStartChar(V)) {
					B += H(), z = "identifierName";
					return;
				}
				throw W(H());
			},
			afterPropertyName: function() {
				if (V === ":") return U("punctuator", H());
				throw W(H());
			},
			beforePropertyValue: function() {
				z = "value";
			},
			afterPropertyValue: function() {
				switch (V) {
					case ",":
					case "}": return U("punctuator", H());
				}
				throw W(H());
			},
			beforeArrayValue: function() {
				if (V === "]") return U("punctuator", H());
				z = "value";
			},
			afterArrayValue: function() {
				switch (V) {
					case ",":
					case "]": return U("punctuator", H());
				}
				throw W(H());
			},
			end: function() {
				throw W(H());
			}
		};
		function U(e, t) {
			return {
				type: e,
				value: t,
				line: se,
				column: L
			};
		}
		function _e(e) {
			for (var t = 0, n = e; t < n.length; t += 1) {
				var r = n[t];
				if (he() !== r) throw W(H());
				H();
			}
		}
		function ve() {
			switch (he()) {
				case "b": return H(), "\b";
				case "f": return H(), "\f";
				case "n": return H(), "\n";
				case "r": return H(), "\r";
				case "t": return H(), "	";
				case "v": return H(), "\v";
				case "0":
					if (H(), P.isDigit(he())) throw W(H());
					return "\0";
				case "x": return H(), ye();
				case "u": return H(), be();
				case "\n":
				case "\u2028":
				case "\u2029": return H(), "";
				case "\r": return H(), he() === "\n" && H(), "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw W(H());
				case void 0: throw W(H());
			}
			return H();
		}
		function ye() {
			var e = "", t = he();
			if (!P.isHexDigit(t) || (e += H(), t = he(), !P.isHexDigit(t))) throw W(H());
			return e += H(), String.fromCodePoint(parseInt(e, 16));
		}
		function be() {
			for (var e = "", t = 4; t-- > 0;) {
				var n = he();
				if (!P.isHexDigit(n)) throw W(H());
				e += H();
			}
			return String.fromCodePoint(parseInt(e, 16));
		}
		var xe = {
			start: function() {
				if (R.type === "eof") throw we();
				Se();
			},
			beforePropertyName: function() {
				switch (R.type) {
					case "identifier":
					case "string":
						ce = R.value, F = "afterPropertyName";
						return;
					case "punctuator":
						Ce();
						return;
					case "eof": throw we();
				}
			},
			afterPropertyName: function() {
				if (R.type === "eof") throw we();
				F = "beforePropertyValue";
			},
			beforePropertyValue: function() {
				if (R.type === "eof") throw we();
				Se();
			},
			beforeArrayValue: function() {
				if (R.type === "eof") throw we();
				if (R.type === "punctuator" && R.value === "]") {
					Ce();
					return;
				}
				Se();
			},
			afterPropertyValue: function() {
				if (R.type === "eof") throw we();
				switch (R.value) {
					case ",":
						F = "beforePropertyName";
						return;
					case "}": Ce();
				}
			},
			afterArrayValue: function() {
				if (R.type === "eof") throw we();
				switch (R.value) {
					case ",":
						F = "beforeArrayValue";
						return;
					case "]": Ce();
				}
			},
			end: function() {}
		};
		function Se() {
			var e;
			switch (R.type) {
				case "punctuator":
					switch (R.value) {
						case "{":
							e = {};
							break;
						case "[": e = [];
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string": e = R.value;
			}
			if (le === void 0) le = e;
			else {
				var t = I[I.length - 1];
				Array.isArray(t) ? t.push(e) : Object.defineProperty(t, ce, {
					value: e,
					writable: !0,
					enumerable: !0,
					configurable: !0
				});
			}
			if (typeof e == "object" && e) I.push(e), F = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName";
			else {
				var n = I[I.length - 1];
				F = n == null ? "end" : Array.isArray(n) ? "afterArrayValue" : "afterPropertyValue";
			}
		}
		function Ce() {
			I.pop();
			var e = I[I.length - 1];
			F = e == null ? "end" : Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue";
		}
		function W(e) {
			return G(e === void 0 ? "JSON5: invalid end of input at " + se + ":" + L : "JSON5: invalid character '" + De(e) + "' at " + se + ":" + L);
		}
		function we() {
			return G("JSON5: invalid end of input at " + se + ":" + L);
		}
		function Te() {
			return L -= 5, G("JSON5: invalid identifier character at " + se + ":" + L);
		}
		function Ee(e) {
			console.warn("JSON5: '" + De(e) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function De(e) {
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
		function G(e) {
			var t = SyntaxError(e);
			return t.lineNumber = se, t.columnNumber = L, t;
		}
		return {
			parse: ue,
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
							case "\0": if (P.isDigit(e[i + 1])) {
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
					if (!P.isIdStartChar(t)) return m(e, !0);
					for (var n = t.length; n < e.length; n++) if (!P.isIdContinueChar(String.fromCodePoint(e.codePointAt(n)))) return m(e, !0);
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
function b(e, t, n, r) {
	let i = Math.ceil(2 * Math.SQRT2 * 100 / Math.max(.5, Math.min(10, r))), a = e + 32;
	if (a * (2 * t + a + 2 * n) * i * 13 > 26e6) throw Error("Stadium collision complexity exceeds the room budget");
}
var x = {
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
}, ee = 4096;
function S(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Expected an object");
	return e;
}
function C(e, t, n = -4096, r = ee) {
	let i = e === void 0 ? t : e;
	if (typeof i != "number" || !Number.isFinite(i) || i < n || i > r) throw Error(`Number must be between ${n} and ${r}`);
	return i;
}
function w(e, t = [0, 0]) {
	if (e === void 0) return [...t];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Expected [x, y]");
	return [C(e[0], 0), C(e[1], 0)];
}
function T(e, t) {
	if (e === void 0) return [];
	if (!Array.isArray(e) || e.length > t) throw Error(`Array limit: ${t}`);
	return e;
}
function E(e, t) {
	return e === void 0 ? t : typeof e == "number" ? C(e, t, -2147483648, 4294967295) | 0 : T(e, 16).reduce((e, t) => {
		if (typeof t != "string" || !Object.hasOwn(x, t)) throw Error("Unknown collision flag");
		return e | x[t];
	}, 0);
}
function D(e, t = "FFFFFF") {
	if (e === void 0) return t;
	if (e === "transparent") return e;
	if (Array.isArray(e) && e.length === 3) return e.map((e) => Math.round(C(e, 0, 0, 255)).toString(16).padStart(2, "0")).join("");
	if (typeof e == "string" && /^[0-9a-f]{6}$/i.test(e)) return e;
	throw Error("Invalid color");
}
var te = 4096, O = 1024, k = .15, A = 1e-4, j = (e) => [C(e.x, 0), C(e.y, 0)];
function ne(e) {
	return {
		a: j(e),
		b: j(e),
		bCoef: C(e.bCoef, 1, -1, 8192),
		cGroup: E(e.cGroup, 32),
		cMask: E(e.cMask, 63),
		bias: 0,
		color: "transparent",
		vis: !1
	};
}
function M(e) {
	return e.curveF === void 0 ? C(e.curve, 0, -359, 359) : 2 * Math.atan2(1, C(e.curveF, 0, -1e8, 1e8)) * 180 / Math.PI;
}
function re(e, t, n, r, i, a) {
	let o = r * Math.PI / 180, s = t[0] - e[0], c = t[1] - e[1];
	if (Math.hypot(s, c) < .001) throw Error("Arc endpoints overlap");
	let l = 1 / (2 * Math.tan(o / 2)), u = [(e[0] + t[0]) / 2 - c * l, (e[1] + t[1]) / 2 + s * l], d = Math.hypot(e[0] - u[0], e[1] - u[1]), f = Math.atan2(e[1] - u[1], e[0] - u[0]), p = Math.ceil(Math.abs(o) / Math.max(1e-8, 2 * Math.acos(Math.max(-1, 1 - k / d))));
	if (a.segments.length + p > te) throw Error("Compiled geometry exceeds 4096 segments");
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
function ie(e, t, n) {
	let r = e.map(ne), i = {
		segments: r,
		arcs: [],
		colliders: [...r]
	};
	for (let a of T(t, O)) {
		let t = n(a), o = C(t.v0, -1, 0, e.length - 1), s = C(t.v1, -1, 0, e.length - 1);
		if (!Number.isInteger(o) || !Number.isInteger(s)) throw Error("Vertex indices must be integers");
		let c = j(e[o]), l = j(e[s]), u = {
			bCoef: C(t.bCoef, 1, -1, 8192),
			cGroup: E(t.cGroup, 32),
			cMask: E(t.cMask, 63),
			bias: C(t.bias, 0, -100, 100),
			color: D(t.color, "000000"),
			vis: t.vis !== !1
		}, d = M(t);
		if (Math.abs(d) >= A) {
			re(c, l, u, d, t, i);
			continue;
		}
		let f = {
			a: c,
			b: l,
			...u
		};
		r.push(f), (c[0] !== l[0] || c[1] !== l[1]) && i.colliders.push(f);
	}
	if (r.length > te) throw Error("Compiled geometry exceeds 4096 segments");
	return i;
}
var N = Object.fromEntries(Object.entries({
	root: "version physicsMode name width height maxViewWidth cameraFollow spawnDistance canBeStored kickOffReset bg traits vertexes segments goals discs planes joints redSpawnPoints blueSpawnPoints playerPhysics ballPhysics",
	bg: "type width height kickOffRadius cornerRadius color",
	vertexes: "trait x y bCoef cMask cGroup",
	segments: "trait v0 v1 bCoef cMask cGroup curve curveF bias color vis",
	discs: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color",
	planes: "trait normal dist bCoef cMask cGroup",
	goals: "trait p0 p1 team",
	joints: "trait d0 d1 length strength color",
	playerPhysics: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color acceleration kickingAcceleration kickingDamping kickStrength kickback"
}).map(([e, t]) => [e, new Set(t.split(" "))])), P = new Set([
	"vertexes",
	"segments",
	"discs",
	"planes",
	"goals",
	"joints",
	"playerPhysics"
].flatMap((e) => [...N[e]]));
function ae(e) {
	let t = [], n = (e, t) => {
		let n = t.length > 80 ? `${t.slice(0, 80)}…` : t;
		return e + (/^[A-Za-z_$][\w$]*$/.test(n) ? `.${n}` : `[${JSON.stringify(n)}]`);
	}, r = (e, r, i) => {
		if (e && typeof e == "object" && !Array.isArray(e)) for (let a of Object.keys(e)) r.has(a) || (t.length < 64 ? t.push(`Unsupported stadium field: ${n(i, a)}`) : t.length === 64 && t.push("Additional unsupported stadium fields omitted."));
	};
	r(e, N.root, "$"), r(e.bg, N.bg, "$.bg");
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
			r(e, N[t], `$.${t}[${n}]`);
		});
	}
	if (r(e.ballPhysics, N.discs, "$.ballPhysics"), r(e.playerPhysics, N.playerPhysics, "$.playerPhysics"), e.traits && typeof e.traits == "object" && !Array.isArray(e.traits)) for (let [t, i] of Object.entries(e.traits)) r(i, P, n("$.traits", t));
	return t;
}
var F = 262144, I = 63, oe = 1024, se = 64, L = 16, R = 128, ce = 192, le = [
	"grass",
	"asphalt",
	"none"
];
function ue(e) {
	let t = e.traits === void 0 ? {} : S(e.traits);
	return (e) => {
		let n = S(e);
		if (n.trait === void 0) return n;
		if (typeof n.trait != "string" || !Object.hasOwn(t, n.trait)) throw Error("Unknown trait");
		return {
			...S(t[n.trait]),
			...n
		};
	};
}
function de(e, t = !1) {
	return {
		pos: w(e.pos),
		speed: w(e.speed),
		gravity: w(e.gravity),
		radius: C(e.radius, 10, .5, 100),
		invMass: C(e.invMass, 1, 0, 8192),
		damping: C(e.damping, .99, 0, 8192),
		bCoef: C(e.bCoef, .5, -1, 8192),
		cGroup: E(e.cGroup, t ? 193 : 63),
		cMask: E(e.cMask, 63),
		color: D(e.color)
	};
}
function z(e, t) {
	let n = T(e.discs, I).map((e) => de(t(e)));
	if (e.ballPhysics !== "disc0") {
		let r = de(e.ballPhysics === void 0 ? {} : t(e.ballPhysics), !0);
		r.cGroup |= ce, n.unshift(r);
	} else if (!n.length) throw Error("disc0 needs a disc");
	return n;
}
function B(e, t) {
	let n = e.playerPhysics === void 0 ? {} : t(e.playerPhysics);
	return {
		...de({
			...n,
			radius: n.radius ?? 15,
			invMass: n.invMass ?? .5,
			damping: n.damping ?? .96,
			cGroup: n.cGroup ?? 0
		}),
		acceleration: C(n.acceleration, .1, -8192, 8192),
		kickingAcceleration: C(n.kickingAcceleration, .07, -8192, 8192),
		kickingDamping: C(n.kickingDamping, .96, 0, 8192),
		kickStrength: C(n.kickStrength, 5, -8192, 8192),
		kickback: C(n.kickback, 0, -8192, 8192)
	};
}
function fe(e) {
	let t = e === void 0 ? {} : S(e);
	if (t.type !== void 0 && !le.includes(t.type)) throw Error("Unsupported stadium background type");
	return t;
}
function pe(e) {
	return {
		type: e.type === "grass" || e.type === "asphalt" ? e.type : "none",
		cornerRadius: C(e.cornerRadius, 0, 0, 500),
		width: C(e.width, 0, 0, 2048),
		height: C(e.height, 0, 0, 2048),
		color: D(e.color, "718C5A"),
		kickOffRadius: C(e.kickOffRadius, 0, 0, 500)
	};
}
function V(e) {
	let t = w(e.normal);
	if (Math.hypot(...t) < 1e-6) throw Error("Plane normal is zero");
	return {
		normal: t,
		dist: C(e.dist, 0),
		bCoef: C(e.bCoef, 1, -1, 8192),
		cGroup: E(e.cGroup, 32),
		cMask: E(e.cMask, 63)
	};
}
function me(e) {
	if (e.team !== "red" && e.team !== "blue") throw Error("Invalid goal team");
	let t = w(e.p0), n = w(e.p1);
	if (Math.hypot(n[0] - t[0], n[1] - t[1]) < 1) throw Error("Goal has zero length");
	return {
		p0: t,
		p1: n,
		team: e.team === "red" ? 1 : 2
	};
}
function he(e, t) {
	let n = C(e.d0, -1, 0, t.length - 1), r = C(e.d1, -1, 0, t.length - 1);
	if (!Number.isInteger(n) || !Number.isInteger(r) || n === r) throw Error("Invalid joint indices");
	let i = Math.hypot(t[r].pos[0] - t[n].pos[0], t[r].pos[1] - t[n].pos[1]), a = e.length == null ? [i, i] : typeof e.length == "number" ? [e.length, e.length] : w(e.length);
	return {
		d0: n,
		d1: r,
		min: C(a[0], 0, 0),
		max: C(a[1], 0, 0),
		strength: e.strength === void 0 || e.strength === "rigid" ? "rigid" : C(e.strength, 0, -8192, 8192),
		color: D(e.color, "000000")
	};
}
function H(e) {
	if (new TextEncoder().encode(e).length > F) throw Error("Stadium exceeds 256 KB");
	let t = S(y.default.parse(e));
	if (t.physicsMode !== void 0 && t.physicsMode !== "stadium" && t.physicsMode !== "substeps") throw Error("Invalid physics mode");
	if (t.version !== void 0 && t.version !== 1) throw Error("Unsupported stadium version");
	let n = ue(t), r = z(t, n), i = T(t.vertexes, oe).map(n), a = ae(t), { segments: o, arcs: s, colliders: c } = ie(i, t.segments, n), l = B(t, n), u = T(t.planes, se), d = T(t.joints, R);
	b(r.length, o.length, u.length + d.length, Math.min(l.radius, ...r.map((e) => e.radius)));
	let f = fe(t.bg);
	return {
		version: 1,
		physicsMode: t.physicsMode === "substeps" ? "substeps" : "stadium",
		name: typeof t.name == "string" ? t.name.slice(0, 64) : "Untitled stadium",
		canBeStored: t.canBeStored !== !1,
		width: C(t.width, 520, 100, 2048),
		height: C(t.height, 300, 80, 2048),
		maxViewWidth: C(t.maxViewWidth, 0, 0, 4096),
		cameraFollow: t.cameraFollow === "player" ? "player" : "ball",
		bg: pe(f),
		discs: r,
		segments: o,
		arcs: s,
		colliders: c,
		player: l,
		spawnDistance: C(t.spawnDistance, 200, 0, 1500),
		kickOffReset: t.kickOffReset === "full" ? "full" : "partial",
		redSpawnPoints: T(t.redSpawnPoints, 32).map((e) => w(e)),
		blueSpawnPoints: T(t.blueSpawnPoints, 32).map((e) => w(e)),
		warnings: a,
		planes: u.map((e) => V(n(e))),
		goals: T(t.goals, L).map((e) => me(n(e))),
		joints: d.map((e) => he(n(e), r))
	};
}
function ge(e, t, n) {
	if (!Number.isFinite(e) || !Number.isInteger(t) || t < 0 || t > 16777215 || !Array.isArray(n) || n.length < 1 || n.length > 3 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 16777215)) throw Error("Invalid team colors");
	return {
		angle: (e % 360 + 360) % 360,
		textColor: t,
		colors: [...n]
	};
}
function U(e) {
	if (e === void 0) return [null, null];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Invalid team styles");
	return e.map((e) => e === null ? null : ge(e.angle, e.textColor, e.colors));
}
var _e = [15035990, 5671397], ve = (e) => e.color === "transparent" ? -1 : Number.parseInt(e.color, 16);
function ye(e, t = 0) {
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
function be(e, t, n) {
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
function xe(e, t) {
	b(e.discs.length, e.segments.length, e.planes.length + e.joints.length, t);
}
function Se(e, t, n, r, i) {
	let a = n * 18;
	if (!p.some(([i, o]) => {
		let s = r[i];
		return s !== void 0 && !Object.is(o === -1 ? t[n] : e[a + o], s);
	})) return !1;
	if (r.radius !== void 0) {
		let a = r.radius;
		for (let r = 0; r < t.length; r++) r !== n && (a = Math.min(a, e[r * 18 + u.RADIUS]));
		xe(i, a);
	}
	for (let [i, o] of p) {
		let s = r[i];
		s !== void 0 && (o === -1 ? t[n] = s : e[a + o] = s);
	}
	return !0;
}
var Ce = 55;
function W(e, t, n, r) {
	let i = t === 1 ? e.redSpawnPoints : e.blueSpawnPoints, a = t === 1 ? -1 : 1;
	if (i.length) return i[r ? i.length - 1 : Math.min(n, i.length - 1)];
	if (r) return [a * e.width, 0];
	let o = n ? Math.ceil(n / 2) * Ce * (n % 2 ? 1 : -1) : 0;
	return [a * e.spawnDistance, o];
}
var we = 8192, Te = 2147483648, Ee = 25500, De = [
	"lobby",
	"playing",
	"goal",
	"finished"
], G = (e, t, n = 0) => Number.isInteger(e) && e >= n && e <= t;
function Oe(e) {
	let t = e % 18;
	return t === u.COLLISION_GROUP || t === u.COLLISION_MASK ? Te : t === u.KICK_BUDGET ? Ee : we;
}
function ke(e, t) {
	if (!e || typeof e != "object" || !Array.isArray(e.discs) || e.discs.length !== t || !e.discs.every((e, t) => typeof e == "number" && Number.isFinite(e) && Math.abs(e) <= Oe(t))) throw Error("Invalid state");
	if (!Array.isArray(e.colors) || e.colors.length !== e.discs.length / 18 || e.colors.some((e) => !Number.isInteger(e) || e < -1 || e > 16777215)) throw Error("Invalid disc colors");
}
function Ae(e) {
	if (!G(e.kickRate, 6619135) || !G(e.tick, 4294967295) || !G(e.elapsed, 4294967295) || !G(e.red, 65535) || !G(e.blue, 65535) || !G(e.countdown, 330) || !G(e.resumeTicks, 119) || (e.paused || e.phase === "lobby") && e.resumeTicks !== 0 || !G(e.scoreLimit, 99) || !G(e.timeLimit, 5940) || !De.includes(e.phase) || typeof e.paused != "boolean" || typeof e.kickoffActive != "boolean" || ![1, 2].includes(e.kickoff)) throw Error("Invalid match metadata");
	for (let t of [e.lastTouch, e.goalTouch]) if (t != null && (typeof t != "object" || !G(t.slot, 31) || ![1, 2].includes(t.team))) throw Error("Invalid goal attribution");
}
function je(e) {
	for (let t = 0; t < e.length; t += 18) {
		let n = (n) => e[t + n];
		if (n(u.RADIUS) < .5 || n(u.RADIUS) > 100 || n(u.INVERSE_MASS) < 0 || n(u.INVERSE_MASS) > we || n(u.DAMPING) < 0 || n(u.DAMPING) > we || n(u.BOUNCE) < -1 || n(u.BOUNCE) > we || !G(n(u.COLLISION_GROUP), 2147483647, -2147483648) || !G(n(u.COLLISION_MASK), 2147483647, -2147483648) || !G(n(u.TEAM), 2) || !G(n(u.INPUT), 31) || !G(n(u.KICK_STATE), 2047) || n(u.PLAYER_SLOT) > 0 && (!Number.isInteger(n(u.KICK_BUDGET)) || n(u.KICK_BUDGET) < -255 || n(u.KICK_BUDGET) > Ee)) throw Error("Invalid disc properties");
	}
}
function Me(e, t, n) {
	ke(e, t), Ae(e), je(e.discs);
	let r = 10;
	for (let t = u.RADIUS; t < e.discs.length; t += 18) r = Math.min(r, e.discs[t]);
	xe(n, r);
}
async function Ne(e) {
	return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", e))).map((e) => e.toString(16).padStart(2, "0")).join("");
}
async function Pe(e, t) {
	let n = e ?? await (await fetch("/core.wasm?v=694293262fc3a50a2786", { signal: t })).arrayBuffer();
	if (await Ne(n) !== "105f5ccfb67900e11f5d8a36b86125d085a1b1ece88bb20e6690eb376b836fdb") throw Error("Physics build changed. Refresh the page to load a matching version.");
	return WebAssembly.instantiate(await WebAssembly.compile(n));
}
var Fe = 60, Ie = [
	0,
	x.red,
	x.blue
], Le = {
	1: x.redKO,
	2: x.blueKO
}, Re = x.redKO | x.blueKO, ze = 300, Be = 60, Ve = (e) => e ? { ...e } : null, He = class e {
	core;
	stadium;
	source = "";
	colors = [];
	tick = 0;
	elapsed = 0;
	ballKicks = [];
	ballContact;
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
		return new e(await Pe(t, n));
	}
	get data() {
		return new Float64Array(this.core.memory.buffer, this.core.data_ptr(), this.core.count() * 18);
	}
	setKickRateLimit(e, t, n) {
		this.kickRate = g(e, t, n), this.core.kick_limits(..._(this.kickRate));
	}
	load(e) {
		this.stadium = H(e), this.source = e, this.core.reset(), this.colors = [], this.core.physics_mode(+(this.stadium.physicsMode === "substeps")), this.tick = 0, this.elapsed = 0, this.red = this.blue = 0, this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0, this.countdown = 0, this.kickoffActive = !0;
		for (let e of this.stadium.discs) this.add(e);
		for (let e = 0; e < 32; e++) this.add(this.stadium.player, e + 1);
		be(this.core, this.stadium, this.kickRate), this.setKickRateLimit(..._(this.kickRate));
	}
	add(e, t = 0) {
		let n = this.core.add_disc();
		if (n < 0) throw Error("Disc capacity exceeded");
		this.colors.push(ve(e)), ye(e, t).forEach((e, t) => {
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
		this.data[t + u.KICK_STATE] = 0, this.data[t + u.KICK_BUDGET] = 0, this.setTeam(e, 0);
	}
	setTeam(e, t) {
		if (![
			0,
			1,
			2
		].includes(t)) throw Error("Invalid team");
		let n = this.index(e), r = n * 18, i = this.data;
		i[r + u.TEAM] = t, i[r + u.COLLISION_GROUP] = this.stadium.player.cGroup | Ie[t], i[r + u.INPUT] = 0, this.spawn(n, e, t, this.phase !== "lobby");
	}
	input(e, t) {
		let n = this.data, r = this.index(e) * 18, i = t & 31;
		i & 16 ? n[r + u.INPUT] & 16 || (n[r + u.KICK_STATE] |= f) : n[r + u.KICK_STATE] &= d, n[r + u.INPUT] = i;
	}
	applyDiscProperties(e, t) {
		let n = this.data;
		return this.phase === "lobby" || !Number.isInteger(e) || e < 0 || e >= this.colors.length || n[e * 18 + u.PLAYER_SLOT] > 0 && n[e * 18 + u.TEAM] === 0 ? !1 : Se(n, this.colors, e, m(t), this.stadium);
	}
	restoreDiscProperties(e, t) {
		let n = e * 18, r = this.data;
		this.colors[e] = ve(t), r[n + u.RADIUS] = t.radius, r[n + u.INVERSE_MASS] = t.invMass, r[n + u.DAMPING] = t.damping, r[n + u.BOUNCE] = t.bCoef, r[n + u.GRAVITY_X] = t.gravity[0], r[n + u.GRAVITY_Y] = t.gravity[1], r[n + u.COLLISION_GROUP] = t.cGroup, r[n + u.COLLISION_MASK] = t.cMask;
	}
	teamRank(e, t) {
		let n = 0;
		for (let r = 0; r < e; r++) this.data[this.index(r) * 18 + u.TEAM] === t && n++;
		return n;
	}
	spawn(e, t, n, r = !1) {
		this.restoreDiscProperties(e, this.stadium.player), this.colors[e] = n === 1 || n === 2 ? _e[n - 1] : 16777215;
		let i = this.data, a = e * 18;
		i[a + u.COLLISION_GROUP] |= Ie[n] ?? 0;
		let [o, s] = W(this.stadium, n, this.teamRank(t, n), r);
		i[a + u.X] = o, i[a + u.Y] = s, i[a + u.SPEED_X] = i[a + u.SPEED_Y] = i[a + u.INPUT] = 0, i[a + u.KICK_STATE] &= d, i[a + u.COLLISION_MASK] = this.stadium.player.cMask & ~Re;
	}
	resetPositions(e = !1) {
		this.kickoffActive = !0, this.lastTouch = null;
		let t = this.data;
		for (let n = 0; n < this.stadium.discs.length; n++) {
			let r = this.stadium.discs[n];
			(e || n === 0 || this.stadium.kickOffReset === "full") && (this.restoreDiscProperties(n, r), t[n * 18 + u.X] = r.pos[0], t[n * 18 + u.Y] = r.pos[1], t[n * 18 + u.SPEED_X] = r.speed[0], t[n * 18 + u.SPEED_Y] = r.speed[1]);
		}
		for (let e = 0; e < 32; e++) {
			let n = this.index(e);
			this.spawn(n, e, t[n * 18 + u.TEAM]);
		}
	}
	start() {
		(this.phase === "lobby" || this.phase === "finished") && (this.red = this.blue = this.elapsed = 0, this.goalTouch = null, this.phase = "playing", this.paused = !1, this.resumeTicks = 0, this.kickoff = 1, this.countdown = 0, this.resetPositions(!0));
	}
	stop() {
		this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0;
	}
	setPaused(e) {
		this.phase !== "lobby" && (e = !!e, this.paused !== e && (this.paused = e, this.resumeTicks = e ? 0 : 119));
	}
	finish() {
		this.phase = "finished", this.countdown = ze;
	}
	canFinishDraw() {
		return this.phase === "playing" && !this.paused && this.timeLimit > 0 && this.red === this.blue && this.elapsed >= (this.timeLimit + Be) * Fe;
	}
	finishDraw() {
		return this.canFinishDraw() ? (this.finish(), !0) : !1;
	}
	timeExpiredWithLeader() {
		return this.timeLimit > 0 && this.elapsed >= this.timeLimit * Fe && this.red !== this.blue;
	}
	step() {
		if (this.ballKicks.length = 0, this.ballContact = void 0, this.tick++, this.paused || this.phase === "lobby") return;
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
			e[u.SPEED_X] ** 2 + e[u.SPEED_Y] ** 2 > 0 && (this.kickoffActive = !1);
			return;
		}
		this.elapsed++;
		let e = this.core.goal_event();
		if (e === 1 || e === 2) return this.scoreGoal(e);
		this.timeExpiredWithLeader() && this.finish();
	}
	collectBallEvents() {
		if (this.phase === "playing") {
			let e = this.core.ball_touch_slot();
			if (e >= 0 && e < 32) {
				let t = this.data[this.index(e) * 18 + u.TEAM];
				(t === 1 || t === 2) && (this.lastTouch = {
					slot: e,
					team: t
				});
			}
		}
		let e = this.core.ball_contact_speed();
		e >= 1 && (this.ballContact = {
			disc: this.core.ball_contact_disc(),
			speed: e
		});
		for (let e = this.core.ball_kick_events() >>> 0, t = 0; e; e >>>= 1, t++) e & 1 && this.ballKicks.push(t);
	}
	afterGoalPause() {
		this.scoreLimit > 0 && Math.max(this.red, this.blue) >= this.scoreLimit || this.timeExpiredWithLeader() ? this.finish() : (this.phase = "playing", this.resetPositions());
	}
	applyKickoffBarriers() {
		let e = this.data, t = this.stadium.player.cMask, n = this.kickoffActive ? t & Le[this.kickoff] : 0;
		for (let r = 0; r < 32; r++) e[this.index(r) * 18 + u.COLLISION_MASK] = t & ~Re | n;
	}
	scoreGoal(e) {
		e === 1 ? this.red++ : this.blue++, this.kickoff = e === 1 ? 2 : 1, this.phase = "goal", this.countdown = 330, this.goalTouch = Ve(this.lastTouch), this.lastGoal = this.tick;
	}
	snapshot() {
		return {
			lastTouch: Ve(this.lastTouch),
			goalTouch: Ve(this.goalTouch),
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
			discs: Array.from(this.data),
			colors: [...this.colors]
		};
	}
	restore(e) {
		Me(e, this.data.length, this.stadium), this.setKickRateLimit(..._(e.kickRate)), this.lastTouch = Ve(e.lastTouch), this.goalTouch = Ve(e.goalTouch), this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.scoreLimit = e.scoreLimit, this.timeLimit = e.timeLimit, this.data.set(e.discs), this.colors = [...e.colors];
	}
}, Ue = `ball2d-core/1/${l}`, K = Uint8Array, We = Uint16Array, Ge = Int32Array, Ke = new K([
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
]), qe = new K([
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
]), Je = new K([
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
]), Ye = function(e, t) {
	for (var n = new We(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new Ge(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, Xe = Ye(Ke, 2), Ze = Xe.b, Qe = Xe.r;
Ze[28] = 258, Qe[258] = 28;
for (var $e = Ye(qe, 0), et = $e.b, tt = $e.r, nt = new We(32768), q = 0; q < 32768; ++q) {
	var rt = (q & 43690) >> 1 | (q & 21845) << 1;
	rt = (rt & 52428) >> 2 | (rt & 13107) << 2, rt = (rt & 61680) >> 4 | (rt & 3855) << 4, nt[q] = ((rt & 65280) >> 8 | (rt & 255) << 8) >> 1;
}
for (var it = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new We(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new We(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new We(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[nt[d] >> c] = l;
	} else for (s = new We(r), i = 0; i < r; ++i) e[i] && (s[i] = nt[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), at = new K(288), q = 0; q < 144; ++q) at[q] = 8;
for (var q = 144; q < 256; ++q) at[q] = 9;
for (var q = 256; q < 280; ++q) at[q] = 7;
for (var q = 280; q < 288; ++q) at[q] = 8;
for (var ot = new K(32), q = 0; q < 32; ++q) ot[q] = 5;
var st = /*#__PURE__*/ it(at, 9, 0), ct = /*#__PURE__*/ it(at, 9, 1), lt = /*#__PURE__*/ it(ot, 5, 0), ut = /*#__PURE__*/ it(ot, 5, 1), dt = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, ft = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, pt = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, mt = function(e) {
	return (e + 7) / 8 | 0;
}, ht = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new K(e.subarray(t, n));
}, gt = [
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
], _t = function(e, t, n) {
	var r = Error(t || gt[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, _t), !n) throw r;
	return r;
}, vt = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new K(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new K(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new K(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = ft(e, d, 1);
			var v = ft(e, d + 1, 3);
			if (d += 3, !v) {
				var y = mt(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && _t(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = ct, m = ut, h = 9, g = 5;
			else if (v == 2) {
				var ee = ft(e, d, 31) + 257, S = ft(e, d + 10, 15) + 4, C = ee + ft(e, d + 5, 31) + 1;
				d += 14;
				for (var w = new K(C), T = new K(19), E = 0; E < S; ++E) T[Je[E]] = ft(e, d + E * 3, 7);
				d += S * 3;
				for (var D = dt(T), te = (1 << D) - 1, O = it(T, D, 1), E = 0; E < C;) {
					var k = O[ft(e, d, te)];
					d += k & 15;
					var y = k >> 4;
					if (y < 16) w[E++] = y;
					else {
						var A = 0, j = 0;
						for (y == 16 ? (j = 3 + ft(e, d, 3), d += 2, A = w[E - 1]) : y == 17 ? (j = 3 + ft(e, d, 7), d += 3) : y == 18 && (j = 11 + ft(e, d, 127), d += 7); j--;) w[E++] = A;
					}
				}
				var ne = w.subarray(0, ee), M = w.subarray(ee);
				h = dt(ne), g = dt(M), p = it(ne, h, 1), m = it(M, g, 1);
			} else _t(1);
			if (d > _) {
				c && _t(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var re = (1 << h) - 1, ie = (1 << g) - 1, N = d;; N = d) {
			var A = p[pt(e, d) & re], P = A >> 4;
			if (d += A & 15, d > _) {
				c && _t(0);
				break;
			}
			if (A || _t(2), P < 256) n[f++] = P;
			else if (P == 256) {
				N = d, p = null;
				break;
			} else {
				var ae = P - 254;
				if (P > 264) {
					var E = P - 257, F = Ke[E];
					ae = ft(e, d, (1 << F) - 1) + Ze[E], d += F;
				}
				var I = m[pt(e, d) & ie], oe = I >> 4;
				I || _t(3), d += I & 15;
				var M = et[oe];
				if (oe > 3) {
					var F = qe[oe];
					M += pt(e, d) & (1 << F) - 1, d += F;
				}
				if (d > _) {
					c && _t(0);
					break;
				}
				s && l(f + 131072);
				var se = f + ae;
				if (f < M) {
					var L = a - M, R = Math.min(M, se);
					for (L + f < 0 && _t(3); f < R; ++f) n[f] = r[L + f];
				}
				for (; f < se; ++f) n[f] = n[f - M];
			}
		}
		t.l = p, t.p = N, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? ht(n, 0, f) : n.subarray(0, f);
}, yt = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, bt = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, xt = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: Ot,
		l: 0
	};
	if (i == 1) {
		var o = new K(n[0].s + 1);
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
	var p = new We(f + 1), m = St(n[u - 1], p, 0);
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
		t: new K(p),
		l: m
	};
}, St = function(e, t, n) {
	return e.s == -1 ? Math.max(St(e.l, t, n + 1), St(e.r, t, n + 1)) : t[e.s] = n;
}, Ct = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new We(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, wt = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, Tt = function(e, t, n) {
	var r = n.length, i = mt(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, Et = function(e, t, n, r, i, a, o, s, c, l, u) {
	yt(t, u++, n), ++i[256];
	for (var d = xt(i, 15), f = d.t, p = d.l, m = xt(a, 15), h = m.t, g = m.l, _ = Ct(f), v = _.c, y = _.n, b = Ct(h), x = b.c, ee = b.n, S = new We(19), C = 0; C < v.length; ++C) ++S[v[C] & 31];
	for (var C = 0; C < x.length; ++C) ++S[x[C] & 31];
	for (var w = xt(S, 7), T = w.t, E = w.l, D = 19; D > 4 && !T[Je[D - 1]]; --D);
	var te = l + 5 << 3, O = wt(i, at) + wt(a, ot) + o, k = wt(i, f) + wt(a, h) + o + 14 + 3 * D + wt(S, T) + 2 * S[16] + 3 * S[17] + 7 * S[18];
	if (c >= 0 && te <= O && te <= k) return Tt(t, u, e.subarray(c, c + l));
	var A, j, ne, M;
	if (yt(t, u, 1 + (k < O)), u += 2, k < O) {
		A = it(f, p, 0), j = f, ne = it(h, g, 0), M = h;
		var re = it(T, E, 0);
		yt(t, u, y - 257), yt(t, u + 5, ee - 1), yt(t, u + 10, D - 4), u += 14;
		for (var C = 0; C < D; ++C) yt(t, u + 3 * C, T[Je[C]]);
		u += 3 * D;
		for (var ie = [v, x], N = 0; N < 2; ++N) for (var P = ie[N], C = 0; C < P.length; ++C) {
			var ae = P[C] & 31;
			yt(t, u, re[ae]), u += T[ae], ae > 15 && (yt(t, u, P[C] >> 5 & 127), u += P[C] >> 12);
		}
	} else A = st, j = at, ne = lt, M = ot;
	for (var C = 0; C < s; ++C) {
		var F = r[C];
		if (F > 255) {
			var ae = F >> 18 & 31;
			bt(t, u, A[ae + 257]), u += j[ae + 257], ae > 7 && (yt(t, u, F >> 23 & 31), u += Ke[ae]);
			var I = F & 31;
			bt(t, u, ne[I]), u += M[I], I > 3 && (bt(t, u, F >> 5 & 8191), u += qe[I]);
		} else bt(t, u, A[F]), u += j[F];
	}
	return bt(t, u, A[256]), u + j[256];
}, Dt = /*#__PURE__*/ new Ge([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), Ot = /*#__PURE__*/ new K(0), kt = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new K(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = Dt[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new We(32768), g = a.h || new We(m + 1), _ = Math.ceil(n / 3), v = 2 * _, y = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
		}, b = new Ge(25e3), x = new We(288), ee = new We(32), S = 0, C = 0, w = a.i || 0, T = 0, E = a.w || 0, D = 0; w + 2 < o; ++w) {
			var te = y(w), O = w & 32767, k = g[te];
			if (h[O] = k, g[te] = O, E <= w) {
				var A = o - w;
				if ((S > 7e3 || T > 24576) && (A > 423 || !l)) {
					u = Et(e, c, 0, b, x, ee, C, T, D, w - D, u), T = S = C = 0, D = w;
					for (var j = 0; j < 286; ++j) x[j] = 0;
					for (var j = 0; j < 30; ++j) ee[j] = 0;
				}
				var ne = 2, M = 0, re = p, ie = O - k & 32767;
				if (A > 2 && te == y(w - ie)) for (var N = Math.min(f, A) - 1, P = Math.min(32767, w), ae = Math.min(258, A); ie <= P && --re && O != k;) {
					if (e[w + ne] == e[w + ne - ie]) {
						for (var F = 0; F < ae && e[w + F] == e[w + F - ie]; ++F);
						if (F > ne) {
							if (ne = F, M = ie, F > N) break;
							for (var I = Math.min(ie, F - 2), oe = 0, j = 0; j < I; ++j) {
								var se = w - ie + j & 32767, L = se - h[se] & 32767;
								L > oe && (oe = L, k = se);
							}
						}
					}
					O = k, k = h[O], ie += O - k & 32767;
				}
				if (M) {
					b[T++] = 268435456 | Qe[ne] << 18 | tt[M];
					var R = Qe[ne] & 31, ce = tt[M] & 31;
					C += Ke[R] + qe[ce], ++x[257 + R], ++ee[ce], E = w + ne, ++S;
				} else b[T++] = e[w], ++x[e[w]];
			}
		}
		for (w = Math.max(w, E); w < o; ++w) b[T++] = e[w], ++x[e[w]];
		u = Et(e, c, l, b, x, ee, C, T, D, w - D, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = w, a.w = E);
	} else {
		for (var w = a.w || 0; w < o + l; w += 65535) {
			var le = w + 65535;
			le >= o && (c[u / 8 | 0] = l, le = o), u = Tt(c, u + 1, e.subarray(w, le));
		}
		a.i = o;
	}
	return ht(s, 0, r + mt(u) + i);
}, At = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new K(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return kt(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
function jt(e, t) {
	return At(e, t || {}, 0, 0);
}
var Mt = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new K(32768), this.p = new K(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || _t(5), this.d && _t(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new K(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = vt(this.p, this.s, this.o);
		this.ondata(ht(n, t, this.s.b), this.d), this.o = ht(n, this.s.b - 32768), this.s.b = this.o.length, this.p = ht(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}(), Nt = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	Nt.decode(Ot, { stream: !0 });
} catch {}
var Pt = 33554432, Ft = new TextEncoder();
new TextDecoder("utf-8", { fatal: !0 });
function It(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function Lt(e) {
	if (e.length > 33554432) throw Error("Replay exceeds 32 MB");
	let t = jt(e, { level: 6 }), n = new Uint8Array(16 + t.length), r = new DataView(n.buffer);
	return n.set([
		66,
		50,
		68,
		90,
		1,
		0,
		0,
		0
	]), r.setUint32(8, e.length, !0), r.setUint32(12, It(e), !0), n.set(t, 16), n;
}
function Rt(e) {
	if (typeof e == "string") {
		if (Ft.encode(e).length > 33554432) throw Error("Replay exceeds 32 MB");
		return Ft.encode(e);
	}
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t.length > 33554432) throw Error("Replay exceeds 32 MB");
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 90) return t;
	if (t.length < 17 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid compressed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0);
	if (!r || r > 33554432) throw Error("Invalid expanded replay size");
	let i = new Uint8Array(r), a = 0, o = !1, s = new Mt((e, t) => {
		if (a + e.length > r) throw Error("Expanded replay exceeds declared size");
		i.set(e, a), a += e.length, o = t;
	});
	for (let e = 16; e < t.length; e += 1024) s.push(t.subarray(e, e + 1024), e + 1024 >= t.length);
	if (!o || a !== r || It(i) !== n.getUint32(12, !0)) throw Error("Compressed replay integrity failure");
	return i;
}
var zt = "/api/v1", Bt = {
	rooms: `${zt}/rooms`,
	sdkRooms: `${zt}/sdk/rooms`,
	account: `${zt}/account`,
	accountConfig: `${zt}/account/config`,
	profile: `${zt}/account/profile`,
	profileVisibility: `${zt}/account/profile/visibility`,
	publicProfile: (e, t) => `${zt}/community/${e}/${encodeURIComponent(t)}`,
	notifications: `${zt}/account/notifications`,
	keys: `${zt}/account/keys`,
	signal: (e) => `${zt}/rooms/${encodeURIComponent(e)}/signal`,
	liveness: (e) => `${zt}/rooms/${encodeURIComponent(e)}/liveness`,
	lease: (e) => `${zt}/sdk/rooms/${encodeURIComponent(e)}/lease`
};
function Vt(e) {
	let t = new URL(e);
	if (!["http:", "https:"].includes(t.protocol) || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected an HTTP(S) service origin without credentials or a path");
	return t.origin;
}
function Ht(e) {
	let t = new URL(e.assets);
	if (![
		"http:",
		"https:",
		"ball2d:"
	].includes(t.protocol) || !t.host || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected a root asset origin");
	let n = Vt(e.service), r = Vt(e.public);
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
			if (!t.pathname.startsWith(`${zt}/`) || t.hash) throw Error("Expected a versioned application API path");
			return t;
		}
	};
}
function Ut() {
	let e = location.origin;
	return Ht({
		assets: e,
		service: e,
		public: e
	});
}
function Wt(e, t) {
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
function Gt(e, t, n) {
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
		createDataChannel: (n, r) => Wt(e.createDataChannel(n, r), t),
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
	return e.onicecandidate = ({ candidate: e }) => r.onicecandidate?.({ candidate: e ?? null }), e.ondatachannel = ({ channel: e }) => r.ondatachannel?.({ channel: Wt(e, t) }), e.onconnectionstatechange = () => r.onconnectionstatechange?.(), e.oniceconnectionstatechange = () => r.oniceconnectionstatechange?.(), r;
}
var Kt = null, qt = null;
function Jt(e) {
	if (Object.keys(e).length !== 2 || e.bundlePolicy !== "max-bundle") return !1;
	let t = e.iceServers;
	if (t?.length !== 1) return !1;
	let n = t[0];
	return Object.keys(n).length === 1 && n.urls === "stun:stun.l.google.com:19302";
}
function Yt() {
	qt?.removeEventListener("pagehide", Xt), qt = null;
}
function Xt() {
	let e = Kt;
	Kt = null, Yt(), e?.close();
}
var Zt = {
	prepare(e) {
		e.binaryType = "arraybuffer";
	},
	encode: (e) => e,
	decode: (e) => e
};
function Qt(e) {
	let t;
	return Kt && Jt(e) ? (t = Kt, Kt = null, Yt(), t.signalingState === "closed" && (t = new RTCPeerConnection(e))) : t = new RTCPeerConnection(e), Gt(t, Zt, () => t.close());
}
function $t(e = Ut()) {
	return {
		serviceOrigin: e.serviceOrigin,
		createWebSocket: (e, t) => new WebSocket(e, t),
		createPeerConnection: Qt
	};
}
var en = [
	["classic", "Classic"],
	["easy", "Easy"],
	["small", "Small"],
	["big", "Big"],
	["rounded", "Rounded"],
	["big_easy", "Big Easy"],
	["big_rounded", "Big Rounded"],
	["huge", "Huge"],
	["asphalt", "Asphalt"],
	["meadow", "Meadow"],
	["training_green", "Training Green"],
	["courtyard", "Courtyard"],
	["street_five", "Street Five"],
	["asphalt_arena", "Asphalt Arena"]
];
function tn(e) {
	let t = /* @__PURE__ */ new Map();
	return async (n) => {
		let r = en.find(([e, t]) => e === n || t === n);
		if (!r) throw Error("Unknown default stadium");
		let i = t.get(r[0]);
		return i || (i = (async () => {
			let t = await e(`/stadiums/${r[0]}.ball2dstadium`);
			if (!t.ok) throw Error("Could not load stadium");
			let n = await t.text();
			return H(n), n;
		})(), t.set(r[0], i), i.catch(() => t.delete(r[0]))), i;
	};
}
function nn(e = Ut()) {
	let t = $t(e), n = (e, t) => fetch(e, t);
	return {
		network: t,
		publicOrigin: e.publicOrigin,
		request: n,
		loadEngine: async (t) => {
			let r = await n(e.asset(`/core.wasm?v=${l}`), { signal: t });
			if (!r.ok) throw Error("Could not load bundled physics engine");
			return He.create(await r.arrayBuffer(), t);
		},
		loadStadium: tn((t) => n(e.asset(t)))
	};
}
function rn(e, t) {
	let n = e.engine.stadium.discs.length;
	return t < n ? t : e.engine.index(e.players.fielded()[t - n].slot);
}
function an(e, t) {
	let n = e.engine.data, r = t * 18;
	return {
		x: n[r],
		y: n[r + u.Y],
		xspeed: n[r + u.SPEED_X],
		yspeed: n[r + u.SPEED_Y],
		radius: n[r + u.RADIUS],
		invMass: n[r + u.INVERSE_MASS],
		damping: n[r + u.DAMPING],
		bCoeff: n[r + u.BOUNCE],
		xgravity: n[r + u.GRAVITY_X],
		ygravity: n[r + u.GRAVITY_Y],
		cGroup: n[r + u.COLLISION_GROUP],
		cMask: n[r + u.COLLISION_MASK],
		color: e.engine.colors[t]
	};
}
function on(e, t, n) {
	let r = m(n), i = an(e, t);
	Object.entries(r).every(([e, t]) => i[e] === t) || (e.match.command("disc", t, 0, r), e.broadcastState());
}
function sn(e) {
	return e.closed || e.engine.phase === "lobby" ? 0 : e.engine.stadium.discs.length + e.players.fielded().length;
}
var cn = (e, t) => Number.isInteger(t) && t >= 0 && t < sn(e);
function ln(e, t) {
	return cn(e, t) ? an(e, rn(e, t)) : null;
}
function un(e, t, n) {
	e.assertOpen(), cn(e, t) && on(e, rn(e, t), n);
}
var dn = (e, t) => {
	let n = e.players.byId(t);
	return n && n.team !== 0 ? n : void 0;
};
function fn(e, t) {
	if (e.closed || e.engine.phase === "lobby") return null;
	let n = dn(e, t);
	return n ? an(e, e.engine.index(n.slot)) : null;
}
function pn(e, t, n) {
	if (e.assertOpen(), e.engine.phase === "lobby") return;
	let r = dn(e, t);
	r && on(e, e.engine.index(r.slot), n);
}
function mn(e) {
	return e.closed || e.engine.phase === "lobby" ? null : {
		x: e.engine.data[0],
		y: e.engine.data[1]
	};
}
function hn(e) {
	return e === null || typeof e == "string" && Array.from(e).length <= 2 && !/[\p{Cc}\p{Cf}]/u.test(e);
}
function gn(e, t, n, r) {
	if (e.assertOpen(), ![
		0,
		1,
		2
	].includes(n)) throw Error("Invalid team");
	let i = e.players.byId(t);
	i && e.players.assignTeam(i, n) && (e.command("team", i.slot, n), e.match.recordOrder(e.players.all.map((e) => e.slot)), e.syncLobby(), e.invoke("onPlayerTeamChange", e.hooks.onPlayerTeamChange, e.publicPlayer(i), e.publicOrNull(r)));
}
function _n(e, t, n) {
	e.assertOpen();
	let r = e.players.byId(t);
	r && r.admin !== !!n && (r.admin = !!n, e.syncLobby(), e.invoke("onPlayerAdminChange", e.hooks.onPlayerAdminChange, e.publicPlayer(r), null));
}
function vn(e, t, n, r) {
	if (e.assertOpen(), !Number.isInteger(t) || typeof n != "boolean") throw Error("Invalid player mute");
	let i = e.players.byId(t);
	i && !e.isHost(i) && !!i.muted !== n && (i.muted = n, e.syncLobby(), e.invoke("onPlayerMuteChange", e.hooks.onPlayerMuteChange, e.publicPlayer(i), r));
}
function yn(e, t, n) {
	e.assertOpen(), e.locked !== !!t && (e.locked = !!t, e.syncLobby(), e.invoke("onTeamsLockChange", e.hooks.onTeamsLockChange, e.locked, n));
}
function bn(e, t, n) {
	if (e.assertOpen(), t !== 1 && t !== 2) throw Error("Invalid team");
	JSON.stringify(e.teamStyles[t - 1]) !== JSON.stringify(n) && (e.teamStyles[t - 1] = n, e.match.recordStyles(e.teamStyles), e.syncLobby());
}
function xn(e, t, n, r, i) {
	let a = ge(n, r, i);
	a.angle = ((256 * n / 360 | 0) & 255) * (360 / 256), bn(e, t, a);
}
function Sn(e, t, n) {
	if (e.assertOpen(), !Array.isArray(t) || t.length > 32 || t.some((e) => !Number.isSafeInteger(e) || e < 0) || typeof n != "boolean") throw Error("Invalid player order");
	let r = new Set(t), i = [...r].flatMap((t) => {
		let n = e.players.byId(t);
		return n ? [n] : [];
	}), a = e.players.all.filter((e) => !r.has(e.id)), o = n ? [...i, ...a] : [...a, ...i];
	e.players.reorder(o) && (e.match.recordOrder(o.map((e) => e.slot)), e.syncLobby());
}
function Cn(e, t, n) {
	if (e.assertOpen(), !hn(n)) throw Error("Avatar must be null or at most two visible characters.");
	let r = e.players.byId(t);
	r && (r.avatarOverride = n, e.match.recordPlayer(r.slot, r.name, n ?? r.avatar), e.syncLobby());
}
function wn(e, t) {
	e.assertOpen();
	let n = e.engine.phase;
	(n === "lobby" || n === "finished") && (e.command("start"), e.stadiumSelection++, e.broadcastState(), n !== e.engine.phase && e.engine.phase === "playing" && e.invoke("onGameStart", e.hooks.onGameStart, e.publicOrNull(t)));
}
function Tn(e, t) {
	e.assertOpen();
	let n = e.engine.phase !== "lobby";
	(n || e.engine.paused) && (e.command("stop"), e.broadcastState(), n && e.invoke("onGameStop", e.hooks.onGameStop, e.publicOrNull(t)));
}
function En(e, t, n) {
	e.assertOpen(), e.engine.phase !== "lobby" && (t = !!t, e.engine.paused !== t && (e.command("pause", 0, +t), e.broadcastState(), t ? e.invoke("onGamePause", e.hooks.onGamePause, n) : e.invoke("onGameUnpause", e.hooks.onGameUnpause, n), e.invoke("onGamePauseChange", e.hooks.onGamePauseChange, t)));
}
function Dn(e, t, n, r, i) {
	e.assertOpen();
	let a = g(t, n, r);
	a !== e.engine.kickRate && (e.command("kickRate", 0, a), e.broadcastState(), e.invoke("onKickRateLimitSet", e.hooks.onKickRateLimitSet, ..._(a), i));
}
function On(e, t) {
	if (e.assertOpen(), e.stopped()) {
		if (!Number.isInteger(t) || t < 0 || t > 99) throw Error("Invalid limit");
		t !== e.engine.scoreLimit && (e.command("scoreLimit", 0, t), e.syncLobby());
	}
}
function kn(e, t) {
	if (e.assertOpen(), e.stopped()) {
		if (!Number.isInteger(t) || t < 0 || t > 99) throw Error("Invalid time limit");
		t * 60 !== e.engine.timeLimit && (e.command("timeLimit", 0, t * 60), e.syncLobby());
	}
}
function An(e) {
	let t = e.engine;
	return e.closed || t.phase === "lobby" ? null : {
		red: t.red,
		blue: t.blue,
		time: t.elapsed / Fe,
		scoreLimit: t.scoreLimit,
		timeLimit: t.timeLimit
	};
}
var jn = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, Mn = (e) => e === "red" ? 1 : 2;
function Nn(e) {
	return e.length >= 2 && e.length <= 22 && new Set(e.map((e) => e.userId)).size === e.length && new Set(e.map((e) => e.peerId)).size === e.length && e.filter((e) => e.side === "red").length * 2 === e.length && e.every((e) => jn.test(e.userId) && !!e.peerId && jn.test(e.peerId) && ["red", "blue"].includes(e.side) && e.signalingAttached === !0);
}
function Pn(e, t) {
	let { roomId: n, generation: r, matchId: i } = t;
	if (e.closed || e.applyingAssignment || e.assignedMatch || n !== e.roomId || r !== e.network.roomGeneration || !jn.test(i) || !jn.test(r)) return !1;
	let a = t.players.map((e) => ({ ...e }));
	if (!Nn(a)) return !1;
	let o = () => !e.closed && e.network.signalingReady && e.engine.phase === "lobby" && e.network.roomGeneration === r && e.players.size === a.length && a.every((t) => {
		let n = t.peerId ? e.players.byPeer(t.peerId) : void 0, r = t.peerId ? e.network.peers.get(t.peerId) : void 0;
		return n && !e.isHost(n) && r?.connected === !0 && r.lostAt === void 0 && r.control?.readyState === "open" && r.fast?.readyState === "open";
	});
	if (!o()) return !1;
	e.applyingAssignment = !0;
	try {
		yn(e, !0, null);
		for (let t of a) {
			if (!o()) return !1;
			let n = t.peerId ? e.players.byPeer(t.peerId) : void 0;
			if (!n || (_n(e, n.id, !1), !o())) return !1;
			gn(e, n.id, Mn(t.side), null);
		}
		return !o() || !e.locked || !a.every((t) => {
			let n = t.peerId ? e.players.byPeer(t.peerId) : void 0;
			return n && !n.admin && n.team === Mn(t.side);
		}) ? !1 : (e.assignedMatch = i, wn(e, null), !e.closed && e.engine.phase === "playing");
	} finally {
		e.applyingAssignment = !1;
	}
}
function Fn(e) {
	return !e.assignedMatch || !e.engine.canFinishDraw() ? !1 : (e.command("finishDraw"), e.broadcastState(), !0);
}
var In = [
	"normal",
	"bold",
	"italic",
	"small",
	"small-bold",
	"small-italic"
];
function Ln(e, t, n, r) {
	if (typeof e != "string" || e.length > 1e3) throw Error("Announcement exceeds 1000 characters");
	if (t != null && (!Number.isInteger(t) || t < 0 || t > 16777215)) throw Error("Invalid announcement color");
	if (n != null && !In.includes(n)) throw Error("Invalid announcement style");
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
function Rn(e) {
	return e == null || Number.isSafeInteger(e) && e >= 0;
}
function zn(e, t, n) {
	if (n == null) {
		e.network.broadcast(t);
		return;
	}
	let r = e.players.byId(n), i = r && e.network.peers.get(r.peerId);
	i && e.network.control(i, t);
}
function Bn(e, t, n) {
	if (e.assertOpen(), typeof t != "string" || t.length > 200) throw Error("Chat must contain at most 200 characters");
	if (!Rn(n)) throw Error("Invalid chat target");
	let r = e.players.byPeer(e.network.hostId);
	if (!r) throw Error("sendChat requires a host player; use sendAnnouncement");
	t.trim() && zn(e, {
		type: "chat",
		name: r.name,
		text: t,
		...n == null ? { playerId: r.peerId } : {}
	}, n);
}
function Vn(e, t, n, r, i, a) {
	e.assertOpen();
	let o = Ln(t, r, i, a);
	if (!Rn(n)) throw Error("Invalid announcement target");
	zn(e, o, n);
}
var Hn = 524288, Un = 16384, Wn = 12, Gn = 45635, Kn = 1, qn = 32, Jn = 1e4, Yn = {
	MAGIC: 0,
	VERSION: 2,
	RESERVED: 3,
	ID: 4,
	INDEX: 8,
	COUNT: 10
};
function Xn(e, t) {
	let n = JSON.stringify(e);
	if (n === void 0) throw Error("Missing control message");
	let r = new TextEncoder().encode(n);
	if (r.length > Hn) throw Error("Control message exceeds 512 KB");
	if (r.length <= Un) return [n];
	let i = Math.ceil(r.length / Un), a = [];
	for (let e = 0; e < i; e++) {
		let n = r.subarray(e * Un, (e + 1) * Un), o = new ArrayBuffer(Wn + n.length), s = new DataView(o);
		s.setUint16(Yn.MAGIC, Gn), s.setUint8(Yn.VERSION, Kn), s.setUint32(Yn.ID, t, !0), s.setUint16(Yn.INDEX, e, !0), s.setUint16(Yn.COUNT, i, !0), new Uint8Array(o, Wn).set(n), a.push(o);
	}
	return a;
}
var Zn = class {
	partial;
	push(e, t = performance.now()) {
		if (typeof e == "string") {
			if (this.partial || new TextEncoder().encode(e).length > Un) throw Error("Invalid control message");
			return JSON.parse(e);
		}
		if (e.byteLength < 13 || e.byteLength > 16396) throw Error("Control fragment length");
		let n = new DataView(e);
		if (n.getUint16(Yn.MAGIC) !== Gn || n.getUint8(Yn.VERSION) !== Kn || n.getUint8(Yn.RESERVED) !== 0) throw Error("Control fragment version");
		let r = n.getUint32(Yn.ID, !0), i = n.getUint16(Yn.INDEX, !0), a = n.getUint16(Yn.COUNT, !0);
		if (a < 2 || a > qn || i >= a) throw Error("Control fragment bounds");
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
		if (o.id !== r || o.count !== a || o.next !== i || t - o.since > Jn) throw Error("Control fragment sequence");
		if (o.next++, o.bytes += e.byteLength - Wn, o.bytes > Hn) throw Error("Control size limit");
		if (o.parts.push(new Uint8Array(e.slice(Wn))), o.next !== a) return;
		let s = new Uint8Array(o.bytes), c = 0;
		for (let e of o.parts) s.set(e, c), c += e.length;
		return this.partial = void 0, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s));
	}
}, Qn = {
	INPUT: 1,
	STATE: 2
}, $n = {
	KIND: 0,
	PROTOCOL: 1,
	SEQUENCE: 2,
	KEYS: 6,
	RESERVED: 7,
	EPOCH: 8
}, er = {
	KIND: 0,
	PROTOCOL: 1,
	TICK: 2,
	INDEX: 6,
	COUNT: 7,
	EPOCH: 8,
	SIZE: 10
}, tr = 1188, J = {
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
	GOAL_TOUCH: 38
}, nr = [
	"lobby",
	"playing",
	"goal",
	"finished"
], rr = {
	INDEX: 0,
	TEAM: 2,
	PACKED_INPUT: 3,
	MOTION: 4,
	KICK_STATE: 36,
	KICK_BUDGET: 38
}, ir = 31;
function ar(e) {
	if (e.byteLength !== 10) throw Error("Input length");
	let t = new DataView(e);
	if (t.getUint8($n.KIND) !== Qn.INPUT || t.getUint8($n.PROTOCOL) !== 2 || t.getUint8($n.KEYS) > ir || t.getUint8($n.RESERVED)) throw Error("Input format");
	return {
		seq: t.getUint32($n.SEQUENCE, !0),
		keys: t.getUint8($n.KEYS),
		epoch: t.getUint16($n.EPOCH, !0)
	};
}
function or(e, t) {
	return e !== t && e - t >>> 0 < 2147483648;
}
function sr(e) {
	let t = [];
	for (let n = 0; n < e.length / 18; n++) {
		let r = n * 18, i = e[r + u.INVERSE_MASS] > 0 || e[r + u.SPEED_X] !== 0 || e[r + u.SPEED_Y] !== 0 || e[r + u.GRAVITY_X] !== 0 || e[r + u.GRAVITY_Y] !== 0 || e[r + u.X] !== e[r + u.SPAWN_X] || e[r + u.Y] !== e[r + u.SPAWN_Y];
		(e[r + u.PLAYER_SLOT] > 0 ? e[r + u.TEAM] > 0 : i) && t.push(n);
	}
	return t;
}
function cr(e, t, n, r) {
	e.setUint32(J.TICK, t.tick, !0), e.setUint32(J.ELAPSED, t.elapsed, !0), e.setUint16(J.RED, t.red, !0), e.setUint16(J.BLUE, t.blue, !0), e.setUint8(J.PHASE, nr.indexOf(t.phase)), e.setUint8(J.PAUSED, +t.paused), e.setUint8(J.KICKOFF, t.kickoff), e.setUint8(J.KICKOFF_ACTIVE, +t.kickoffActive), e.setUint16(J.COUNTDOWN, t.countdown, !0), e.setUint16(J.SCORE_LIMIT, t.scoreLimit, !0), e.setUint16(J.TIME_LIMIT, t.timeLimit, !0), e.setUint16(J.DISC_COUNT, t.discs.length / 18, !0), e.setUint32(J.ACKNOWLEDGED, n, !0), e.setUint16(J.BODY_COUNT, r, !0), e.setUint16(J.RESUME_TICKS, t.resumeTicks, !0), e.setUint32(J.KICK_RATE, t.kickRate, !0), e.setUint8(J.LAST_TOUCH, t.lastTouch?.slot ?? 255), e.setUint8(J.LAST_TOUCH + 1, t.lastTouch?.team ?? 0), e.setUint8(J.GOAL_TOUCH, t.goalTouch?.slot ?? 255), e.setUint8(J.GOAL_TOUCH + 1, t.goalTouch?.team ?? 0);
}
function lr(e, t, n, r) {
	let i = r * 18, a = n[i + u.PLAYER_SLOT] > 0;
	e.setUint16(t + rr.INDEX, r, !0), e.setUint8(t + rr.TEAM, n[i + u.TEAM]), e.setUint8(t + rr.PACKED_INPUT, n[i + u.INPUT] | (a ? (n[i + u.COLLISION_MASK] & 24) << 2 : 0));
	for (let r = 0; r < 4; r++) e.setFloat64(t + rr.MOTION + r * 8, n[i + r], !0);
	e.setUint16(t + rr.KICK_STATE, n[i + u.KICK_STATE], !0), a && e.setUint16(t + rr.KICK_BUDGET, n[i + u.KICK_BUDGET] + 255, !0);
}
function ur(e, t, n = 0) {
	let r = sr(e.discs), i = /* @__PURE__ */ new ArrayBuffer(40 + r.length * 40), a = new DataView(i);
	cr(a, e, t, r.length);
	for (let [t, n] of r.entries()) lr(a, 40 + t * 40, e.discs, n);
	let o = new Uint8Array(i), s = [], c = Math.ceil(o.length / tr);
	for (let t = 0; t < c; t++) {
		let r = o.subarray(t * tr, (t + 1) * tr), i = new ArrayBuffer(12 + r.length), a = new DataView(i);
		a.setUint8(er.KIND, Qn.STATE), a.setUint8(er.PROTOCOL, 2), a.setUint32(er.TICK, e.tick, !0), a.setUint8(er.INDEX, t), a.setUint8(er.COUNT, c), a.setUint16(er.EPOCH, n, !0), a.setUint16(er.SIZE, r.length, !0), new Uint8Array(i, 12).set(r), s.push(i);
	}
	return s;
}
function dr(e, t, n = 0) {
	if (!t.length) return [];
	let r = ur(e, t[0], n), i = [r];
	for (let e = 1; e < t.length; e++) {
		let n = r.map((e) => e.slice(0));
		new DataView(n[0]).setUint32(12 + J.ACKNOWLEDGED, t[e], !0), i.push(n);
	}
	return i;
}
function fr(e) {
	let t = [...e], n = new Set(t.filter((e) => e.type === "transport" && e.selectedCandidatePairId).map((e) => e.selectedCandidatePairId)), r = t.filter((e) => e.type === "candidate-pair" && e.state === "succeeded"), i = n.size ? r.filter((e) => n.has(e.id)) : r.filter((e) => e.nominated === !0);
	if (i.length !== 1) return null;
	let a = i[0].currentRoundTripTime;
	return typeof a == "number" && Number.isFinite(a) && a >= 0 ? a * 1e3 : null;
}
var pr = (e) => e?.match(/(?:^|\r?\n)a=ice-ufrag:([^\s]+)/)?.[1], mr = (e) => e.usernameFragment ?? e.candidate?.match(/(?:^| )ufrag ([^ ]+)/)?.[1];
function hr(e) {
	let t = e.pc.localDescription;
	if (!t?.sdp) throw Error("Local peer description is unavailable");
	return t.sdp;
}
function gr(e, t, n) {
	if (n()) {
		if (e.candidates.length >= 128) throw Error("Too many pending ICE candidates");
		e.candidates.push(t);
	}
}
async function _r(e, t) {
	let n = e.candidates.splice(0);
	for (let r of n) {
		if (!t.current()) return;
		if (!t.versioned || e.remoteIceUfrag && mr(r) === e.remoteIceUfrag) try {
			await e.pc.addIceCandidate(r);
		} catch {}
	}
}
async function vr(e, t, n) {
	let r = await e.pc.createOffer(n);
	return !t.current() || (e.localIceUfrag = pr(r.sdp), await e.pc.setLocalDescription(r), !t.current()) ? !1 : (t.publish({
		type: "offer",
		sdp: hr(e)
	}), !0);
}
async function yr(e, t, n) {
	if (await e.pc.setRemoteDescription({
		type: "offer",
		sdp: t
	}), !n.current() || (await _r(e, n), !n.current())) return;
	let r = await e.pc.createAnswer();
	n.current() && (e.localIceUfrag = pr(r.sdp), await e.pc.setLocalDescription(r), n.current() && n.publish({
		type: "answer",
		sdp: hr(e)
	}));
}
async function br(e, t, n) {
	return await e.pc.setRemoteDescription({
		type: "answer",
		sdp: t
	}), n.current() ? (await _r(e, n), !0) : !1;
}
async function xr(e, t, n) {
	if (!(n.versioned && (!mr(t) || e.remoteIceUfrag && mr(t) !== e.remoteIceUfrag))) {
		if (!e.pc.remoteDescription) gr(e, t, n.current);
		else try {
			await e.pc.addIceCandidate(t);
		} catch {
			gr(e, t, n.current);
		}
	}
}
var Sr = class {
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
		this.assembler ??= new Zn();
		let r = this.assembler.push(e);
		if (r !== void 0 && n && t && (!r || typeof r != "object" || !("type" in r) || r.type !== "action" || !("action" in r) || r.action !== "customStadium")) throw Error("Invalid bulk action");
		return r;
	}
}, Cr = 1e4, wr = 1200, Tr = (e) => e.connectionState === "connected" && ["connected", "completed"].includes(e.iceConnectionState), Er = (e) => ["failed", "disconnected"].includes(e.connectionState) || ["failed", "disconnected"].includes(e.iceConnectionState);
function Dr(e, t, n) {
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
	}, e.ondatachannel = (e) => Ar(r, e.channel, n);
	let i = () => {
		n.current(r) && (e.connectionState === "closed" ? (n.hooks.status("A peer disconnected.", "info"), n.remove(t)) : Tr(e) ? n.noteHealthy(r) : Er(e) && (r.lostAt ??= performance.now(), n.hooks.status("Direct connection interrupted. Attempting recovery…", "info")));
	};
	return e.onconnectionstatechange = i, e.oniceconnectionstatechange = i, r;
}
function Or(e, t) {
	return t.maxPacketLifeTime === null ? t.label === "control" ? t.ordered === !0 && t.maxRetransmits === null && !e.control : t.ordered === !1 && t.maxRetransmits === 0 && !e.fast : !1;
}
function kr(e) {
	return typeof e == "string" ? e.length : e instanceof ArrayBuffer ? e.byteLength : 0;
}
function Ar(e, t, n) {
	if (!n.current(e) || !["control", "realtime"].includes(t.label)) {
		t.close();
		return;
	}
	if (!Or(e, t)) {
		t.close(), n.remove(e.id);
		return;
	}
	t.label === "control" ? (e.control = t, e.controlReader = new Sr({
		fromGuest: () => n.isHost(),
		canUploadStadium: () => n.hooks.allowStadiumUpload?.(e) ?? !1
	})) : e.fast = t, t.onclose = () => {
		n.current(e) && (n.hooks.status("A peer closed its game channel.", "info"), n.remove(e.id));
	}, t.onopen = () => {
		n.current(e) && (e.control?.readyState !== "open" || e.fast?.readyState !== "open" || e.connected || (e.connected = !0, n.isHost() && (e.admissionTimer = setTimeout(() => {
			n.current(e) && (n.hooks.status("A peer did not complete room admission.", "error"), n.remove(e.id));
		}, Cr)), n.hooks.open(e)));
	}, t.onmessage = (r) => {
		if (n.current(e)) {
			n.countReceived(kr(r.data));
			try {
				if (t.label === "control") {
					let t = e.controlReader?.read(r.data);
					t !== void 0 && n.hooks.control(e, t);
				} else if (r.data instanceof ArrayBuffer && r.data.byteLength <= wr) n.hooks.fast(e, r.data);
				else throw Error("Invalid realtime packet");
			} catch {
				n.hooks.status("Invalid peer message rejected.", "error"), n.remove(e.id);
			}
		}
	};
}
var jr = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/* @__NO_SIDE_EFFECTS__ */
function Mr(e) {
	return e ? {
		lang: e?.lang ?? void 0,
		message: e?.message,
		abortEarly: e?.abortEarly ?? void 0,
		abortPipeEarly: e?.abortPipeEarly ?? void 0
	} : jr;
}
/* @__NO_SIDE_EFFECTS__ */
function Nr(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function Y(e, t, n, r, i) {
	let a = i && "input" in i ? i.input : n.value, o = i?.expected ?? e.expects ?? null, s = i?.received ?? /* @__PURE__ */ Nr(a), c = {
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
function Pr(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
/* @__NO_SIDE_EFFECTS__ */
function Fr(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
function Ir(e) {
	return e["~standard"] = {
		version: 1,
		vendor: "valibot",
		validate: (t) => e["~run"]({ value: t }, /* @__PURE__ */ Mr())
	}, e;
}
/* @__NO_SIDE_EFFECTS__ */
function Lr(e, t) {
	return {
		kind: "validation",
		type: "check",
		reference: Lr,
		async: !1,
		expects: null,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && Y(this, "input", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Rr(e) {
	return {
		kind: "validation",
		type: "integer",
		reference: Rr,
		async: !1,
		expects: null,
		requirement: Number.isInteger,
		message: e,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && Y(this, "integer", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function zr(e, t) {
	return {
		kind: "validation",
		type: "max_length",
		reference: zr,
		async: !1,
		expects: `<=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length > this.requirement && Y(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Br(e, t) {
	return {
		kind: "validation",
		type: "max_value",
		reference: Br,
		async: !1,
		expects: `<=${e instanceof Date ? e.toJSON() : /* @__PURE__ */ Nr(e)}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !(e.value <= this.requirement) && Y(this, "value", e, t, { received: e.value instanceof Date ? e.value.toJSON() : /* @__PURE__ */ Nr(e.value) }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Vr(e, t) {
	return {
		kind: "validation",
		type: "min_length",
		reference: Vr,
		async: !1,
		expects: `>=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length < this.requirement && Y(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Hr(e, t) {
	return {
		kind: "validation",
		type: "min_value",
		reference: Hr,
		async: !1,
		expects: `>=${e instanceof Date ? e.toJSON() : /* @__PURE__ */ Nr(e)}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !(e.value >= this.requirement) && Y(this, "value", e, t, { received: e.value instanceof Date ? e.value.toJSON() : /* @__PURE__ */ Nr(e.value) }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Ur(e) {
	return {
		kind: "transformation",
		type: "raw_transform",
		reference: Ur,
		async: !1,
		"~run"(t, n) {
			let r = e({
				dataset: t,
				config: n,
				addIssue: (e) => Y(this, e?.label ?? "input", t, n, e),
				NEVER: null
			});
			return t.issues ? t.typed = !1 : t.value = r, t;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Wr(e, t) {
	return {
		kind: "validation",
		type: "regex",
		reference: Wr,
		async: !1,
		expects: `${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement.test(e.value) && Y(this, "format", e, t), e;
		}
	};
}
var Gr = { abortEarly: !0 };
/* @__NO_SIDE_EFFECTS__ */
function Kr(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function qr(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function Jr(e, t) {
	return !e["~run"]({ value: t }, Gr).issues;
}
/* @__NO_SIDE_EFFECTS__ */
function Yr(e, t) {
	return Ir({
		kind: "schema",
		type: "array",
		reference: Yr,
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
			} else Y(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Xr(e) {
	return Ir({
		kind: "schema",
		type: "boolean",
		reference: Xr,
		expects: "boolean",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : Y(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Zr(e, t) {
	return Ir({
		kind: "schema",
		type: "custom",
		reference: Zr,
		expects: "unknown",
		async: !1,
		check: e,
		message: t,
		"~run"(e, t) {
			return this.check(e.value) ? e.typed = !0 : Y(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function X(e, t) {
	return Ir({
		kind: "schema",
		type: "literal",
		reference: X,
		expects: /* @__PURE__ */ Nr(e),
		async: !1,
		literal: e,
		message: t,
		"~run"(e, t) {
			return /* @__PURE__ */ Pr(e.value, this.literal) ? e.typed = !0 : Y(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Qr(e, t) {
	return Ir({
		kind: "schema",
		type: "nullable",
		reference: Qr,
		expects: `(${e.expects} | null)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ qr(this, e, t)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function $r(e) {
	return Ir({
		kind: "schema",
		type: "number",
		reference: $r,
		expects: "number",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : Y(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Z(e, t) {
	return Ir({
		kind: "schema",
		type: "object",
		reference: Z,
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
						let a = r in n ? n[r] : /* @__PURE__ */ qr(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ Kr(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (Y(this, "key", e, t, {
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
			} else Y(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ei(e, t) {
	return Ir({
		kind: "schema",
		type: "optional",
		reference: ei,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ qr(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ti(e, t) {
	return Ir({
		kind: "schema",
		type: "picklist",
		reference: ti,
		expects: /* @__PURE__ */ Fr(e.map(Nr), "|"),
		async: !1,
		options: e,
		message: t,
		"~run"(e, t) {
			return this.options.includes(e.value) ? e.typed = !0 : Y(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ni(e, t) {
	return Ir({
		kind: "schema",
		type: "strict_object",
		reference: ni,
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
						let a = r in n ? n[r] : /* @__PURE__ */ qr(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ Kr(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (Y(this, "key", e, t, {
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
						Y(this, "key", e, t, {
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
			} else Y(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Q(e) {
	return Ir({
		kind: "schema",
		type: "string",
		reference: Q,
		expects: "string",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : Y(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ri() {
	return Ir({
		kind: "schema",
		type: "unknown",
		reference: ri,
		expects: "unknown",
		async: !1,
		"~run"(e) {
			return e.typed = !0, e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ii(e, t, n) {
	return Ir({
		kind: "schema",
		type: "variant",
		reference: ii,
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
								}, Gr).issues : r.type !== "exact_optional" && r.type !== "optional" && r.type !== "nullish") {
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
				Y(this, "type", e, t, {
					input: n[a],
					expected: /* @__PURE__ */ Fr(o, "|"),
					path: [{
						type: "object",
						origin: "value",
						input: n,
						key: a,
						value: n[a]
					}]
				});
			} else Y(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function $(...e) {
	return Ir({
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
function ai(e, t, n) {
	let r = e["~run"]({ value: t }, /* @__PURE__ */ Mr(n));
	return {
		typed: r.typed,
		success: !r.issues,
		output: r.value,
		issues: r.issues
	};
}
var oi = /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Wr(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)), si = (e) => /* @__PURE__ */ $(/* @__PURE__ */ Zr((e) => typeof e == "object" && !!e && !Array.isArray(e)), e), ci = (e) => si(/* @__PURE__ */ ni(e));
((e) => si(/* @__PURE__ */ Z(e)))({ error: /* @__PURE__ */ Q() });
var li = /* @__PURE__ */ $(/* @__PURE__ */ Z({
	id: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Vr(1)),
	hostId: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Vr(1)),
	role: /* @__PURE__ */ ti(["host", "guest"]),
	generation: /* @__PURE__ */ ei(oi),
	requireVerification: /* @__PURE__ */ ei(/* @__PURE__ */ ri()),
	locked: /* @__PURE__ */ ei(/* @__PURE__ */ ri())
}), /* @__PURE__ */ Lr((e) => e.role === "host" == (e.id === e.hostId))), ui = /* @__PURE__ */ Z({
	roomId: /* @__PURE__ */ Q(),
	siteKey: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Wr(/^[A-Za-z0-9_-]{1,100}$/))
}), di = 6e4, fi = class {
	roomId;
	hostToken;
	runtime;
	socket;
	retry;
	handshake;
	stopped = !1;
	admitted = !1;
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
		this.lastPulseAt !== void 0 && t - this.lastPulseAt < di || (e.send("hb"), this.lastPulseAt = t);
	}
	connect() {
		if (this.stopped) return;
		let e = new URL(Bt.liveness(this.roomId), Vt(this.runtime.serviceOrigin));
		e.protocol = e.protocol === "https:" ? "wss:" : "ws:";
		let t;
		try {
			t = this.runtime.createWebSocket(e);
		} catch {
			this.retry = setTimeout(() => this.connect(), 5e3);
			return;
		}
		this.socket = t, this.admitted = !1, this.lastPulseAt = void 0, this.handshake = setTimeout(() => t.close(), 1e4), t.onopen = () => {
			!this.stopped && t === this.socket && t.send(JSON.stringify({
				type: "hello",
				hostToken: this.hostToken
			}));
		}, t.onmessage = ({ data: e }) => {
			this.stopped || t !== this.socket || (e === "ready" && !this.admitted ? (this.admitted = !0, clearTimeout(this.handshake), this.lastAcknowledgedAt !== void 0 && performance.now() - this.lastAcknowledgedAt < 1e4 && this.pulse(t)) : e !== "ok" && t.close());
		}, t.onclose = () => {
			clearTimeout(this.handshake), t === this.socket && (this.socket = void 0, this.admitted = !1, this.stopped || (this.retry = setTimeout(() => this.connect(), 5e3)));
		}, t.onerror = () => t.close();
	}
	close() {
		this.stopped || (this.stopped = !0, clearTimeout(this.retry), clearTimeout(this.handshake), this.socket?.close(1e3, "Host left"), this.socket = void 0);
	}
}, pi = class extends Error {}, mi = class {
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
}, hi = class {
	available;
	send;
	verification = null;
	verificationRequest = new mi({
		pending: "A verification update is already pending.",
		timeout: "Verification update was not confirmed.",
		send: "Verification update could not be sent."
	}, (e) => (this.verification = null, Error(e)));
	passwordRequest = new mi({
		pending: "A password update is already pending.",
		timeout: "Password update was not confirmed.",
		send: "Password update could not be sent."
	});
	banRequest = new mi({
		pending: "A ban operation is already pending.",
		timeout: "Ban operation was not confirmed.",
		send: "Ban operation could not be sent."
	}, (e) => new pi(e));
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
}, gi = 1, _i = 2048, vi = [
	1001,
	1008,
	1009,
	1011,
	1013
], yi = (e) => typeof e == "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(e), bi = (e) => typeof e == "string" && e.length <= 123 ? e : "Room connection ended.", xi = ["Host left", "Host connection ended"];
function Si(e) {
	return xi.includes(e.reason) ? "The host left. Return to Rooms and join again." : vi.includes(e.code) && e.reason ? e.reason : "Room connection ended. Return to Rooms and join again.";
}
function Ci(e) {
	if (e.matchEntry && (e.hostToken || !/^[a-f0-9]{64}$/.test(e.matchEntry.token) || !yi(e.matchEntry.generation))) throw Error("Invalid match entry credentials.");
	return {
		hostToken: e.hostToken,
		password: e.password,
		...e.matchEntry ? { matchEntry: { ...e.matchEntry } } : {}
	};
}
var wi = class {
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
	serial = 0;
	ownerRequests = new hi(() => this.host && this.ready, (e) => this.send(e));
	credentials;
	challenge;
	queue = Promise.resolve();
	hostMonitor;
	constructor(e, t, n, r, i) {
		this.room = e, this.hooks = n, this.events = r, this.runtime = i, this.credentials = Ci(t);
		let a = new URL(Bt.signal(e), Vt(i.serviceOrigin));
		a.protocol = a.protocol === "https:" ? "wss:" : "ws:", this.ws = i.createWebSocket(a), this.attach(this.ws);
	}
	get socketOpen() {
		return this.ws.readyState === gi;
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
			n() && (this.serial++, this.challenge?.abort(), this.ownerRequests.cancel("disconnected"), this.events.ended(Si(e)));
		}, e.onerror = () => {
			n() && this.hooks.status("Room service is unavailable.", "error");
		};
	}
	async receive(e, t) {
		if (!(this.closed || t !== this.serial)) {
			if (e.type === "terminal") return this.events.ended(bi(e.reason));
			if (!this.ownerRequests.accept(e)) switch (e.type) {
				case "heartbeat":
					this.host && this.hostMonitor?.acknowledged();
					return;
				case "verificationRequired": return this.answerVerification(e);
				case "passwordUpgradeRequired":
					this.host && this.hooks.status("Update the room password or explicitly unlock it to allow new guests.", "error");
					return;
				case "ready": return this.admit(e);
				case "peer":
				case "leave": return this.events.peer(e, t);
				case "signal": return this.events.negotiate(e, t);
			}
		}
	}
	async answerVerification(e) {
		if (this.closed || this.id || this.credentials.hostToken || this.challenge || !/* @__PURE__ */ Jr(ui, e) || e.roomId !== this.room) return;
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
			if (typeof n != "string" || n.length === 0 || n.length > _i) throw Error("Invalid verification response.");
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
		if (this.id) return;
		let t = this.credentials.matchEntry;
		if (!/* @__PURE__ */ Jr(li, e) || t && (e.role !== "guest" || !yi(e.id) || !yi(e.hostId) || e.generation !== t.generation)) {
			this.events.ended("Invalid room admission.");
			return;
		}
		this.id = e.id, this.host = e.role === "host", this.host && this.credentials.hostToken && (this.hostMonitor = new fi(this.room, this.credentials.hostToken, this.runtime), this.hostMonitor.acknowledged()), this.hostId = e.hostId, this.generation = e.generation ?? null, delete this.credentials.matchEntry, this.ownerRequests.verification = typeof e.requireVerification == "boolean" ? e.requireVerification : null, this.locked = typeof e.locked == "boolean" ? e.locked : null, this.events.admitted(this.id, this.host);
	}
	helloCredentials() {
		return {
			hostToken: this.credentials.hostToken,
			password: this.credentials.password,
			...this.credentials.matchEntry ? { matchEntryToken: this.credentials.matchEntry.token } : {}
		};
	}
	close() {
		this.closed || (this.serial++, this.challenge?.abort(), this.ownerRequests.cancel("closed"), this.closed = !0, this.hostMonitor?.close(), this.hostMonitor = void 0, this.credentials = {}, this.ws.close(1e3, "Left room"));
	}
}, Ti = 2e4, Ei = 5e3, Di = 2, Oi = 3e4, ki = 5e3, Ai = 1048576, ji = 32768, Mi = 1e3, Ni = [{ urls: "stun:stun.l.google.com:19302" }], Pi = (e) => typeof e == "string" ? new TextEncoder().encode(e).length : e.byteLength, Fi = class {
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
	hostCloseTimer;
	constructor(e, t, n, r = $t()) {
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
		}, this.signaling = new wi(e, t, n, {
			admitted: (e, t) => n.ready(e, t),
			peer: (e, t) => this.peerChanged(e, t),
			negotiate: (e, t) => this.negotiate(e, t),
			ended: (e) => this.end(e)
		}, r), this.timer = setInterval(() => this.maintain(), ki);
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
		this.host && this.signalingReady && e - this.lastHeartbeat >= Oi && (this.signal({ type: "heartbeat" }), this.lastHeartbeat = e);
		for (let t of this.peers.values()) !t.connected && e - t.created > Ti ? (this.hooks.status("Could not connect directly to this room. Try another network or room.", "error"), this.remove(t.id)) : t.lostAt !== void 0 && e - t.lostAt > Ti ? (this.hooks.status("The direct connection could not be recovered. Rejoin the room.", "error"), this.remove(t.id)) : t.lostAt !== void 0 && this.host && e - t.lastRestart > Ei && this.restartPeer(t.id);
	}
	async peerChanged(e, t) {
		typeof e.id == "string" && e.id && e.id !== this.id && (e.type === "leave" ? this.remove(e.id, !1) : this.host && !this.peers.has(e.id) && await this.offerPeer(e.id, t));
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
			await yr(r, n.sdp, i);
		} else if (n.type === "answer") {
			if (!this.host) throw Error("Only guests can answer");
			await br(r, n.sdp, i) && this.noteHealthy(r);
		} else n.type === "candidate" && n.candidate && await xr(r, n.candidate, i);
	}
	async offerPeer(e, t) {
		let n = this.make(e);
		this.bind(n, n.pc.createDataChannel("control", { ordered: !0 })), this.bind(n, n.pc.createDataChannel("realtime", {
			ordered: !1,
			maxRetransmits: 0
		})), await vr(n, this.negotiationScope(n, t));
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
		if (this.closed || !this.host || !t || t.restarting || t.restarts >= Di || t.pc.signalingState !== "stable" || !this.signaling.socketOpen) return !1;
		let n = this.signaling.serial;
		t.restarting = !0, t.lastRestart = performance.now(), t.lostAt ??= t.lastRestart, t.restarts++;
		try {
			return await vr(t, this.negotiationScope(t, n), { iceRestart: !0 });
		} catch {
			return this.current(t) && this.hooks.status("Direct connection recovery is still pending.", "info"), !1;
		} finally {
			t.restarting = !1;
		}
	}
	make(e) {
		let t = Dr(this.runtime.createPeerConnection({
			iceServers: Ni,
			bundlePolicy: "max-bundle"
		}), e, this.link);
		return this.peers.set(e, t), t;
	}
	bind(e, t) {
		Ar(e, t, this.link);
	}
	admit(e) {
		clearTimeout(e.admissionTimer), e.admissionTimer = void 0;
	}
	control(e, t) {
		let n = e.control;
		if (n?.readyState !== "open") return;
		let r = Xn(t, this.controlId++), i = r.reduce((e, t) => e + Pi(t), 0);
		if (n.bufferedAmount + i > Ai) {
			this.remove(e.id);
			return;
		}
		for (let e of r) n.send(e);
		this.bytesSent += i;
	}
	fast(e, t) {
		e.fast?.readyState === "open" && e.fast.bufferedAmount < ji && (e.fast.send(t), this.bytesSent += t.byteLength);
	}
	broadcast(e) {
		for (let t of this.peers.values()) this.control(t, e);
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
						this.current(e) && (e.rtt = fr(t.values()));
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
	remove(e, t = !0) {
		if (this.closed) return;
		let n = this.peers.get(e);
		if (!n) return;
		if (clearTimeout(n.admissionTimer), this.peers.delete(e), n.controlReader?.clear(), n.pc.close(), this.host && t) try {
			this.signal({
				type: "evict",
				id: e
			});
		} catch {}
		if (this.hooks.leave(e), this.host) return;
		let r = this.signalingReady, i = () => this.end(r ? "The host connection ended. Return to Rooms and join again." : "Room connection ended. Return to Rooms and join again.");
		r ? this.hostCloseTimer = setTimeout(i, Mi) : i();
	}
	close() {
		if (!this.closed) {
			clearTimeout(this.hostCloseTimer), this.hostCloseTimer = void 0, this.signaling.close(), clearInterval(this.timer);
			for (let e of this.peers.values()) clearTimeout(e.admissionTimer), e.controlReader?.clear(), e.pc.close();
			this.peers.clear();
		}
	}
}, Ii = 256, Li = (e) => e.slice(0, 100);
function Ri(e, t, n, r) {
	if (e.assertOpen(), typeof n != "string") throw Error("Invalid kick reason");
	let i = e.players.byId(t);
	if (!i || e.isHost(i)) return;
	let a = e.publicPlayer(i), o = Li(n), s = e.network.peers.get(i.peerId);
	s && e.network.control(s, {
		type: "kicked",
		reason: o
	}), e.network.remove(i.peerId), e.players.has(i) || e.invoke("onPlayerKicked", e.hooks.onPlayerKicked, a, o, !1, r);
}
async function zi(e, t, n, r = null) {
	if (typeof n != "string") throw Error("Invalid kick reason");
	let i = e.players.byId(t);
	if (!i || e.isHost(i)) return;
	let a = e.publicPlayer(i), o = Li(n);
	if (e.bans.size >= Ii && !e.bans.has(t)) throw Error("Clear existing bans before adding more.");
	try {
		await e.network.updateBan("ban", i.peerId, o);
	} catch (n) {
		throw n instanceof pi && e.bans.set(t, i.peerId), n;
	}
	e.bans.set(t, i.peerId), e.network.remove(i.peerId), e.invoke("onPlayerKicked", e.hooks.onPlayerKicked, a, o, !0, r);
}
async function Bi(e, t) {
	e.assertOpen();
	let n = e.bans.get(t);
	n && (await e.network.updateBan("clearBan", n), e.bans.delete(t));
}
async function Vi(e) {
	e.assertOpen(), await e.network.updateBan("clearBans"), e.bans.clear();
}
var Hi = (e) => /* @__PURE__ */ $(/* @__PURE__ */ $r(), /* @__PURE__ */ Rr(), /* @__PURE__ */ Hr(0), /* @__PURE__ */ Br(e)), Ui = Hi(31), Wi = /* @__PURE__ */ ti([1, 2]), Gi = /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ zr(200), /* @__PURE__ */ Lr((e) => !!e.trim())), Ki = /* @__PURE__ */ Z({
	score: Hi(99),
	minutes: Hi(99),
	locked: /* @__PURE__ */ Xr(),
	kickRate: /* @__PURE__ */ ei(Hi(h))
}), qi = /* @__PURE__ */ $(/* @__PURE__ */ Z({
	angle: /* @__PURE__ */ $r(),
	textColor: /* @__PURE__ */ $r(),
	colors: /* @__PURE__ */ Yr(/* @__PURE__ */ $r())
}), /* @__PURE__ */ Ur(({ dataset: e, addIssue: t, NEVER: n }) => {
	try {
		let { angle: t, textColor: n, colors: r } = e.value;
		return ge(t, n, r);
	} catch {
		return t({ message: "Invalid team colors" }), n;
	}
})), Ji = (e) => /* @__PURE__ */ Z({ action: /* @__PURE__ */ X(e) }), Yi = /* @__PURE__ */ ii("action", [
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("typing"),
		active: /* @__PURE__ */ Xr()
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("chat"),
		text: Gi
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("directChat"),
		recipientId: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Vr(1), /* @__PURE__ */ zr(128)),
		text: Gi
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("avatar"),
		avatar: /* @__PURE__ */ Zr(hn)
	}),
	Ji("autoTeams"),
	Ji("clearBans"),
	Ji("start"),
	Ji("stop"),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("teamsLock"),
		locked: /* @__PURE__ */ Xr()
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("resetTeams"),
		team: /* @__PURE__ */ ei(Wi)
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("team"),
		team: /* @__PURE__ */ ti([
			0,
			1,
			2
		]),
		slot: /* @__PURE__ */ ei(Ui)
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("defaultStadium"),
		name: /* @__PURE__ */ Q()
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("customStadium"),
		source: /* @__PURE__ */ Q()
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("ban"),
		slot: Ui
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("kick"),
		slot: Ui
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("admin"),
		slot: Ui
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("mute"),
		slot: Ui,
		muted: /* @__PURE__ */ Xr()
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("teamColors"),
		team: Wi,
		palette: /* @__PURE__ */ Qr(qi)
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("pause"),
		paused: /* @__PURE__ */ ei(/* @__PURE__ */ Xr())
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("kickRate"),
		value: Hi(h)
	}),
	/* @__PURE__ */ Z({
		action: /* @__PURE__ */ X("settings"),
		...Ki.entries
	})
]);
function Xi(e, t) {
	let n = /* @__PURE__ */ ai(Yi, {
		...t,
		action: e
	});
	return n.success ? n.output : null;
}
function Zi(e, t, n, r) {
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
function Qi(e, t, n) {
	return t !== void 0 && (e.admin || !n && t === e);
}
function $i(e, t, n) {
	return t !== void 0 && e.admin && t !== e && !n(t);
}
function ea(e, t, n) {
	let r = e.indexOf(t);
	return r < 0 || t.team === n ? !1 : (t.team = n, e.splice(r, 1), e.push(t), !0);
}
function ta(e, t) {
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
function na(e, t) {
	return (t ? [t] : [2, 1]).flatMap((t) => e.filter((e) => e.team === t));
}
function ra(e, t, n) {
	switch (t.action) {
		case "team": {
			let r = t.slot === void 0 ? e : n.players().find((e) => e.slot === t.slot);
			return Qi(e, r, n.locked()) && n.move(r, t.team), !0;
		}
		case "teamsLock": return e.admin && n.lock(t.locked), !0;
		case "autoTeams":
		case "resetTeams": {
			if (!e.admin) return !0;
			let r = t.action === "resetTeams" ? na(n.players(), t.team).map((e) => ({
				player: e,
				team: 0
			})) : ta(n.players());
			for (let { player: i, team: a } of r) {
				if (!n.current() || !n.players().includes(e) || !e.admin || t.action === "resetTeams" && !n.stopped()) break;
				n.players().includes(i) && ((t.action === "autoTeams" ? i.team !== 0 : i.team === 0) || n.move(i, a));
			}
			return !0;
		}
		default: return !1;
	}
}
function ia(e, t, n) {
	if (e.assertOpen(), !e.stopped()) return;
	H(t);
	let r = ++e.stadiumSelection;
	if (e.match.finishRecording("Stadium changed"), e.assertOpen(), e.stopped()) {
		if (r !== e.stadiumSelection) throw Error("Stadium selection superseded");
		e.engine.load(t);
		for (let t of e.players.all) e.engine.setTeam(t.slot, t.team);
		e.epoch = e.epoch + 1 & 65535, e.inputs.reset(), e.network.broadcast({
			type: "stadium",
			epoch: e.epoch,
			source: t,
			state: e.engine.snapshot()
		}), e.invoke("onStadiumChange", e.hooks.onStadiumChange, e.engine.stadium.name, n);
	}
}
async function aa(e, t) {
	if (e.assertOpen(), !e.stopped()) return;
	let n = ++e.stadiumSelection, r = await e.runtime.loadStadium(t);
	if (e.assertOpen(), n !== e.stadiumSelection) throw Error("Stadium selection superseded");
	ia(e, r, null);
}
var oa = "You are muted in this room.", sa = "Message not sent. Please wait a moment before sending again.";
function ca({ room: e, peer: t, actor: n }, r, i) {
	return !n.muted && e.traffic.allow(t.id, "chat") ? !1 : (e.traffic.allow(t.id, "feedback") && e.network.control(t, {
		type: "chatError",
		rejectedText: r,
		recipientId: i,
		text: n.muted ? oa : sa
	}), !0);
}
var la = ({ room: e, actor: t }) => !e.closed && e.players.has(t);
function ua(e, t) {
	let { room: n, peer: r, actor: i } = e;
	n.traffic.allow(r.id, "typing") && n.network.broadcast({
		type: "typing",
		playerId: i.peerId,
		active: t.active && !i.muted
	});
}
function da(e, t) {
	let { room: n, peer: r, actor: i } = e;
	if (ca(e, t.text, t.recipientId)) return;
	let a = Zi(n.players.all.map((e) => ({
		...e,
		id: e.peerId
	})), r.id, t.recipientId, t.text);
	if (!a) {
		n.network.control(r, {
			type: "directChatError",
			recipientId: t.recipientId,
			text: "This player is no longer available."
		});
		return;
	}
	let o = n.players.byPeer(a.toId);
	if (!o) return;
	let s = !1, c = n.invoke("onPlayerDirectChat", () => {
		let e = n.hooks.onPlayerDirectChat?.(n.publicPlayer(i), n.publicPlayer(o), a.text);
		return s = !0, e;
	});
	if (!(!s || c instanceof Promise || c === !1 || !la(e) || i.muted || !n.players.has(o))) for (let e of [a.fromId, a.toId]) {
		let t = n.network.peers.get(e);
		t && n.network.control(t, a);
	}
}
function fa(e, t) {
	let { room: n, actor: r } = e;
	ca(e, t.text, "") || (n.invoke("onPlayerActivity", n.hooks.onPlayerActivity, n.publicPlayer(r)), la(e) && n.invoke("onPlayerChat", n.hooks.onPlayerChat, n.publicPlayer(r), t.text) !== !1 && la(e) && !r.muted && n.network.broadcast({
		type: "chat",
		playerId: r.peerId,
		name: r.name,
		text: t.text
	}));
}
function pa({ room: e, actor: t }, n) {
	t.avatar = n.avatar, e.match.recordPlayer(t.slot, t.name, t.avatarOverride ?? t.avatar), e.syncLobby();
}
function ma(e, t) {
	let { room: n, peer: r, actor: i } = e, a = (t) => {
		la(e) && n.network.control(r, {
			type: "stadiumResult",
			text: t
		});
	};
	if (!i.admin || !n.stopped()) {
		a("Stadium change rejected: admin permission and a stopped match are required.");
		return;
	}
	let o = ++n.stadiumSelection;
	(t.action === "defaultStadium" ? n.runtime.loadStadium(t.name) : Promise.resolve(t.source)).then((t) => {
		if (la(e)) {
			if (o !== n.stadiumSelection || !i.admin || !n.stopped()) {
				a("Stadium change cancelled: room state or permissions changed.");
				return;
			}
			ia(n, t, n.publicPlayer(i)), a("Stadium applied.");
		}
	}).catch(() => a("Stadium could not be loaded. Please try again."));
}
function ha({ room: e, actor: t }, n) {
	let r = e.players.bySlot(n);
	return $i(t, r, (t) => e.isHost(t)) ? r : void 0;
}
function ga({ room: e, peer: t }, n) {
	!e.closed && e.network.peers.has(t.id) && e.network.control(t, {
		type: "moderationResult",
		text: n
	});
}
function _a(e, t) {
	let { room: n, actor: r } = e, i = ha(e, t);
	i && zi(n, i.id, "Removed by admin", n.publicPlayer(r)).then(() => ga(e, "Player banned.")).catch((t) => ga(e, t instanceof Error ? t.message : "Moderation failed."));
}
function va(e, t, n) {
	Dn(e, ..._(t), e.publicPlayer(n));
}
function ya({ room: e, actor: t }, n) {
	e.stopped() && (On(e, n.score), kn(e, n.minutes), yn(e, n.locked, e.publicPlayer(t)), !e.closed && n.kickRate !== void 0 && n.kickRate !== e.engine.kickRate && va(e, n.kickRate, t));
}
function ba(e, t) {
	let { room: n, actor: r } = e;
	switch (t.action) {
		case "mute": {
			let i = ha(e, t.slot);
			i && vn(n, i.id, t.muted, n.publicPlayer(r));
			return;
		}
		case "ban": return _a(e, t.slot);
		case "clearBans": return ga(e, "Only the room owner can clear bans.");
		case "teamColors": return bn(n, t.team, t.palette);
		case "kickRate": return va(n, t.value, r);
		case "start": return wn(n, r);
		case "stop": return Tn(n, r);
		case "pause": return En(n, t.paused === void 0 ? !n.engine.paused : t.paused, n.publicPlayer(r));
		case "settings": return ya(e, t);
		case "kick": {
			let i = ha(e, t.slot);
			i && Ri(n, i.id, "Removed by host", n.publicPlayer(r));
			return;
		}
	}
}
function xa(e, t, n, r) {
	let i = {
		room: e,
		peer: t,
		actor: n
	};
	switch (r.action) {
		case "typing": return ua(i, r);
		case "directChat": return da(i, r);
		case "chat": return fa(i, r);
		case "avatar": return pa(i, r);
		case "defaultStadium":
		case "customStadium": return ma(i, r);
	}
	!ra(n, r, {
		players: () => e.players.all,
		current: () => !e.closed,
		stopped: () => e.stopped(),
		locked: () => e.locked,
		move: (t, r) => gn(e, t.id, r, n),
		lock: (t) => yn(e, t, e.publicPlayer(n))
	}) && n.admin && ba(i, r);
}
var Sa = /* @__PURE__ */ new Set([
	"chat",
	"directChat",
	"typing"
]);
function Ca(e, t) {
	return e.traffic.allow(t.id, "message") ? !0 : (e.network.remove(t.id), !1);
}
function wa(e) {
	return e.version === 1 && e.engine === Ue && typeof e.name == "string" && !!e.name.trim() && e.name.length <= 24;
}
function Ta(e, t, n) {
	let r = wa(n) ? e.players.freeSlot() : void 0;
	if (!wa(n) || r === void 0) {
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
	e.network.admit(t), e.match.recordPlayer(i.slot, i.name), e.command("join", r, 0), e.turfState.capture(e.engine), e.network.control(t, {
		type: "welcome",
		features: ["directChat", "playerConversation"],
		...n.turfVersion === 1 ? { turf: e.turfState.checkpoint() } : {},
		soundStream: e.soundStream.checkpoint(),
		epoch: e.epoch,
		roomName: e.roomName,
		engine: Ue,
		slot: r,
		stadium: e.engine.source,
		state: e.engine.snapshot(),
		players: e.players.roster(),
		teamStyles: e.teamStyles,
		locked: e.locked
	}), e.syncLobby(), e.invoke("onPlayerJoin", e.hooks.onPlayerJoin, e.publicPlayer(i));
}
function Ea(e) {
	return {
		control(t, n) {
			if (!Ca(e, t) || !n || typeof n != "object") return;
			let r = n, i = e.players.byPeer(t.id);
			if (r.type === "join" && !i) return Ta(e, t, r);
			if (!i || r.type !== "action" || !(typeof r.action == "string" && Sa.has(r.action)) && !e.traffic.allow(t.id, "action")) return;
			let a = Xi(r.action, r);
			a && xa(e, t, i, a);
		},
		fast(t, n) {
			if (!Ca(e, t)) return;
			let r = e.players.byPeer(t.id);
			if (!r) return;
			let i = e.engine.index(r.slot) * 18 + u.INPUT, a = e.engine.data[i], o = e.inputs.accept(t.id, r.slot, n, e.epoch);
			o !== void 0 && (e.engine.data[i] !== a && e.invoke("onPlayerInput", e.hooks.onPlayerInput, e.publicPlayer(r), a), o && e.invoke("onPlayerActivity", e.hooks.onPlayerActivity, e.publicPlayer(r)));
		},
		leave(t) {
			e.traffic.delete(t);
			let n = e.players.byPeer(t);
			n && (e.match.recordPlayer(n.slot, null), e.command("team", n.slot, 0), e.players.removePeer(t), e.inputs.remove(t), e.syncLobby(), e.invoke("onPlayerLeave", e.hooks.onPlayerLeave, e.publicPlayer(n)));
		},
		allowStadiumUpload(t) {
			return !!e.players.byPeer(t.id)?.admin && e.stopped() && e.traffic.allow(t.id, "message");
		}
	};
}
var Da = class {
	match;
	now;
	peers = /* @__PURE__ */ new Map();
	closed = !1;
	constructor(e, t = () => performance.now()) {
		this.match = e, this.now = t;
	}
	accept(e, t, n, r) {
		if (this.closed) return;
		let i = ar(n);
		if (i.epoch !== r) return;
		let a = this.peers.get(e);
		if (!a || or(i.seq, a.seq)) return this.peers.set(e, {
			seq: i.seq,
			received: this.now(),
			keys: i.keys
		}), this.match.command("input", t, i.keys), i.keys !== (a?.keys ?? 0);
	}
	expire(e, t, n = this.now()) {
		if (this.closed) return;
		let r = this.peers.get(e), i = this.match.engine;
		r && n - r.received > 250 && i.data[i.index(t) * 18 + u.INPUT] !== 0 && this.match.command("input", t, 0);
	}
	acknowledgment(e) {
		return this.peers.get(e)?.seq ?? 0;
	}
	remove(e) {
		this.peers.delete(e);
	}
	reset() {
		this.peers.clear();
	}
	close() {
		this.closed = !0, this.reset();
	}
}, Oa = {
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
		value: h
	},
	join: {
		slot: 31,
		value: 0
	},
	disc: {
		slot: 95,
		value: 0
	},
	finishDraw: {
		slot: 0,
		value: 0
	}
};
function ka(e, t) {
	switch (t.kind) {
		case "disc":
			if (!t.properties) throw Error("Missing replay disc properties");
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
		case "finishDraw":
			e.finishDraw();
			break;
		case "scoreLimit":
			e.scoreLimit = t.value;
			break;
		case "timeLimit":
			e.timeLimit = t.value;
			break;
		case "kickRate":
			e.setKickRateLimit(..._(t.value));
			break;
		case "pause": e.setPaused(!!t.value);
	}
}
function Aa(e) {
	let t = JSON.stringify(e), n = 2166136261;
	for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return (n >>> 0).toString(16).padStart(8, "0");
}
var ja = [
	"input",
	"team",
	"start",
	"stop",
	"pause",
	"scoreLimit",
	"timeLimit",
	"kickRate",
	"join",
	"disc",
	"finishDraw"
], Ma = new TextEncoder(), Na = new TextDecoder("utf-8", { fatal: !0 });
function Pa(e) {
	return Lt(Fa(e));
}
function Fa(e) {
	let { commands: t, ...n } = e, r = 0, i = e.checkpoints.map((e) => {
		let t = e.state.discs;
		if (!Array.isArray(t) || t.length > 1728 || t.some((e) => !Number.isFinite(e))) throw Error("Invalid checkpoint discs");
		return r += t.length * 8, {
			...e,
			state: {
				...e.state,
				discs: t.length
			}
		};
	});
	if (i.length > 721) throw Error("Too many replay checkpoints");
	let a = Ma.encode(JSON.stringify({
		...n,
		checkpoints: i
	}));
	if (t.length > 5e5 || a.length + 16 > 33554432) throw Error("Replay exceeds bounds");
	let o = t.length * 12 + t.filter((e) => e.kind === "disc").length * 106, s = new Uint8Array(Math.min(Pt, o)), c = new DataView(s.buffer), l = (e) => {
		if (u + e > s.length) throw Error("Replay exceeds bounds");
	}, u = 0, d = e.initial.tick, f = (e) => {
		if (!Number.isInteger(e) || e < 0 || e > 4294967295) throw Error("Invalid replay integer");
		do {
			l(1);
			let t = Math.floor(e / 128);
			s[u++] = e % 128 | (t ? 128 : 0), e = t;
		} while (e);
	};
	for (let e of t) {
		let t = ja.indexOf(e.kind);
		if ((e.kind === "join" || e.kind === "finishDraw") && e.value !== 0 || e.kind === "team" && e.value > 2) throw Error("Invalid replay team command");
		if (t < 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31) || e.kind === "finishDraw" && e.slot !== 0) throw Error("Invalid replay command");
		if (f(e.tick - d), l(1), s[u++] = t, f(e.slot), f(e.value), e.kind === "disc") {
			let t = m(e.properties), n = 0;
			p.forEach(([e], r) => {
				t[e] !== void 0 && (n |= 1 << r);
			}), f(n);
			for (let [e] of p) {
				let n = t[e];
				n !== void 0 && (l(8), c.setFloat64(u, n, !0), u += 8);
			}
		}
		d = e.tick;
	}
	let h = 16 + a.length + r + u;
	if (h > 33554432) throw Error("Replay exceeds 32 MB");
	let g = new Uint8Array(h), _ = new DataView(g.buffer);
	g.set([
		66,
		50,
		68,
		49,
		1,
		0,
		0,
		0
	]), _.setUint32(8, a.length, !0), _.setUint32(12, t.length, !0), g.set(a, 16);
	let v = 16 + a.length;
	for (let t of e.checkpoints) for (let e of t.state.discs) _.setFloat64(v, e, !0), v += 8;
	return g.set(s.subarray(0, u), v), g;
}
function Ia(e) {
	let t = Rt(e);
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 49) {
		if (t[0] === 66 && t[1] === 50 && t[2] === 68) throw Error("Unsupported packed replay format");
		return JSON.parse(Na.decode(t));
	}
	if (t.length < 16 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid packed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0), i = n.getUint32(12, !0);
	if (r > t.length - 16 || i > 5e5 || i > (t.length - 16 - r) / 3) throw Error("Invalid packed replay bounds");
	let a = JSON.parse(Na.decode(t.subarray(16, 16 + r)));
	if (!a || !Number.isSafeInteger(a.initial?.tick) || a.initial.tick < 0) throw Error("Invalid replay initial tick");
	a.commands = [];
	let o = 16 + r, s = a.initial.tick;
	if (!Array.isArray(a.checkpoints) || a.checkpoints.length > 721) throw Error("Invalid packed checkpoints");
	let c = a.checkpoints.map((e) => {
		let t = e?.state?.discs;
		if (typeof t != "number" || !Number.isInteger(t) || t < 0 || t > 1728) throw Error("Invalid checkpoint disc count");
		return t;
	});
	if (c.reduce((e, t) => e + t * 8, 0) > t.length - o - i * 3) throw Error("Truncated checkpoint discs");
	for (let [e, t] of a.checkpoints.entries()) {
		let r = c[e], i = Array(r);
		for (let e = 0; e < r; e++) {
			let t = n.getFloat64(o, !0);
			if (!Number.isFinite(t)) throw Error("Nonfinite checkpoint disc");
			i[e] = t, o += 8;
		}
		t.state.discs = i;
	}
	let l = () => {
		let e = 0;
		for (let n = 0; n <= 28; n += 7) {
			if (o >= t.length) throw Error("Truncated replay command");
			let r = t[o++];
			if (n === 28 && r > 15) throw Error("Replay integer overflow");
			if (e += (r & 127) * 2 ** n, !(r & 128)) {
				if (n && r === 0) throw Error("Noncanonical replay integer");
				return e;
			}
		}
		throw Error("Invalid replay integer");
	};
	for (let e = 0; e < i; e++) {
		if (s += l(), !Number.isSafeInteger(s) || o >= t.length) throw Error("Invalid replay tick");
		let e = ja[t[o++]];
		if (!e) throw Error("Unknown replay command");
		let r = l(), i = l();
		if (e === "disc") {
			let c = l();
			if (c > 8191) throw Error("Invalid disc property mask");
			let u = {};
			p.forEach(([e], r) => {
				if (c & 1 << r) {
					if (o + 8 > t.length) throw Error("Truncated disc properties");
					u[e] = n.getFloat64(o, !0), o += 8;
				}
			}), a.commands.push({
				tick: s,
				kind: e,
				slot: r,
				value: i,
				properties: m(u)
			});
			continue;
		}
		a.commands.push({
			tick: s,
			kind: e,
			slot: r,
			value: i
		});
	}
	if (o !== t.length) throw Error("Trailing replay command data");
	return a;
}
var La = 31457280, Ra = 5e5, za = 4096, Ba = Fe * 5, Va = class {
	replay;
	playerOrder = [];
	lastInputs = /* @__PURE__ */ new Map();
	bytes = 0;
	full = !1;
	canRecord(e) {
		return !this.full && e.tick - this.replay.initial.tick < Fe * 3600;
	}
	constructor(e, t = [], n = [null, null]) {
		let r = e.snapshot();
		this.playerOrder = t.map((e) => e.slot), this.replay = {
			magic: "B2DR",
			version: 1,
			engine: Ue,
			stadium: e.source,
			initial: r,
			commands: [],
			checkpoints: [],
			roster: t.map((e) => ({
				...e,
				tick: r.tick
			})),
			styles: [{
				tick: r.tick,
				teams: U(n)
			}],
			orders: [{
				tick: r.tick,
				slots: [...this.playerOrder]
			}],
			end: r.tick,
			finalHash: Aa(r)
		}, this.bytes = new TextEncoder().encode(JSON.stringify(this.replay)).length;
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + u.INPUT]);
	}
	reserve(e) {
		let t = new TextEncoder().encode(JSON.stringify(e)).length + 1;
		return this.full || this.bytes + t > La ? (this.full = !0, !1) : (this.bytes += t, !0);
	}
	player(e, t, n, r) {
		let i = {
			tick: e,
			slot: t,
			name: n,
			avatar: r
		};
		return this.replay.roster.length >= za || !this.reserve(i) ? (this.full = !0, !1) : (this.replay.roster.push(i), n === null ? this.order(e, this.playerOrder.filter((e) => e !== t)) : this.playerOrder.includes(t) ? !0 : this.order(e, [...this.playerOrder, t]));
	}
	style(e, t) {
		let n = {
			tick: e,
			teams: U(t)
		}, r = this.replay.styles;
		return r.length >= za || !this.reserve(n) ? (this.full = !0, !1) : (r.push(n), !0);
	}
	order(e, t) {
		if (t.length === this.playerOrder.length && t.every((e, t) => e === this.playerOrder[t])) return !0;
		let n = {
			tick: e,
			slots: [...t]
		}, r = this.replay.orders;
		return r.length >= za || !this.reserve(n) ? (this.full = !0, !1) : (this.playerOrder = [...t], r.push(n), !0);
	}
	command(e) {
		return e.kind === "input" && this.lastInputs.get(e.slot) === e.value ? !0 : this.replay.commands.length >= Ra || !this.reserve(e) ? (this.full = !0, !1) : (e.kind === "input" && this.lastInputs.set(e.slot, e.value), (e.kind === "team" || e.kind === "join") && this.lastInputs.set(e.slot, 0), e.kind === "start" && this.lastInputs.clear(), this.replay.commands.push(e.kind === "disc" ? {
			...e,
			properties: m(e.properties)
		} : { ...e }), !0);
	}
	step(e) {
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + u.INPUT]);
		if (e.tick % Ba === 0) {
			let t = e.snapshot(), n = {
				tick: e.tick,
				state: t,
				hash: Aa(t)
			};
			this.reserve(n) && this.replay.checkpoints.push(n);
		}
		this.replay.end = e.tick;
	}
	pack(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Aa(e.snapshot()), Fa(this.replay);
	}
	finish(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Aa(e.snapshot()), new Blob([Pa(this.replay)], { type: "application/x-ball2d-replay" });
	}
}, Ha = 5e5, Ua = 721, Wa = 4096, Ga = Fe * 3600, Ka = (e, t, n) => Number.isInteger(e) && e >= t && e <= n;
function qa(e) {
	if (e.magic !== "B2DR" || e.version !== 1 || e.engine !== Ue) throw Error("Unsupported replay engine/version");
	if (!Array.isArray(e.commands) || e.commands.length > Ha || !Array.isArray(e.checkpoints) || e.checkpoints.length > Ua || !Number.isInteger(e.end) || e.end < e.initial.tick || e.end - e.initial.tick > Ga) throw Error("Invalid replay bounds");
}
function Ja(e) {
	let t = e.initial.tick;
	for (let n of e.commands) {
		let r = Object.hasOwn(Oa, n.kind) ? Oa[n.kind] : void 0;
		if (!r || !Ka(n.tick, t, e.end) || !Ka(n.slot, 0, r.slot) || !Ka(n.value, 0, r.value)) throw Error("Invalid replay command");
		n.kind === "disc" && (n.properties = m(n.properties)), t = n.tick;
	}
}
function Ya(e) {
	if (!Array.isArray(e.roster) || e.roster.length > Wa) throw Error("Invalid replay roster");
	let t = e.initial.tick;
	for (let n of e.roster) {
		if (!Ka(n.tick, t, e.end) || !Ka(n.slot, 0, 31) || n.name !== null && (typeof n.name != "string" || n.name.length > 24) || n.avatar !== void 0 && !hn(n.avatar)) throw Error("Invalid roster event");
		t = n.tick;
	}
}
function Xa(e) {
	if (e.styles === void 0) return;
	if (!Array.isArray(e.styles) || e.styles.length > Wa) throw Error("Invalid replay styles");
	let t = e.initial.tick;
	for (let n of e.styles) {
		if (!n || !Ka(n.tick, t, e.end) || n.teams === void 0) throw Error("Invalid replay style");
		n.teams = U(n.teams), t = n.tick;
	}
}
function Za(e) {
	if (e.orders === void 0) return;
	if (!Array.isArray(e.orders) || e.orders.length > Wa) throw Error("Invalid replay orders");
	let t = e.initial.tick;
	for (let n of e.orders) {
		if (!n || !Ka(n.tick, t, e.end) || !Array.isArray(n.slots) || n.slots.length > 32 || n.slots.some((e) => !Ka(e, 0, 31)) || new Set(n.slots).size !== n.slots.length) throw Error("Invalid replay order");
		t = n.tick;
	}
}
function Qa(e) {
	let t = e.initial.tick;
	for (let n of e.checkpoints) {
		if (!Ka(n.tick, t + 1, e.end) || n.state.tick !== n.tick || typeof n.hash != "string") throw Error("Invalid checkpoint");
		t = n.tick;
	}
}
function $a(e) {
	let t = Ia(e);
	return qa(t), Ja(t), Ya(t), Xa(t), Za(t), Qa(t), t;
}
async function eo(e) {
	if (e.size > 33554432) throw Error("Replay exceeds 32 MB");
	return $a(await e.arrayBuffer());
}
var to = class {
	engine;
	onRecordingComplete;
	recorder;
	closed = !1;
	completing = !1;
	constructor(e, t) {
		this.engine = e, this.onRecordingComplete = t;
	}
	assertOpen() {
		if (this.closed) throw Error("Room is closed");
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
		r && (i.properties = r), this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(i)) && this.finishRecording("Recording limit reached"), this.assertOpen(), ka(this.engine, i);
	}
	checkRecordingLimit() {
		this.recorder && !this.recorder.canRecord(this.engine) && this.finishRecording("Recording limit reached");
	}
	step() {
		this.assertOpen(), this.engine.step(), this.recorder?.step(this.engine);
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
	startRecording(e, t) {
		if (this.assertOpen(), this.completing) throw Error("Recording completion is in progress");
		if (this.recorder) throw Error("Recording is already active");
		this.recorder = new Va(this.engine, e, t);
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
		this.closed || (this.closed = !0, this.finishRecording(e));
	}
}, no = class {
	stream;
	sequence = 0;
	pending = [];
	lastSent = -Infinity;
	phase = "lobby";
	lastContactTick = -Infinity;
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
		let r = (e.ballKicks ?? []).map((n) => ({
			kind: "kick",
			sequence: ++this.sequence,
			tick: e.tick,
			epoch: t,
			slot: n,
			x: e.data[0],
			y: e.data[1]
		})), i = e.ballContact;
		if (i && !r.length && e.phase === "playing" && (e.tick < this.lastContactTick || e.tick - this.lastContactTick >= 6)) {
			let n = i.disc * 18, a = i.disc > 0 && e.data[n + u.INVERSE_MASS] === 0 && e.stadium.goals.some(({ p0: t, p1: r }) => [t, r].some(([t, r]) => Math.hypot(e.data[n] - t, e.data[n + u.Y] - r) <= e.data[n + u.RADIUS]));
			r.push({
				kind: a ? "post" : "impact",
				sequence: ++this.sequence,
				tick: e.tick,
				epoch: t,
				slot: 0,
				x: e.data[0],
				y: e.data[1]
			}), this.lastContactTick = e.tick;
		}
		if (e.phase !== n) {
			let i = e.phase === "goal" ? "goal" : e.phase === "playing" ? "start" : e.phase === "finished" || e.phase === "lobby" && n !== "finished" ? "end" : void 0;
			i && r.push({
				kind: i,
				sequence: ++this.sequence,
				tick: e.tick,
				epoch: t,
				slot: 0,
				x: 0,
				y: 0
			});
		}
		for (this.phase = e.phase, this.pending.push(...r); this.pending.length > 8;) {
			let e = this.pending.findIndex((e) => [
				"kick",
				"impact",
				"post"
			].includes(e.kind));
			this.pending.splice(Math.max(0, e), 1);
		}
		return r;
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
function ro(e, t) {
	if (t) for (let n of e.peers.values()) n.control?.readyState === "open" && n.control.bufferedAmount < 16384 && e.control(n, t);
}
var io = {
	message: {
		burst: 240,
		perSecond: 160
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
}, ao = class {
	peers = /* @__PURE__ */ new Map();
	allow(e, t, n = performance.now()) {
		let r = this.peers.get(e);
		r || (r = {}, this.peers.set(e, r));
		let { burst: i, perSecond: a } = io[t], o = r[t] ?? {
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
}, oo = 32768, so = 62258, co = 4, lo = 32, uo = (e, t) => typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t, fo = (e) => Math.max(-32768, Math.min(32767, Math.round(e * co)));
function po(e) {
	return uo(e.halfWidthQ, 65535) && uo(e.halfHeightQ, 65535) && e.halfWidthQ !== 0 && e.halfHeightQ !== 0 && uo(e.grassWidthQ, e.halfWidthQ) && uo(e.grassHeightQ, e.halfHeightQ) && uo(e.cornerQ, Math.min(e.grassWidthQ, e.grassHeightQ));
}
function mo(e) {
	let { bg: t } = e, n = {
		halfWidthQ: Math.round((Math.max(e.width, t.width) + lo) * co),
		halfHeightQ: Math.round((Math.max(e.height, t.height) + lo) * co),
		grassWidthQ: Math.round(t.width * co),
		grassHeightQ: Math.round(t.height * co),
		cornerQ: Math.round(Math.min(t.cornerRadius ?? 0, t.width, t.height) * co)
	};
	if (!po(n)) throw Error("Invalid turf field");
	return n;
}
var ho = (e, t) => e.halfWidthQ === t.halfWidthQ && e.halfHeightQ === t.halfHeightQ && e.grassWidthQ === t.grassWidthQ && e.grassHeightQ === t.grassHeightQ && e.cornerQ === t.cornerQ, go = (e) => [e.halfWidthQ / co, e.halfHeightQ / co];
function _o(e, t, { grassWidthQ: n, grassHeightQ: r, cornerQ: i }) {
	let a = Math.abs(e), o = Math.abs(t);
	return a > n || o > r ? !1 : !(i > 0 && a > n - i && o > r - i && (a - n + i) ** 2 + (o - r + i) ** 2 > i ** 2);
}
function vo(e, [t, n, r, i], a, o, s) {
	let { halfWidthQ: c, halfHeightQ: l } = s, u = Math.max(0, Math.floor((Math.min(t, r) - a + c) * 256 / (2 * c))), d = Math.min(255, Math.ceil((Math.max(t, r) + a + c) * 256 / (2 * c))), f = Math.max(0, Math.floor((Math.min(n, i) - a + l) * 128 / (2 * l))), p = Math.min(127, Math.ceil((Math.max(n, i) + a + l) * 128 / (2 * l)));
	if (d < u || p < f) return !1;
	let m = r - t, h = i - n, g = m * m + h * h;
	if (!g) return !1;
	let _ = Math.sqrt(g), v = a * a, y = !1;
	for (let r = f; r <= p; r++) {
		let i = (2 * r + 1 - 128) * l / 128;
		for (let a = u; a <= d; a++) {
			let l = (2 * a + 1 - 256) * c / 256;
			if (!_o(l, i, s)) continue;
			let u = Math.max(0, Math.min(1, ((l - t) * m + (i - n) * h) / g)), d = l - t - m * u, f = i - n - h * u, p = d * d + f * f;
			if (p >= v) continue;
			let b = r * 256 + a, x = Math.round(_ * o * (1 - p / v) * (1 - e[b] / 65535) / 32);
			if (!x) continue;
			let ee = Math.min(so, e[b] + x);
			ee !== e[b] && (e[b] = ee, y = !0);
		}
	}
	return y;
}
var yo = oo * 3, bo = 102400, xo = 1, So = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, Co = (e, t) => Math.imul(e ^ t, 16777619);
function wo(e) {
	let t = 2166136261;
	for (let n of e) t = Co(t, n);
	return t >>> 0;
}
function To(e) {
	let t = 2166136261;
	for (let n of e) t = Co(Co(t, n & 255), n >>> 8);
	return t >>> 0;
}
function Eo(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return btoa(t);
}
function Do(e, t, n) {
	if (typeof e != "string" || e.length > Math.ceil(t / 3) * 4 || !So.test(e)) throw Error(n);
	return Uint8Array.from(atob(e), (e) => e.charCodeAt(0));
}
function Oo(e) {
	let t = Do(e, oo * 2, "Invalid turf payload");
	if (t.length !== 65536) throw Error("Invalid turf atlas length");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = new Uint16Array(oo);
	for (let e = 0; e < oo; e++) if (r[e] = n.getUint16(e * 2, !0), r[e] > 62258) throw Error("Invalid turf wear");
	return r;
}
function ko(e) {
	let t = Do(e, bo, "Invalid turf surface payload");
	if (!t.length || t.length > bo) throw Error("Invalid turf surface length");
	let n = new Uint8Array(yo), r = 0, i = !1, a = new Mt((e, t) => {
		if (r + e.length > yo) throw Error("Expanded turf surface exceeds size limit");
		n.set(e, r), r += e.length, i = t;
	});
	for (let e = 0; e < t.length; e += 256) a.push(t.subarray(e, e + 256), e + 256 >= t.length);
	if (!i || r !== yo) throw Error("Invalid turf surface length");
	return n;
}
function Ao(e) {
	let t = new Uint8Array(oo * 2), n = new DataView(t.buffer);
	for (let t = 0; t < oo; t++) n.setUint16(t * 2, e.atlas[t], !0);
	let r = {
		type: "turf-checkpoint",
		version: xo,
		generation: e.generation,
		...e.field,
		digest: e.digest,
		atlas: Eo(t)
	};
	if (e.surfaceRgb) {
		let t = jt(e.surfaceRgb, { level: 1 });
		if (t.length > bo) throw Error("Compressed turf surface exceeds size limit");
		r.surface = Eo(t), r.surfaceDigest = wo(e.surfaceRgb);
	}
	return r;
}
function jo(e) {
	if (!e || typeof e != "object") throw Error("Invalid turf checkpoint");
	let t = e, n = {
		halfWidthQ: t.halfWidthQ,
		halfHeightQ: t.halfHeightQ,
		grassWidthQ: t.grassWidthQ,
		grassHeightQ: t.grassHeightQ,
		cornerQ: t.cornerQ
	};
	if (t.type !== "turf-checkpoint" || t.version !== xo || !uo(t.generation, 4294967295) || !po(n) || !uo(t.digest, 4294967295)) throw Error("Invalid turf checkpoint");
	let r = Oo(t.atlas);
	if (To(r) !== t.digest) throw Error("Turf checksum mismatch");
	if (t.surface === void 0 != (t.surfaceDigest === void 0)) throw Error("Invalid turf surface envelope");
	let i;
	if (t.surface !== void 0) {
		if (!uo(t.surfaceDigest, 4294967295)) throw Error("Invalid turf surface checksum");
		if (i = ko(t.surface), wo(i) !== t.surfaceDigest) throw Error("Turf surface checksum mismatch");
	}
	return {
		field: n,
		generation: t.generation,
		digest: t.digest,
		atlas: r,
		surfaceRgb: i
	};
}
var Mo = 6, No = 33, Po = 31, Fo = 255, Io = {
	halfWidthQ: 0,
	halfHeightQ: 0,
	grassWidthQ: 0,
	grassHeightQ: 0,
	cornerQ: 0
}, Lo = (e) => Math.min(so, Math.round(e * 65535 / 255)), Ro = class {
	atlas = new Uint16Array(oo);
	image = new Uint8Array(oo);
	surfaceRgb;
	surfaceImage = new Uint8Array(oo * 4);
	surfaceDirty = !0;
	imageDirty = !0;
	digestDirty = !0;
	digestValue = To(this.atlas);
	previous = /* @__PURE__ */ new Map();
	stadium;
	lastTick = -1;
	lastElapsed = -1;
	lastPhase = "lobby";
	bounds = Io;
	generation = 0;
	revision = 0;
	field = [0, 0];
	get digest() {
		return this.digestDirty &&= (this.digestValue = To(this.atlas), !1), this.digestValue;
	}
	get hasPressure() {
		let e = this.surfaceRgb;
		if (!e) return !1;
		for (let t = 0; t < yo; t += 3) if (e[t] !== 0) return !0;
		return !1;
	}
	pixels() {
		if (this.imageDirty) {
			for (let e = 0; e < oo; e++) this.image[e] = Math.round(this.atlas[e] * 255 / 65535);
			this.imageDirty = !1;
		}
		return this.image;
	}
	surfacePixels() {
		if (this.surfaceDirty || this.imageDirty) {
			let e = this.pixels(), t = this.surfaceRgb;
			for (let n = 0; n < oo; n++) {
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
		this.atlas.fill(0), this.surfaceRgb = void 0, this.previous.clear(), this.generation = this.generation + 1 >>> 0, this.bounds = e, this.field = go(e), this.changed();
	}
	startsOver(e, t) {
		return this.stadium !== e.stadium || this.lastTick > e.tick || this.lastElapsed > 0 && e.elapsed < this.lastElapsed || e.phase === "lobby" && this.lastPhase !== "lobby" || !ho(this.bounds, t);
	}
	capture(e) {
		let t = e.stadium, n = mo(t);
		if (this.startsOver(e, n) && this.reset(n), this.stadium = t, this.lastTick = e.tick, this.lastElapsed = e.elapsed, this.lastPhase = e.phase, e.phase !== "playing" || e.paused || e.resumeTicks || t.bg.type !== "grass") {
			this.previous.clear();
			return;
		}
		e.tick % Mo === 0 && this.sampleBodies(e.data);
	}
	sampleBodies(e) {
		let t = /* @__PURE__ */ new Set(), n = 0;
		for (let r = 0; r < e.length / 18; r++) {
			let i = r * 18;
			if (r !== 0 && (!e[i + u.PLAYER_SLOT] || e[i + u.TEAM] === 0)) continue;
			let a = e[i + u.X], o = e[i + u.Y], s = e[i + u.RADIUS];
			if (!Number.isFinite(a) || !Number.isFinite(o) || !Number.isFinite(s)) continue;
			t.add(r);
			let c = this.previous.get(r);
			if (c && n < No) {
				let e = Math.hypot(a - c[0], o - c[1]);
				if (e > .1 && e < 60) {
					n++;
					let e = [
						fo(c[0]),
						fo(c[1]),
						fo(a),
						fo(o)
					], t = Math.max(1, Math.min(96, Math.round(Math.max(3.5, s * .78) * 4))), i = r === 0 ? Po : Fo;
					vo(this.atlas, e, t, i, this.bounds) && this.changed();
				}
			}
			this.previous.set(r, [a, o]);
		}
		for (let e of this.previous.keys()) t.has(e) || this.previous.delete(e);
	}
	seed(e) {
		if (!(e instanceof Uint8Array) || e.length !== 32768) throw Error("Invalid turf seed");
		for (let t = 0; t < oo; t++) this.atlas[t] = Lo(e[t]);
		this.surfaceRgb = void 0, this.changed();
	}
	seedSurface(e) {
		if (!(e instanceof Uint8Array) || e.length !== 131072) throw Error("Invalid turf surface seed");
		let t = new Uint8Array(yo);
		for (let n = 0; n < oo; n++) {
			let r = n * 4, i = n * 3;
			t[i] = e[r], t[i + 1] = e[r + 1], t[i + 2] = e[r + 2], this.atlas[n] = Lo(e[r + 3]);
		}
		this.surfaceRgb = t, this.changed();
	}
	checkpoint() {
		if (!this.bounds.halfWidthQ || !this.bounds.halfHeightQ) throw Error("Turf field is not initialized");
		return Ao({
			field: this.bounds,
			generation: this.generation,
			digest: this.digest,
			atlas: this.atlas,
			surfaceRgb: this.surfaceRgb
		});
	}
	restore(e) {
		let t = jo(e);
		this.generation > t.generation && this.generation - t.generation < 2147483648 || (this.atlas = t.atlas, this.surfaceRgb = t.surfaceRgb, this.generation = t.generation, this.bounds = t.field, this.field = go(t.field), this.previous.clear(), this.changed(), this.digestValue = t.digest, this.digestDirty = !1);
	}
}, zo = class {
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
		return ea(this.players, e, t);
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
}, Bo = class {
	engine;
	runtime;
	hooks;
	players = new zo();
	match;
	inputs;
	traffic = new ao();
	soundStream = new no();
	turfState = new Ro();
	bans = /* @__PURE__ */ new Map();
	network;
	roomId = "";
	roomName = "";
	roomLink = "";
	epoch = 0;
	locked = !1;
	teamStyles = [null, null];
	closed = !1;
	stadiumSelection = 0;
	assignedMatch = null;
	applyingAssignment = !1;
	constructor(e, t, n, r) {
		this.engine = e, this.runtime = t, this.hooks = n, this.match = new to(e, r), this.inputs = new Da(this.match);
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
		this.assertOpen(), this.match.command(e, t, n), (e === "start" || e === "stop") && this.turfState.capture(this.engine);
	}
	syncLobby() {
		this.network.broadcast({
			type: "lobby",
			players: this.players.roster(),
			teamStyles: this.teamStyles,
			locked: this.locked,
			scoreLimit: this.engine.scoreLimit,
			timeLimit: this.engine.timeLimit
		});
	}
	broadcastState() {
		this.network.broadcast({
			type: "state",
			epoch: this.epoch,
			state: this.engine.snapshot()
		});
	}
	publicPlayer(e) {
		let t = this.engine.index(e.slot) * 18, n = !this.closed && this.engine.phase !== "lobby" && this.engine.data[t + u.TEAM] > 0, { slot: r, avatarOverride: i, ...a } = e;
		return {
			...a,
			muted: !!e.muted,
			avatar: e.avatarOverride ?? e.avatar ?? null,
			position: n ? {
				x: this.engine.data[t],
				y: this.engine.data[t + u.Y]
			} : null,
			input: this.engine.data[t + u.INPUT]
		};
	}
	publicOrNull(e) {
		return e ? this.publicPlayer(e) : null;
	}
};
function Vo(e) {
	return /^(?:[0-9a-f]{10}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(e) ? e.toLowerCase() : null;
}
function Ho(e) {
	let t = Vo(e);
	if (!t) throw Error("Invalid room code");
	return `/r/${t}`;
}
ci({ password: /* @__PURE__ */ ri() }), ci({
	password: /* @__PURE__ */ ri(),
	verifier: /* @__PURE__ */ ri()
}), ci({ verifier: /* @__PURE__ */ ri() }), ci({ verified: /* @__PURE__ */ Xr() });
var Uo = /* @__PURE__ */ Z({ error: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ zr(300), /* @__PURE__ */ Lr((e) => e.trim() !== ""), /* @__PURE__ */ Lr((e) => !/[<>]/.test(e)), /* @__PURE__ */ Lr((e) => !/[\u0000-\u001f\u007f]/.test(e))) }), Wo = class extends Error {
	status;
	retryAfterSeconds;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.retryAfterSeconds = n, this.name = "RoomAdmissionError";
	}
};
async function Go(e, t) {
	let n = `Room creation failed (${e.status})`, r = e.status === 429 ? e.headers.get("Retry-After") : null, i = r && /^\d+$/.test(r) && Number.isSafeInteger(Number(r)) ? Number(r) : null, a = (t) => new Wo(t, e.status, i), o = e.body?.getReader();
	if (!o) return a(n);
	let s = () => {
		o.cancel().catch(() => {});
	};
	t.addEventListener("abort", s, { once: !0 });
	try {
		if (t.throwIfAborted(), e.status < 400 || e.status >= 500 || e.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return a(n);
		let r = /* @__PURE__ */ new Uint8Array(2048), i = 0;
		for (;;) {
			let e = await o.read();
			if (t.throwIfAborted(), e.done) break;
			if (i + e.value.byteLength > r.length) return a(n);
			r.set(e.value, i), i += e.value.byteLength;
		}
		let s = /* @__PURE__ */ ai(Uo, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r.subarray(0, i))));
		return s.success ? a(`${s.output.error.trim()} (${e.status})`) : a(n);
	} catch {
		return t.throwIfAborted(), a(n);
	} finally {
		t.removeEventListener("abort", s), s(), o.releaseLock();
	}
}
function Ko(e) {
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
var qo = (e, t) => /* @__PURE__ */ $(/* @__PURE__ */ Q(t), /* @__PURE__ */ Lr((t) => !!t.trim() && t.length <= e, t)), Jo = (e) => /* @__PURE__ */ ei(/* @__PURE__ */ Xr(`Invalid ${e} setting: expected a boolean`)), Yo = "maxPlayers must be an integer between 2 and 32", Xo = /* @__PURE__ */ $(/* @__PURE__ */ Z({
	roomName: qo(64, "Room name must contain 1–64 characters"),
	public: Jo("public"),
	noPlayer: Jo("noPlayer"),
	maxPlayers: /* @__PURE__ */ ei(/* @__PURE__ */ $(/* @__PURE__ */ $r(Yo), /* @__PURE__ */ Rr(Yo), /* @__PURE__ */ Hr(2, Yo), /* @__PURE__ */ Br(32, Yo))),
	password: /* @__PURE__ */ ei(/* @__PURE__ */ $(/* @__PURE__ */ Q("Password must be a string of at most 64 characters"), /* @__PURE__ */ zr(64, "Password must be a string of at most 64 characters"))),
	stadium: /* @__PURE__ */ ei(/* @__PURE__ */ Q("Stadium must be a Ball2D stadium source string")),
	playerName: /* @__PURE__ */ ei(/* @__PURE__ */ ri()),
	geo: /* @__PURE__ */ ei(/* @__PURE__ */ ri())
}), /* @__PURE__ */ Lr((e) => e.noPlayer !== !1 || e.playerName === void 0 || /* @__PURE__ */ Jr(qo(24, ""), e.playerName), "Invalid host player name")), Zo = new Set(Object.keys(Xo.pipe[0].entries));
function Qo(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	for (let t of Object.keys(e)) {
		if (t === "token") throw Error("External service tokens are not supported. Ball2D join verification is configured on the room.");
		if (!Zo.has(t)) throw Error(`Unknown room setting: ${t}`);
	}
	let t = /* @__PURE__ */ ai(Xo, e, { abortEarly: !0 });
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
		...n.geo === void 0 ? {} : { geo: Ko(n.geo) }
	};
}
function $o(e) {
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
var es = 12e3;
function ts(e) {
	if (e.noPlayer !== void 0 && typeof e.noPlayer != "boolean") throw Error("Invalid noPlayer setting");
	if (e.noPlayer !== !1) return null;
	let t = e.playerName ?? "Host";
	if (typeof t != "string" || !t.trim() || t.length > 24) throw Error("Invalid host player name");
	return t.trim();
}
function ns(e, t, n, r, i, a) {
	let o;
	return {
		ready: new Promise((s, c) => {
			o = setTimeout(() => c(Error("Signaling timed out")), es), e.network = new Fi(n.id, { hostToken: n.hostToken }, {
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
async function rs(e, t, n, r) {
	let i = Vt(t.network.serviceOrigin), a = Vt(t.publicOrigin ?? i), o = Qo(e), s = ts(o), c = $o(n), l;
	try {
		c.signal.throwIfAborted();
		let e = await c.run(t.loadEngine(c.signal));
		e.load(o.stadium ?? v());
		let n = r.construct(e);
		l = n;
		let u = r.core(n), d = await c.run(t.request(new URL(Bt.rooms, i), {
			signal: c.signal,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: o.roomName,
				maxPlayers: o.maxPlayers ?? 16,
				password: o.password ?? "",
				private: o.public === !1,
				hostPlayer: s !== null,
				...o.geo ? { geo: o.geo } : {}
			})
		}));
		if (!d.ok) throw await c.run(Go(d, c.signal));
		let f = await c.run(d.json());
		u.roomId = f.id, u.roomName = o.roomName, u.roomLink = `${a}${Ho(f.id)}`;
		let p = ns(u, r.gateway(n), f, s, t, () => r.close(n));
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
var is = 32768;
function as(e, t, n, r) {
	let i = [...e.peers.values()].filter((e) => e.fast?.readyState === "open" && e.fast.bufferedAmount < is);
	if (!i.length) return;
	let a = dr(t, i.map((e) => r.acknowledgment(e.id)), n);
	for (let t = 0; t < i.length; t++) {
		let n = i[t], r = a[t], o = r.reduce((e, t) => e + t.byteLength, 0);
		if (!(n.fast?.readyState !== "open" || n.fast.bufferedAmount + o > is)) for (let t of r) e.fast(n, t);
	}
}
var os = 1e3 / Fe, ss = 500, cs = 32, ls = Fe / 30;
function us(e) {
	let { engine: t } = e, n = t.red, r = t.blue, i = t.phase;
	return e.match.step(), e.turfState.capture(t), e.soundStream.capture(t, e.epoch), t.phase !== i && e.broadcastState(), {
		kickers: t.ballKicks.map((t) => {
			let n = e.players.bySlot(t);
			return n ? e.publicPlayer(n) : null;
		}).filter((e) => !!e),
		redGoal: t.red > n,
		blueGoal: t.blue > r,
		positionsReset: i === "goal" && t.phase === "playing",
		stopped: i === "finished" && t.phase === "lobby",
		victory: i !== "finished" && t.phase === "finished" ? An(e) : null
	};
}
var ds = class {
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
		this.last = t, n > ss && e.engine.phase === "playing" && !e.engine.paused && (En(e, !0, null), e.report("Host scheduler stalled; match paused.")), this.accumulator += Math.max(0, Math.min(n, ss));
		let r = 0;
		try {
			for (; !e.closed && this.accumulator >= os && r++ < cs && (this.tick(t), !e.closed);) this.accumulator -= os;
			e.closed || ro(e.network, e.soundStream.drain(t));
		} catch (t) {
			e.closed || (e.engine.setPaused(!0), e.report(String(t)));
		}
	}
	tick(e) {
		let { room: t } = this, { engine: n, hooks: r } = t;
		for (let n of t.players.all) t.inputs.expire(n.peerId, n.slot, e);
		if (t.match.checkRecordingLimit(), t.closed || (n.phase !== "lobby" && !n.paused && !n.resumeTicks && t.invoke("onGameTick", r.onGameTick), t.closed)) return;
		let i = us(t);
		i.stopped && t.invoke("onGameStop", r.onGameStop, null), i.victory && (t.invoke("onTeamVictory", r.onTeamVictory, { ...i.victory }), t.invoke("onGameVictory", r.onGameVictory, { ...i.victory }));
		for (let e of i.kickers) t.invoke("onPlayerBallKick", r.onPlayerBallKick, e);
		i.redGoal && t.invoke("onTeamGoal", r.onTeamGoal, 1), i.blueGoal && t.invoke("onTeamGoal", r.onTeamGoal, 2), i.positionsReset && t.invoke("onPositionsReset", r.onPositionsReset), !t.closed && n.tick % ls === 0 && as(t.network, n.snapshot(), t.epoch, t.inputs);
	}
}, fs = Object.freeze({ ...x }), ps = (e) => new Blob([Lt(e)], { type: "application/x-ball2d-replay" }), ms = class e {
	engine;
	core;
	loop;
	timer;
	linkNotification;
	closeController = new AbortController();
	signal = this.closeController.signal;
	gateway;
	lastRecording = null;
	constructor(e, t) {
		this.engine = e, this.core = new Bo(e, t, this, (e, t) => {
			let n = ps(e);
			this.lastRecording = n, this.core.invoke("onRecordingComplete", this.onRecordingComplete, n, t);
		}), this.loop = new ds(this.core), this.gateway = Ea(this.core);
	}
	static async create(t, n = nn(), r) {
		return rs(t, n, r, {
			construct: (t) => new e(t, n),
			core: (e) => e.core,
			gateway: (e) => e.gateway,
			start: (e) => e.start(),
			close: (e) => e.close()
		});
	}
	start() {
		this.loop.restart(), this.timer = setInterval(() => this.loop.advance(), 1e3 / Fe);
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
	get assignedMatchId() {
		return this.core.assignedMatch;
	}
	get requireVerification() {
		return this.core.network.requireVerification;
	}
	get CollisionFlags() {
		return fs;
	}
	getPlayerList() {
		return this.core.players.all.map((e) => this.core.publicPlayer(e));
	}
	getPlayer(e) {
		return this.core.publicOrNull(this.core.players.byId(e) ?? null);
	}
	getScores() {
		return An(this.core);
	}
	getBallPosition() {
		return mn(this.core);
	}
	getDiscCount() {
		return sn(this.core);
	}
	getDiscProperties(e) {
		return ln(this.core, e);
	}
	getPlayerDiscProperties(e) {
		return fn(this.core, e);
	}
	getState() {
		return this.engine.snapshot();
	}
	setTeamColors(e, t, n, r) {
		xn(this.core, e, t, n, r);
	}
	reorderPlayers(e, t) {
		Sn(this.core, e, t);
	}
	setPlayerAvatar(e, t) {
		Cn(this.core, e, t);
	}
	setPlayerTeam(e, t) {
		gn(this.core, e, t, null);
	}
	setPlayerAdmin(e, t) {
		_n(this.core, e, t);
	}
	setPlayerMuted(e, t) {
		vn(this.core, e, t, null);
	}
	setTeamsLock(e) {
		yn(this.core, e, null);
	}
	kickPlayer(e, t = "Removed by host", n = !1) {
		if (this.core.assertOpen(), typeof n != "boolean") throw Error("Invalid ban flag");
		if (n) return zi(this.core, e, t);
		Ri(this.core, e, t, null);
	}
	clearBan(e) {
		return Bi(this.core, e);
	}
	clearBans() {
		return Vi(this.core);
	}
	sendChat(e, t) {
		Bn(this.core, e, t);
	}
	sendAnnouncement(e, t, n, r, i) {
		Vn(this.core, e, t, n, r, i);
	}
	startAssignedMatch(e) {
		return Pn(this.core, e);
	}
	static finishAssignedDraw(e) {
		return Fn(e.core);
	}
	startGame() {
		wn(this.core, null);
	}
	stopGame() {
		Tn(this.core, null);
	}
	pauseGame(e) {
		En(this.core, e, null);
	}
	setKickRateLimit(e = 2, t = 0, n = 0) {
		Dn(this.core, e, t, n, null);
	}
	setScoreLimit(e) {
		On(this.core, e);
	}
	setTimeLimit(e) {
		kn(this.core, e);
	}
	async setPassword(e) {
		this.core.assertOpen(), await this.core.network.setPassword(e);
	}
	async setRequireVerification(e) {
		this.core.assertOpen(), await this.core.network.setRequireVerification(e);
	}
	setDefaultStadium(e) {
		return aa(this.core, e);
	}
	setCustomStadium(e) {
		ia(this.core, e, null);
	}
	setDiscProperties(e, t) {
		un(this.core, e, t);
	}
	setPlayerDiscProperties(e, t) {
		pn(this.core, e, t);
	}
	startRecording() {
		this.core.assertOpen(), this.core.match.startRecording(this.core.players.all.map((e) => ({
			slot: e.slot,
			name: e.name,
			avatar: e.avatarOverride ?? e.avatar
		})), this.core.teamStyles);
	}
	stopRecording() {
		let e = this.core.match.stopRecording();
		return e ? ps(e) : null;
	}
	close() {
		let { core: e } = this;
		if (!e.closed) {
			e.closed = !0, e.inputs.close(), this.closeController.abort();
			try {
				e.match.close();
			} finally {
				clearInterval(this.timer), clearTimeout(this.linkNotification), this.linkNotification = void 0, e.network?.close(), e.players.clear(), e.traffic.clear();
			}
		}
	}
};
function hs(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	let t = { ...e }, n = t.maxPlayers ?? 12;
	if (typeof n != "number" || !Number.isFinite(n) || !Number.isInteger(n)) throw Error("maxPlayers must be a finite integer");
	return Qo({
		...t,
		roomName: t.roomName ?? "Headless Room",
		playerName: t.playerName ?? "Host",
		noPlayer: t.noPlayer ?? !1,
		public: t.public ?? !1,
		maxPlayers: Math.max(2, Math.min(30, n)),
		password: t.password ?? ""
	});
}
var gs = class {
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
}, _s = [
	"sendChat",
	"sendAnnouncement",
	"setPlayerAdmin",
	"setPlayerMuted",
	"setPlayerTeam",
	"kickPlayer",
	"clearBan",
	"clearBans",
	"setScoreLimit",
	"setTimeLimit",
	"setCustomStadium",
	"setDefaultStadium",
	"setTeamsLock",
	"setTeamColors",
	"startGame",
	"stopGame",
	"pauseGame",
	"setPassword",
	"setRequireVerification",
	"reorderPlayers",
	"setKickRateLimit",
	"setPlayerAvatar",
	"setDiscProperties",
	"setPlayerDiscProperties"
];
function vs(e, t) {
	let n = Object.create(null);
	t && Object.defineProperty(n, "closed", {
		enumerable: !0,
		value: t
	});
	let r = new gs((t) => {
		let n = e.onError?.(String(t));
		n instanceof Promise && n.catch(() => {});
	});
	e.signal.addEventListener("abort", () => r.close(), { once: !0 }), e.signal.aborted && r.close();
	for (let t of _s) Object.defineProperty(n, t, {
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
	for (let t of /* @__PURE__ */ "onRoomLink.onPlayerJoin.onPlayerLeave.onPlayerChat.onPlayerDirectChat.onPlayerTeamChange.onPlayerAdminChange.onPlayerMuteChange.onPlayerKicked.onPlayerActivity.onPlayerInput.onPlayerBallKick.onTeamGoal.onTeamVictory.onGameVictory.onGameStart.onGameStop.onGameTick.onGamePause.onGameUnpause.onGamePauseChange.onPositionsReset.onStadiumChange.onTeamsLockChange.onKickRateLimitSet.onRecordingComplete.onError".split(".")) {
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
function ys(e) {
	return eo(e);
}
function bs(e) {
	if (typeof e != "string") throw TypeError("Stadium source must be a string");
	let t = H(e);
	return Object.freeze({
		name: t.name,
		canBeStored: t.canBeStored,
		warnings: Object.freeze([...t.warnings])
	});
}
async function xs(e = {}, t = {}) {
	return vs(await ms.create(hs(e), void 0, t.signal));
}
export { Wo as RoomAdmissionError, xs as createRoom, ys as readReplay, bs as validateStadium };
