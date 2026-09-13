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
	return e === 0 || e === 1 || e === 2;
}
function u(e, t) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t;
}
function d(e) {
	let { score: t, minutes: n, locked: r, kickRate: i } = e;
	return !u(t, 99) || !u(n, 99) || typeof r != "boolean" || i !== void 0 && !u(i, 6619135) ? null : {
		score: t,
		minutes: n,
		locked: r,
		kickRate: i
	};
}
function f(e, t, n) {
	return t !== void 0 && (e.admin || !n && t === e);
}
function p(e, t, n) {
	return t !== void 0 && e.admin && t !== e && !n(t);
}
var m = "/api/v1", h = {
	rooms: `${m}/rooms`,
	sdkRooms: `${m}/sdk/rooms`,
	account: `${m}/account`,
	accountConfig: `${m}/account/config`,
	profile: `${m}/account/profile`,
	notifications: `${m}/account/notifications`,
	keys: `${m}/account/keys`,
	signal: (e) => `${m}/rooms/${encodeURIComponent(e)}/signal`,
	lease: (e) => `${m}/sdk/rooms/${encodeURIComponent(e)}/lease`
}, g = Uint8Array, _ = Uint16Array, v = Int32Array, ee = new g([
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
]), y = new g([
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
]), b = new g([
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
]), x = function(e, t) {
	for (var n = new _(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new v(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, S = x(ee, 2), te = S.b, C = S.r;
te[28] = 258, C[258] = 28;
for (var w = x(y, 0), T = w.b, E = w.r, ne = new _(32768), D = 0; D < 32768; ++D) {
	var O = (D & 43690) >> 1 | (D & 21845) << 1;
	O = (O & 52428) >> 2 | (O & 13107) << 2, O = (O & 61680) >> 4 | (O & 3855) << 4, ne[D] = ((O & 65280) >> 8 | (O & 255) << 8) >> 1;
}
for (var k = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new _(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new _(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new _(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[ne[d] >> c] = l;
	} else for (s = new _(r), i = 0; i < r; ++i) e[i] && (s[i] = ne[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), A = new g(288), D = 0; D < 144; ++D) A[D] = 8;
for (var D = 144; D < 256; ++D) A[D] = 9;
for (var D = 256; D < 280; ++D) A[D] = 7;
for (var D = 280; D < 288; ++D) A[D] = 8;
for (var j = new g(32), D = 0; D < 32; ++D) j[D] = 5;
var re = /*#__PURE__*/ k(A, 9, 0), M = /*#__PURE__*/ k(A, 9, 1), ie = /*#__PURE__*/ k(j, 5, 0), N = /*#__PURE__*/ k(j, 5, 1), P = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, F = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, I = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, L = function(e) {
	return (e + 7) / 8 | 0;
}, ae = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new g(e.subarray(t, n));
}, R = [
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
], z = function(e, t, n) {
	var r = Error(t || R[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, z), !n) throw r;
	return r;
}, B = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new g(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new g(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new g(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, _ = t.n, v = i * 8;
	do {
		if (!p) {
			u = F(e, d, 1);
			var x = F(e, d + 1, 3);
			if (d += 3, !x) {
				var S = L(d) + 4, C = e[S - 4] | e[S - 3] << 8, w = S + C;
				if (w > i) {
					c && z(0);
					break;
				}
				s && l(f + C), n.set(e.subarray(S, w), f), t.b = f += C, t.p = d = w * 8, t.f = u;
				continue;
			}
			if (x == 1) p = M, m = N, h = 9, _ = 5;
			else if (x == 2) {
				var E = F(e, d, 31) + 257, ne = F(e, d + 10, 15) + 4, D = E + F(e, d + 5, 31) + 1;
				d += 14;
				for (var O = new g(D), A = new g(19), j = 0; j < ne; ++j) A[b[j]] = F(e, d + j * 3, 7);
				d += ne * 3;
				for (var re = P(A), ie = (1 << re) - 1, R = k(A, re, 1), j = 0; j < D;) {
					var B = R[F(e, d, ie)];
					d += B & 15;
					var S = B >> 4;
					if (S < 16) O[j++] = S;
					else {
						var V = 0, H = 0;
						for (S == 16 ? (H = 3 + F(e, d, 3), d += 2, V = O[j - 1]) : S == 17 ? (H = 3 + F(e, d, 7), d += 3) : S == 18 && (H = 11 + F(e, d, 127), d += 7); H--;) O[j++] = V;
					}
				}
				var oe = O.subarray(0, E), U = O.subarray(E);
				h = P(oe), _ = P(U), p = k(oe, h, 1), m = k(U, _, 1);
			} else z(1);
			if (d > v) {
				c && z(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var W = (1 << h) - 1, G = (1 << _) - 1, se = d;; se = d) {
			var V = p[I(e, d) & W], K = V >> 4;
			if (d += V & 15, d > v) {
				c && z(0);
				break;
			}
			if (V || z(2), K < 256) n[f++] = K;
			else if (K == 256) {
				se = d, p = null;
				break;
			} else {
				var q = K - 254;
				if (K > 264) {
					var j = K - 257, J = ee[j];
					q = F(e, d, (1 << J) - 1) + te[j], d += J;
				}
				var Y = m[I(e, d) & G], X = Y >> 4;
				Y || z(3), d += Y & 15;
				var U = T[X];
				if (X > 3) {
					var J = y[X];
					U += I(e, d) & (1 << J) - 1, d += J;
				}
				if (d > v) {
					c && z(0);
					break;
				}
				s && l(f + 131072);
				var ce = f + q;
				if (f < U) {
					var Z = a - U, le = Math.min(U, ce);
					for (Z + f < 0 && z(3); f < le; ++f) n[f] = r[Z + f];
				}
				for (; f < ce; ++f) n[f] = n[f - U];
			}
		}
		t.l = p, t.p = se, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = _);
	} while (!u);
	return f != n.length && o ? ae(n, 0, f) : n.subarray(0, f);
}, V = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, H = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, oe = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: J,
		l: 0
	};
	if (i == 1) {
		var o = new g(n[0].s + 1);
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
	var p = new _(f + 1), m = U(n[u - 1], p, 0);
	if (m > t) {
		var r = 0, h = 0, v = m - t, ee = 1 << v;
		for (a.sort(function(e, t) {
			return p[t.s] - p[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var y = a[r].s;
			if (p[y] > t) h += ee - (1 << m - p[y]), p[y] = t;
			else break;
		}
		for (h >>= v; h > 0;) {
			var b = a[r].s;
			p[b] < t ? h -= 1 << t - p[b]++ - 1 : ++r;
		}
		for (; r >= 0 && h; --r) {
			var x = a[r].s;
			p[x] == t && (--p[x], ++h);
		}
		m = t;
	}
	return {
		t: new g(p),
		l: m
	};
}, U = function(e, t, n) {
	return e.s == -1 ? Math.max(U(e.l, t, n + 1), U(e.r, t, n + 1)) : t[e.s] = n;
}, W = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new _(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, G = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, se = function(e, t, n) {
	var r = n.length, i = L(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, K = function(e, t, n, r, i, a, o, s, c, l, u) {
	V(t, u++, n), ++i[256];
	for (var d = oe(i, 15), f = d.t, p = d.l, m = oe(a, 15), h = m.t, g = m.l, v = W(f), x = v.c, S = v.n, te = W(h), C = te.c, w = te.n, T = new _(19), E = 0; E < x.length; ++E) ++T[x[E] & 31];
	for (var E = 0; E < C.length; ++E) ++T[C[E] & 31];
	for (var ne = oe(T, 7), D = ne.t, O = ne.l, M = 19; M > 4 && !D[b[M - 1]]; --M);
	var N = l + 5 << 3, P = G(i, A) + G(a, j) + o, F = G(i, f) + G(a, h) + o + 14 + 3 * M + G(T, D) + 2 * T[16] + 3 * T[17] + 7 * T[18];
	if (c >= 0 && N <= P && N <= F) return se(t, u, e.subarray(c, c + l));
	var I, L, ae, R;
	if (V(t, u, 1 + (F < P)), u += 2, F < P) {
		I = k(f, p, 0), L = f, ae = k(h, g, 0), R = h;
		var z = k(D, O, 0);
		V(t, u, S - 257), V(t, u + 5, w - 1), V(t, u + 10, M - 4), u += 14;
		for (var E = 0; E < M; ++E) V(t, u + 3 * E, D[b[E]]);
		u += 3 * M;
		for (var B = [x, C], U = 0; U < 2; ++U) for (var K = B[U], E = 0; E < K.length; ++E) {
			var q = K[E] & 31;
			V(t, u, z[q]), u += D[q], q > 15 && (V(t, u, K[E] >> 5 & 127), u += K[E] >> 12);
		}
	} else I = re, L = A, ae = ie, R = j;
	for (var E = 0; E < s; ++E) {
		var J = r[E];
		if (J > 255) {
			var q = J >> 18 & 31;
			H(t, u, I[q + 257]), u += L[q + 257], q > 7 && (V(t, u, J >> 23 & 31), u += ee[q]);
			var Y = J & 31;
			H(t, u, ae[Y]), u += R[Y], Y > 3 && (H(t, u, J >> 5 & 8191), u += y[Y]);
		} else H(t, u, I[J]), u += L[J];
	}
	return H(t, u, I[256]), u + L[256];
}, q = /*#__PURE__*/ new v([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), J = /*#__PURE__*/ new g(0), Y = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new g(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = q[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new _(32768), b = a.h || new _(m + 1), x = Math.ceil(n / 3), S = 2 * x, te = function(t) {
			return (e[t] ^ e[t + 1] << x ^ e[t + 2] << S) & m;
		}, w = new v(25e3), T = new _(288), ne = new _(32), D = 0, O = 0, k = a.i || 0, A = 0, j = a.w || 0, re = 0; k + 2 < o; ++k) {
			var M = te(k), ie = k & 32767, N = b[M];
			if (h[ie] = N, b[M] = ie, j <= k) {
				var P = o - k;
				if ((D > 7e3 || A > 24576) && (P > 423 || !l)) {
					u = K(e, c, 0, w, T, ne, O, A, re, k - re, u), A = D = O = 0, re = k;
					for (var F = 0; F < 286; ++F) T[F] = 0;
					for (var F = 0; F < 30; ++F) ne[F] = 0;
				}
				var I = 2, R = 0, z = p, B = ie - N & 32767;
				if (P > 2 && M == te(k - B)) for (var V = Math.min(f, P) - 1, H = Math.min(32767, k), oe = Math.min(258, P); B <= H && --z && ie != N;) {
					if (e[k + I] == e[k + I - B]) {
						for (var U = 0; U < oe && e[k + U] == e[k + U - B]; ++U);
						if (U > I) {
							if (I = U, R = B, U > V) break;
							for (var W = Math.min(B, U - 2), G = 0, F = 0; F < W; ++F) {
								var J = k - B + F & 32767, Y = J - h[J] & 32767;
								Y > G && (G = Y, N = J);
							}
						}
					}
					ie = N, N = h[ie], B += ie - N & 32767;
				}
				if (R) {
					w[A++] = 268435456 | C[I] << 18 | E[R];
					var X = C[I] & 31, ce = E[R] & 31;
					O += ee[X] + y[ce], ++T[257 + X], ++ne[ce], j = k + I, ++D;
				} else w[A++] = e[k], ++T[e[k]];
			}
		}
		for (k = Math.max(k, j); k < o; ++k) w[A++] = e[k], ++T[e[k]];
		u = K(e, c, l, w, T, ne, O, A, re, k - re, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = b, a.p = h, a.i = k, a.w = j);
	} else {
		for (var k = a.w || 0; k < o + l; k += 65535) {
			var Z = k + 65535;
			Z >= o && (c[u / 8 | 0] = l, Z = o), u = se(c, u + 1, e.subarray(k, Z));
		}
		a.i = o;
	}
	return ae(s, 0, r + L(u) + i);
}, X = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new g(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return Y(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
function ce(e, t) {
	return X(e, t || {}, 0, 0);
}
var Z = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new g(32768), this.p = new g(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || z(5), this.d && z(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new g(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = B(this.p, this.s, this.o);
		this.ondata(ae(n, t, this.s.b), this.d), this.o = ae(n, this.s.b - 32768), this.s.b = this.o.length, this.p = ae(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}(), le = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	le.decode(J, { stream: !0 });
} catch {}
var ue = 5389, de = (e, t, n) => Number.isInteger(e) && e >= t && e <= n, fe = (e) => Number.isFinite(e) && e >= 1 && e <= 1e5, pe = class {
	core;
	enabled = !1;
	constructor(e) {
		if (this.core = e, e.surface_state_capacity() !== 5389) throw Error("Unsupported surface state version");
	}
	configure(e) {
		if (!de(e.seed, 0, 4294967295) || !fe(e.halfWidth) || !fe(e.halfHeight) || !de(e.moisturePermille, 0, 1e3)) throw Error("Invalid surface configuration");
		if (!this.core.surface_configure(e.seed, e.halfWidth, e.halfHeight, e.moisturePermille)) throw Error("Surface configuration rejected");
		this.enabled = !0;
	}
	disable() {
		this.core.surface_disable(), this.enabled = !1;
	}
	setWeather(e) {
		if (!de(e.rainMilliMmH, 0, 2e5) || !de(e.temperatureMilliC, -3e4, 6e4) || !de(e.humidityPermille, 0, 1e3) || !de(e.windMilliMS, 0, 6e4)) throw Error("Invalid surface weather");
		if (!this.core.surface_weather(e.rainMilliMmH, e.temperatureMilliC, e.humidityPermille, e.windMilliMS)) throw Error("Surface is disabled");
	}
	sample(e, t) {
		if (!Number.isFinite(e) || !Number.isFinite(t)) throw Error("Invalid surface position");
		return {
			traction: this.core.surface_sample(e, t, 0),
			rollingDrag: this.core.surface_sample(e, t, 1),
			waterMm: this.core.surface_sample(e, t, 2),
			compaction: this.core.surface_sample(e, t, 3)
		};
	}
	snapshot() {
		let e = this.core.surface_save();
		if (e === 0) return [];
		if (e !== 5389) throw Error("Invalid surface checkpoint size");
		return Array.from(this.buffer());
	}
	restore(e) {
		if (!Array.isArray(e) || e.length !== 0 && e.length !== 5389 || !e.every((e) => de(e, 0, 4294967295)) || (e.length && this.buffer().set(e), !this.core.surface_restore(e.length))) throw Error("Invalid surface checkpoint");
		this.enabled = e.length > 0;
	}
	buffer() {
		let e = this.core.surface_state_ptr();
		return new Uint32Array(this.core.memory.buffer, e, ue);
	}
}, me = 131072, he = 49152, Q = new TextEncoder();
new TextDecoder("utf-8", { fatal: !0 });
var ge = (e, t) => typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t;
function _e(e, t) {
	if (!ge(t, 65535) || !ge(e.tick, 4294967295) || !Array.isArray(e.surface) || e.surface.length !== 5389) throw Error("Invalid terrain snapshot");
	let n = Q.encode(JSON.stringify(e));
	if (n.length > me) throw Error("Terrain snapshot exceeds size limit");
	let r = ce(n, { level: 1 });
	if (r.length > he) throw Error("Compressed terrain snapshot exceeds size limit");
	let i = "";
	for (let e of r) i += String.fromCharCode(e);
	return {
		type: "terrain-state",
		epoch: t,
		tick: e.tick,
		payload: btoa(i)
	};
}
function ve(e) {
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
async function ye(e, t) {
	let n = `Room creation failed (${e.status})`, r = e.body?.getReader();
	if (!r) return Error(n);
	let i = () => {
		r.cancel().catch(() => {});
	};
	t.addEventListener("abort", i, { once: !0 });
	try {
		if (t.throwIfAborted(), e.status < 400 || e.status >= 500 || e.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return Error(n);
		let i = /* @__PURE__ */ new Uint8Array(2048), a = 0;
		for (;;) {
			let e = await r.read();
			if (t.throwIfAborted(), e.done) break;
			if (a + e.value.byteLength > i.length) return Error(n);
			i.set(e.value, a), a += e.value.byteLength;
		}
		let o = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(i.subarray(0, a)));
		if (!o || typeof o != "object") return Error(n);
		let s = o.error;
		return typeof s != "string" || !s.trim() || s.length > 300 || /[<>]/.test(s) || [...s].some((e) => e.charCodeAt(0) < 32 || e.charCodeAt(0) === 127) ? Error(n) : Error(`${s.trim()} (${e.status})`);
	} catch {
		return t.throwIfAborted(), Error(n);
	} finally {
		t.removeEventListener("abort", i), i(), r.releaseLock();
	}
}
var be = class {
	stream;
	sequence = 0;
	pending = [];
	lastSent = -Infinity;
	constructor(e = crypto.randomUUID()) {
		this.stream = e;
	}
	checkpoint() {
		return {
			stream: this.stream,
			sequence: this.sequence
		};
	}
	capture(e, t) {
		let n = (e.ballKicks ?? []).map((n) => ({
			sequence: ++this.sequence,
			tick: e.tick,
			epoch: t,
			slot: n,
			x: e.data[0],
			y: e.data[1]
		}));
		return this.pending.push(...n), this.pending.length > 8 && this.pending.splice(0, this.pending.length - 8), n;
	}
	drain(e) {
		if (!this.pending.length || e - this.lastSent < 50) return;
		this.lastSent = e;
		let t = this.pending;
		return this.pending = [], {
			type: "match-kicks",
			stream: this.stream,
			events: t
		};
	}
};
function xe(e, t) {
	if (t) for (let n of e.peers.values()) n.control?.readyState === "open" && n.control.bufferedAmount < 16384 && e.control(n, t);
}
var Se = /* @__PURE__ */ new Set([
	"noPlayer",
	"playerName",
	"roomName",
	"maxPlayers",
	"password",
	"public",
	"stadium"
]);
function Ce(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	for (let t of Object.keys(e)) {
		if (t === "token") throw Error("External service tokens are not supported. Ball2D join verification is configured on the room.");
		if (t === "geo") throw Error("Geolocation overrides are not supported. Room country comes from the host connection.");
		if (!Se.has(t)) throw Error(`Unknown room setting: ${t}`);
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
function we(e) {
	return /^(?:[0-9a-f]{10}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(e) ? e.toLowerCase() : null;
}
function Te(e) {
	let t = we(e);
	if (!t) throw Error("Invalid room code");
	return `/r/${t}`;
}
function Ee(e, t, n) {
	if (!Number.isFinite(e) || !Number.isInteger(t) || t < 0 || t > 16777215 || !Array.isArray(n) || n.length < 1 || n.length > 3 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 16777215)) throw Error("Invalid team colors");
	return {
		angle: (e % 360 + 360) % 360,
		textColor: t,
		colors: [...n]
	};
}
function De(e) {
	if (e === void 0) return [null, null];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Invalid team styles");
	return e.map((e) => e === null ? null : Ee(e.angle, e.textColor, e.colors));
}
var Oe = [
	"normal",
	"bold",
	"italic",
	"small",
	"small-bold",
	"small-italic"
];
function ke(e, t, n, r) {
	if (typeof e != "string" || e.length > 1e3) throw Error("Announcement exceeds 1000 characters");
	if (t != null && (!Number.isInteger(t) || t < 0 || t > 16777215)) throw Error("Invalid announcement color");
	if (n != null && !Oe.includes(n)) throw Error("Invalid announcement style");
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
function Ae(e) {
	return e === null || typeof e == "string" && Array.from(e).length <= 2 && !/[\p{Cc}\p{Cf}]/u.test(e);
}
var je = [
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
function Me(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid disc property update");
	let t = e, n = {};
	for (let e = 0; e < je.length; e++) {
		let [r, , i, a] = je[e], o = t[r];
		if (o == null) continue;
		if (typeof o != "number" || !Number.isFinite(o)) throw Error(`Invalid disc property: ${r}`);
		let s = e < 10 ? Math.fround(o) : o | 0;
		if (!Number.isFinite(s) || s < Math.fround(i) || s > a) throw Error(`Invalid disc property: ${r}`);
		n[r] = s;
	}
	return n;
}
var Ne = "5a27b77ea69c9f5e179f", Pe = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
		}, v = 0, ee = Math.random(), y = function(e) {
			return `Symbol(${e === void 0 ? "" : e})_${(++v + ee).toString(36)}`;
		}, b = e(function(e) {
			var r = "__core-js_shared__", i = t[r] || (t[r] = {});
			(e.exports = function(e, t) {
				return i[e] || (i[e] = t === void 0 ? {} : t);
			})("versions", []).push({
				version: n.version,
				mode: "global",
				copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
			});
		})("native-function-to-string", Function.toString), x = e(function(e) {
			var r = y("src"), i = "toString", a = ("" + b).split(i);
			n.inspectSource = function(e) {
				return b.call(e);
			}, (e.exports = function(e, n, i, o) {
				var s = typeof i == "function";
				s && (_(i, "name") || h(i, "name", n)), e[n] !== i && (s && (_(i, r) || h(i, r, e[n] ? "" + e[n] : a.join(String(n)))), e === t ? e[n] = i : o ? e[n] ? e[n] = i : h(e, n, i) : (delete e[n], h(e, n, i)));
			})(Function.prototype, i, function() {
				return typeof this == "function" && this[r] || b.call(this);
			});
		}), S = function(e) {
			if (typeof e != "function") throw TypeError(e + " is not a function!");
			return e;
		}, te = function(e, t, n) {
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
		}, C = "prototype", w = function(e, r, i) {
			var a = e & w.F, o = e & w.G, s = e & w.S, c = e & w.P, l = e & w.B, u = o ? t : s ? t[r] || (t[r] = {}) : (t[r] || {})[C], d = o ? n : n[r] || (n[r] = {}), f = d[C] || (d[C] = {}), p, m, g, _;
			for (p in o && (i = r), i) m = !a && u && u[p] !== void 0, g = (m ? u : i)[p], _ = l && m ? te(g, t) : c && typeof g == "function" ? te(Function.call, g) : g, u && x(u, p, g, e & w.U), d[p] != g && h(d, p, _), c && f[p] != g && (f[p] = g);
		};
		t.core = n, w.F = 1, w.G = 2, w.S = 4, w.P = 8, w.B = 16, w.W = 32, w.U = 64, w.R = 128;
		var T = w, E = Math.ceil, ne = Math.floor, D = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? ne : E)(e);
		}, O = function(e) {
			if (e == null) throw TypeError("Can't call method on  " + e);
			return e;
		}, k = function(e) {
			return function(t, n) {
				var r = String(O(t)), i = D(n), a = r.length, o, s;
				return i < 0 || i >= a ? e ? "" : void 0 : (o = r.charCodeAt(i), o < 55296 || o > 56319 || i + 1 === a || (s = r.charCodeAt(i + 1)) < 56320 || s > 57343 ? e ? r.charAt(i) : o : e ? r.slice(i, i + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
			};
		}(!1);
		T(T.P, "String", { codePointAt: function(e) {
			return k(this, e);
		} }), n.String.codePointAt;
		var A = Math.max, j = Math.min, re = function(e, t) {
			return e = D(e), e < 0 ? A(e + t, 0) : j(e, t);
		}, M = String.fromCharCode, ie = String.fromCodePoint;
		T(T.S + T.F * (!!ie && ie.length != 1), "String", { fromCodePoint: function(e) {
			for (var t = arguments, n = [], r = arguments.length, i = 0, a; r > i;) {
				if (a = +t[i++], re(a, 1114111) !== a) throw RangeError(a + " is not a valid code point");
				n.push(a < 65536 ? M(a) : M(((a -= 65536) >> 10) + 55296, a % 1024 + 56320));
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
		}, F, I, L, ae, R, z, B, V, H, oe = function(e, t) {
			F = String(e), I = "start", L = [], ae = 0, R = 1, z = 0, B = void 0, V = void 0, H = void 0;
			do
				B = J(), pe[I]();
			while (B.type !== "eof");
			return typeof t == "function" ? U({ "": H }, "", t) : H;
		};
		function U(e, t, n) {
			var r = e[t];
			if (typeof r == "object" && r) {
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
					var a = String(i), o = U(r, a, n);
					o === void 0 ? delete r[a] : Object.defineProperty(r, a, {
						value: o,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
				else for (var s in r) {
					var c = U(r, s, n);
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
		var W, G, se, K, q;
		function J() {
			for (W = "default", G = "", se = !1, K = 1;;) {
				q = Y();
				var e = ce[W]();
				if (e) return e;
			}
		}
		function Y() {
			if (F[ae]) return String.fromCodePoint(F.codePointAt(ae));
		}
		function X() {
			var e = Y();
			return e === "\n" ? (R++, z = 0) : e ? z += e.length : z++, e && (ae += e.length), e;
		}
		var ce = {
			default: function() {
				switch (q) {
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
						X();
						return;
					case "/":
						X(), W = "comment";
						return;
					case void 0: return X(), Z("eof");
				}
				if (P.isSpaceSeparator(q)) {
					X();
					return;
				}
				return ce[I]();
			},
			comment: function() {
				switch (q) {
					case "*":
						X(), W = "multiLineComment";
						return;
					case "/":
						X(), W = "singleLineComment";
						return;
				}
				throw Q(X());
			},
			multiLineComment: function() {
				switch (q) {
					case "*":
						X(), W = "multiLineCommentAsterisk";
						return;
					case void 0: throw Q(X());
				}
				X();
			},
			multiLineCommentAsterisk: function() {
				switch (q) {
					case "*":
						X();
						return;
					case "/":
						X(), W = "default";
						return;
					case void 0: throw Q(X());
				}
				X(), W = "multiLineComment";
			},
			singleLineComment: function() {
				switch (q) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						X(), W = "default";
						return;
					case void 0: return X(), Z("eof");
				}
				X();
			},
			value: function() {
				switch (q) {
					case "{":
					case "[": return Z("punctuator", X());
					case "n": return X(), le("ull"), Z("null", null);
					case "t": return X(), le("rue"), Z("boolean", !0);
					case "f": return X(), le("alse"), Z("boolean", !1);
					case "-":
					case "+":
						X() === "-" && (K = -1), W = "sign";
						return;
					case ".":
						G = X(), W = "decimalPointLeading";
						return;
					case "0":
						G = X(), W = "zero";
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
						G = X(), W = "decimalInteger";
						return;
					case "I": return X(), le("nfinity"), Z("numeric", Infinity);
					case "N": return X(), le("aN"), Z("numeric", NaN);
					case "\"":
					case "'":
						se = X() === "\"", G = "", W = "string";
						return;
				}
				throw Q(X());
			},
			identifierNameStartEscape: function() {
				if (q !== "u") throw Q(X());
				X();
				var e = fe();
				switch (e) {
					case "$":
					case "_": break;
					default: if (!P.isIdStartChar(e)) throw _e();
				}
				G += e, W = "identifierName";
			},
			identifierName: function() {
				switch (q) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						G += X();
						return;
					case "\\":
						X(), W = "identifierNameEscape";
						return;
				}
				if (P.isIdContinueChar(q)) {
					G += X();
					return;
				}
				return Z("identifier", G);
			},
			identifierNameEscape: function() {
				if (q !== "u") throw Q(X());
				X();
				var e = fe();
				switch (e) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default: if (!P.isIdContinueChar(e)) throw _e();
				}
				G += e, W = "identifierName";
			},
			sign: function() {
				switch (q) {
					case ".":
						G = X(), W = "decimalPointLeading";
						return;
					case "0":
						G = X(), W = "zero";
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
						G = X(), W = "decimalInteger";
						return;
					case "I": return X(), le("nfinity"), Z("numeric", K * Infinity);
					case "N": return X(), le("aN"), Z("numeric", NaN);
				}
				throw Q(X());
			},
			zero: function() {
				switch (q) {
					case ".":
						G += X(), W = "decimalPoint";
						return;
					case "e":
					case "E":
						G += X(), W = "decimalExponent";
						return;
					case "x":
					case "X":
						G += X(), W = "hexadecimal";
						return;
				}
				return Z("numeric", K * 0);
			},
			decimalInteger: function() {
				switch (q) {
					case ".":
						G += X(), W = "decimalPoint";
						return;
					case "e":
					case "E":
						G += X(), W = "decimalExponent";
						return;
				}
				if (P.isDigit(q)) {
					G += X();
					return;
				}
				return Z("numeric", K * Number(G));
			},
			decimalPointLeading: function() {
				if (P.isDigit(q)) {
					G += X(), W = "decimalFraction";
					return;
				}
				throw Q(X());
			},
			decimalPoint: function() {
				switch (q) {
					case "e":
					case "E":
						G += X(), W = "decimalExponent";
						return;
				}
				if (P.isDigit(q)) {
					G += X(), W = "decimalFraction";
					return;
				}
				return Z("numeric", K * Number(G));
			},
			decimalFraction: function() {
				switch (q) {
					case "e":
					case "E":
						G += X(), W = "decimalExponent";
						return;
				}
				if (P.isDigit(q)) {
					G += X();
					return;
				}
				return Z("numeric", K * Number(G));
			},
			decimalExponent: function() {
				switch (q) {
					case "+":
					case "-":
						G += X(), W = "decimalExponentSign";
						return;
				}
				if (P.isDigit(q)) {
					G += X(), W = "decimalExponentInteger";
					return;
				}
				throw Q(X());
			},
			decimalExponentSign: function() {
				if (P.isDigit(q)) {
					G += X(), W = "decimalExponentInteger";
					return;
				}
				throw Q(X());
			},
			decimalExponentInteger: function() {
				if (P.isDigit(q)) {
					G += X();
					return;
				}
				return Z("numeric", K * Number(G));
			},
			hexadecimal: function() {
				if (P.isHexDigit(q)) {
					G += X(), W = "hexadecimalInteger";
					return;
				}
				throw Q(X());
			},
			hexadecimalInteger: function() {
				if (P.isHexDigit(q)) {
					G += X();
					return;
				}
				return Z("numeric", K * Number(G));
			},
			string: function() {
				switch (q) {
					case "\\":
						X(), G += ue();
						return;
					case "\"":
						if (se) return X(), Z("string", G);
						G += X();
						return;
					case "'":
						if (!se) return X(), Z("string", G);
						G += X();
						return;
					case "\n":
					case "\r": throw Q(X());
					case "\u2028":
					case "\u2029":
						ve(q);
						break;
					case void 0: throw Q(X());
				}
				G += X();
			},
			start: function() {
				switch (q) {
					case "{":
					case "[": return Z("punctuator", X());
				}
				W = "value";
			},
			beforePropertyName: function() {
				switch (q) {
					case "$":
					case "_":
						G = X(), W = "identifierName";
						return;
					case "\\":
						X(), W = "identifierNameStartEscape";
						return;
					case "}": return Z("punctuator", X());
					case "\"":
					case "'":
						se = X() === "\"", W = "string";
						return;
				}
				if (P.isIdStartChar(q)) {
					G += X(), W = "identifierName";
					return;
				}
				throw Q(X());
			},
			afterPropertyName: function() {
				if (q === ":") return Z("punctuator", X());
				throw Q(X());
			},
			beforePropertyValue: function() {
				W = "value";
			},
			afterPropertyValue: function() {
				switch (q) {
					case ",":
					case "}": return Z("punctuator", X());
				}
				throw Q(X());
			},
			beforeArrayValue: function() {
				if (q === "]") return Z("punctuator", X());
				W = "value";
			},
			afterArrayValue: function() {
				switch (q) {
					case ",":
					case "]": return Z("punctuator", X());
				}
				throw Q(X());
			},
			end: function() {
				throw Q(X());
			}
		};
		function Z(e, t) {
			return {
				type: e,
				value: t,
				line: R,
				column: z
			};
		}
		function le(e) {
			for (var t = 0, n = e; t < n.length; t += 1) {
				var r = n[t];
				if (Y() !== r) throw Q(X());
				X();
			}
		}
		function ue() {
			switch (Y()) {
				case "b": return X(), "\b";
				case "f": return X(), "\f";
				case "n": return X(), "\n";
				case "r": return X(), "\r";
				case "t": return X(), "	";
				case "v": return X(), "\v";
				case "0":
					if (X(), P.isDigit(Y())) throw Q(X());
					return "\0";
				case "x": return X(), de();
				case "u": return X(), fe();
				case "\n":
				case "\u2028":
				case "\u2029": return X(), "";
				case "\r": return X(), Y() === "\n" && X(), "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw Q(X());
				case void 0: throw Q(X());
			}
			return X();
		}
		function de() {
			var e = "", t = Y();
			if (!P.isHexDigit(t) || (e += X(), t = Y(), !P.isHexDigit(t))) throw Q(X());
			return e += X(), String.fromCodePoint(parseInt(e, 16));
		}
		function fe() {
			for (var e = "", t = 4; t-- > 0;) {
				var n = Y();
				if (!P.isHexDigit(n)) throw Q(X());
				e += X();
			}
			return String.fromCodePoint(parseInt(e, 16));
		}
		var pe = {
			start: function() {
				if (B.type === "eof") throw ge();
				me();
			},
			beforePropertyName: function() {
				switch (B.type) {
					case "identifier":
					case "string":
						V = B.value, I = "afterPropertyName";
						return;
					case "punctuator":
						he();
						return;
					case "eof": throw ge();
				}
			},
			afterPropertyName: function() {
				if (B.type === "eof") throw ge();
				I = "beforePropertyValue";
			},
			beforePropertyValue: function() {
				if (B.type === "eof") throw ge();
				me();
			},
			beforeArrayValue: function() {
				if (B.type === "eof") throw ge();
				if (B.type === "punctuator" && B.value === "]") {
					he();
					return;
				}
				me();
			},
			afterPropertyValue: function() {
				if (B.type === "eof") throw ge();
				switch (B.value) {
					case ",":
						I = "beforePropertyName";
						return;
					case "}": he();
				}
			},
			afterArrayValue: function() {
				if (B.type === "eof") throw ge();
				switch (B.value) {
					case ",":
						I = "beforeArrayValue";
						return;
					case "]": he();
				}
			},
			end: function() {}
		};
		function me() {
			var e;
			switch (B.type) {
				case "punctuator":
					switch (B.value) {
						case "{":
							e = {};
							break;
						case "[": e = [];
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string": e = B.value;
			}
			if (H === void 0) H = e;
			else {
				var t = L[L.length - 1];
				Array.isArray(t) ? t.push(e) : Object.defineProperty(t, V, {
					value: e,
					writable: !0,
					enumerable: !0,
					configurable: !0
				});
			}
			if (typeof e == "object" && e) L.push(e), I = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName";
			else {
				var n = L[L.length - 1];
				I = n == null ? "end" : Array.isArray(n) ? "afterArrayValue" : "afterPropertyValue";
			}
		}
		function he() {
			L.pop();
			var e = L[L.length - 1];
			I = e == null ? "end" : Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue";
		}
		function Q(e) {
			return be(e === void 0 ? "JSON5: invalid end of input at " + R + ":" + z : "JSON5: invalid character '" + ye(e) + "' at " + R + ":" + z);
		}
		function ge() {
			return be("JSON5: invalid end of input at " + R + ":" + z);
		}
		function _e() {
			return z -= 5, be("JSON5: invalid identifier character at " + R + ":" + z);
		}
		function ve(e) {
			console.warn("JSON5: '" + ye(e) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function ye(e) {
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
		function be(e) {
			var t = SyntaxError(e);
			return t.lineNumber = R, t.columnNumber = z, t;
		}
		return {
			parse: oe,
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
})))(), 1), Fe = {
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
}, Ie = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Expected an object");
	return e;
}, $ = (e, t, n = -4096, r = 4096) => {
	let i = e === void 0 ? t : e;
	if (typeof i != "number" || !Number.isFinite(i) || i < n || i > r) throw Error(`Number must be between ${n} and ${r}`);
	return i;
}, Le = (e, t = [0, 0]) => {
	if (e === void 0) return [...t];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Expected [x, y]");
	return [$(e[0], 0), $(e[1], 0)];
}, Re = (e, t) => {
	if (e === void 0) return [];
	if (!Array.isArray(e) || e.length > t) throw Error(`Array limit: ${t}`);
	return e;
};
function ze(e, t) {
	return e === void 0 ? t : typeof e == "number" ? $(e, t, -2147483648, 4294967295) | 0 : Re(e, 16).reduce((e, t) => {
		if (typeof t != "string" || !Object.hasOwn(Fe, t)) throw Error("Unknown collision flag");
		return e | Fe[t];
	}, 0);
}
function Be(e, t = "FFFFFF") {
	if (e === void 0) return t;
	if (e === "transparent") return e;
	if (Array.isArray(e) && e.length === 3) return e.map((e) => Math.round($(e, 0, 0, 255)).toString(16).padStart(2, "0")).join("");
	if (typeof e == "string" && /^[0-9a-f]{6}$/i.test(e)) return e;
	throw Error("Invalid color");
}
var Ve = Object.fromEntries(Object.entries({
	root: "version physicsMode name width height maxViewWidth cameraFollow spawnDistance canBeStored kickOffReset bg traits vertexes segments goals discs planes joints redSpawnPoints blueSpawnPoints playerPhysics ballPhysics",
	bg: "type width height kickOffRadius cornerRadius goalLine color",
	vertexes: "trait x y bCoef cMask cGroup",
	segments: "trait v0 v1 bCoef cMask cGroup curve curveF bias color vis",
	discs: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color",
	planes: "trait normal dist bCoef cMask cGroup",
	goals: "trait p0 p1 team",
	joints: "trait d0 d1 length strength color",
	playerPhysics: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color acceleration kickingAcceleration kickingDamping kickStrength kickback"
}).map(([e, t]) => [e, new Set(t.split(" "))])), He = new Set([
	"vertexes",
	"segments",
	"discs",
	"planes",
	"goals",
	"joints",
	"playerPhysics"
].flatMap((e) => [...Ve[e]]));
function Ue(e) {
	let t = [], n = (e, t) => {
		let n = t.length > 80 ? `${t.slice(0, 80)}…` : t;
		return e + (/^[A-Za-z_$][\w$]*$/.test(n) ? `.${n}` : `[${JSON.stringify(n)}]`);
	}, r = (e, r, i) => {
		if (e && typeof e == "object" && !Array.isArray(e)) for (let a of Object.keys(e)) r.has(a) || (t.length < 64 ? t.push(`Unsupported stadium field: ${n(i, a)}`) : t.length === 64 && t.push("Additional unsupported stadium fields omitted."));
	};
	r(e, Ve.root, "$"), r(e.bg, Ve.bg, "$.bg");
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
			r(e, Ve[t], `$.${t}[${n}]`);
		});
	}
	if (r(e.ballPhysics, Ve.discs, "$.ballPhysics"), r(e.playerPhysics, Ve.playerPhysics, "$.playerPhysics"), e.traits && typeof e.traits == "object" && !Array.isArray(e.traits)) for (let [t, i] of Object.entries(e.traits)) r(i, He, n("$.traits", t));
	return t;
}
function We(e, t, n, r, i) {
	let a = e === "hbs" ? 1 : Math.ceil(2 * Math.SQRT2 * 100 / Math.min(10, i));
	if ((t + 32) * (n + t + 32 + r) * a > 2e6) throw Error("Stadium collision complexity exceeds the room budget");
}
function Ge(e) {
	if (new TextEncoder().encode(e).length > 262144) throw Error("Stadium exceeds 256 KB");
	let t = Ie(Pe.default.parse(e));
	if (t.physicsMode !== void 0 && t.physicsMode !== "hbs" && t.physicsMode !== "substeps") throw Error("Invalid physics mode");
	let n = t.physicsMode === "substeps" ? "substeps" : "hbs";
	if (t.version !== void 0 && t.version !== 1) throw Error("Unsupported stadium version");
	let r = t.traits === void 0 ? {} : Ie(t.traits), i = (e) => {
		let t = Ie(e);
		if (t.trait === void 0) return t;
		if (typeof t.trait != "string" || !Object.hasOwn(r, t.trait)) throw Error("Unknown trait");
		return {
			...Ie(r[t.trait]),
			...t
		};
	}, a = (e, t = !1) => ({
		pos: Le(e.pos),
		speed: Le(e.speed),
		gravity: Le(e.gravity),
		radius: $(e.radius, 10, .5, 100),
		invMass: $(e.invMass, 1, 0, 8192),
		damping: $(e.damping, .99, 0, 8192),
		bCoef: $(e.bCoef, .5, -1, 8192),
		cGroup: ze(e.cGroup, t ? 193 : 63),
		cMask: ze(e.cMask, 63),
		color: Be(e.color)
	}), o = Re(t.discs, 63).map((e) => a(i(e)));
	if (t.ballPhysics !== "disc0") {
		let e = a(t.ballPhysics === void 0 ? {} : i(t.ballPhysics), !0);
		e.cGroup |= 192, o.unshift(e);
	} else if (!o.length) throw Error("disc0 needs a disc");
	let s = Re(t.vertexes, 1024).map((e) => i(e)), c = [], l = [], u = Ue(t);
	for (let e of s) c.push({
		a: [$(e.x, 0), $(e.y, 0)],
		b: [$(e.x, 0), $(e.y, 0)],
		bCoef: $(e.bCoef, 1, -1, 8192),
		cGroup: ze(e.cGroup, 32),
		cMask: ze(e.cMask, 63),
		bias: 0,
		color: "transparent",
		vis: !1
	});
	let d = [...c];
	for (let e of Re(t.segments, 1024)) {
		let t = i(e), n = $(t.v0, -1, 0, s.length - 1), r = $(t.v1, -1, 0, s.length - 1);
		if (!Number.isInteger(n) || !Number.isInteger(r)) throw Error("Vertex indices must be integers");
		let a = [$(s[n].x, 0), $(s[n].y, 0)], o = [$(s[r].x, 0), $(s[r].y, 0)], u = {
			bCoef: $(t.bCoef, 1, -1, 8192),
			cGroup: ze(t.cGroup, 32),
			cMask: ze(t.cMask, 63),
			bias: $(t.bias, 0, -100, 100),
			color: Be(t.color, "000000"),
			vis: t.vis !== !1
		}, f = t.curveF === void 0 ? $(t.curve, 0, -359, 359) : 2 * Math.atan2(1, $(t.curveF, 0, -1e8, 1e8)) * 180 / Math.PI;
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
		let g = 1 / (2 * Math.tan(p / 2)), _ = [(a[0] + o[0]) / 2 - h * g, (a[1] + o[1]) / 2 + m * g], v = Math.hypot(a[0] - _[0], a[1] - _[1]), ee = Math.atan2(a[1] - _[1], a[0] - _[0]), y = Math.ceil(Math.abs(p) / Math.max(1e-8, 2 * Math.acos(Math.max(-1, 1 - .15 / v))));
		if (c.length + y > 4096) throw Error("Compiled geometry exceeds 4096 segments");
		let b = {
			a,
			b: o,
			...u,
			center: _,
			radius: v,
			start: ee,
			sweep: p,
			major: t.curveF === void 0 ? Math.abs(f) > 180 : Number(t.curveF) <= 0
		};
		l.push(b), d.push(b);
		let x = a;
		for (let e = 1; e <= y; e++) {
			let t = e === y ? o : [_[0] + v * Math.cos(ee + p * e / y), _[1] + v * Math.sin(ee + p * e / y)];
			c.push({
				a: x,
				b: t,
				...u,
				renderOnly: !0
			}), x = t;
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
		acceleration: $(f.acceleration, .1, -8192, 8192),
		kickingAcceleration: $(f.kickingAcceleration, .07, -8192, 8192),
		kickingDamping: $(f.kickingDamping, .96, 0, 8192),
		kickStrength: $(f.kickStrength, 5, -8192, 8192),
		kickback: $(f.kickback, 0, -8192, 8192)
	};
	We(n, o.length, c.length, Re(t.planes, 64).length + Re(t.joints, 128).length, Math.min(p.radius, ...o.map((e) => e.radius)));
	let m = t.bg === void 0 ? {} : Ie(t.bg);
	return {
		version: 1,
		physicsMode: n,
		name: typeof t.name == "string" ? t.name.slice(0, 64) : "Untitled stadium",
		canBeStored: t.canBeStored !== !1,
		width: $(t.width, 520, 100, 2048),
		height: $(t.height, 300, 80, 2048),
		maxViewWidth: $(t.maxViewWidth, 0, 0, 4096),
		cameraFollow: t.cameraFollow === "player" ? "player" : "ball",
		bg: {
			type: m.type === "grass" ? "grass" : m.type === "hockey" ? "hockey" : "none",
			cornerRadius: $(m.cornerRadius, 0, 0, 500),
			goalLine: $(m.goalLine, 0, 0, 2048),
			width: $(m.width, 0, 0, 2048),
			height: $(m.height, 0, 0, 2048),
			color: Be(m.color, "718C5A"),
			kickOffRadius: $(m.kickOffRadius, 0, 0, 500)
		},
		discs: o,
		segments: c,
		arcs: l,
		colliders: d,
		player: p,
		spawnDistance: $(t.spawnDistance, 200, 0, 1500),
		kickOffReset: t.kickOffReset === "full" ? "full" : "partial",
		redSpawnPoints: Re(t.redSpawnPoints, 32).map((e) => Le(e)),
		blueSpawnPoints: Re(t.blueSpawnPoints, 32).map((e) => Le(e)),
		warnings: u,
		planes: Re(t.planes, 64).map((e) => {
			let t = i(e), n = Le(t.normal);
			if (Math.hypot(...n) < 1e-6) throw Error("Plane normal is zero");
			return {
				normal: n,
				dist: $(t.dist, 0),
				bCoef: $(t.bCoef, 1, -1, 8192),
				cGroup: ze(t.cGroup, 32),
				cMask: ze(t.cMask, 63)
			};
		}),
		goals: Re(t.goals, 16).map((e) => {
			let t = i(e);
			if (t.team !== "red" && t.team !== "blue") throw Error("Invalid goal team");
			let n = Le(t.p0), r = Le(t.p1);
			if (Math.hypot(r[0] - n[0], r[1] - n[1]) < 1) throw Error("Goal has zero length");
			return {
				p0: n,
				p1: r,
				team: t.team === "red" ? 1 : 2
			};
		}),
		joints: Re(t.joints, 128).map((e) => {
			let t = i(e), n = $(t.d0, -1, 0, o.length - 1), r = $(t.d1, -1, 0, o.length - 1);
			if (!Number.isInteger(n) || !Number.isInteger(r) || n === r) throw Error("Invalid joint indices");
			let a = Math.hypot(o[r].pos[0] - o[n].pos[0], o[r].pos[1] - o[n].pos[1]), s = t.length == null ? [a, a] : typeof t.length == "number" ? [t.length, t.length] : Le(t.length);
			return {
				d0: n,
				d1: r,
				min: $(s[0], 0, 0),
				max: $(s[1], 0, 0),
				strength: t.strength === void 0 || t.strength === "rigid" ? "rigid" : $(t.strength, 0, -8192, 8192),
				color: Be(t.color, "000000")
			};
		})
	};
}
function Ke(e = "Emerald Arena", t = 440, n = 220) {
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
var qe = `ball2d-core/1/${Ne}`, Je = 32, Ye = class e {
	core;
	terrain;
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
		this.kickRate = Xe(e, t, n), this.core.kick_limits(this.kickRate & 255, this.kickRate >>> 8 & 255, this.kickRate >>> 16);
	}
	constructor(e) {
		this.core = e.exports, this.terrain = new pe(this.core);
	}
	configureSurface(e) {
		if (this.phase !== "lobby" && this.phase !== "finished") throw Error("Stop the match before configuring its surface");
		e === null ? this.terrain.disable() : this.terrain.configure(e);
	}
	setSurfaceWeather(e) {
		this.terrain.setWeather(e);
	}
	sampleSurface(e, t) {
		return this.terrain.sample(e, t);
	}
	get surfaceEnabled() {
		return this.terrain.enabled;
	}
	static async create(t, n) {
		let r = t ?? await (await fetch("/core.wasm?v=5a27b77ea69c9f5e179f", { signal: n })).arrayBuffer();
		if (Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", r))).map((e) => e.toString(16).padStart(2, "0")).join("") !== "1229b1b4ba3892d6073fb85b3b6231282c2d81ee270808cb0acda874d49cb87e") throw Error("Physics build changed. Refresh the page to load a matching version.");
		return new e(await WebAssembly.instantiate(await WebAssembly.compile(r)));
	}
	get data() {
		return new Float64Array(this.core.memory.buffer, this.core.data_ptr(), this.core.count() * 18);
	}
	load(e) {
		this.stadium = Ge(e), this.source = e, this.core.reset(), this.terrain.disable(), this.colors = [], this.core.physics_mode(+(this.stadium.physicsMode === "substeps")), this.tick = 0, this.elapsed = 0, this.red = this.blue = 0, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0, this.countdown = 0, this.kickoffActive = !0;
		for (let e of this.stadium.discs) this.add(e);
		for (let e = 0; e < Je; e++) this.add(this.stadium.player, e + 1);
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
		].forEach((e, t) => {
			this.core.set_disc(n, t, e);
		});
	}
	index(e) {
		if (!Number.isInteger(e) || e < 0 || e >= Je) throw Error("Invalid slot");
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
		let r = Me(t), i = !1;
		for (let [t, a] of je) {
			let o = r[t];
			if (o === void 0) continue;
			let s = a === -1 ? this.colors[e] : n[e * 18 + a];
			Object.is(s, o) || (i = !0);
		}
		if (!i) return !1;
		if (r.radius !== void 0) {
			let t = r.radius;
			for (let r = 0; r < this.colors.length; r++) r !== e && (t = Math.min(t, n[r * 18 + 4]));
			We(this.stadium.physicsMode, this.stadium.discs.length, this.stadium.segments.length, this.stadium.planes.length + this.stadium.joints.length, t);
		}
		for (let [t, i] of je) {
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
		for (let e = 0; e < Je; e++) {
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
		for (let t = 0; t < Je; t++) {
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
	snapshotSurface() {
		return this.terrain.snapshot();
	}
	snapshot() {
		let e = this.snapshotSurface();
		return {
			...e.length ? { surface: e } : {},
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
		We(this.stadium.physicsMode, this.stadium.discs.length, this.stadium.segments.length, this.stadium.planes.length + this.stadium.joints.length, n), this.terrain.restore(e.surface === void 0 ? [] : e.surface), this.setKickRateLimit(e.kickRate & 255, e.kickRate >>> 8 & 255, e.kickRate >>> 16), this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.scoreLimit = e.scoreLimit, this.timeLimit = e.timeLimit, this.data.set(e.discs), this.colors = [...e.colors];
	}
};
function Xe(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isInteger)) throw Error("Invalid kick rate limit");
	return Math.max(0, Math.min(255, e)) | Math.max(0, Math.min(255, t)) << 8 | Math.max(0, Math.min(100, n)) << 16;
}
function Ze(e) {
	let t = new URL(e);
	if (!["http:", "https:"].includes(t.protocol) || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected an HTTP(S) service origin without credentials or a path");
	return t.origin;
}
function Qe(e) {
	let t = new URL(e.assets);
	if (![
		"http:",
		"https:",
		"ball2d:"
	].includes(t.protocol) || !t.host || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected a root asset origin");
	let n = Ze(e.service), r = Ze(e.public);
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
			if (!t.pathname.startsWith(`${m}/`) || t.hash) throw Error("Expected a versioned application API path");
			return t;
		}
	};
}
function $e() {
	let e = location.origin;
	return Qe({
		assets: e,
		service: e,
		public: e
	});
}
function et(e = $e()) {
	return {
		serviceOrigin: e.serviceOrigin,
		signalingResume: !0,
		createWebSocket: (e) => new WebSocket(e),
		createPeerConnection: (e) => new RTCPeerConnection(e)
	};
}
var tt = [
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
function nt(e) {
	let t = /* @__PURE__ */ new Map();
	return async (n) => {
		let r = tt.find(([e, t]) => e === n || t === n);
		if (!r) throw Error("Unknown default stadium");
		let i = t.get(r[0]);
		return i || (i = (async () => {
			let t = await e(`/stadiums/${r[0]}.hbs`);
			if (!t.ok) throw Error("Could not load stadium");
			let n = await t.text();
			return Ge(n), n;
		})(), t.set(r[0], i), i.catch(() => t.delete(r[0]))), i;
	};
}
function rt(e = $e()) {
	let t = et(e), n = (e, t) => fetch(e, t);
	return {
		network: t,
		publicOrigin: e.publicOrigin,
		request: n,
		loadEngine: async (t) => {
			let r = await n(e.asset(`/core.wasm?v=${Ne}`), { signal: t });
			if (!r.ok) throw Error("Could not load bundled physics engine");
			return Ye.create(await r.arrayBuffer(), t);
		},
		loadStadium: nt((t) => n(e.asset(t)))
	};
}
var it = {
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
}, at = class {
	peers = /* @__PURE__ */ new Map();
	allow(e, t, n = performance.now()) {
		let r = this.peers.get(e);
		r || (r = {}, this.peers.set(e, r));
		let { burst: i, perSecond: a } = it[t], o = r[t] ?? {
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
}, ot = 33554432, st = new TextEncoder();
new TextDecoder("utf-8", { fatal: !0 });
function ct(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function lt(e) {
	if (e.length > 33554432) throw Error("Replay exceeds 32 MB");
	let t = ce(e, { level: 6 }), n = new Uint8Array(16 + t.length), r = new DataView(n.buffer);
	return n.set([
		66,
		50,
		68,
		90,
		1,
		0,
		0,
		0
	]), r.setUint32(8, e.length, !0), r.setUint32(12, ct(e), !0), n.set(t, 16), n;
}
function ut(e) {
	if (typeof e == "string") {
		if (st.encode(e).length > 33554432) throw Error("Replay exceeds 32 MB");
		return st.encode(e);
	}
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t.length > 33554432) throw Error("Replay exceeds 32 MB");
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 90) return t;
	if (t.length < 17 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid compressed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0);
	if (!r || r > 33554432) throw Error("Invalid expanded replay size");
	let i = new Uint8Array(r), a = 0, o = !1, s = new Z((e, t) => {
		if (a + e.length > r) throw Error("Expanded replay exceeds declared size");
		i.set(e, a), a += e.length, o = t;
	});
	for (let e = 16; e < t.length; e += 1024) s.push(t.subarray(e, e + 1024), e + 1024 >= t.length);
	if (!o || a !== r || ct(i) !== n.getUint32(12, !0)) throw Error("Compressed replay integrity failure");
	return i;
}
var dt = [
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
	"surface"
], ft = new TextEncoder(), pt = new TextDecoder("utf-8", { fatal: !0 });
function mt(e) {
	return lt(ht(e));
}
function ht(e) {
	let { commands: t, ...n } = e, r = t.some((e) => e.kind === "surface") || e.initial.surface !== void 0 || e.checkpoints.some((e) => e.state.surface !== void 0) ? 4 : t.some((e) => e.kind === "disc") ? 3 : e.checkpoints.length ? 2 : 1, i = 0, a = e.checkpoints.map((e) => {
		let t = e.state.discs;
		if (!Array.isArray(t) || t.length > 1728 || t.some((e) => !Number.isFinite(e))) throw Error("Invalid checkpoint discs");
		i += t.length * 8;
		let n = e.state.surface;
		if (n !== void 0) {
			if (!Array.isArray(n) || n.length !== 0 && n.length !== 5389 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 4294967295)) throw Error("Invalid checkpoint surface");
			i += n.length * 4;
		}
		return {
			...e,
			state: {
				...e.state,
				discs: t.length,
				...n === void 0 ? {} : { surface: n.length }
			}
		};
	});
	if (a.length > 721) throw Error("Too many replay checkpoints");
	let o = ft.encode(JSON.stringify(r >= 2 ? {
		...n,
		checkpoints: a
	} : n));
	if (t.length > 5e5 || o.length + 16 > 33554432) throw Error("Replay exceeds bounds");
	let s = t.length * 12 + t.filter((e) => e.kind === "disc").length * 106, c = new Uint8Array(Math.min(ot, s)), l = new DataView(c.buffer), u = (e) => {
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
		let t = dt.indexOf(r < 3 && e.kind === "join" ? "team" : e.kind);
		if (e.kind === "join" && e.value !== 0 || e.kind === "team" && e.value > 2) throw Error("Invalid replay team command");
		if (t < 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31)) throw Error("Invalid replay command");
		if (p(e.tick - f), u(1), c[d++] = r >= 3 ? t : t << 5 | e.slot, r >= 3 && p(e.slot), p(r < 3 && e.kind === "join" ? 3 : e.value), e.kind === "disc") {
			let t = Me(e.properties), n = 0;
			je.forEach(([e], r) => {
				t[e] !== void 0 && (n |= 1 << r);
			}), p(n);
			for (let [e] of je) {
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
	for (let t of e.checkpoints) {
		for (let e of t.state.discs) g.setFloat64(_, e, !0), _ += 8;
		for (let e of t.state.surface ?? []) g.setUint32(_, e, !0), _ += 4;
	}
	return h.set(c.subarray(0, d), _), h;
}
function gt(e) {
	let t = ut(e);
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 80) return JSON.parse(pt.decode(t));
	if (t.length < 16 || ![
		1,
		2,
		3,
		4
	].includes(t[4]) || t[5] || t[6] || t[7]) throw Error("Invalid packed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0), i = n.getUint32(12, !0);
	if (r > t.length - 16 || i > 5e5 || i > (t.length - 16 - r) / 3) throw Error("Invalid packed replay bounds");
	let a = JSON.parse(pt.decode(t.subarray(16, 16 + r)));
	if (!a || !Number.isSafeInteger(a.initial?.tick) || a.initial.tick < 0) throw Error("Invalid replay initial tick");
	a.commands = [];
	let o = 16 + r, s = a.initial.tick;
	if (t[4] >= 2) {
		if (!Array.isArray(a.checkpoints) || a.checkpoints.length > 721) throw Error("Invalid packed checkpoints");
		let e = 0;
		for (let n of a.checkpoints) {
			let r = n?.state?.discs;
			if (typeof r != "number" || !Number.isInteger(r) || r < 0 || r > 1728) throw Error("Invalid checkpoint disc count");
			if (e += r * 8, t[4] >= 4 && n.state.surface !== void 0) {
				let t = n.state.surface;
				if (t !== 0 && t !== 5389) throw Error("Invalid checkpoint surface count");
				e += t * 4;
			}
		}
		if (e > t.length - o - i * 3) throw Error("Truncated checkpoint discs");
		for (let e of a.checkpoints) {
			let r = e.state.discs, i = Array(r);
			for (let e = 0; e < r; e++) {
				let t = n.getFloat64(o, !0);
				if (!Number.isFinite(t)) throw Error("Nonfinite checkpoint disc");
				i[e] = t, o += 8;
			}
			if (e.state.discs = i, t[4] >= 4 && e.state.surface !== void 0) {
				let t = e.state.surface, r = Array(t);
				for (let e = 0; e < t; e++) r[e] = n.getUint32(o, !0), o += 4;
				e.state.surface = r;
			}
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
		let e = t[o++], r = dt[t[4] >= 3 ? e : e >> 5];
		if (!r) throw Error("Unknown replay command");
		let i = t[4] >= 3 ? c() : e & 31, l = c();
		if (r === "disc") {
			let e = c();
			if (e > 8191) throw Error("Invalid disc property mask");
			let u = {};
			je.forEach(([r], i) => {
				if (e & 1 << i) {
					if (o + 8 > t.length) throw Error("Truncated disc properties");
					u[r] = n.getFloat64(o, !0), o += 8;
				}
			}), a.commands.push({
				tick: s,
				kind: r,
				slot: i,
				value: l,
				properties: Me(u)
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
function _t(e) {
	let t = JSON.stringify(e), n = 2166136261;
	for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return (n >>> 0).toString(16).padStart(8, "0");
}
function vt(e, t) {
	switch (t.kind) {
		case "surface":
			if (t.slot !== 0 || t.value !== 0 && t.value !== 1) throw Error("Invalid surface command");
			e.configureSurface(t.value ? {
				seed: 42,
				halfWidth: e.stadium.bg.width || e.stadium.width,
				halfHeight: e.stadium.bg.height || e.stadium.height,
				moisturePermille: 1e3
			} : null), t.value && e.setSurfaceWeather({
				rainMilliMmH: 2e5,
				temperatureMilliC: 2e4,
				humidityPermille: 1e3,
				windMilliMS: 0
			});
			break;
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
var yt = class {
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
			engine: qe,
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
				teams: De(n)
			}],
			orders: [{
				tick: r.tick,
				slots: [...this.playerOrder]
			}],
			end: r.tick,
			finalHash: _t(r)
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
			teams: De(t)
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
			properties: Me(e.properties)
		} : { ...e }), !0);
	}
	step(e) {
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + 14]);
		if (e.tick % 300 == 0) {
			let t = e.snapshot(), n = {
				tick: e.tick,
				state: t,
				hash: _t(t)
			};
			this.reserve(n) && this.replay.checkpoints.push(n);
		}
		this.replay.end = e.tick;
	}
	pack(e) {
		return this.replay.end = e.tick, this.replay.finalHash = _t(e.snapshot()), ht(this.replay);
	}
	finish(e) {
		return this.replay.end = e.tick, this.replay.finalHash = _t(e.snapshot()), new Blob([mt(this.replay)], { type: "application/x-ball2d-replay" });
	}
};
async function bt(e) {
	if (e.size > 33554432) throw Error("Replay exceeds 32 MB");
	return xt(await e.arrayBuffer());
}
function xt(e) {
	let t = gt(e);
	if (t.magic !== "B2DR" || t.version !== 1 || t.engine !== qe) throw Error("Unsupported replay engine/version");
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
			"disc",
			"surface"
		].includes(e.kind) || e.kind === "surface" && e.slot !== 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31) || !Number.isInteger(e.value) || e.value < 0 || e.value > (e.kind === "disc" || e.kind === "join" ? 0 : e.kind === "kickRate" ? 6619135 : e.kind === "timeLimit" ? 5940 : e.kind === "scoreLimit" ? 99 : e.kind === "team" ? 2 : e.kind === "pause" || e.kind === "surface" ? 1 : 31)) throw Error("Invalid replay command");
		e.kind === "disc" && (e.properties = Me(e.properties)), n = e.tick;
	}
	if (!Array.isArray(t.roster) || t.roster.length > 4096) throw Error("Invalid replay roster");
	n = t.initial.tick;
	for (let e of t.roster) {
		if (!Number.isInteger(e.tick) || e.tick < n || e.tick > t.end || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > 31 || e.name !== null && (typeof e.name != "string" || e.name.length > 24) || e.avatar !== void 0 && !Ae(e.avatar)) throw Error("Invalid roster event");
		n = e.tick;
	}
	if (t.styles !== void 0) {
		if (!Array.isArray(t.styles) || t.styles.length > 4096) throw Error("Invalid replay styles");
		let e = t.initial.tick;
		for (let n of t.styles) {
			if (!n || !Number.isInteger(n.tick) || n.tick < e || n.tick > t.end || n.teams === void 0) throw Error("Invalid replay style");
			n.teams = De(n.teams), e = n.tick;
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
var St = (e) => Number.isSafeInteger(e) && e > 0 && e <= 9e4, Ct = class {
	io;
	state = "admitted";
	currentEpoch = 0;
	membershipDeadline;
	recoveryDeadline = Infinity;
	phaseDeadline = Infinity;
	attemptId;
	retry = 0;
	timer;
	timerVersion = 0;
	transport;
	constructor(e, t) {
		if (this.io = e, !St(t)) throw RangeError("Invalid membership duration");
		this.membershipDeadline = e.now() + t, this.arm();
	}
	get epoch() {
		return this.currentEpoch;
	}
	get status() {
		return this.state;
	}
	disconnected(e) {
		e !== this.currentEpoch || this.terminal() || this.checkExpiry() || (this.state === "admitted" ? (this.recoveryDeadline = Math.min(this.io.now() + 3e4, this.membershipDeadline), this.attemptId = this.io.newAttemptId(), this.retry = 0, this.wait()) : (this.state === "connecting" || this.state === "awaiting-ack") && this.wait());
	}
	acknowledge(e, t) {
		if (e !== this.currentEpoch || this.state !== "awaiting-ack" || t !== void 0 && !St(t) || this.checkExpiry() || this.checkAttemptTimeout()) return !1;
		t !== void 0 && (this.membershipDeadline = Math.min(this.membershipDeadline, this.io.now() + t));
		let n = this.attemptId;
		if (n === void 0) return !1;
		let r = {
			attemptId: n,
			epoch: e
		};
		return this.state = "admitted", this.recoveryDeadline = Infinity, this.phaseDeadline = Infinity, this.attemptId = void 0, this.retry = 0, this.arm(), this.io.onRecovered(r), !0;
	}
	heartbeat(e, t) {
		return e !== this.currentEpoch || this.state !== "admitted" || !St(t) || this.checkExpiry() ? !1 : (this.membershipDeadline = this.io.now() + t, this.arm(), !0);
	}
	cancel() {
		this.terminal() || (this.state = "cancelled", this.clearTimer(), this.retire());
	}
	terminal() {
		return this.state === "expired" || this.state === "cancelled";
	}
	retire() {
		let e = this.transport;
		this.transport = void 0;
		try {
			e?.close();
		} catch {}
	}
	clearTimer() {
		this.timerVersion++, this.timer !== void 0 && this.io.clearTimer(this.timer), this.timer = void 0;
	}
	checkExpiry() {
		if (this.terminal()) return !0;
		let e = this.io.now(), t = e >= this.membershipDeadline;
		return !t && e < this.recoveryDeadline ? !1 : (this.state = "expired", this.clearTimer(), this.retire(), this.io.onExpired(t ? "membership" : "recovery"), !0);
	}
	checkAttemptTimeout() {
		return (this.state === "connecting" || this.state === "awaiting-ack") && this.io.now() >= this.phaseDeadline && (this.wait(), !0);
	}
	wait() {
		this.state = "waiting", this.retire();
		let e = this.io.random(), t = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : .5, n = Math.min(4e3, 250 * 2 ** Math.min(this.retry++, 4));
		this.phaseDeadline = this.io.now() + n * (.75 + t * .25), this.arm();
	}
	arm() {
		if (this.clearTimer(), this.terminal()) return;
		let e = this.timerVersion, t = Math.min(this.membershipDeadline, this.recoveryDeadline, this.phaseDeadline);
		this.timer = this.io.setTimer(() => {
			if (!(e !== this.timerVersion || this.checkExpiry())) {
				if (this.timer = void 0, this.io.now() < this.phaseDeadline) {
					this.arm();
					return;
				}
				this.state === "waiting" ? this.attempt() : this.state === "connecting" || this.state === "awaiting-ack" ? this.wait() : this.arm();
			}
		}, Math.max(0, t - this.io.now()));
	}
	attempt() {
		if (this.checkExpiry()) return;
		let e = this.attemptId;
		if (e === void 0) throw Error("Recovery attempt identity is unavailable");
		this.state = "connecting";
		let t = ++this.currentEpoch;
		this.phaseDeadline = this.io.now() + 5e3, this.arm();
		let n;
		try {
			n = this.io.createAttempt({
				attemptId: e,
				epoch: t
			}, {
				opened: () => {
					t !== this.currentEpoch || this.state !== "connecting" || this.checkExpiry() || this.checkAttemptTimeout() || (this.state = "awaiting-ack");
				},
				closed: () => this.disconnected(t)
			});
		} catch {
			t === this.currentEpoch && this.disconnected(t);
			return;
		}
		if (t === this.currentEpoch && (this.state === "connecting" || this.state === "awaiting-ack" || this.state === "admitted")) this.transport = n;
		else try {
			n.close();
		} catch {}
	}
}, wt = 2, Tt = 9e4, Et = 33;
function Dt(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && Object.keys(e).length === t.length && t.every((t) => Object.hasOwn(e, t));
}
var Ot = (e) => typeof e == "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(e), kt = (e) => typeof e == "string" && /^[0-9a-f]{64}$/.test(e), At = (e, t) => Number.isSafeInteger(e) && e >= t, jt = (e) => At(e, 1) && e <= Tt, Mt = (e) => e === "host" || e === "guest";
function Nt(e) {
	return !Dt(e, [
		"version",
		"roomGeneration",
		"secret",
		"connectionEpoch",
		"membershipValidForMs"
	]) || e.version !== wt || !Ot(e.roomGeneration) || !kt(e.secret) || !At(e.connectionEpoch, 1) || !jt(e.membershipValidForMs) ? null : {
		version: 2,
		roomGeneration: e.roomGeneration,
		secret: e.secret,
		connectionEpoch: e.connectionEpoch,
		membershipValidForMs: e.membershipValidForMs
	};
}
function Pt(e) {
	if (!Dt(e, [
		"type",
		"version",
		"roomGeneration",
		"attemptId",
		"id",
		"hostId",
		"role",
		"connectionEpoch",
		"membershipValidForMs",
		"rosterRevision",
		"members",
		"requireVerification",
		"locked"
	]) || e.type !== "resumed" || e.version !== wt || !Ot(e.roomGeneration) || !Ot(e.attemptId) || !Ot(e.id) || !Ot(e.hostId) || !Mt(e.role) || !At(e.connectionEpoch, 1) || !jt(e.membershipValidForMs) || !At(e.rosterRevision, 0) || typeof e.requireVerification != "boolean" || typeof e.locked != "boolean" || !Array.isArray(e.members) || e.members.length < 1 || e.members.length > Et) return null;
	let t = It(e.members, e.hostId);
	return t?.some((t) => t.id === e.id && t.role === e.role && t.attached && t.connectionEpoch === e.connectionEpoch) ? {
		type: "resumed",
		version: 2,
		roomGeneration: e.roomGeneration,
		attemptId: e.attemptId,
		id: e.id,
		hostId: e.hostId,
		role: e.role,
		connectionEpoch: e.connectionEpoch,
		membershipValidForMs: e.membershipValidForMs,
		rosterRevision: e.rosterRevision,
		members: t,
		requireVerification: e.requireVerification,
		locked: e.locked
	} : null;
}
function Ft(e) {
	if (!Dt(e, [
		"type",
		"id",
		"hostId",
		"role",
		"resumeGrant",
		"rosterRevision",
		"members",
		"requireVerification",
		"locked"
	]) || e.type !== "ready") return null;
	let t = Nt(e.resumeGrant);
	if (!t) return null;
	let n = Pt({
		type: "resumed",
		version: 2,
		roomGeneration: t.roomGeneration,
		attemptId: t.roomGeneration,
		id: e.id,
		hostId: e.hostId,
		role: e.role,
		connectionEpoch: t.connectionEpoch,
		membershipValidForMs: t.membershipValidForMs,
		rosterRevision: e.rosterRevision,
		members: e.members,
		requireVerification: e.requireVerification,
		locked: e.locked
	});
	return n ? {
		type: "ready",
		id: n.id,
		hostId: n.hostId,
		role: n.role,
		resumeGrant: t,
		rosterRevision: n.rosterRevision,
		members: n.members,
		requireVerification: n.requireVerification,
		locked: n.locked
	} : null;
}
function It(e, t) {
	if (!Array.isArray(e) || e.length < 1 || e.length > Et) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (!Dt(t, [
			"id",
			"role",
			"attached",
			"connectionEpoch"
		]) || !Ot(t.id) || !Mt(t.role) || typeof t.attached != "boolean" || !At(t.connectionEpoch, 1) || r.has(t.id)) return null;
		r.add(t.id), n.push({
			id: t.id,
			role: t.role,
			attached: t.attached,
			connectionEpoch: t.connectionEpoch
		});
	}
	let i = n.filter((e) => e.role === "host");
	return i.length === 1 && i[0].id === t ? n : null;
}
function Lt(e) {
	if (!Dt(e, [
		"type",
		"roomGeneration",
		"hostId",
		"rosterRevision",
		"members"
	]) || e.type !== "roster" || !Ot(e.roomGeneration) || !Ot(e.hostId) || !At(e.rosterRevision, 0)) return null;
	let t = It(e.members, e.hostId);
	return t ? {
		type: "roster",
		roomGeneration: e.roomGeneration,
		hostId: e.hostId,
		rosterRevision: e.rosterRevision,
		members: t
	} : null;
}
function Rt(e) {
	let t = [...e], n = new Set(t.filter((e) => e.type === "transport" && e.selectedCandidatePairId).map((e) => e.selectedCandidatePairId)), r = t.filter((e) => e.type === "candidate-pair" && e.state === "succeeded"), i = n.size ? r.filter((e) => n.has(e.id)) : r.filter((e) => e.nominated === !0);
	if (i.length !== 1) return null;
	let a = i[0].currentRoundTripTime;
	return typeof a == "number" && Number.isFinite(a) && a >= 0 ? a * 1e3 : null;
}
var zt = 524288, Bt = 16384, Vt = 12;
function Ht(e, t) {
	let n = JSON.stringify(e);
	if (n === void 0) throw Error("Missing control message");
	let r = new TextEncoder().encode(n);
	if (r.length > zt) throw Error("Control message exceeds 512 KB");
	if (r.length <= Bt) return [n];
	let i = Math.ceil(r.length / Bt), a = [];
	for (let e = 0; e < i; e++) {
		let n = r.subarray(e * Bt, (e + 1) * Bt), o = new ArrayBuffer(Vt + n.length), s = new DataView(o);
		s.setUint16(0, 45635), s.setUint8(2, 1), s.setUint32(4, t, !0), s.setUint16(8, e, !0), s.setUint16(10, i, !0), new Uint8Array(o, Vt).set(n), a.push(o);
	}
	return a;
}
var Ut = class {
	partial;
	push(e, t = performance.now()) {
		if (typeof e == "string") {
			if (this.partial || new TextEncoder().encode(e).length > Bt) throw Error("Invalid control message");
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
		if (o.next++, o.bytes += e.byteLength - Vt, o.bytes > zt) throw Error("Control size limit");
		if (o.parts.push(new Uint8Array(e.slice(Vt))), o.next !== a) return;
		let s = new Uint8Array(o.bytes), c = 0;
		for (let e of o.parts) s.set(e, c), c += e.length;
		return this.partial = void 0, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s));
	}
}, Wt = class extends Error {}, Gt = 1, Kt = (e) => typeof e == "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(e), qt = (e) => Number.isSafeInteger(e) && e > 0, Jt = (e) => e?.match(/(?:^|\r?\n)a=ice-ufrag:([^\s]+)/)?.[1], Yt = (e) => e.usernameFragment ?? e.candidate?.match(/(?:^| )ufrag ([^ ]+)/)?.[1], Xt = class {
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
	resumeGrant;
	recovery;
	resumeAttempt;
	socketSerial = 0;
	requestSentAt = 0;
	rosterRevision = -1;
	members = /* @__PURE__ */ new Map();
	lockedState = null;
	get locked() {
		return this.lockedState;
	}
	heartbeatSequence = 0;
	heartbeatRequest;
	heartbeatTimer;
	heartbeatTimerVersion = 0;
	heartbeatDeadline = 0;
	cancelHeartbeat() {
		clearTimeout(this.heartbeatTimer), this.heartbeatTimer = void 0, this.heartbeatTimerVersion++, this.heartbeatRequest = void 0;
	}
	armHeartbeat(e) {
		clearTimeout(this.heartbeatTimer);
		let t = ++this.heartbeatTimerVersion;
		this.heartbeatTimer = setTimeout(() => {
			t === this.heartbeatTimerVersion && (this.heartbeatTimer = void 0, this.sendHeartbeat());
		}, e);
	}
	scheduleHeartbeat(e, t) {
		this.cancelHeartbeat();
		let n = performance.now() + e;
		this.heartbeatDeadline = t ? n : Math.min(this.heartbeatDeadline, n);
		let r = this.heartbeatDeadline - performance.now();
		r > 0 && this.signalingReady && this.armHeartbeat(Math.max(1, Math.floor(Math.min(3e4, r / 3))));
	}
	sendHeartbeat() {
		let e = this.heartbeatDeadline - performance.now();
		if (!this.signalingReady || !this.resumeGrant || !this.recovery || e <= 0) return;
		this.heartbeatRequest ??= {
			id: ++this.heartbeatSequence,
			sentAt: performance.now(),
			localEpoch: this.recovery.epoch,
			transmissions: 0,
			retryDelay: Math.max(1, Math.floor(Math.min(5e3, e / 3)))
		};
		let t = this.heartbeatRequest;
		if (!(t.transmissions >= 3)) {
			t.transmissions++;
			try {
				this.signal({
					type: "heartbeat",
					requestId: t.id,
					connectionEpoch: this.resumeGrant.connectionEpoch
				});
			} catch {}
			this.heartbeatRequest === t && this.signalingReady && t.transmissions < 3 && t.retryDelay < e && this.armHeartbeat(t.retryDelay);
		}
	}
	get signalingReady() {
		return !this.closed && !!this.id && this.ws.readyState === Gt && this.signalingAdmitted;
	}
	get signalingAdmitted() {
		return !this.recovery || this.recovery.status === "admitted";
	}
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
		return typeof e == "boolean" ? this.closed || !this.host || !this.signalingAdmitted || this.ws.readyState !== Gt ? Promise.reject(Error("An active room-owner connection is required.")) : this.verificationRequest ? Promise.reject(Error("A verification update is already pending.")) : new Promise((t, n) => {
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
		return e !== null && (typeof e != "string" || e.length > 64) ? Promise.reject(Error("Password must contain at most 64 characters.")) : this.closed || !this.host || !this.signalingAdmitted || this.ws.readyState !== Gt ? Promise.reject(Error("An active room-owner connection is required.")) : this.passwordRequest ? Promise.reject(Error("A password update is already pending.")) : new Promise((t, n) => {
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
		n && (this.banRequest = void 0, clearTimeout(n.timer), n.reject(t ? new Wt(e) : Error(e)));
	}
	updateBan(e, t, n) {
		return this.closed || !this.host || !this.signalingAdmitted || this.ws.readyState !== Gt ? Promise.reject(Error("An active room-owner connection is required.")) : this.banRequest ? Promise.reject(Error("A ban operation is already pending.")) : new Promise((r, i) => {
			let a = ++this.banSequence, o = setTimeout(() => this.rejectBan("Ban operation was not confirmed."), 1e4);
			this.banRequest = {
				id: a,
				resolve: r,
				reject: i,
				timer: o
			};
			try {
				this.signal({
					type: e,
					id: t,
					requestId: a,
					...e === "ban" && n !== void 0 ? { reason: n } : {}
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
	constructor(e, t, n, r = et()) {
		this.room = e, this.credentials = t, this.hooks = n, this.runtime = r;
		let i = new URL(h.signal(e), Ze(r.serviceOrigin));
		i.protocol = i.protocol === "https:" ? "wss:" : "ws:", this.ws = r.createWebSocket(i), this.attachSocket(this.ws, () => {
			this.requestSentAt = performance.now(), this.signal({
				type: "hello",
				...t,
				...r.signalingResume ? { signalingVersion: 2 } : {}
			});
		}, 0), this.timer = setInterval(() => {
			!this.resumeGrant && this.signalingAdmitted && this.ws.readyState === Gt && performance.now() - this.lastHeartbeat >= 3e4 && (this.signal({ type: "heartbeat" }), this.lastHeartbeat = performance.now());
			for (let e of this.peers.values()) {
				if (!e.connected && performance.now() - e.created > 2e4) {
					n.status("Direct connection failed. This network pair may require a relay; this game does not use TURN."), this.remove(e.id);
					continue;
				}
				e.lostAt !== void 0 && (performance.now() - e.lostAt > 2e4 ? (n.status("The direct connection could not be recovered. Rejoin the room."), this.remove(e.id)) : this.host && performance.now() - e.lastRestart > 5e3 && this.restartPeer(e.id));
			}
		}, 5e3);
	}
	attachSocket(e, t, n) {
		let r = ++this.socketSerial, i = () => !this.closed && this.ws === e && this.socketSerial === r;
		e.onopen = () => {
			i() && t();
		}, e.onmessage = (e) => {
			i() && (this.signalQueue = this.signalQueue.then(async () => {
				i() && await this.message(JSON.parse(e.data), r);
			}).catch(() => {
				i() && this.hooks.status("Connection negotiation failed. Try another room or network.");
			}));
		}, e.onclose = (e) => {
			if (i()) {
				if (this.socketSerial++, this.challenge?.abort(), this.cancelHeartbeat(), this.rejectVerification("Signaling disconnected before verification confirmation."), this.rejectBan("Signaling disconnected before ban confirmation."), this.rejectPasswordUpdate("Signaling disconnected before password confirmation."), this.recovery && this.resumeGrant && ![
					1e3,
					1008,
					1009
				].includes(e.code)) {
					this.recovery.disconnected(n), this.hooks.status("Signaling interrupted. Reconnecting…");
					return;
				}
				if (!this.id || this.recovery || [
					1001,
					1008,
					1009
				].includes(e.code)) {
					this.close(), this.hooks.ended?.(e.reason || "Room connection ended.");
					return;
				}
				this.hooks.status(e.reason || "Signaling disconnected. Established matches can continue; new joins are unavailable.");
			}
		}, e.onerror = () => {
			i() && this.hooks.status("Room service is unavailable.");
		};
	}
	startRecovery(e) {
		let t = Math.floor(e.membershipValidForMs - (performance.now() - this.requestSentAt));
		if (t <= 0) {
			this.close(), this.hooks.ended?.("Room membership expired.");
			return;
		}
		this.resumeGrant = e, this.recovery = new Ct({
			now: () => performance.now(),
			setTimer: (e, t) => setTimeout(e, t),
			clearTimer: (e) => clearTimeout(e),
			random: () => Math.random(),
			newAttemptId: () => crypto.randomUUID(),
			createAttempt: (e, t) => {
				this.resumeAttempt = e;
				let n = new URL(h.signal(this.room), Ze(this.runtime.serviceOrigin));
				n.protocol = n.protocol === "https:" ? "wss:" : "ws:";
				let r = this.runtime.createWebSocket(n);
				return this.ws = r, this.attachSocket(r, () => {
					t.opened();
					let n = this.resumeGrant;
					this.recovery?.status === "awaiting-ack" && n && (this.requestSentAt = performance.now(), r.send(JSON.stringify({
						type: "resume",
						version: 2,
						roomGeneration: n.roomGeneration,
						peerId: this.id,
						secret: n.secret,
						attemptId: e.attemptId,
						expectedEpoch: n.connectionEpoch
					})));
				}, e.epoch), { close: () => {
					this.ws === r && this.socketSerial++, r.onopen = null, r.onmessage = null, r.onclose = null, r.onerror = null, r.close();
				} };
			},
			onExpired: () => {
				this.close(), this.hooks.ended?.("Room signaling recovery expired.");
			},
			onRecovered: () => {}
		}, t), this.scheduleHeartbeat(t, !0);
	}
	signal(e) {
		!this.closed && this.signalingAdmitted && this.ws.readyState === Gt && this.ws.send(JSON.stringify(e));
	}
	async message(e, t = this.socketSerial) {
		if (this.closed || t !== this.socketSerial) return;
		if (e.type === "terminal") {
			this.close(), this.hooks.ended?.(typeof e.reason == "string" && e.reason.length <= 123 ? e.reason : "Room connection ended.");
			return;
		}
		if (e.type === "resumed") {
			let n = Pt(e), r = this.resumeGrant, i = this.resumeAttempt;
			if (!n || !r || !i || !this.recovery || n.roomGeneration !== r.roomGeneration || n.attemptId !== i.attemptId || n.id !== this.id || n.hostId !== this.hostId || n.role === "host" !== this.host || n.connectionEpoch <= r.connectionEpoch || n.rosterRevision < this.rosterRevision || n.members.some((e) => e.connectionEpoch < (this.members.get(e.id)?.connectionEpoch ?? 0))) return;
			let a = Math.floor(n.membershipValidForMs - (performance.now() - this.requestSentAt));
			if (a <= 0 || !this.recovery.acknowledge(i.epoch, a)) return;
			this.resumeGrant = {
				...r,
				connectionEpoch: n.connectionEpoch,
				membershipValidForMs: a
			}, this.resumeAttempt = void 0, this.scheduleHeartbeat(a, !1), this.verificationState = n.requireVerification, this.lockedState = n.locked, this.reconcile(n.members, n.rosterRevision, t), this.hooks.status("Room signaling restored.");
			return;
		}
		if (e.type === "heartbeat" && this.resumeGrant && this.recovery) {
			let t = this.heartbeatRequest;
			if (!t || e.requestId !== t.id || e.connectionEpoch !== this.resumeGrant.connectionEpoch || typeof e.membershipValidForMs != "number" || !Number.isSafeInteger(e.membershipValidForMs) || e.membershipValidForMs < 1 || e.membershipValidForMs > 9e4) return;
			let n = Math.floor(e.membershipValidForMs - (performance.now() - t.sentAt));
			n > 0 && this.recovery.heartbeat(t.localEpoch, n) && this.scheduleHeartbeat(n, !0);
			return;
		}
		if (this.recovery && !this.signalingAdmitted) return;
		if (e.type === "roster" && this.resumeGrant) {
			let n = Lt(e);
			if (!n || n.roomGeneration !== this.resumeGrant.roomGeneration || n.hostId !== this.hostId || n.rosterRevision <= this.rosterRevision) return;
			let r = n.members.find((e) => e.id === this.id);
			if (!r?.attached || r.connectionEpoch !== this.resumeGrant.connectionEpoch || r.role === "host" !== this.host) {
				this.close(), this.hooks.ended?.("Room membership ended.");
				return;
			}
			if (n.members.some((e) => e.connectionEpoch < (this.members.get(e.id)?.connectionEpoch ?? 0))) return;
			this.reconcile(n.members, n.rosterRevision, t);
			return;
		}
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
				if (t.signal.aborted || this.closed || this.ws.readyState !== Gt) return;
				if (typeof n != "string" || n.length === 0 || n.length > 2048) throw Error("Invalid verification response.");
				this.requestSentAt = performance.now(), this.signal({
					type: "hello",
					...this.credentials,
					verificationToken: n,
					...this.runtime.signalingResume ? { signalingVersion: 2 } : {}
				});
			} catch (e) {
				this.closed || (this.close(), this.hooks.ended?.(e instanceof Error ? e.message : "Room verification failed."));
			} finally {
				this.challenge === t && (this.challenge = void 0);
			}
			return;
		}
		if (e.type === "passwordUpgradeRequired" && this.host) {
			this.hooks.status("Update the room password or explicitly unlock it to allow new guests.");
			return;
		}
		if (e.type === "passwordUpdated" && e.ok === !1 && this.passwordRequest?.id === e.requestId) {
			this.rejectPasswordUpdate(typeof e.error == "string" ? e.error : "Password update failed.");
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
			if (this.id) return;
			if (this.runtime.signalingResume && e.resumeGrant !== void 0) {
				let t = Ft(e);
				if (!t) {
					this.close(), this.hooks.ended?.("Invalid room admission.");
					return;
				}
				if (this.id = t.id, this.host = t.role === "host", this.hostId = t.hostId, this.verificationState = t.requireVerification, this.lockedState = t.locked, this.startRecovery(t.resumeGrant), this.closed) return;
				this.members = new Map(t.members.map((e) => [e.id, e])), this.rosterRevision = t.rosterRevision;
			} else this.id = e.id, this.host = e.role === "host", this.hostId = e.hostId, this.verificationState = typeof e.requireVerification == "boolean" ? e.requireVerification : null;
			this.hooks.ready(this.id, this.host), this.resumeGrant && this.reconcile([...this.members.values()], this.rosterRevision, t);
			return;
		}
		if (e.type === "peer" || e.type === "leave") {
			if (this.resumeGrant) {
				if (!Kt(e.id) || !qt(e.connectionEpoch) || typeof e.rosterRevision != "number" || !Number.isSafeInteger(e.rosterRevision) || e.rosterRevision <= this.rosterRevision || e.id === this.id) return;
				let t = this.members.get(e.id);
				if (t && e.connectionEpoch < t.connectionEpoch) return;
				this.rosterRevision = e.rosterRevision, e.type === "peer" ? this.members.set(e.id, {
					id: e.id,
					role: e.id === this.hostId ? "host" : "guest",
					attached: !0,
					connectionEpoch: e.connectionEpoch
				}) : this.members.delete(e.id);
			}
			if (e.type === "leave") {
				this.remove(e.id, !1);
				return;
			}
			this.host && !this.peers.has(e.id) && await this.offerPeer(e.id, t);
			return;
		}
		if (e.type !== "signal" || this.resumeGrant && (!Kt(e.negotiationId) || e.toConnectionEpoch !== this.resumeGrant.connectionEpoch || e.fromConnectionEpoch !== this.members.get(e.from)?.connectionEpoch || !this.members.get(e.from)?.attached)) return;
		let n = this.peers.get(e.from);
		if (!n) {
			if (this.host || e.from !== this.hostId || !["offer", "candidate"].includes(e.signal.type)) return;
			n = this.make(e.from);
		}
		if (this.resumeGrant) {
			if (!Kt(e.negotiationId)) return;
			if (e.signal.type === "offer") {
				if (this.host || !Jt(e.signal.sdp)) return;
				n.negotiationId !== e.negotiationId && (n.candidates = []), this.beginNegotiation(n, e.negotiationId), n.remoteIceUfrag = Jt(e.signal.sdp), n.localIceUfrag = void 0;
			} else if (e.signal.type === "candidate" && !n.negotiationId && !this.host) this.beginNegotiation(n, e.negotiationId);
			else if (n.negotiationId !== e.negotiationId) return;
			if (n.negotiationLocalEpoch !== e.toConnectionEpoch || n.negotiationRemoteEpoch !== e.fromConnectionEpoch) return;
			if (e.signal.type === "answer") {
				if (!Jt(e.signal.sdp)) return;
				n.remoteIceUfrag = Jt(e.signal.sdp);
			}
		}
		let r = n, i = r.negotiationId, a = () => this.current(r) && t === this.socketSerial && this.signalingAdmitted && r.negotiationId === i && this.negotiationCurrent(r);
		if (e.signal.type === "offer") {
			if (this.host) throw Error("Only the host can offer");
			if (await n.pc.setRemoteDescription({
				type: "offer",
				sdp: e.signal.sdp
			}), !a() || (await this.flushCandidates(n, a), !a())) return;
			let t = await n.pc.createAnswer();
			if (!a() || (n.localIceUfrag = Jt(t.sdp), await n.pc.setLocalDescription(t), !a())) return;
			this.peerSignal(n, {
				type: "answer",
				sdp: this.localSdp(n)
			});
		} else if (e.signal.type === "answer") {
			if (!this.host) throw Error("Only guests can answer");
			if (await n.pc.setRemoteDescription({
				type: "answer",
				sdp: e.signal.sdp
			}), !a()) return;
			await this.flushCandidates(n, a), this.noteHealthy(n);
		} else if (e.signal.type === "candidate" && e.signal.candidate) {
			if (this.resumeGrant && (!Yt(e.signal.candidate) || n.remoteIceUfrag && Yt(e.signal.candidate) !== n.remoteIceUfrag)) return;
			if (!n.pc.remoteDescription) this.queueCandidate(n, e.signal.candidate);
			else try {
				await n.pc.addIceCandidate(e.signal.candidate);
			} catch {
				a() && this.queueCandidate(n, e.signal.candidate);
			}
		}
	}
	reconcile(e, t, n) {
		this.members = new Map(e.map((e) => [e.id, e])), this.rosterRevision = t;
		for (let e of [...this.peers.keys()]) this.members.has(e) || this.remove(e, !1);
		if (this.host) for (let t of e) t.id !== this.id && t.attached && !this.peers.has(t.id) && this.offerPeer(t.id, n).catch(() => {
			!this.closed && n === this.socketSerial && this.hooks.status("Connection negotiation failed.");
		});
	}
	negotiationCurrent(e) {
		return !this.resumeGrant || e.negotiationLocalEpoch === this.resumeGrant.connectionEpoch && e.negotiationRemoteEpoch === this.members.get(e.id)?.connectionEpoch && this.members.get(e.id)?.attached === !0;
	}
	beginNegotiation(e, t) {
		e.negotiationId = t, e.negotiationLocalEpoch = this.resumeGrant?.connectionEpoch, e.negotiationRemoteEpoch = this.members.get(e.id)?.connectionEpoch;
	}
	peerSignal(e, t) {
		let n = this.resumeGrant, r = this.members.get(e.id);
		(!n || r?.attached && e.negotiationId && this.signalingAdmitted && e.negotiationLocalEpoch === n.connectionEpoch && e.negotiationRemoteEpoch === r.connectionEpoch) && this.signal({
			type: "signal",
			to: e.id,
			signal: t,
			...n && r ? {
				fromConnectionEpoch: n.connectionEpoch,
				toConnectionEpoch: r.connectionEpoch,
				negotiationId: e.negotiationId
			} : {}
		});
	}
	async offerPeer(e, t) {
		let n = this.make(e);
		this.bind(n, n.pc.createDataChannel("control", { ordered: !0 })), this.bind(n, n.pc.createDataChannel("realtime", {
			ordered: !1,
			maxRetransmits: 0
		})), this.resumeGrant && this.beginNegotiation(n, crypto.randomUUID());
		let r = n.negotiationId, i = () => this.current(n) && t === this.socketSerial && this.signalingAdmitted && n.negotiationId === r && this.negotiationCurrent(n), a = await n.pc.createOffer();
		i() && (n.localIceUfrag = Jt(a.sdp), await n.pc.setLocalDescription(a), i() && this.peerSignal(n, {
			type: "offer",
			sdp: this.localSdp(n)
		}));
	}
	localSdp(e) {
		let t = e.pc.localDescription;
		if (!t) throw Error("Local peer description is unavailable");
		return t.sdp;
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
	async flushCandidates(e, t = () => this.current(e)) {
		let n = e.candidates.splice(0);
		for (let r of n) {
			if (!t()) return;
			if (!this.resumeGrant || e.remoteIceUfrag && Yt(r) === e.remoteIceUfrag) try {
				await e.pc.addIceCandidate(r);
			} catch {}
		}
	}
	async restartPeer(e) {
		let t = this.peers.get(e);
		if (this.closed || !this.host || !t || t.restarting || t.restarts >= 2 || t.pc.signalingState !== "stable" || !this.signalingAdmitted || this.ws.readyState !== Gt) return !1;
		let n = this.socketSerial;
		this.resumeGrant && (this.beginNegotiation(t, crypto.randomUUID()), t.localIceUfrag = void 0, t.remoteIceUfrag = void 0, t.candidates = []);
		let r = t.negotiationId, i = () => this.current(t) && n === this.socketSerial && this.signalingAdmitted && t.negotiationId === r && this.negotiationCurrent(t);
		t.restarting = !0, t.lastRestart = performance.now(), t.lostAt ??= t.lastRestart, t.restarts++;
		try {
			let e = await t.pc.createOffer({ iceRestart: !0 });
			return !i() || (t.localIceUfrag = Jt(e.sdp), await t.pc.setLocalDescription(e), !i()) ? !1 : (this.peerSignal(t, {
				type: "offer",
				sdp: this.localSdp(t)
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
		this.peers.set(e, n), t.onicecandidate = (e) => {
			if (!this.current(n) || !e.candidate || !this.signalingAdmitted) return;
			let t = e.candidate.toJSON();
			(!this.resumeGrant || n.localIceUfrag && Yt(t) === n.localIceUfrag) && this.peerSignal(n, {
				type: "candidate",
				candidate: t
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
						r || (r = new Ut(), this.controlAssemblers.set(e.id, r));
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
		let n = Ht(t, this.controlId++), r = n.reduce((e, t) => e + (typeof t == "string" ? new TextEncoder().encode(t).length : t.byteLength), 0);
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
						!this.closed && this.peers.get(e.id) === e && (e.rtt = Rt(t.values()));
					} catch {
						e.rtt = null;
					}
				}));
			} finally {
				this.pollingStats = !1;
			}
		}
	}
	hostCloseTimer;
	remove(e, t = !0) {
		let n = this.peers.get(e);
		if (n && (clearTimeout(n.admissionTimer), this.peers.delete(e), this.controlAssemblers.delete(e), n.pc.close(), this.host && t && this.signal({
			type: "evict",
			id: e
		}), this.hooks.leave(e), !this.host)) {
			let e = () => {
				this.close(), this.hooks.ended?.("The host connection ended.");
			};
			this.signalingAdmitted && this.ws.readyState === Gt ? this.hostCloseTimer = setTimeout(e, 1e3) : e();
		}
	}
	close() {
		if (!this.closed) {
			clearTimeout(this.hostCloseTimer), this.hostCloseTimer = void 0, this.resumeGrant && this.signalingAdmitted && this.ws.readyState === Gt && this.signal({
				type: "leave",
				connectionEpoch: this.resumeGrant.connectionEpoch
			}), this.recovery?.cancel(), this.resumeGrant = void 0, this.resumeAttempt = void 0, this.cancelHeartbeat(), this.socketSerial++, this.challenge?.abort(), this.rejectVerification("Room closed before verification confirmation."), this.verificationState = null, this.rejectBan("Room closed before ban confirmation."), this.rejectPasswordUpdate("Room closed before password confirmation."), this.closed = !0, clearInterval(this.timer), this.ws.close(1e3, "Left room");
			for (let e of this.peers.values()) clearTimeout(e.admissionTimer), e.pc.close();
			this.peers.clear(), this.controlAssemblers.clear();
		}
	}
}, Zt = 5;
function Qt(e, t) {
	return e !== t && e - t >>> 0 < 2147483648;
}
function $t(e) {
	if (e.byteLength !== 14) throw Error("Input length");
	let t = new DataView(e);
	if (t.getUint8(0) !== 1 || t.getUint8(1) !== Zt || t.getUint8(6) > 31 || t.getUint8(7)) throw Error("Input format");
	return {
		seq: t.getUint32(2, !0),
		keys: t.getUint8(6),
		time: t.getUint32(8, !0),
		epoch: t.getUint16(12, !0)
	};
}
function en(e, t, n = 0) {
	if (e.surface?.length) throw Error("Terrain transport is not enabled");
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
		a.setUint8(0, 2), a.setUint8(1, Zt), a.setUint32(2, e.tick, !0), a.setUint8(6, t), a.setUint8(7, l), a.setUint16(8, n, !0), a.setUint16(10, r.length, !0), new Uint8Array(i, 12).set(r), c.push(i);
	}
	return c;
}
var tn = Object.freeze({ ...Fe }), nn = class e {
	runtime;
	engine;
	network;
	roomId = "";
	roomLink = "";
	roomName = "";
	epoch = 0;
	kickStream = new be();
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
	traffic = new at();
	onRoomLink;
	onPlayerJoin;
	onPlayerTeamChange;
	onPlayerMuteChange;
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
	static async create(t, n = rt(), r) {
		let i = Ze(n.network.serviceOrigin), a = Ze(n.publicOrigin ?? i);
		if (t = Ce(t), t.noPlayer !== void 0 && typeof t.noPlayer != "boolean") throw Error("Invalid noPlayer setting");
		let o = t.noPlayer === !1, s = t.playerName ?? "Host";
		if (o && (typeof s != "string" || !s.trim() || s.length > 24)) throw Error("Invalid host player name");
		let c = ve(r), l;
		try {
			c.signal.throwIfAborted();
			let r = await c.run(n.loadEngine(c.signal));
			r.load(t.stadium ?? Ke()), l = new e(r, n);
			let u = l, d = await c.run(n.request(new URL(h.rooms, i), {
				signal: c.signal,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: t.roomName,
					maxPlayers: t.maxPlayers ?? 16,
					password: t.password ?? "",
					private: t.public === !1,
					hostPlayer: o
				})
			}));
			if (!d.ok) throw await c.run(ye(d, c.signal));
			let f = await c.run(d.json());
			u.roomId = f.id, u.roomName = t.roomName, u.roomLink = `${a}${Te(f.id)}`;
			let p;
			try {
				await c.run(new Promise((e, t) => {
					p = setTimeout(() => t(Error("Signaling timed out")), 12e3), u.network = new Xt(f.id, { hostToken: f.hostToken }, {
						ready: (n, r) => {
							if (!r) {
								t(Error("Host authority was not granted"));
								return;
							}
							o && (u.players.push({
								id: u.nextPlayerId++,
								slot: 0,
								peerId: n,
								name: s.trim(),
								team: 0,
								admin: !0
							}), u.engine.joinPlayer(0)), clearTimeout(p), e();
						},
						allowStadiumUpload: (e) => !!u.players.find((t) => t.peerId === e.id)?.admin && ["lobby", "finished"].includes(u.engine.phase) && u.traffic.allow(e.id, "message"),
						open: () => {},
						control: (e, t) => u.control(e, t),
						fast: (e, t) => u.fast(e, t),
						leave: (e) => u.leave(e),
						status: (e) => u.report(e),
						ended: (e) => {
							clearTimeout(p), t(Error(e)), u.close(), u.report(e);
						}
					}, n.network);
				}));
			} catch (e) {
				throw u.close(), e;
			} finally {
				clearTimeout(p);
			}
			if (u.closed) throw Error("Room closed during startup");
			u.last = performance.now(), u.loop = setInterval(() => u.advance(), 1e3 / 60);
			let m = u.roomLink;
			return u.linkNotification = setTimeout(() => {
				u.linkNotification = void 0, u.invoke("onRoomLink", u.onRoomLink, m);
			}, 0), l;
		} catch (e) {
			throw l?.close(), e;
		} finally {
			c.dispose();
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
				this.engine.step(), this.kickStream.capture(this.engine, this.epoch), this.recorder?.step(this.engine), this.engine.phase !== r && this.state();
				let i = r === "goal" && this.engine.phase === "playing", a = r === "finished" && this.engine.phase === "lobby", o = this.engine.red > t, s = this.engine.blue > n, c = this.engine.ballKicks.map((e) => {
					let t = this.players.find((t) => t.slot === e);
					return t ? this.playerCopy(t) : null;
				}).filter((e) => !!e), l = r !== "finished" && this.engine.phase === "finished" ? this.getScores() : null;
				a && this.invoke("onGameStop", this.onGameStop, null), l && (this.invoke("onTeamVictory", this.onTeamVictory, { ...l }), this.invoke("onGameVictory", this.onGameVictory, { ...l }));
				for (let e of c) this.invoke("onPlayerBallKick", this.onPlayerBallKick, e);
				if (o && this.invoke("onTeamGoal", this.onTeamGoal, 1), s && this.invoke("onTeamGoal", this.onTeamGoal, 2), i && this.invoke("onPositionsReset", this.onPositionsReset), this.closed) break;
				if (this.engine.tick % 2 == 0) {
					let e = this.engine.snapshot();
					if (e.surface?.length) {
						if (this.engine.tick % 6 == 0) {
							let t = _e(e, this.epoch);
							for (let e of this.network.peers.values()) e.control?.readyState === "open" && e.control.bufferedAmount < 65536 && this.network.control(e, {
								...t,
								ack: this.inputs.get(e.id)?.seq ?? 0
							});
						}
					} else for (let t of this.network.peers.values()) for (let n of en(e, this.inputs.get(t.id)?.seq ?? 0, this.epoch)) this.network.fast(t, n);
				}
				this.accumulator -= 1e3 / 60;
			}
			this.closed || xe(this.network, this.kickStream.drain(e));
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
			if (n.version !== 1 || n.engine !== qe || typeof n.name != "string" || !n.name.trim() || n.name.length > 24) {
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
				kickStream: this.kickStream.checkpoint(),
				epoch: this.epoch,
				roomName: this.roomName,
				engine: qe,
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
				if (r.muted || !n.text.trim() || !this.traffic.allow(e.id, "chat") || (this.invoke("onPlayerActivity", this.onPlayerActivity, this.playerCopy(r)), this.closed || !this.players.includes(r))) return;
				this.invoke("onPlayerChat", this.onPlayerChat, this.playerCopy(r), n.text) !== !1 && !this.closed && this.players.includes(r) && !r.muted && this.network.broadcast({
					type: "chat",
					name: r.name,
					text: n.text
				});
			}
			if (n.action === "chat" || this.traffic.allow(e.id, "action")) {
				if (n.action === "avatar" && Ae(n.avatar)) {
					r.avatar = n.avatar, this.recorder?.player(this.engine.tick, r.slot, r.name, r.avatarOverride ?? r.avatar), this.sync();
					return;
				}
				if (n.action === "team" && l(n.team)) {
					let e = n.slot === void 0 ? r : this.players.find((e) => e.slot === n.slot);
					f(r, e, this.locked) && this.changeTeam(e.id, n.team, r);
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
					if (n.action === "mute" && typeof n.muted == "boolean") {
						let e = this.players.find((e) => e.slot === n.slot);
						p(r, e, (e) => e.peerId === this.network.hostId) && this.changePlayerMuted(e.id, n.muted, this.playerCopy(r));
						return;
					}
					if (n.action === "surface" && typeof n.enabled == "boolean" && ["lobby", "finished"].includes(this.engine.phase)) {
						this.setSurfaceEnabled(n.enabled);
						return;
					}
					if (n.action === "ban" || n.action === "clearBans") {
						let t = this.players.find((e) => e.slot === n.slot);
						if (n.action === "ban" && !p(r, t, (e) => e.peerId === this.network.hostId)) return;
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
						if (!t) return;
						this.banPlayer(t.id, "Removed by admin", this.playerCopy(r)).then(() => i("Player banned.")).catch((e) => i(e instanceof Error ? e.message : "Moderation failed."));
						return;
					}
					if (n.action === "teamColors" && (n.team === 1 || n.team === 2)) {
						let e = n.palette;
						this.changeTeamColors(n.team, e === null ? null : Ee(e.angle, e.textColor, e.colors));
					}
					if (n.action === "kickRate" && Number.isInteger(n.value) && Number(n.value) >= 0 && Number(n.value) <= 6619135) {
						let e = Number(n.value);
						this.changeKickRateLimit(e & 255, e >>> 8 & 255, e >>> 16, this.playerCopy(r));
					}
					if (n.action === "start" && this.beginGame(r), n.action === "stop" && this.endGame(r), n.action === "pause" && (n.paused === void 0 || typeof n.paused == "boolean") && this.changePause(n.paused === void 0 ? !this.engine.paused : n.paused, this.playerCopy(r)), n.action === "settings" && ["lobby", "finished"].includes(this.engine.phase)) {
						let e = d(n);
						if (e) {
							if (this.setScoreLimit(e.score), this.setTimeLimit(e.minutes), this.changeTeamsLock(e.locked, this.playerCopy(r)), this.closed) return;
							if (e.kickRate !== void 0 && e.kickRate !== this.engine.kickRate) {
								let t = e.kickRate;
								this.changeKickRateLimit(t & 255, t >>> 8 & 255, t >>> 16, this.playerCopy(r));
							}
						}
					}
					if (n.action === "kick" && typeof n.slot == "number") {
						let e = this.players.find((e) => e.slot === n.slot);
						p(r, e, (e) => e.peerId === this.network.hostId) && this.removePlayer(e.id, "Removed by host", this.playerCopy(r));
					}
				}
			}
		}
	}
	fast(e, t) {
		if (!this.allowed(e)) return;
		let n = this.players.find((t) => t.peerId === e.id);
		if (!n) return;
		let r = $t(t);
		if (r.epoch !== this.epoch) return;
		let i = this.inputs.get(e.id);
		(!i || Qt(r.seq, i.seq)) && (this.inputs.set(e.id, {
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
		vt(this.engine, r);
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
			muted: !!e.muted,
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
		this.changeTeamColors(e, Ee(t, n, r));
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
		if (!Ae(t)) throw Error("Avatar must be null or at most two visible characters.");
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
	setPlayerMuted(e, t) {
		this.changePlayerMuted(e, t, null);
	}
	changePlayerMuted(e, t, n) {
		if (this.closed) throw Error("Room is closed");
		if (!Number.isInteger(e) || typeof t != "boolean") throw Error("Invalid player mute");
		let r = this.players.find((t) => t.id === e);
		r && r.peerId !== this.network.hostId && !!r.muted !== t && (r.muted = t, this.sync(), this.invoke("onPlayerMuteChange", this.onPlayerMuteChange, this.playerCopy(r), n));
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
			await this.network.updateBan("ban", r.peerId, a);
		} catch (t) {
			throw t instanceof Wt && this.bans.set(e, r.peerId), t;
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
		let a = ke(e, n, r, i);
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
	setSurfaceEnabled(e) {
		if (this.closed) throw Error("Room is closed");
		if (typeof e != "boolean") throw Error("Surface enabled must be a boolean");
		if (!["lobby", "finished"].includes(this.engine.phase)) throw Error("Stop the match before changing its surface");
		!!this.engine.snapshotSurface().length !== e && (this.command("surface", 0, +e), this.state(), this.sync());
	}
	setKickRateLimit(e = 2, t = 0, n = 0) {
		this.changeKickRateLimit(e, t, n, null);
	}
	changeKickRateLimit(e, t, n, r) {
		if (this.closed) throw Error("Room is closed");
		let i = Xe(e, t, n);
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
		Ge(e);
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
		return tn;
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
		let n = Me(t), r = this.readDisc(e);
		if (Object.entries(n).every(([e, t]) => r[e] === t)) return;
		let i = {
			tick: this.engine.tick,
			kind: "disc",
			slot: e,
			value: 0,
			properties: n
		};
		if (this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(i)) && this.finishRecording("Recording limit reached"), this.closed) throw Error("Room is closed");
		vt(this.engine, i), this.state();
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
		this.recorder = new yt(this.engine, this.players.map((e) => ({
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
function rn(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	let t = { ...e }, n = t.maxPlayers ?? 12;
	if (typeof n != "number" || !Number.isFinite(n) || !Number.isInteger(n)) throw Error("maxPlayers must be a finite integer");
	return Ce({
		...t,
		roomName: t.roomName ?? "Headless Room",
		playerName: t.playerName ?? "Host",
		noPlayer: t.noPlayer ?? !1,
		public: t.public ?? !1,
		maxPlayers: Math.max(2, Math.min(30, n)),
		password: t.password ?? ""
	});
}
var an = class {
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
}, on = /* @__PURE__ */ "sendChat.sendAnnouncement.setPlayerAdmin.setPlayerMuted.setPlayerTeam.kickPlayer.clearBan.clearBans.setScoreLimit.setTimeLimit.setCustomStadium.setDefaultStadium.setTeamsLock.setTeamColors.startGame.stopGame.pauseGame.setPassword.setRequireVerification.setRequireRecaptcha.reorderPlayers.setKickRateLimit.setSurfaceEnabled.setPlayerAvatar.setDiscProperties.setPlayerDiscProperties".split(".");
function sn(e, t) {
	let n = Object.create(null);
	t && Object.defineProperty(n, "closed", {
		enumerable: !0,
		value: t
	});
	let r = new an((t) => {
		let n = e.onError?.(String(t));
		n instanceof Promise && n.catch(() => {});
	});
	e.signal.addEventListener("abort", () => r.close(), { once: !0 }), e.signal.aborted && r.close();
	for (let t of on) Object.defineProperty(n, t, {
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
		"onPlayerMuteChange",
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
function cn(e) {
	return bt(e);
}
function ln(e) {
	if (typeof e != "string") throw TypeError("Stadium source must be a string");
	let t = Ge(e);
	return Object.freeze({
		name: t.name,
		canBeStored: t.canBeStored,
		warnings: Object.freeze([...t.warnings])
	});
}
async function un(e = {}, t = {}) {
	return sn(await nn.create(rn(e), void 0, t.signal));
}
export { un as createRoom, cn as readReplay, ln as validateStadium };
