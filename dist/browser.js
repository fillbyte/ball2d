var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n));
function l(e) {
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
var u = /* @__PURE__ */ new Set([
	"noPlayer",
	"playerName",
	"roomName",
	"maxPlayers",
	"password",
	"public",
	"stadium"
]);
function d(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	for (let t of Object.keys(e)) {
		if (t === "token") throw Error("External service tokens are not supported. Ball2D join verification is configured on the room.");
		if (t === "geo") throw Error("Geolocation overrides are not supported. Room country comes from the host connection.");
		if (!u.has(t)) throw Error(`Unknown room setting: ${t}`);
	}
	let t = { ...e };
	if (typeof t.roomName != "string" || !t.roomName.trim() || t.roomName.length > 64) throw Error("Room name must contain 1–64 characters");
	for (let e of ["public", "noPlayer"]) if (t[e] !== void 0 && typeof t[e] != "boolean") throw Error(`Invalid ${e} setting: expected a boolean`);
	if (t.maxPlayers !== void 0 && (typeof t.maxPlayers != "number" || !Number.isInteger(t.maxPlayers) || t.maxPlayers < 2 || t.maxPlayers > 32)) throw Error("maxPlayers must be an integer between 2 and 32");
	if (t.password !== void 0 && (typeof t.password != "string" || t.password.length > 64)) throw Error("Password must be a string of at most 64 characters");
	if (t.stadium !== void 0 && typeof t.stadium != "string") throw Error("Stadium must be an HBS source string");
	if (t.noPlayer === !1 && t.playerName !== void 0 && (typeof t.playerName != "string" || !t.playerName.trim() || t.playerName.length > 24)) throw Error("Invalid host player name");
	return {
		roomName: t.roomName,
		maxPlayers: t.maxPlayers ?? 16,
		password: t.password ?? "",
		public: t.public ?? !0,
		noPlayer: t.noPlayer ?? !0,
		playerName: t.noPlayer === !1 ? (t.playerName ?? "Host").trim() : void 0,
		stadium: t.stadium
	};
}
function f(e) {
	return /^(?:[0-9a-f]{10}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(e) ? e.toLowerCase() : null;
}
function p(e) {
	let t = f(e);
	if (!t) throw Error("Invalid room code");
	return `/r/${t}`;
}
function m(e, t, n) {
	if (!Number.isFinite(e) || !Number.isInteger(t) || t < 0 || t > 16777215 || !Array.isArray(n) || n.length < 1 || n.length > 3 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 16777215)) throw Error("Invalid team colors");
	return {
		angle: (e % 360 + 360) % 360,
		textColor: t,
		colors: [...n]
	};
}
function h(e) {
	if (e === void 0) return [null, null];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Invalid team styles");
	return e.map((e) => e === null ? null : m(e.angle, e.textColor, e.colors));
}
var g = [
	"normal",
	"bold",
	"italic",
	"small",
	"small-bold",
	"small-italic"
];
function _(e, t, n, r) {
	if (typeof e != "string" || e.length > 1e3) throw Error("Announcement exceeds 1000 characters");
	if (t != null && (!Number.isInteger(t) || t < 0 || t > 16777215)) throw Error("Invalid announcement color");
	if (n != null && !g.includes(n)) throw Error("Invalid announcement style");
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
function v(e) {
	return e === null || typeof e == "string" && Array.from(e).length <= 2 && !/[\p{Cc}\p{Cf}]/u.test(e);
}
var y = [
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
function b(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid disc property update");
	let t = e, n = {};
	for (let e = 0; e < y.length; e++) {
		let [r, , i, a] = y[e], o = t[r];
		if (o == null) continue;
		if (typeof o != "number" || !Number.isFinite(o)) throw Error(`Invalid disc property: ${r}`);
		let s = e < 10 ? Math.fround(o) : o | 0;
		if (!Number.isFinite(s) || s < Math.fround(i) || s > a) throw Error(`Invalid disc property: ${r}`);
		n[r] = s;
	}
	return n;
}
var x = "7fc98a6c80423112efa6", S = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
		})("native-function-to-string", Function.toString), S = e(function(e) {
			var r = b("src"), i = "toString", a = ("" + x).split(i);
			n.inspectSource = function(e) {
				return x.call(e);
			}, (e.exports = function(e, n, i, o) {
				var s = typeof i == "function";
				s && (_(i, "name") || h(i, "name", n)), e[n] !== i && (s && (_(i, r) || h(i, r, e[n] ? "" + e[n] : a.join(String(n)))), e === t ? e[n] = i : o ? e[n] ? e[n] = i : h(e, n, i) : (delete e[n], h(e, n, i)));
			})(Function.prototype, i, function() {
				return typeof this == "function" && this[r] || x.call(this);
			});
		}), C = function(e) {
			if (typeof e != "function") throw TypeError(e + " is not a function!");
			return e;
		}, w = function(e, t, n) {
			if (C(e), t === void 0) return e;
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
		}, T = "prototype", E = function(e, r, i) {
			var a = e & E.F, o = e & E.G, s = e & E.S, c = e & E.P, l = e & E.B, u = o ? t : s ? t[r] || (t[r] = {}) : (t[r] || {})[T], d = o ? n : n[r] || (n[r] = {}), f = d[T] || (d[T] = {}), p, m, g, _;
			for (p in o && (i = r), i) m = !a && u && u[p] !== void 0, g = (m ? u : i)[p], _ = l && m ? w(g, t) : c && typeof g == "function" ? w(Function.call, g) : g, u && S(u, p, g, e & E.U), d[p] != g && h(d, p, _), c && f[p] != g && (f[p] = g);
		};
		t.core = n, E.F = 1, E.G = 2, E.S = 4, E.P = 8, E.B = 16, E.W = 32, E.U = 64, E.R = 128;
		var D = E, O = Math.ceil, k = Math.floor, A = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? k : O)(e);
		}, j = function(e) {
			if (e == null) throw TypeError("Can't call method on  " + e);
			return e;
		}, M = function(e) {
			return function(t, n) {
				var r = String(j(t)), i = A(n), a = r.length, o, s;
				return i < 0 || i >= a ? e ? "" : void 0 : (o = r.charCodeAt(i), o < 55296 || o > 56319 || i + 1 === a || (s = r.charCodeAt(i + 1)) < 56320 || s > 57343 ? e ? r.charAt(i) : o : e ? r.slice(i, i + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
			};
		}(!1);
		D(D.P, "String", { codePointAt: function(e) {
			return M(this, e);
		} }), n.String.codePointAt;
		var N = Math.max, P = Math.min, F = function(e, t) {
			return e = A(e), e < 0 ? N(e + t, 0) : P(e, t);
		}, ee = String.fromCharCode, I = String.fromCodePoint;
		D(D.S + D.F * (!!I && I.length != 1), "String", { fromCodePoint: function(e) {
			for (var t = arguments, n = [], r = arguments.length, i = 0, a; r > i;) {
				if (a = +t[i++], F(a, 1114111) !== a) throw RangeError(a + " is not a valid code point");
				n.push(a < 65536 ? ee(a) : ee(((a -= 65536) >> 10) + 55296, a % 1024 + 56320));
			}
			return n.join("");
		} }), n.String.fromCodePoint;
		var L = {
			Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
			ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
			ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		}, R = {
			isSpaceSeparator: function(e) {
				return typeof e == "string" && L.Space_Separator.test(e);
			},
			isIdStartChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || L.ID_Start.test(e));
			},
			isIdContinueChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || L.ID_Continue.test(e));
			},
			isDigit: function(e) {
				return typeof e == "string" && /[0-9]/.test(e);
			},
			isHexDigit: function(e) {
				return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
			}
		}, z, B, V, te, H, U, W, G, ne, re = function(e, t) {
			z = String(e), B = "start", V = [], te = 0, H = 1, U = 0, W = void 0, G = void 0, ne = void 0;
			do
				W = se(), pe[B]();
			while (W.type !== "eof");
			return typeof t == "function" ? ie({ "": ne }, "", t) : ne;
		};
		function ie(e, t, n) {
			var r = e[t];
			if (typeof r == "object" && r) {
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
					var a = String(i), o = ie(r, a, n);
					o === void 0 ? delete r[a] : Object.defineProperty(r, a, {
						value: o,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
				else for (var s in r) {
					var c = ie(r, s, n);
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
		var K, q, ae, oe, J;
		function se() {
			for (K = "default", q = "", ae = !1, oe = 1;;) {
				J = ce();
				var e = le[K]();
				if (e) return e;
			}
		}
		function ce() {
			if (z[te]) return String.fromCodePoint(z.codePointAt(te));
		}
		function Y() {
			var e = ce();
			return e === "\n" ? (H++, U = 0) : e ? U += e.length : U++, e && (te += e.length), e;
		}
		var le = {
			default: function() {
				switch (J) {
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
						Y();
						return;
					case "/":
						Y(), K = "comment";
						return;
					case void 0: return Y(), X("eof");
				}
				if (R.isSpaceSeparator(J)) {
					Y();
					return;
				}
				return le[B]();
			},
			comment: function() {
				switch (J) {
					case "*":
						Y(), K = "multiLineComment";
						return;
					case "/":
						Y(), K = "singleLineComment";
						return;
				}
				throw Q(Y());
			},
			multiLineComment: function() {
				switch (J) {
					case "*":
						Y(), K = "multiLineCommentAsterisk";
						return;
					case void 0: throw Q(Y());
				}
				Y();
			},
			multiLineCommentAsterisk: function() {
				switch (J) {
					case "*":
						Y();
						return;
					case "/":
						Y(), K = "default";
						return;
					case void 0: throw Q(Y());
				}
				Y(), K = "multiLineComment";
			},
			singleLineComment: function() {
				switch (J) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						Y(), K = "default";
						return;
					case void 0: return Y(), X("eof");
				}
				Y();
			},
			value: function() {
				switch (J) {
					case "{":
					case "[": return X("punctuator", Y());
					case "n": return Y(), Z("ull"), X("null", null);
					case "t": return Y(), Z("rue"), X("boolean", !0);
					case "f": return Y(), Z("alse"), X("boolean", !1);
					case "-":
					case "+":
						Y() === "-" && (oe = -1), K = "sign";
						return;
					case ".":
						q = Y(), K = "decimalPointLeading";
						return;
					case "0":
						q = Y(), K = "zero";
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
						q = Y(), K = "decimalInteger";
						return;
					case "I": return Y(), Z("nfinity"), X("numeric", Infinity);
					case "N": return Y(), Z("aN"), X("numeric", NaN);
					case "\"":
					case "'":
						ae = Y() === "\"", q = "", K = "string";
						return;
				}
				throw Q(Y());
			},
			identifierNameStartEscape: function() {
				if (J !== "u") throw Q(Y());
				Y();
				var e = fe();
				switch (e) {
					case "$":
					case "_": break;
					default: if (!R.isIdStartChar(e)) throw $();
				}
				q += e, K = "identifierName";
			},
			identifierName: function() {
				switch (J) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						q += Y();
						return;
					case "\\":
						Y(), K = "identifierNameEscape";
						return;
				}
				if (R.isIdContinueChar(J)) {
					q += Y();
					return;
				}
				return X("identifier", q);
			},
			identifierNameEscape: function() {
				if (J !== "u") throw Q(Y());
				Y();
				var e = fe();
				switch (e) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default: if (!R.isIdContinueChar(e)) throw $();
				}
				q += e, K = "identifierName";
			},
			sign: function() {
				switch (J) {
					case ".":
						q = Y(), K = "decimalPointLeading";
						return;
					case "0":
						q = Y(), K = "zero";
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
						q = Y(), K = "decimalInteger";
						return;
					case "I": return Y(), Z("nfinity"), X("numeric", oe * Infinity);
					case "N": return Y(), Z("aN"), X("numeric", NaN);
				}
				throw Q(Y());
			},
			zero: function() {
				switch (J) {
					case ".":
						q += Y(), K = "decimalPoint";
						return;
					case "e":
					case "E":
						q += Y(), K = "decimalExponent";
						return;
					case "x":
					case "X":
						q += Y(), K = "hexadecimal";
						return;
				}
				return X("numeric", oe * 0);
			},
			decimalInteger: function() {
				switch (J) {
					case ".":
						q += Y(), K = "decimalPoint";
						return;
					case "e":
					case "E":
						q += Y(), K = "decimalExponent";
						return;
				}
				if (R.isDigit(J)) {
					q += Y();
					return;
				}
				return X("numeric", oe * Number(q));
			},
			decimalPointLeading: function() {
				if (R.isDigit(J)) {
					q += Y(), K = "decimalFraction";
					return;
				}
				throw Q(Y());
			},
			decimalPoint: function() {
				switch (J) {
					case "e":
					case "E":
						q += Y(), K = "decimalExponent";
						return;
				}
				if (R.isDigit(J)) {
					q += Y(), K = "decimalFraction";
					return;
				}
				return X("numeric", oe * Number(q));
			},
			decimalFraction: function() {
				switch (J) {
					case "e":
					case "E":
						q += Y(), K = "decimalExponent";
						return;
				}
				if (R.isDigit(J)) {
					q += Y();
					return;
				}
				return X("numeric", oe * Number(q));
			},
			decimalExponent: function() {
				switch (J) {
					case "+":
					case "-":
						q += Y(), K = "decimalExponentSign";
						return;
				}
				if (R.isDigit(J)) {
					q += Y(), K = "decimalExponentInteger";
					return;
				}
				throw Q(Y());
			},
			decimalExponentSign: function() {
				if (R.isDigit(J)) {
					q += Y(), K = "decimalExponentInteger";
					return;
				}
				throw Q(Y());
			},
			decimalExponentInteger: function() {
				if (R.isDigit(J)) {
					q += Y();
					return;
				}
				return X("numeric", oe * Number(q));
			},
			hexadecimal: function() {
				if (R.isHexDigit(J)) {
					q += Y(), K = "hexadecimalInteger";
					return;
				}
				throw Q(Y());
			},
			hexadecimalInteger: function() {
				if (R.isHexDigit(J)) {
					q += Y();
					return;
				}
				return X("numeric", oe * Number(q));
			},
			string: function() {
				switch (J) {
					case "\\":
						Y(), q += ue();
						return;
					case "\"":
						if (ae) return Y(), X("string", q);
						q += Y();
						return;
					case "'":
						if (!ae) return Y(), X("string", q);
						q += Y();
						return;
					case "\n":
					case "\r": throw Q(Y());
					case "\u2028":
					case "\u2029":
						_e(J);
						break;
					case void 0: throw Q(Y());
				}
				q += Y();
			},
			start: function() {
				switch (J) {
					case "{":
					case "[": return X("punctuator", Y());
				}
				K = "value";
			},
			beforePropertyName: function() {
				switch (J) {
					case "$":
					case "_":
						q = Y(), K = "identifierName";
						return;
					case "\\":
						Y(), K = "identifierNameStartEscape";
						return;
					case "}": return X("punctuator", Y());
					case "\"":
					case "'":
						ae = Y() === "\"", K = "string";
						return;
				}
				if (R.isIdStartChar(J)) {
					q += Y(), K = "identifierName";
					return;
				}
				throw Q(Y());
			},
			afterPropertyName: function() {
				if (J === ":") return X("punctuator", Y());
				throw Q(Y());
			},
			beforePropertyValue: function() {
				K = "value";
			},
			afterPropertyValue: function() {
				switch (J) {
					case ",":
					case "}": return X("punctuator", Y());
				}
				throw Q(Y());
			},
			beforeArrayValue: function() {
				if (J === "]") return X("punctuator", Y());
				K = "value";
			},
			afterArrayValue: function() {
				switch (J) {
					case ",":
					case "]": return X("punctuator", Y());
				}
				throw Q(Y());
			},
			end: function() {
				throw Q(Y());
			}
		};
		function X(e, t) {
			return {
				type: e,
				value: t,
				line: H,
				column: U
			};
		}
		function Z(e) {
			for (var t = 0, n = e; t < n.length; t += 1) {
				var r = n[t];
				if (ce() !== r) throw Q(Y());
				Y();
			}
		}
		function ue() {
			switch (ce()) {
				case "b": return Y(), "\b";
				case "f": return Y(), "\f";
				case "n": return Y(), "\n";
				case "r": return Y(), "\r";
				case "t": return Y(), "	";
				case "v": return Y(), "\v";
				case "0":
					if (Y(), R.isDigit(ce())) throw Q(Y());
					return "\0";
				case "x": return Y(), de();
				case "u": return Y(), fe();
				case "\n":
				case "\u2028":
				case "\u2029": return Y(), "";
				case "\r": return Y(), ce() === "\n" && Y(), "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw Q(Y());
				case void 0: throw Q(Y());
			}
			return Y();
		}
		function de() {
			var e = "", t = ce();
			if (!R.isHexDigit(t) || (e += Y(), t = ce(), !R.isHexDigit(t))) throw Q(Y());
			return e += Y(), String.fromCodePoint(parseInt(e, 16));
		}
		function fe() {
			for (var e = "", t = 4; t-- > 0;) {
				var n = ce();
				if (!R.isHexDigit(n)) throw Q(Y());
				e += Y();
			}
			return String.fromCodePoint(parseInt(e, 16));
		}
		var pe = {
			start: function() {
				if (W.type === "eof") throw ge();
				me();
			},
			beforePropertyName: function() {
				switch (W.type) {
					case "identifier":
					case "string":
						G = W.value, B = "afterPropertyName";
						return;
					case "punctuator":
						he();
						return;
					case "eof": throw ge();
				}
			},
			afterPropertyName: function() {
				if (W.type === "eof") throw ge();
				B = "beforePropertyValue";
			},
			beforePropertyValue: function() {
				if (W.type === "eof") throw ge();
				me();
			},
			beforeArrayValue: function() {
				if (W.type === "eof") throw ge();
				if (W.type === "punctuator" && W.value === "]") {
					he();
					return;
				}
				me();
			},
			afterPropertyValue: function() {
				if (W.type === "eof") throw ge();
				switch (W.value) {
					case ",":
						B = "beforePropertyName";
						return;
					case "}": he();
				}
			},
			afterArrayValue: function() {
				if (W.type === "eof") throw ge();
				switch (W.value) {
					case ",":
						B = "beforeArrayValue";
						return;
					case "]": he();
				}
			},
			end: function() {}
		};
		function me() {
			var e;
			switch (W.type) {
				case "punctuator":
					switch (W.value) {
						case "{":
							e = {};
							break;
						case "[": e = [];
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string": e = W.value;
			}
			if (ne === void 0) ne = e;
			else {
				var t = V[V.length - 1];
				Array.isArray(t) ? t.push(e) : Object.defineProperty(t, G, {
					value: e,
					writable: !0,
					enumerable: !0,
					configurable: !0
				});
			}
			if (typeof e == "object" && e) V.push(e), B = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName";
			else {
				var n = V[V.length - 1];
				B = n == null ? "end" : Array.isArray(n) ? "afterArrayValue" : "afterPropertyValue";
			}
		}
		function he() {
			V.pop();
			var e = V[V.length - 1];
			B = e == null ? "end" : Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue";
		}
		function Q(e) {
			return ye(e === void 0 ? "JSON5: invalid end of input at " + H + ":" + U : "JSON5: invalid character '" + ve(e) + "' at " + H + ":" + U);
		}
		function ge() {
			return ye("JSON5: invalid end of input at " + H + ":" + U);
		}
		function $() {
			return U -= 5, ye("JSON5: invalid identifier character at " + H + ":" + U);
		}
		function _e(e) {
			console.warn("JSON5: '" + ve(e) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function ve(e) {
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
		function ye(e) {
			var t = SyntaxError(e);
			return t.lineNumber = H, t.columnNumber = U, t;
		}
		return {
			parse: re,
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
							case "\0": if (R.isDigit(e[i + 1])) {
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
					if (!R.isIdStartChar(t)) return m(e, !0);
					for (var n = t.length; n < e.length; n++) if (!R.isIdContinueChar(String.fromCodePoint(e.codePointAt(n)))) return m(e, !0);
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
})))(), 1), C = {
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
}, w = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Expected an object");
	return e;
}, T = (e, t, n = -4096, r = 4096) => {
	let i = e === void 0 ? t : e;
	if (typeof i != "number" || !Number.isFinite(i) || i < n || i > r) throw Error(`Number must be between ${n} and ${r}`);
	return i;
}, E = (e, t = [0, 0]) => {
	if (e === void 0) return [...t];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Expected [x, y]");
	return [T(e[0], 0), T(e[1], 0)];
}, D = (e, t) => {
	if (e === void 0) return [];
	if (!Array.isArray(e) || e.length > t) throw Error(`Array limit: ${t}`);
	return e;
};
function O(e, t) {
	return e === void 0 ? t : typeof e == "number" ? T(e, t, -2147483648, 4294967295) | 0 : D(e, 16).reduce((e, t) => {
		if (typeof t != "string" || !Object.hasOwn(C, t)) throw Error("Unknown collision flag");
		return e | C[t];
	}, 0);
}
function k(e, t = "FFFFFF") {
	if (e === void 0) return t;
	if (e === "transparent") return e;
	if (Array.isArray(e) && e.length === 3) return e.map((e) => Math.round(T(e, 0, 0, 255)).toString(16).padStart(2, "0")).join("");
	if (typeof e == "string" && /^[0-9a-f]{6}$/i.test(e)) return e;
	throw Error("Invalid color");
}
var A = Object.fromEntries(Object.entries({
	root: "version physicsMode name width height maxViewWidth cameraFollow spawnDistance canBeStored kickOffReset bg traits vertexes segments goals discs planes joints redSpawnPoints blueSpawnPoints playerPhysics ballPhysics",
	bg: "type width height kickOffRadius cornerRadius goalLine color",
	vertexes: "trait x y bCoef cMask cGroup",
	segments: "trait v0 v1 bCoef cMask cGroup curve curveF bias color vis",
	discs: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color",
	planes: "trait normal dist bCoef cMask cGroup",
	goals: "trait p0 p1 team",
	joints: "trait d0 d1 length strength color",
	playerPhysics: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color acceleration kickingAcceleration kickingDamping kickStrength kickback"
}).map(([e, t]) => [e, new Set(t.split(" "))])), j = new Set([
	"vertexes",
	"segments",
	"discs",
	"planes",
	"goals",
	"joints",
	"playerPhysics"
].flatMap((e) => [...A[e]]));
function M(e) {
	let t = [], n = (e, t) => {
		let n = t.length > 80 ? t.slice(0, 80) + "…" : t;
		return e + (/^[A-Za-z_$][\w$]*$/.test(n) ? "." + n : "[" + JSON.stringify(n) + "]");
	}, r = (e, r, i) => {
		if (e && typeof e == "object" && !Array.isArray(e)) for (let a of Object.keys(e)) r.has(a) || (t.length < 64 ? t.push("Unsupported stadium field: " + n(i, a)) : t.length === 64 && t.push("Additional unsupported stadium fields omitted."));
	};
	r(e, A.root, "$"), r(e.bg, A.bg, "$.bg");
	for (let t of [
		"vertexes",
		"segments",
		"discs",
		"planes",
		"goals",
		"joints"
	]) {
		let n = e[t];
		Array.isArray(n) && n.forEach((e, n) => r(e, A[t], "$." + t + "[" + n + "]"));
	}
	if (r(e.ballPhysics, A.discs, "$.ballPhysics"), r(e.playerPhysics, A.playerPhysics, "$.playerPhysics"), e.traits && typeof e.traits == "object" && !Array.isArray(e.traits)) for (let [t, i] of Object.entries(e.traits)) r(i, j, n("$.traits", t));
	return t;
}
function N(e, t, n, r, i) {
	let a = e === "hbs" ? 1 : Math.ceil(2 * Math.SQRT2 * 100 / Math.min(10, i));
	if ((t + 32) * (n + t + 32 + r) * a > 2e6) throw Error("Stadium collision complexity exceeds the room budget");
}
function P(e) {
	if (new TextEncoder().encode(e).length > 262144) throw Error("Stadium exceeds 256 KB");
	let t = w(S.default.parse(e));
	if (t.physicsMode !== void 0 && t.physicsMode !== "hbs" && t.physicsMode !== "substeps") throw Error("Invalid physics mode");
	let n = t.physicsMode === "substeps" ? "substeps" : "hbs";
	if (t.version !== void 0 && t.version !== 1) throw Error("Unsupported stadium version");
	let r = t.traits === void 0 ? {} : w(t.traits), i = (e) => {
		let t = w(e);
		if (t.trait === void 0) return t;
		if (typeof t.trait != "string" || !Object.hasOwn(r, t.trait)) throw Error("Unknown trait");
		return {
			...w(r[t.trait]),
			...t
		};
	}, a = (e, t = !1) => ({
		pos: E(e.pos),
		speed: E(e.speed),
		gravity: E(e.gravity),
		radius: T(e.radius, 10, .5, 100),
		invMass: T(e.invMass, 1, 0, 8192),
		damping: T(e.damping, .99, 0, 8192),
		bCoef: T(e.bCoef, .5, -1, 8192),
		cGroup: O(e.cGroup, t ? 193 : 63),
		cMask: O(e.cMask, 63),
		color: k(e.color)
	}), o = D(t.discs, 63).map((e) => a(i(e)));
	if (t.ballPhysics !== "disc0") {
		let e = a(t.ballPhysics === void 0 ? {} : i(t.ballPhysics), !0);
		e.cGroup |= 192, o.unshift(e);
	} else if (!o.length) throw Error("disc0 needs a disc");
	let s = D(t.vertexes, 1024).map((e) => i(e)), c = [], l = [], u = M(t);
	for (let e of s) c.push({
		a: [T(e.x, 0), T(e.y, 0)],
		b: [T(e.x, 0), T(e.y, 0)],
		bCoef: T(e.bCoef, 1, -1, 8192),
		cGroup: O(e.cGroup, 32),
		cMask: O(e.cMask, 63),
		bias: 0,
		color: "transparent",
		vis: !1
	});
	let d = [...c];
	for (let e of D(t.segments, 1024)) {
		let t = i(e), n = T(t.v0, -1, 0, s.length - 1), r = T(t.v1, -1, 0, s.length - 1);
		if (!Number.isInteger(n) || !Number.isInteger(r)) throw Error("Vertex indices must be integers");
		let a = [T(s[n].x, 0), T(s[n].y, 0)], o = [T(s[r].x, 0), T(s[r].y, 0)], u = {
			bCoef: T(t.bCoef, 1, -1, 8192),
			cGroup: O(t.cGroup, 32),
			cMask: O(t.cMask, 63),
			bias: T(t.bias, 0, -100, 100),
			color: k(t.color, "000000"),
			vis: t.vis !== !1
		}, f = t.curveF === void 0 ? T(t.curve, 0, -359, 359) : 2 * Math.atan2(1, T(t.curveF, 0, -1e8, 1e8)) * 180 / Math.PI;
		if (Math.abs(f) < 1e-4) {
			let e = {
				a,
				b: o,
				...u
			};
			c.push(e), (a[0] !== o[0] || a[1] !== o[1]) && d.push(e);
			continue;
		}
		let p = f * Math.PI / 180, m = o[0] - a[0], h = o[1] - a[1];
		if (Math.hypot(m, h) < .001) throw Error("Arc endpoints overlap");
		let g = 1 / (2 * Math.tan(p / 2)), _ = [(a[0] + o[0]) / 2 - h * g, (a[1] + o[1]) / 2 + m * g], v = Math.hypot(a[0] - _[0], a[1] - _[1]), y = Math.atan2(a[1] - _[1], a[0] - _[0]), b = Math.ceil(Math.abs(p) / Math.max(1e-8, 2 * Math.acos(Math.max(-1, 1 - .15 / v))));
		if (c.length + b > 4096) throw Error("Compiled geometry exceeds 4096 segments");
		let x = {
			a,
			b: o,
			...u,
			center: _,
			radius: v,
			start: y,
			sweep: p,
			major: t.curveF === void 0 ? Math.abs(f) > 180 : Number(t.curveF) <= 0
		};
		l.push(x), d.push(x);
		let S = a;
		for (let e = 1; e <= b; e++) {
			let t = e === b ? o : [_[0] + v * Math.cos(y + p * e / b), _[1] + v * Math.sin(y + p * e / b)];
			c.push({
				a: S,
				b: t,
				...u,
				renderOnly: !0
			}), S = t;
		}
	}
	if (c.length > 4096) throw Error("Compiled geometry exceeds 4096 segments");
	let f = t.playerPhysics === void 0 ? {} : i(t.playerPhysics), p = {
		...a({
			...f,
			radius: f.radius ?? 15,
			invMass: f.invMass ?? .5,
			damping: f.damping ?? .96,
			cGroup: f.cGroup ?? 0
		}),
		acceleration: T(f.acceleration, .1, -8192, 8192),
		kickingAcceleration: T(f.kickingAcceleration, .07, -8192, 8192),
		kickingDamping: T(f.kickingDamping, .96, 0, 8192),
		kickStrength: T(f.kickStrength, 5, -8192, 8192),
		kickback: T(f.kickback, 0, -8192, 8192)
	};
	N(n, o.length, c.length, D(t.planes, 64).length + D(t.joints, 128).length, Math.min(p.radius, ...o.map((e) => e.radius)));
	let m = t.bg === void 0 ? {} : w(t.bg);
	return {
		version: 1,
		physicsMode: n,
		name: typeof t.name == "string" ? t.name.slice(0, 64) : "Untitled stadium",
		canBeStored: t.canBeStored !== !1,
		width: T(t.width, 520, 100, 2048),
		height: T(t.height, 300, 80, 2048),
		maxViewWidth: T(t.maxViewWidth, 0, 0, 4096),
		cameraFollow: t.cameraFollow === "player" ? "player" : "ball",
		bg: {
			type: m.type === "grass" ? "grass" : m.type === "hockey" ? "hockey" : "none",
			cornerRadius: T(m.cornerRadius, 0, 0, 500),
			goalLine: T(m.goalLine, 0, 0, 2048),
			width: T(m.width, 0, 0, 2048),
			height: T(m.height, 0, 0, 2048),
			color: k(m.color, "718C5A"),
			kickOffRadius: T(m.kickOffRadius, 0, 0, 500)
		},
		discs: o,
		segments: c,
		arcs: l,
		colliders: d,
		player: p,
		spawnDistance: T(t.spawnDistance, 200, 0, 1500),
		kickOffReset: t.kickOffReset === "full" ? "full" : "partial",
		redSpawnPoints: D(t.redSpawnPoints, 32).map((e) => E(e)),
		blueSpawnPoints: D(t.blueSpawnPoints, 32).map((e) => E(e)),
		warnings: u,
		planes: D(t.planes, 64).map((e) => {
			let t = i(e), n = E(t.normal);
			if (Math.hypot(...n) < 1e-6) throw Error("Plane normal is zero");
			return {
				normal: n,
				dist: T(t.dist, 0),
				bCoef: T(t.bCoef, 1, -1, 8192),
				cGroup: O(t.cGroup, 32),
				cMask: O(t.cMask, 63)
			};
		}),
		goals: D(t.goals, 16).map((e) => {
			let t = i(e);
			if (t.team !== "red" && t.team !== "blue") throw Error("Invalid goal team");
			let n = E(t.p0), r = E(t.p1);
			if (Math.hypot(r[0] - n[0], r[1] - n[1]) < 1) throw Error("Goal has zero length");
			return {
				p0: n,
				p1: r,
				team: t.team === "red" ? 1 : 2
			};
		}),
		joints: D(t.joints, 128).map((e) => {
			let t = i(e), n = T(t.d0, -1, 0, o.length - 1), r = T(t.d1, -1, 0, o.length - 1);
			if (!Number.isInteger(n) || !Number.isInteger(r) || n === r) throw Error("Invalid joint indices");
			let a = Math.hypot(o[r].pos[0] - o[n].pos[0], o[r].pos[1] - o[n].pos[1]), s = t.length == null ? [a, a] : typeof t.length == "number" ? [t.length, t.length] : E(t.length);
			return {
				d0: n,
				d1: r,
				min: T(s[0], 0, 0),
				max: T(s[1], 0, 0),
				strength: t.strength === void 0 || t.strength === "rigid" ? "rigid" : T(t.strength, 0, -8192, 8192),
				color: k(t.color, "000000")
			};
		})
	};
}
function F(e = "Emerald Arena", t = 440, n = 220) {
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
			} : {}
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
				color: n < 6 ? "72A99C" : "3D7267",
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
			color: "DAEEE4",
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
var ee = `ball2d-core/1/${x}`, I = class e {
	core;
	stadium;
	source = "";
	colors = [];
	tick = 0;
	elapsed = 0;
	ballKicks = [];
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
	kickRate = 2;
	setKickRateLimit(e, t, n) {
		this.kickRate = L(e, t, n), this.core.kick_limits(this.kickRate & 255, this.kickRate >>> 8 & 255, this.kickRate >>> 16);
	}
	constructor(e) {
		this.core = e.exports;
	}
	static async create(t, n) {
		let r = t ?? await (await fetch("/core.wasm?v=7fc98a6c80423112efa6", { signal: n })).arrayBuffer();
		if (Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", r))).map((e) => e.toString(16).padStart(2, "0")).join("") !== "18e0600cd78f6896249e672d14fefbc34e88826b1febf0b794dc5367f176e338") throw Error("Physics build changed. Refresh the page to load a matching version.");
		return new e(await WebAssembly.instantiate(await WebAssembly.compile(r)));
	}
	get data() {
		return new Float64Array(this.core.memory.buffer, this.core.data_ptr(), this.core.count() * 18);
	}
	load(e) {
		this.stadium = P(e), this.source = e, this.core.reset(), this.colors = [], this.core.physics_mode(+(this.stadium.physicsMode === "substeps")), this.tick = 0, this.elapsed = 0, this.red = this.blue = 0, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0, this.countdown = 0, this.kickoffActive = !0;
		for (let e of this.stadium.discs) this.add(e);
		for (let e = 0; e < 32; e++) this.add(this.stadium.player, e + 1);
		for (let e of this.stadium.colliders) if ("center" in e) {
			let t = e;
			this.core.arc(...t.center, t.radius, ...t.a, ...t.b, t.sweep, +t.major, t.bCoef, t.cGroup, t.cMask, t.bias);
		} else {
			let t = e;
			this.core.wall(...t.a, ...t.b, t.bCoef, t.cGroup, t.cMask, t.bias);
		}
		for (let e of this.stadium.planes) this.core.plane(...e.normal, e.dist, e.bCoef, e.cGroup, e.cMask);
		for (let e of this.stadium.joints) this.core.joint(e.d0, e.d1, e.min, e.max, e.strength === "rigid" ? Infinity : e.strength);
		for (let e of this.stadium.goals) this.core.goal(...e.p0, ...e.p1, e.team);
		let t = this.stadium.player;
		this.core.configure(t.acceleration, t.kickStrength, t.kickingAcceleration, t.kickingDamping, t.kickback, this.kickRate & 255), this.setKickRateLimit(this.kickRate & 255, this.kickRate >>> 8 & 255, this.kickRate >>> 16);
	}
	add(e, t = 0) {
		let n = this.core.add_disc();
		if (n < 0) throw Error("Disc capacity exceeded");
		this.colors.push(e.color === "transparent" ? -1 : parseInt(e.color, 16)), [
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
		].forEach((e, t) => this.core.set_disc(n, t, e));
	}
	index(e) {
		if (!Number.isInteger(e) || e < 0 || e >= 32) throw Error("Invalid slot");
		return this.stadium.discs.length + e;
	}
	joinPlayer(e) {
		let t = this.index(e) * 18;
		this.data[t + 15] = 0, this.data[t + 17] = 0, this.setTeam(e, 0);
	}
	setTeam(e, t) {
		if (![
			0,
			1,
			2
		].includes(t)) throw Error("Invalid team");
		let n = this.index(e), r = this.data;
		r[n * 18 + 13] = t, r[n * 18 + 10] = this.stadium.player.cGroup | (t === 1 ? 2 : t === 2 ? 4 : 0), r[n * 18 + 14] = 0, this.spawn(n, e, t, this.phase !== "lobby");
	}
	input(e, t) {
		let n = this.data, r = this.index(e) * 18, i = t & 31;
		i & 16 ? n[r + 14] & 16 || (n[r + 15] = n[r + 15] | 1024) : n[r + 15] = n[r + 15] & 1023, n[r + 14] = i;
	}
	applyDiscProperties(e, t) {
		let n = this.data;
		if (this.phase === "lobby" || !Number.isInteger(e) || e < 0 || e >= this.colors.length || n[e * 18 + 12] > 0 && n[e * 18 + 13] === 0) return !1;
		let r = b(t), i = !1;
		for (let [t, a] of y) {
			let o = r[t];
			if (o === void 0) continue;
			let s = a === -1 ? this.colors[e] : n[e * 18 + a];
			Object.is(s, o) || (i = !0);
		}
		if (!i) return !1;
		if (r.radius !== void 0) {
			let t = r.radius;
			for (let r = 0; r < this.colors.length; r++) r !== e && (t = Math.min(t, n[r * 18 + 4]));
			N(this.stadium.physicsMode, this.stadium.discs.length, this.stadium.segments.length, this.stadium.planes.length + this.stadium.joints.length, t);
		}
		for (let [t, i] of y) {
			let a = r[t];
			a !== void 0 && (i === -1 ? this.colors[e] = a : n[e * 18 + i] = a);
		}
		return !0;
	}
	restoreDiscProperties(e, t) {
		let n = e * 18, r = this.data;
		this.colors[e] = t.color === "transparent" ? -1 : parseInt(t.color, 16), r[n + 4] = t.radius, r[n + 5] = t.invMass, r[n + 6] = t.damping, r[n + 7] = t.bCoef, r[n + 8] = t.gravity[0], r[n + 9] = t.gravity[1], r[n + 10] = t.cGroup, r[n + 11] = t.cMask;
	}
	spawn(e, t, n, r = !1) {
		this.restoreDiscProperties(e, this.stadium.player), this.colors[e] = n === 1 ? 16087152 : n === 2 ? 7516147 : 16777215, this.data[e * 18 + 10] |= n === 1 ? 2 : n === 2 ? 4 : 0;
		let i = n === 1 ? this.stadium.redSpawnPoints : this.stadium.blueSpawnPoints, a = this.data, o = 0;
		for (let e = 0; e < t; e++) a[this.index(e) * 18 + 13] === n && o++;
		let s = n === 1 ? -1 : 1, c = i.length ? i[r ? i.length - 1 : Math.min(o, i.length - 1)] : r ? [s * this.stadium.width, 0] : [s * this.stadium.spawnDistance, o ? Math.ceil(o / 2) * 55 * (o % 2 ? 1 : -1) : 0];
		a[e * 18] = c[0], a[e * 18 + 1] = c[1], a[e * 18 + 2] = a[e * 18 + 3] = a[e * 18 + 14] = 0, a[e * 18 + 15] &= 1023, a[e * 18 + 11] = this.stadium.player.cMask & -25;
	}
	resetPositions(e = !1) {
		this.kickoffActive = !0;
		let t = this.data;
		for (let n = 0; n < this.stadium.discs.length; n++) {
			let r = this.stadium.discs[n];
			(e || n === 0 || this.stadium.kickOffReset === "full") && (this.restoreDiscProperties(n, r), t[n * 18] = r.pos[0], t[n * 18 + 1] = r.pos[1], t[n * 18 + 2] = r.speed[0], t[n * 18 + 3] = r.speed[1]);
		}
		for (let e = 0; e < 32; e++) {
			let n = this.index(e);
			this.spawn(n, e, t[n * 18 + 13]);
		}
	}
	start() {
		(this.phase === "lobby" || this.phase === "finished") && (this.red = this.blue = this.elapsed = 0, this.phase = "playing", this.paused = !1, this.resumeTicks = 0, this.kickoff = 1, this.countdown = 0, this.resetPositions(!0));
	}
	stop() {
		this.phase = "lobby", this.paused = !1, this.resumeTicks = 0;
	}
	setPaused(e) {
		this.phase !== "lobby" && (e = !!e, this.paused !== e && (this.paused = e, this.resumeTicks = e ? 0 : 119));
	}
	finish() {
		this.phase = "finished", this.countdown = 300;
	}
	step() {
		if (this.ballKicks.length = 0, this.tick++, this.paused || this.phase === "lobby") return;
		if (this.resumeTicks > 0) {
			this.resumeTicks--;
			return;
		}
		let e = this.data;
		this.core.step();
		for (let e = this.core.ball_kick_events() >>> 0, t = 0; e; e >>>= 1, t++) e & 1 && this.ballKicks.push(t);
		if (this.phase === "finished") {
			--this.countdown <= 0 && this.stop();
			return;
		}
		if (this.phase === "goal") {
			--this.countdown <= 0 && (this.scoreLimit > 0 && Math.max(this.red, this.blue) >= this.scoreLimit || this.timeLimit > 0 && this.elapsed >= this.timeLimit * 60 && this.red !== this.blue ? this.finish() : (this.phase = "playing", this.resetPositions()));
			return;
		}
		for (let t = 0; t < 32; t++) {
			let n = this.index(t) * 18, r = this.stadium.player.cMask;
			e[n + 11] = r & -25 | (this.kickoffActive ? r & (this.kickoff === 1 ? 8 : 16) : 0);
		}
		if (this.kickoffActive) {
			e[2] * e[2] + e[3] * e[3] > 0 && (this.kickoffActive = !1);
			return;
		}
		this.elapsed++;
		let t = this.core.goal_event();
		if (t === 1 || t === 2) {
			t === 1 ? this.red++ : this.blue++, this.kickoff = t === 1 ? 2 : 1, this.phase = "goal", this.countdown = 150, this.lastGoal = this.tick;
			return;
		}
		this.timeLimit > 0 && this.elapsed >= this.timeLimit * 60 && this.red !== this.blue && this.finish();
	}
	snapshot() {
		return {
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
		if (!e || typeof e != "object" || !Array.isArray(e.discs) || e.discs.length !== this.data.length || !e.discs.every((e, t) => typeof e == "number" && Number.isFinite(e) && Math.abs(e) <= (t % 18 == 10 || t % 18 == 11 ? 2147483648 : t % 18 == 17 ? 25500 : 8192))) throw Error("Invalid state");
		if (!Array.isArray(e.colors) || e.colors.length !== e.discs.length / 18 || e.colors.some((e) => !Number.isInteger(e) || e < -1 || e > 16777215)) throw Error("Invalid disc colors");
		let t = (e, t, n = 0) => Number.isInteger(e) && e >= n && e <= t;
		if (!t(e.kickRate, 6619135) || !t(e.tick, 4294967295) || !t(e.elapsed, 4294967295) || !t(e.red, 65535) || !t(e.blue, 65535) || !t(e.countdown, 300) || !t(e.resumeTicks, 119) || (e.paused || e.phase === "lobby") && e.resumeTicks !== 0 || !t(e.scoreLimit, 99) || !t(e.timeLimit, 5940) || ![
			"lobby",
			"playing",
			"goal",
			"finished"
		].includes(e.phase) || typeof e.paused != "boolean" || typeof e.kickoffActive != "boolean" || ![1, 2].includes(e.kickoff)) throw Error("Invalid match metadata");
		for (let n = 0; n < e.discs.length; n += 18) if (e.discs[n + 4] < .5 || e.discs[n + 4] > 100 || e.discs[n + 5] < 0 || e.discs[n + 5] > 8192 || e.discs[n + 6] < 0 || e.discs[n + 6] > 8192 || e.discs[n + 7] < -1 || e.discs[n + 7] > 8192 || !t(e.discs[n + 10], 2147483647, -2147483648) || !t(e.discs[n + 11], 2147483647, -2147483648) || !t(e.discs[n + 13], 2) || !t(e.discs[n + 14], 31) || !t(e.discs[n + 15], 2047) || e.discs[n + 12] > 0 && (!Number.isInteger(e.discs[n + 17]) || e.discs[n + 17] < -255 || e.discs[n + 17] > 25500)) throw Error("Invalid disc properties");
		let n = 10;
		for (let t = 4; t < e.discs.length; t += 18) n = Math.min(n, e.discs[t]);
		N(this.stadium.physicsMode, this.stadium.discs.length, this.stadium.segments.length, this.stadium.planes.length + this.stadium.joints.length, n), this.setKickRateLimit(e.kickRate & 255, e.kickRate >>> 8 & 255, e.kickRate >>> 16), this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.scoreLimit = e.scoreLimit, this.timeLimit = e.timeLimit, this.data.set(e.discs), this.colors = [...e.colors];
	}
};
function L(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isInteger)) throw Error("Invalid kick rate limit");
	return Math.max(0, Math.min(255, e)) | Math.max(0, Math.min(255, t)) << 8 | Math.max(0, Math.min(100, n)) << 16;
}
function R(e) {
	let t = new URL(e);
	if (!["http:", "https:"].includes(t.protocol) || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected an HTTP(S) service origin without credentials or a path");
	return t.origin;
}
function z() {
	return {
		serviceOrigin: location.origin,
		createWebSocket: (e) => new WebSocket(e),
		createPeerConnection: (e) => new RTCPeerConnection(e)
	};
}
var B = [
	["classic", "Classic"],
	["easy", "Easy"],
	["small", "Small"],
	["big", "Big"],
	["rounded", "Rounded"],
	["hockey", "Hockey"],
	["big_easy", "Big Easy"],
	["big_rounded", "Big Rounded"],
	["big_hockey", "Big Hockey"],
	["huge", "Huge"]
];
function V(e) {
	let t = /* @__PURE__ */ new Map();
	return async (n) => {
		let r = B.find(([e, t]) => e === n || t === n);
		if (!r) throw Error("Unknown default stadium");
		let i = t.get(r[0]);
		return i || (i = (async () => {
			let t = await e(`/stadiums/${r[0]}.hbs`);
			if (!t.ok) throw Error("Could not load stadium");
			let n = await t.text();
			return P(n), n;
		})(), t.set(r[0], i), i.catch(() => t.delete(r[0]))), i;
	};
}
function te() {
	let e = z(), t = (e, t) => fetch(e, t);
	return {
		network: e,
		request: t,
		loadEngine: (e) => I.create(void 0, e),
		loadStadium: V((n) => t(new URL(n, e.serviceOrigin)))
	};
}
var H = {
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
	}
}, U = class {
	peers = /* @__PURE__ */ new Map();
	allow(e, t, n = performance.now()) {
		let r = this.peers.get(e);
		r || (r = {}, this.peers.set(e, r));
		let { burst: i, perSecond: a } = H[t], o = r[t] ?? {
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
}, W = Uint8Array, G = Uint16Array, ne = Int32Array, re = new W([
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
]), ie = new W([
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
]), K = new W([
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
]), q = function(e, t) {
	for (var n = new G(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new ne(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, ae = q(re, 2), oe = ae.b, J = ae.r;
oe[28] = 258, J[258] = 28;
for (var se = q(ie, 0), ce = se.b, Y = se.r, le = new G(32768), X = 0; X < 32768; ++X) {
	var Z = (X & 43690) >> 1 | (X & 21845) << 1;
	Z = (Z & 52428) >> 2 | (Z & 13107) << 2, Z = (Z & 61680) >> 4 | (Z & 3855) << 4, le[X] = ((Z & 65280) >> 8 | (Z & 255) << 8) >> 1;
}
for (var ue = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new G(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new G(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new G(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[le[d] >> c] = l;
	} else for (s = new G(r), i = 0; i < r; ++i) e[i] && (s[i] = le[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), de = new W(288), X = 0; X < 144; ++X) de[X] = 8;
for (var X = 144; X < 256; ++X) de[X] = 9;
for (var X = 256; X < 280; ++X) de[X] = 7;
for (var X = 280; X < 288; ++X) de[X] = 8;
for (var fe = new W(32), X = 0; X < 32; ++X) fe[X] = 5;
var pe = /*#__PURE__*/ ue(de, 9, 0), me = /*#__PURE__*/ ue(de, 9, 1), he = /*#__PURE__*/ ue(fe, 5, 0), Q = /*#__PURE__*/ ue(fe, 5, 1), ge = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, $ = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, _e = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, ve = function(e) {
	return (e + 7) / 8 | 0;
}, ye = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new W(e.subarray(t, n));
}, be = [
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
], xe = function(e, t, n) {
	var r = Error(t || be[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, xe), !n) throw r;
	return r;
}, Se = function(e, t, n, r) {
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
			u = $(e, d, 1);
			var v = $(e, d + 1, 3);
			if (d += 3, !v) {
				var y = ve(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && xe(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = me, m = Q, h = 9, g = 5;
			else if (v == 2) {
				var S = $(e, d, 31) + 257, C = $(e, d + 10, 15) + 4, w = S + $(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new W(w), E = new W(19), D = 0; D < C; ++D) E[K[D]] = $(e, d + D * 3, 7);
				d += C * 3;
				for (var O = ge(E), k = (1 << O) - 1, A = ue(E, O, 1), D = 0; D < w;) {
					var j = A[$(e, d, k)];
					d += j & 15;
					var y = j >> 4;
					if (y < 16) T[D++] = y;
					else {
						var M = 0, N = 0;
						for (y == 16 ? (N = 3 + $(e, d, 3), d += 2, M = T[D - 1]) : y == 17 ? (N = 3 + $(e, d, 7), d += 3) : y == 18 && (N = 11 + $(e, d, 127), d += 7); N--;) T[D++] = M;
					}
				}
				var P = T.subarray(0, S), F = T.subarray(S);
				h = ge(P), g = ge(F), p = ue(P, h, 1), m = ue(F, g, 1);
			} else xe(1);
			if (d > _) {
				c && xe(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var ee = (1 << h) - 1, I = (1 << g) - 1, L = d;; L = d) {
			var M = p[_e(e, d) & ee], R = M >> 4;
			if (d += M & 15, d > _) {
				c && xe(0);
				break;
			}
			if (M || xe(2), R < 256) n[f++] = R;
			else if (R == 256) {
				L = d, p = null;
				break;
			} else {
				var z = R - 254;
				if (R > 264) {
					var D = R - 257, B = re[D];
					z = $(e, d, (1 << B) - 1) + oe[D], d += B;
				}
				var V = m[_e(e, d) & I], te = V >> 4;
				V || xe(3), d += V & 15;
				var F = ce[te];
				if (te > 3) {
					var B = ie[te];
					F += _e(e, d) & (1 << B) - 1, d += B;
				}
				if (d > _) {
					c && xe(0);
					break;
				}
				s && l(f + 131072);
				var H = f + z;
				if (f < F) {
					var U = a - F, G = Math.min(F, H);
					for (U + f < 0 && xe(3); f < G; ++f) n[f] = r[U + f];
				}
				for (; f < H; ++f) n[f] = n[f - F];
			}
		}
		t.l = p, t.p = L, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? ye(n, 0, f) : n.subarray(0, f);
}, Ce = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, we = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, Te = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: Me,
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
	var p = new G(f + 1), m = Ee(n[u - 1], p, 0);
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
}, Ee = function(e, t, n) {
	return e.s == -1 ? Math.max(Ee(e.l, t, n + 1), Ee(e.r, t, n + 1)) : t[e.s] = n;
}, De = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new G(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, Oe = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, ke = function(e, t, n) {
	var r = n.length, i = ve(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, Ae = function(e, t, n, r, i, a, o, s, c, l, u) {
	Ce(t, u++, n), ++i[256];
	for (var d = Te(i, 15), f = d.t, p = d.l, m = Te(a, 15), h = m.t, g = m.l, _ = De(f), v = _.c, y = _.n, b = De(h), x = b.c, S = b.n, C = new G(19), w = 0; w < v.length; ++w) ++C[v[w] & 31];
	for (var w = 0; w < x.length; ++w) ++C[x[w] & 31];
	for (var T = Te(C, 7), E = T.t, D = T.l, O = 19; O > 4 && !E[K[O - 1]]; --O);
	var k = l + 5 << 3, A = Oe(i, de) + Oe(a, fe) + o, j = Oe(i, f) + Oe(a, h) + o + 14 + 3 * O + Oe(C, E) + 2 * C[16] + 3 * C[17] + 7 * C[18];
	if (c >= 0 && k <= A && k <= j) return ke(t, u, e.subarray(c, c + l));
	var M, N, P, F;
	if (Ce(t, u, 1 + (j < A)), u += 2, j < A) {
		M = ue(f, p, 0), N = f, P = ue(h, g, 0), F = h;
		var ee = ue(E, D, 0);
		Ce(t, u, y - 257), Ce(t, u + 5, S - 1), Ce(t, u + 10, O - 4), u += 14;
		for (var w = 0; w < O; ++w) Ce(t, u + 3 * w, E[K[w]]);
		u += 3 * O;
		for (var I = [v, x], L = 0; L < 2; ++L) for (var R = I[L], w = 0; w < R.length; ++w) {
			var z = R[w] & 31;
			Ce(t, u, ee[z]), u += E[z], z > 15 && (Ce(t, u, R[w] >> 5 & 127), u += R[w] >> 12);
		}
	} else M = pe, N = de, P = he, F = fe;
	for (var w = 0; w < s; ++w) {
		var B = r[w];
		if (B > 255) {
			var z = B >> 18 & 31;
			we(t, u, M[z + 257]), u += N[z + 257], z > 7 && (Ce(t, u, B >> 23 & 31), u += re[z]);
			var V = B & 31;
			we(t, u, P[V]), u += F[V], V > 3 && (we(t, u, B >> 5 & 8191), u += ie[V]);
		} else we(t, u, M[B]), u += N[B];
	}
	return we(t, u, M[256]), u + N[256];
}, je = /*#__PURE__*/ new ne([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), Me = /*#__PURE__*/ new W(0), Ne = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new W(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = je[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new G(32768), g = a.h || new G(m + 1), _ = Math.ceil(n / 3), v = 2 * _, y = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
		}, b = new ne(25e3), x = new G(288), S = new G(32), C = 0, w = 0, T = a.i || 0, E = 0, D = a.w || 0, O = 0; T + 2 < o; ++T) {
			var k = y(T), A = T & 32767, j = g[k];
			if (h[A] = j, g[k] = A, D <= T) {
				var M = o - T;
				if ((C > 7e3 || E > 24576) && (M > 423 || !l)) {
					u = Ae(e, c, 0, b, x, S, w, E, O, T - O, u), E = C = w = 0, O = T;
					for (var N = 0; N < 286; ++N) x[N] = 0;
					for (var N = 0; N < 30; ++N) S[N] = 0;
				}
				var P = 2, F = 0, ee = p, I = A - j & 32767;
				if (M > 2 && k == y(T - I)) for (var L = Math.min(f, M) - 1, R = Math.min(32767, T), z = Math.min(258, M); I <= R && --ee && A != j;) {
					if (e[T + P] == e[T + P - I]) {
						for (var B = 0; B < z && e[T + B] == e[T + B - I]; ++B);
						if (B > P) {
							if (P = B, F = I, B > L) break;
							for (var V = Math.min(I, B - 2), te = 0, N = 0; N < V; ++N) {
								var H = T - I + N & 32767, U = H - h[H] & 32767;
								U > te && (te = U, j = H);
							}
						}
					}
					A = j, j = h[A], I += A - j & 32767;
				}
				if (F) {
					b[E++] = 268435456 | J[P] << 18 | Y[F];
					var K = J[P] & 31, q = Y[F] & 31;
					w += re[K] + ie[q], ++x[257 + K], ++S[q], D = T + P, ++C;
				} else b[E++] = e[T], ++x[e[T]];
			}
		}
		for (T = Math.max(T, D); T < o; ++T) b[E++] = e[T], ++x[e[T]];
		u = Ae(e, c, l, b, x, S, w, E, O, T - O, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = T, a.w = D);
	} else {
		for (var T = a.w || 0; T < o + l; T += 65535) {
			var ae = T + 65535;
			ae >= o && (c[u / 8 | 0] = l, ae = o), u = ke(c, u + 1, e.subarray(T, ae));
		}
		a.i = o;
	}
	return ye(s, 0, r + ve(u) + i);
}, Pe = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new W(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return Ne(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
function Fe(e, t) {
	return Pe(e, t || {}, 0, 0);
}
var Ie = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new W(32768), this.p = new W(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || xe(5), this.d && xe(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new W(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = Se(this.p, this.s, this.o);
		this.ondata(ye(n, t, this.s.b), this.d), this.o = ye(n, this.s.b - 32768), this.s.b = this.o.length, this.p = ye(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}(), Le = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	Le.decode(Me, { stream: !0 });
} catch {}
var Re = 33554432, ze = new TextEncoder();
new TextDecoder("utf-8", { fatal: !0 });
function Be(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function Ve(e) {
	if (e.length > 33554432) throw Error("Replay exceeds 32 MB");
	let t = Fe(e, { level: 6 }), n = new Uint8Array(16 + t.length), r = new DataView(n.buffer);
	return n.set([
		66,
		50,
		68,
		90,
		1,
		0,
		0,
		0
	]), r.setUint32(8, e.length, !0), r.setUint32(12, Be(e), !0), n.set(t, 16), n;
}
function He(e) {
	if (typeof e == "string") {
		if (ze.encode(e).length > 33554432) throw Error("Replay exceeds 32 MB");
		return ze.encode(e);
	}
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t.length > 33554432) throw Error("Replay exceeds 32 MB");
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 90) return t;
	if (t.length < 17 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid compressed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0);
	if (!r || r > 33554432) throw Error("Invalid expanded replay size");
	let i = new Uint8Array(r), a = 0, o = !1, s = new Ie((e, t) => {
		if (a + e.length > r) throw Error("Expanded replay exceeds declared size");
		i.set(e, a), a += e.length, o = t;
	});
	for (let e = 16; e < t.length; e += 1024) s.push(t.subarray(e, e + 1024), e + 1024 >= t.length);
	if (!o || a !== r || Be(i) !== n.getUint32(12, !0)) throw Error("Compressed replay integrity failure");
	return i;
}
var Ue = [
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
], We = new TextEncoder(), Ge = new TextDecoder("utf-8", { fatal: !0 });
function Ke(e) {
	return Ve(qe(e));
}
function qe(e) {
	let { commands: t, ...n } = e, r = t.some((e) => e.kind === "disc") ? 3 : e.checkpoints.length ? 2 : 1, i = 0, a = e.checkpoints.map((e) => {
		let t = e.state.discs;
		if (!Array.isArray(t) || t.length > 1728 || t.some((e) => !Number.isFinite(e))) throw Error("Invalid checkpoint discs");
		return i += t.length * 8, {
			...e,
			state: {
				...e.state,
				discs: t.length
			}
		};
	});
	if (a.length > 721) throw Error("Too many replay checkpoints");
	let o = We.encode(JSON.stringify(r >= 2 ? {
		...n,
		checkpoints: a
	} : n));
	if (t.length > 5e5 || o.length + 16 > 33554432) throw Error("Replay exceeds bounds");
	let s = t.length * 12 + t.filter((e) => e.kind === "disc").length * 106, c = new Uint8Array(Math.min(Re, s)), l = new DataView(c.buffer), u = (e) => {
		if (d + e > c.length) throw Error("Replay exceeds bounds");
	}, d = 0, f = e.initial.tick, p = (e) => {
		if (!Number.isInteger(e) || e < 0 || e > 4294967295) throw Error("Invalid replay integer");
		do {
			u(1);
			let t = Math.floor(e / 128);
			c[d++] = e % 128 | (t ? 128 : 0), e = t;
		} while (e);
	};
	for (let e of t) {
		let t = Ue.indexOf(r < 3 && e.kind === "join" ? "team" : e.kind);
		if (e.kind === "join" && e.value !== 0 || e.kind === "team" && e.value > 2) throw Error("Invalid replay team command");
		if (t < 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31)) throw Error("Invalid replay command");
		if (p(e.tick - f), u(1), c[d++] = r === 3 ? t : t << 5 | e.slot, r === 3 && p(e.slot), p(r < 3 && e.kind === "join" ? 3 : e.value), e.kind === "disc") {
			let t = b(e.properties), n = 0;
			y.forEach(([e], r) => {
				t[e] !== void 0 && (n |= 1 << r);
			}), p(n);
			for (let [e] of y) {
				let n = t[e];
				n !== void 0 && (u(8), l.setFloat64(d, n, !0), d += 8);
			}
		}
		f = e.tick;
	}
	let m = 16 + o.length + i + d;
	if (m > 33554432) throw Error("Replay exceeds 32 MB");
	let h = new Uint8Array(m), g = new DataView(h.buffer);
	h.set([
		66,
		50,
		68,
		80,
		r,
		0,
		0,
		0
	]), g.setUint32(8, o.length, !0), g.setUint32(12, t.length, !0), h.set(o, 16);
	let _ = 16 + o.length;
	for (let t of e.checkpoints) for (let e of t.state.discs) g.setFloat64(_, e, !0), _ += 8;
	return h.set(c.subarray(0, d), _), h;
}
function Je(e) {
	let t = He(e);
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 80) return JSON.parse(Ge.decode(t));
	if (t.length < 16 || ![
		1,
		2,
		3
	].includes(t[4]) || t[5] || t[6] || t[7]) throw Error("Invalid packed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0), i = n.getUint32(12, !0);
	if (r > t.length - 16 || i > 5e5 || i > (t.length - 16 - r) / 3) throw Error("Invalid packed replay bounds");
	let a = JSON.parse(Ge.decode(t.subarray(16, 16 + r)));
	if (!a || !Number.isSafeInteger(a.initial?.tick) || a.initial.tick < 0) throw Error("Invalid replay initial tick");
	a.commands = [];
	let o = 16 + r, s = a.initial.tick;
	if (t[4] >= 2) {
		if (!Array.isArray(a.checkpoints) || a.checkpoints.length > 721) throw Error("Invalid packed checkpoints");
		let e = 0;
		for (let t of a.checkpoints) {
			let n = t?.state?.discs;
			if (typeof n != "number" || !Number.isInteger(n) || n < 0 || n > 1728) throw Error("Invalid checkpoint disc count");
			e += n * 8;
		}
		if (e > t.length - o - i * 3) throw Error("Truncated checkpoint discs");
		for (let e of a.checkpoints) {
			let t = e.state.discs, r = Array(t);
			for (let e = 0; e < t; e++) {
				let t = n.getFloat64(o, !0);
				if (!Number.isFinite(t)) throw Error("Nonfinite checkpoint disc");
				r[e] = t, o += 8;
			}
			e.state.discs = r;
		}
	}
	let c = () => {
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
		if (s += c(), !Number.isSafeInteger(s) || o >= t.length) throw Error("Invalid replay tick");
		let e = t[o++], r = Ue[t[4] === 3 ? e : e >> 5];
		if (!r) throw Error("Unknown replay command");
		let i = t[4] === 3 ? c() : e & 31, l = c();
		if (r === "disc") {
			let e = c();
			if (e > 8191) throw Error("Invalid disc property mask");
			let u = {};
			y.forEach(([r], i) => {
				if (e & 1 << i) {
					if (o + 8 > t.length) throw Error("Truncated disc properties");
					u[r] = n.getFloat64(o, !0), o += 8;
				}
			}), a.commands.push({
				tick: s,
				kind: r,
				slot: i,
				value: l,
				properties: b(u)
			});
			continue;
		}
		a.commands.push(t[4] < 3 && r === "team" && l === 3 ? {
			tick: s,
			kind: "join",
			slot: i,
			value: 0
		} : {
			tick: s,
			kind: r,
			slot: i,
			value: l
		});
	}
	if (o !== t.length) throw Error("Trailing replay command data");
	return a;
}
function Ye(e) {
	let t = JSON.stringify(e), n = 2166136261;
	for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return (n >>> 0).toString(16).padStart(8, "0");
}
function Xe(e, t) {
	switch (t.kind) {
		case "disc":
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
			e.setKickRateLimit(t.value & 255, t.value >>> 8 & 255, t.value >>> 16);
			break;
		case "pause": e.setPaused(!!t.value);
	}
}
var Ze = class {
	replay;
	playerOrder = [];
	lastInputs = /* @__PURE__ */ new Map();
	bytes = 0;
	full = !1;
	canRecord(e) {
		return !this.full && e.tick - this.replay.initial.tick < 216e3;
	}
	constructor(e, t = [], n = [null, null]) {
		let r = e.snapshot();
		this.playerOrder = t.map((e) => e.slot), this.replay = {
			magic: "B2DR",
			version: 1,
			engine: ee,
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
				teams: h(n)
			}],
			orders: [{
				tick: r.tick,
				slots: [...this.playerOrder]
			}],
			end: r.tick,
			finalHash: Ye(r)
		}, this.bytes = new TextEncoder().encode(JSON.stringify(this.replay)).length;
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + 14]);
	}
	reserve(e) {
		let t = new TextEncoder().encode(JSON.stringify(e)).length + 1;
		return this.full || this.bytes + t > 31457280 ? (this.full = !0, !1) : (this.bytes += t, !0);
	}
	player(e, t, n, r) {
		let i = {
			tick: e,
			slot: t,
			name: n,
			avatar: r
		};
		return this.replay.roster.length >= 4096 || !this.reserve(i) ? (this.full = !0, !1) : (this.replay.roster.push(i), n === null ? this.order(e, this.playerOrder.filter((e) => e !== t)) : this.playerOrder.includes(t) ? !0 : this.order(e, [...this.playerOrder, t]));
	}
	style(e, t) {
		let n = {
			tick: e,
			teams: h(t)
		}, r = this.replay.styles;
		return r.length >= 4096 || !this.reserve(n) ? (this.full = !0, !1) : (r.push(n), !0);
	}
	order(e, t) {
		if (t.length === this.playerOrder.length && t.every((e, t) => e === this.playerOrder[t])) return !0;
		let n = {
			tick: e,
			slots: [...t]
		}, r = this.replay.orders;
		return r.length >= 4096 || !this.reserve(n) ? (this.full = !0, !1) : (this.playerOrder = [...t], r.push(n), !0);
	}
	command(e) {
		return e.kind === "input" && this.lastInputs.get(e.slot) === e.value ? !0 : this.replay.commands.length >= 5e5 || !this.reserve(e) ? (this.full = !0, !1) : (e.kind === "input" && this.lastInputs.set(e.slot, e.value), (e.kind === "team" || e.kind === "join") && this.lastInputs.set(e.slot, 0), e.kind === "start" && this.lastInputs.clear(), this.replay.commands.push(e.kind === "disc" ? {
			...e,
			properties: b(e.properties)
		} : { ...e }), !0);
	}
	step(e) {
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + 14]);
		if (e.tick % 300 == 0) {
			let t = e.snapshot(), n = {
				tick: e.tick,
				state: t,
				hash: Ye(t)
			};
			this.reserve(n) && this.replay.checkpoints.push(n);
		}
		this.replay.end = e.tick;
	}
	pack(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Ye(e.snapshot()), qe(this.replay);
	}
	finish(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Ye(e.snapshot()), new Blob([Ke(this.replay)], { type: "application/x-ball2d-replay" });
	}
};
async function Qe(e) {
	if (e.size > 33554432) throw Error("Replay exceeds 32 MB");
	return $e(await e.arrayBuffer());
}
function $e(e) {
	let t = Je(e);
	if (t.magic !== "B2DR" || t.version !== 1 || t.engine !== ee) throw Error("Unsupported replay engine/version");
	if (!Array.isArray(t.commands) || t.commands.length > 5e5 || !Array.isArray(t.checkpoints) || t.checkpoints.length > 721 || !Number.isInteger(t.end) || t.end < t.initial.tick || t.end - t.initial.tick > 216e3) throw Error("Invalid replay bounds");
	let n = t.initial.tick;
	for (let e of t.commands) {
		if (!Number.isInteger(e.tick) || e.tick < n || e.tick > t.end || ![
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
		].includes(e.kind) || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31) || !Number.isInteger(e.value) || e.value < 0 || e.value > (e.kind === "disc" || e.kind === "join" ? 0 : e.kind === "kickRate" ? 6619135 : e.kind === "timeLimit" ? 5940 : e.kind === "scoreLimit" ? 99 : e.kind === "team" ? 2 : e.kind === "pause" ? 1 : 31)) throw Error("Invalid replay command");
		e.kind === "disc" && (e.properties = b(e.properties)), n = e.tick;
	}
	if (!Array.isArray(t.roster) || t.roster.length > 4096) throw Error("Invalid replay roster");
	n = t.initial.tick;
	for (let e of t.roster) {
		if (!Number.isInteger(e.tick) || e.tick < n || e.tick > t.end || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > 31 || e.name !== null && (typeof e.name != "string" || e.name.length > 24) || e.avatar !== void 0 && !v(e.avatar)) throw Error("Invalid roster event");
		n = e.tick;
	}
	if (t.styles !== void 0) {
		if (!Array.isArray(t.styles) || t.styles.length > 4096) throw Error("Invalid replay styles");
		let e = t.initial.tick;
		for (let n of t.styles) {
			if (!n || !Number.isInteger(n.tick) || n.tick < e || n.tick > t.end || n.teams === void 0) throw Error("Invalid replay style");
			n.teams = h(n.teams), e = n.tick;
		}
	}
	if (t.orders !== void 0) {
		if (!Array.isArray(t.orders) || t.orders.length > 4096) throw Error("Invalid replay orders");
		let e = t.initial.tick;
		for (let n of t.orders) {
			if (!n || !Number.isInteger(n.tick) || n.tick < e || n.tick > t.end || !Array.isArray(n.slots) || n.slots.length > 32 || n.slots.some((e) => !Number.isInteger(e) || e < 0 || e > 31) || new Set(n.slots).size !== n.slots.length) throw Error("Invalid replay order");
			e = n.tick;
		}
	}
	let r = t.initial.tick;
	for (let e of t.checkpoints) {
		if (!Number.isInteger(e.tick) || e.tick <= r || e.tick > t.end || e.state.tick !== e.tick || typeof e.hash != "string") throw Error("Invalid checkpoint");
		r = e.tick;
	}
	return t;
}
function et(e) {
	let t = [...e], n = new Set(t.filter((e) => e.type === "transport" && e.selectedCandidatePairId).map((e) => e.selectedCandidatePairId)), r = t.filter((e) => e.type === "candidate-pair" && e.state === "succeeded"), i = n.size ? r.filter((e) => n.has(e.id)) : r.filter((e) => e.nominated === !0);
	if (i.length !== 1) return null;
	let a = i[0].currentRoundTripTime;
	return typeof a == "number" && Number.isFinite(a) && a >= 0 ? a * 1e3 : null;
}
var tt = 524288, nt = 16384, rt = 12;
function it(e, t) {
	let n = JSON.stringify(e);
	if (n === void 0) throw Error("Missing control message");
	let r = new TextEncoder().encode(n);
	if (r.length > tt) throw Error("Control message exceeds 512 KB");
	if (r.length <= nt) return [n];
	let i = Math.ceil(r.length / nt), a = [];
	for (let e = 0; e < i; e++) {
		let n = r.subarray(e * nt, (e + 1) * nt), o = new ArrayBuffer(rt + n.length), s = new DataView(o);
		s.setUint16(0, 45635), s.setUint8(2, 1), s.setUint32(4, t, !0), s.setUint16(8, e, !0), s.setUint16(10, i, !0), new Uint8Array(o, rt).set(n), a.push(o);
	}
	return a;
}
var at = class {
	partial;
	push(e, t = performance.now()) {
		if (typeof e == "string") {
			if (this.partial || new TextEncoder().encode(e).length > nt) throw Error("Invalid control message");
			return JSON.parse(e);
		}
		if (e.byteLength < 13 || e.byteLength > 16396) throw Error("Control fragment length");
		let n = new DataView(e);
		if (n.getUint16(0) !== 45635 || n.getUint8(2) !== 1 || n.getUint8(3) !== 0) throw Error("Control fragment version");
		let r = n.getUint32(4, !0), i = n.getUint16(8, !0), a = n.getUint16(10, !0);
		if (a < 2 || a > 32 || i >= a) throw Error("Control fragment bounds");
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
		if (o.id !== r || o.count !== a || o.next !== i || t - o.since > 1e4) throw Error("Control fragment sequence");
		if (o.next++, o.bytes += e.byteLength - rt, o.bytes > tt) throw Error("Control size limit");
		if (o.parts.push(new Uint8Array(e.slice(rt))), o.next !== a) return;
		let s = new Uint8Array(o.bytes), c = 0;
		for (let e of o.parts) s.set(e, c), c += e.length;
		return this.partial = void 0, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s));
	}
}, ot = class extends Error {}, st = 1, ct = class {
	room;
	credentials;
	hooks;
	runtime;
	ws;
	peers = /* @__PURE__ */ new Map();
	id = "";
	host = !1;
	hostId = "";
	closed = !1;
	timer;
	bytesSent = 0;
	bytesReceived = 0;
	pollingStats = !1;
	verificationState = null;
	get requireVerification() {
		return this.verificationState;
	}
	verificationSequence = 0;
	verificationRequest;
	challenge;
	rejectVerification(e, t = !0) {
		let n = this.verificationRequest;
		n && (this.verificationRequest = void 0, clearTimeout(n.timer), t && (this.verificationState = null), n.reject(Error(e)));
	}
	setRequireVerification(e) {
		return typeof e == "boolean" ? this.closed || !this.host || this.ws.readyState !== st ? Promise.reject(Error("An active room-owner connection is required.")) : this.verificationRequest ? Promise.reject(Error("A verification update is already pending.")) : new Promise((t, n) => {
			let r = ++this.verificationSequence, i = setTimeout(() => this.rejectVerification("Verification update was not confirmed."), 1e4);
			this.verificationRequest = {
				id: r,
				timer: i,
				resolve: t,
				reject: n
			};
			try {
				this.signal({
					type: "setVerification",
					required: e,
					requestId: r
				});
			} catch {
				this.rejectVerification("Verification update could not be sent.");
			}
		}) : Promise.reject(Error("Expected a boolean."));
	}
	passwordRequestId = 0;
	passwordRequest;
	rejectPasswordUpdate(e) {
		let t = this.passwordRequest;
		t && (this.passwordRequest = void 0, clearTimeout(t.timer), t.reject(Error(e)));
	}
	setPassword(e) {
		return e !== null && (typeof e != "string" || e.length > 64) ? Promise.reject(Error("Password must contain at most 64 characters.")) : this.closed || !this.host || this.ws.readyState !== st ? Promise.reject(Error("An active room-owner connection is required.")) : this.passwordRequest ? Promise.reject(Error("A password update is already pending.")) : new Promise((t, n) => {
			let r = ++this.passwordRequestId, i = setTimeout(() => this.rejectPasswordUpdate("Password update was not confirmed."), 1e4);
			this.passwordRequest = {
				id: r,
				timer: i,
				resolve: t,
				reject: n
			};
			try {
				this.signal({
					type: "setPassword",
					requestId: r,
					password: e ?? ""
				});
			} catch {
				this.rejectPasswordUpdate("Password update could not be sent.");
			}
		});
	}
	banSequence = 0;
	banRequest;
	rejectBan(e, t = !0) {
		let n = this.banRequest;
		n && (this.banRequest = void 0, clearTimeout(n.timer), n.reject(t ? new ot(e) : Error(e)));
	}
	updateBan(e, t) {
		return this.closed || !this.host || this.ws.readyState !== st ? Promise.reject(Error("An active room-owner connection is required.")) : this.banRequest ? Promise.reject(Error("A ban operation is already pending.")) : new Promise((n, r) => {
			let i = ++this.banSequence, a = setTimeout(() => this.rejectBan("Ban operation was not confirmed."), 1e4);
			this.banRequest = {
				id: i,
				resolve: n,
				reject: r,
				timer: a
			};
			try {
				this.signal({
					type: e,
					id: t,
					requestId: i
				});
			} catch {
				this.rejectBan("Ban operation could not be sent.");
			}
		});
	}
	get rtt() {
		let e = [...this.peers.values()].filter((e) => e.connected && e.lostAt === void 0).map((e) => e.rtt).filter((e) => typeof e == "number");
		return e.length ? Math.max(...e) : null;
	}
	signalQueue = Promise.resolve();
	lastHeartbeat = 0;
	controlId = 0;
	controlAssemblers = /* @__PURE__ */ new Map();
	constructor(e, t, n, r = z()) {
		this.room = e, this.credentials = t, this.hooks = n, this.runtime = r;
		let i = new URL(`/api/rooms/${encodeURIComponent(e)}/signal`, R(r.serviceOrigin));
		i.protocol = i.protocol === "https:" ? "wss:" : "ws:", this.ws = r.createWebSocket(i), this.ws.onopen = () => this.signal({
			type: "hello",
			...t
		}), this.ws.onmessage = (e) => {
			this.signalQueue = this.signalQueue.then(() => this.message(JSON.parse(e.data))).catch(() => {
				this.closed || n.status("Connection negotiation failed. Try another room or network.");
			});
		}, this.ws.onclose = (e) => {
			if (this.challenge?.abort(), this.rejectVerification("Signaling disconnected before verification confirmation."), this.rejectBan("Signaling disconnected before ban confirmation."), this.rejectPasswordUpdate("Signaling disconnected before password confirmation."), !this.closed && (!this.id || [
				1001,
				1008,
				1009
			].includes(e.code))) {
				this.close(), this.hooks.ended?.(e.reason || "Room connection ended.");
				return;
			}
			this.closed || n.status(e.reason || "Signaling disconnected. Established matches can continue; new joins are unavailable.");
		}, this.ws.onerror = () => n.status("Room service is unavailable."), this.timer = setInterval(() => {
			this.ws.readyState === st && performance.now() - this.lastHeartbeat >= 3e4 && (this.signal({ type: "heartbeat" }), this.lastHeartbeat = performance.now());
			for (let e of this.peers.values()) {
				if (!e.connected && performance.now() - e.created > 2e4) {
					n.status("Direct connection failed. This network pair may require a relay; this game does not use TURN."), this.remove(e.id);
					continue;
				}
				e.lostAt !== void 0 && (performance.now() - e.lostAt > 2e4 ? (n.status("The direct connection could not be recovered. Rejoin the room."), this.remove(e.id)) : this.host && performance.now() - e.lastRestart > 5e3 && this.restartPeer(e.id));
			}
		}, 5e3);
	}
	signal(e) {
		!this.closed && this.ws.readyState === st && this.ws.send(JSON.stringify(e));
	}
	async message(e) {
		if (this.closed) return;
		if (e.type === "verificationUpdated" && this.verificationRequest && this.verificationRequest.id === e.requestId) {
			if (e.ok !== !0 || typeof e.required != "boolean") this.rejectVerification(typeof e.error == "string" ? e.error : "Verification update failed.", e.ok !== !1);
			else {
				let t = this.verificationRequest;
				this.verificationRequest = void 0, clearTimeout(t.timer), this.verificationState = e.required, t.resolve(e.required);
			}
			return;
		}
		if (e.type === "verificationRequired") {
			if (this.closed || this.id || this.credentials.hostToken || this.challenge || e.roomId !== this.room || typeof e.siteKey != "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(e.siteKey)) return;
			if (!this.hooks.verify) {
				this.close(), this.hooks.ended?.("This client cannot complete the room verification challenge.");
				return;
			}
			let t = new AbortController();
			this.challenge = t;
			try {
				let n = await this.hooks.verify({
					siteKey: e.siteKey,
					roomId: this.room
				}, t.signal);
				if (t.signal.aborted || this.closed || this.ws.readyState !== st) return;
				if (typeof n != "string" || n.length === 0 || n.length > 2048) throw Error("Invalid verification response.");
				this.signal({
					type: "hello",
					...this.credentials,
					verificationToken: n
				});
			} catch (e) {
				this.closed || (this.close(), this.hooks.ended?.(e instanceof Error ? e.message : "Room verification failed."));
			} finally {
				this.challenge === t && (this.challenge = void 0);
			}
			return;
		}
		if (e.type === "passwordUpdated" && typeof e.locked == "boolean" && this.passwordRequest && this.passwordRequest.id === e.requestId) {
			let t = this.passwordRequest;
			this.passwordRequest = void 0, clearTimeout(t.timer), t.resolve(e.locked);
			return;
		}
		if (e.type === "banResult" && this.banRequest && this.banRequest.id === e.requestId) {
			if (e.ok !== !0) this.rejectBan(typeof e.error == "string" ? e.error : "Ban operation failed.", !1);
			else {
				let e = this.banRequest;
				this.banRequest = void 0, clearTimeout(e.timer), e.resolve();
			}
			return;
		}
		if (e.type === "ready") {
			this.id = e.id, this.host = e.role === "host", this.hostId = e.hostId, this.verificationState = typeof e.requireVerification == "boolean" ? e.requireVerification : null, this.hooks.ready(this.id, this.host);
			return;
		}
		if (e.type === "peer" && this.host) {
			let t = this.make(e.id);
			this.bind(t, t.pc.createDataChannel("control", { ordered: !0 })), this.bind(t, t.pc.createDataChannel("realtime", {
				ordered: !1,
				maxRetransmits: 0
			}));
			let n = await t.pc.createOffer();
			if (!this.current(t) || (await t.pc.setLocalDescription(n), !this.current(t))) return;
			this.signal({
				type: "signal",
				to: t.id,
				signal: {
					type: "offer",
					sdp: t.pc.localDescription.sdp
				}
			});
			return;
		}
		if (e.type === "leave") {
			this.remove(e.id);
			return;
		}
		if (e.type !== "signal") return;
		let t = this.peers.get(e.from);
		if (!t) {
			if (this.host || e.from !== this.hostId || !["offer", "candidate"].includes(e.signal.type)) return;
			t = this.make(e.from);
		}
		if (e.signal.type === "offer") {
			if (this.host) throw Error("Only the host can offer");
			if (await t.pc.setRemoteDescription({
				type: "offer",
				sdp: e.signal.sdp
			}), !this.current(t) || (await this.flushCandidates(t), !this.current(t))) return;
			let n = await t.pc.createAnswer();
			if (!this.current(t) || (await t.pc.setLocalDescription(n), !this.current(t))) return;
			this.signal({
				type: "signal",
				to: t.id,
				signal: {
					type: "answer",
					sdp: t.pc.localDescription.sdp
				}
			});
		} else if (e.signal.type === "answer") {
			if (!this.host) throw Error("Only guests can answer");
			if (await t.pc.setRemoteDescription({
				type: "answer",
				sdp: e.signal.sdp
			}), !this.current(t)) return;
			await this.flushCandidates(t), this.noteHealthy(t);
		} else if (e.signal.type === "candidate" && e.signal.candidate) {
			if (!t.pc.remoteDescription) this.queueCandidate(t, e.signal.candidate);
			else try {
				await t.pc.addIceCandidate(e.signal.candidate);
			} catch {
				this.queueCandidate(t, e.signal.candidate);
			}
		}
	}
	current(e) {
		return !this.closed && this.peers.get(e.id) === e;
	}
	queueCandidate(e, t) {
		if (this.current(e)) {
			if (e.candidates.length >= 128) throw Error("Too many pending ICE candidates");
			e.candidates.push(t);
		}
	}
	noteHealthy(e) {
		if (!this.current(e) || e.pc.connectionState !== "connected" || !["connected", "completed"].includes(e.pc.iceConnectionState)) return;
		let t = e.lostAt !== void 0;
		e.lostAt = void 0, e.restarts = 0, t && this.hooks.status("Direct connection restored.");
	}
	async flushCandidates(e) {
		let t = e.candidates.splice(0);
		for (let n of t) {
			if (!this.current(e)) return;
			try {
				await e.pc.addIceCandidate(n);
			} catch {}
		}
	}
	async restartPeer(e) {
		let t = this.peers.get(e);
		if (this.closed || !this.host || !t || t.restarting || t.restarts >= 2 || t.pc.signalingState !== "stable" || this.ws.readyState !== st) return !1;
		t.restarting = !0, t.lastRestart = performance.now(), t.lostAt ??= t.lastRestart, t.restarts++;
		try {
			let n = await t.pc.createOffer({ iceRestart: !0 });
			return this.closed || this.peers.get(e) !== t || (await t.pc.setLocalDescription(n), this.closed || this.peers.get(e) !== t) ? !1 : (this.signal({
				type: "signal",
				to: t.id,
				signal: {
					type: "offer",
					sdp: t.pc.localDescription.sdp
				}
			}), !0);
		} catch {
			return !this.closed && this.peers.get(e) === t && this.hooks.status("Direct connection recovery is still pending."), !1;
		} finally {
			t.restarting = !1;
		}
	}
	make(e) {
		let t = this.runtime.createPeerConnection({
			iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
			bundlePolicy: "max-bundle"
		}), n = {
			id: e,
			pc: t,
			connected: !1,
			created: performance.now(),
			candidates: [],
			lastRestart: 0,
			restarts: 0,
			restarting: !1
		};
		this.peers.set(e, n), t.onicecandidate = (t) => {
			this.closed || this.peers.get(e) !== n || t.candidate && this.signal({
				type: "signal",
				to: e,
				signal: {
					type: "candidate",
					candidate: t.candidate.toJSON()
				}
			});
		}, t.ondatachannel = (e) => this.bind(n, e.channel);
		let r = () => {
			this.closed || this.peers.get(e) !== n || (t.connectionState === "closed" ? (this.hooks.status("A peer disconnected."), this.remove(e)) : t.connectionState === "connected" && ["connected", "completed"].includes(t.iceConnectionState) ? this.noteHealthy(n) : (["failed", "disconnected"].includes(t.connectionState) || ["failed", "disconnected"].includes(t.iceConnectionState)) && (n.lostAt ??= performance.now(), this.hooks.status("Direct connection interrupted. Attempting recovery…")));
		};
		return t.onconnectionstatechange = r, t.oniceconnectionstatechange = r, n;
	}
	bind(e, t) {
		if (this.closed || this.peers.get(e.id) !== e || !["control", "realtime"].includes(t.label)) {
			t.close();
			return;
		}
		if (t.maxPacketLifeTime !== null || t.label === "control" && (t.ordered !== !0 || t.maxRetransmits !== null) || t.label === "realtime" && (t.ordered !== !1 || t.maxRetransmits !== 0) || (t.label === "control" ? e.control : e.fast)) {
			t.close(), this.remove(e.id);
			return;
		}
		t.binaryType = "arraybuffer", t.label === "control" ? e.control = t : e.fast = t, t.onclose = () => {
			!this.closed && this.peers.get(e.id) === e && (this.hooks.status("A peer closed its game channel."), this.remove(e.id));
		}, t.onopen = () => {
			this.closed || this.peers.get(e.id) !== e || e.control?.readyState === "open" && e.fast?.readyState === "open" && !e.connected && (e.connected = !0, this.host && (e.admissionTimer = setTimeout(() => {
				this.closed || this.peers.get(e.id) !== e || (this.hooks.status("A peer did not complete room admission."), this.remove(e.id));
			}, 1e4)), this.hooks.open(e));
		}, t.onmessage = (n) => {
			if (!(this.closed || this.peers.get(e.id) !== e)) {
				this.bytesReceived += typeof n.data == "string" ? n.data.length : n.data.byteLength;
				try {
					if (t.label === "control") {
						let t = typeof n.data != "string" || new TextEncoder().encode(n.data).length > 4096;
						if (this.host && t && !this.hooks.allowStadiumUpload?.(e)) throw Error("Guest control size or permission");
						if (typeof n.data != "string" && !(n.data instanceof ArrayBuffer)) throw Error("Invalid control type");
						let r = this.controlAssemblers.get(e.id);
						r || (r = new at(), this.controlAssemblers.set(e.id, r));
						let i = r.push(n.data);
						if (i !== void 0) {
							if (this.host && t && (!i || typeof i != "object" || i.type !== "action" || i.action !== "customStadium")) throw Error("Invalid bulk action");
							this.hooks.control(e, i);
						}
					} else if (n.data instanceof ArrayBuffer && n.data.byteLength <= 1200) this.hooks.fast(e, n.data);
					else throw Error();
				} catch {
					this.hooks.status("Invalid peer message rejected."), this.remove(e.id);
				}
			}
		};
	}
	admit(e) {
		clearTimeout(e.admissionTimer), e.admissionTimer = void 0;
	}
	control(e, t) {
		if (e.control?.readyState !== "open") return;
		let n = it(t, this.controlId++), r = n.reduce((e, t) => e + (typeof t == "string" ? new TextEncoder().encode(t).length : t.byteLength), 0);
		if (e.control.bufferedAmount + r > 1048576) {
			this.remove(e.id);
			return;
		}
		for (let t of n) e.control.send(t);
		this.bytesSent += r;
	}
	fast(e, t) {
		e.fast?.readyState === "open" && e.fast.bufferedAmount < 32768 && (e.fast.send(t), this.bytesSent += t.byteLength);
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
						!this.closed && this.peers.get(e.id) === e && (e.rtt = et(t.values()));
					} catch {
						e.rtt = null;
					}
				}));
			} finally {
				this.pollingStats = !1;
			}
		}
	}
	remove(e) {
		let t = this.peers.get(e);
		t && (clearTimeout(t.admissionTimer), this.peers.delete(e), this.controlAssemblers.delete(e), t.pc.close(), this.host ? this.signal({
			type: "evict",
			id: e
		}) : this.close(), this.hooks.leave(e), this.host || this.hooks.ended?.("The host connection ended."));
	}
	close() {
		this.challenge?.abort(), this.rejectVerification("Room closed before verification confirmation."), this.verificationState = null, this.rejectBan("Room closed before ban confirmation."), this.rejectPasswordUpdate("Room closed before password confirmation."), this.closed = !0, clearInterval(this.timer), this.ws.close(1e3, "Left room");
		for (let e of this.peers.values()) clearTimeout(e.admissionTimer), e.pc.close();
		this.peers.clear(), this.controlAssemblers.clear();
	}
};
function lt(e, t) {
	return e !== t && e - t >>> 0 < 2147483648;
}
function ut(e) {
	if (e.byteLength !== 14) throw Error("Input length");
	let t = new DataView(e);
	if (t.getUint8(0) !== 1 || t.getUint8(1) !== 5 || t.getUint8(6) > 31 || t.getUint8(7)) throw Error("Input format");
	return {
		seq: t.getUint32(2, !0),
		keys: t.getUint8(6),
		time: t.getUint32(8, !0),
		epoch: t.getUint16(12, !0)
	};
}
function dt(e, t, n = 0) {
	let r = [];
	for (let t = 0; t < e.discs.length / 18; t++) {
		let n = t * 18, i = e.discs, a = i[n + 5] > 0 || i[n + 2] !== 0 || i[n + 3] !== 0 || i[n + 8] !== 0 || i[n + 9] !== 0 || i[n] !== i[n + 16] || i[n + 1] !== i[n + 17];
		(i[n + 12] > 0 ? i[n + 13] > 0 : a) && r.push(t);
	}
	let i = [
		"lobby",
		"playing",
		"goal",
		"finished"
	], a = /* @__PURE__ */ new ArrayBuffer(36 + r.length * 24), o = new DataView(a);
	o.setUint32(0, e.tick, !0), o.setUint32(4, e.elapsed, !0), o.setUint16(8, e.red, !0), o.setUint16(10, e.blue, !0), o.setUint8(12, i.indexOf(e.phase)), o.setUint8(13, +e.paused), o.setUint8(14, e.kickoff), o.setUint8(15, +e.kickoffActive), o.setUint16(16, e.countdown, !0), o.setUint16(18, e.scoreLimit, !0), o.setUint16(20, e.timeLimit, !0), o.setUint16(22, e.discs.length / 18, !0), o.setUint32(24, t, !0), o.setUint16(28, r.length, !0), o.setUint16(30, e.resumeTicks, !0), o.setUint32(32, e.kickRate, !0), r.forEach((t, n) => {
		let r = t * 18, i = 36 + n * 24;
		o.setUint16(i, t, !0), o.setUint8(i + 2, e.discs[r + 13]), o.setUint8(i + 3, e.discs[r + 14] | (e.discs[r + 12] > 0 ? (e.discs[r + 11] & 24) << 2 : 0));
		for (let t = 0; t < 4; t++) o.setFloat32(i + 4 + t * 4, e.discs[r + t], !0);
		o.setUint16(i + 20, e.discs[r + 15], !0), e.discs[r + 12] > 0 && o.setUint16(i + 22, e.discs[r + 17] + 255, !0);
	});
	let s = new Uint8Array(a), c = [], l = Math.ceil(s.length / 1188);
	for (let t = 0; t < l; t++) {
		let r = s.subarray(t * 1188, (t + 1) * 1188), i = new ArrayBuffer(12 + r.length), a = new DataView(i);
		a.setUint8(0, 2), a.setUint8(1, 5), a.setUint32(2, e.tick, !0), a.setUint8(6, t), a.setUint8(7, l), a.setUint16(8, n, !0), a.setUint16(10, r.length, !0), new Uint8Array(i, 12).set(r), c.push(i);
	}
	return c;
}
var ft = Object.freeze({ ...C }), pt = class e {
	runtime;
	engine;
	network;
	roomId = "";
	roomLink = "";
	roomName = "";
	epoch = 0;
	stadiumSelection = 0;
	players = [];
	nextPlayerId = 0;
	bans = /* @__PURE__ */ new Map();
	loop;
	linkNotification;
	last = performance.now();
	accumulator = 0;
	recorder;
	closed = !1;
	closeController = new AbortController();
	signal = this.closeController.signal;
	finishingRecording = !1;
	lastRecording = null;
	onRecordingComplete;
	locked = !1;
	teamStyles = [null, null];
	inputs = /* @__PURE__ */ new Map();
	traffic = new U();
	onRoomLink;
	onPlayerJoin;
	onPlayerTeamChange;
	onPlayerAdminChange;
	onGameStart;
	onGameStop;
	onTeamVictory;
	onGameVictory;
	onGamePauseChange;
	onGamePause;
	onGameUnpause;
	onPlayerLeave;
	onPlayerKicked;
	onPlayerActivity;
	onPlayerChat;
	onPlayerBallKick;
	onTeamGoal;
	onPositionsReset;
	onStadiumChange;
	onTeamsLockChange;
	onKickRateLimitSet;
	onGameTick;
	onError;
	report(e) {
		try {
			let t = this.onError?.(e);
			t instanceof Promise && t.catch(() => {});
		} catch {}
	}
	invoke(e, t, ...n) {
		if (!(this.closed && e !== "onRecordingComplete")) try {
			let r = t?.apply(this, n);
			return r instanceof Promise && r.catch((t) => this.report(`${e}: ${String(t)}`)), r;
		} catch (t) {
			this.report(`${e}: ${String(t)}`);
			return;
		}
	}
	constructor(e, t) {
		this.runtime = t, this.engine = e;
	}
	static async create(t, n = te(), r) {
		let i = R(n.network.serviceOrigin);
		if (t = d(t), t.noPlayer !== void 0 && typeof t.noPlayer != "boolean") throw Error("Invalid noPlayer setting");
		let a = t.noPlayer === !1, o = t.playerName ?? "Host";
		if (a && (typeof o != "string" || !o.trim() || o.length > 24)) throw Error("Invalid host player name");
		let s = l(r), c;
		try {
			s.signal.throwIfAborted();
			let r = await s.run(n.loadEngine(s.signal));
			r.load(t.stadium ?? F()), c = new e(r, n);
			let l = c, u = await s.run(n.request(new URL("/api/rooms", i), {
				signal: s.signal,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: t.roomName,
					maxPlayers: t.maxPlayers ?? 16,
					password: t.password ?? "",
					private: t.public === !1,
					hostPlayer: a
				})
			}));
			if (!u.ok) throw Error(`Room creation failed (${u.status})`);
			let d = await s.run(u.json());
			l.roomId = d.id, l.roomName = t.roomName, l.roomLink = `${i}${p(d.id)}`;
			let f;
			try {
				await s.run(new Promise((e, t) => {
					f = setTimeout(() => t(Error("Signaling timed out")), 12e3), l.network = new ct(d.id, { hostToken: d.hostToken }, {
						ready: (n, r) => {
							if (!r) {
								t(Error("Host authority was not granted"));
								return;
							}
							a && (l.players.push({
								id: l.nextPlayerId++,
								slot: 0,
								peerId: n,
								name: o.trim(),
								team: 0,
								admin: !0
							}), l.engine.joinPlayer(0)), clearTimeout(f), e();
						},
						allowStadiumUpload: (e) => !!l.players.find((t) => t.peerId === e.id)?.admin && ["lobby", "finished"].includes(l.engine.phase) && l.traffic.allow(e.id, "message"),
						open: () => {},
						control: (e, t) => l.control(e, t),
						fast: (e, t) => l.fast(e, t),
						leave: (e) => l.leave(e),
						status: (e) => l.report(e),
						ended: (e) => {
							clearTimeout(f), t(Error(e)), l.close(), l.report(e);
						}
					}, n.network);
				}));
			} catch (e) {
				throw l.close(), e;
			} finally {
				clearTimeout(f);
			}
			if (l.closed) throw Error("Room closed during startup");
			l.last = performance.now(), l.loop = setInterval(() => l.advance(), 1e3 / 60);
			let m = l.roomLink;
			return l.linkNotification = setTimeout(() => {
				l.linkNotification = void 0, l.invoke("onRoomLink", l.onRoomLink, m);
			}, 0), c;
		} catch (e) {
			throw c?.close(), e;
		} finally {
			s.dispose();
		}
	}
	advance() {
		if (this.closed) return;
		let e = performance.now(), t = e - this.last;
		this.last = e, t > 500 && this.engine.phase === "playing" && !this.engine.paused && (this.pauseGame(!0), this.report("Host scheduler stalled; match paused.")), this.accumulator += Math.max(0, Math.min(t, 500));
		let n = 0;
		try {
			for (; !this.closed && this.accumulator >= 1e3 / 60 && n++ < 32;) {
				for (let t of this.players) {
					let n = this.inputs.get(t.peerId);
					n && e - n.received > 250 && this.engine.data[this.engine.index(t.slot) * 18 + 14] && this.command("input", t.slot, 0);
				}
				if (this.recorder && !this.recorder.canRecord(this.engine) && this.finishRecording("Recording limit reached"), this.closed || (this.engine.phase !== "lobby" && !this.engine.paused && !this.engine.resumeTicks && this.invoke("onGameTick", this.onGameTick), this.closed)) break;
				let t = this.engine.red, n = this.engine.blue, r = this.engine.phase;
				this.engine.step(), this.recorder?.step(this.engine), this.engine.phase !== r && this.state();
				let i = r === "goal" && this.engine.phase === "playing";
				r === "finished" && this.engine.phase === "lobby" && this.invoke("onGameStop", this.onGameStop, null);
				let a = this.engine.ballKicks.map((e) => {
					let t = this.players.find((t) => t.slot === e);
					return t ? this.playerCopy(t) : null;
				}).filter((e) => !!e), o = r !== "finished" && this.engine.phase === "finished" ? this.getScores() : null;
				o && (this.invoke("onTeamVictory", this.onTeamVictory, { ...o }), this.invoke("onGameVictory", this.onGameVictory, { ...o }));
				for (let e of a) this.invoke("onPlayerBallKick", this.onPlayerBallKick, e);
				if (this.engine.red > t && this.invoke("onTeamGoal", this.onTeamGoal, 1), this.engine.blue > n && this.invoke("onTeamGoal", this.onTeamGoal, 2), i && this.invoke("onPositionsReset", this.onPositionsReset), this.closed) break;
				if (this.engine.tick % 2 == 0) {
					let e = this.engine.snapshot();
					for (let t of this.network.peers.values()) for (let n of dt(e, this.inputs.get(t.id)?.seq ?? 0, this.epoch)) this.network.fast(t, n);
				}
				this.accumulator -= 1e3 / 60;
			}
		} catch (e) {
			this.closed || (this.engine.setPaused(!0), this.report(String(e)));
		}
	}
	allowed(e) {
		return this.traffic.allow(e.id, "message") ? !0 : (this.network.remove(e.id), !1);
	}
	control(e, t) {
		if (!this.allowed(e) || !t || typeof t != "object") return;
		let n = t, r = this.players.find((t) => t.peerId === e.id);
		if (n.type === "join" && !r) {
			if (n.version !== 1 || n.engine !== ee || typeof n.name != "string" || !n.name.trim() || n.name.length > 24) {
				this.network.remove(e.id);
				return;
			}
			let t = Array.from({ length: 32 }, (e, t) => t).find((e) => !this.players.some((t) => t.slot === e));
			if (t === void 0) {
				this.network.remove(e.id);
				return;
			}
			r = {
				id: this.nextPlayerId++,
				slot: t,
				peerId: e.id,
				name: n.name.trim(),
				team: 0,
				admin: !1
			}, this.players.push(r), this.network.admit(e), this.recorder?.player(this.engine.tick, r.slot, r.name), this.command("join", t, 0), this.network.control(e, {
				type: "welcome",
				epoch: this.epoch,
				roomName: this.roomName,
				engine: ee,
				slot: t,
				stadium: this.engine.source,
				state: this.engine.snapshot(),
				players: this.roster(),
				teamStyles: this.teamStyles,
				locked: this.locked
			}), this.sync(), this.invoke("onPlayerJoin", this.onPlayerJoin, this.playerCopy(r));
			return;
		}
		if (r && n.type === "action") {
			if (n.action === "chat" && typeof n.text == "string" && n.text.length <= 200) {
				if (!n.text.trim() || !this.traffic.allow(e.id, "chat") || (this.invoke("onPlayerActivity", this.onPlayerActivity, this.playerCopy(r)), this.closed || !this.players.includes(r))) return;
				this.invoke("onPlayerChat", this.onPlayerChat, this.playerCopy(r), n.text) !== !1 && this.network.broadcast({
					type: "chat",
					name: r.name,
					text: n.text
				});
			}
			if (n.action === "chat" || this.traffic.allow(e.id, "action")) {
				if (n.action === "avatar" && v(n.avatar)) {
					r.avatar = n.avatar, this.recorder?.player(this.engine.tick, r.slot, r.name, r.avatarOverride ?? r.avatar), this.sync();
					return;
				}
				if (n.action === "team" && (!this.locked || r.admin) && [
					0,
					1,
					2
				].includes(Number(n.team))) {
					let e = n.slot === void 0 ? r : this.players.find((e) => e.slot === n.slot);
					e && (e === r || r.admin) && this.changeTeam(e.id, Number(n.team), r);
				}
				if (n.action === "defaultStadium" || n.action === "customStadium") {
					let t = (t) => {
						!this.closed && this.players.includes(r) && this.network.control(e, {
							type: "stadiumResult",
							text: t
						});
					};
					if (!r.admin || !["lobby", "finished"].includes(this.engine.phase)) {
						t("Stadium change rejected: admin permission and a stopped match are required.");
						return;
					}
					if (n.action === "defaultStadium" ? typeof n.name != "string" : typeof n.source != "string") return;
					let i = ++this.stadiumSelection;
					(n.action === "defaultStadium" ? this.runtime.loadStadium(n.name) : Promise.resolve(n.source)).then((e) => {
						if (!this.closed && this.players.includes(r)) {
							if (i !== this.stadiumSelection || !r.admin || !["lobby", "finished"].includes(this.engine.phase)) {
								t("Stadium change cancelled: room state or permissions changed.");
								return;
							}
							this.changeStadium(e, this.playerCopy(r)), t("Stadium applied.");
						}
					}).catch(() => t("Stadium could not be loaded. Please try again."));
					return;
				}
				if (r.admin) {
					if (n.action === "ban" || n.action === "clearBans") {
						let t = this.players.find((e) => e.slot === n.slot);
						if (n.action === "ban" && (!t || t === r || t.peerId === this.network.hostId)) return;
						let i = (t) => {
							!this.closed && this.network.peers.has(e.id) && this.network.control(e, {
								type: "moderationResult",
								text: t
							});
						};
						if (n.action === "clearBans") {
							i("Only the room owner can clear bans.");
							return;
						}
						this.banPlayer(t.id, "Removed by admin", this.playerCopy(r)).then(() => i("Player banned.")).catch((e) => i(e instanceof Error ? e.message : "Moderation failed."));
						return;
					}
					if (n.action === "teamColors" && (n.team === 1 || n.team === 2)) {
						let e = n.palette;
						this.changeTeamColors(n.team, e === null ? null : m(e.angle, e.textColor, e.colors));
					}
					if (n.action === "kickRate" && Number.isInteger(n.value) && Number(n.value) >= 0 && Number(n.value) <= 6619135) {
						let e = Number(n.value);
						this.changeKickRateLimit(e & 255, e >>> 8 & 255, e >>> 16, this.playerCopy(r));
					}
					if (n.action === "start" && this.beginGame(r), n.action === "stop" && this.endGame(r), n.action === "pause" && (n.paused === void 0 || typeof n.paused == "boolean") && this.changePause(n.paused === void 0 ? !this.engine.paused : n.paused, this.playerCopy(r)), n.action === "settings" && ["lobby", "finished"].includes(this.engine.phase)) {
						let e = Number(n.score), t = Number(n.minutes);
						if (Number.isInteger(e) && e >= 0 && e <= 99 && Number.isInteger(t) && t >= 0 && t <= 99 && (n.kickRate === void 0 || Number.isInteger(n.kickRate) && Number(n.kickRate) >= 0 && Number(n.kickRate) <= 6619135)) {
							if (this.setScoreLimit(e), this.setTimeLimit(t), this.changeTeamsLock(!!n.locked, this.playerCopy(r)), this.closed) return;
							if (n.kickRate !== void 0 && n.kickRate !== this.engine.kickRate) {
								let e = Number(n.kickRate);
								this.changeKickRateLimit(e & 255, e >>> 8 & 255, e >>> 16, this.playerCopy(r));
							}
						}
					}
					if (n.action === "kick" && typeof n.slot == "number" && n.slot !== r.slot) {
						let e = this.players.find((e) => e.slot === n.slot);
						e && this.removePlayer(e.id, "Removed by host", this.playerCopy(r));
					}
				}
			}
		}
	}
	fast(e, t) {
		if (!this.allowed(e)) return;
		let n = this.players.find((t) => t.peerId === e.id);
		if (!n) return;
		let r = ut(t);
		if (r.epoch !== this.epoch) return;
		let i = this.inputs.get(e.id);
		(!i || lt(r.seq, i.seq)) && (this.inputs.set(e.id, {
			seq: r.seq,
			received: performance.now(),
			keys: r.keys
		}), this.command("input", n.slot, r.keys), r.keys !== (i?.keys ?? 0) && this.invoke("onPlayerActivity", this.onPlayerActivity, this.playerCopy(n)));
	}
	command(e, t = 0, n = 0) {
		if (this.closed) throw Error("Room is closed");
		let r = {
			tick: this.engine.tick,
			kind: e,
			slot: t,
			value: n
		};
		if (this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(r)) && this.finishRecording("Recording limit reached"), this.closed) throw Error("Room is closed");
		Xe(this.engine, r);
	}
	roster() {
		return this.players.map((e) => ({
			avatar: e.avatarOverride ?? e.avatar ?? null,
			id: e.peerId,
			slot: e.slot,
			name: e.name,
			team: e.team,
			admin: e.admin
		}));
	}
	sync() {
		this.network.broadcast({
			type: "lobby",
			players: this.roster(),
			teamStyles: this.teamStyles,
			locked: this.locked,
			scoreLimit: this.engine.scoreLimit,
			timeLimit: this.engine.timeLimit
		});
	}
	state() {
		this.network.broadcast({
			type: "state",
			epoch: this.epoch,
			state: this.engine.snapshot()
		});
	}
	leave(e) {
		this.traffic.delete(e);
		let t = this.players.find((t) => t.peerId === e);
		t && (this.recorder?.player(this.engine.tick, t.slot, null), this.command("team", t.slot, 0), this.players = this.players.filter((t) => t.peerId !== e), this.inputs.delete(e), this.sync(), this.invoke("onPlayerLeave", this.onPlayerLeave, this.playerCopy(t)));
	}
	playerCopy(e) {
		let t = this.engine.index(e.slot) * 18, n = !this.closed && this.engine.phase !== "lobby" && this.engine.data[t + 13] > 0, { slot: r, avatarOverride: i, ...a } = e;
		return {
			...a,
			avatar: e.avatarOverride ?? e.avatar ?? null,
			position: n ? {
				x: this.engine.data[t],
				y: this.engine.data[t + 1]
			} : null
		};
	}
	getPlayerList() {
		return this.players.map((e) => this.playerCopy(e));
	}
	getPlayer(e) {
		let t = this.players.find((t) => t.id === e);
		return t ? this.playerCopy(t) : null;
	}
	setTeamColors(e, t, n, r) {
		this.changeTeamColors(e, m(t, n, r));
	}
	changeTeamColors(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (e !== 1 && e !== 2) throw Error("Invalid team");
		JSON.stringify(this.teamStyles[e - 1]) !== JSON.stringify(t) && (this.teamStyles[e - 1] = t, this.recorder?.style(this.engine.tick, this.teamStyles), this.sync());
	}
	reorderPlayers(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (!Array.isArray(e) || e.length > 32 || e.some((e) => !Number.isSafeInteger(e) || e < 0) || typeof t != "boolean") throw Error("Invalid player order");
		let n = new Set(e), r = [...n].flatMap((e) => {
			let t = this.players.find((t) => t.id === e);
			return t ? [t] : [];
		}), i = this.players.filter((e) => !n.has(e.id)), a = t ? [...r, ...i] : [...i, ...r];
		a.every((e, t) => e === this.players[t]) || (this.players = a, this.recorder?.order(this.engine.tick, a.map((e) => e.slot)), this.sync());
	}
	setPlayerAvatar(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (!v(t)) throw Error("Avatar must be null or at most two visible characters.");
		let n = this.players.find((t) => t.id === e);
		n && (n.avatarOverride = t, this.recorder?.player(this.engine.tick, n.slot, n.name, t ?? n.avatar), this.sync());
	}
	setPlayerTeam(e, t) {
		this.changeTeam(e, t, null);
	}
	changeTeam(e, t, n) {
		if (this.closed) throw Error("Room is closed");
		if (![
			0,
			1,
			2
		].includes(t)) throw Error("Invalid team");
		let r = this.players.find((t) => t.id === e);
		r && r.team !== t && (r.team = t, this.command("team", r.slot, t), this.sync(), this.invoke("onPlayerTeamChange", this.onPlayerTeamChange, this.playerCopy(r), n ? this.playerCopy(n) : null));
	}
	setPlayerAdmin(e, t) {
		if (this.closed) throw Error("Room is closed");
		let n = this.players.find((t) => t.id === e);
		n && n.admin !== !!t && (n.admin = !!t, this.sync(), this.invoke("onPlayerAdminChange", this.onPlayerAdminChange, this.playerCopy(n), null));
	}
	setTeamsLock(e) {
		this.changeTeamsLock(e, null);
	}
	changeTeamsLock(e, t) {
		if (this.closed) throw Error("Room is closed");
		this.locked !== !!e && (this.locked = !!e, this.sync(), this.invoke("onTeamsLockChange", this.onTeamsLockChange, this.locked, t));
	}
	kickPlayer(e, t = "Removed by host", n = !1) {
		if (this.closed) throw Error("Room is closed");
		if (typeof n != "boolean") throw Error("Invalid ban flag");
		if (n) return this.banPlayer(e, t);
		this.removePlayer(e, t, null);
	}
	async banPlayer(e, t, n = null) {
		if (typeof t != "string") throw Error("Invalid kick reason");
		let r = this.players.find((t) => t.id === e);
		if (!r || r.peerId === this.network.hostId) return;
		let i = this.playerCopy(r), a = t.slice(0, 100);
		if (this.bans.size >= 256 && !this.bans.has(e)) throw Error("Clear existing bans before adding more.");
		try {
			await this.network.updateBan("ban", r.peerId);
		} catch (t) {
			throw t instanceof ot && this.bans.set(e, r.peerId), t;
		}
		this.bans.set(e, r.peerId), this.network.remove(r.peerId), this.invoke("onPlayerKicked", this.onPlayerKicked, i, a, !0, n);
	}
	async clearBan(e) {
		if (this.closed) throw Error("Room is closed");
		let t = this.bans.get(e);
		t && (await this.network.updateBan("clearBan", t), this.bans.delete(e));
	}
	async clearBans() {
		if (this.closed) throw Error("Room is closed");
		await this.network.updateBan("clearBans"), this.bans.clear();
	}
	removePlayer(e, t, n) {
		if (this.closed) throw Error("Room is closed");
		if (typeof t != "string") throw Error("Invalid kick reason");
		let r = this.players.find((t) => t.id === e);
		if (r && r.peerId !== this.network.hostId) {
			let e = this.playerCopy(r), i = t.slice(0, 100), a = this.network.peers.get(r.peerId);
			a && this.network.control(a, {
				type: "kicked",
				reason: i
			}), this.network.remove(r.peerId), this.players.includes(r) || this.invoke("onPlayerKicked", this.onPlayerKicked, e, i, !1, n);
		}
	}
	sendChat(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (typeof e != "string" || e.length > 200) throw Error("Chat must contain at most 200 characters");
		if (t != null && (!Number.isSafeInteger(t) || t < 0)) throw Error("Invalid chat target");
		let n = this.players.find((e) => e.peerId === this.network.hostId);
		if (!n) throw Error("sendChat requires a host player; use sendAnnouncement");
		if (!e.trim()) return;
		let r = {
			type: "chat",
			name: n.name,
			text: e
		};
		if (t == null) this.network.broadcast(r);
		else {
			let e = this.players.find((e) => e.id === t), n = e && this.network.peers.get(e.peerId);
			n && this.network.control(n, r);
		}
	}
	sendAnnouncement(e, t, n, r, i) {
		if (this.closed) throw Error("Room is closed");
		let a = _(e, n, r, i);
		if (t != null && (!Number.isSafeInteger(t) || t < 0)) throw Error("Invalid announcement target");
		if (t == null) this.network.broadcast(a);
		else {
			let e = this.players.find((e) => e.id === t), n = e && this.network.peers.get(e.peerId);
			n && this.network.control(n, a);
		}
	}
	startGame() {
		this.beginGame(null);
	}
	beginGame(e) {
		if (this.closed) throw Error("Room is closed");
		let t = this.engine.phase;
		(t === "lobby" || t === "finished") && (this.command("start"), this.stadiumSelection++, this.state(), t !== this.engine.phase && this.engine.phase === "playing" && this.invoke("onGameStart", this.onGameStart, e ? this.playerCopy(e) : null));
	}
	stopGame() {
		this.endGame(null);
	}
	endGame(e) {
		if (this.closed) throw Error("Room is closed");
		let t = this.engine.phase !== "lobby";
		(t || this.engine.paused) && (this.command("stop"), this.state(), t && this.invoke("onGameStop", this.onGameStop, e ? this.playerCopy(e) : null));
	}
	pauseGame(e) {
		this.changePause(e, null);
	}
	changePause(e, t) {
		if (this.closed) throw Error("Room is closed");
		this.engine.phase !== "lobby" && (e = !!e, this.engine.paused !== e && (this.command("pause", 0, +e), this.state(), e ? this.invoke("onGamePause", this.onGamePause, t) : this.invoke("onGameUnpause", this.onGameUnpause, t), this.invoke("onGamePauseChange", this.onGamePauseChange, e)));
	}
	setKickRateLimit(e = 2, t = 0, n = 0) {
		this.changeKickRateLimit(e, t, n, null);
	}
	changeKickRateLimit(e, t, n, r) {
		if (this.closed) throw Error("Room is closed");
		let i = L(e, t, n);
		i !== this.engine.kickRate && (this.command("kickRate", 0, i), this.state(), this.invoke("onKickRateLimitSet", this.onKickRateLimitSet, i & 255, i >>> 8 & 255, i >>> 16, r));
	}
	async setPassword(e) {
		if (this.closed) throw Error("Room is closed");
		await this.network.setPassword(e);
	}
	get requireVerification() {
		return this.network.requireVerification;
	}
	async setRequireVerification(e) {
		if (this.closed) throw Error("Room is closed");
		await this.network.setRequireVerification(e);
	}
	async setRequireRecaptcha(e) {
		await this.setRequireVerification(e);
	}
	setScoreLimit(e) {
		if (this.closed) throw Error("Room is closed");
		if (["lobby", "finished"].includes(this.engine.phase)) {
			if (!Number.isInteger(e) || e < 0 || e > 99) throw Error("Invalid limit");
			e !== this.engine.scoreLimit && (this.command("scoreLimit", 0, e), this.sync());
		}
	}
	setTimeLimit(e) {
		if (this.closed) throw Error("Room is closed");
		if (["lobby", "finished"].includes(this.engine.phase)) {
			if (!Number.isInteger(e) || e < 0 || e > 99) throw Error("Invalid time limit");
			e * 60 !== this.engine.timeLimit && (this.command("timeLimit", 0, e * 60), this.sync());
		}
	}
	async setDefaultStadium(e) {
		if (this.closed) throw Error("Room is closed");
		if (!["lobby", "finished"].includes(this.engine.phase)) return;
		let t = ++this.stadiumSelection, n = await this.runtime.loadStadium(e);
		if (this.closed) throw Error("Room is closed");
		if (t !== this.stadiumSelection) throw Error("Stadium selection superseded");
		this.setCustomStadium(n);
	}
	setCustomStadium(e) {
		this.changeStadium(e, null);
	}
	changeStadium(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (!["lobby", "finished"].includes(this.engine.phase)) return;
		P(e);
		let n = ++this.stadiumSelection;
		if (this.recorder && this.finishRecording("Stadium changed"), this.closed) throw Error("Room is closed");
		if (["lobby", "finished"].includes(this.engine.phase)) {
			if (n !== this.stadiumSelection) throw Error("Stadium selection superseded");
			this.engine.load(e);
			for (let e of this.players) this.engine.setTeam(e.slot, e.team);
			this.epoch = this.epoch + 1 & 65535, this.inputs.clear(), this.network.broadcast({
				type: "stadium",
				epoch: this.epoch,
				source: e,
				state: this.engine.snapshot()
			}), this.invoke("onStadiumChange", this.onStadiumChange, this.engine.stadium.name, t);
		}
	}
	getScores() {
		let e = this.engine;
		return this.closed || e.phase === "lobby" ? null : {
			red: e.red,
			blue: e.blue,
			time: e.elapsed / 60,
			scoreLimit: e.scoreLimit,
			timeLimit: e.timeLimit
		};
	}
	getBallPosition() {
		return this.closed || this.engine.phase === "lobby" ? null : {
			x: this.engine.data[0],
			y: this.engine.data[1]
		};
	}
	readDisc(e) {
		let t = this.engine.data, n = e * 18;
		return {
			x: t[n],
			y: t[n + 1],
			xspeed: t[n + 2],
			yspeed: t[n + 3],
			radius: t[n + 4],
			invMass: t[n + 5],
			damping: t[n + 6],
			bCoeff: t[n + 7],
			xgravity: t[n + 8],
			ygravity: t[n + 9],
			cGroup: t[n + 10],
			cMask: t[n + 11],
			color: this.engine.colors[e]
		};
	}
	get CollisionFlags() {
		return ft;
	}
	getDiscCount() {
		return this.closed || this.engine.phase === "lobby" ? 0 : this.engine.stadium.discs.length + this.players.filter((e) => e.team !== 0).length;
	}
	getDiscProperties(e) {
		if (!Number.isInteger(e) || e < 0 || e >= this.getDiscCount()) return null;
		let t = this.engine.stadium.discs.length;
		if (e < t) return this.readDisc(e);
		let n = this.players.filter((e) => e.team !== 0)[e - t];
		return this.readDisc(this.engine.index(n.slot));
	}
	setDiscProperties(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (!Number.isInteger(e) || e < 0 || e >= this.getDiscCount()) return;
		let n = this.engine.stadium.discs.length, r = e < n ? e : this.engine.index(this.players.filter((e) => e.team !== 0)[e - n].slot);
		this.changeDisc(r, t);
	}
	setPlayerDiscProperties(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (this.engine.phase === "lobby") return;
		let n = this.players.find((t) => t.id === e && t.team !== 0);
		n && this.changeDisc(this.engine.index(n.slot), t);
	}
	changeDisc(e, t) {
		let n = b(t), r = this.readDisc(e);
		if (Object.entries(n).every(([e, t]) => r[e] === t)) return;
		let i = {
			tick: this.engine.tick,
			kind: "disc",
			slot: e,
			value: 0,
			properties: n
		};
		if (this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(i)) && this.finishRecording("Recording limit reached"), this.closed) throw Error("Room is closed");
		Xe(this.engine, i), this.state();
	}
	getPlayerDiscProperties(e) {
		if (this.closed || this.engine.phase === "lobby") return null;
		let t = this.players.find((t) => t.id === e && t.team !== 0);
		return t ? this.readDisc(this.engine.index(t.slot)) : null;
	}
	getState() {
		return this.engine.snapshot();
	}
	startRecording() {
		if (this.closed) throw Error("Room is closed");
		if (this.finishingRecording) throw Error("Recording completion is in progress");
		if (this.recorder) throw Error("Recording is already active");
		this.recorder = new Ze(this.engine, this.players.map((e) => ({
			slot: e.slot,
			name: e.name,
			avatar: e.avatarOverride ?? e.avatar
		})), this.teamStyles);
	}
	finishRecording(e) {
		this.finishingRecording = !0;
		try {
			let t = this.stopRecording();
			t && (this.lastRecording = t, this.invoke("onRecordingComplete", this.onRecordingComplete, t, e));
		} finally {
			this.finishingRecording = !1;
		}
	}
	stopRecording() {
		let e = this.recorder?.finish(this.engine) ?? null;
		return this.recorder = void 0, e;
	}
	close() {
		if (!this.closed) {
			this.closed = !0, this.closeController.abort();
			try {
				this.recorder && this.finishRecording("Room closed");
			} finally {
				clearInterval(this.loop), clearTimeout(this.linkNotification), this.linkNotification = void 0, this.network?.close(), this.players = [], this.traffic.clear();
			}
		}
	}
};
function mt(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	let t = { ...e }, n = t.maxPlayers ?? 12;
	if (typeof n != "number" || !Number.isFinite(n) || !Number.isInteger(n)) throw Error("maxPlayers must be a finite integer");
	return d({
		...t,
		roomName: t.roomName ?? "Headless Room",
		playerName: t.playerName ?? "Host",
		noPlayer: t.noPlayer ?? !1,
		public: t.public ?? !1,
		maxPlayers: Math.max(2, Math.min(30, n)),
		password: t.password ?? ""
	});
}
var ht = class {
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
}, gt = [
	"sendChat",
	"sendAnnouncement",
	"setPlayerAdmin",
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
	"setRequireRecaptcha",
	"reorderPlayers",
	"setKickRateLimit",
	"setPlayerAvatar",
	"setDiscProperties",
	"setPlayerDiscProperties"
];
function _t(e, t) {
	let n = Object.create(null);
	t && Object.defineProperty(n, "closed", {
		enumerable: !0,
		value: t
	});
	let r = new ht((t) => {
		let n = e.onError?.(String(t));
		n instanceof Promise && n.catch(() => {});
	});
	e.signal.addEventListener("abort", () => r.close(), { once: !0 }), e.signal.aborted && r.close();
	for (let t of gt) Object.defineProperty(n, t, {
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
	for (let t of [
		"onRoomLink",
		"onPlayerJoin",
		"onPlayerLeave",
		"onPlayerChat",
		"onPlayerTeamChange",
		"onPlayerAdminChange",
		"onPlayerKicked",
		"onPlayerActivity",
		"onPlayerBallKick",
		"onTeamGoal",
		"onTeamVictory",
		"onGameVictory",
		"onGameStart",
		"onGameStop",
		"onGameTick",
		"onGamePause",
		"onGameUnpause",
		"onGamePauseChange",
		"onPositionsReset",
		"onStadiumChange",
		"onTeamsLockChange",
		"onKickRateLimitSet",
		"onRecordingComplete",
		"onError"
	]) {
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
function vt(e) {
	return Qe(e);
}
function yt(e) {
	if (typeof e != "string") throw TypeError("Stadium source must be a string");
	let t = P(e);
	return Object.freeze({
		name: t.name,
		canBeStored: t.canBeStored,
		warnings: Object.freeze([...t.warnings])
	});
}
async function bt(e = {}, t = {}) {
	return _t(await pt.create(mt(e), void 0, t.signal));
}
export { bt as createRoom, vt as readReplay, yt as validateStadium };
