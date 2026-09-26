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
function l(e, t, n, r) {
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
function u(e, t, n) {
	let r = e.indexOf(t);
	return r < 0 || t.team === n ? !1 : (t.team = n, e.splice(r, 1), e.push(t), !0);
}
function d(e, t) {
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
function f(e, t) {
	return (t ? [t] : [2, 1]).flatMap((t) => e.filter((e) => e.team === t));
}
function p(e, t, n) {
	return t !== void 0 && (e.admin || !n && t === e);
}
function m(e, t, n) {
	return t !== void 0 && e.admin && t !== e && !n(t);
}
function h(e, t, n) {
	switch (t.action) {
		case "team": {
			let r = t.slot === void 0 ? e : n.players().find((e) => e.slot === t.slot);
			return p(e, r, n.locked()) && n.move(r, t.team), !0;
		}
		case "teamsLock": return e.admin && n.lock(t.locked), !0;
		case "autoTeams":
		case "resetTeams": {
			if (!e.admin) return !0;
			let r = t.action === "resetTeams" ? f(n.players(), t.team).map((e) => ({
				player: e,
				team: 0
			})) : d(n.players());
			for (let { player: i, team: a } of r) {
				if (!n.current() || !n.players().includes(e) || !e.admin || t.action === "resetTeams" && !n.stopped()) break;
				n.players().includes(i) && ((t.action === "autoTeams" ? i.team !== 0 : i.team === 0) || n.move(i, a));
			}
			return !0;
		}
		default: return !1;
	}
}
function g(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isInteger)) throw Error("Invalid kick rate limit");
	return Math.max(0, Math.min(255, e)) | Math.max(0, Math.min(255, t)) << 8 | Math.max(0, Math.min(100, n)) << 16;
}
function _(e) {
	return e === null || typeof e == "string" && Array.from(e).length <= 2 && !/[\p{Cc}\p{Cf}]/u.test(e);
}
function v(e, t, n) {
	if (!Number.isFinite(e) || !Number.isInteger(t) || t < 0 || t > 16777215 || !Array.isArray(n) || n.length < 1 || n.length > 3 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 16777215)) throw Error("Invalid team colors");
	return {
		angle: (e % 360 + 360) % 360,
		textColor: t,
		colors: [...n]
	};
}
function y(e) {
	if (e === void 0) return [null, null];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Invalid team styles");
	return e.map((e) => e === null ? null : v(e.angle, e.textColor, e.colors));
}
var b = [15035990, 5671397];
function x(e) {
	return e === 0 || e === 1 || e === 2;
}
function S(e, t) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t;
}
function C(e) {
	let { score: t, minutes: n, locked: r, kickRate: i } = e;
	return !S(t, 99) || !S(n, 99) || typeof r != "boolean" || i !== void 0 && !S(i, 6619135) ? null : {
		score: t,
		minutes: n,
		locked: r,
		kickRate: i
	};
}
function w(e, t) {
	switch (e) {
		case "typing": return typeof t.active == "boolean" ? {
			action: e,
			active: t.active
		} : null;
		case "directChat": return typeof t.recipientId == "string" && t.recipientId.length > 0 && t.recipientId.length <= 128 && typeof t.text == "string" && t.text.trim() && t.text.length <= 200 ? {
			action: e,
			recipientId: t.recipientId,
			text: t.text
		} : null;
		case "chat": return typeof t.text == "string" && t.text.trim() && t.text.length <= 200 ? {
			action: e,
			text: t.text
		} : null;
		case "avatar": return _(t.avatar) ? {
			action: e,
			avatar: t.avatar
		} : null;
		case "autoTeams":
		case "clearBans":
		case "start":
		case "stop": return { action: e };
		case "teamsLock": return typeof t.locked == "boolean" ? {
			action: e,
			locked: t.locked
		} : null;
		case "resetTeams": return t.team === void 0 || t.team === 1 || t.team === 2 ? {
			action: e,
			team: t.team
		} : null;
		case "team": return x(t.team) && (t.slot === void 0 || S(t.slot, 31)) ? {
			action: e,
			team: t.team,
			slot: t.slot
		} : null;
		case "defaultStadium": return typeof t.name == "string" ? {
			action: e,
			name: t.name
		} : null;
		case "customStadium": return typeof t.source == "string" ? {
			action: e,
			source: t.source
		} : null;
		case "ban":
		case "kick":
		case "admin": return S(t.slot, 31) ? {
			action: e,
			slot: t.slot
		} : null;
		case "mute": return S(t.slot, 31) && typeof t.muted == "boolean" ? {
			action: e,
			slot: t.slot,
			muted: t.muted
		} : null;
		case "teamColors": {
			if (t.team !== 1 && t.team !== 2) return null;
			if (t.palette === null) return {
				action: e,
				team: t.team,
				palette: null
			};
			let n = t.palette;
			if (!n || typeof n != "object" || Array.isArray(n)) return null;
			let { angle: r, textColor: i, colors: a } = n;
			if (typeof r != "number" || typeof i != "number" || !Array.isArray(a)) return null;
			try {
				return {
					action: e,
					team: t.team,
					palette: v(r, i, a)
				};
			} catch {
				return null;
			}
		}
		case "pause": return t.paused === void 0 || typeof t.paused == "boolean" ? {
			action: e,
			paused: t.paused
		} : null;
		case "kickRate": return S(t.value, 6619135) ? {
			action: e,
			value: t.value
		} : null;
		case "settings": {
			let n = C(t);
			return n ? {
				action: e,
				...n
			} : null;
		}
		default: return null;
	}
}
var T = "/api/v1", E = {
	rooms: `${T}/rooms`,
	sdkRooms: `${T}/sdk/rooms`,
	account: `${T}/account`,
	accountConfig: `${T}/account/config`,
	profile: `${T}/account/profile`,
	profileVisibility: `${T}/account/profile/visibility`,
	publicProfile: (e, t) => `${T}/community/${e}/${encodeURIComponent(t)}`,
	notifications: `${T}/account/notifications`,
	keys: `${T}/account/keys`,
	signal: (e) => `${T}/rooms/${encodeURIComponent(e)}/signal`,
	liveness: (e) => `${T}/rooms/${encodeURIComponent(e)}/liveness`,
	lease: (e) => `${T}/sdk/rooms/${encodeURIComponent(e)}/lease`
}, D = 2, O = 40;
function ee(e, t) {
	return e !== t && e - t >>> 0 < 2147483648;
}
function k(e) {
	if (e.byteLength !== 10) throw Error("Input length");
	let t = new DataView(e);
	if (t.getUint8(0) !== 1 || t.getUint8(1) !== D || t.getUint8(6) > 31 || t.getUint8(7)) throw Error("Input format");
	return {
		seq: t.getUint32(2, !0),
		keys: t.getUint8(6),
		epoch: t.getUint16(8, !0)
	};
}
function A(e, t, n = 0) {
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
	], a = /* @__PURE__ */ new ArrayBuffer(40 + r.length * O), o = new DataView(a);
	o.setUint32(0, e.tick, !0), o.setUint32(4, e.elapsed, !0), o.setUint16(8, e.red, !0), o.setUint16(10, e.blue, !0), o.setUint8(12, i.indexOf(e.phase)), o.setUint8(13, +e.paused), o.setUint8(14, e.kickoff), o.setUint8(15, +e.kickoffActive), o.setUint16(16, e.countdown, !0), o.setUint16(18, e.scoreLimit, !0), o.setUint16(20, e.timeLimit, !0), o.setUint16(22, e.discs.length / 18, !0), o.setUint32(24, t, !0), o.setUint16(28, r.length, !0), o.setUint16(30, e.resumeTicks, !0), o.setUint32(32, e.kickRate, !0), o.setUint8(36, e.lastTouch?.slot ?? 255), o.setUint8(37, e.lastTouch?.team ?? 0), o.setUint8(38, e.goalTouch?.slot ?? 255), o.setUint8(39, e.goalTouch?.team ?? 0), r.forEach((t, n) => {
		let r = t * 18, i = 40 + n * O;
		o.setUint16(i, t, !0), o.setUint8(i + 2, e.discs[r + 13]), o.setUint8(i + 3, e.discs[r + 14] | (e.discs[r + 12] > 0 ? (e.discs[r + 11] & 24) << 2 : 0));
		for (let t = 0; t < 4; t++) o.setFloat64(i + 4 + t * 8, e.discs[r + t], !0);
		o.setUint16(i + 36, e.discs[r + 15], !0), e.discs[r + 12] > 0 && o.setUint16(i + 38, e.discs[r + 17] + 255, !0);
	});
	let s = new Uint8Array(a), c = [], l = Math.ceil(s.length / 1188);
	for (let t = 0; t < l; t++) {
		let r = s.subarray(t * 1188, (t + 1) * 1188), i = new ArrayBuffer(12 + r.length), a = new DataView(i);
		a.setUint8(0, 2), a.setUint8(1, D), a.setUint32(2, e.tick, !0), a.setUint8(6, t), a.setUint8(7, l), a.setUint16(8, n, !0), a.setUint16(10, r.length, !0), new Uint8Array(i, 12).set(r), c.push(i);
	}
	return c;
}
function j(e, t, n = 0) {
	if (!t.length) return [];
	let r = A(e, t[0], n), i = [r];
	for (let e = 1; e < t.length; e++) {
		let n = r.map((e) => e.slice(0));
		new DataView(n[0]).setUint32(36, t[e], !0), i.push(n);
	}
	return i;
}
var M = 32768;
function N(e, t, n, r) {
	let i = [...e.peers.values()].filter((e) => e.fast?.readyState === "open" && e.fast.bufferedAmount < M);
	if (!i.length) return;
	let a = j(t, i.map((e) => r.acknowledgment(e.id)), n);
	for (let t = 0; t < i.length; t++) {
		let n = i[t], r = a[t], o = r.reduce((e, t) => e + t.byteLength, 0);
		if (!(n.fast?.readyState !== "open" || n.fast.bufferedAmount + o > M)) for (let t of r) e.fast(n, t);
	}
}
function P(e) {
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
var te = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/* @__NO_SIDE_EFFECTS__ */
function F(e) {
	return e ? {
		lang: e?.lang ?? void 0,
		message: e?.message,
		abortEarly: e?.abortEarly ?? void 0,
		abortPipeEarly: e?.abortPipeEarly ?? void 0
	} : te;
}
/* @__NO_SIDE_EFFECTS__ */
function ne(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function I(e, t, n, r, i) {
	let a = i && "input" in i ? i.input : n.value, o = i?.expected ?? e.expects ?? null, s = i?.received ?? /* @__PURE__ */ ne(a), c = {
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
function re(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
function L(e) {
	return e["~standard"] = {
		version: 1,
		vendor: "valibot",
		validate: (t) => e["~run"]({ value: t }, /* @__PURE__ */ F())
	}, e;
}
/* @__NO_SIDE_EFFECTS__ */
function R(e, t) {
	return {
		kind: "validation",
		type: "check",
		reference: R,
		async: !1,
		expects: null,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && I(this, "input", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function ie(e, t) {
	return {
		kind: "validation",
		type: "max_length",
		reference: ie,
		async: !1,
		expects: `<=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length > this.requirement && I(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function z(e, t) {
	return {
		kind: "validation",
		type: "min_length",
		reference: z,
		async: !1,
		expects: `>=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length < this.requirement && I(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function B(e, t) {
	return {
		kind: "validation",
		type: "regex",
		reference: B,
		async: !1,
		expects: `${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement.test(e.value) && I(this, "format", e, t), e;
		}
	};
}
var V = { abortEarly: !0 };
/* @__NO_SIDE_EFFECTS__ */
function ae(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function oe(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function se(e, t) {
	return !e["~run"]({ value: t }, V).issues;
}
/* @__NO_SIDE_EFFECTS__ */
function ce(e) {
	return L({
		kind: "schema",
		type: "boolean",
		reference: ce,
		expects: "boolean",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : I(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function H(e, t) {
	return L({
		kind: "schema",
		type: "custom",
		reference: H,
		expects: "unknown",
		async: !1,
		check: e,
		message: t,
		"~run"(e, t) {
			return this.check(e.value) ? e.typed = !0 : I(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function U(e, t) {
	return L({
		kind: "schema",
		type: "object",
		reference: U,
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
						let a = r in n ? n[r] : /* @__PURE__ */ oe(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ ae(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (I(this, "key", e, t, {
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
			} else I(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function le(e, t) {
	return L({
		kind: "schema",
		type: "optional",
		reference: le,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ oe(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ue(e, t) {
	return L({
		kind: "schema",
		type: "picklist",
		reference: ue,
		expects: /* @__PURE__ */ re(e.map(ne), "|"),
		async: !1,
		options: e,
		message: t,
		"~run"(e, t) {
			return this.options.includes(e.value) ? e.typed = !0 : I(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function W(e, t) {
	return L({
		kind: "schema",
		type: "strict_object",
		reference: W,
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
						let a = r in n ? n[r] : /* @__PURE__ */ oe(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ ae(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (I(this, "key", e, t, {
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
						I(this, "key", e, t, {
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
			} else I(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function de(e) {
	return L({
		kind: "schema",
		type: "string",
		reference: de,
		expects: "string",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : I(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function G() {
	return L({
		kind: "schema",
		type: "unknown",
		reference: G,
		expects: "unknown",
		async: !1,
		"~run"(e) {
			return e.typed = !0, e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function K(...e) {
	return L({
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
function fe(e, t, n) {
	let r = e["~run"]({ value: t }, /* @__PURE__ */ F(n));
	return {
		typed: r.typed,
		success: !r.issues,
		output: r.value,
		issues: r.issues
	};
}
var q = /* @__PURE__ */ K(/* @__PURE__ */ de(), /* @__PURE__ */ B(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)), pe = (e) => /* @__PURE__ */ K(/* @__PURE__ */ H((e) => typeof e == "object" && !!e && !Array.isArray(e)), e), me = (e) => pe(/* @__PURE__ */ W(e));
me({ password: /* @__PURE__ */ G() }), me({
	password: /* @__PURE__ */ G(),
	verifier: /* @__PURE__ */ G()
}), me({ verifier: /* @__PURE__ */ G() }), me({ verified: /* @__PURE__ */ ce() });
var he = /* @__PURE__ */ U({ error: /* @__PURE__ */ K(/* @__PURE__ */ de(), /* @__PURE__ */ ie(300), /* @__PURE__ */ R((e) => e.trim() !== ""), /* @__PURE__ */ R((e) => !/[<>]/.test(e)), /* @__PURE__ */ R((e) => !/[\u0000-\u001f\u007f]/.test(e))) }), ge = class extends Error {
	status;
	retryAfterSeconds;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.retryAfterSeconds = n, this.name = "RoomAdmissionError";
	}
};
async function _e(e, t) {
	let n = `Room creation failed (${e.status})`, r = e.status === 429 ? e.headers.get("Retry-After") : null, i = r && /^\d+$/.test(r) && Number.isSafeInteger(Number(r)) ? Number(r) : null, a = (t) => new ge(t, e.status, i), o = e.body?.getReader();
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
		let s = /* @__PURE__ */ fe(he, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r.subarray(0, i))));
		return s.success ? a(`${s.output.error.trim()} (${e.status})`) : a(n);
	} catch {
		return t.throwIfAborted(), a(n);
	} finally {
		t.removeEventListener("abort", s), s(), o.releaseLock();
	}
}
var ve = class {
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
			let n = i.disc * 18, a = i.disc > 0 && e.data[n + 5] === 0 && e.stadium.goals.some(({ p0: t, p1: r }) => [t, r].some(([t, r]) => Math.hypot(e.data[n] - t, e.data[n + 1] - r) <= e.data[n + 4]));
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
function ye(e, t) {
	if (t) for (let n of e.peers.values()) n.control?.readyState === "open" && n.control.bufferedAmount < 16384 && e.control(n, t);
}
function J(e, t, n, r) {
	let i = Math.ceil(2 * Math.SQRT2 * 100 / Math.max(.5, Math.min(10, r))), a = e + 32;
	if (a * (2 * t + a + 2 * n) * i * 13 > 26e6) throw Error("Stadium collision complexity exceeds the room budget");
}
var Y = [
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
function be(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid disc property update");
	let t = e, n = {};
	for (let e = 0; e < Y.length; e++) {
		let [r, , i, a] = Y[e], o = t[r];
		if (o == null) continue;
		if (typeof o != "number" || !Number.isFinite(o)) throw Error(`Invalid disc property: ${r}`);
		let s = e < 10 ? Math.fround(o) : o | 0;
		if (!Number.isFinite(s) || s < Math.fround(i) || s > a) throw Error(`Invalid disc property: ${r}`);
		n[r] = s;
	}
	return n;
}
var xe = "d340289099e582d13be0", Se = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
		var D = E, O = Math.ceil, ee = Math.floor, k = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? ee : O)(e);
		}, A = function(e) {
			if (e == null) throw TypeError("Can't call method on  " + e);
			return e;
		}, j = function(e) {
			return function(t, n) {
				var r = String(A(t)), i = k(n), a = r.length, o, s;
				return i < 0 || i >= a ? e ? "" : void 0 : (o = r.charCodeAt(i), o < 55296 || o > 56319 || i + 1 === a || (s = r.charCodeAt(i + 1)) < 56320 || s > 57343 ? e ? r.charAt(i) : o : e ? r.slice(i, i + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
			};
		}(!1);
		D(D.P, "String", { codePointAt: function(e) {
			return j(this, e);
		} }), n.String.codePointAt;
		var M = Math.max, N = Math.min, P = function(e, t) {
			return e = k(e), e < 0 ? M(e + t, 0) : N(e, t);
		}, te = String.fromCharCode, F = String.fromCodePoint;
		D(D.S + D.F * (!!F && F.length != 1), "String", { fromCodePoint: function(e) {
			for (var t = arguments, n = [], r = arguments.length, i = 0, a; r > i;) {
				if (a = +t[i++], P(a, 1114111) !== a) throw RangeError(a + " is not a valid code point");
				n.push(a < 65536 ? te(a) : te(((a -= 65536) >> 10) + 55296, a % 1024 + 56320));
			}
			return n.join("");
		} }), n.String.fromCodePoint;
		var ne = {
			Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
			ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
			ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		}, I = {
			isSpaceSeparator: function(e) {
				return typeof e == "string" && ne.Space_Separator.test(e);
			},
			isIdStartChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || ne.ID_Start.test(e));
			},
			isIdContinueChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || ne.ID_Continue.test(e));
			},
			isDigit: function(e) {
				return typeof e == "string" && /[0-9]/.test(e);
			},
			isHexDigit: function(e) {
				return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
			}
		}, re, L, R, ie, z, B, V, ae, oe, se = function(e, t) {
			re = String(e), L = "start", R = [], ie = 0, z = 1, B = 0, V = void 0, ae = void 0, oe = void 0;
			do
				V = de(), _e[L]();
			while (V.type !== "eof");
			return typeof t == "function" ? ce({ "": oe }, "", t) : oe;
		};
		function ce(e, t, n) {
			var r = e[t];
			if (typeof r == "object" && r) {
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
					var a = String(i), o = ce(r, a, n);
					o === void 0 ? delete r[a] : Object.defineProperty(r, a, {
						value: o,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
				else for (var s in r) {
					var c = ce(r, s, n);
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
		var H, U, le, ue, W;
		function de() {
			for (H = "default", U = "", le = !1, ue = 1;;) {
				W = G();
				var e = fe[H]();
				if (e) return e;
			}
		}
		function G() {
			if (re[ie]) return String.fromCodePoint(re.codePointAt(ie));
		}
		function K() {
			var e = G();
			return e === "\n" ? (z++, B = 0) : e ? B += e.length : B++, e && (ie += e.length), e;
		}
		var fe = {
			default: function() {
				switch (W) {
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
						K();
						return;
					case "/":
						K(), H = "comment";
						return;
					case void 0: return K(), q("eof");
				}
				if (I.isSpaceSeparator(W)) {
					K();
					return;
				}
				return fe[L]();
			},
			comment: function() {
				switch (W) {
					case "*":
						K(), H = "multiLineComment";
						return;
					case "/":
						K(), H = "singleLineComment";
						return;
				}
				throw J(K());
			},
			multiLineComment: function() {
				switch (W) {
					case "*":
						K(), H = "multiLineCommentAsterisk";
						return;
					case void 0: throw J(K());
				}
				K();
			},
			multiLineCommentAsterisk: function() {
				switch (W) {
					case "*":
						K();
						return;
					case "/":
						K(), H = "default";
						return;
					case void 0: throw J(K());
				}
				K(), H = "multiLineComment";
			},
			singleLineComment: function() {
				switch (W) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						K(), H = "default";
						return;
					case void 0: return K(), q("eof");
				}
				K();
			},
			value: function() {
				switch (W) {
					case "{":
					case "[": return q("punctuator", K());
					case "n": return K(), pe("ull"), q("null", null);
					case "t": return K(), pe("rue"), q("boolean", !0);
					case "f": return K(), pe("alse"), q("boolean", !1);
					case "-":
					case "+":
						K() === "-" && (ue = -1), H = "sign";
						return;
					case ".":
						U = K(), H = "decimalPointLeading";
						return;
					case "0":
						U = K(), H = "zero";
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
						U = K(), H = "decimalInteger";
						return;
					case "I": return K(), pe("nfinity"), q("numeric", Infinity);
					case "N": return K(), pe("aN"), q("numeric", NaN);
					case "\"":
					case "'":
						le = K() === "\"", U = "", H = "string";
						return;
				}
				throw J(K());
			},
			identifierNameStartEscape: function() {
				if (W !== "u") throw J(K());
				K();
				var e = ge();
				switch (e) {
					case "$":
					case "_": break;
					default: if (!I.isIdStartChar(e)) throw be();
				}
				U += e, H = "identifierName";
			},
			identifierName: function() {
				switch (W) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						U += K();
						return;
					case "\\":
						K(), H = "identifierNameEscape";
						return;
				}
				if (I.isIdContinueChar(W)) {
					U += K();
					return;
				}
				return q("identifier", U);
			},
			identifierNameEscape: function() {
				if (W !== "u") throw J(K());
				K();
				var e = ge();
				switch (e) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default: if (!I.isIdContinueChar(e)) throw be();
				}
				U += e, H = "identifierName";
			},
			sign: function() {
				switch (W) {
					case ".":
						U = K(), H = "decimalPointLeading";
						return;
					case "0":
						U = K(), H = "zero";
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
						U = K(), H = "decimalInteger";
						return;
					case "I": return K(), pe("nfinity"), q("numeric", ue * Infinity);
					case "N": return K(), pe("aN"), q("numeric", NaN);
				}
				throw J(K());
			},
			zero: function() {
				switch (W) {
					case ".":
						U += K(), H = "decimalPoint";
						return;
					case "e":
					case "E":
						U += K(), H = "decimalExponent";
						return;
					case "x":
					case "X":
						U += K(), H = "hexadecimal";
						return;
				}
				return q("numeric", ue * 0);
			},
			decimalInteger: function() {
				switch (W) {
					case ".":
						U += K(), H = "decimalPoint";
						return;
					case "e":
					case "E":
						U += K(), H = "decimalExponent";
						return;
				}
				if (I.isDigit(W)) {
					U += K();
					return;
				}
				return q("numeric", ue * Number(U));
			},
			decimalPointLeading: function() {
				if (I.isDigit(W)) {
					U += K(), H = "decimalFraction";
					return;
				}
				throw J(K());
			},
			decimalPoint: function() {
				switch (W) {
					case "e":
					case "E":
						U += K(), H = "decimalExponent";
						return;
				}
				if (I.isDigit(W)) {
					U += K(), H = "decimalFraction";
					return;
				}
				return q("numeric", ue * Number(U));
			},
			decimalFraction: function() {
				switch (W) {
					case "e":
					case "E":
						U += K(), H = "decimalExponent";
						return;
				}
				if (I.isDigit(W)) {
					U += K();
					return;
				}
				return q("numeric", ue * Number(U));
			},
			decimalExponent: function() {
				switch (W) {
					case "+":
					case "-":
						U += K(), H = "decimalExponentSign";
						return;
				}
				if (I.isDigit(W)) {
					U += K(), H = "decimalExponentInteger";
					return;
				}
				throw J(K());
			},
			decimalExponentSign: function() {
				if (I.isDigit(W)) {
					U += K(), H = "decimalExponentInteger";
					return;
				}
				throw J(K());
			},
			decimalExponentInteger: function() {
				if (I.isDigit(W)) {
					U += K();
					return;
				}
				return q("numeric", ue * Number(U));
			},
			hexadecimal: function() {
				if (I.isHexDigit(W)) {
					U += K(), H = "hexadecimalInteger";
					return;
				}
				throw J(K());
			},
			hexadecimalInteger: function() {
				if (I.isHexDigit(W)) {
					U += K();
					return;
				}
				return q("numeric", ue * Number(U));
			},
			string: function() {
				switch (W) {
					case "\\":
						K(), U += me();
						return;
					case "\"":
						if (le) return K(), q("string", U);
						U += K();
						return;
					case "'":
						if (!le) return K(), q("string", U);
						U += K();
						return;
					case "\n":
					case "\r": throw J(K());
					case "\u2028":
					case "\u2029":
						xe(W);
						break;
					case void 0: throw J(K());
				}
				U += K();
			},
			start: function() {
				switch (W) {
					case "{":
					case "[": return q("punctuator", K());
				}
				H = "value";
			},
			beforePropertyName: function() {
				switch (W) {
					case "$":
					case "_":
						U = K(), H = "identifierName";
						return;
					case "\\":
						K(), H = "identifierNameStartEscape";
						return;
					case "}": return q("punctuator", K());
					case "\"":
					case "'":
						le = K() === "\"", H = "string";
						return;
				}
				if (I.isIdStartChar(W)) {
					U += K(), H = "identifierName";
					return;
				}
				throw J(K());
			},
			afterPropertyName: function() {
				if (W === ":") return q("punctuator", K());
				throw J(K());
			},
			beforePropertyValue: function() {
				H = "value";
			},
			afterPropertyValue: function() {
				switch (W) {
					case ",":
					case "}": return q("punctuator", K());
				}
				throw J(K());
			},
			beforeArrayValue: function() {
				if (W === "]") return q("punctuator", K());
				H = "value";
			},
			afterArrayValue: function() {
				switch (W) {
					case ",":
					case "]": return q("punctuator", K());
				}
				throw J(K());
			},
			end: function() {
				throw J(K());
			}
		};
		function q(e, t) {
			return {
				type: e,
				value: t,
				line: z,
				column: B
			};
		}
		function pe(e) {
			for (var t = 0, n = e; t < n.length; t += 1) {
				var r = n[t];
				if (G() !== r) throw J(K());
				K();
			}
		}
		function me() {
			switch (G()) {
				case "b": return K(), "\b";
				case "f": return K(), "\f";
				case "n": return K(), "\n";
				case "r": return K(), "\r";
				case "t": return K(), "	";
				case "v": return K(), "\v";
				case "0":
					if (K(), I.isDigit(G())) throw J(K());
					return "\0";
				case "x": return K(), he();
				case "u": return K(), ge();
				case "\n":
				case "\u2028":
				case "\u2029": return K(), "";
				case "\r": return K(), G() === "\n" && K(), "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw J(K());
				case void 0: throw J(K());
			}
			return K();
		}
		function he() {
			var e = "", t = G();
			if (!I.isHexDigit(t) || (e += K(), t = G(), !I.isHexDigit(t))) throw J(K());
			return e += K(), String.fromCodePoint(parseInt(e, 16));
		}
		function ge() {
			for (var e = "", t = 4; t-- > 0;) {
				var n = G();
				if (!I.isHexDigit(n)) throw J(K());
				e += K();
			}
			return String.fromCodePoint(parseInt(e, 16));
		}
		var _e = {
			start: function() {
				if (V.type === "eof") throw Y();
				ve();
			},
			beforePropertyName: function() {
				switch (V.type) {
					case "identifier":
					case "string":
						ae = V.value, L = "afterPropertyName";
						return;
					case "punctuator":
						ye();
						return;
					case "eof": throw Y();
				}
			},
			afterPropertyName: function() {
				if (V.type === "eof") throw Y();
				L = "beforePropertyValue";
			},
			beforePropertyValue: function() {
				if (V.type === "eof") throw Y();
				ve();
			},
			beforeArrayValue: function() {
				if (V.type === "eof") throw Y();
				if (V.type === "punctuator" && V.value === "]") {
					ye();
					return;
				}
				ve();
			},
			afterPropertyValue: function() {
				if (V.type === "eof") throw Y();
				switch (V.value) {
					case ",":
						L = "beforePropertyName";
						return;
					case "}": ye();
				}
			},
			afterArrayValue: function() {
				if (V.type === "eof") throw Y();
				switch (V.value) {
					case ",":
						L = "beforeArrayValue";
						return;
					case "]": ye();
				}
			},
			end: function() {}
		};
		function ve() {
			var e;
			switch (V.type) {
				case "punctuator":
					switch (V.value) {
						case "{":
							e = {};
							break;
						case "[": e = [];
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string": e = V.value;
			}
			if (oe === void 0) oe = e;
			else {
				var t = R[R.length - 1];
				Array.isArray(t) ? t.push(e) : Object.defineProperty(t, ae, {
					value: e,
					writable: !0,
					enumerable: !0,
					configurable: !0
				});
			}
			if (typeof e == "object" && e) R.push(e), L = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName";
			else {
				var n = R[R.length - 1];
				L = n == null ? "end" : Array.isArray(n) ? "afterArrayValue" : "afterPropertyValue";
			}
		}
		function ye() {
			R.pop();
			var e = R[R.length - 1];
			L = e == null ? "end" : Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue";
		}
		function J(e) {
			return Ce(e === void 0 ? "JSON5: invalid end of input at " + z + ":" + B : "JSON5: invalid character '" + Se(e) + "' at " + z + ":" + B);
		}
		function Y() {
			return Ce("JSON5: invalid end of input at " + z + ":" + B);
		}
		function be() {
			return B -= 5, Ce("JSON5: invalid identifier character at " + z + ":" + B);
		}
		function xe(e) {
			console.warn("JSON5: '" + Se(e) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function Se(e) {
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
		function Ce(e) {
			var t = SyntaxError(e);
			return t.lineNumber = z, t.columnNumber = B, t;
		}
		return {
			parse: se,
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
							case "\0": if (I.isDigit(e[i + 1])) {
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
					if (!I.isIdStartChar(t)) return m(e, !0);
					for (var n = t.length; n < e.length; n++) if (!I.isIdContinueChar(String.fromCodePoint(e.codePointAt(n)))) return m(e, !0);
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
})))(), 1), Ce = {
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
}, we = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Expected an object");
	return e;
}, X = (e, t, n = -4096, r = 4096) => {
	let i = e === void 0 ? t : e;
	if (typeof i != "number" || !Number.isFinite(i) || i < n || i > r) throw Error(`Number must be between ${n} and ${r}`);
	return i;
}, Te = (e, t = [0, 0]) => {
	if (e === void 0) return [...t];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Expected [x, y]");
	return [X(e[0], 0), X(e[1], 0)];
}, Ee = (e, t) => {
	if (e === void 0) return [];
	if (!Array.isArray(e) || e.length > t) throw Error(`Array limit: ${t}`);
	return e;
};
function De(e, t) {
	return e === void 0 ? t : typeof e == "number" ? X(e, t, -2147483648, 4294967295) | 0 : Ee(e, 16).reduce((e, t) => {
		if (typeof t != "string" || !Object.hasOwn(Ce, t)) throw Error("Unknown collision flag");
		return e | Ce[t];
	}, 0);
}
function Oe(e, t = "FFFFFF") {
	if (e === void 0) return t;
	if (e === "transparent") return e;
	if (Array.isArray(e) && e.length === 3) return e.map((e) => Math.round(X(e, 0, 0, 255)).toString(16).padStart(2, "0")).join("");
	if (typeof e == "string" && /^[0-9a-f]{6}$/i.test(e)) return e;
	throw Error("Invalid color");
}
var ke = Object.fromEntries(Object.entries({
	root: "version physicsMode name width height maxViewWidth cameraFollow spawnDistance canBeStored kickOffReset bg traits vertexes segments goals discs planes joints redSpawnPoints blueSpawnPoints playerPhysics ballPhysics",
	bg: "type width height kickOffRadius cornerRadius color",
	vertexes: "trait x y bCoef cMask cGroup",
	segments: "trait v0 v1 bCoef cMask cGroup curve curveF bias color vis",
	discs: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color",
	planes: "trait normal dist bCoef cMask cGroup",
	goals: "trait p0 p1 team",
	joints: "trait d0 d1 length strength color",
	playerPhysics: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color acceleration kickingAcceleration kickingDamping kickStrength kickback"
}).map(([e, t]) => [e, new Set(t.split(" "))])), Ae = new Set([
	"vertexes",
	"segments",
	"discs",
	"planes",
	"goals",
	"joints",
	"playerPhysics"
].flatMap((e) => [...ke[e]]));
function je(e) {
	let t = [], n = (e, t) => {
		let n = t.length > 80 ? `${t.slice(0, 80)}…` : t;
		return e + (/^[A-Za-z_$][\w$]*$/.test(n) ? `.${n}` : `[${JSON.stringify(n)}]`);
	}, r = (e, r, i) => {
		if (e && typeof e == "object" && !Array.isArray(e)) for (let a of Object.keys(e)) r.has(a) || (t.length < 64 ? t.push(`Unsupported stadium field: ${n(i, a)}`) : t.length === 64 && t.push("Additional unsupported stadium fields omitted."));
	};
	r(e, ke.root, "$"), r(e.bg, ke.bg, "$.bg");
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
			r(e, ke[t], `$.${t}[${n}]`);
		});
	}
	if (r(e.ballPhysics, ke.discs, "$.ballPhysics"), r(e.playerPhysics, ke.playerPhysics, "$.playerPhysics"), e.traits && typeof e.traits == "object" && !Array.isArray(e.traits)) for (let [t, i] of Object.entries(e.traits)) r(i, Ae, n("$.traits", t));
	return t;
}
function Me(e) {
	if (new TextEncoder().encode(e).length > 262144) throw Error("Stadium exceeds 256 KB");
	let t = we(Se.default.parse(e));
	if (t.physicsMode !== void 0 && t.physicsMode !== "stadium" && t.physicsMode !== "substeps") throw Error("Invalid physics mode");
	let n = t.physicsMode === "substeps" ? "substeps" : "stadium";
	if (t.version !== void 0 && t.version !== 1) throw Error("Unsupported stadium version");
	let r = t.traits === void 0 ? {} : we(t.traits), i = (e) => {
		let t = we(e);
		if (t.trait === void 0) return t;
		if (typeof t.trait != "string" || !Object.hasOwn(r, t.trait)) throw Error("Unknown trait");
		return {
			...we(r[t.trait]),
			...t
		};
	}, a = (e, t = !1) => ({
		pos: Te(e.pos),
		speed: Te(e.speed),
		gravity: Te(e.gravity),
		radius: X(e.radius, 10, .5, 100),
		invMass: X(e.invMass, 1, 0, 8192),
		damping: X(e.damping, .99, 0, 8192),
		bCoef: X(e.bCoef, .5, -1, 8192),
		cGroup: De(e.cGroup, t ? 193 : 63),
		cMask: De(e.cMask, 63),
		color: Oe(e.color)
	}), o = Ee(t.discs, 63).map((e) => a(i(e)));
	if (t.ballPhysics !== "disc0") {
		let e = a(t.ballPhysics === void 0 ? {} : i(t.ballPhysics), !0);
		e.cGroup |= 192, o.unshift(e);
	} else if (!o.length) throw Error("disc0 needs a disc");
	let s = Ee(t.vertexes, 1024).map((e) => i(e)), c = [], l = [], u = je(t);
	for (let e of s) c.push({
		a: [X(e.x, 0), X(e.y, 0)],
		b: [X(e.x, 0), X(e.y, 0)],
		bCoef: X(e.bCoef, 1, -1, 8192),
		cGroup: De(e.cGroup, 32),
		cMask: De(e.cMask, 63),
		bias: 0,
		color: "transparent",
		vis: !1
	});
	let d = [...c];
	for (let e of Ee(t.segments, 1024)) {
		let t = i(e), n = X(t.v0, -1, 0, s.length - 1), r = X(t.v1, -1, 0, s.length - 1);
		if (!Number.isInteger(n) || !Number.isInteger(r)) throw Error("Vertex indices must be integers");
		let a = [X(s[n].x, 0), X(s[n].y, 0)], o = [X(s[r].x, 0), X(s[r].y, 0)], u = {
			bCoef: X(t.bCoef, 1, -1, 8192),
			cGroup: De(t.cGroup, 32),
			cMask: De(t.cMask, 63),
			bias: X(t.bias, 0, -100, 100),
			color: Oe(t.color, "000000"),
			vis: t.vis !== !1
		}, f = t.curveF === void 0 ? X(t.curve, 0, -359, 359) : 2 * Math.atan2(1, X(t.curveF, 0, -1e8, 1e8)) * 180 / Math.PI;
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
		acceleration: X(f.acceleration, .1, -8192, 8192),
		kickingAcceleration: X(f.kickingAcceleration, .07, -8192, 8192),
		kickingDamping: X(f.kickingDamping, .96, 0, 8192),
		kickStrength: X(f.kickStrength, 5, -8192, 8192),
		kickback: X(f.kickback, 0, -8192, 8192)
	};
	J(o.length, c.length, Ee(t.planes, 64).length + Ee(t.joints, 128).length, Math.min(p.radius, ...o.map((e) => e.radius)));
	let m = t.bg === void 0 ? {} : we(t.bg);
	if (m.type !== void 0 && m.type !== "grass" && m.type !== "asphalt" && m.type !== "none") throw Error("Unsupported stadium background type");
	return {
		version: 1,
		physicsMode: n,
		name: typeof t.name == "string" ? t.name.slice(0, 64) : "Untitled stadium",
		canBeStored: t.canBeStored !== !1,
		width: X(t.width, 520, 100, 2048),
		height: X(t.height, 300, 80, 2048),
		maxViewWidth: X(t.maxViewWidth, 0, 0, 4096),
		cameraFollow: t.cameraFollow === "player" ? "player" : "ball",
		bg: {
			type: m.type === "grass" || m.type === "asphalt" ? m.type : "none",
			cornerRadius: X(m.cornerRadius, 0, 0, 500),
			width: X(m.width, 0, 0, 2048),
			height: X(m.height, 0, 0, 2048),
			color: Oe(m.color, "718C5A"),
			kickOffRadius: X(m.kickOffRadius, 0, 0, 500)
		},
		discs: o,
		segments: c,
		arcs: l,
		colliders: d,
		player: p,
		spawnDistance: X(t.spawnDistance, 200, 0, 1500),
		kickOffReset: t.kickOffReset === "full" ? "full" : "partial",
		redSpawnPoints: Ee(t.redSpawnPoints, 32).map((e) => Te(e)),
		blueSpawnPoints: Ee(t.blueSpawnPoints, 32).map((e) => Te(e)),
		warnings: u,
		planes: Ee(t.planes, 64).map((e) => {
			let t = i(e), n = Te(t.normal);
			if (Math.hypot(...n) < 1e-6) throw Error("Plane normal is zero");
			return {
				normal: n,
				dist: X(t.dist, 0),
				bCoef: X(t.bCoef, 1, -1, 8192),
				cGroup: De(t.cGroup, 32),
				cMask: De(t.cMask, 63)
			};
		}),
		goals: Ee(t.goals, 16).map((e) => {
			let t = i(e);
			if (t.team !== "red" && t.team !== "blue") throw Error("Invalid goal team");
			let n = Te(t.p0), r = Te(t.p1);
			if (Math.hypot(r[0] - n[0], r[1] - n[1]) < 1) throw Error("Goal has zero length");
			return {
				p0: n,
				p1: r,
				team: t.team === "red" ? 1 : 2
			};
		}),
		joints: Ee(t.joints, 128).map((e) => {
			let t = i(e), n = X(t.d0, -1, 0, o.length - 1), r = X(t.d1, -1, 0, o.length - 1);
			if (!Number.isInteger(n) || !Number.isInteger(r) || n === r) throw Error("Invalid joint indices");
			let a = Math.hypot(o[r].pos[0] - o[n].pos[0], o[r].pos[1] - o[n].pos[1]), s = t.length == null ? [a, a] : typeof t.length == "number" ? [t.length, t.length] : Te(t.length);
			return {
				d0: n,
				d1: r,
				min: X(s[0], 0, 0),
				max: X(s[1], 0, 0),
				strength: t.strength === void 0 || t.strength === "rigid" ? "rigid" : X(t.strength, 0, -8192, 8192),
				color: Oe(t.color, "000000")
			};
		})
	};
}
function Ne(e = "Emerald Arena", t = 440, n = 220) {
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
var Pe = 60, Fe = `ball2d-core/1/${xe}`, Ie = class e {
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
	setKickRateLimit(e, t, n) {
		this.kickRate = g(e, t, n), this.core.kick_limits(this.kickRate & 255, this.kickRate >>> 8 & 255, this.kickRate >>> 16);
	}
	constructor(e) {
		this.core = e.exports;
	}
	static async create(t, n) {
		let r = t ?? await (await fetch("/core.wasm?v=d340289099e582d13be0", { signal: n })).arrayBuffer();
		if (Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", r))).map((e) => e.toString(16).padStart(2, "0")).join("") !== "105f5ccfb67900e11f5d8a36b86125d085a1b1ece88bb20e6690eb376b836fdb") throw Error("Physics build changed. Refresh the page to load a matching version.");
		return new e(await WebAssembly.instantiate(await WebAssembly.compile(r)));
	}
	get data() {
		return new Float64Array(this.core.memory.buffer, this.core.data_ptr(), this.core.count() * 18);
	}
	load(e) {
		this.stadium = Me(e), this.source = e, this.core.reset(), this.colors = [], this.core.physics_mode(+(this.stadium.physicsMode === "substeps")), this.tick = 0, this.elapsed = 0, this.red = this.blue = 0, this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0, this.countdown = 0, this.kickoffActive = !0;
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
		].forEach((e, t) => {
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
		let r = be(t), i = !1;
		for (let [t, a] of Y) {
			let o = r[t];
			if (o === void 0) continue;
			let s = a === -1 ? this.colors[e] : n[e * 18 + a];
			Object.is(s, o) || (i = !0);
		}
		if (!i) return !1;
		if (r.radius !== void 0) {
			let t = r.radius;
			for (let r = 0; r < this.colors.length; r++) r !== e && (t = Math.min(t, n[r * 18 + 4]));
			J(this.stadium.discs.length, this.stadium.segments.length, this.stadium.planes.length + this.stadium.joints.length, t);
		}
		for (let [t, i] of Y) {
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
		this.restoreDiscProperties(e, this.stadium.player), this.colors[e] = n === 1 || n === 2 ? b[n - 1] : 16777215, this.data[e * 18 + 10] |= n === 1 ? 2 : n === 2 ? 4 : 0;
		let i = n === 1 ? this.stadium.redSpawnPoints : this.stadium.blueSpawnPoints, a = this.data, o = 0;
		for (let e = 0; e < t; e++) a[this.index(e) * 18 + 13] === n && o++;
		let s = n === 1 ? -1 : 1, c = i.length ? i[r ? i.length - 1 : Math.min(o, i.length - 1)] : r ? [s * this.stadium.width, 0] : [s * this.stadium.spawnDistance, o ? Math.ceil(o / 2) * 55 * (o % 2 ? 1 : -1) : 0];
		a[e * 18] = c[0], a[e * 18 + 1] = c[1], a[e * 18 + 2] = a[e * 18 + 3] = a[e * 18 + 14] = 0, a[e * 18 + 15] &= 1023, a[e * 18 + 11] = this.stadium.player.cMask & -25;
	}
	resetPositions(e = !1) {
		this.kickoffActive = !0, this.lastTouch = null;
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
		(this.phase === "lobby" || this.phase === "finished") && (this.red = this.blue = this.elapsed = 0, this.goalTouch = null, this.phase = "playing", this.paused = !1, this.resumeTicks = 0, this.kickoff = 1, this.countdown = 0, this.resetPositions(!0));
	}
	stop() {
		this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0;
	}
	setPaused(e) {
		this.phase !== "lobby" && (e = !!e, this.paused !== e && (this.paused = e, this.resumeTicks = e ? 0 : 119));
	}
	finish() {
		this.phase = "finished", this.countdown = 300;
	}
	canFinishDraw() {
		return this.phase === "playing" && !this.paused && this.timeLimit > 0 && this.red === this.blue && this.elapsed >= (this.timeLimit + 60) * Pe;
	}
	finishDraw() {
		return this.canFinishDraw() ? (this.finish(), !0) : !1;
	}
	step() {
		if (this.ballKicks.length = 0, this.ballContact = void 0, this.tick++, this.paused || this.phase === "lobby") return;
		if (this.resumeTicks > 0) {
			this.resumeTicks--;
			return;
		}
		let e = this.data;
		if (this.core.step(), this.phase === "playing") {
			let t = this.core.ball_touch_slot();
			if (t >= 0 && t < 32) {
				let n = e[this.index(t) * 18 + 13];
				(n === 1 || n === 2) && (this.lastTouch = {
					slot: t,
					team: n
				});
			}
		}
		let t = this.core.ball_contact_speed();
		t >= 1 && (this.ballContact = {
			disc: this.core.ball_contact_disc(),
			speed: t
		});
		for (let e = this.core.ball_kick_events() >>> 0, t = 0; e; e >>>= 1, t++) e & 1 && this.ballKicks.push(t);
		if (this.phase === "finished") {
			--this.countdown <= 0 && this.stop();
			return;
		}
		if (this.phase === "goal") {
			--this.countdown <= 0 && (this.scoreLimit > 0 && Math.max(this.red, this.blue) >= this.scoreLimit || this.timeLimit > 0 && this.elapsed >= this.timeLimit * Pe && this.red !== this.blue ? this.finish() : (this.phase = "playing", this.resetPositions()));
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
		let n = this.core.goal_event();
		if (n === 1 || n === 2) {
			n === 1 ? this.red++ : this.blue++, this.kickoff = n === 1 ? 2 : 1, this.phase = "goal", this.countdown = 330, this.goalTouch = this.lastTouch ? { ...this.lastTouch } : null, this.lastGoal = this.tick;
			return;
		}
		this.timeLimit > 0 && this.elapsed >= this.timeLimit * Pe && this.red !== this.blue && this.finish();
	}
	snapshot() {
		return {
			lastTouch: this.lastTouch ? { ...this.lastTouch } : null,
			goalTouch: this.goalTouch ? { ...this.goalTouch } : null,
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
		if (!t(e.kickRate, 6619135) || !t(e.tick, 4294967295) || !t(e.elapsed, 4294967295) || !t(e.red, 65535) || !t(e.blue, 65535) || !t(e.countdown, 330) || !t(e.resumeTicks, 119) || (e.paused || e.phase === "lobby") && e.resumeTicks !== 0 || !t(e.scoreLimit, 99) || !t(e.timeLimit, 5940) || ![
			"lobby",
			"playing",
			"goal",
			"finished"
		].includes(e.phase) || typeof e.paused != "boolean" || typeof e.kickoffActive != "boolean" || ![1, 2].includes(e.kickoff)) throw Error("Invalid match metadata");
		for (let n of [e.lastTouch, e.goalTouch]) if (n != null && (typeof n != "object" || !t(n.slot, 31) || ![1, 2].includes(n.team))) throw Error("Invalid goal attribution");
		for (let n = 0; n < e.discs.length; n += 18) if (e.discs[n + 4] < .5 || e.discs[n + 4] > 100 || e.discs[n + 5] < 0 || e.discs[n + 5] > 8192 || e.discs[n + 6] < 0 || e.discs[n + 6] > 8192 || e.discs[n + 7] < -1 || e.discs[n + 7] > 8192 || !t(e.discs[n + 10], 2147483647, -2147483648) || !t(e.discs[n + 11], 2147483647, -2147483648) || !t(e.discs[n + 13], 2) || !t(e.discs[n + 14], 31) || !t(e.discs[n + 15], 2047) || e.discs[n + 12] > 0 && (!Number.isInteger(e.discs[n + 17]) || e.discs[n + 17] < -255 || e.discs[n + 17] > 25500)) throw Error("Invalid disc properties");
		let n = 10;
		for (let t = 4; t < e.discs.length; t += 18) n = Math.min(n, e.discs[t]);
		J(this.stadium.discs.length, this.stadium.segments.length, this.stadium.planes.length + this.stadium.joints.length, n), this.setKickRateLimit(e.kickRate & 255, e.kickRate >>> 8 & 255, e.kickRate >>> 16), this.lastTouch = e.lastTouch ? { ...e.lastTouch } : null, this.goalTouch = e.goalTouch ? { ...e.goalTouch } : null, this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.scoreLimit = e.scoreLimit, this.timeLimit = e.timeLimit, this.data.set(e.discs), this.colors = [...e.colors];
	}
}, Z = Uint8Array, Le = Uint16Array, Re = Int32Array, ze = new Z([
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
]), Be = new Z([
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
]), Ve = new Z([
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
]), He = function(e, t) {
	for (var n = new Le(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new Re(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, Ue = He(ze, 2), We = Ue.b, Ge = Ue.r;
We[28] = 258, Ge[258] = 28;
for (var Ke = He(Be, 0), qe = Ke.b, Je = Ke.r, Ye = new Le(32768), Q = 0; Q < 32768; ++Q) {
	var Xe = (Q & 43690) >> 1 | (Q & 21845) << 1;
	Xe = (Xe & 52428) >> 2 | (Xe & 13107) << 2, Xe = (Xe & 61680) >> 4 | (Xe & 3855) << 4, Ye[Q] = ((Xe & 65280) >> 8 | (Xe & 255) << 8) >> 1;
}
for (var Ze = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new Le(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new Le(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new Le(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[Ye[d] >> c] = l;
	} else for (s = new Le(r), i = 0; i < r; ++i) e[i] && (s[i] = Ye[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), Qe = new Z(288), Q = 0; Q < 144; ++Q) Qe[Q] = 8;
for (var Q = 144; Q < 256; ++Q) Qe[Q] = 9;
for (var Q = 256; Q < 280; ++Q) Qe[Q] = 7;
for (var Q = 280; Q < 288; ++Q) Qe[Q] = 8;
for (var $e = new Z(32), Q = 0; Q < 32; ++Q) $e[Q] = 5;
var et = /*#__PURE__*/ Ze(Qe, 9, 0), tt = /*#__PURE__*/ Ze(Qe, 9, 1), nt = /*#__PURE__*/ Ze($e, 5, 0), rt = /*#__PURE__*/ Ze($e, 5, 1), it = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, at = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, ot = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, st = function(e) {
	return (e + 7) / 8 | 0;
}, ct = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new Z(e.subarray(t, n));
}, lt = [
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
], ut = function(e, t, n) {
	var r = Error(t || lt[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, ut), !n) throw r;
	return r;
}, dt = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new Z(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new Z(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new Z(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = at(e, d, 1);
			var v = at(e, d + 1, 3);
			if (d += 3, !v) {
				var y = st(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && ut(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = tt, m = rt, h = 9, g = 5;
			else if (v == 2) {
				var S = at(e, d, 31) + 257, C = at(e, d + 10, 15) + 4, w = S + at(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new Z(w), E = new Z(19), D = 0; D < C; ++D) E[Ve[D]] = at(e, d + D * 3, 7);
				d += C * 3;
				for (var O = it(E), ee = (1 << O) - 1, k = Ze(E, O, 1), D = 0; D < w;) {
					var A = k[at(e, d, ee)];
					d += A & 15;
					var y = A >> 4;
					if (y < 16) T[D++] = y;
					else {
						var j = 0, M = 0;
						for (y == 16 ? (M = 3 + at(e, d, 3), d += 2, j = T[D - 1]) : y == 17 ? (M = 3 + at(e, d, 7), d += 3) : y == 18 && (M = 11 + at(e, d, 127), d += 7); M--;) T[D++] = j;
					}
				}
				var N = T.subarray(0, S), P = T.subarray(S);
				h = it(N), g = it(P), p = Ze(N, h, 1), m = Ze(P, g, 1);
			} else ut(1);
			if (d > _) {
				c && ut(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var te = (1 << h) - 1, F = (1 << g) - 1, ne = d;; ne = d) {
			var j = p[ot(e, d) & te], I = j >> 4;
			if (d += j & 15, d > _) {
				c && ut(0);
				break;
			}
			if (j || ut(2), I < 256) n[f++] = I;
			else if (I == 256) {
				ne = d, p = null;
				break;
			} else {
				var re = I - 254;
				if (I > 264) {
					var D = I - 257, L = ze[D];
					re = at(e, d, (1 << L) - 1) + We[D], d += L;
				}
				var R = m[ot(e, d) & F], ie = R >> 4;
				R || ut(3), d += R & 15;
				var P = qe[ie];
				if (ie > 3) {
					var L = Be[ie];
					P += ot(e, d) & (1 << L) - 1, d += L;
				}
				if (d > _) {
					c && ut(0);
					break;
				}
				s && l(f + 131072);
				var z = f + re;
				if (f < P) {
					var B = a - P, V = Math.min(P, z);
					for (B + f < 0 && ut(3); f < V; ++f) n[f] = r[B + f];
				}
				for (; f < z; ++f) n[f] = n[f - P];
			}
		}
		t.l = p, t.p = ne, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? ct(n, 0, f) : n.subarray(0, f);
}, ft = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, pt = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, mt = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: xt,
		l: 0
	};
	if (i == 1) {
		var o = new Z(n[0].s + 1);
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
	var p = new Le(f + 1), m = ht(n[u - 1], p, 0);
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
		t: new Z(p),
		l: m
	};
}, ht = function(e, t, n) {
	return e.s == -1 ? Math.max(ht(e.l, t, n + 1), ht(e.r, t, n + 1)) : t[e.s] = n;
}, gt = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new Le(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, _t = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, vt = function(e, t, n) {
	var r = n.length, i = st(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, yt = function(e, t, n, r, i, a, o, s, c, l, u) {
	ft(t, u++, n), ++i[256];
	for (var d = mt(i, 15), f = d.t, p = d.l, m = mt(a, 15), h = m.t, g = m.l, _ = gt(f), v = _.c, y = _.n, b = gt(h), x = b.c, S = b.n, C = new Le(19), w = 0; w < v.length; ++w) ++C[v[w] & 31];
	for (var w = 0; w < x.length; ++w) ++C[x[w] & 31];
	for (var T = mt(C, 7), E = T.t, D = T.l, O = 19; O > 4 && !E[Ve[O - 1]]; --O);
	var ee = l + 5 << 3, k = _t(i, Qe) + _t(a, $e) + o, A = _t(i, f) + _t(a, h) + o + 14 + 3 * O + _t(C, E) + 2 * C[16] + 3 * C[17] + 7 * C[18];
	if (c >= 0 && ee <= k && ee <= A) return vt(t, u, e.subarray(c, c + l));
	var j, M, N, P;
	if (ft(t, u, 1 + (A < k)), u += 2, A < k) {
		j = Ze(f, p, 0), M = f, N = Ze(h, g, 0), P = h;
		var te = Ze(E, D, 0);
		ft(t, u, y - 257), ft(t, u + 5, S - 1), ft(t, u + 10, O - 4), u += 14;
		for (var w = 0; w < O; ++w) ft(t, u + 3 * w, E[Ve[w]]);
		u += 3 * O;
		for (var F = [v, x], ne = 0; ne < 2; ++ne) for (var I = F[ne], w = 0; w < I.length; ++w) {
			var re = I[w] & 31;
			ft(t, u, te[re]), u += E[re], re > 15 && (ft(t, u, I[w] >> 5 & 127), u += I[w] >> 12);
		}
	} else j = et, M = Qe, N = nt, P = $e;
	for (var w = 0; w < s; ++w) {
		var L = r[w];
		if (L > 255) {
			var re = L >> 18 & 31;
			pt(t, u, j[re + 257]), u += M[re + 257], re > 7 && (ft(t, u, L >> 23 & 31), u += ze[re]);
			var R = L & 31;
			pt(t, u, N[R]), u += P[R], R > 3 && (pt(t, u, L >> 5 & 8191), u += Be[R]);
		} else pt(t, u, j[L]), u += M[L];
	}
	return pt(t, u, j[256]), u + M[256];
}, bt = /*#__PURE__*/ new Re([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), xt = /*#__PURE__*/ new Z(0), St = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new Z(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = bt[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new Le(32768), g = a.h || new Le(m + 1), _ = Math.ceil(n / 3), v = 2 * _, y = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
		}, b = new Re(25e3), x = new Le(288), S = new Le(32), C = 0, w = 0, T = a.i || 0, E = 0, D = a.w || 0, O = 0; T + 2 < o; ++T) {
			var ee = y(T), k = T & 32767, A = g[ee];
			if (h[k] = A, g[ee] = k, D <= T) {
				var j = o - T;
				if ((C > 7e3 || E > 24576) && (j > 423 || !l)) {
					u = yt(e, c, 0, b, x, S, w, E, O, T - O, u), E = C = w = 0, O = T;
					for (var M = 0; M < 286; ++M) x[M] = 0;
					for (var M = 0; M < 30; ++M) S[M] = 0;
				}
				var N = 2, P = 0, te = p, F = k - A & 32767;
				if (j > 2 && ee == y(T - F)) for (var ne = Math.min(f, j) - 1, I = Math.min(32767, T), re = Math.min(258, j); F <= I && --te && k != A;) {
					if (e[T + N] == e[T + N - F]) {
						for (var L = 0; L < re && e[T + L] == e[T + L - F]; ++L);
						if (L > N) {
							if (N = L, P = F, L > ne) break;
							for (var R = Math.min(F, L - 2), ie = 0, M = 0; M < R; ++M) {
								var z = T - F + M & 32767, B = z - h[z] & 32767;
								B > ie && (ie = B, A = z);
							}
						}
					}
					k = A, A = h[k], F += k - A & 32767;
				}
				if (P) {
					b[E++] = 268435456 | Ge[N] << 18 | Je[P];
					var V = Ge[N] & 31, ae = Je[P] & 31;
					w += ze[V] + Be[ae], ++x[257 + V], ++S[ae], D = T + N, ++C;
				} else b[E++] = e[T], ++x[e[T]];
			}
		}
		for (T = Math.max(T, D); T < o; ++T) b[E++] = e[T], ++x[e[T]];
		u = yt(e, c, l, b, x, S, w, E, O, T - O, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = T, a.w = D);
	} else {
		for (var T = a.w || 0; T < o + l; T += 65535) {
			var oe = T + 65535;
			oe >= o && (c[u / 8 | 0] = l, oe = o), u = vt(c, u + 1, e.subarray(T, oe));
		}
		a.i = o;
	}
	return ct(s, 0, r + st(u) + i);
}, Ct = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new Z(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return St(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
function wt(e, t) {
	return Ct(e, t || {}, 0, 0);
}
var Tt = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new Z(32768), this.p = new Z(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || ut(5), this.d && ut(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new Z(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = dt(this.p, this.s, this.o);
		this.ondata(ct(n, t, this.s.b), this.d), this.o = ct(n, this.s.b - 32768), this.s.b = this.o.length, this.p = ct(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}(), Et = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	Et.decode(xt, { stream: !0 });
} catch {}
var $ = 32768, Dt = $ * 3, Ot = 102400, kt = 62258, At = 1, jt = (e, t) => typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t, Mt = (e) => Math.max(-32768, Math.min(32767, Math.round(e * 4))), Nt = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
function Pt(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return btoa(t);
}
function Ft(e, t) {
	if (typeof e != "string" || e.length > Math.ceil(t / 3) * 4 || !Nt.test(e)) throw Error("Invalid turf payload");
	let n = atob(e);
	if (n.length !== t) throw Error("Invalid turf atlas length");
	return Uint8Array.from(n, (e) => e.charCodeAt(0));
}
function It(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function Lt(e) {
	if (typeof e != "string" || e.length > Math.ceil(Ot / 3) * 4 || !Nt.test(e)) throw Error("Invalid turf surface payload");
	let t = atob(e);
	if (!t.length || t.length > Ot) throw Error("Invalid turf surface length");
	let n = Uint8Array.from(t, (e) => e.charCodeAt(0)), r = new Uint8Array(Dt), i = 0, a = !1, o = new Tt((e, t) => {
		if (i + e.length > Dt) throw Error("Expanded turf surface exceeds size limit");
		r.set(e, i), i += e.length, a = t;
	});
	for (let e = 0; e < n.length; e += 256) o.push(n.subarray(e, e + 256), e + 256 >= n.length);
	if (!a || i !== Dt) throw Error("Invalid turf surface length");
	return r;
}
function Rt(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n & 255, 16777619), t = Math.imul(t ^ n >>> 8, 16777619);
	return t >>> 0;
}
function zt(e, t, n, r, i, a, o, s, c, [l, u, d]) {
	let f = Math.max(0, Math.floor((Math.min(t, r) - a + s) * 256 / (2 * s))), p = Math.min(255, Math.ceil((Math.max(t, r) + a + s) * 256 / (2 * s))), m = Math.max(0, Math.floor((Math.min(n, i) - a + c) * 128 / (2 * c))), h = Math.min(127, Math.ceil((Math.max(n, i) + a + c) * 128 / (2 * c)));
	if (p < f || h < m) return !1;
	let g = r - t, _ = i - n, v = g * g + _ * _;
	if (!v) return !1;
	let y = Math.sqrt(v), b = a * a, x = !1;
	for (let r = m; r <= h; r++) {
		let i = (2 * r + 1 - 128) * c / 128;
		for (let a = f; a <= p; a++) {
			let c = (2 * a + 1 - 256) * s / 256, f = Math.abs(c), p = Math.abs(i);
			if (f > l || p > u || d > 0 && f > l - d && p > u - d && (f - l + d) ** 2 + (p - u + d) ** 2 > d ** 2) continue;
			let m = Math.max(0, Math.min(1, ((c - t) * g + (i - n) * _) / v)), h = c - t - g * m, S = i - n - _ * m, C = h * h + S * S;
			if (C >= b) continue;
			let w = r * 256 + a, T = Math.round(y * o * (1 - C / b) * (1 - e[w] / 65535) / 32);
			if (!T) continue;
			let E = Math.min(kt, e[w] + T);
			E !== e[w] && (e[w] = E, x = !0);
		}
	}
	return x;
}
var Bt = class {
	atlas = new Uint16Array($);
	image = new Uint8Array($);
	surfaceRgb;
	surfaceImage = new Uint8Array($ * 4);
	surfaceDirty = !0;
	imageDirty = !0;
	digestDirty = !0;
	digestValue = Rt(this.atlas);
	previous = /* @__PURE__ */ new Map();
	stadium;
	lastTick = -1;
	lastElapsed = -1;
	lastPhase = "lobby";
	generation = 0;
	revision = 0;
	field = [0, 0];
	halfWidthQ = 0;
	halfHeightQ = 0;
	grassWidthQ = 0;
	grassHeightQ = 0;
	cornerQ = 0;
	get digest() {
		return this.digestDirty &&= (this.digestValue = Rt(this.atlas), !1), this.digestValue;
	}
	get hasPressure() {
		let e = this.surfaceRgb;
		if (!e) return !1;
		for (let t = 0; t < Dt; t += 3) if (e[t] !== 0) return !0;
		return !1;
	}
	pixels() {
		if (this.imageDirty) {
			for (let e = 0; e < $; e++) this.image[e] = Math.round(this.atlas[e] * 255 / 65535);
			this.imageDirty = !1;
		}
		return this.image;
	}
	surfacePixels() {
		if (this.surfaceDirty || this.imageDirty) {
			let e = this.pixels(), t = this.surfaceRgb;
			for (let n = 0; n < $; n++) {
				let r = n * 4, i = n * 3;
				this.surfaceImage[r] = t ? t[i] : 0, this.surfaceImage[r + 1] = t ? t[i + 1] : 128, this.surfaceImage[r + 2] = t ? t[i + 2] : 128, this.surfaceImage[r + 3] = e[n];
			}
			this.surfaceDirty = !1;
		}
		return this.surfaceImage;
	}
	reset(e, t, n) {
		this.atlas.fill(0), this.surfaceRgb = void 0, this.surfaceDirty = !0, this.previous.clear(), this.generation = this.generation + 1 >>> 0, this.halfWidthQ = e, this.halfHeightQ = t, [this.grassWidthQ, this.grassHeightQ, this.cornerQ] = n, this.field = [e / 4, t / 4], this.imageDirty = !0, this.digestDirty = !0, this.revision++;
	}
	capture(e) {
		let t = e.stadium, n = Math.round((Math.max(t.width, t.bg.width) + 32) * 4), r = Math.round((Math.max(t.height, t.bg.height) + 32) * 4), i = Math.round(t.bg.width * 4), a = Math.round(t.bg.height * 4), o = Math.round(Math.min(t.bg.cornerRadius ?? 0, t.bg.width, t.bg.height) * 4);
		if (!jt(n, 65535) || !jt(r, 65535) || n === 0 || r === 0 || !jt(i, n) || !jt(a, r) || !jt(o, Math.min(i, a))) throw Error("Invalid turf field");
		if ((this.stadium !== t || this.lastTick > e.tick || this.lastElapsed > 0 && e.elapsed < this.lastElapsed || e.phase === "lobby" && this.lastPhase !== "lobby" || this.halfWidthQ !== n || this.halfHeightQ !== r || this.grassWidthQ !== i || this.grassHeightQ !== a || this.cornerQ !== o) && this.reset(n, r, [
			i,
			a,
			o
		]), this.stadium = t, this.lastTick = e.tick, this.lastElapsed = e.elapsed, this.lastPhase = e.phase, e.phase !== "playing" || e.paused || e.resumeTicks || t.bg.type !== "grass") {
			this.previous.clear();
			return;
		}
		if (e.tick % 6 != 0) return;
		let s = /* @__PURE__ */ new Set(), c = e.data, l = 0;
		for (let e = 0; e < c.length / 18; e++) {
			let t = e * 18;
			if (e !== 0 && (!c[t + 12] || c[t + 13] === 0)) continue;
			let u = c[t], d = c[t + 1], f = c[t + 4];
			if (!Number.isFinite(u) || !Number.isFinite(d) || !Number.isFinite(f)) continue;
			s.add(e);
			let p = this.previous.get(e);
			if (p && l < 33) {
				let t = Math.hypot(u - p[0], d - p[1]);
				t > .1 && t < 60 && (l++, zt(this.atlas, Mt(p[0]), Mt(p[1]), Mt(u), Mt(d), Math.max(1, Math.min(96, Math.round(Math.max(3.5, f * .78) * 4))), e === 0 ? 31 : 255, n, r, [
					i,
					a,
					o
				]) && (this.imageDirty = !0, this.surfaceDirty = !0, this.digestDirty = !0, this.revision++));
			}
			this.previous.set(e, [u, d]);
		}
		for (let e of this.previous.keys()) s.has(e) || this.previous.delete(e);
	}
	seed(e) {
		if (!(e instanceof Uint8Array) || e.length !== $) throw Error("Invalid turf seed");
		for (let t = 0; t < $; t++) this.atlas[t] = Math.min(kt, Math.round(e[t] * 65535 / 255));
		this.surfaceRgb = void 0, this.surfaceDirty = !0, this.imageDirty = !0, this.digestDirty = !0, this.revision++;
	}
	seedSurface(e) {
		if (!(e instanceof Uint8Array) || e.length !== $ * 4) throw Error("Invalid turf surface seed");
		let t = new Uint8Array(Dt);
		for (let n = 0; n < $; n++) {
			let r = n * 4, i = n * 3;
			t[i] = e[r], t[i + 1] = e[r + 1], t[i + 2] = e[r + 2], this.atlas[n] = Math.min(kt, Math.round(e[r + 3] * 65535 / 255));
		}
		this.surfaceRgb = t, this.surfaceDirty = !0, this.imageDirty = !0, this.digestDirty = !0, this.revision++;
	}
	checkpoint() {
		if (!this.halfWidthQ || !this.halfHeightQ) throw Error("Turf field is not initialized");
		let e = new Uint8Array($ * 2), t = new DataView(e.buffer);
		for (let e = 0; e < $; e++) t.setUint16(e * 2, this.atlas[e], !0);
		let n = {
			type: "turf-checkpoint",
			version: At,
			generation: this.generation,
			halfWidthQ: this.halfWidthQ,
			halfHeightQ: this.halfHeightQ,
			grassWidthQ: this.grassWidthQ,
			grassHeightQ: this.grassHeightQ,
			cornerQ: this.cornerQ,
			digest: this.digest,
			atlas: Pt(e)
		};
		if (this.surfaceRgb) {
			let e = wt(this.surfaceRgb, { level: 1 });
			if (e.length > Ot) throw Error("Compressed turf surface exceeds size limit");
			n.surface = Pt(e), n.surfaceDigest = It(this.surfaceRgb);
		}
		return n;
	}
	restore(e) {
		if (!e || typeof e != "object") throw Error("Invalid turf checkpoint");
		let t = e;
		if (t.type !== "turf-checkpoint" || t.version !== At || !jt(t.generation, 4294967295) || !jt(t.halfWidthQ, 65535) || !jt(t.halfHeightQ, 65535) || !t.halfWidthQ || !t.halfHeightQ || !jt(t.grassWidthQ, t.halfWidthQ) || !jt(t.grassHeightQ, t.halfHeightQ) || !jt(t.cornerQ, Math.min(t.grassWidthQ, t.grassHeightQ)) || !jt(t.digest, 4294967295)) throw Error("Invalid turf checkpoint");
		let n = Ft(t.atlas, $ * 2), r = new DataView(n.buffer, n.byteOffset, n.byteLength), i = new Uint16Array($);
		for (let e = 0; e < $; e++) if (i[e] = r.getUint16(e * 2, !0), i[e] > kt) throw Error("Invalid turf wear");
		if (Rt(i) !== t.digest) throw Error("Turf checksum mismatch");
		if (t.surface === void 0 != (t.surfaceDigest === void 0)) throw Error("Invalid turf surface envelope");
		let a;
		if (t.surface !== void 0) {
			if (!jt(t.surfaceDigest, 4294967295)) throw Error("Invalid turf surface checksum");
			if (a = Lt(t.surface), It(a) !== t.surfaceDigest) throw Error("Turf surface checksum mismatch");
		}
		this.generation > t.generation && this.generation - t.generation < 2147483648 || (this.atlas = i, this.surfaceRgb = a, this.surfaceDirty = !0, this.digestValue = t.digest, this.digestDirty = !1, this.generation = t.generation, this.halfWidthQ = t.halfWidthQ, this.halfHeightQ = t.halfHeightQ, this.grassWidthQ = t.grassWidthQ, this.grassHeightQ = t.grassHeightQ, this.cornerQ = t.cornerQ, this.field = [t.halfWidthQ / 4, t.halfHeightQ / 4], this.previous.clear(), this.imageDirty = !0, this.revision++);
	}
};
function Vt(e) {
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
var Ht = /* @__PURE__ */ new Set([
	"noPlayer",
	"playerName",
	"roomName",
	"maxPlayers",
	"password",
	"public",
	"stadium",
	"geo"
]);
function Ut(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	for (let t of Object.keys(e)) {
		if (t === "token") throw Error("External service tokens are not supported. Ball2D join verification is configured on the room.");
		if (!Ht.has(t)) throw Error(`Unknown room setting: ${t}`);
	}
	let t = { ...e };
	if (typeof t.roomName != "string" || !t.roomName.trim() || t.roomName.length > 64) throw Error("Room name must contain 1–64 characters");
	for (let e of ["public", "noPlayer"]) if (t[e] !== void 0 && typeof t[e] != "boolean") throw Error(`Invalid ${e} setting: expected a boolean`);
	if (t.maxPlayers !== void 0 && (typeof t.maxPlayers != "number" || !Number.isInteger(t.maxPlayers) || t.maxPlayers < 2 || t.maxPlayers > 32)) throw Error("maxPlayers must be an integer between 2 and 32");
	if (t.password !== void 0 && (typeof t.password != "string" || t.password.length > 64)) throw Error("Password must be a string of at most 64 characters");
	if (t.stadium !== void 0 && typeof t.stadium != "string") throw Error("Stadium must be a Ball2D stadium source string");
	if (t.noPlayer === !1 && t.playerName !== void 0 && (typeof t.playerName != "string" || !t.playerName.trim() || t.playerName.length > 24)) throw Error("Invalid host player name");
	return {
		roomName: t.roomName,
		maxPlayers: t.maxPlayers ?? 16,
		password: t.password ?? "",
		public: t.public ?? !0,
		noPlayer: t.noPlayer ?? !0,
		playerName: t.noPlayer === !1 ? (t.playerName ?? "Host").trim() : void 0,
		stadium: t.stadium,
		...t.geo === void 0 ? {} : { geo: Vt(t.geo) }
	};
}
function Wt(e) {
	return /^(?:[0-9a-f]{10}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(e) ? e.toLowerCase() : null;
}
function Gt(e) {
	let t = Wt(e);
	if (!t) throw Error("Invalid room code");
	return `/r/${t}`;
}
var Kt = [
	"normal",
	"bold",
	"italic",
	"small",
	"small-bold",
	"small-italic"
];
function qt(e, t, n, r) {
	if (typeof e != "string" || e.length > 1e3) throw Error("Announcement exceeds 1000 characters");
	if (t != null && (!Number.isInteger(t) || t < 0 || t > 16777215)) throw Error("Invalid announcement color");
	if (n != null && !Kt.includes(n)) throw Error("Invalid announcement style");
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
function Jt(e) {
	let t = new URL(e);
	if (!["http:", "https:"].includes(t.protocol) || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected an HTTP(S) service origin without credentials or a path");
	return t.origin;
}
function Yt(e) {
	let t = new URL(e.assets);
	if (![
		"http:",
		"https:",
		"ball2d:"
	].includes(t.protocol) || !t.host || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected a root asset origin");
	let n = Jt(e.service), r = Jt(e.public);
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
			if (!t.pathname.startsWith(`${T}/`) || t.hash) throw Error("Expected a versioned application API path");
			return t;
		}
	};
}
function Xt() {
	let e = location.origin;
	return Yt({
		assets: e,
		service: e,
		public: e
	});
}
var Zt = null, Qt = null;
function $t(e) {
	if (Object.keys(e).length !== 2 || e.bundlePolicy !== "max-bundle") return !1;
	let t = e.iceServers;
	if (t?.length !== 1) return !1;
	let n = t[0];
	return Object.keys(n).length === 1 && n.urls === "stun:stun.l.google.com:19302";
}
function en() {
	Qt?.removeEventListener("pagehide", tn), Qt = null;
}
function tn() {
	let e = Zt;
	Zt = null, en(), e?.close();
}
function nn(e) {
	let t = {
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
			return e.maxRetransmits;
		},
		get maxPacketLifeTime() {
			return e.maxPacketLifeTime;
		},
		get bufferedAmount() {
			return e.bufferedAmount;
		},
		onopen: null,
		onclose: null,
		onmessage: null,
		send(t) {
			e.send(t);
		},
		close() {
			e.close();
		}
	};
	return e.binaryType = "arraybuffer", e.onopen = () => t.onopen?.(), e.onclose = () => t.onclose?.(), e.onmessage = ({ data: e }) => t.onmessage?.({ data: e }), t;
}
function rn(e, t) {
	let n = {
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
			return e.localDescription;
		},
		get remoteDescription() {
			return e.remoteDescription;
		},
		onicecandidate: null,
		ondatachannel: null,
		onconnectionstatechange: null,
		oniceconnectionstatechange: null,
		createDataChannel: (t, n) => nn(e.createDataChannel(t, n)),
		createOffer: (t) => e.createOffer(t),
		createAnswer: () => e.createAnswer(),
		setLocalDescription: (t) => e.setLocalDescription(t),
		setRemoteDescription: (t) => e.setRemoteDescription(t),
		addIceCandidate: (t) => e.addIceCandidate(t),
		getStats: () => e.getStats(),
		close: t
	};
	return e.onicecandidate = ({ candidate: e }) => n.onicecandidate?.({ candidate: e ?? null }), e.ondatachannel = ({ channel: e }) => n.ondatachannel?.({ channel: nn(e) }), e.onconnectionstatechange = () => n.onconnectionstatechange?.(), e.oniceconnectionstatechange = () => n.oniceconnectionstatechange?.(), n;
}
function an(e) {
	let t;
	return Zt && $t(e) ? (t = Zt, Zt = null, en(), t.signalingState === "closed" && (t = new RTCPeerConnection(e))) : t = new RTCPeerConnection(e), rn(t, () => t.close());
}
function on(e = Xt()) {
	return {
		serviceOrigin: e.serviceOrigin,
		createWebSocket: (e, t) => new WebSocket(e, t),
		createPeerConnection: an
	};
}
var sn = [
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
function cn(e) {
	let t = /* @__PURE__ */ new Map();
	return async (n) => {
		let r = sn.find(([e, t]) => e === n || t === n);
		if (!r) throw Error("Unknown default stadium");
		let i = t.get(r[0]);
		return i || (i = (async () => {
			let t = await e(`/stadiums/${r[0]}.ball2dstadium`);
			if (!t.ok) throw Error("Could not load stadium");
			let n = await t.text();
			return Me(n), n;
		})(), t.set(r[0], i), i.catch(() => t.delete(r[0]))), i;
	};
}
function ln(e = Xt()) {
	let t = on(e), n = (e, t) => fetch(e, t);
	return {
		network: t,
		publicOrigin: e.publicOrigin,
		request: n,
		loadEngine: async (t) => {
			let r = await n(e.asset(`/core.wasm?v=${xe}`), { signal: t });
			if (!r.ok) throw Error("Could not load bundled physics engine");
			return Ie.create(await r.arrayBuffer(), t);
		},
		loadStadium: cn((t) => n(e.asset(t)))
	};
}
var un = {
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
}, dn = class {
	peers = /* @__PURE__ */ new Map();
	allow(e, t, n = performance.now()) {
		let r = this.peers.get(e);
		r || (r = {}, this.peers.set(e, r));
		let { burst: i, perSecond: a } = un[t], o = r[t] ?? {
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
}, fn = 33554432, pn = new TextEncoder();
new TextDecoder("utf-8", { fatal: !0 });
function mn(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function hn(e) {
	if (e.length > 33554432) throw Error("Replay exceeds 32 MB");
	let t = wt(e, { level: 6 }), n = new Uint8Array(16 + t.length), r = new DataView(n.buffer);
	return n.set([
		66,
		50,
		68,
		90,
		1,
		0,
		0,
		0
	]), r.setUint32(8, e.length, !0), r.setUint32(12, mn(e), !0), n.set(t, 16), n;
}
function gn(e) {
	if (typeof e == "string") {
		if (pn.encode(e).length > 33554432) throw Error("Replay exceeds 32 MB");
		return pn.encode(e);
	}
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t.length > 33554432) throw Error("Replay exceeds 32 MB");
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 90) return t;
	if (t.length < 17 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid compressed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0);
	if (!r || r > 33554432) throw Error("Invalid expanded replay size");
	let i = new Uint8Array(r), a = 0, o = !1, s = new Tt((e, t) => {
		if (a + e.length > r) throw Error("Expanded replay exceeds declared size");
		i.set(e, a), a += e.length, o = t;
	});
	for (let e = 16; e < t.length; e += 1024) s.push(t.subarray(e, e + 1024), e + 1024 >= t.length);
	if (!o || a !== r || mn(i) !== n.getUint32(12, !0)) throw Error("Compressed replay integrity failure");
	return i;
}
var _n = [
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
], vn = new TextEncoder(), yn = new TextDecoder("utf-8", { fatal: !0 });
function bn(e) {
	return hn(xn(e));
}
function xn(e) {
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
	let a = vn.encode(JSON.stringify({
		...n,
		checkpoints: i
	}));
	if (t.length > 5e5 || a.length + 16 > 33554432) throw Error("Replay exceeds bounds");
	let o = t.length * 12 + t.filter((e) => e.kind === "disc").length * 106, s = new Uint8Array(Math.min(fn, o)), c = new DataView(s.buffer), l = (e) => {
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
		let t = _n.indexOf(e.kind);
		if ((e.kind === "join" || e.kind === "finishDraw") && e.value !== 0 || e.kind === "team" && e.value > 2) throw Error("Invalid replay team command");
		if (t < 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31) || e.kind === "finishDraw" && e.slot !== 0) throw Error("Invalid replay command");
		if (f(e.tick - d), l(1), s[u++] = t, f(e.slot), f(e.value), e.kind === "disc") {
			let t = be(e.properties), n = 0;
			Y.forEach(([e], r) => {
				t[e] !== void 0 && (n |= 1 << r);
			}), f(n);
			for (let [e] of Y) {
				let n = t[e];
				n !== void 0 && (l(8), c.setFloat64(u, n, !0), u += 8);
			}
		}
		d = e.tick;
	}
	let p = 16 + a.length + r + u;
	if (p > 33554432) throw Error("Replay exceeds 32 MB");
	let m = new Uint8Array(p), h = new DataView(m.buffer);
	m.set([
		66,
		50,
		68,
		49,
		1,
		0,
		0,
		0
	]), h.setUint32(8, a.length, !0), h.setUint32(12, t.length, !0), m.set(a, 16);
	let g = 16 + a.length;
	for (let t of e.checkpoints) for (let e of t.state.discs) h.setFloat64(g, e, !0), g += 8;
	return m.set(s.subarray(0, u), g), m;
}
function Sn(e) {
	let t = gn(e);
	if (t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 49) {
		if (t[0] === 66 && t[1] === 50 && t[2] === 68) throw Error("Unsupported packed replay format");
		return JSON.parse(yn.decode(t));
	}
	if (t.length < 16 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid packed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0), i = n.getUint32(12, !0);
	if (r > t.length - 16 || i > 5e5 || i > (t.length - 16 - r) / 3) throw Error("Invalid packed replay bounds");
	let a = JSON.parse(yn.decode(t.subarray(16, 16 + r)));
	if (!a || !Number.isSafeInteger(a.initial?.tick) || a.initial.tick < 0) throw Error("Invalid replay initial tick");
	a.commands = [];
	let o = 16 + r, s = a.initial.tick;
	if (!Array.isArray(a.checkpoints) || a.checkpoints.length > 721) throw Error("Invalid packed checkpoints");
	let c = 0;
	for (let e of a.checkpoints) {
		let t = e?.state?.discs;
		if (typeof t != "number" || !Number.isInteger(t) || t < 0 || t > 1728) throw Error("Invalid checkpoint disc count");
		c += t * 8;
	}
	if (c > t.length - o - i * 3) throw Error("Truncated checkpoint discs");
	for (let e of a.checkpoints) {
		let t = e.state.discs, r = Array(t);
		for (let e = 0; e < t; e++) {
			let t = n.getFloat64(o, !0);
			if (!Number.isFinite(t)) throw Error("Nonfinite checkpoint disc");
			r[e] = t, o += 8;
		}
		e.state.discs = r;
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
		let e = _n[t[o++]];
		if (!e) throw Error("Unknown replay command");
		let r = l(), i = l();
		if (e === "disc") {
			let c = l();
			if (c > 8191) throw Error("Invalid disc property mask");
			let u = {};
			Y.forEach(([e], r) => {
				if (c & 1 << r) {
					if (o + 8 > t.length) throw Error("Truncated disc properties");
					u[e] = n.getFloat64(o, !0), o += 8;
				}
			}), a.commands.push({
				tick: s,
				kind: e,
				slot: r,
				value: i,
				properties: be(u)
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
function Cn(e) {
	let t = JSON.stringify(e), n = 2166136261;
	for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return (n >>> 0).toString(16).padStart(8, "0");
}
function wn(e, t) {
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
			e.setKickRateLimit(t.value & 255, t.value >>> 8 & 255, t.value >>> 16);
			break;
		case "pause": e.setPaused(!!t.value);
	}
}
var Tn = class {
	replay;
	playerOrder = [];
	lastInputs = /* @__PURE__ */ new Map();
	bytes = 0;
	full = !1;
	canRecord(e) {
		return !this.full && e.tick - this.replay.initial.tick < Pe * 3600;
	}
	constructor(e, t = [], n = [null, null]) {
		let r = e.snapshot();
		this.playerOrder = t.map((e) => e.slot), this.replay = {
			magic: "B2DR",
			version: 1,
			engine: Fe,
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
				teams: y(n)
			}],
			orders: [{
				tick: r.tick,
				slots: [...this.playerOrder]
			}],
			end: r.tick,
			finalHash: Cn(r)
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
			teams: y(t)
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
			properties: be(e.properties)
		} : { ...e }), !0);
	}
	step(e) {
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + 14]);
		if (e.tick % (Pe * 5) == 0) {
			let t = e.snapshot(), n = {
				tick: e.tick,
				state: t,
				hash: Cn(t)
			};
			this.reserve(n) && this.replay.checkpoints.push(n);
		}
		this.replay.end = e.tick;
	}
	pack(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Cn(e.snapshot()), xn(this.replay);
	}
	finish(e) {
		return this.replay.end = e.tick, this.replay.finalHash = Cn(e.snapshot()), new Blob([bn(this.replay)], { type: "application/x-ball2d-replay" });
	}
};
async function En(e) {
	if (e.size > 33554432) throw Error("Replay exceeds 32 MB");
	return Dn(await e.arrayBuffer());
}
function Dn(e) {
	let t = Sn(e);
	if (t.magic !== "B2DR" || t.version !== 1 || t.engine !== Fe) throw Error("Unsupported replay engine/version");
	if (!Array.isArray(t.commands) || t.commands.length > 5e5 || !Array.isArray(t.checkpoints) || t.checkpoints.length > 721 || !Number.isInteger(t.end) || t.end < t.initial.tick || t.end - t.initial.tick > Pe * 3600) throw Error("Invalid replay bounds");
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
			"finishDraw"
		].includes(e.kind) || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31) || e.kind === "finishDraw" && e.slot !== 0 || !Number.isInteger(e.value) || e.value < 0 || e.value > (e.kind === "finishDraw" || e.kind === "disc" || e.kind === "join" ? 0 : e.kind === "kickRate" ? 6619135 : e.kind === "timeLimit" ? 5940 : e.kind === "scoreLimit" ? 99 : e.kind === "team" ? 2 : e.kind === "pause" ? 1 : 31)) throw Error("Invalid replay command");
		e.kind === "disc" && (e.properties = be(e.properties)), n = e.tick;
	}
	if (!Array.isArray(t.roster) || t.roster.length > 4096) throw Error("Invalid replay roster");
	n = t.initial.tick;
	for (let e of t.roster) {
		if (!Number.isInteger(e.tick) || e.tick < n || e.tick > t.end || !Number.isInteger(e.slot) || e.slot < 0 || e.slot >= 32 || e.name !== null && (typeof e.name != "string" || e.name.length > 24) || e.avatar !== void 0 && !_(e.avatar)) throw Error("Invalid roster event");
		n = e.tick;
	}
	if (t.styles !== void 0) {
		if (!Array.isArray(t.styles) || t.styles.length > 4096) throw Error("Invalid replay styles");
		let e = t.initial.tick;
		for (let n of t.styles) {
			if (!n || !Number.isInteger(n.tick) || n.tick < e || n.tick > t.end || n.teams === void 0) throw Error("Invalid replay style");
			n.teams = y(n.teams), e = n.tick;
		}
	}
	if (t.orders !== void 0) {
		if (!Array.isArray(t.orders) || t.orders.length > 4096) throw Error("Invalid replay orders");
		let e = t.initial.tick;
		for (let n of t.orders) {
			if (!n || !Number.isInteger(n.tick) || n.tick < e || n.tick > t.end || !Array.isArray(n.slots) || n.slots.length > 32 || n.slots.some((e) => !Number.isInteger(e) || e < 0 || e >= 32) || new Set(n.slots).size !== n.slots.length) throw Error("Invalid replay order");
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
var On = class {
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
		r && (i.properties = r), this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(i)) && this.finishRecording("Recording limit reached"), this.assertOpen(), wn(this.engine, i);
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
		this.recorder = new Tn(this.engine, e, t);
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
}, kn = class {
	match;
	now;
	peers = /* @__PURE__ */ new Map();
	closed = !1;
	constructor(e, t = () => performance.now()) {
		this.match = e, this.now = t;
	}
	accept(e, t, n, r) {
		if (this.closed) return;
		let i = k(n);
		if (i.epoch !== r) return;
		let a = this.peers.get(e);
		if (!a || ee(i.seq, a.seq)) return this.peers.set(e, {
			seq: i.seq,
			received: this.now(),
			keys: i.keys
		}), this.match.command("input", t, i.keys), i.keys !== (a?.keys ?? 0);
	}
	expire(e, t, n = this.now()) {
		if (this.closed) return;
		let r = this.peers.get(e), i = this.match.engine;
		r && n - r.received > 250 && i.data[i.index(t) * 18 + 14] !== 0 && this.match.command("input", t, 0);
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
}, An = /* @__PURE__ */ K(/* @__PURE__ */ U({
	id: /* @__PURE__ */ K(/* @__PURE__ */ de(), /* @__PURE__ */ z(1)),
	hostId: /* @__PURE__ */ K(/* @__PURE__ */ de(), /* @__PURE__ */ z(1)),
	role: /* @__PURE__ */ ue(["host", "guest"]),
	generation: /* @__PURE__ */ le(q),
	requireVerification: /* @__PURE__ */ le(/* @__PURE__ */ G()),
	locked: /* @__PURE__ */ le(/* @__PURE__ */ G())
}), /* @__PURE__ */ R((e) => e.role === "host" == (e.id === e.hostId))), jn = /* @__PURE__ */ U({
	roomId: /* @__PURE__ */ de(),
	siteKey: /* @__PURE__ */ K(/* @__PURE__ */ de(), /* @__PURE__ */ B(/^[A-Za-z0-9_-]{1,100}$/))
}), Mn = 524288, Nn = 16384, Pn = 12;
function Fn(e, t) {
	let n = JSON.stringify(e);
	if (n === void 0) throw Error("Missing control message");
	let r = new TextEncoder().encode(n);
	if (r.length > Mn) throw Error("Control message exceeds 512 KB");
	if (r.length <= Nn) return [n];
	let i = Math.ceil(r.length / Nn), a = [];
	for (let e = 0; e < i; e++) {
		let n = r.subarray(e * Nn, (e + 1) * Nn), o = new ArrayBuffer(Pn + n.length), s = new DataView(o);
		s.setUint16(0, 45635), s.setUint8(2, 1), s.setUint32(4, t, !0), s.setUint16(8, e, !0), s.setUint16(10, i, !0), new Uint8Array(o, Pn).set(n), a.push(o);
	}
	return a;
}
var In = class {
	partial;
	push(e, t = performance.now()) {
		if (typeof e == "string") {
			if (this.partial || new TextEncoder().encode(e).length > Nn) throw Error("Invalid control message");
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
		if (o.next++, o.bytes += e.byteLength - Pn, o.bytes > Mn) throw Error("Control size limit");
		if (o.parts.push(new Uint8Array(e.slice(Pn))), o.next !== a) return;
		let s = new Uint8Array(o.bytes), c = 0;
		for (let e of o.parts) s.set(e, c), c += e.length;
		return this.partial = void 0, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s));
	}
}, Ln = class {
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
		this.assembler ??= new In();
		let r = this.assembler.push(e);
		if (r !== void 0 && n && t && (!r || typeof r != "object" || !("type" in r) || r.type !== "action" || !("action" in r) || r.action !== "customStadium")) throw Error("Invalid bulk action");
		return r;
	}
}, Rn = (e) => e?.match(/(?:^|\r?\n)a=ice-ufrag:([^\s]+)/)?.[1], zn = (e) => e.usernameFragment ?? e.candidate?.match(/(?:^| )ufrag ([^ ]+)/)?.[1];
function Bn(e) {
	let t = e.pc.localDescription;
	if (!t?.sdp) throw Error("Local peer description is unavailable");
	return t.sdp;
}
function Vn(e, t, n) {
	if (n()) {
		if (e.candidates.length >= 128) throw Error("Too many pending ICE candidates");
		e.candidates.push(t);
	}
}
async function Hn(e, t) {
	let n = e.candidates.splice(0);
	for (let r of n) {
		if (!t.current()) return;
		if (!t.versioned || e.remoteIceUfrag && zn(r) === e.remoteIceUfrag) try {
			await e.pc.addIceCandidate(r);
		} catch {}
	}
}
async function Un(e, t, n) {
	let r = await e.pc.createOffer(n);
	return !t.current() || (e.localIceUfrag = Rn(r.sdp), await e.pc.setLocalDescription(r), !t.current()) ? !1 : (t.publish({
		type: "offer",
		sdp: Bn(e)
	}), !0);
}
async function Wn(e, t, n) {
	if (await e.pc.setRemoteDescription({
		type: "offer",
		sdp: t
	}), !n.current() || (await Hn(e, n), !n.current())) return;
	let r = await e.pc.createAnswer();
	n.current() && (e.localIceUfrag = Rn(r.sdp), await e.pc.setLocalDescription(r), n.current() && n.publish({
		type: "answer",
		sdp: Bn(e)
	}));
}
async function Gn(e, t, n) {
	return await e.pc.setRemoteDescription({
		type: "answer",
		sdp: t
	}), n.current() ? (await Hn(e, n), !0) : !1;
}
async function Kn(e, t, n) {
	if (!(n.versioned && (!zn(t) || e.remoteIceUfrag && zn(t) !== e.remoteIceUfrag))) {
		if (!e.pc.remoteDescription) Vn(e, t, n.current);
		else try {
			await e.pc.addIceCandidate(t);
		} catch {
			Vn(e, t, n.current);
		}
	}
}
var qn = class extends Error {}, Jn = class {
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
}, Yn = class {
	available;
	send;
	verification = null;
	verificationRequest = new Jn({
		pending: "A verification update is already pending.",
		timeout: "Verification update was not confirmed.",
		send: "Verification update could not be sent."
	}, (e) => (this.verification = null, Error(e)));
	passwordRequest = new Jn({
		pending: "A password update is already pending.",
		timeout: "Password update was not confirmed.",
		send: "Password update could not be sent."
	});
	banRequest = new Jn({
		pending: "A ban operation is already pending.",
		timeout: "Ban operation was not confirmed.",
		send: "Ban operation could not be sent."
	}, (e) => new qn(e));
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
};
function Xn(e) {
	let t = [...e], n = new Set(t.filter((e) => e.type === "transport" && e.selectedCandidatePairId).map((e) => e.selectedCandidatePairId)), r = t.filter((e) => e.type === "candidate-pair" && e.state === "succeeded"), i = n.size ? r.filter((e) => n.has(e.id)) : r.filter((e) => e.nominated === !0);
	if (i.length !== 1) return null;
	let a = i[0].currentRoundTripTime;
	return typeof a == "number" && Number.isFinite(a) && a >= 0 ? a * 1e3 : null;
}
var Zn = 6e4, Qn = class {
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
		this.lastPulseAt !== void 0 && t - this.lastPulseAt < Zn || (e.send("hb"), this.lastPulseAt = t);
	}
	connect() {
		if (this.stopped) return;
		let e = new URL(E.liveness(this.roomId), Jt(this.runtime.serviceOrigin));
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
}, $n = 1, er = (e) => typeof e == "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(e), tr = class {
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
	socketSerial = 0;
	generation = null;
	lockedState = null;
	get locked() {
		return this.lockedState;
	}
	get signalingReady() {
		return !this.closed && !!this.id && this.ws.readyState === $n;
	}
	ownerRequests = new Yn(() => this.host && this.signalingReady, (e) => this.signal(e));
	challenge;
	get requireVerification() {
		return this.ownerRequests.verification;
	}
	setRequireVerification(e) {
		return this.ownerRequests.setRequireVerification(e);
	}
	setPassword(e) {
		return this.ownerRequests.setPassword(e);
	}
	updateBan(e, t, n) {
		return this.ownerRequests.updateBan(e, t, n);
	}
	get rtt() {
		let e = [...this.peers.values()].filter((e) => e.connected && e.lostAt === void 0).map((e) => e.rtt).filter((e) => typeof e == "number");
		return e.length ? Math.max(...e) : null;
	}
	get roomGeneration() {
		return this.generation;
	}
	signalQueue = Promise.resolve();
	lastHeartbeat = 0;
	hostMonitor;
	controlId = 0;
	constructor(e, t, n, r = on()) {
		if (this.room = e, this.credentials = t, this.hooks = n, this.runtime = r, t.matchEntry && (t.hostToken || !/^[a-f0-9]{64}$/.test(t.matchEntry.token) || !er(t.matchEntry.generation))) throw Error("Invalid match entry credentials.");
		this.credentials = {
			hostToken: t.hostToken,
			password: t.password,
			...t.matchEntry ? { matchEntry: { ...t.matchEntry } } : {}
		};
		let i = new URL(E.signal(e), Jt(r.serviceOrigin));
		i.protocol = i.protocol === "https:" ? "wss:" : "ws:", this.ws = r.createWebSocket(i), this.attachSocket(this.ws, () => {
			this.signal({
				type: "hello",
				...this.helloCredentials()
			});
		}), this.timer = setInterval(() => {
			this.host && this.signalingReady && performance.now() - this.lastHeartbeat >= 3e4 && (this.signal({ type: "heartbeat" }), this.lastHeartbeat = performance.now());
			for (let e of this.peers.values()) {
				if (!e.connected && performance.now() - e.created > 2e4) {
					n.status("Could not connect directly to this room. Try another network or room.", "error"), this.remove(e.id);
					continue;
				}
				e.lostAt !== void 0 && (performance.now() - e.lostAt > 2e4 ? (n.status("The direct connection could not be recovered. Rejoin the room.", "error"), this.remove(e.id)) : this.host && performance.now() - e.lastRestart > 5e3 && this.restartPeer(e.id));
			}
		}, 5e3);
	}
	attachSocket(e, t) {
		let n = ++this.socketSerial, r = () => !this.closed && this.ws === e && this.socketSerial === n;
		e.onopen = () => {
			r() && t();
		}, e.onmessage = (e) => {
			r() && (this.signalQueue = this.signalQueue.then(async () => {
				r() && await this.message(JSON.parse(e.data), n);
			}).catch(() => {
				r() && this.hooks.status("Connection negotiation failed. Try another room or network.", "error");
			}));
		}, e.onclose = (e) => {
			r() && (this.socketSerial++, this.challenge?.abort(), this.ownerRequests.cancel("disconnected"), this.end(e.reason === "Host left" ? "The host left. Return to Rooms and join again." : [
				1001,
				1008,
				1009,
				1011,
				1013
			].includes(e.code) && e.reason ? e.reason : "Room connection ended. Return to Rooms and join again."));
		}, e.onerror = () => {
			r() && this.hooks.status("Room service is unavailable.", "error");
		};
	}
	signal(e) {
		!this.closed && this.ws.readyState === $n && this.ws.send(JSON.stringify(e));
	}
	async message(e, t = this.socketSerial) {
		if (this.closed || t !== this.socketSerial) return;
		if (e.type === "terminal") {
			this.end(typeof e.reason == "string" && e.reason.length <= 123 ? e.reason : "Room connection ended.");
			return;
		}
		if (this.ownerRequests.accept(e)) return;
		if (e.type === "heartbeat" && this.host) {
			this.hostMonitor?.acknowledged();
			return;
		}
		if (e.type === "verificationRequired") {
			if (this.closed || this.id || this.credentials.hostToken || this.challenge || !/* @__PURE__ */ se(jn, e) || e.roomId !== this.room) return;
			if (!this.hooks.verify) {
				this.end("This client cannot complete the room verification challenge.");
				return;
			}
			let t = new AbortController();
			this.challenge = t;
			try {
				let n = await this.hooks.verify({
					siteKey: e.siteKey,
					roomId: this.room
				}, t.signal);
				if (t.signal.aborted || this.closed || this.ws.readyState !== $n) return;
				if (typeof n != "string" || n.length === 0 || n.length > 2048) throw Error("Invalid verification response.");
				this.signal({
					type: "hello",
					...this.helloCredentials(),
					verificationToken: n
				});
			} catch (e) {
				this.closed || this.end(e instanceof Error ? e.message : "Room verification failed.");
			} finally {
				this.challenge === t && (this.challenge = void 0);
			}
			return;
		}
		if (e.type === "passwordUpgradeRequired" && this.host) {
			this.hooks.status("Update the room password or explicitly unlock it to allow new guests.", "error");
			return;
		}
		if (e.type === "ready") {
			if (this.id) return;
			if (!/* @__PURE__ */ se(An, e) || this.credentials.matchEntry && (e.role !== "guest" || !er(e.id) || !er(e.hostId) || e.generation !== this.credentials.matchEntry.generation)) {
				this.end("Invalid room admission.");
				return;
			}
			this.id = e.id, this.host = e.role === "host", this.host && this.credentials.hostToken && (this.hostMonitor = new Qn(this.room, this.credentials.hostToken, this.runtime), this.hostMonitor.acknowledged()), this.hostId = e.hostId, this.generation = e.generation ?? null, delete this.credentials.matchEntry, this.ownerRequests.verification = typeof e.requireVerification == "boolean" ? e.requireVerification : null, this.lockedState = typeof e.locked == "boolean" ? e.locked : null, this.hooks.ready(this.id, this.host);
			return;
		}
		if (e.type === "peer" || e.type === "leave") {
			if (typeof e.id != "string" || !e.id || e.id === this.id) return;
			if (e.type === "leave") {
				this.remove(e.id, !1);
				return;
			}
			this.host && !this.peers.has(e.id) && await this.offerPeer(e.id, t);
			return;
		}
		if (e.type !== "signal" || typeof e.from != "string" || !e.from) return;
		let n = this.peers.get(e.from);
		if (!n) {
			if (this.host || e.from !== this.hostId || !["offer", "candidate"].includes(e.signal.type)) return;
			n = this.make(e.from);
		}
		let r = this.negotiationScope(n, t);
		if (e.signal.type === "offer") {
			if (this.host) throw Error("Only the host can offer");
			await Wn(n, e.signal.sdp, r);
		} else if (e.signal.type === "answer") {
			if (!this.host) throw Error("Only guests can answer");
			await Gn(n, e.signal.sdp, r) && this.noteHealthy(n);
		} else e.signal.type === "candidate" && e.signal.candidate && await Kn(n, e.signal.candidate, r);
	}
	peerSignal(e, t) {
		this.signal({
			type: "signal",
			to: e.id,
			signal: t
		});
	}
	async offerPeer(e, t) {
		let n = this.make(e);
		this.bind(n, n.pc.createDataChannel("control", { ordered: !0 })), this.bind(n, n.pc.createDataChannel("realtime", {
			ordered: !1,
			maxRetransmits: 0
		})), await Un(n, this.negotiationScope(n, t));
	}
	negotiationScope(e, t) {
		return {
			current: () => this.current(e) && t === this.socketSerial && this.ws.readyState === $n,
			versioned: !1,
			publish: (t) => this.peerSignal(e, t)
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
		if (this.closed || !this.host || !t || t.restarting || t.restarts >= 2 || t.pc.signalingState !== "stable" || this.ws.readyState !== $n) return !1;
		let n = this.socketSerial;
		t.restarting = !0, t.lastRestart = performance.now(), t.lostAt ??= t.lastRestart, t.restarts++;
		try {
			return await Un(t, this.negotiationScope(t, n), { iceRestart: !0 });
		} catch {
			return !this.closed && this.peers.get(e) === t && this.hooks.status("Direct connection recovery is still pending.", "info"), !1;
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
			if (!this.current(n) || !e.candidate || this.ws.readyState !== $n) return;
			let t = e.candidate.toJSON();
			this.peerSignal(n, {
				type: "candidate",
				candidate: t
			});
		}, t.ondatachannel = (e) => this.bind(n, e.channel);
		let r = () => {
			this.closed || this.peers.get(e) !== n || (t.connectionState === "closed" ? (this.hooks.status("A peer disconnected.", "info"), this.remove(e)) : t.connectionState === "connected" && ["connected", "completed"].includes(t.iceConnectionState) ? this.noteHealthy(n) : (["failed", "disconnected"].includes(t.connectionState) || ["failed", "disconnected"].includes(t.iceConnectionState)) && (n.lostAt ??= performance.now(), this.hooks.status("Direct connection interrupted. Attempting recovery…", "info")));
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
		t.label === "control" ? (e.control = t, e.controlReader = new Ln({
			fromGuest: () => this.host,
			canUploadStadium: () => this.hooks.allowStadiumUpload?.(e) ?? !1
		})) : e.fast = t, t.onclose = () => {
			!this.closed && this.peers.get(e.id) === e && (this.hooks.status("A peer closed its game channel.", "info"), this.remove(e.id));
		}, t.onopen = () => {
			this.closed || this.peers.get(e.id) !== e || e.control?.readyState === "open" && e.fast?.readyState === "open" && !e.connected && (e.connected = !0, this.host && (e.admissionTimer = setTimeout(() => {
				this.closed || this.peers.get(e.id) !== e || (this.hooks.status("A peer did not complete room admission.", "error"), this.remove(e.id));
			}, 1e4)), this.hooks.open(e));
		}, t.onmessage = (n) => {
			if (!(this.closed || this.peers.get(e.id) !== e)) {
				this.bytesReceived += typeof n.data == "string" ? n.data.length : n.data instanceof ArrayBuffer ? n.data.byteLength : 0;
				try {
					if (t.label === "control") {
						let t = e.controlReader?.read(n.data);
						t !== void 0 && this.hooks.control(e, t);
					} else if (n.data instanceof ArrayBuffer && n.data.byteLength <= 1200) this.hooks.fast(e, n.data);
					else throw Error();
				} catch {
					this.hooks.status("Invalid peer message rejected.", "error"), this.remove(e.id);
				}
			}
		};
	}
	admit(e) {
		clearTimeout(e.admissionTimer), e.admissionTimer = void 0;
	}
	control(e, t) {
		if (e.control?.readyState !== "open") return;
		let n = Fn(t, this.controlId++), r = n.reduce((e, t) => e + (typeof t == "string" ? new TextEncoder().encode(t).length : t.byteLength), 0);
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
						!this.closed && this.peers.get(e.id) === e && (e.rtt = Xn(t.values()));
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
	end(e) {
		this.closed || (this.close(), this.hooks.ended?.(e));
	}
	remove(e, t = !0) {
		if (this.closed) return;
		let n = this.peers.get(e);
		if (n) {
			if (clearTimeout(n.admissionTimer), this.peers.delete(e), n.controlReader?.clear(), n.pc.close(), this.host && t) try {
				this.signal({
					type: "evict",
					id: e
				});
			} catch {}
			if (this.hooks.leave(e), !this.host) {
				let e = this.signalingReady, t = () => {
					this.end(e ? "The host connection ended. Return to Rooms and join again." : "Room connection ended. Return to Rooms and join again.");
				};
				e ? this.hostCloseTimer = setTimeout(t, 1e3) : t();
			}
		}
	}
	helloCredentials() {
		return {
			hostToken: this.credentials.hostToken,
			password: this.credentials.password,
			...this.credentials.matchEntry ? { matchEntryToken: this.credentials.matchEntry.token } : {}
		};
	}
	close() {
		if (!this.closed) {
			clearTimeout(this.hostCloseTimer), this.hostCloseTimer = void 0, this.socketSerial++, this.challenge?.abort(), this.ownerRequests.cancel("closed"), this.closed = !0, this.hostMonitor?.close(), this.hostMonitor = void 0, this.credentials = {}, clearInterval(this.timer), this.ws.close(1e3, "Left room");
			for (let e of this.peers.values()) clearTimeout(e.admissionTimer), e.controlReader?.clear(), e.pc.close();
			this.peers.clear();
		}
	}
}, nr = Object.freeze({ ...Ce }), rr = class e {
	runtime;
	engine;
	network;
	roomId = "";
	roomLink = "";
	roomName = "";
	epoch = 0;
	soundStream = new ve();
	turfState = new Bt();
	stadiumSelection = 0;
	players = [];
	nextPlayerId = 0;
	bans = /* @__PURE__ */ new Map();
	loop;
	linkNotification;
	last = performance.now();
	accumulator = 0;
	match;
	closed = !1;
	assignedMatch = null;
	applyingAssignment = !1;
	closeController = new AbortController();
	signal = this.closeController.signal;
	lastRecording = null;
	onRecordingComplete;
	locked = !1;
	teamStyles = [null, null];
	inputs;
	traffic = new dn();
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
	onPlayerInput;
	onPlayerChat;
	onPlayerDirectChat;
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
		this.runtime = t, this.engine = e, this.match = new On(e, (e, t) => {
			let n = this.recordingBlob(e);
			this.lastRecording = n, this.invoke("onRecordingComplete", this.onRecordingComplete, n, t);
		}), this.inputs = new kn(this.match);
	}
	static async create(t, n = ln(), r) {
		let i = Jt(n.network.serviceOrigin), a = Jt(n.publicOrigin ?? i);
		if (t = Ut(t), t.noPlayer !== void 0 && typeof t.noPlayer != "boolean") throw Error("Invalid noPlayer setting");
		let o = t.noPlayer === !1, s = t.playerName ?? "Host";
		if (o && (typeof s != "string" || !s.trim() || s.length > 24)) throw Error("Invalid host player name");
		let c = P(r), l;
		try {
			c.signal.throwIfAborted();
			let r = await c.run(n.loadEngine(c.signal));
			r.load(t.stadium ?? Ne()), l = new e(r, n);
			let u = l, d = await c.run(n.request(new URL(E.rooms, i), {
				signal: c.signal,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: t.roomName,
					maxPlayers: t.maxPlayers ?? 16,
					password: t.password ?? "",
					private: t.public === !1,
					hostPlayer: o,
					...t.geo ? { geo: t.geo } : {}
				})
			}));
			if (!d.ok) throw await c.run(_e(d, c.signal));
			let f = await c.run(d.json());
			u.roomId = f.id, u.roomName = t.roomName, u.roomLink = `${a}${Gt(f.id)}`;
			let p;
			try {
				await c.run(new Promise((e, t) => {
					p = setTimeout(() => t(Error("Signaling timed out")), 12e3), u.network = new tr(f.id, { hostToken: f.hostToken }, {
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
						status: (e, t) => {
							t === "error" && u.report(e);
						},
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
			u.last = performance.now(), u.loop = setInterval(() => u.advance(), 1e3 / Pe);
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
			for (; !this.closed && this.accumulator >= 1e3 / Pe && n++ < 32;) {
				for (let t of this.players) this.inputs.expire(t.peerId, t.slot, e);
				if (this.match.checkRecordingLimit(), this.closed || (this.engine.phase !== "lobby" && !this.engine.paused && !this.engine.resumeTicks && this.invoke("onGameTick", this.onGameTick), this.closed)) break;
				let t = this.engine.red, n = this.engine.blue, r = this.engine.phase;
				this.match.step(), this.turfState.capture(this.engine), this.soundStream.capture(this.engine, this.epoch), this.engine.phase !== r && this.state();
				let i = r === "goal" && this.engine.phase === "playing", a = r === "finished" && this.engine.phase === "lobby", o = this.engine.red > t, s = this.engine.blue > n, c = this.engine.ballKicks.map((e) => {
					let t = this.players.find((t) => t.slot === e);
					return t ? this.playerCopy(t) : null;
				}).filter((e) => !!e), l = r !== "finished" && this.engine.phase === "finished" ? this.getScores() : null;
				a && this.invoke("onGameStop", this.onGameStop, null), l && (this.invoke("onTeamVictory", this.onTeamVictory, { ...l }), this.invoke("onGameVictory", this.onGameVictory, { ...l }));
				for (let e of c) this.invoke("onPlayerBallKick", this.onPlayerBallKick, e);
				if (o && this.invoke("onTeamGoal", this.onTeamGoal, 1), s && this.invoke("onTeamGoal", this.onTeamGoal, 2), i && this.invoke("onPositionsReset", this.onPositionsReset), this.closed) break;
				this.engine.tick % (Pe / 30) == 0 && N(this.network, this.engine.snapshot(), this.epoch, this.inputs), this.accumulator -= 1e3 / Pe;
			}
			this.closed || ye(this.network, this.soundStream.drain(e));
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
		if (n.type === "join" && !r) return this.admitPlayer(e, n);
		if (!r || n.type !== "action" || n.action !== "chat" && n.action !== "directChat" && n.action !== "typing" && !this.traffic.allow(e.id, "action")) return;
		let i = w(n.action, n);
		i && this.applyPlayerAction(e, r, i);
	}
	admitPlayer(e, t) {
		if (t.version !== 1 || t.engine !== Fe || typeof t.name != "string" || !t.name.trim() || t.name.length > 24) {
			this.network.remove(e.id);
			return;
		}
		let n = Array.from({ length: 32 }, (e, t) => t).find((e) => !this.players.some((t) => t.slot === e));
		if (n === void 0) {
			this.network.remove(e.id);
			return;
		}
		let r = {
			id: this.nextPlayerId++,
			slot: n,
			peerId: e.id,
			name: t.name.trim(),
			team: 0,
			admin: !1
		};
		this.players.push(r), this.network.admit(e), this.match.recordPlayer(r.slot, r.name), this.command("join", n, 0), this.turfState.capture(this.engine), this.network.control(e, {
			type: "welcome",
			features: ["directChat", "playerConversation"],
			...t.turfVersion === 1 ? { turf: this.turfState.checkpoint() } : {},
			soundStream: this.soundStream.checkpoint(),
			epoch: this.epoch,
			roomName: this.roomName,
			engine: Fe,
			slot: n,
			stadium: this.engine.source,
			state: this.engine.snapshot(),
			players: this.roster(),
			teamStyles: this.teamStyles,
			locked: this.locked
		}), this.sync(), this.invoke("onPlayerJoin", this.onPlayerJoin, this.playerCopy(r));
	}
	applyPlayerAction(e, t, n) {
		if (n.action === "typing") {
			if (!this.traffic.allow(e.id, "typing")) return;
			this.network.broadcast({
				type: "typing",
				playerId: t.peerId,
				active: n.active && !t.muted
			});
			return;
		}
		if (n.action === "directChat") {
			if (t.muted || !this.traffic.allow(e.id, "chat")) {
				this.traffic.allow(e.id, "feedback") && this.network.control(e, {
					type: "chatError",
					rejectedText: n.text,
					recipientId: n.action === "directChat" ? n.recipientId : "",
					text: t.muted ? "You are muted in this room." : "Message not sent. Please wait a moment before sending again."
				});
				return;
			}
			let r = l(this.players.map((e) => ({
				...e,
				id: e.peerId
			})), e.id, n.recipientId, n.text);
			if (!r) {
				this.network.control(e, {
					type: "directChatError",
					recipientId: n.recipientId,
					text: "This player is no longer available."
				});
				return;
			}
			let i = this.players.find((e) => e.peerId === r.toId);
			if (!i) return;
			let a = !1, o = this.invoke("onPlayerDirectChat", () => {
				let e = this.onPlayerDirectChat?.(this.playerCopy(t), this.playerCopy(i), r.text);
				return a = !0, e;
			});
			if (!a || o instanceof Promise || o === !1 || this.closed || t.muted || !this.players.includes(t) || !this.players.includes(i)) return;
			for (let e of [r.fromId, r.toId]) {
				let t = this.network.peers.get(e);
				t && this.network.control(t, r);
			}
			return;
		}
		if (n.action === "chat") {
			if (t.muted || !this.traffic.allow(e.id, "chat")) {
				this.traffic.allow(e.id, "feedback") && this.network.control(e, {
					type: "chatError",
					rejectedText: n.text,
					recipientId: "",
					text: t.muted ? "You are muted in this room." : "Message not sent. Please wait a moment before sending again."
				});
				return;
			}
			if (this.invoke("onPlayerActivity", this.onPlayerActivity, this.playerCopy(t)), this.closed || !this.players.includes(t)) return;
			this.invoke("onPlayerChat", this.onPlayerChat, this.playerCopy(t), n.text) !== !1 && !this.closed && this.players.includes(t) && !t.muted && this.network.broadcast({
				type: "chat",
				playerId: t.peerId,
				name: t.name,
				text: n.text
			});
		}
		if (n.action === "avatar") {
			t.avatar = n.avatar, this.match.recordPlayer(t.slot, t.name, t.avatarOverride ?? t.avatar), this.sync();
			return;
		}
		if (!h(t, n, {
			players: () => this.players,
			current: () => !this.closed,
			stopped: () => ["lobby", "finished"].includes(this.engine.phase),
			locked: () => this.locked,
			move: (e, n) => this.changeTeam(e.id, n, t),
			lock: (e) => this.changeTeamsLock(e, this.playerCopy(t))
		})) {
			if (n.action === "defaultStadium" || n.action === "customStadium") {
				let r = (n) => {
					!this.closed && this.players.includes(t) && this.network.control(e, {
						type: "stadiumResult",
						text: n
					});
				};
				if (!t.admin || !["lobby", "finished"].includes(this.engine.phase)) {
					r("Stadium change rejected: admin permission and a stopped match are required.");
					return;
				}
				let i = ++this.stadiumSelection;
				(n.action === "defaultStadium" ? this.runtime.loadStadium(n.name) : Promise.resolve(n.source)).then((e) => {
					if (!this.closed && this.players.includes(t)) {
						if (i !== this.stadiumSelection || !t.admin || !["lobby", "finished"].includes(this.engine.phase)) {
							r("Stadium change cancelled: room state or permissions changed.");
							return;
						}
						this.changeStadium(e, this.playerCopy(t)), r("Stadium applied.");
					}
				}).catch(() => r("Stadium could not be loaded. Please try again."));
				return;
			}
			if (t.admin) {
				if (n.action === "mute") {
					let e = this.players.find((e) => e.slot === n.slot);
					m(t, e, (e) => e.peerId === this.network.hostId) && this.changePlayerMuted(e.id, n.muted, this.playerCopy(t));
					return;
				}
				if (n.action === "ban" || n.action === "clearBans") {
					let r = n.action === "ban" ? this.players.find((e) => e.slot === n.slot) : void 0;
					if (n.action === "ban" && !m(t, r, (e) => e.peerId === this.network.hostId)) return;
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
					if (!r) return;
					this.banPlayer(r.id, "Removed by admin", this.playerCopy(t)).then(() => i("Player banned.")).catch((e) => i(e instanceof Error ? e.message : "Moderation failed."));
					return;
				}
				if (n.action === "teamColors" && this.changeTeamColors(n.team, n.palette), n.action === "kickRate") {
					let e = n.value;
					this.changeKickRateLimit(e & 255, e >>> 8 & 255, e >>> 16, this.playerCopy(t));
				}
				if (n.action === "start" && this.beginGame(t), n.action === "stop" && this.endGame(t), n.action === "pause" && this.changePause(n.paused === void 0 ? !this.engine.paused : n.paused, this.playerCopy(t)), n.action === "settings" && ["lobby", "finished"].includes(this.engine.phase)) {
					let e = n;
					if (this.setScoreLimit(e.score), this.setTimeLimit(e.minutes), this.changeTeamsLock(e.locked, this.playerCopy(t)), this.closed) return;
					if (e.kickRate !== void 0 && e.kickRate !== this.engine.kickRate) {
						let n = e.kickRate;
						this.changeKickRateLimit(n & 255, n >>> 8 & 255, n >>> 16, this.playerCopy(t));
					}
				}
				if (n.action === "kick") {
					let e = this.players.find((e) => e.slot === n.slot);
					m(t, e, (e) => e.peerId === this.network.hostId) && this.removePlayer(e.id, "Removed by host", this.playerCopy(t));
				}
			}
		}
	}
	fast(e, t) {
		if (!this.allowed(e)) return;
		let n = this.players.find((t) => t.peerId === e.id);
		if (!n) return;
		let r = this.engine.index(n.slot) * 18 + 14, i = this.engine.data[r], a = this.inputs.accept(e.id, n.slot, t, this.epoch);
		a !== void 0 && (this.engine.data[r] !== i && this.invoke("onPlayerInput", this.onPlayerInput, this.playerCopy(n), i), a && this.invoke("onPlayerActivity", this.onPlayerActivity, this.playerCopy(n)));
	}
	command(e, t = 0, n = 0) {
		if (this.closed) throw Error("Room is closed");
		this.match.command(e, t, n), (e === "start" || e === "stop") && this.turfState.capture(this.engine);
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
		t && (this.match.recordPlayer(t.slot, null), this.command("team", t.slot, 0), this.players = this.players.filter((t) => t.peerId !== e), this.inputs.remove(e), this.sync(), this.invoke("onPlayerLeave", this.onPlayerLeave, this.playerCopy(t)));
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
			} : null,
			input: this.engine.data[t + 14]
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
		let i = v(t, n, r);
		i.angle = ((256 * t / 360 | 0) & 255) * (360 / 256), this.changeTeamColors(e, i);
	}
	changeTeamColors(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (e !== 1 && e !== 2) throw Error("Invalid team");
		JSON.stringify(this.teamStyles[e - 1]) !== JSON.stringify(t) && (this.teamStyles[e - 1] = t, this.match.recordStyles(this.teamStyles), this.sync());
	}
	reorderPlayers(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (!Array.isArray(e) || e.length > 32 || e.some((e) => !Number.isSafeInteger(e) || e < 0) || typeof t != "boolean") throw Error("Invalid player order");
		let n = new Set(e), r = [...n].flatMap((e) => {
			let t = this.players.find((t) => t.id === e);
			return t ? [t] : [];
		}), i = this.players.filter((e) => !n.has(e.id)), a = t ? [...r, ...i] : [...i, ...r];
		a.every((e, t) => e === this.players[t]) || (this.players = a, this.match.recordOrder(a.map((e) => e.slot)), this.sync());
	}
	setPlayerAvatar(e, t) {
		if (this.closed) throw Error("Room is closed");
		if (!_(t)) throw Error("Avatar must be null or at most two visible characters.");
		let n = this.players.find((t) => t.id === e);
		n && (n.avatarOverride = t, this.match.recordPlayer(n.slot, n.name, t ?? n.avatar), this.sync());
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
		r && u(this.players, r, t) && (this.command("team", r.slot, t), this.match.recordOrder(this.players.map((e) => e.slot)), this.sync(), this.invoke("onPlayerTeamChange", this.onPlayerTeamChange, this.playerCopy(r), n ? this.playerCopy(n) : null));
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
			throw t instanceof qn && this.bans.set(e, r.peerId), t;
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
			text: e,
			...t == null ? { playerId: n.peerId } : {}
		};
		if (t == null) this.network.broadcast(r);
		else {
			let e = this.players.find((e) => e.id === t), n = e && this.network.peers.get(e.peerId);
			n && this.network.control(n, r);
		}
	}
	sendAnnouncement(e, t, n, r, i) {
		if (this.closed) throw Error("Room is closed");
		let a = qt(e, n, r, i);
		if (t != null && (!Number.isSafeInteger(t) || t < 0)) throw Error("Invalid announcement target");
		if (t == null) this.network.broadcast(a);
		else {
			let e = this.players.find((e) => e.id === t), n = e && this.network.peers.get(e.peerId);
			n && this.network.control(n, a);
		}
	}
	startAssignedMatch(e) {
		let { roomId: t, generation: n, matchId: r } = e, i = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
		if (this.closed || this.applyingAssignment || this.assignedMatch || t !== this.roomId || n !== this.network.roomGeneration || !i.test(r) || !i.test(n)) return !1;
		let a = e.players.map((e) => ({ ...e }));
		if (a.length < 2 || a.length > 22 || new Set(a.map((e) => e.userId)).size !== a.length || new Set(a.map((e) => e.peerId)).size !== a.length || a.filter((e) => e.side === "red").length * 2 !== a.length || a.some((e) => !i.test(e.userId) || !e.peerId || !i.test(e.peerId) || !["red", "blue"].includes(e.side) || e.signalingAttached !== !0)) return !1;
		let o = () => !this.closed && this.network.signalingReady && this.engine.phase === "lobby" && this.network.roomGeneration === n && this.players.length === a.length && a.every((e) => {
			let t = this.players.find((t) => t.peerId === e.peerId), n = e.peerId ? this.network.peers.get(e.peerId) : void 0;
			return t && t.peerId !== this.network.hostId && n?.connected === !0 && n.lostAt === void 0 && n.control?.readyState === "open" && n.fast?.readyState === "open";
		});
		if (!o()) return !1;
		this.applyingAssignment = !0;
		try {
			this.setTeamsLock(!0);
			for (let e of a) {
				if (!o()) return !1;
				let t = this.players.find((t) => t.peerId === e.peerId);
				if (!t || (this.setPlayerAdmin(t.id, !1), !o())) return !1;
				this.setPlayerTeam(t.id, e.side === "red" ? 1 : 2);
			}
			return !o() || !this.locked || !a.every((e) => {
				let t = this.players.find((t) => t.peerId === e.peerId);
				return t && !t.admin && t.team === (e.side === "red" ? 1 : 2);
			}) ? !1 : (this.assignedMatch = r, this.beginGame(null), !this.closed && this.engine.phase === "playing");
		} finally {
			this.applyingAssignment = !1;
		}
	}
	startGame() {
		this.beginGame(null);
	}
	static finishAssignedDraw(e) {
		return !e.assignedMatch || !e.engine.canFinishDraw() ? !1 : (e.command("finishDraw"), e.state(), !0);
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
		let i = g(e, t, n);
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
		Me(e);
		let n = ++this.stadiumSelection;
		if (this.match.finishRecording("Stadium changed"), this.closed) throw Error("Room is closed");
		if (["lobby", "finished"].includes(this.engine.phase)) {
			if (n !== this.stadiumSelection) throw Error("Stadium selection superseded");
			this.engine.load(e);
			for (let e of this.players) this.engine.setTeam(e.slot, e.team);
			this.epoch = this.epoch + 1 & 65535, this.inputs.reset(), this.network.broadcast({
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
			time: e.elapsed / Pe,
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
		return nr;
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
		let n = be(t), r = this.readDisc(e);
		Object.entries(n).every(([e, t]) => r[e] === t) || (this.match.command("disc", e, 0, n), this.state());
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
		this.match.startRecording(this.players.map((e) => ({
			slot: e.slot,
			name: e.name,
			avatar: e.avatarOverride ?? e.avatar
		})), this.teamStyles);
	}
	recordingBlob(e) {
		return new Blob([hn(e)], { type: "application/x-ball2d-replay" });
	}
	stopRecording() {
		let e = this.match.stopRecording();
		return e ? this.recordingBlob(e) : null;
	}
	close() {
		if (!this.closed) {
			this.closed = !0, this.inputs.close(), this.closeController.abort();
			try {
				this.match.close();
			} finally {
				clearInterval(this.loop), clearTimeout(this.linkNotification), this.linkNotification = void 0, this.network?.close(), this.players = [], this.traffic.clear();
			}
		}
	}
};
function ir(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	let t = { ...e }, n = t.maxPlayers ?? 12;
	if (typeof n != "number" || !Number.isFinite(n) || !Number.isInteger(n)) throw Error("maxPlayers must be a finite integer");
	return Ut({
		...t,
		roomName: t.roomName ?? "Headless Room",
		playerName: t.playerName ?? "Host",
		noPlayer: t.noPlayer ?? !1,
		public: t.public ?? !1,
		maxPlayers: Math.max(2, Math.min(30, n)),
		password: t.password ?? ""
	});
}
var ar = class {
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
}, or = [
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
function sr(e, t) {
	let n = Object.create(null);
	t && Object.defineProperty(n, "closed", {
		enumerable: !0,
		value: t
	});
	let r = new ar((t) => {
		let n = e.onError?.(String(t));
		n instanceof Promise && n.catch(() => {});
	});
	e.signal.addEventListener("abort", () => r.close(), { once: !0 }), e.signal.aborted && r.close();
	for (let t of or) Object.defineProperty(n, t, {
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
function cr(e) {
	return En(e);
}
function lr(e) {
	if (typeof e != "string") throw TypeError("Stadium source must be a string");
	let t = Me(e);
	return Object.freeze({
		name: t.name,
		canBeStored: t.canBeStored,
		warnings: Object.freeze([...t.warnings])
	});
}
async function ur(e = {}, t = {}) {
	return sr(await rr.create(ir(e), void 0, t.signal));
}
export { ge as RoomAdmissionError, ur as createRoom, cr as readReplay, lr as validateStadium };
