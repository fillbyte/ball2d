var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = (e, t) => e !== t && (e - t + 65536) % 65536 > 32768;
function u(e) {
	return !!e && [
		"lobby",
		"playing",
		"goal",
		"finished"
	].includes(e.phase) && Number.isFinite(e.elapsed) && e.elapsed >= 0 && Number.isFinite(e.timeLimit) && e.timeLimit >= 0 && Number.isSafeInteger(e.scoreLimit) && e.scoreLimit >= 0 && !!e.score && Number.isSafeInteger(e.score.red) && e.score.red >= 0 && Number.isSafeInteger(e.score.blue) && e.score.blue >= 0;
}
function d(e, t) {
	let [n, r] = e.p0, i = e.p1[0] - n, a = e.p1[1] - r, o = Math.hypot(i, a);
	if (![
		n,
		r,
		i,
		a,
		...e.pitchPoint,
		t.x,
		t.y,
		t.vx,
		t.vy
	].every(Number.isFinite) || o < .001 || e.defendingTeam !== 1 && e.defendingTeam !== 2) return null;
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
var f = {
	post: 100,
	"near-miss": 90,
	block: 80,
	"directed-shot": 70,
	pressure: 60
}, p = class {
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
		if (!u(e.context) || !Number.isSafeInteger(e.tick) || !Number.isSafeInteger(e.epoch) || e.tick < 0 || e.epoch < 0 || !Number.isFinite(e.ball.radius) || e.ball.radius <= 0 || e.goals.length > 32) return [];
		if (this.streamId !== e.streamId || this.epoch !== e.epoch) {
			if (this.streamId === e.streamId && l(e.epoch, this.epoch)) return [];
			this.reset(), this.streamId = e.streamId, this.epoch = e.epoch;
		}
		if (e.tick <= this.tick) return [];
		let t = this.tick >= 0 && e.tick - this.tick <= this.ticksPerSecond / 4;
		if (t || (this.goals = [], this.shot = null), this.tick = e.tick, e.context.phase !== "playing" || e.context.paused) return this.goals = [], this.shot = null, [];
		this.shot && e.tick - this.shot.tick > this.ticksPerSecond * 2 && (this.shot = null);
		let n = [], r = [], i = (t, r, i, a, o, s) => {
			if (n.length >= 4) {
				let e = n.reduce((e, t, r) => f[t.kind] < f[n[e].kind] ? r : e, 0);
				if (f[t] <= f[n[e].kind]) return;
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
			let a = d(n, e.ball);
			if (!a || r.some((e) => e.id === n.id)) continue;
			let o = `${n.p0}:${n.p1}:${n.pitchPoint}:${n.defendingTeam}`, s = this.goals.find((e) => e.id === n.id && e.shape === o), c = {
				id: n.id,
				shape: o,
				previous: a,
				pressure: s?.pressure ?? !1,
				lastReactionTick: s?.lastReactionTick ?? -Infinity,
				attackId: s?.attackId ?? null,
				attackStartedTick: s?.attackStartedTick ?? e.tick
			}, { along: l, across: u, length: f, acrossSpeed: p, alongSpeed: m } = a, h = p < -.001 ? -u / p : Infinity, g = l + m * h, _ = u > e.ball.radius && h > 0 && h <= 1.2 && g >= e.ball.radius && g <= f - e.ball.radius, v = _ && u <= f * 2.5;
			!v && (u > f * 3 || p >= 0) && (c.pressure = !1), (u > f * 3 || e.tick - c.attackStartedTick > this.ticksPerSecond * 6) && (c.attackId = null), v && !c.attackId && (c.attackId = `${e.streamId}:${e.epoch}:attack:${e.tick}:${n.id}`, c.attackStartedTick = e.tick);
			let y = e.contact;
			_ && y?.kind === "kick" && y.player?.team !== n.defendingTeam && y.player && (this.shot = {
				goalId: n.id,
				tick: e.tick,
				player: { ...y.player }
			}, i("directed-shot", n, .6, ["observed-kick", "projected-inside-goal-mouth"], y.player, c.attackId)), v && !c.pressure && t && (c.pressure = !0, i("pressure", n, .45, ["approaching-field-side", "projected-inside-goal-mouth"], void 0, c.attackId));
			let b = e.tick - c.lastReactionTick >= this.ticksPerSecond * 2;
			if (b && y?.kind === "post" && y.goalId === n.id) c.lastReactionTick = e.tick, this.shot = null, i("post", n, .75, ["classified-post-contact", "explicit-goal-id"], void 0, c.attackId), c.attackId = null;
			else if (b && t && s && s.previous.across > 0 && u <= 0) {
				let t = s.previous.across / (s.previous.across - u), r = s.previous.along + t * (l - s.previous.along), a = r < 0 ? -r : r - f;
				a > e.ball.radius && a <= f * .35 && p < 0 && (c.lastReactionTick = e.tick, this.shot = null, i("near-miss", n, .62, [
					"observed-line-crossing",
					"outside-posts",
					"within-near-miss-band"
				], void 0, c.attackId), c.attackId = null);
			}
			this.shot?.goalId === n.id && t && y?.kind === "player" && y.player?.team === n.defendingTeam && s?.previous.acrossSpeed !== void 0 && s.previous.acrossSpeed < 0 && p >= 0 && (i("block", n, .55, [
				"prior-directed-kick",
				"defender-contact",
				"trajectory-reversed"
			], y.player, c.attackId), this.shot = null, c.attackId = null), (y?.kind === "wall" || y?.kind === "net") && (this.shot = null, c.attackId = null), p >= 0 && (c.attackId = null), r.push(c);
		}
		return this.goals = r, n.sort((e, t) => f[t.kind] - f[e.kind]);
	}
}, m = (e) => `${e.sessionId.length}:${e.sessionId}:${e.playerId}:${e.team}`, h = (e) => Object.freeze({ ...e }), g = (e, t = 1e9) => Number.isFinite(e) && Math.abs(e) <= t, _ = (e) => typeof e == "string" && e.length > 0 && e.length <= 256, v = (e) => !!e && _(e.sessionId) && Number.isSafeInteger(e.playerId) && e.playerId >= 0 && e.playerId <= 2147483647 && (e.team === 1 || e.team === 2);
function y(e) {
	if (!e || !_(e.streamId) || !Number.isSafeInteger(e.epoch) || e.epoch < 0 || e.epoch > 65535 || !Number.isSafeInteger(e.tick) || e.tick < 0 || !u(e.context) || !e.ball || !Array.isArray(e.players) || e.players.length > 32 || !Array.isArray(e.goals) || e.goals.length > 32 || !Array.isArray(e.contacts) || e.contacts.length > 32 || typeof e.contactsComplete != "boolean" || ![
		e.ball.x,
		e.ball.y,
		e.ball.vx,
		e.ball.vy,
		e.ball.radius
	].every((e) => g(e)) || e.ball.radius < .001 || e.ball.radius > 1e6) return !1;
	let t = /* @__PURE__ */ new Set();
	for (let n of e.players) {
		if (!n || !v(n.identity) || ![
			n.x,
			n.y,
			n.vx,
			n.vy,
			n.radius
		].every((e) => g(e)) || n.radius < .001 || n.radius > 1e6 || n.role !== void 0 && n.role !== "goalkeeper" && n.role !== "outfield") return !1;
		let e = m(n.identity);
		if (t.has(e)) return !1;
		t.add(e);
	}
	let n = /* @__PURE__ */ new Set();
	for (let t of e.goals) {
		if (!t || !_(t.id) || !Array.isArray(t.p0) || t.p0.length !== 2 || !Array.isArray(t.p1) || t.p1.length !== 2 || !Array.isArray(t.pitchPoint) || t.pitchPoint.length !== 2 || ![
			...t.p0,
			...t.p1,
			...t.pitchPoint
		].every((e) => g(e)) || n.has(t.id) || !d(t, e.ball)) return !1;
		n.add(t.id);
	}
	let r = -1, i = /* @__PURE__ */ new Set();
	for (let a of e.contacts) {
		if (!a || !_(a.id) || i.has(a.id) || !Number.isSafeInteger(a.tick) || a.tick < 0 || a.tick > e.tick || a.tick < r || ![
			"kick",
			"player",
			"wall",
			"post"
		].includes(a.kind) || a.player && (!v(a.player) || !t.has(m(a.player))) || (a.kind === "kick" || a.kind === "player") && !a.player || a.goalId !== void 0 && !n.has(a.goalId)) return !1;
		r = a.tick, i.add(a.id);
	}
	return !0;
}
function b(e, t) {
	let n;
	for (let r of e.goals) {
		if (r.defendingTeam === t) continue;
		let i = d(r, e.ball);
		!i || i.across <= e.ball.radius || (!n || i.across / i.length < n.projection.across / n.projection.length) && (n = {
			goal: r,
			projection: i
		});
	}
	return n;
}
function x(e, t, n) {
	let r = e.goals.find((e) => e.id === t), i = r && d(r, e.ball);
	if (!i || i.across <= e.ball.radius || i.acrossSpeed >= 0) return !1;
	let a = i.across / -i.acrossSpeed, o = i.along + i.alongSpeed * a;
	return a <= n && o > e.ball.radius && o < i.length - e.ball.radius;
}
function ee(e, t, n, r) {
	let i = Math.hypot(e.ball.vx, e.ball.vy);
	if (!(i < e.ball.radius * 5)) return e.players.find((a) => {
		if (a.identity.team !== t.team || m(a.identity) === m(t)) return !1;
		let o = a.x - e.ball.x, s = a.y - e.ball.y, c = (o * e.ball.vx + s * e.ball.vy) / i, l = Math.abs(o * e.ball.vy - s * e.ball.vx) / i;
		return c >= e.ball.radius * r && c / i <= n / 1e3 && l <= a.radius + e.ball.radius * 2;
	});
}
function te(e, t, n) {
	let r = e.goals.find((e) => e.id === t);
	if (!r) return;
	let i = d(r, e.ball);
	if (!i) return;
	let a = Math.atan2(r.p0[1] - e.ball.y, r.p0[0] - e.ball.x), o = Math.atan2(r.p1[1] - e.ball.y, r.p1[0] - e.ball.x), s = Math.abs(Math.atan2(Math.sin(a - o), Math.cos(a - o))), c = (r.p0[0] + r.p1[0]) / 2 - e.ball.x, l = (r.p0[1] + r.p1[1]) / 2 - e.ball.y, u = c * c + l * l, f = 0;
	for (let t of e.players) {
		if (t.identity.team === n) continue;
		let r = ((t.x - e.ball.x) * c + (t.y - e.ball.y) * l) / u;
		r > 0 && r < 1 && Math.hypot(t.x - e.ball.x - r * c, t.y - e.ball.y - r * l) <= t.radius + e.ball.radius && f++;
	}
	return Object.freeze({
		distanceGoalWidths: i.across / i.length,
		openingAngleRadians: s,
		speedBallRadiiPerSecond: Math.hypot(e.ball.vx, e.ball.vy) / e.ball.radius,
		defendersInLane: f
	});
}
var S = "kick-team-goal-before-next-kick-v1", C = (e, t = 256) => typeof e == "string" && e.length > 0 && e.length <= t && e.trim() === e && !/\p{Cc}/u.test(e), w = (e, t = 1e9) => typeof e == "number" && Number.isFinite(e) && Math.abs(e) <= t, T = (e, t) => e.sessionId === t.sessionId && e.playerId === t.playerId && e.team === t.team, E = (e) => !!e && C(e.sessionId) && Number.isInteger(e.playerId) && e.playerId >= 0 && e.playerId <= 2147483647 && (e.team === 1 || e.team === 2);
function ne(e, t, n) {
	if (!e || !C(e.id) || e.tick !== t.tick || e.order !== n || !Number.isInteger(e.contactIndex) || e.contactIndex < 0 || e.contactIndex >= t.contacts.length || !E(e.player) || !e.ball || !Array.isArray(e.players) || e.players.length > 32 || e.players.length !== t.players.length) return !1;
	let r = t.contacts[e.contactIndex];
	if (r.kind !== "kick" || r.tick !== t.tick || !r.player || !T(r.player, e.player)) return !1;
	let i = e.ball;
	return !(![
		i.x,
		i.y,
		i.radius,
		i.beforeVx,
		i.beforeVy,
		i.afterVx,
		i.afterVy
	].every((e) => w(e)) || i.radius < .001 || i.radius > 1e6);
}
function re(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e.players) {
		if (!r || !E(r.identity) || ![
			r.x,
			r.y,
			r.radius
		].every((e) => w(e)) || r.radius < .001 || r.radius > 1e6 || !t.players.some((e) => T(e.identity, r.identity))) return !1;
		let e = m(r.identity);
		if (n.has(e)) return !1;
		n.add(e);
	}
	return e.players.some((t) => T(t.identity, e.player));
}
function ie(e, t, n) {
	return ne(e, t, n) && re(e, t);
}
var D = [
	"sessionId",
	"playerId",
	"team"
], O = [
	"identity",
	"x",
	"y",
	"radius"
], ae = [
	"id",
	"tick",
	"order",
	"contactIndex",
	"player",
	"ball",
	"players"
], oe = [
	"x",
	"y",
	"radius",
	"beforeVx",
	"beforeVy",
	"afterVx",
	"afterVy"
], se = ["players"], ce = ["identity"];
function k(e, t) {
	return !!e && typeof e == "object" && Object.isFrozen(e) && t.every((t) => {
		let n = Object.getOwnPropertyDescriptor(e, t);
		return n !== void 0 && "value" in n;
	});
}
function A(e) {
	return Array.isArray(e) && Object.isFrozen(e) && Object.getPrototypeOf(e) === Array.prototype && !Object.hasOwn(e, Symbol.iterator) && !Object.hasOwn(e, "some");
}
function le(e) {
	if (!k(e, se) || !A(e.players) || e.players.length <= 16 || e.players.length > 32) return null;
	let t = /* @__PURE__ */ new Set();
	for (let n = 0; n < e.players.length; n++) {
		let r = Object.getOwnPropertyDescriptor(e.players, n);
		if (!r || !("value" in r)) return null;
		let i = r.value;
		if (!k(i, ce) || !k(i.identity, D) || !E(i.identity)) return null;
		t.add(m(i.identity));
	}
	return t;
}
function j(e, t) {
	if (!A(e)) return null;
	let n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.length; r++) {
		let i = Object.getOwnPropertyDescriptor(e, r);
		if (!i || !("value" in i)) return null;
		let a = i.value;
		if (!k(a, O) || !k(a.identity, D) || !E(a.identity) || ![
			a.x,
			a.y,
			a.radius
		].every((e) => w(e)) || a.radius < .001 || a.radius > 1e6) return null;
		let o = m(a.identity);
		if (!t.has(o) || n.has(o)) return null;
		n.add(o);
	}
	return n;
}
function M(e, t) {
	if (!e.length) return !0;
	let n = le(t);
	if (!n) return !e.some((n, r) => !ie(n, t, r) || r > 0 && n.contactIndex <= e[r - 1].contactIndex);
	let r = /* @__PURE__ */ new Map();
	return !e.some((i, a) => {
		let o;
		if (k(i, ae) && k(i.player, D) && k(i.ball, oe)) {
			if (!ne(i, t, a)) return !0;
			let e = r.get(i.players);
			e === void 0 && (e = j(i.players, n), r.set(i.players, e)), o = e ? e.has(m(i.player)) : re(i, t);
		} else o = ie(i, t, a);
		return !o || a > 0 && i.contactIndex <= e[a - 1].contactIndex;
	});
}
function ue(e, t, n) {
	let r = {
		x: e.ball.x,
		y: e.ball.y,
		radius: e.ball.radius,
		vx: n.featureStage === "pre-kick" ? e.ball.beforeVx : e.ball.afterVx,
		vy: n.featureStage === "pre-kick" ? e.ball.beforeVy : e.ball.afterVy
	}, i, a = Infinity;
	for (let n of t.goals) {
		let t = d(n, r);
		if (n.defendingTeam === e.player.team || !t || t.across < 0) continue;
		let o = Math.hypot((n.p0[0] + n.p1[0]) / 2 - r.x, (n.p0[1] + n.p1[1]) / 2 - r.y);
		(o < a || o === a && i && n.id < i.id) && (i = n, a = o);
	}
	if (!i) return null;
	let o = e.ball.afterVx * ((i.p0[0] + i.p1[0]) / 2 - r.x) + e.ball.afterVy * ((i.p0[1] + i.p1[1]) / 2 - r.y);
	if (n.population === "goalward-release-v1" && !(o > 0)) return null;
	let s = te({
		ball: r,
		goals: t.goals,
		players: e.players
	}, i.id, e.player.team);
	return !s || s.distanceGoalWidths > 1e6 || s.speedBallRadiiPerSecond > 1e9 || !Object.values(s).every((e) => Number.isFinite(e) && e >= 0) ? null : Object.freeze({
		features: Object.freeze({
			...s,
			distanceGoalWidths: Math.max(0, s.distanceGoalWidths)
		}),
		player: h(e.player),
		goalId: i.id,
		ball: Object.freeze({ ...r })
	});
}
var de = "shot-quality-v1", N = [
	1e6,
	Math.PI,
	1e9,
	32
], P = /^[a-f0-9]{64}$/u, fe = (e, t = 512) => typeof e == "string" && e.length > 0 && e.length <= t && e.trim() === e && !/\p{Cc}/u.test(e), pe = (e) => typeof e == "object" && !!e && !Array.isArray(e), me = (e, t, n) => typeof e == "number" && Number.isFinite(e) && e >= t && e <= n, he = (e, t, n) => me(e, t, n) && Number.isSafeInteger(e), F = (e) => typeof e == "string" && P.test(e), I = (e) => Array.isArray(e) && e.length === 4 && [
	e[0],
	e[1],
	e[2],
	e[3]
].every((e) => me(e, -1e9, 1e9)), ge = (e) => I(e) && e.every((e, t) => me(e, 0, N[t])) && Number.isInteger(e[3]), _e = (e) => Object.freeze([
	e[0],
	e[1],
	e[2],
	e[3]
]);
function L(e) {
	return pe(e) && fe(e.engineId, 128) && F(e.geometrySha256) && F(e.policySha256) && e.featuresRevision === "shot-quality-v1" && [
		"pre-kick",
		"post-kick",
		"end-step"
	].includes(e.featureStage) && [
		"all-kicks-v1",
		"goalward-release-v1",
		"legacy-end-step-on-target-v1"
	].includes(e.population) && e.featureStage === "end-step" == (e.population === "legacy-end-step-on-target-v1") && fe(e.shotDefinitionRevision, 128) && he(e.outcomeHorizonMs, 100, 6e4);
}
function ve(e) {
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
function ye(e, t) {
	return e.engineId === t.engineId && e.geometrySha256 === t.geometrySha256 && e.policySha256 === t.policySha256 && e.featuresRevision === t.featuresRevision && e.featureStage === t.featureStage && e.population === t.population && e.shotDefinitionRevision === t.shotDefinitionRevision && e.outcomeHorizonMs === t.outcomeHorizonMs;
}
function R(e, t) {
	if (!L(t)) return {
		ok: !1,
		reason: "invalid-domain"
	};
	let n = () => ({
		ok: !1,
		reason: "invalid-descriptor"
	});
	if (!pe(e) || e.schemaVersion !== 1 || !fe(e.id, 128) || e.purpose !== "production" && e.purpose !== "technical-fixture" || e.kind !== "logistic" || !L(e.domain) || !me(e.intercept, -100, 100) || !I(e.weights) || !e.weights.every((e) => Math.abs(e) <= 100) || !I(e.means) || !I(e.scales) || !e.scales.every((e) => me(e, 1e-6, 1e6)) || !ge(e.minimums) || !ge(e.maximums) || !e.minimums.every((t, n) => t <= e.maximums[n]) || !e.means.every((t, n) => me(t, e.minimums[n], e.maximums[n])) || !pe(e.evaluation) || !pe(e.provenance)) return n();
	let r = e.evaluation, i = e.provenance;
	return !F(r.trainingDatasetSha256) || !F(r.evaluationDatasetSha256) || r.trainingDatasetSha256 === r.evaluationDatasetSha256 || !F(r.evaluationReportSha256) || r.splitUnit !== "match" || !he(r.heldOutSamples, 2, 1e8) || !he(r.heldOutGoals, 1, r.heldOutSamples - 1) || !me(r.brier, 0, 1) || !me(r.logLoss, 0, 100) || !me(r.ece, 0, 1) || !he(r.eceBins, 2, 100) || !fe(i.provider) || !fe(i.source) || !fe(i.license) || !fe(i.reviewedBy) || !fe(i.reviewReference) ? n() : ye(e.domain, t) ? {
		ok: !0,
		model: Object.freeze({
			schemaVersion: 1,
			id: e.id,
			purpose: e.purpose,
			kind: "logistic",
			domain: ve(e.domain),
			intercept: e.intercept,
			weights: _e(e.weights),
			means: _e(e.means),
			scales: _e(e.scales),
			minimums: _e(e.minimums),
			maximums: _e(e.maximums),
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
function be(e, t) {
	return Object.freeze({
		xG: null,
		status: "uncalibrated",
		reason: e,
		...t ? { modelId: t } : {}
	});
}
function z(e, t, n = {}) {
	let r = e == null ? null : R(e, t), i, a = be("missing-model");
	if (!L(t)) a = be("invalid-domain");
	else if (r?.ok) {
		i = r.model;
		let e = n?.trustedModels, o = JSON.stringify(i), s = Array.isArray(e) && e.length <= 16 && e.some((e) => {
			let n = R(e, t);
			return n.ok && JSON.stringify(n.model) === o;
		});
		a = i.purpose === "technical-fixture" ? be("technical-fixture", i.id) : s ? void 0 : be("untrusted-model", i.id);
	} else r && (a = be(r.reason));
	let o = i && !a ? i : void 0, s = a ?? be("untrusted-model", i?.id);
	return Object.freeze({
		domain: L(t) ? ve(t) : null,
		modelId: o?.id ?? null,
		status: o ? "reviewed-model" : "uncalibrated",
		estimate(e) {
			if (!o) return s;
			let t = [
				e?.distanceGoalWidths,
				e?.openingAngleRadians,
				e?.speedBallRadiiPerSecond,
				e?.defendersInLane
			];
			if (!ge(t)) return be("invalid-features", o.id);
			if (t.some((e, t) => e < o.minimums[t] || e > o.maximums[t])) return be("outside-model-support", o.id);
			let n = o.intercept;
			for (let e = 0; e < 4; e++) n += o.weights[e] * (t[e] - o.means[e]) / o.scales[e];
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
var xe = "98c92c27828179bc4258", B = {
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
}, Se = 1023, Ce = 1024, we = 2048, Te = [
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
function Ee(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid disc property update");
	let t = e, n = {};
	for (let e = 0; e < Te.length; e++) {
		let [r, , i, a] = Te[e], o = t[r];
		if (o == null) continue;
		if (typeof o != "number" || !Number.isFinite(o)) throw Error(`Invalid disc property: ${r}`);
		let s = e < 10 ? Math.fround(o) : o | 0;
		if (!Number.isFinite(s) || s < Math.fround(i) || s > a) throw Error(`Invalid disc property: ${r}`);
		n[r] = s;
	}
	return n;
}
var V = 6619135;
function De(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isInteger)) throw Error("Invalid kick rate limit");
	return Math.max(0, Math.min(255, e)) | Math.max(0, Math.min(255, t)) << 8 | Math.max(0, Math.min(100, n)) << 16;
}
function Oe(e) {
	return [
		e & 255,
		e >>> 8 & 255,
		e >>> 16
	];
}
function ke(e = "Emerald Arena", t = 440, n = 220) {
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
var Ae = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
		}), te = function(e) {
			if (typeof e != "function") throw TypeError(e + " is not a function!");
			return e;
		}, S = function(e, t, n) {
			if (te(e), t === void 0) return e;
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
			for (p in o && (i = r), i) m = !a && u && u[p] !== void 0, g = (m ? u : i)[p], _ = l && m ? S(g, t) : c && typeof g == "function" ? S(Function.call, g) : g, u && ee(u, p, g, e & w.U), d[p] != g && h(d, p, _), c && f[p] != g && (f[p] = g);
		};
		t.core = n, w.F = 1, w.G = 2, w.S = 4, w.P = 8, w.B = 16, w.W = 32, w.U = 64, w.R = 128;
		var T = w, E = Math.ceil, ne = Math.floor, re = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? ne : E)(e);
		}, ie = function(e) {
			if (e == null) throw TypeError("Can't call method on  " + e);
			return e;
		}, D = function(e) {
			return function(t, n) {
				var r = String(ie(t)), i = re(n), a = r.length, o, s;
				return i < 0 || i >= a ? e ? "" : void 0 : (o = r.charCodeAt(i), o < 55296 || o > 56319 || i + 1 === a || (s = r.charCodeAt(i + 1)) < 56320 || s > 57343 ? e ? r.charAt(i) : o : e ? r.slice(i, i + 2) : (o - 55296 << 10) + (s - 56320) + 65536);
			};
		}(!1);
		T(T.P, "String", { codePointAt: function(e) {
			return D(this, e);
		} }), n.String.codePointAt;
		var O = Math.max, ae = Math.min, oe = function(e, t) {
			return e = re(e), e < 0 ? O(e + t, 0) : ae(e, t);
		}, se = String.fromCharCode, ce = String.fromCodePoint;
		T(T.S + T.F * (!!ce && ce.length != 1), "String", { fromCodePoint: function(e) {
			for (var t = arguments, n = [], r = arguments.length, i = 0, a; r > i;) {
				if (a = +t[i++], oe(a, 1114111) !== a) throw RangeError(a + " is not a valid code point");
				n.push(a < 65536 ? se(a) : se(((a -= 65536) >> 10) + 55296, a % 1024 + 56320));
			}
			return n.join("");
		} }), n.String.fromCodePoint;
		var k = {
			Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
			ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
			ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		}, A = {
			isSpaceSeparator: function(e) {
				return typeof e == "string" && k.Space_Separator.test(e);
			},
			isIdStartChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || k.ID_Start.test(e));
			},
			isIdContinueChar: function(e) {
				return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || k.ID_Continue.test(e));
			},
			isDigit: function(e) {
				return typeof e == "string" && /[0-9]/.test(e);
			},
			isHexDigit: function(e) {
				return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
			}
		}, le, j, M, ue, de, N, P, fe, pe, me = function(e, t) {
			le = String(e), j = "start", M = [], ue = 0, de = 1, N = 0, P = void 0, fe = void 0, pe = void 0;
			do
				P = ve(), we[j]();
			while (P.type !== "eof");
			return typeof t == "function" ? he({ "": pe }, "", t) : pe;
		};
		function he(e, t, n) {
			var r = e[t];
			if (typeof r == "object" && r) {
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
					var a = String(i), o = he(r, a, n);
					o === void 0 ? delete r[a] : Object.defineProperty(r, a, {
						value: o,
						writable: !0,
						enumerable: !0,
						configurable: !0
					});
				}
				else for (var s in r) {
					var c = he(r, s, n);
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
		var F, I, ge, _e, L;
		function ve() {
			for (F = "default", I = "", ge = !1, _e = 1;;) {
				L = ye();
				var e = be[F]();
				if (e) return e;
			}
		}
		function ye() {
			if (le[ue]) return String.fromCodePoint(le.codePointAt(ue));
		}
		function R() {
			var e = ye();
			return e === "\n" ? (de++, N = 0) : e ? N += e.length : N++, e && (ue += e.length), e;
		}
		var be = {
			default: function() {
				switch (L) {
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
						R();
						return;
					case "/":
						R(), F = "comment";
						return;
					case void 0: return R(), z("eof");
				}
				if (A.isSpaceSeparator(L)) {
					R();
					return;
				}
				return be[j]();
			},
			comment: function() {
				switch (L) {
					case "*":
						R(), F = "multiLineComment";
						return;
					case "/":
						R(), F = "singleLineComment";
						return;
				}
				throw V(R());
			},
			multiLineComment: function() {
				switch (L) {
					case "*":
						R(), F = "multiLineCommentAsterisk";
						return;
					case void 0: throw V(R());
				}
				R();
			},
			multiLineCommentAsterisk: function() {
				switch (L) {
					case "*":
						R();
						return;
					case "/":
						R(), F = "default";
						return;
					case void 0: throw V(R());
				}
				R(), F = "multiLineComment";
			},
			singleLineComment: function() {
				switch (L) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						R(), F = "default";
						return;
					case void 0: return R(), z("eof");
				}
				R();
			},
			value: function() {
				switch (L) {
					case "{":
					case "[": return z("punctuator", R());
					case "n": return R(), xe("ull"), z("null", null);
					case "t": return R(), xe("rue"), z("boolean", !0);
					case "f": return R(), xe("alse"), z("boolean", !1);
					case "-":
					case "+":
						R() === "-" && (_e = -1), F = "sign";
						return;
					case ".":
						I = R(), F = "decimalPointLeading";
						return;
					case "0":
						I = R(), F = "zero";
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
						I = R(), F = "decimalInteger";
						return;
					case "I": return R(), xe("nfinity"), z("numeric", Infinity);
					case "N": return R(), xe("aN"), z("numeric", NaN);
					case "\"":
					case "'":
						ge = R() === "\"", I = "", F = "string";
						return;
				}
				throw V(R());
			},
			identifierNameStartEscape: function() {
				if (L !== "u") throw V(R());
				R();
				var e = Ce();
				switch (e) {
					case "$":
					case "_": break;
					default: if (!A.isIdStartChar(e)) throw Oe();
				}
				I += e, F = "identifierName";
			},
			identifierName: function() {
				switch (L) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						I += R();
						return;
					case "\\":
						R(), F = "identifierNameEscape";
						return;
				}
				if (A.isIdContinueChar(L)) {
					I += R();
					return;
				}
				return z("identifier", I);
			},
			identifierNameEscape: function() {
				if (L !== "u") throw V(R());
				R();
				var e = Ce();
				switch (e) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default: if (!A.isIdContinueChar(e)) throw Oe();
				}
				I += e, F = "identifierName";
			},
			sign: function() {
				switch (L) {
					case ".":
						I = R(), F = "decimalPointLeading";
						return;
					case "0":
						I = R(), F = "zero";
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
						I = R(), F = "decimalInteger";
						return;
					case "I": return R(), xe("nfinity"), z("numeric", _e * Infinity);
					case "N": return R(), xe("aN"), z("numeric", NaN);
				}
				throw V(R());
			},
			zero: function() {
				switch (L) {
					case ".":
						I += R(), F = "decimalPoint";
						return;
					case "e":
					case "E":
						I += R(), F = "decimalExponent";
						return;
					case "x":
					case "X":
						I += R(), F = "hexadecimal";
						return;
				}
				return z("numeric", _e * 0);
			},
			decimalInteger: function() {
				switch (L) {
					case ".":
						I += R(), F = "decimalPoint";
						return;
					case "e":
					case "E":
						I += R(), F = "decimalExponent";
						return;
				}
				if (A.isDigit(L)) {
					I += R();
					return;
				}
				return z("numeric", _e * Number(I));
			},
			decimalPointLeading: function() {
				if (A.isDigit(L)) {
					I += R(), F = "decimalFraction";
					return;
				}
				throw V(R());
			},
			decimalPoint: function() {
				switch (L) {
					case "e":
					case "E":
						I += R(), F = "decimalExponent";
						return;
				}
				if (A.isDigit(L)) {
					I += R(), F = "decimalFraction";
					return;
				}
				return z("numeric", _e * Number(I));
			},
			decimalFraction: function() {
				switch (L) {
					case "e":
					case "E":
						I += R(), F = "decimalExponent";
						return;
				}
				if (A.isDigit(L)) {
					I += R();
					return;
				}
				return z("numeric", _e * Number(I));
			},
			decimalExponent: function() {
				switch (L) {
					case "+":
					case "-":
						I += R(), F = "decimalExponentSign";
						return;
				}
				if (A.isDigit(L)) {
					I += R(), F = "decimalExponentInteger";
					return;
				}
				throw V(R());
			},
			decimalExponentSign: function() {
				if (A.isDigit(L)) {
					I += R(), F = "decimalExponentInteger";
					return;
				}
				throw V(R());
			},
			decimalExponentInteger: function() {
				if (A.isDigit(L)) {
					I += R();
					return;
				}
				return z("numeric", _e * Number(I));
			},
			hexadecimal: function() {
				if (A.isHexDigit(L)) {
					I += R(), F = "hexadecimalInteger";
					return;
				}
				throw V(R());
			},
			hexadecimalInteger: function() {
				if (A.isHexDigit(L)) {
					I += R();
					return;
				}
				return z("numeric", _e * Number(I));
			},
			string: function() {
				switch (L) {
					case "\\":
						R(), I += B();
						return;
					case "\"":
						if (ge) return R(), z("string", I);
						I += R();
						return;
					case "'":
						if (!ge) return R(), z("string", I);
						I += R();
						return;
					case "\n":
					case "\r": throw V(R());
					case "\u2028":
					case "\u2029":
						ke(L);
						break;
					case void 0: throw V(R());
				}
				I += R();
			},
			start: function() {
				switch (L) {
					case "{":
					case "[": return z("punctuator", R());
				}
				F = "value";
			},
			beforePropertyName: function() {
				switch (L) {
					case "$":
					case "_":
						I = R(), F = "identifierName";
						return;
					case "\\":
						R(), F = "identifierNameStartEscape";
						return;
					case "}": return z("punctuator", R());
					case "\"":
					case "'":
						ge = R() === "\"", F = "string";
						return;
				}
				if (A.isIdStartChar(L)) {
					I += R(), F = "identifierName";
					return;
				}
				throw V(R());
			},
			afterPropertyName: function() {
				if (L === ":") return z("punctuator", R());
				throw V(R());
			},
			beforePropertyValue: function() {
				F = "value";
			},
			afterPropertyValue: function() {
				switch (L) {
					case ",":
					case "}": return z("punctuator", R());
				}
				throw V(R());
			},
			beforeArrayValue: function() {
				if (L === "]") return z("punctuator", R());
				F = "value";
			},
			afterArrayValue: function() {
				switch (L) {
					case ",":
					case "]": return z("punctuator", R());
				}
				throw V(R());
			},
			end: function() {
				throw V(R());
			}
		};
		function z(e, t) {
			return {
				type: e,
				value: t,
				line: de,
				column: N
			};
		}
		function xe(e) {
			for (var t = 0, n = e; t < n.length; t += 1) {
				var r = n[t];
				if (ye() !== r) throw V(R());
				R();
			}
		}
		function B() {
			switch (ye()) {
				case "b": return R(), "\b";
				case "f": return R(), "\f";
				case "n": return R(), "\n";
				case "r": return R(), "\r";
				case "t": return R(), "	";
				case "v": return R(), "\v";
				case "0":
					if (R(), A.isDigit(ye())) throw V(R());
					return "\0";
				case "x": return R(), Se();
				case "u": return R(), Ce();
				case "\n":
				case "\u2028":
				case "\u2029": return R(), "";
				case "\r": return R(), ye() === "\n" && R(), "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw V(R());
				case void 0: throw V(R());
			}
			return R();
		}
		function Se() {
			var e = "", t = ye();
			if (!A.isHexDigit(t) || (e += R(), t = ye(), !A.isHexDigit(t))) throw V(R());
			return e += R(), String.fromCodePoint(parseInt(e, 16));
		}
		function Ce() {
			for (var e = "", t = 4; t-- > 0;) {
				var n = ye();
				if (!A.isHexDigit(n)) throw V(R());
				e += R();
			}
			return String.fromCodePoint(parseInt(e, 16));
		}
		var we = {
			start: function() {
				if (P.type === "eof") throw De();
				Te();
			},
			beforePropertyName: function() {
				switch (P.type) {
					case "identifier":
					case "string":
						fe = P.value, j = "afterPropertyName";
						return;
					case "punctuator":
						Ee();
						return;
					case "eof": throw De();
				}
			},
			afterPropertyName: function() {
				if (P.type === "eof") throw De();
				j = "beforePropertyValue";
			},
			beforePropertyValue: function() {
				if (P.type === "eof") throw De();
				Te();
			},
			beforeArrayValue: function() {
				if (P.type === "eof") throw De();
				if (P.type === "punctuator" && P.value === "]") {
					Ee();
					return;
				}
				Te();
			},
			afterPropertyValue: function() {
				if (P.type === "eof") throw De();
				switch (P.value) {
					case ",":
						j = "beforePropertyName";
						return;
					case "}": Ee();
				}
			},
			afterArrayValue: function() {
				if (P.type === "eof") throw De();
				switch (P.value) {
					case ",":
						j = "beforeArrayValue";
						return;
					case "]": Ee();
				}
			},
			end: function() {}
		};
		function Te() {
			var e;
			switch (P.type) {
				case "punctuator":
					switch (P.value) {
						case "{":
							e = {};
							break;
						case "[": e = [];
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string": e = P.value;
			}
			if (pe === void 0) pe = e;
			else {
				var t = M[M.length - 1];
				Array.isArray(t) ? t.push(e) : Object.defineProperty(t, fe, {
					value: e,
					writable: !0,
					enumerable: !0,
					configurable: !0
				});
			}
			if (typeof e == "object" && e) M.push(e), j = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName";
			else {
				var n = M[M.length - 1];
				j = n == null ? "end" : Array.isArray(n) ? "afterArrayValue" : "afterPropertyValue";
			}
		}
		function Ee() {
			M.pop();
			var e = M[M.length - 1];
			j = e == null ? "end" : Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue";
		}
		function V(e) {
			return je(e === void 0 ? "JSON5: invalid end of input at " + de + ":" + N : "JSON5: invalid character '" + Ae(e) + "' at " + de + ":" + N);
		}
		function De() {
			return je("JSON5: invalid end of input at " + de + ":" + N);
		}
		function Oe() {
			return N -= 5, je("JSON5: invalid identifier character at " + de + ":" + N);
		}
		function ke(e) {
			console.warn("JSON5: '" + Ae(e) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function Ae(e) {
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
		function je(e) {
			var t = SyntaxError(e);
			return t.lineNumber = de, t.columnNumber = N, t;
		}
		return {
			parse: me,
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
							case "\0": if (A.isDigit(e[i + 1])) {
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
					if (!A.isIdStartChar(t)) return m(e, !0);
					for (var n = t.length; n < e.length; n++) if (!A.isIdContinueChar(String.fromCodePoint(e.codePointAt(n)))) return m(e, !0);
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
function je(e, t, n, r) {
	let i = Math.ceil(2 * Math.SQRT2 * 100 / Math.max(.5, Math.min(10, r))), a = e + 32;
	if (a * (2 * t + a + 2 * n) * i * 13 > 26e6) throw Error("Stadium collision complexity exceeds the room budget");
}
var Me = {
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
}, Ne = 4096;
function Pe(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Expected an object");
	return e;
}
function H(e, t, n = -4096, r = Ne) {
	let i = e === void 0 ? t : e;
	if (typeof i != "number" || !Number.isFinite(i) || i < n || i > r) throw Error(`Number must be between ${n} and ${r}`);
	return i;
}
function Fe(e, t = [0, 0]) {
	if (e === void 0) return [...t];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Expected [x, y]");
	return [H(e[0], 0), H(e[1], 0)];
}
function Ie(e, t) {
	if (e === void 0) return [];
	if (!Array.isArray(e) || e.length > t) throw Error(`Array limit: ${t}`);
	return e;
}
function Le(e, t) {
	return e === void 0 ? t : typeof e == "number" ? H(e, t, -2147483648, 4294967295) | 0 : Ie(e, 16).reduce((e, t) => {
		if (typeof t != "string" || !Object.hasOwn(Me, t)) throw Error("Unknown collision flag");
		return e | Me[t];
	}, 0);
}
function Re(e, t = "FFFFFF") {
	if (e === void 0) return t;
	if (e === "transparent") return e;
	if (Array.isArray(e) && e.length === 3) return e.map((e) => Math.round(H(e, 0, 0, 255)).toString(16).padStart(2, "0")).join("");
	if (typeof e == "string" && /^[0-9a-f]{6}$/i.test(e)) return e;
	throw Error("Invalid color");
}
var ze = 4096, Be = 1024, Ve = .15, He = 1e-4, Ue = (e) => [H(e.x, 0), H(e.y, 0)];
function We(e) {
	return {
		a: Ue(e),
		b: Ue(e),
		bCoef: H(e.bCoef, 1, -1, 8192),
		cGroup: Le(e.cGroup, 32),
		cMask: Le(e.cMask, 63),
		bias: 0,
		color: "transparent",
		vis: !1
	};
}
function Ge(e) {
	return e.curveF === void 0 ? H(e.curve, 0, -359, 359) : 2 * Math.atan2(1, H(e.curveF, 0, -1e8, 1e8)) * 180 / Math.PI;
}
function Ke(e, t, n, r, i, a) {
	let o = r * Math.PI / 180, s = t[0] - e[0], c = t[1] - e[1];
	if (Math.hypot(s, c) < .001) throw Error("Arc endpoints overlap");
	let l = 1 / (2 * Math.tan(o / 2)), u = [(e[0] + t[0]) / 2 - c * l, (e[1] + t[1]) / 2 + s * l], d = Math.hypot(e[0] - u[0], e[1] - u[1]), f = Math.atan2(e[1] - u[1], e[0] - u[0]), p = Math.ceil(Math.abs(o) / Math.max(1e-8, 2 * Math.acos(Math.max(-1, 1 - Ve / d))));
	if (a.segments.length + p > ze) throw Error("Compiled geometry exceeds 4096 segments");
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
function qe(e, t, n) {
	let r = e.map(We), i = {
		segments: r,
		arcs: [],
		colliders: [...r]
	};
	for (let a of Ie(t, Be)) {
		let t = n(a), o = H(t.v0, -1, 0, e.length - 1), s = H(t.v1, -1, 0, e.length - 1);
		if (!Number.isInteger(o) || !Number.isInteger(s)) throw Error("Vertex indices must be integers");
		let c = Ue(e[o]), l = Ue(e[s]), u = {
			bCoef: H(t.bCoef, 1, -1, 8192),
			cGroup: Le(t.cGroup, 32),
			cMask: Le(t.cMask, 63),
			bias: H(t.bias, 0, -100, 100),
			color: Re(t.color, "000000"),
			vis: t.vis !== !1
		}, d = Ge(t);
		if (Math.abs(d) >= He) {
			Ke(c, l, u, d, t, i);
			continue;
		}
		let f = {
			a: c,
			b: l,
			...u
		};
		r.push(f), (c[0] !== l[0] || c[1] !== l[1]) && i.colliders.push(f);
	}
	if (r.length > ze) throw Error("Compiled geometry exceeds 4096 segments");
	return i;
}
var Je = Object.fromEntries(Object.entries({
	root: "version physicsMode name width height maxViewWidth cameraFollow spawnDistance canBeStored kickOffReset bg traits vertexes segments goals discs planes joints redSpawnPoints blueSpawnPoints playerPhysics ballPhysics",
	bg: "type width height kickOffRadius cornerRadius color",
	vertexes: "trait x y bCoef cMask cGroup",
	segments: "trait v0 v1 bCoef cMask cGroup curve curveF bias color vis",
	discs: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color",
	planes: "trait normal dist bCoef cMask cGroup",
	goals: "trait p0 p1 team",
	joints: "trait d0 d1 length strength color",
	playerPhysics: "trait pos speed gravity radius invMass damping bCoef cGroup cMask color acceleration kickingAcceleration kickingDamping kickStrength kickback"
}).map(([e, t]) => [e, new Set(t.split(" "))])), Ye = new Set([
	"vertexes",
	"segments",
	"discs",
	"planes",
	"goals",
	"joints",
	"playerPhysics"
].flatMap((e) => [...Je[e]]));
function Xe(e) {
	let t = [], n = (e, t) => {
		let n = t.length > 80 ? `${t.slice(0, 80)}…` : t;
		return e + (/^[A-Za-z_$][\w$]*$/.test(n) ? `.${n}` : `[${JSON.stringify(n)}]`);
	}, r = (e, r, i) => {
		if (e && typeof e == "object" && !Array.isArray(e)) for (let a of Object.keys(e)) r.has(a) || (t.length < 64 ? t.push(`Unsupported stadium field: ${n(i, a)}`) : t.length === 64 && t.push("Additional unsupported stadium fields omitted."));
	};
	r(e, Je.root, "$"), r(e.bg, Je.bg, "$.bg");
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
			r(e, Je[t], `$.${t}[${n}]`);
		});
	}
	if (r(e.ballPhysics, Je.discs, "$.ballPhysics"), r(e.playerPhysics, Je.playerPhysics, "$.playerPhysics"), e.traits && typeof e.traits == "object" && !Array.isArray(e.traits)) for (let [t, i] of Object.entries(e.traits)) r(i, Ye, n("$.traits", t));
	return t;
}
var Ze = 262144, Qe = 63, $e = 1024, et = 64, tt = 16, nt = 128, rt = 192, it = [
	"grass",
	"asphalt",
	"none"
];
function at(e) {
	let t = e.traits === void 0 ? {} : Pe(e.traits);
	return (e) => {
		let n = Pe(e);
		if (n.trait === void 0) return n;
		if (typeof n.trait != "string" || !Object.hasOwn(t, n.trait)) throw Error("Unknown trait");
		return {
			...Pe(t[n.trait]),
			...n
		};
	};
}
function ot(e, t = !1) {
	return {
		pos: Fe(e.pos),
		speed: Fe(e.speed),
		gravity: Fe(e.gravity),
		radius: H(e.radius, 10, .5, 100),
		invMass: H(e.invMass, 1, 0, 8192),
		damping: H(e.damping, .99, 0, 8192),
		bCoef: H(e.bCoef, .5, -1, 8192),
		cGroup: Le(e.cGroup, t ? 193 : 63),
		cMask: Le(e.cMask, 63),
		color: Re(e.color)
	};
}
function st(e, t) {
	let n = Ie(e.discs, Qe).map((e) => ot(t(e)));
	if (e.ballPhysics !== "disc0") {
		let r = ot(e.ballPhysics === void 0 ? {} : t(e.ballPhysics), !0);
		r.cGroup |= rt, n.unshift(r);
	} else if (!n.length) throw Error("disc0 needs a disc");
	return n;
}
function ct(e, t) {
	let n = e.playerPhysics === void 0 ? {} : t(e.playerPhysics);
	return {
		...ot({
			...n,
			radius: n.radius ?? 15,
			invMass: n.invMass ?? .5,
			damping: n.damping ?? .96,
			cGroup: n.cGroup ?? 0
		}),
		acceleration: H(n.acceleration, .1, -8192, 8192),
		kickingAcceleration: H(n.kickingAcceleration, .07, -8192, 8192),
		kickingDamping: H(n.kickingDamping, .96, 0, 8192),
		kickStrength: H(n.kickStrength, 5, -8192, 8192),
		kickback: H(n.kickback, 0, -8192, 8192)
	};
}
function lt(e) {
	let t = e === void 0 ? {} : Pe(e);
	if (t.type !== void 0 && !it.includes(t.type)) throw Error("Unsupported stadium background type");
	return t;
}
function ut(e) {
	return {
		type: e.type === "grass" || e.type === "asphalt" ? e.type : "none",
		cornerRadius: H(e.cornerRadius, 0, 0, 500),
		width: H(e.width, 0, 0, 2048),
		height: H(e.height, 0, 0, 2048),
		color: Re(e.color, "718C5A"),
		kickOffRadius: H(e.kickOffRadius, 0, 0, 500)
	};
}
function dt(e) {
	let t = Fe(e.normal);
	if (Math.hypot(...t) < 1e-6) throw Error("Plane normal is zero");
	return {
		normal: t,
		dist: H(e.dist, 0),
		bCoef: H(e.bCoef, 1, -1, 8192),
		cGroup: Le(e.cGroup, 32),
		cMask: Le(e.cMask, 63)
	};
}
function ft(e) {
	if (e.team !== "red" && e.team !== "blue") throw Error("Invalid goal team");
	let t = Fe(e.p0), n = Fe(e.p1);
	if (Math.hypot(n[0] - t[0], n[1] - t[1]) < 1) throw Error("Goal has zero length");
	return {
		p0: t,
		p1: n,
		team: e.team === "red" ? 1 : 2
	};
}
function pt(e, t) {
	let n = H(e.d0, -1, 0, t.length - 1), r = H(e.d1, -1, 0, t.length - 1);
	if (!Number.isInteger(n) || !Number.isInteger(r) || n === r) throw Error("Invalid joint indices");
	let i = Math.hypot(t[r].pos[0] - t[n].pos[0], t[r].pos[1] - t[n].pos[1]), a = e.length == null ? [i, i] : typeof e.length == "number" ? [e.length, e.length] : Fe(e.length);
	return {
		d0: n,
		d1: r,
		min: H(a[0], 0, 0),
		max: H(a[1], 0, 0),
		strength: e.strength === void 0 || e.strength === "rigid" ? "rigid" : H(e.strength, 0, -8192, 8192),
		color: Re(e.color, "000000")
	};
}
function mt(e) {
	if (new TextEncoder().encode(e).length > Ze) throw Error("Stadium exceeds 256 KB");
	let t = Pe(Ae.default.parse(e));
	if (t.physicsMode !== void 0 && t.physicsMode !== "stadium" && t.physicsMode !== "substeps") throw Error("Invalid physics mode");
	if (t.version !== void 0 && t.version !== 1) throw Error("Unsupported stadium version");
	let n = at(t), r = st(t, n), i = Ie(t.vertexes, $e).map(n), a = Xe(t), { segments: o, arcs: s, colliders: c } = qe(i, t.segments, n), l = ct(t, n), u = Ie(t.planes, et), d = Ie(t.joints, nt);
	je(r.length, o.length, u.length + d.length, Math.min(l.radius, ...r.map((e) => e.radius)));
	let f = lt(t.bg);
	return {
		version: 1,
		physicsMode: t.physicsMode === "substeps" ? "substeps" : "stadium",
		name: typeof t.name == "string" ? t.name.slice(0, 64) : "Untitled stadium",
		canBeStored: t.canBeStored !== !1,
		width: H(t.width, 520, 100, 2048),
		height: H(t.height, 300, 80, 2048),
		maxViewWidth: H(t.maxViewWidth, 0, 0, 4096),
		cameraFollow: t.cameraFollow === "player" ? "player" : "ball",
		bg: ut(f),
		discs: r,
		segments: o,
		arcs: s,
		colliders: c,
		player: l,
		spawnDistance: H(t.spawnDistance, 200, 0, 1500),
		kickOffReset: t.kickOffReset === "full" ? "full" : "partial",
		redSpawnPoints: Ie(t.redSpawnPoints, 32).map((e) => Fe(e)),
		blueSpawnPoints: Ie(t.blueSpawnPoints, 32).map((e) => Fe(e)),
		warnings: a,
		planes: u.map((e) => dt(n(e))),
		goals: Ie(t.goals, tt).map((e) => ft(n(e))),
		joints: d.map((e) => pt(n(e), r))
	};
}
function ht(e, t, n) {
	if (!Number.isFinite(e) || !Number.isInteger(t) || t < 0 || t > 16777215 || !Array.isArray(n) || n.length < 1 || n.length > 3 || n.some((e) => !Number.isInteger(e) || e < 0 || e > 16777215)) throw Error("Invalid team colors");
	return {
		angle: (e % 360 + 360) % 360,
		textColor: t,
		colors: [...n]
	};
}
function gt(e) {
	if (e === void 0) return [null, null];
	if (!Array.isArray(e) || e.length !== 2) throw Error("Invalid team styles");
	return e.map((e) => e === null ? null : ht(e.angle, e.textColor, e.colors));
}
var _t = [15035990, 5671397], vt = (e) => e.color === "transparent" ? -1 : Number.parseInt(e.color, 16);
function yt(e, t = 0) {
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
function bt(e, t, n) {
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
function xt(e, t) {
	je(e.discs.length, e.segments.length, e.planes.length + e.joints.length, t);
}
function St(e, t, n, r, i) {
	let a = n * 18;
	if (!Te.some(([i, o]) => {
		let s = r[i];
		return s !== void 0 && !Object.is(o === -1 ? t[n] : e[a + o], s);
	})) return !1;
	if (r.radius !== void 0) {
		let a = r.radius;
		for (let r = 0; r < t.length; r++) r !== n && (a = Math.min(a, e[r * 18 + B.RADIUS]));
		xt(i, a);
	}
	for (let [i, o] of Te) {
		let s = r[i];
		s !== void 0 && (o === -1 ? t[n] = s : e[a + o] = s);
	}
	return !0;
}
var Ct = 32, wt = 11, Tt = 6, Et = class {
	snapshots = [];
	players = [];
	complete = !0;
	kickPool = Array.from({ length: Ct }, (e, t) => ({
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
	playerPool = Array.from({ length: Ct }, () => ({
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
			let t = e * wt, n = this.kickPool[e];
			n.contactIndex = this.kicks[t] < 0 ? null : this.kicks[t], n.disc = this.kicks[t + 1], n.slot = this.kicks[t + 2], n.team = this.kicks[t + 3], n.ball.x = this.kicks[t + 4], n.ball.y = this.kicks[t + 5], n.ball.radius = this.kicks[t + 6], n.ball.beforeVx = this.kicks[t + 7], n.ball.beforeVy = this.kicks[t + 8], n.ball.afterVx = this.kicks[t + 9], n.ball.afterVy = this.kicks[t + 10], this.snapshots.push(n);
		}
		let i = e.ball_kick_players_count(), a = e.ball_kick_players_ptr();
		(!this.roster || this.roster.buffer !== n || this.roster.byteOffset !== a) && (this.roster = new Float64Array(n, a, 192));
		for (let e = 0; e < i; e++) {
			let t = e * Tt, n = this.playerPool[e];
			n.disc = this.roster[t], n.slot = this.roster[t + 1], n.team = this.roster[t + 2], n.x = this.roster[t + 3], n.y = this.roster[t + 4], n.radius = this.roster[t + 5], this.players.push(n);
		}
	}
}, Dt = 55;
function Ot(e, t, n, r) {
	let i = t === 1 ? e.redSpawnPoints : e.blueSpawnPoints, a = t === 1 ? -1 : 1;
	if (i.length) return i[r ? i.length - 1 : Math.min(n, i.length - 1)];
	if (r) return [a * e.width, 0];
	let o = n ? Math.ceil(n / 2) * Dt * (n % 2 ? 1 : -1) : 0;
	return [a * e.spawnDistance, o];
}
var kt = 8192, At = 2147483648, jt = 25500, Mt = [
	"lobby",
	"playing",
	"goal",
	"finished"
], Nt = (e, t, n = 0) => Number.isInteger(e) && e >= n && e <= t;
function Pt(e) {
	let t = e % 18;
	return t === B.COLLISION_GROUP || t === B.COLLISION_MASK ? At : t === B.KICK_BUDGET ? jt : kt;
}
function Ft(e, t) {
	if (!e || typeof e != "object" || !Array.isArray(e.discs) || e.discs.length !== t || !e.discs.every((e, t) => typeof e == "number" && Number.isFinite(e) && Math.abs(e) <= Pt(t))) throw Error("Invalid state");
	if (!Array.isArray(e.colors) || e.colors.length !== e.discs.length / 18 || e.colors.some((e) => !Number.isInteger(e) || e < -1 || e > 16777215)) throw Error("Invalid disc colors");
}
function It(e) {
	if (!Nt(e.kickRate, 6619135) || !Nt(e.tick, 4294967295) || !Nt(e.elapsed, 4294967295) || !Nt(e.red, 65535) || !Nt(e.blue, 65535) || !Nt(e.countdown, 330) || !Nt(e.resumeTicks, 119) || (e.paused || e.phase === "lobby") && e.resumeTicks !== 0 || !Nt(e.scoreLimit, 99) || !Nt(e.timeLimit, 5940) || !Mt.includes(e.phase) || typeof e.paused != "boolean" || typeof e.kickoffActive != "boolean" || ![1, 2].includes(e.kickoff)) throw Error("Invalid match metadata");
	for (let t of [e.lastTouch, e.goalTouch]) if (t != null && (typeof t != "object" || !Nt(t.slot, 31) || ![1, 2].includes(t.team))) throw Error("Invalid goal attribution");
}
function Lt(e) {
	for (let t = 0; t < e.length; t += 18) {
		let n = (n) => e[t + n];
		if (n(B.RADIUS) < .5 || n(B.RADIUS) > 100 || n(B.INVERSE_MASS) < 0 || n(B.INVERSE_MASS) > kt || n(B.DAMPING) < 0 || n(B.DAMPING) > kt || n(B.BOUNCE) < -1 || n(B.BOUNCE) > kt || !Nt(n(B.COLLISION_GROUP), 2147483647, -2147483648) || !Nt(n(B.COLLISION_MASK), 2147483647, -2147483648) || !Nt(n(B.TEAM), 2) || !Nt(n(B.INPUT), 31) || !Nt(n(B.KICK_STATE), 4095) || n(B.PLAYER_SLOT) > 0 && (!Number.isInteger(n(B.KICK_BUDGET)) || n(B.KICK_BUDGET) < -255 || n(B.KICK_BUDGET) > jt)) throw Error("Invalid disc properties");
	}
}
function Rt(e, t, n) {
	Ft(e, t), It(e), Lt(e.discs);
	let r = 10;
	for (let t = B.RADIUS; t < e.discs.length; t += 18) r = Math.min(r, e.discs[t]);
	xt(n, r);
}
async function zt(e) {
	return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", e))).map((e) => e.toString(16).padStart(2, "0")).join("");
}
async function Bt(e, t) {
	let n = e ?? await (await fetch("/core.wasm?v=98c92c27828179bc4258", { signal: t })).arrayBuffer();
	if (await zt(n) !== "23989127182d21b3dc42055febe7b8d25cc3e9bcf7b5b738de652a48f6735871") throw Error("Physics build changed. Refresh the page to load a matching version.");
	return WebAssembly.instantiate(await WebAssembly.compile(n));
}
var U = 60, Vt = [
	0,
	Me.red,
	Me.blue
], Ht = {
	1: Me.redKO,
	2: Me.blueKO
}, Ut = Me.redKO | Me.blueKO, Wt = 300, Gt = (e) => e ? { ...e } : null, Kt = [
	"kick",
	"disc",
	"wall"
], qt = class e {
	core;
	stadium;
	source = "";
	colors = [];
	tick = 0;
	elapsed = 0;
	ballKicks = [];
	ballContacts = [];
	ballContactsComplete = !0;
	kickSnapshots = new Et();
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
	ballContact;
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
		return new e(await Bt(t, n));
	}
	view;
	get data() {
		let e = this.core.memory.buffer, t = this.core.data_ptr(), n = this.core.count() * 18, r = this.view;
		return r && r.buffer === e && r.byteOffset === t && r.length === n ? r : (this.view = new Float64Array(e, t, n), this.view);
	}
	setKickRateLimit(e, t, n) {
		this.kickRate = De(e, t, n), this.core.kick_limits(...Oe(this.kickRate));
	}
	load(e) {
		this.stadium = mt(e), this.source = e, this.core.reset(), this.kickSnapshotsEnabled = !1, this.kickSnapshots.clear(), this.clearEvents(), this.colors = [], this.core.physics_mode(+(this.stadium.physicsMode === "substeps")), this.tick = 0, this.elapsed = 0, this.red = this.blue = 0, this.lastTouch = this.goalTouch = null, this.phase = "lobby", this.paused = !1, this.resumeTicks = 0, this.countdown = 0, this.kickoffActive = !0;
		for (let e of this.stadium.discs) this.add(e);
		for (let e = 0; e < 32; e++) this.add(this.stadium.player, e + 1);
		bt(this.core, this.stadium, this.kickRate), this.setKickRateLimit(...Oe(this.kickRate));
	}
	add(e, t = 0) {
		let n = this.core.add_disc();
		if (n < 0) throw Error("Disc capacity exceeded");
		this.colors.push(vt(e)), yt(e, t).forEach((e, t) => {
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
		this.data[t + B.KICK_STATE] = 0, this.data[t + B.KICK_BUDGET] = 0, this.setTeam(e, 0);
	}
	setTeam(e, t) {
		if (![
			0,
			1,
			2
		].includes(t)) throw Error("Invalid team");
		let n = this.index(e), r = n * 18, i = this.data;
		i[r + B.TEAM] = t, i[r + B.COLLISION_GROUP] = this.stadium.player.cGroup | Vt[t], i[r + B.INPUT] = 0, this.spawn(n, e, t, this.phase !== "lobby");
	}
	input(e, t) {
		let n = this.data, r = this.index(e) * 18, i = t & 31;
		i & 16 ? n[r + B.INPUT] & 16 || (n[r + B.KICK_STATE] |= Ce | we) : n[r + B.KICK_STATE] & 2048 || (n[r + B.KICK_STATE] &= Se), n[r + B.INPUT] = i;
	}
	applyDiscProperties(e, t) {
		let n = this.data;
		return this.phase === "lobby" || !Number.isInteger(e) || e < 0 || e >= this.colors.length || n[e * 18 + B.PLAYER_SLOT] > 0 && n[e * 18 + B.TEAM] === 0 ? !1 : St(n, this.colors, e, Ee(t), this.stadium);
	}
	restoreDiscProperties(e, t) {
		let n = e * 18, r = this.data;
		this.colors[e] = vt(t), r[n + B.RADIUS] = t.radius, r[n + B.INVERSE_MASS] = t.invMass, r[n + B.DAMPING] = t.damping, r[n + B.BOUNCE] = t.bCoef, r[n + B.GRAVITY_X] = t.gravity[0], r[n + B.GRAVITY_Y] = t.gravity[1], r[n + B.COLLISION_GROUP] = t.cGroup, r[n + B.COLLISION_MASK] = t.cMask;
	}
	teamRank(e, t) {
		let n = 0;
		for (let r = 0; r < e; r++) this.data[this.index(r) * 18 + B.TEAM] === t && n++;
		return n;
	}
	spawn(e, t, n, r = !1) {
		this.restoreDiscProperties(e, this.stadium.player), this.colors[e] = n === 1 || n === 2 ? _t[n - 1] : 16777215;
		let i = this.data, a = e * 18;
		i[a + B.COLLISION_GROUP] |= Vt[n] ?? 0;
		let [o, s] = Ot(this.stadium, n, this.teamRank(t, n), r);
		i[a + B.X] = o, i[a + B.Y] = s, i[a + B.SPEED_X] = i[a + B.SPEED_Y] = i[a + B.INPUT] = 0, i[a + B.KICK_STATE] &= Se, i[a + B.COLLISION_MASK] = this.stadium.player.cMask & ~Ut;
	}
	resetPositions(e = !1) {
		this.kickSnapshots.clear(), this.kickoffActive = !0, this.lastTouch = null;
		let t = this.data;
		for (let n = 0; n < this.stadium.discs.length; n++) {
			let r = this.stadium.discs[n];
			(e || n === 0 || this.stadium.kickOffReset === "full") && (this.restoreDiscProperties(n, r), t[n * 18 + B.X] = r.pos[0], t[n * 18 + B.Y] = r.pos[1], t[n * 18 + B.SPEED_X] = r.speed[0], t[n * 18 + B.SPEED_Y] = r.speed[1]);
		}
		for (let e = 0; e < 32; e++) {
			let n = this.index(e);
			this.spawn(n, e, t[n * 18 + B.TEAM]);
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
		this.phase = "finished", this.countdown = Wt;
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
			let r = (t + n) * 18, i = e[r + B.KICK_STATE];
			i & 3072 && (e[r + B.KICK_STATE] = i & (e[r + B.INPUT] & 16 ? Se | Ce : Se));
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
			e[B.SPEED_X] ** 2 + e[B.SPEED_Y] ** 2 > 0 && (this.kickoffActive = !1);
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
				e.kind = Kt[this.contactView[t * 3]], e.disc = this.contactView[t * 3 + 1], e.speed = this.contactView[t * 3 + 2], this.ballContacts.push(e);
			}
		}
		if (this.phase === "playing") {
			let e = this.core.ball_touch_slot();
			if (e >= 0 && e < 32) {
				let t = this.data[this.index(e) * 18 + B.TEAM];
				(t === 1 || t === 2) && (this.lastTouch = {
					slot: e,
					team: t
				});
			}
		}
		let t = this.core.ball_contact_speed();
		t >= 1 && (this.ballContact = {
			disc: this.core.ball_contact_disc(),
			speed: t
		});
		let n = this.core.player_contact_speed();
		if (n > 0) {
			let e = this.core.player_contact_pair() >>> 0;
			this.playerContact = {
				a: e & 255,
				b: e >>> 8 & 255,
				speed: n
			};
		}
		for (let e = this.core.ball_kick_events() >>> 0, t = 0; e; e >>>= 1, t++) e & 1 && this.ballKicks.push(t);
	}
	afterGoalPause() {
		this.scoreLimit > 0 && Math.max(this.red, this.blue) >= this.scoreLimit || this.timeExpiredWithLeader() ? this.finish() : (this.phase = "playing", this.resetPositions());
	}
	applyKickoffBarriers() {
		let e = this.data, t = this.stadium.player.cMask, n = this.kickoffActive ? t & Ht[this.kickoff] : 0;
		for (let r = 0; r < 32; r++) e[this.index(r) * 18 + B.COLLISION_MASK] = t & ~Ut | n;
	}
	scoreGoal(e) {
		e === 1 ? this.red++ : this.blue++, this.kickoff = e === 1 ? 2 : 1, this.phase = "goal", this.countdown = 330, this.goalTouch = Gt(this.lastTouch), this.lastGoal = this.tick;
	}
	snapshot() {
		return {
			lastTouch: Gt(this.lastTouch),
			goalTouch: Gt(this.goalTouch),
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
		Rt(e, this.data.length, this.stadium), this.setKickSnapshotsEnabled(!1), this.clearEvents(), this.setKickRateLimit(...Oe(e.kickRate)), this.lastTouch = Gt(e.lastTouch), this.goalTouch = Gt(e.goalTouch), this.tick = e.tick, this.elapsed = e.elapsed, this.red = e.red, this.blue = e.blue, this.phase = e.phase, this.paused = e.paused, this.resumeTicks = e.resumeTicks, this.countdown = e.countdown, this.kickoff = e.kickoff, this.kickoffActive = e.kickoffActive, this.scoreLimit = e.scoreLimit, this.timeLimit = e.timeLimit, this.data.set(e.discs), this.colors = [...e.colors];
	}
}, Jt = `ball2d-core/1/${xe}`;
function Yt(e) {
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
var Xt = class {
	analyzer = new p(U);
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
		let n = this.stadium !== e.stadium, r = n ? Yt(e) : this.defaults, i = this.geometry ?? this.defaults, a = t ?? r;
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
			let t = e.ballContact.disc, n = t * 18, s = t > 0 && i[n + B.INVERSE_MASS] === 0 ? a.find((e) => [e.p0, e.p1].some((e) => Math.hypot(i[n] - e[0], i[n + B.Y] - e[1]) <= i[n + B.RADIUS])) : void 0;
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
				radius: i[B.RADIUS]
			},
			goals: a,
			...o ? { contact: o } : {}
		});
	}
};
function Zt(e, t) {
	t.length && e.broadcast({
		type: "match-analysis",
		version: 1,
		sentAtMs: performance.now(),
		streamId: t[0].streamId,
		observations: t
	});
}
var Qt = (e) => typeof e == "string" && e.length > 0 && e.length <= 128 && e.trim() === e && !/\p{Cc}/u.test(e), $t = (e) => Number.isFinite(e) && Math.abs(e) <= 1e9;
function en(e, t, n) {
	return !e || e.sessionId !== t || e.team !== n || n !== 1 && n !== 2 || !Number.isSafeInteger(e.playerId) || e.playerId < 0 || e.playerId > 2147483647 ? null : Object.freeze({
		sessionId: t,
		playerId: e.playerId,
		team: n
	});
}
var tn = class {
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
		if (!Qt(t.streamId) || !Number.isSafeInteger(t.epoch) || t.epoch < 0 || t.epoch > 65535 || !Number.isSafeInteger(e.tick) || e.tick < 0 || !Array.isArray(t.goals) || t.goals.length > 32) throw Error("Invalid explicit shot capture context");
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
			let i = e.index(n), a = i * 18, d = o[a + B.TEAM];
			if (d === 0) continue;
			let f = en(r(n), t, d);
			if (!f || u.has(f.playerId) || o[a + B.PLAYER_SLOT] !== n + 1) {
				s = !1;
				continue;
			}
			u.add(f.playerId), l.set(i, f), c.push(Object.freeze({
				identity: f,
				x: o[a],
				y: o[a + B.Y],
				vx: o[a + B.SPEED_X] * U,
				vy: o[a + B.SPEED_Y] * U,
				radius: o[a + B.RADIUS]
			}));
		}
		let d = !!(o[B.COLLISION_GROUP] & 128);
		for (let e = 18; e < o.length; e += 18) o[e + B.COLLISION_GROUP] & 128 && (d = !1);
		let f = i.map((e) => Object.freeze({
			id: e.id,
			defendingTeam: e.defendingTeam,
			p0: Object.freeze([...e.p0]),
			p1: Object.freeze([...e.p1]),
			pitchPoint: Object.freeze([...e.pitchPoint])
		})), p = [], m = [];
		if (a) {
			s &&= e.ballContactsComplete && e.ballKickSnapshotsComplete;
			for (let [r, a] of e.ballContacts.entries()) {
				let c = l.get(a.disc), u = {
					id: `${t}:${n}:${e.tick}:contact:${r}`,
					tick: e.tick
				};
				if (a.kind === "kick") c || (s = !1), p.push(Object.freeze({
					...u,
					kind: "kick",
					...c ? { player: c } : {}
				}));
				else if (c) p.push(Object.freeze({
					...u,
					kind: "player",
					player: c
				}));
				else {
					a.disc >= e.stadium.discs.length && (s = !1);
					let t = a.disc * 18, n = a.kind === "disc" && a.disc > 0 && o[t + B.INVERSE_MASS] === 0 ? i.find((e) => [e.p0, e.p1].some((e) => Math.hypot(o[t] - e[0], o[t + B.Y] - e[1]) <= o[t + B.RADIUS])) : void 0;
					p.push(Object.freeze(n ? {
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
				].every($t) || t.radius <= 0) {
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
				].every($t) || o.ball.radius <= 0) {
					s = !1;
					continue;
				}
				m.push(Object.freeze({
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
			m.length !== e.ballContacts.filter((e) => e.kind === "kick").length && (s = !1);
		}
		let h = {
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
				radius: o[B.RADIUS]
			}),
			players: Object.freeze(c),
			goals: Object.freeze(f),
			contacts: Object.freeze(p),
			contactsComplete: s
		};
		return y(h) || (s = !1), Object.freeze({
			frame: Object.freeze({
				...h,
				contactsComplete: s
			}),
			captures: Object.freeze(m),
			capturesComplete: s,
			physicsRevision: this.revision,
			primaryBallOnlyScoring: d
		});
	}
}, nn = S, rn = (e) => [
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
function an(e) {
	let t = e.player;
	return {
		version: e.version,
		physicsMode: e.physicsMode,
		lateEntryBoundaryWidth: e.width,
		discs: e.discs.map(rn),
		player: [
			...rn(t),
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
function on(e) {
	return JSON.stringify(e, (e, t) => {
		if (typeof t == "number" && !Number.isFinite(t)) throw Error("Nonfinite xG domain configuration");
		return t;
	});
}
function sn(e, t) {
	if (!Number.isInteger(e.kickRate) || e.kickRate < 0 || e.kickRate > 6619135) throw Error("Invalid xG domain kick rate");
	let n = new Xt();
	n.configure(e, t);
	let r = n.getAnalysisGeometry(e);
	if (!r.length) throw Error("xG collection requires supported oriented goal geometry");
	return on({
		revision: "stadium-physics-v1",
		physics: an(e.stadium),
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
async function cn(e) {
	let t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e));
	return Array.from(new Uint8Array(t), (e) => e.toString(16).padStart(2, "0")).join("");
}
async function ln(e, t, n = null) {
	if (!t || !["pre-kick", "post-kick"].includes(t.featureStage) || !["all-kicks-v1", "goalward-release-v1"].includes(t.population) || !Number.isInteger(t.outcomeHorizonMs) || t.outcomeHorizonMs < 100 || t.outcomeHorizonMs > 6e4) throw Error("Invalid xG collection policy");
	let r = sn(e, n), i = {
		featureStage: t.featureStage,
		population: t.population,
		outcomeHorizonMs: t.outcomeHorizonMs
	}, [a, o] = await Promise.all([cn(r), cn(on({
		revision: nn,
		featuresRevision: de,
		hz: U,
		maximumGapTicks: 1,
		snapshot: "raw-before-after-impulse-before-integration-v1",
		featureGoal: "nearest-opposing-center-playable-side-inclusive-v1",
		populationRule: "all-supported-or-positive-post-impulse-dot-v1",
		outcomeRule: "unique-primary-crossing-awarded-team-before-next-kick-v1",
		horizonRounding: "ceil-to-ticks",
		...i
	}))]);
	if (r !== sn(e, n)) throw Error("xG domain changed during preparation");
	return Object.freeze({
		engineId: Jt,
		geometrySha256: a,
		policySha256: o,
		featuresRevision: de,
		shotDefinitionRevision: nn,
		...i
	});
}
function un(e) {
	let t = e.data;
	for (let n = 0; n < e.colors.length; n++) {
		let r = n >= e.stadium.discs.length, i = r ? e.stadium.player : e.stadium.discs[n], a = n * 18;
		if ([
			i.radius,
			i.invMass,
			i.damping,
			i.bCoef,
			...i.gravity
		].some((e, n) => e !== t[a + B.RADIUS + n])) throw Error("Replay initial physics differs from its stadium; no mixed-domain collection");
		let o = i.cGroup | (r ? [
			0,
			Me.red,
			Me.blue
		][t[a + B.TEAM]] : 0), s = r ? ~(Me.redKO | Me.blueKO) : -1;
		if (t[a + B.COLLISION_GROUP] !== o || (t[a + B.COLLISION_MASK] & s) !== (i.cMask & s)) throw Error("Replay initial collision rules differ from its stadium");
		if (n > 0 && t[a + B.COLLISION_GROUP] & Me.score) throw Error("Offline collection currently requires the primary ball to be the sole scoring disc");
	}
	if (!(t[B.COLLISION_GROUP] & Me.score)) throw Error("Offline collection requires a scoring primary ball");
}
function dn(e, t) {
	let n = e.stadium.goals, r = new Set(t.map((e) => n.findIndex((t) => t.team === e.defendingTeam && t.p0.every((t, n) => t === e.p0[n]) && t.p1.every((t, n) => t === e.p1[n]))));
	if (t.length !== n.length || r.size !== n.length || r.has(-1)) throw Error("Offline collection geometry must cover every physical goal exactly once");
}
var fn = Object.freeze([]), pn = (e, t) => e.length === t.length && e.every((e, n) => {
	let r = t[n];
	return e.id === r.id && e.defendingTeam === r.defendingTeam && e.p0.every((e, t) => e === r.p0[t]) && e.p1.every((e, t) => e === r.p1[t]) && e.pitchPoint.every((e, t) => e === r.pitchPoint[t]);
}), mn = class {
	trust;
	engine = null;
	stadium = null;
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
	constructor(e = {}) {
		if (!e || typeof e != "object" || Array.isArray(e) || e.trustedModels !== void 0 && (!Array.isArray(e.trustedModels) || e.trustedModels.length > 16)) throw TypeError("Invalid host-local xG trust list");
		let t = (e.trustedModels ?? []).flatMap((e) => {
			let t = R(e, e?.domain);
			return t.ok ? [t.model] : [];
		});
		this.trust = Object.freeze({ trustedModels: Object.freeze(t) });
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
		let i = z(t?.model, t?.model?.domain, this.trust);
		if (i.status !== "reviewed-model") {
			let e = i.estimate({});
			return this.setStatus("unavailable", e.reason);
		}
		let a = R(t.model, t.model.domain);
		if (!a.ok) return this.setStatus("unavailable", a.reason);
		let o = a.model, s = Object.freeze({ ...t.policy }), c;
		try {
			let t = new Xt();
			t.configure(e, n), c = t.getGeometry(e), dn(e, c);
		} catch {
			return this.setStatus("unavailable", "unsupported-geometry");
		}
		try {
			un(e);
		} catch {
			return this.invalidate("physics-edit"), this.status;
		}
		this.setStatus("preparing", "preparing");
		try {
			let t = await ln(e, s, c);
			if (r !== this.generation || this.closed) return this.status;
			if (e.stadium !== this.stadium) return this.setStatus("unavailable", "domain-change");
			un(e);
			let n = z(o, t, this.trust);
			if (n.status !== "reviewed-model") {
				let e = n.estimate({});
				return this.setStatus("unavailable", e.reason, t);
			}
			return this.estimator = n, this.goals = c, this.kickRate = e.kickRate, this.setStatus("ready", "ready", t, n.modelId);
		} catch {
			return r !== this.generation || this.closed ? this.status : this.setStatus("unavailable", "domain-change");
		}
	}
	baseline(e, t) {
		if (!(!this.estimator || this.edited || this.closed || this.status.state !== "ready" && this.status.reason !== "capture-discontinuity") && this.matches(e, t)) try {
			let n = new tn(), r = n.baseline(e, t);
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
		if (!this.active || !this.estimator || !this.adapter || !this.matches(e, t) || this.tick === e.tick && this.epoch === t.epoch && this.streamId === t.streamId) return fn;
		if (this.tick + 1 !== e.tick || this.epoch !== t.epoch || this.streamId !== t.streamId) return e.setKickSnapshotsEnabled(!1), this.adapter = null, this.setStatus("invalidated", "capture-discontinuity", this.status.domain, this.status.modelId), fn;
		let n = this.wasPlaying;
		this.cursor(e, t);
		let r = this.adapter.captureKicks(e, t);
		if (!n || !r || !r.capturesComplete || !r.primaryBallOnlyScoring || !M(r.captures, r.frame)) return fn;
		let i = this.status.domain;
		if (!i) return fn;
		let a = [];
		for (let e of r.captures) {
			let n = ue(e, r.frame, i);
			n && a.push(Object.freeze({
				eventId: `${e.id}:estimate`,
				streamId: t.streamId,
				epoch: t.epoch,
				tick: e.tick,
				order: e.order,
				player: n.player,
				goalId: n.goalId,
				features: n.features,
				estimate: this.estimator.estimate(n.features),
				domain: i,
				trustScope: "host-configuration"
			}));
		}
		return a.length ? Object.freeze(a) : fn;
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
				un(e), this.edited = !1;
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
		return this.engine !== e || this.stadium !== e.stadium || this.kickRate !== e.kickRate || !pn(this.goals, t.goals) ? (this.invalidate("domain-change"), !1) : !0;
	}
	cursor(e, t) {
		this.tick = e.tick, this.epoch = t.epoch, this.streamId = t.streamId, this.wasPlaying = e.phase === "playing" && !e.paused && e.resumeTicks === 0;
	}
	disable() {
		this.engine?.setKickSnapshotsEnabled(!1), this.estimator = null, this.adapter = null, this.tick = -1, this.wasPlaying = !1;
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
}, W = Uint8Array, hn = Uint16Array, gn = Int32Array, _n = new W([
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
]), vn = new W([
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
]), yn = new W([
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
]), bn = function(e, t) {
	for (var n = new hn(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new gn(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, xn = bn(_n, 2), Sn = xn.b, Cn = xn.r;
Sn[28] = 258, Cn[258] = 28;
for (var wn = bn(vn, 0), Tn = wn.b, En = wn.r, Dn = new hn(32768), G = 0; G < 32768; ++G) {
	var On = (G & 43690) >> 1 | (G & 21845) << 1;
	On = (On & 52428) >> 2 | (On & 13107) << 2, On = (On & 61680) >> 4 | (On & 3855) << 4, Dn[G] = ((On & 65280) >> 8 | (On & 255) << 8) >> 1;
}
for (var kn = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new hn(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new hn(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new hn(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[Dn[d] >> c] = l;
	} else for (s = new hn(r), i = 0; i < r; ++i) e[i] && (s[i] = Dn[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), An = new W(288), G = 0; G < 144; ++G) An[G] = 8;
for (var G = 144; G < 256; ++G) An[G] = 9;
for (var G = 256; G < 280; ++G) An[G] = 7;
for (var G = 280; G < 288; ++G) An[G] = 8;
for (var jn = new W(32), G = 0; G < 32; ++G) jn[G] = 5;
var Mn = /*#__PURE__*/ kn(An, 9, 0), Nn = /*#__PURE__*/ kn(An, 9, 1), Pn = /*#__PURE__*/ kn(jn, 5, 0), Fn = /*#__PURE__*/ kn(jn, 5, 1), In = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, Ln = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, Rn = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, zn = function(e) {
	return (e + 7) / 8 | 0;
}, Bn = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new W(e.subarray(t, n));
}, Vn = [
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
], Hn = function(e, t, n) {
	var r = Error(t || Vn[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, Hn), !n) throw r;
	return r;
}, Un = function(e, t, n, r) {
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
			u = Ln(e, d, 1);
			var v = Ln(e, d + 1, 3);
			if (d += 3, !v) {
				var y = zn(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && Hn(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = Nn, m = Fn, h = 9, g = 5;
			else if (v == 2) {
				var ee = Ln(e, d, 31) + 257, te = Ln(e, d + 10, 15) + 4, S = ee + Ln(e, d + 5, 31) + 1;
				d += 14;
				for (var C = new W(S), w = new W(19), T = 0; T < te; ++T) w[yn[T]] = Ln(e, d + T * 3, 7);
				d += te * 3;
				for (var E = In(w), ne = (1 << E) - 1, re = kn(w, E, 1), T = 0; T < S;) {
					var ie = re[Ln(e, d, ne)];
					d += ie & 15;
					var y = ie >> 4;
					if (y < 16) C[T++] = y;
					else {
						var D = 0, O = 0;
						for (y == 16 ? (O = 3 + Ln(e, d, 3), d += 2, D = C[T - 1]) : y == 17 ? (O = 3 + Ln(e, d, 7), d += 3) : y == 18 && (O = 11 + Ln(e, d, 127), d += 7); O--;) C[T++] = D;
					}
				}
				var ae = C.subarray(0, ee), oe = C.subarray(ee);
				h = In(ae), g = In(oe), p = kn(ae, h, 1), m = kn(oe, g, 1);
			} else Hn(1);
			if (d > _) {
				c && Hn(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var se = (1 << h) - 1, ce = (1 << g) - 1, k = d;; k = d) {
			var D = p[Rn(e, d) & se], A = D >> 4;
			if (d += D & 15, d > _) {
				c && Hn(0);
				break;
			}
			if (D || Hn(2), A < 256) n[f++] = A;
			else if (A == 256) {
				k = d, p = null;
				break;
			} else {
				var le = A - 254;
				if (A > 264) {
					var T = A - 257, j = _n[T];
					le = Ln(e, d, (1 << j) - 1) + Sn[T], d += j;
				}
				var M = m[Rn(e, d) & ce], ue = M >> 4;
				M || Hn(3), d += M & 15;
				var oe = Tn[ue];
				if (ue > 3) {
					var j = vn[ue];
					oe += Rn(e, d) & (1 << j) - 1, d += j;
				}
				if (d > _) {
					c && Hn(0);
					break;
				}
				s && l(f + 131072);
				var de = f + le;
				if (f < oe) {
					var N = a - oe, P = Math.min(oe, de);
					for (N + f < 0 && Hn(3); f < P; ++f) n[f] = r[N + f];
				}
				for (; f < de; ++f) n[f] = n[f - oe];
			}
		}
		t.l = p, t.p = k, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? Bn(n, 0, f) : n.subarray(0, f);
}, Wn = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, Gn = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, Kn = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: $n,
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
	var p = new hn(f + 1), m = qn(n[u - 1], p, 0);
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
}, qn = function(e, t, n) {
	return e.s == -1 ? Math.max(qn(e.l, t, n + 1), qn(e.r, t, n + 1)) : t[e.s] = n;
}, Jn = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new hn(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, Yn = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, Xn = function(e, t, n) {
	var r = n.length, i = zn(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, Zn = function(e, t, n, r, i, a, o, s, c, l, u) {
	Wn(t, u++, n), ++i[256];
	for (var d = Kn(i, 15), f = d.t, p = d.l, m = Kn(a, 15), h = m.t, g = m.l, _ = Jn(f), v = _.c, y = _.n, b = Jn(h), x = b.c, ee = b.n, te = new hn(19), S = 0; S < v.length; ++S) ++te[v[S] & 31];
	for (var S = 0; S < x.length; ++S) ++te[x[S] & 31];
	for (var C = Kn(te, 7), w = C.t, T = C.l, E = 19; E > 4 && !w[yn[E - 1]]; --E);
	var ne = l + 5 << 3, re = Yn(i, An) + Yn(a, jn) + o, ie = Yn(i, f) + Yn(a, h) + o + 14 + 3 * E + Yn(te, w) + 2 * te[16] + 3 * te[17] + 7 * te[18];
	if (c >= 0 && ne <= re && ne <= ie) return Xn(t, u, e.subarray(c, c + l));
	var D, O, ae, oe;
	if (Wn(t, u, 1 + (ie < re)), u += 2, ie < re) {
		D = kn(f, p, 0), O = f, ae = kn(h, g, 0), oe = h;
		var se = kn(w, T, 0);
		Wn(t, u, y - 257), Wn(t, u + 5, ee - 1), Wn(t, u + 10, E - 4), u += 14;
		for (var S = 0; S < E; ++S) Wn(t, u + 3 * S, w[yn[S]]);
		u += 3 * E;
		for (var ce = [v, x], k = 0; k < 2; ++k) for (var A = ce[k], S = 0; S < A.length; ++S) {
			var le = A[S] & 31;
			Wn(t, u, se[le]), u += w[le], le > 15 && (Wn(t, u, A[S] >> 5 & 127), u += A[S] >> 12);
		}
	} else D = Mn, O = An, ae = Pn, oe = jn;
	for (var S = 0; S < s; ++S) {
		var j = r[S];
		if (j > 255) {
			var le = j >> 18 & 31;
			Gn(t, u, D[le + 257]), u += O[le + 257], le > 7 && (Wn(t, u, j >> 23 & 31), u += _n[le]);
			var M = j & 31;
			Gn(t, u, ae[M]), u += oe[M], M > 3 && (Gn(t, u, j >> 5 & 8191), u += vn[M]);
		} else Gn(t, u, D[j]), u += O[j];
	}
	return Gn(t, u, D[256]), u + O[256];
}, Qn = /*#__PURE__*/ new gn([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), $n = /*#__PURE__*/ new W(0), er = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new W(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = Qn[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new hn(32768), g = a.h || new hn(m + 1), _ = Math.ceil(n / 3), v = 2 * _, y = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
		}, b = new gn(25e3), x = new hn(288), ee = new hn(32), te = 0, S = 0, C = a.i || 0, w = 0, T = a.w || 0, E = 0; C + 2 < o; ++C) {
			var ne = y(C), re = C & 32767, ie = g[ne];
			if (h[re] = ie, g[ne] = re, T <= C) {
				var D = o - C;
				if ((te > 7e3 || w > 24576) && (D > 423 || !l)) {
					u = Zn(e, c, 0, b, x, ee, S, w, E, C - E, u), w = te = S = 0, E = C;
					for (var O = 0; O < 286; ++O) x[O] = 0;
					for (var O = 0; O < 30; ++O) ee[O] = 0;
				}
				var ae = 2, oe = 0, se = p, ce = re - ie & 32767;
				if (D > 2 && ne == y(C - ce)) for (var k = Math.min(f, D) - 1, A = Math.min(32767, C), le = Math.min(258, D); ce <= A && --se && re != ie;) {
					if (e[C + ae] == e[C + ae - ce]) {
						for (var j = 0; j < le && e[C + j] == e[C + j - ce]; ++j);
						if (j > ae) {
							if (ae = j, oe = ce, j > k) break;
							for (var M = Math.min(ce, j - 2), ue = 0, O = 0; O < M; ++O) {
								var de = C - ce + O & 32767, N = de - h[de] & 32767;
								N > ue && (ue = N, ie = de);
							}
						}
					}
					re = ie, ie = h[re], ce += re - ie & 32767;
				}
				if (oe) {
					b[w++] = 268435456 | Cn[ae] << 18 | En[oe];
					var P = Cn[ae] & 31, fe = En[oe] & 31;
					S += _n[P] + vn[fe], ++x[257 + P], ++ee[fe], T = C + ae, ++te;
				} else b[w++] = e[C], ++x[e[C]];
			}
		}
		for (C = Math.max(C, T); C < o; ++C) b[w++] = e[C], ++x[e[C]];
		u = Zn(e, c, l, b, x, ee, S, w, E, C - E, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = C, a.w = T);
	} else {
		for (var C = a.w || 0; C < o + l; C += 65535) {
			var pe = C + 65535;
			pe >= o && (c[u / 8 | 0] = l, pe = o), u = Xn(c, u + 1, e.subarray(C, pe));
		}
		a.i = o;
	}
	return Bn(s, 0, r + zn(u) + i);
}, tr = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new W(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return er(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
};
function nr(e, t) {
	return tr(e, t || {}, 0, 0);
}
var rr = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new W(32768), this.p = new W(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || Hn(5), this.d && Hn(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new W(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = Un(this.p, this.s, this.o);
		this.ondata(Bn(n, t, this.s.b), this.d), this.o = Bn(n, this.s.b - 32768), this.s.b = this.o.length, this.p = Bn(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}(), ir = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	ir.decode($n, { stream: !0 });
} catch {}
var ar = 33554432;
function or(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n, 16777619);
	return t >>> 0;
}
function sr(e) {
	if (e.length > 33554432) throw Error("Replay exceeds 32 MB");
	let t = nr(e, { level: 6 }), n = new Uint8Array(16 + t.length), r = new DataView(n.buffer);
	return n.set([
		66,
		50,
		68,
		90,
		1,
		0,
		0,
		0
	]), r.setUint32(8, e.length, !0), r.setUint32(12, or(e), !0), n.set(t, 16), n;
}
function cr(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t.length > 33554432) throw Error("Replay exceeds 32 MB");
	if (t.length < 17 || t[0] !== 66 || t[1] !== 50 || t[2] !== 68 || t[3] !== 90 || t[4] !== 1 || t[5] || t[6] || t[7]) throw Error("Invalid compressed replay header");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = n.getUint32(8, !0);
	if (!r || r > 33554432) throw Error("Invalid expanded replay size");
	let i = new Uint8Array(r), a = 0, o = !1, s = new rr((e, t) => {
		if (a + e.length > r) throw Error("Expanded replay exceeds declared size");
		i.set(e, a), a += e.length, o = t;
	});
	for (let e = 16; e < t.length; e += 1024) s.push(t.subarray(e, e + 1024), e + 1024 >= t.length);
	if (!o || a !== r || or(i) !== n.getUint32(12, !0)) throw Error("Compressed replay integrity failure");
	return i;
}
var lr = "/api/v1", ur = {
	rooms: `${lr}/rooms`,
	sdkRooms: `${lr}/sdk/rooms`,
	account: `${lr}/account`,
	accountConfig: `${lr}/account/config`,
	profile: `${lr}/account/profile`,
	profileVisibility: `${lr}/account/profile/visibility`,
	publicProfile: (e, t) => `${lr}/community/${e}/${encodeURIComponent(t)}`,
	notifications: `${lr}/account/notifications`,
	keys: `${lr}/account/keys`,
	signal: (e) => `${lr}/rooms/${encodeURIComponent(e)}/signal`,
	liveness: (e) => `${lr}/rooms/${encodeURIComponent(e)}/liveness`,
	lease: (e) => `${lr}/sdk/rooms/${encodeURIComponent(e)}/lease`
};
function dr(e) {
	let t = new URL(e);
	if (!["http:", "https:"].includes(t.protocol) || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected an HTTP(S) service origin without credentials or a path");
	return t.origin;
}
function fr(e) {
	let t = new URL(e.assets);
	if (![
		"http:",
		"https:",
		"ball2d:"
	].includes(t.protocol) || !t.host || t.username || t.password || t.pathname !== "/" || t.search || t.hash) throw Error("Expected a root asset origin");
	let n = dr(e.service), r = dr(e.public);
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
			if (!t.pathname.startsWith(`${lr}/`) || t.hash) throw Error("Expected a versioned application API path");
			return t;
		}
	};
}
function pr() {
	let e = location.origin;
	return fr({
		assets: e,
		service: e,
		public: e
	});
}
function mr(e, t) {
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
function hr(e, t, n) {
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
		createDataChannel: (n, r) => mr(e.createDataChannel(n, r), t),
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
	return e.onicecandidate = ({ candidate: e }) => r.onicecandidate?.({ candidate: e ?? null }), e.ondatachannel = ({ channel: e }) => r.ondatachannel?.({ channel: mr(e, t) }), e.onconnectionstatechange = () => r.onconnectionstatechange?.(), e.oniceconnectionstatechange = () => r.oniceconnectionstatechange?.(), r;
}
var gr = null, _r = null;
function vr(e) {
	if (Object.keys(e).length !== 2 || e.bundlePolicy !== "max-bundle") return !1;
	let t = e.iceServers;
	if (t?.length !== 1) return !1;
	let n = t[0];
	return Object.keys(n).length === 1 && n.urls === "stun:stun.l.google.com:19302";
}
function yr() {
	_r?.removeEventListener("pagehide", br), _r = null;
}
function br() {
	let e = gr;
	gr = null, yr(), e?.close();
}
var xr = {
	prepare(e) {
		e.binaryType = "arraybuffer";
	},
	encode: (e) => e,
	decode: (e) => e
};
function Sr(e) {
	let t;
	return gr && vr(e) ? (t = gr, gr = null, yr(), t.signalingState === "closed" && (t = new RTCPeerConnection(e))) : t = new RTCPeerConnection(e), hr(t, xr, () => t.close());
}
function Cr(e = pr()) {
	return {
		serviceOrigin: e.serviceOrigin,
		createWebSocket: (e, t) => new WebSocket(e, t),
		createPeerConnection: Sr
	};
}
var wr = [
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
function Tr(e) {
	let t = /* @__PURE__ */ new Map();
	return async (n) => {
		let r = wr.find(([e, t]) => e === n || t === n);
		if (!r) throw Error("Unknown default stadium");
		let i = t.get(r[0]);
		return i || (i = (async () => {
			let t = await e(`/stadiums/${r[0]}.ball2dstadium`);
			if (!t.ok) throw Error("Could not load stadium");
			let n = await t.text();
			return mt(n), n;
		})(), t.set(r[0], i), i.catch(() => t.delete(r[0]))), i;
	};
}
async function Er(e) {
	let t = new Uint8Array(await crypto.subtle.digest("SHA-256", e));
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
function Dr(e = pr()) {
	let t = Cr(e), n = (e, t) => fetch(e, t);
	return {
		network: t,
		publicOrigin: e.publicOrigin,
		request: n,
		loadEngine: async (t) => {
			let r = async (t) => {
				let r = await n(e.asset(`/core.wasm?v=${xe}`), t);
				if (!r.ok) throw Error("Could not load bundled physics engine");
				return r.arrayBuffer();
			}, i = await r({ signal: t });
			return await Er(i) !== "23989127182d21b3dc42055febe7b8d25cc3e9bcf7b5b738de652a48f6735871" && (i = await r({
				signal: t,
				cache: "reload"
			})), qt.create(i, t);
		},
		loadStadium: Tr((t) => n(e.asset(t)))
	};
}
function Or(e, t) {
	let n = e.engine.stadium.discs.length;
	return t < n ? t : e.engine.index(e.players.fielded()[t - n].slot);
}
function kr(e, t) {
	let n = e.engine.data, r = t * 18;
	return {
		x: n[r],
		y: n[r + B.Y],
		xspeed: n[r + B.SPEED_X],
		yspeed: n[r + B.SPEED_Y],
		radius: n[r + B.RADIUS],
		invMass: n[r + B.INVERSE_MASS],
		damping: n[r + B.DAMPING],
		bCoeff: n[r + B.BOUNCE],
		xgravity: n[r + B.GRAVITY_X],
		ygravity: n[r + B.GRAVITY_Y],
		cGroup: n[r + B.COLLISION_GROUP],
		cMask: n[r + B.COLLISION_MASK],
		color: e.engine.colors[t]
	};
}
function Ar(e, t, n) {
	let r = Ee(n), i = kr(e, t);
	Object.entries(r).every(([e, t]) => i[e] === t) || (e.match.command("disc", t, 0, r), t === 0 && e.commentaryAnalysis.reset(), Object.keys(r).some((e) => e !== "color") && (e.intelligence.invalidate(), e.xg.invalidate("physics-edit")), e.broadcastState());
}
function jr(e) {
	return e.closed || e.engine.phase === "lobby" ? 0 : e.engine.stadium.discs.length + e.players.fielded().length;
}
var Mr = (e, t) => Number.isInteger(t) && t >= 0 && t < jr(e);
function Nr(e, t) {
	return Mr(e, t) ? kr(e, Or(e, t)) : null;
}
function Pr(e, t, n) {
	e.assertOpen(), Mr(e, t) && Ar(e, Or(e, t), n);
}
var Fr = (e, t) => {
	let n = e.players.byId(t);
	return n && n.team !== 0 ? n : void 0;
};
function Ir(e, t) {
	if (e.closed || e.engine.phase === "lobby") return null;
	let n = Fr(e, t);
	return n ? kr(e, e.engine.index(n.slot)) : null;
}
function Lr(e, t, n) {
	if (e.assertOpen(), e.engine.phase === "lobby") return;
	let r = Fr(e, t);
	r && Ar(e, e.engine.index(r.slot), n);
}
function Rr(e) {
	return e.closed || e.engine.phase === "lobby" ? null : {
		x: e.engine.data[0],
		y: e.engine.data[1]
	};
}
function zr(e, t) {
	e.assertOpen();
	let n = e.engine.phase;
	if (n !== "lobby" && n !== "finished") return;
	let r = e.command("start"), i = n !== e.engine.phase && e.engine.phase === "playing";
	e.stadiumSelection++, r.length || e.broadcastState(), e.notifyCommentary(r), i && e.invoke("onGameStart", e.hooks.onGameStart, e.publicOrNull(t));
}
function Br(e, t) {
	e.assertOpen();
	let n = e.engine.phase !== "lobby";
	if (!n && !e.engine.paused) return;
	let r = e.command("stop");
	r.length || e.broadcastState(), e.notifyCommentary(r), n && e.invoke("onGameStop", e.hooks.onGameStop, e.publicOrNull(t));
}
function Vr(e, t, n) {
	if (e.assertOpen(), e.engine.phase === "lobby" || (t = !!t, e.engine.paused === t)) return;
	let r = e.command("pause", 0, +t);
	r.length || e.broadcastState(), e.notifyCommentary(r), t ? e.invoke("onGamePause", e.hooks.onGamePause, n) : e.invoke("onGameUnpause", e.hooks.onGameUnpause, n), e.invoke("onGamePauseChange", e.hooks.onGamePauseChange, t);
}
function Hr(e, t, n, r, i) {
	e.assertOpen();
	let a = De(t, n, r);
	a !== e.engine.kickRate && (e.command("kickRate", 0, a), e.broadcastState(), e.invoke("onKickRateLimitSet", e.hooks.onKickRateLimitSet, ...Oe(a), i));
}
function Ur(e, t) {
	if (e.assertOpen(), e.stopped()) {
		if (!Number.isInteger(t) || t < 0 || t > 99) throw Error("Invalid limit");
		t !== e.engine.scoreLimit && (e.command("scoreLimit", 0, t), e.syncLobby());
	}
}
function Wr(e, t) {
	if (e.assertOpen(), e.stopped()) {
		if (!Number.isInteger(t) || t < 0 || t > 99) throw Error("Invalid time limit");
		t * 60 !== e.engine.timeLimit && (e.command("timeLimit", 0, t * 60), e.syncLobby());
	}
}
function Gr(e) {
	let t = e.engine;
	return e.closed || t.phase === "lobby" ? null : {
		red: t.red,
		blue: t.blue,
		time: t.elapsed / U,
		scoreLimit: t.scoreLimit,
		timeLimit: t.timeLimit
	};
}
var Kr = [
	"normal",
	"bold",
	"italic",
	"small",
	"small-bold",
	"small-italic"
];
function qr(e, t, n, r) {
	if (typeof e != "string" || e.length > 1e3) throw Error("Announcement exceeds 1000 characters");
	if (t != null && (!Number.isInteger(t) || t < 0 || t > 16777215)) throw Error("Invalid announcement color");
	if (n != null && !Kr.includes(n)) throw Error("Invalid announcement style");
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
function Jr(e) {
	return e == null || Number.isSafeInteger(e) && e >= 0;
}
function Yr(e, t, n) {
	if (n == null) {
		e.network.broadcast(t);
		return;
	}
	let r = e.players.byId(n), i = r && e.network.peers.get(r.peerId);
	i && e.network.control(i, t);
}
function Xr(e, t, n) {
	if (e.assertOpen(), typeof t != "string" || t.length > 200) throw Error("Chat must contain at most 200 characters");
	if (!Jr(n)) throw Error("Invalid chat target");
	let r = e.players.byPeer(e.network.hostId);
	if (!r) throw Error("sendChat requires a host player; use sendAnnouncement");
	t.trim() && Yr(e, {
		type: "chat",
		name: r.name,
		text: t,
		...n == null ? { playerId: r.peerId } : {}
	}, n);
}
function Zr(e, t, n, r, i, a) {
	e.assertOpen();
	let o = qr(t, r, i, a);
	if (!Jr(n)) throw Error("Invalid announcement target");
	Yr(e, o, n);
}
var Qr = 524288, $r = 16384, ei = 12, ti = 45635, ni = 1, ri = 32, ii = 1e4, ai = {
	MAGIC: 0,
	VERSION: 2,
	RESERVED: 3,
	ID: 4,
	INDEX: 8,
	COUNT: 10
};
function oi(e, t) {
	let n = JSON.stringify(e);
	if (n === void 0) throw Error("Missing control message");
	let r = new TextEncoder().encode(n);
	if (r.length > Qr) throw Error("Control message exceeds 512 KB");
	if (r.length <= $r) return [n];
	let i = Math.ceil(r.length / $r), a = [];
	for (let e = 0; e < i; e++) {
		let n = r.subarray(e * $r, (e + 1) * $r), o = new ArrayBuffer(ei + n.length), s = new DataView(o);
		s.setUint16(ai.MAGIC, ti), s.setUint8(ai.VERSION, ni), s.setUint32(ai.ID, t, !0), s.setUint16(ai.INDEX, e, !0), s.setUint16(ai.COUNT, i, !0), new Uint8Array(o, ei).set(n), a.push(o);
	}
	return a;
}
var si = class {
	partial;
	push(e, t = performance.now()) {
		if (typeof e == "string") {
			if (this.partial || new TextEncoder().encode(e).length > $r) throw Error("Invalid control message");
			return JSON.parse(e);
		}
		if (e.byteLength < 13 || e.byteLength > 16396) throw Error("Control fragment length");
		let n = new DataView(e);
		if (n.getUint16(ai.MAGIC) !== ti || n.getUint8(ai.VERSION) !== ni || n.getUint8(ai.RESERVED) !== 0) throw Error("Control fragment version");
		let r = n.getUint32(ai.ID, !0), i = n.getUint16(ai.INDEX, !0), a = n.getUint16(ai.COUNT, !0);
		if (a < 2 || a > ri || i >= a) throw Error("Control fragment bounds");
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
		if (o.id !== r || o.count !== a || o.next !== i || t - o.since > ii) throw Error("Control fragment sequence");
		if (o.next++, o.bytes += e.byteLength - ei, o.bytes > Qr) throw Error("Control size limit");
		if (o.parts.push(new Uint8Array(e.slice(ei))), o.next !== a) return;
		let s = new Uint8Array(o.bytes), c = 0;
		for (let e of o.parts) s.set(e, c), c += e.length;
		return this.partial = void 0, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(s));
	}
}, ci = {
	INPUT: 1,
	STATE: 2
}, li = {
	KIND: 0,
	PROTOCOL: 1,
	SEQUENCE: 2,
	EPOCH: 6,
	KEYS: 8
}, ui = {
	KIND: 0,
	PROTOCOL: 1,
	TICK: 2,
	INDEX: 6,
	COUNT: 7,
	EPOCH: 8,
	SIZE: 10
}, di = 1188, K = {
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
}, fi = [
	"lobby",
	"playing",
	"goal",
	"finished"
], pi = {
	INDEX: 0,
	TEAM: 2,
	PACKED_INPUT: 3,
	MOTION: 4,
	KICK_STATE: 36,
	KICK_BUDGET: 38
}, mi = 31;
function hi(e, t) {
	if (e.byteLength !== 12) throw Error("Input length");
	let n = new Uint8Array(e);
	if (n[li.KIND] !== ci.INPUT || n[li.PROTOCOL] !== 3) throw Error("Input format");
	for (let e = 0; e < 4; e++) {
		let r = n[li.KEYS + e];
		if (r > mi) throw Error("Input format");
		t.history[e] = r;
	}
	return t.seq = (n[li.SEQUENCE] | n[li.SEQUENCE + 1] << 8 | n[li.SEQUENCE + 2] << 16 | n[li.SEQUENCE + 3] << 24) >>> 0, t.epoch = n[li.EPOCH] | n[li.EPOCH + 1] << 8, t.keys = t.history[0], t;
}
function gi(e, t) {
	return e !== t && e - t >>> 0 < 2147483648;
}
function _i(e) {
	let t = [];
	for (let n = 0; n < e.length / 18; n++) {
		let r = n * 18, i = e[r + B.INVERSE_MASS] > 0 || e[r + B.SPEED_X] !== 0 || e[r + B.SPEED_Y] !== 0 || e[r + B.GRAVITY_X] !== 0 || e[r + B.GRAVITY_Y] !== 0 || e[r + B.X] !== e[r + B.SPAWN_X] || e[r + B.Y] !== e[r + B.SPAWN_Y];
		(e[r + B.PLAYER_SLOT] > 0 ? e[r + B.TEAM] > 0 : i) && t.push(n);
	}
	return t;
}
function vi(e, t, n, r) {
	e.setUint32(K.TICK, t.tick, !0), e.setUint32(K.ELAPSED, t.elapsed, !0), e.setUint16(K.RED, t.red, !0), e.setUint16(K.BLUE, t.blue, !0), e.setUint8(K.PHASE, fi.indexOf(t.phase)), e.setUint8(K.PAUSED, +t.paused), e.setUint8(K.KICKOFF, t.kickoff), e.setUint8(K.KICKOFF_ACTIVE, +t.kickoffActive), e.setUint16(K.COUNTDOWN, t.countdown, !0), e.setUint16(K.SCORE_LIMIT, t.scoreLimit, !0), e.setUint16(K.TIME_LIMIT, t.timeLimit, !0), e.setUint16(K.DISC_COUNT, t.discs.length / 18, !0), e.setUint32(K.ACKNOWLEDGED, n, !0), e.setUint16(K.BODY_COUNT, r, !0), e.setUint16(K.RESUME_TICKS, t.resumeTicks, !0), e.setUint32(K.KICK_RATE, t.kickRate, !0), e.setUint8(K.LAST_TOUCH, t.lastTouch?.slot ?? 255), e.setUint8(K.LAST_TOUCH + 1, t.lastTouch?.team ?? 0), e.setUint8(K.GOAL_TOUCH, t.goalTouch?.slot ?? 255), e.setUint8(K.GOAL_TOUCH + 1, t.goalTouch?.team ?? 0);
}
function yi(e, t, n, r) {
	let i = r * 18, a = n[i + B.PLAYER_SLOT] > 0;
	e.setUint16(t + pi.INDEX, r, !0), e.setUint8(t + pi.TEAM, n[i + B.TEAM]), e.setUint8(t + pi.PACKED_INPUT, n[i + B.INPUT] | (a ? (n[i + B.COLLISION_MASK] & 24) << 2 : 0));
	for (let r = 0; r < 4; r++) e.setFloat64(t + pi.MOTION + r * 8, n[i + r], !0);
	e.setUint16(t + pi.KICK_STATE, n[i + B.KICK_STATE], !0), a && e.setUint16(t + pi.KICK_BUDGET, n[i + B.KICK_BUDGET] + 255, !0);
}
function bi(e, t, n = 0) {
	let r = _i(e.discs), i = /* @__PURE__ */ new ArrayBuffer(40 + r.length * 40), a = new DataView(i);
	vi(a, e, t, r.length);
	for (let [t, n] of r.entries()) yi(a, 40 + t * 40, e.discs, n);
	let o = new Uint8Array(i), s = [], c = Math.ceil(o.length / di);
	for (let t = 0; t < c; t++) {
		let r = o.subarray(t * di, (t + 1) * di), i = new ArrayBuffer(12 + r.length), a = new DataView(i);
		a.setUint8(ui.KIND, ci.STATE), a.setUint8(ui.PROTOCOL, 3), a.setUint32(ui.TICK, e.tick, !0), a.setUint8(ui.INDEX, t), a.setUint8(ui.COUNT, c), a.setUint16(ui.EPOCH, n, !0), a.setUint16(ui.SIZE, r.length, !0), new Uint8Array(i, 12).set(r), s.push(i);
	}
	return s;
}
function xi(e, t, n = 0) {
	if (!t.length) return [];
	let r = bi(e, t[0], n), i = [r];
	for (let e = 1; e < t.length; e++) {
		let n = r.map((e) => e.slice(0));
		new DataView(n[0]).setUint32(12 + K.ACKNOWLEDGED, t[e], !0), i.push(n);
	}
	return i;
}
function Si(e) {
	let t = [...e], n = new Set(t.filter((e) => e.type === "transport" && e.selectedCandidatePairId).map((e) => e.selectedCandidatePairId)), r = t.filter((e) => e.type === "candidate-pair" && e.state === "succeeded"), i = n.size ? r.filter((e) => n.has(e.id)) : r.filter((e) => e.nominated === !0);
	if (i.length !== 1) return null;
	let a = i[0].currentRoundTripTime;
	return typeof a == "number" && Number.isFinite(a) && a >= 0 ? a * 1e3 : null;
}
var Ci = (e) => e?.match(/(?:^|\r?\n)a=ice-ufrag:([^\s]+)/)?.[1], wi = (e) => e.usernameFragment ?? e.candidate?.match(/(?:^| )ufrag ([^ ]+)/)?.[1];
function Ti(e) {
	let t = e.pc.localDescription;
	if (!t?.sdp) throw Error("Local peer description is unavailable");
	return t.sdp;
}
function Ei(e, t, n) {
	if (n()) {
		if (e.candidates.length >= 128) throw Error("Too many pending ICE candidates");
		e.candidates.push(t);
	}
}
async function Di(e, t) {
	let n = e.candidates.splice(0);
	for (let r of n) {
		if (!t.current()) return;
		if (!t.versioned || e.remoteIceUfrag && wi(r) === e.remoteIceUfrag) try {
			await e.pc.addIceCandidate(r);
		} catch {}
	}
}
async function Oi(e, t, n) {
	let r = await e.pc.createOffer(n);
	return !t.current() || (e.localIceUfrag = Ci(r.sdp), await e.pc.setLocalDescription(r), !t.current()) ? !1 : (t.publish({
		type: "offer",
		sdp: Ti(e)
	}), !0);
}
async function ki(e, t, n) {
	if (await e.pc.setRemoteDescription({
		type: "offer",
		sdp: t
	}), !n.current() || (await Di(e, n), !n.current())) return;
	let r = await e.pc.createAnswer();
	n.current() && (e.localIceUfrag = Ci(r.sdp), await e.pc.setLocalDescription(r), n.current() && n.publish({
		type: "answer",
		sdp: Ti(e)
	}));
}
async function Ai(e, t, n) {
	return await e.pc.setRemoteDescription({
		type: "answer",
		sdp: t
	}), n.current() ? (await Di(e, n), !0) : !1;
}
async function ji(e, t, n) {
	if (!(n.versioned && (!wi(t) || e.remoteIceUfrag && wi(t) !== e.remoteIceUfrag))) {
		if (!e.pc.remoteDescription) Ei(e, t, n.current);
		else try {
			await e.pc.addIceCandidate(t);
		} catch {
			Ei(e, t, n.current);
		}
	}
}
var Mi = class {
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
		this.assembler ??= new si();
		let r = this.assembler.push(e);
		if (r !== void 0 && n && t && (!r || typeof r != "object" || !("type" in r) || r.type !== "action" || !("action" in r) || r.action !== "customStadium")) throw Error("Invalid bulk action");
		return r;
	}
}, Ni = 1e4, Pi = 1200, Fi = (e) => e.connectionState === "connected" && ["connected", "completed"].includes(e.iceConnectionState), Ii = (e) => ["failed", "disconnected"].includes(e.connectionState) || ["failed", "disconnected"].includes(e.iceConnectionState);
function Li(e, t, n) {
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
	}, e.ondatachannel = (e) => Bi(r, e.channel, n);
	let i = () => {
		n.current(r) && (e.connectionState === "closed" ? (n.hooks.status("A peer disconnected.", "info"), n.remove(t)) : Fi(e) ? n.noteHealthy(r) : Ii(e) && (r.lostAt ??= performance.now(), n.hooks.status("Direct connection interrupted. Attempting recovery…", "info")));
	};
	return e.onconnectionstatechange = i, e.oniceconnectionstatechange = i, r;
}
function Ri(e, t) {
	return t.maxPacketLifeTime === null ? t.label === "control" ? t.ordered === !0 && t.maxRetransmits === null && !e.control : t.ordered === !1 && t.maxRetransmits === 0 && !e.fast : !1;
}
function zi(e) {
	return typeof e == "string" ? e.length : e instanceof ArrayBuffer ? e.byteLength : 0;
}
function Bi(e, t, n) {
	if (!n.current(e) || !["control", "realtime"].includes(t.label)) {
		t.close();
		return;
	}
	if (!Ri(e, t)) {
		t.close(), n.remove(e.id);
		return;
	}
	t.label === "control" ? (e.control = t, e.controlReader = new Mi({
		fromGuest: () => n.isHost(),
		canUploadStadium: () => n.hooks.allowStadiumUpload?.(e) ?? !1
	})) : e.fast = t, t.onclose = () => {
		n.current(e) && (n.hooks.status("A peer closed its game channel.", "info"), n.remove(e.id));
	}, t.onopen = () => {
		n.current(e) && (e.control?.readyState !== "open" || e.fast?.readyState !== "open" || e.connected || (e.connected = !0, n.isHost() && (e.admissionTimer = setTimeout(() => {
			n.current(e) && (n.hooks.status("A peer did not complete room admission.", "error"), n.remove(e.id));
		}, Ni)), n.hooks.open(e)));
	}, t.onmessage = (r) => {
		if (n.current(e)) {
			n.countReceived(zi(r.data));
			try {
				if (t.label === "control") {
					let t = e.controlReader?.read(r.data);
					t !== void 0 && n.hooks.control(e, t);
				} else if (r.data instanceof ArrayBuffer && r.data.byteLength <= Pi) n.hooks.fast(e, r.data);
				else throw Error("Invalid realtime packet");
			} catch {
				n.hooks.status("Invalid peer message rejected.", "error"), n.remove(e.id);
			}
		}
	};
}
var Vi = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/* @__NO_SIDE_EFFECTS__ */
function Hi(e) {
	return e ? {
		lang: e?.lang ?? void 0,
		message: e?.message,
		abortEarly: e?.abortEarly ?? void 0,
		abortPipeEarly: e?.abortPipeEarly ?? void 0
	} : Vi;
}
/* @__NO_SIDE_EFFECTS__ */
function Ui(e) {
	let t = typeof e;
	return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function q(e, t, n, r, i) {
	let a = i && "input" in i ? i.input : n.value, o = i?.expected ?? e.expects ?? null, s = i?.received ?? /* @__PURE__ */ Ui(a), c = {
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
function Wi(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
/* @__NO_SIDE_EFFECTS__ */
function Gi(e, t) {
	let n = [...new Set(e)];
	return n.length > 1 ? `(${n.join(` ${t} `)})` : n[0] ?? "never";
}
function J(e) {
	return e["~standard"] = {
		version: 1,
		vendor: "valibot",
		validate: (t) => e["~run"]({ value: t }, /* @__PURE__ */ Hi())
	}, e;
}
/* @__NO_SIDE_EFFECTS__ */
function Ki(e, t) {
	return {
		kind: "validation",
		type: "check",
		reference: Ki,
		async: !1,
		expects: null,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && q(this, "input", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function qi(e) {
	return {
		kind: "validation",
		type: "finite",
		reference: qi,
		async: !1,
		expects: null,
		requirement: Number.isFinite,
		message: e,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && q(this, "finite", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Ji(e) {
	return {
		kind: "validation",
		type: "integer",
		reference: Ji,
		async: !1,
		expects: null,
		requirement: Number.isInteger,
		message: e,
		"~run"(e, t) {
			return e.typed && !this.requirement(e.value) && q(this, "integer", e, t), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Yi(e, t) {
	return {
		kind: "validation",
		type: "max_length",
		reference: Yi,
		async: !1,
		expects: `<=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length > this.requirement && q(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Xi(e, t) {
	return {
		kind: "validation",
		type: "max_value",
		reference: Xi,
		async: !1,
		expects: `<=${e instanceof Date ? e.toJSON() : /* @__PURE__ */ Ui(e)}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !(e.value <= this.requirement) && q(this, "value", e, t, { received: e.value instanceof Date ? e.value.toJSON() : /* @__PURE__ */ Ui(e.value) }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Zi(e, t) {
	return {
		kind: "validation",
		type: "min_length",
		reference: Zi,
		async: !1,
		expects: `>=${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && e.value.length < this.requirement && q(this, "length", e, t, { received: `${e.value.length}` }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function Qi(e, t) {
	return {
		kind: "validation",
		type: "min_value",
		reference: Qi,
		async: !1,
		expects: `>=${e instanceof Date ? e.toJSON() : /* @__PURE__ */ Ui(e)}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !(e.value >= this.requirement) && q(this, "value", e, t, { received: e.value instanceof Date ? e.value.toJSON() : /* @__PURE__ */ Ui(e.value) }), e;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function $i(e) {
	return {
		kind: "transformation",
		type: "raw_transform",
		reference: $i,
		async: !1,
		"~run"(t, n) {
			let r = e({
				dataset: t,
				config: n,
				addIssue: (e) => q(this, e?.label ?? "input", t, n, e),
				NEVER: null
			});
			return t.issues ? t.typed = !1 : t.value = r, t;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function ea(e, t) {
	return {
		kind: "validation",
		type: "regex",
		reference: ea,
		async: !1,
		expects: `${e}`,
		requirement: e,
		message: t,
		"~run"(e, t) {
			return e.typed && !this.requirement.test(e.value) && q(this, "format", e, t), e;
		}
	};
}
var ta = { abortEarly: !0 };
/* @__NO_SIDE_EFFECTS__ */
function na(e, t, n) {
	return typeof e.fallback == "function" ? e.fallback(t, n) : e.fallback;
}
/* @__NO_SIDE_EFFECTS__ */
function ra(e, t, n) {
	return typeof e.default == "function" ? e.default(t, n) : e.default;
}
/* @__NO_SIDE_EFFECTS__ */
function ia(e, t) {
	return !e["~run"]({ value: t }, ta).issues;
}
/* @__NO_SIDE_EFFECTS__ */
function aa(e, t) {
	return J({
		kind: "schema",
		type: "array",
		reference: aa,
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
			} else q(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function oa(e) {
	return J({
		kind: "schema",
		type: "boolean",
		reference: oa,
		expects: "boolean",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "boolean" ? e.typed = !0 : q(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function sa(e, t) {
	return J({
		kind: "schema",
		type: "custom",
		reference: sa,
		expects: "unknown",
		async: !1,
		check: e,
		message: t,
		"~run"(e, t) {
			return this.check(e.value) ? e.typed = !0 : q(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Y(e, t) {
	return J({
		kind: "schema",
		type: "literal",
		reference: Y,
		expects: /* @__PURE__ */ Ui(e),
		async: !1,
		literal: e,
		message: t,
		"~run"(e, t) {
			return /* @__PURE__ */ Wi(e.value, this.literal) ? e.typed = !0 : q(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ca(e, t) {
	return J({
		kind: "schema",
		type: "nullable",
		reference: ca,
		expects: `(${e.expects} | null)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ ra(this, e, t)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function la(e) {
	return J({
		kind: "schema",
		type: "number",
		reference: la,
		expects: "number",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "number" && !isNaN(e.value) ? e.typed = !0 : q(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function X(e, t) {
	return J({
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
						let a = r in n ? n[r] : /* @__PURE__ */ ra(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ na(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (q(this, "key", e, t, {
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
			} else q(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Z(e, t) {
	return J({
		kind: "schema",
		type: "optional",
		reference: Z,
		expects: `(${e.expects} | undefined)`,
		async: !1,
		wrapped: e,
		default: t,
		"~run"(e, t) {
			return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ ra(this, e, t)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, t);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ua(e, t) {
	return J({
		kind: "schema",
		type: "picklist",
		reference: ua,
		expects: /* @__PURE__ */ Gi(e.map(Ui), "|"),
		async: !1,
		options: e,
		message: t,
		"~run"(e, t) {
			return this.options.includes(e.value) ? e.typed = !0 : q(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function da(e, t) {
	return J({
		kind: "schema",
		type: "strict_object",
		reference: da,
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
						let a = r in n ? n[r] : /* @__PURE__ */ ra(i), o = i["~run"]({ value: a }, t);
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
					} else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ na(i);
					else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (q(this, "key", e, t, {
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
						q(this, "key", e, t, {
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
			} else q(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Q(e) {
	return J({
		kind: "schema",
		type: "string",
		reference: Q,
		expects: "string",
		async: !1,
		message: e,
		"~run"(e, t) {
			return typeof e.value == "string" ? e.typed = !0 : q(this, "type", e, t), e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function fa(e, t) {
	return J({
		kind: "schema",
		type: "tuple",
		reference: fa,
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
			} else q(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function pa(e) {
	let t;
	if (e) for (let n of e) if (t) for (let e of n.issues) t.push(e);
	else t = n.issues;
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function ma(e, t) {
	return J({
		kind: "schema",
		type: "union",
		reference: ma,
		expects: /* @__PURE__ */ Gi(e.map((e) => e.expects), "|"),
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
				q(this, "type", e, t, { issues: /* @__PURE__ */ pa(r) }), e.typed = !0;
			} else if (i?.length === 1) return i[0];
			else q(this, "type", e, t, { issues: /* @__PURE__ */ pa(i) });
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ha() {
	return J({
		kind: "schema",
		type: "unknown",
		reference: ha,
		expects: "unknown",
		async: !1,
		"~run"(e) {
			return e.typed = !0, e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ga(e, t, n) {
	return J({
		kind: "schema",
		type: "variant",
		reference: ga,
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
								}, ta).issues : r.type !== "exact_optional" && r.type !== "optional" && r.type !== "nullish") {
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
				q(this, "type", e, t, {
					input: n[a],
					expected: /* @__PURE__ */ Gi(o, "|"),
					path: [{
						type: "object",
						origin: "value",
						input: n,
						key: a,
						value: n[a]
					}]
				});
			} else q(this, "type", e, t);
			return e;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function $(...e) {
	return J({
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
function _a(e, t, n) {
	let r = e["~run"]({ value: t }, /* @__PURE__ */ Hi(n));
	return {
		typed: r.typed,
		success: !r.issues,
		output: r.value,
		issues: r.issues
	};
}
var va = /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ ea(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)), ya = (e) => /* @__PURE__ */ $(/* @__PURE__ */ sa((e) => typeof e == "object" && !!e && !Array.isArray(e)), e), ba = (e) => ya(/* @__PURE__ */ da(e));
((e) => ya(/* @__PURE__ */ X(e)))({ error: /* @__PURE__ */ Q() });
var xa = /* @__PURE__ */ $(/* @__PURE__ */ X({
	id: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Zi(1)),
	hostId: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Zi(1)),
	role: /* @__PURE__ */ ua(["host", "guest"]),
	generation: /* @__PURE__ */ Z(va),
	requireVerification: /* @__PURE__ */ Z(/* @__PURE__ */ ha()),
	locked: /* @__PURE__ */ Z(/* @__PURE__ */ ha())
}), /* @__PURE__ */ Ki((e) => e.role === "host" == (e.id === e.hostId))), Sa = /* @__PURE__ */ X({
	roomId: /* @__PURE__ */ Q(),
	siteKey: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ ea(/^[A-Za-z0-9_-]{1,100}$/))
}), Ca = 6e4, wa = class {
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
		this.lastPulseAt !== void 0 && t - this.lastPulseAt < Ca || (e.send("hb"), this.lastPulseAt = t);
	}
	connect() {
		if (this.stopped) return;
		let e = new URL(ur.liveness(this.roomId), dr(this.runtime.serviceOrigin));
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
}, Ta = class extends Error {}, Ea = class {
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
}, Da = class {
	available;
	send;
	verification = null;
	verificationRequest = new Ea({
		pending: "A verification update is already pending.",
		timeout: "Verification update was not confirmed.",
		send: "Verification update could not be sent."
	}, (e) => (this.verification = null, Error(e)));
	passwordRequest = new Ea({
		pending: "A password update is already pending.",
		timeout: "Password update was not confirmed.",
		send: "Password update could not be sent."
	});
	banRequest = new Ea({
		pending: "A ban operation is already pending.",
		timeout: "Ban operation was not confirmed.",
		send: "Ban operation could not be sent."
	}, (e) => new Ta(e));
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
}, Oa = 1, ka = 2048, Aa = [
	1001,
	1008,
	1009,
	1011,
	1013
], ja = (e) => typeof e == "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(e), Ma = (e) => typeof e == "string" && e.length <= 123 ? e : "Room connection ended.", Na = {
	"Host left": "The host left. Return to Rooms and join again.",
	"Host connection ended": "Host connection ended. Return to Rooms and join again."
};
function Pa(e) {
	return Object.hasOwn(Na, e.reason) ? Na[e.reason] : Aa.includes(e.code) && e.reason ? e.reason : "Room connection ended. Return to Rooms and join again.";
}
function Fa(e) {
	if (e.matchEntry && (e.hostToken || !/^[a-f0-9]{64}$/.test(e.matchEntry.token) || !ja(e.matchEntry.generation))) throw Error("Invalid match entry credentials.");
	return {
		hostToken: e.hostToken,
		password: e.password,
		...e.matchEntry ? { matchEntry: { ...e.matchEntry } } : {}
	};
}
var Ia = class {
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
	ownerRequests = new Da(() => this.host && this.ready, (e) => this.send(e));
	credentials;
	challenge;
	queue = Promise.resolve();
	hostMonitor;
	constructor(e, t, n, r, i) {
		this.room = e, this.hooks = n, this.events = r, this.runtime = i, this.credentials = Fa(t);
		let a = new URL(ur.signal(e), dr(i.serviceOrigin));
		a.protocol = a.protocol === "https:" ? "wss:" : "ws:", this.ws = i.createWebSocket(a), this.attach(this.ws);
	}
	get socketOpen() {
		return this.ws.readyState === Oa;
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
			n() && (this.serial++, this.challenge?.abort(), this.ownerRequests.cancel("disconnected"), this.events.ended(Pa(e)));
		}, e.onerror = () => {
			n() && this.hooks.status("Room service is unavailable.", "error");
		};
	}
	async receive(e, t) {
		if (!(this.closed || t !== this.serial)) {
			if (e.type === "terminal") return this.events.ended(Ma(e.reason));
			if (!this.ownerRequests.accept(e)) switch (e.type) {
				case "heartbeat":
					this.host && this.hostMonitor?.acknowledged();
					return;
				case "verificationRequired": return this.answerVerification(e);
				case "ready": return this.admit(e);
				case "peer":
				case "leave": return this.events.peer(e, t);
				case "signal": return this.events.negotiate(e, t);
			}
		}
	}
	async answerVerification(e) {
		if (this.closed || this.id || this.credentials.hostToken || this.challenge || !/* @__PURE__ */ ia(Sa, e) || e.roomId !== this.room) return;
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
			if (typeof n != "string" || n.length === 0 || n.length > ka) throw Error("Invalid verification response.");
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
		if (!/* @__PURE__ */ ia(xa, e) || t && (e.role !== "guest" || !ja(e.id) || !ja(e.hostId) || e.generation !== t.generation)) {
			this.events.ended("Invalid room admission.");
			return;
		}
		this.id = e.id, this.host = e.role === "host", this.host && this.credentials.hostToken && (this.hostMonitor = new wa(this.room, this.credentials.hostToken, this.runtime), this.hostMonitor.acknowledged()), this.hostId = e.hostId, this.generation = e.generation ?? null, delete this.credentials.matchEntry, this.ownerRequests.verification = typeof e.requireVerification == "boolean" ? e.requireVerification : null, this.locked = typeof e.locked == "boolean" ? e.locked : null, this.events.admitted(this.id, this.host);
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
}, La = 2e4, Ra = 5e3, za = 2, Ba = 3e4, Va = 5e3, Ha = 1048576, Ua = 32768, Wa = 1e3, Ga = [{ urls: "stun:stun.l.google.com:19302" }], Ka = (e) => typeof e == "string" ? new TextEncoder().encode(e).length : e.byteLength, qa = class {
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
	constructor(e, t, n, r = Cr()) {
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
		}, this.signaling = new Ia(e, t, n, {
			admitted: (e, t) => n.ready(e, t),
			peer: (e, t) => this.peerChanged(e, t),
			negotiate: (e, t) => this.negotiate(e, t),
			ended: (e) => this.end(e)
		}, r), this.timer = setInterval(() => this.maintain(), Va);
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
		this.host && this.signalingReady && e - this.lastHeartbeat >= Ba && (this.signal({ type: "heartbeat" }), this.lastHeartbeat = e);
		for (let t of this.peers.values()) !t.connected && e - t.created > La ? (this.hooks.status("Could not connect directly to this room. Try another network or room.", "error"), this.remove(t.id)) : t.lostAt !== void 0 && e - t.lostAt > La ? (this.hooks.status("The direct connection could not be recovered. Rejoin the room.", "error"), this.remove(t.id)) : t.lostAt !== void 0 && this.host && e - t.lastRestart > Ra && this.restartPeer(t.id);
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
			await ki(r, n.sdp, i);
		} else if (n.type === "answer") {
			if (!this.host) throw Error("Only guests can answer");
			await Ai(r, n.sdp, i) && this.noteHealthy(r);
		} else n.type === "candidate" && n.candidate && await ji(r, n.candidate, i);
	}
	async offerPeer(e, t) {
		let n = this.make(e);
		this.bind(n, n.pc.createDataChannel("control", { ordered: !0 })), this.bind(n, n.pc.createDataChannel("realtime", {
			ordered: !1,
			maxRetransmits: 0
		})), await Oi(n, this.negotiationScope(n, t));
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
		if (this.closed || !this.host || !t || t.restarting || t.restarts >= za || t.pc.signalingState !== "stable" || !this.signaling.socketOpen) return !1;
		let n = this.signaling.serial;
		t.restarting = !0, t.lastRestart = performance.now(), t.lostAt ??= t.lastRestart, t.restarts++;
		try {
			return await Oi(t, this.negotiationScope(t, n), { iceRestart: !0 });
		} catch {
			return this.current(t) && this.hooks.status("Direct connection recovery is still pending.", "info"), !1;
		} finally {
			t.restarting = !1;
		}
	}
	make(e) {
		let t = Li(this.runtime.createPeerConnection({
			iceServers: Ga,
			bundlePolicy: "max-bundle"
		}), e, this.link);
		return this.peers.set(e, t), t;
	}
	bind(e, t) {
		Bi(e, t, this.link);
	}
	admit(e) {
		clearTimeout(e.admissionTimer), e.admissionTimer = void 0;
	}
	control(e, t) {
		let n = e.control;
		if (n?.readyState !== "open") return;
		let r = oi(t, this.controlId++), i = r.reduce((e, t) => e + Ka(t), 0);
		if (n.bufferedAmount + i > Ha) {
			this.remove(e.id);
			return;
		}
		for (let e of r) n.send(e);
		this.bytesSent += i;
	}
	fast(e, t) {
		e.fast?.readyState === "open" && e.fast.bufferedAmount < Ua && (e.fast.send(t), this.bytesSent += t.byteLength);
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
						this.current(e) && (e.rtt = Si(t.values()));
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
		r ? this.hostCloseTimer = setTimeout(i, Wa) : i();
	}
	close() {
		if (!this.closed) {
			clearTimeout(this.hostCloseTimer), this.hostCloseTimer = void 0, this.signaling.close(), clearInterval(this.timer);
			for (let e of this.peers.values()) clearTimeout(e.admissionTimer), e.controlReader?.clear(), e.pc.close();
			this.peers.clear();
		}
	}
}, Ja = 256, Ya = (e) => e.slice(0, 100);
function Xa(e, t, n, r) {
	if (e.assertOpen(), typeof n != "string") throw Error("Invalid kick reason");
	let i = e.players.byId(t);
	if (!i || e.isHost(i)) return;
	let a = e.publicPlayer(i), o = Ya(n), s = e.network.peers.get(i.peerId);
	s && e.network.control(s, {
		type: "kicked",
		reason: o
	}), e.network.remove(i.peerId), e.players.has(i) || e.invoke("onPlayerKicked", e.hooks.onPlayerKicked, a, o, !1, r);
}
async function Za(e, t, n, r = null) {
	if (typeof n != "string") throw Error("Invalid kick reason");
	let i = e.players.byId(t);
	if (!i || e.isHost(i)) return;
	let a = e.publicPlayer(i), o = Ya(n);
	if (e.bans.size >= Ja && !e.bans.has(t)) throw Error("Clear existing bans before adding more.");
	try {
		await e.network.updateBan("ban", i.peerId, o);
	} catch (n) {
		throw n instanceof Ta && e.bans.set(t, i.peerId), n;
	}
	e.bans.set(t, i.peerId), e.network.remove(i.peerId), e.invoke("onPlayerKicked", e.hooks.onPlayerKicked, a, o, !0, r);
}
async function Qa(e, t) {
	e.assertOpen();
	let n = e.bans.get(t);
	n && (await e.network.updateBan("clearBan", n), e.bans.delete(t));
}
async function $a(e) {
	e.assertOpen(), await e.network.updateBan("clearBans"), e.bans.clear();
}
function eo(e) {
	return e === null || typeof e == "string" && Array.from(e).length <= 2 && !/[\p{Cc}\p{Cf}]/u.test(e);
}
var to = (e) => /* @__PURE__ */ $(/* @__PURE__ */ la(), /* @__PURE__ */ Ji(), /* @__PURE__ */ Qi(0), /* @__PURE__ */ Xi(e)), no = to(31), ro = /* @__PURE__ */ ua([1, 2]), io = /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Yi(200), /* @__PURE__ */ Ki((e) => !!e.trim())), ao = /* @__PURE__ */ X({
	score: to(99),
	minutes: to(99),
	locked: /* @__PURE__ */ oa(),
	kickRate: /* @__PURE__ */ Z(to(V))
}), oo = /* @__PURE__ */ $(/* @__PURE__ */ X({
	angle: /* @__PURE__ */ la(),
	textColor: /* @__PURE__ */ la(),
	colors: /* @__PURE__ */ aa(/* @__PURE__ */ la())
}), /* @__PURE__ */ $i(({ dataset: e, addIssue: t, NEVER: n }) => {
	try {
		let { angle: t, textColor: n, colors: r } = e.value;
		return ht(t, n, r);
	} catch {
		return t({ message: "Invalid team colors" }), n;
	}
})), so = (e) => /* @__PURE__ */ X({ action: /* @__PURE__ */ Y(e) }), co = /* @__PURE__ */ ga("action", [
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("typing"),
		active: /* @__PURE__ */ oa()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("chat"),
		text: io
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("directChat"),
		recipientId: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Zi(1), /* @__PURE__ */ Yi(128)),
		text: io
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("avatar"),
		avatar: /* @__PURE__ */ sa(eo)
	}),
	so("autoTeams"),
	so("clearBans"),
	so("start"),
	so("stop"),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("teamsLock"),
		locked: /* @__PURE__ */ oa()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("resetTeams"),
		team: /* @__PURE__ */ Z(ro)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("team"),
		team: /* @__PURE__ */ ua([
			0,
			1,
			2
		]),
		slot: /* @__PURE__ */ Z(no)
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
		action: /* @__PURE__ */ Y("ban"),
		slot: no
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("kick"),
		slot: no
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("admin"),
		slot: no
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("mute"),
		slot: no,
		muted: /* @__PURE__ */ oa()
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("teamColors"),
		team: ro,
		palette: /* @__PURE__ */ ca(oo)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("pause"),
		paused: /* @__PURE__ */ Z(/* @__PURE__ */ oa())
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("kickRate"),
		value: to(V)
	}),
	/* @__PURE__ */ X({
		action: /* @__PURE__ */ Y("settings"),
		...ao.entries
	})
]);
function lo(e, t) {
	let n = /* @__PURE__ */ _a(co, {
		...t,
		action: e
	});
	return n.success ? n.output : null;
}
var uo = 0xe8d4a51000, fo = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= uo;
function po(e, t, n = performance.now()) {
	if (fo(e) && fo(n)) return {
		version: 1,
		requestAtMs: e,
		hostNowMs: n,
		streamId: t
	};
}
var mo = /* @__PURE__ */ new WeakMap();
function ho(e, t, n, r = performance.now()) {
	if (r - (mo.get(e) ?? -Infinity) < 1e4) return;
	let i = po(t, n, r);
	return i && mo.set(e, r), i;
}
function go(e, t, n, r) {
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
function _o(e, t, n) {
	return t !== void 0 && (e.admin || !n && t === e);
}
function vo(e, t, n) {
	return t !== void 0 && e.admin && t !== e && !n(t);
}
function yo(e, t, n) {
	let r = e.indexOf(t);
	return r < 0 || t.team === n ? !1 : (t.team = n, e.splice(r, 1), e.push(t), !0);
}
function bo(e, t) {
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
function xo(e, t) {
	return (t ? [t] : [2, 1]).flatMap((t) => e.filter((e) => e.team === t));
}
function So(e, t, n) {
	switch (t.action) {
		case "team": {
			let r = t.slot === void 0 ? e : n.players().find((e) => e.slot === t.slot);
			return _o(e, r, n.locked()) && n.move(r, t.team), !0;
		}
		case "teamsLock": return e.admin && n.lock(t.locked), !0;
		case "autoTeams":
		case "resetTeams": {
			if (!e.admin) return !0;
			let r = t.action === "resetTeams" ? xo(n.players(), t.team).map((e) => ({
				player: e,
				team: 0
			})) : bo(n.players());
			for (let { player: i, team: a } of r) {
				if (!n.current() || !n.players().includes(e) || !e.admin || t.action === "resetTeams" && !n.stopped()) break;
				n.players().includes(i) && ((t.action === "autoTeams" ? i.team !== 0 : i.team === 0) || n.move(i, a));
			}
			return !0;
		}
		default: return !1;
	}
}
function Co(e, t, n, r) {
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
function wo(e, t, n) {
	e.assertOpen();
	let r = e.players.byId(t);
	r && r.admin !== !!n && (r.admin = !!n, e.syncLobby(), e.invoke("onPlayerAdminChange", e.hooks.onPlayerAdminChange, e.publicPlayer(r), null));
}
function To(e, t, n, r) {
	if (e.assertOpen(), !Number.isInteger(t) || typeof n != "boolean") throw Error("Invalid player mute");
	let i = e.players.byId(t);
	i && !e.isHost(i) && !!i.muted !== n && (i.muted = n, e.syncLobby(), e.invoke("onPlayerMuteChange", e.hooks.onPlayerMuteChange, e.publicPlayer(i), r));
}
function Eo(e, t, n) {
	e.assertOpen(), e.locked !== !!t && (e.locked = !!t, e.syncLobby(), e.invoke("onTeamsLockChange", e.hooks.onTeamsLockChange, e.locked, n));
}
function Do(e, t, n) {
	if (e.assertOpen(), t !== 1 && t !== 2) throw Error("Invalid team");
	JSON.stringify(e.teamStyles[t - 1]) !== JSON.stringify(n) && (e.teamStyles[t - 1] = n, e.match.recordStyles(e.teamStyles), e.syncLobby());
}
function Oo(e, t, n, r, i) {
	let a = ht(n, r, i);
	a.angle = ((256 * n / 360 | 0) & 255) * (360 / 256), Do(e, t, a);
}
function ko(e, t, n) {
	if (e.assertOpen(), !Array.isArray(t) || t.length > 32 || t.some((e) => !Number.isSafeInteger(e) || e < 0) || typeof n != "boolean") throw Error("Invalid player order");
	let r = new Set(t), i = [...r].flatMap((t) => {
		let n = e.players.byId(t);
		return n ? [n] : [];
	}), a = e.players.all.filter((e) => !r.has(e.id)), o = n ? [...i, ...a] : [...a, ...i];
	e.players.reorder(o) && (e.match.recordOrder(o.map((e) => e.slot)), e.syncLobby());
}
function Ao(e, t, n) {
	if (e.assertOpen(), !eo(n)) throw Error("Avatar must be null or at most two visible characters.");
	let r = e.players.byId(t);
	r && (r.avatarOverride = n, e.match.recordPlayer(r.slot, r.name, n ?? r.avatar), e.syncLobby());
}
function jo(e, t, n) {
	if (e.assertOpen(), !e.stopped()) return;
	mt(t);
	let r = ++e.stadiumSelection;
	if (e.match.finishRecording("Stadium changed"), e.assertOpen(), e.stopped()) {
		if (r !== e.stadiumSelection) throw Error("Stadium selection superseded");
		e.engine.load(t), e.commentaryAnalysis.configure(e.engine, null), e.xg.resetForStadium(e.engine);
		for (let t of e.players.all) e.engine.setTeam(t.slot, t.team);
		e.epoch = e.epoch + 1 & 65535, e.factStream.rebase(e.engine, e.epoch), e.intelligence.reset(), e.inputs.reset(), e.network.broadcast({
			type: "stadium",
			epoch: e.epoch,
			source: t,
			state: e.engine.snapshot()
		}), e.invoke("onStadiumChange", e.hooks.onStadiumChange, e.engine.stadium.name, n);
	}
}
async function Mo(e, t) {
	if (e.assertOpen(), !e.stopped()) return;
	let n = ++e.stadiumSelection, r = await e.runtime.loadStadium(t);
	if (e.assertOpen(), n !== e.stadiumSelection) throw Error("Stadium selection superseded");
	jo(e, r, null);
}
var No = "You are muted in this room.", Po = "Message not sent. Please wait a moment before sending again.";
function Fo({ room: e, peer: t, actor: n }, r, i) {
	return !n.muted && e.traffic.allow(t.id, "chat") ? !1 : (e.traffic.allow(t.id, "feedback") && e.network.control(t, {
		type: "chatError",
		rejectedText: r,
		recipientId: i,
		text: n.muted ? No : Po
	}), !0);
}
var Io = ({ room: e, actor: t }) => !e.closed && e.players.has(t);
function Lo(e, t) {
	let { room: n, peer: r, actor: i } = e;
	n.traffic.allow(r.id, "typing") && n.network.broadcast({
		type: "typing",
		playerId: i.peerId,
		active: t.active && !i.muted
	});
}
function Ro(e, t) {
	let { room: n, peer: r, actor: i } = e;
	if (Fo(e, t.text, t.recipientId)) return;
	let a = go(n.players.all.map((e) => ({
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
	if (!(!s || c instanceof Promise || c === !1 || !Io(e) || i.muted || !n.players.has(o))) for (let e of [a.fromId, a.toId]) {
		let t = n.network.peers.get(e);
		t && n.network.control(t, a);
	}
}
function zo(e, t) {
	let { room: n, actor: r } = e;
	Fo(e, t.text, "") || (n.invoke("onPlayerActivity", n.hooks.onPlayerActivity, n.publicPlayer(r)), Io(e) && n.invoke("onPlayerChat", n.hooks.onPlayerChat, n.publicPlayer(r), t.text) !== !1 && Io(e) && !r.muted && n.network.broadcast({
		type: "chat",
		playerId: r.peerId,
		name: r.name,
		text: t.text
	}));
}
function Bo({ room: e, actor: t }, n) {
	t.avatar = n.avatar, e.match.recordPlayer(t.slot, t.name, t.avatarOverride ?? t.avatar), e.syncLobby();
}
function Vo(e, t) {
	let { room: n, peer: r, actor: i } = e, a = (t) => {
		Io(e) && n.network.control(r, {
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
		if (Io(e)) {
			if (o !== n.stadiumSelection || !i.admin || !n.stopped()) {
				a("Stadium change cancelled: room state or permissions changed.");
				return;
			}
			jo(n, t, n.publicPlayer(i)), a("Stadium applied.");
		}
	}).catch(() => a("Stadium could not be loaded. Please try again."));
}
function Ho({ room: e, actor: t }, n) {
	let r = e.players.bySlot(n);
	return vo(t, r, (t) => e.isHost(t)) ? r : void 0;
}
function Uo({ room: e, peer: t }, n) {
	!e.closed && e.network.peers.has(t.id) && e.network.control(t, {
		type: "moderationResult",
		text: n
	});
}
function Wo(e, t) {
	let { room: n, actor: r } = e, i = Ho(e, t);
	i && Za(n, i.id, "Removed by admin", n.publicPlayer(r)).then(() => Uo(e, "Player banned.")).catch((t) => Uo(e, t instanceof Error ? t.message : "Moderation failed."));
}
function Go(e, t, n) {
	Hr(e, ...Oe(t), e.publicPlayer(n));
}
function Ko({ room: e, actor: t }, n) {
	e.stopped() && (Ur(e, n.score), Wr(e, n.minutes), Eo(e, n.locked, e.publicPlayer(t)), !e.closed && n.kickRate !== void 0 && n.kickRate !== e.engine.kickRate && Go(e, n.kickRate, t));
}
function qo(e, t) {
	let { room: n, actor: r } = e;
	switch (t.action) {
		case "mute": {
			let i = Ho(e, t.slot);
			i && To(n, i.id, t.muted, n.publicPlayer(r));
			return;
		}
		case "ban": return Wo(e, t.slot);
		case "clearBans": return Uo(e, "Only the room owner can clear bans.");
		case "teamColors": return Do(n, t.team, t.palette);
		case "kickRate": return Go(n, t.value, r);
		case "start": return zr(n, r);
		case "stop": return Br(n, r);
		case "pause": return Vr(n, t.paused === void 0 ? !n.engine.paused : t.paused, n.publicPlayer(r));
		case "settings": return Ko(e, t);
		case "kick": {
			let i = Ho(e, t.slot);
			i && Xa(n, i.id, "Removed by host", n.publicPlayer(r));
			return;
		}
	}
}
function Jo(e, t, n, r) {
	let i = {
		room: e,
		peer: t,
		actor: n
	};
	switch (r.action) {
		case "typing": return Lo(i, r);
		case "directChat": return Ro(i, r);
		case "chat": return zo(i, r);
		case "avatar": return Bo(i, r);
		case "defaultStadium":
		case "customStadium": return Vo(i, r);
	}
	!So(n, r, {
		players: () => e.players.all,
		current: () => !e.closed,
		stopped: () => e.stopped(),
		locked: () => e.locked,
		move: (t, r) => Co(e, t.id, r, n),
		lock: (t) => Eo(e, t, e.publicPlayer(n))
	}) && n.admin && qo(i, r);
}
var Yo = /* @__PURE__ */ new Set([
	"chat",
	"directChat",
	"typing"
]);
function Xo(e, t) {
	return e.traffic.allow(t.id, "message") ? !0 : (e.network.remove(t.id), !1);
}
function Zo(e) {
	return e.version === 1 && e.engine === Jt && typeof e.name == "string" && !!e.name.trim() && e.name.length <= 24;
}
function Qo(e, t, n) {
	let r = Zo(n) ? e.players.freeSlot() : void 0;
	if (!Zo(n) || r === void 0) {
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
		commentaryStream: e.factStream.checkpoint(),
		commentaryClock: po(n.commentaryClock, e.factStream.streamId),
		commentary: e.commentary.snapshot(),
		epoch: e.epoch,
		roomName: e.roomName,
		engine: Jt,
		slot: r,
		stadium: e.engine.source,
		state: e.engine.snapshot(),
		players: e.players.roster(),
		teamStyles: e.teamStyles,
		locked: e.locked
	}), e.network.control(t, {
		type: "commentary-config",
		config: e.commentary.snapshot(Date.now(), !0)
	}), e.syncLobby(), e.invoke("onPlayerJoin", e.hooks.onPlayerJoin, e.publicPlayer(i));
}
function $o(e) {
	return {
		control(t, n) {
			if (!Xo(e, t) || !n || typeof n != "object") return;
			let r = n, i = e.players.byPeer(t.id);
			if (r.type === "join" && !i) return Qo(e, t, r);
			if (i && r.type === "commentary-clock") {
				let n = ho(t, r.requestAtMs, e.factStream.streamId);
				n && e.network.control(t, {
					type: "commentary-clock",
					clock: n
				});
				return;
			}
			if (!i || r.type !== "action" || !(typeof r.action == "string" && Yo.has(r.action)) && !e.traffic.allow(t.id, "action")) return;
			let a = lo(r.action, r);
			a && Jo(e, t, i, a);
		},
		fast(t, n) {
			if (!Xo(e, t)) return;
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
var es = class {
	match;
	now;
	peers = /* @__PURE__ */ new Map();
	closed = !1;
	input = {
		seq: 0,
		keys: 0,
		epoch: 0,
		history: []
	};
	constructor(e, t = () => performance.now()) {
		this.match = e, this.now = t;
	}
	accept(e, t, n, r, i) {
		if (this.closed) return;
		let a = hi(n, this.input);
		if (a.epoch !== r) return;
		let o = this.peers.get(e);
		if (o && !gi(a.seq, o.seq)) return;
		let s = o ? Math.min(a.history.length, a.seq - o.seq >>> 0) : 1, c = o?.keys ?? 0, l = !1;
		o ? (o.seq = a.seq, o.received = this.now(), o.keys = a.keys) : this.peers.set(e, {
			seq: a.seq,
			received: this.now(),
			keys: a.keys
		});
		let u = this.match.engine, d = u.index(t) * 18 + B.INPUT;
		for (let e = s - 1; e >= 0; e--) {
			let n = a.history[e], r = n !== c;
			if (l ||= r, c = n, this.closed) return;
			if (r && !i) {
				this.match.command("input", t, n);
				continue;
			}
			let o = u.data[d];
			o !== n && (this.match.command("input", t, n), i?.(o));
		}
		if (!this.closed) return l;
	}
	expire(e, t, n = this.now()) {
		if (this.closed) return;
		let r = this.peers.get(e), i = this.match.engine;
		r && n - r.received > 250 && i.data[i.index(t) * 18 + B.INPUT] !== 0 && this.match.command("input", t, 0);
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
}, ts = {
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
		value: V
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
function ns(e, t) {
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
		case "scoreLimit":
			e.scoreLimit = t.value;
			break;
		case "timeLimit":
			e.timeLimit = t.value;
			break;
		case "kickRate":
			e.setKickRateLimit(...Oe(t.value));
			break;
		case "pause": e.setPaused(!!t.value);
	}
}
function rs(e) {
	let t = JSON.stringify(e), n = 2166136261;
	for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return (n >>> 0).toString(16).padStart(8, "0");
}
var is = [
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
], as = new TextEncoder(), os = new TextDecoder("utf-8", { fatal: !0 });
function ss(e) {
	return sr(cs(e));
}
function cs(e) {
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
	let a = as.encode(JSON.stringify({
		...n,
		checkpoints: i
	}));
	if (t.length > 5e5 || a.length + 16 > 33554432) throw Error("Replay exceeds bounds");
	let o = t.length * 12 + t.filter((e) => e.kind === "disc").length * 106, s = new Uint8Array(Math.min(ar, o)), c = new DataView(s.buffer), l = (e) => {
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
		let t = is.indexOf(e.kind);
		if (e.kind === "join" && e.value !== 0 || e.kind === "team" && e.value > 2) throw Error("Invalid replay team command");
		if (t < 0 || !Number.isInteger(e.slot) || e.slot < 0 || e.slot > (e.kind === "disc" ? 95 : 31)) throw Error("Invalid replay command");
		if (f(e.tick - d), l(1), s[u++] = t, f(e.slot), f(e.value), e.kind === "disc") {
			let t = Ee(e.properties), n = 0;
			Te.forEach(([e], r) => {
				t[e] !== void 0 && (n |= 1 << r);
			}), f(n);
			for (let [e] of Te) {
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
function ls(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e), n = t[0] === 66 && t[1] === 50 && t[2] === 68 && t[3] === 49;
	if (n && t.length > 33554432) throw Error("Replay exceeds 32 MB");
	return us(n ? t : cr(t));
}
function us(e) {
	if (e.length < 16 || e[0] !== 66 || e[1] !== 50 || e[2] !== 68 || e[3] !== 49 || e[4] !== 1 || e[5] || e[6] || e[7]) throw Error("Invalid packed replay header");
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = t.getUint32(8, !0), r = t.getUint32(12, !0);
	if (n > e.length - 16 || r > 5e5 || r > (e.length - 16 - n) / 3) throw Error("Invalid packed replay bounds");
	let i = JSON.parse(os.decode(e.subarray(16, 16 + n)));
	if (!i || !Number.isSafeInteger(i.initial?.tick) || i.initial.tick < 0) throw Error("Invalid replay initial tick");
	i.commands = [];
	let a = 16 + n, o = i.initial.tick;
	if (!Array.isArray(i.checkpoints) || i.checkpoints.length > 721) throw Error("Invalid packed checkpoints");
	let s = i.checkpoints.map((e) => {
		let t = e?.state?.discs;
		if (typeof t != "number" || !Number.isInteger(t) || t < 0 || t > 1728) throw Error("Invalid checkpoint disc count");
		return t;
	});
	if (s.reduce((e, t) => e + t * 8, 0) > e.length - a - r * 3) throw Error("Truncated checkpoint discs");
	for (let [e, n] of i.checkpoints.entries()) {
		let r = s[e], i = Array(r);
		for (let e = 0; e < r; e++) {
			let n = t.getFloat64(a, !0);
			if (!Number.isFinite(n)) throw Error("Nonfinite checkpoint disc");
			i[e] = n, a += 8;
		}
		n.state.discs = i;
	}
	let c = () => {
		let t = 0;
		for (let n = 0; n <= 28; n += 7) {
			if (a >= e.length) throw Error("Truncated replay command");
			let r = e[a++];
			if (n === 28 && r > 15) throw Error("Replay integer overflow");
			if (t += (r & 127) * 2 ** n, !(r & 128)) {
				if (n && r === 0) throw Error("Noncanonical replay integer");
				return t;
			}
		}
		throw Error("Invalid replay integer");
	};
	for (let n = 0; n < r; n++) {
		if (o += c(), !Number.isSafeInteger(o) || a >= e.length) throw Error("Invalid replay tick");
		let n = is[e[a++]];
		if (!n) throw Error("Unknown replay command");
		let r = c(), s = c();
		if (n === "disc") {
			let l = c();
			if (l > 8191) throw Error("Invalid disc property mask");
			let u = {};
			Te.forEach(([n], r) => {
				if (l & 1 << r) {
					if (a + 8 > e.length) throw Error("Truncated disc properties");
					u[n] = t.getFloat64(a, !0), a += 8;
				}
			}), i.commands.push({
				tick: o,
				kind: n,
				slot: r,
				value: s,
				properties: Ee(u)
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
	if (a !== e.length) throw Error("Trailing replay command data");
	return i;
}
var ds = 31457280, fs = 5e5, ps = 4096, ms = U * 5, hs = class {
	replay;
	playerOrder = [];
	lastInputs = /* @__PURE__ */ new Map();
	bytes = 0;
	full = !1;
	canRecord(e) {
		return !this.full && e.tick - this.replay.initial.tick < U * 3600;
	}
	constructor(e, t = [], n = [null, null]) {
		let r = e.snapshot();
		this.playerOrder = t.map((e) => e.slot), this.replay = {
			magic: "B2DR",
			version: 1,
			engine: Jt,
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
				teams: gt(n)
			}],
			orders: [{
				tick: r.tick,
				slots: [...this.playerOrder]
			}],
			end: r.tick,
			finalHash: rs(r)
		}, this.bytes = new TextEncoder().encode(JSON.stringify(this.replay)).length;
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + B.INPUT]);
	}
	reserve(e) {
		let t = new TextEncoder().encode(JSON.stringify(e)).length + 1;
		return this.full || this.bytes + t > ds ? (this.full = !0, !1) : (this.bytes += t, !0);
	}
	player(e, t, n, r) {
		let i = {
			tick: e,
			slot: t,
			name: n,
			avatar: r
		};
		return this.replay.roster.length >= ps || !this.reserve(i) ? (this.full = !0, !1) : (this.replay.roster.push(i), n === null ? this.order(e, this.playerOrder.filter((e) => e !== t)) : this.playerOrder.includes(t) ? !0 : this.order(e, [...this.playerOrder, t]));
	}
	style(e, t) {
		let n = {
			tick: e,
			teams: gt(t)
		}, r = this.replay.styles;
		return r.length >= ps || !this.reserve(n) ? (this.full = !0, !1) : (r.push(n), !0);
	}
	order(e, t) {
		if (t.length === this.playerOrder.length && t.every((e, t) => e === this.playerOrder[t])) return !0;
		let n = {
			tick: e,
			slots: [...t]
		}, r = this.replay.orders;
		return r.length >= ps || !this.reserve(n) ? (this.full = !0, !1) : (this.playerOrder = [...t], r.push(n), !0);
	}
	command(e) {
		return e.kind === "input" && this.lastInputs.get(e.slot) === e.value ? !0 : this.replay.commands.length >= fs || !this.reserve(e) ? (this.full = !0, !1) : (e.kind === "input" && this.lastInputs.set(e.slot, e.value), (e.kind === "team" || e.kind === "join") && this.lastInputs.set(e.slot, 0), e.kind === "start" && this.lastInputs.clear(), this.replay.commands.push(e.kind === "disc" ? {
			...e,
			properties: Ee(e.properties)
		} : { ...e }), !0);
	}
	step(e) {
		for (let t = 0; t < 32; t++) this.lastInputs.set(t, e.data[e.index(t) * 18 + B.INPUT]);
		if (e.tick % ms === 0) {
			let t = e.snapshot(), n = {
				tick: e.tick,
				state: t,
				hash: rs(t)
			};
			this.reserve(n) && this.replay.checkpoints.push(n);
		}
		this.replay.end = e.tick;
	}
	pack(e) {
		return this.replay.end = e.tick, this.replay.finalHash = rs(e.snapshot()), cs(this.replay);
	}
	finish(e) {
		return this.replay.end = e.tick, this.replay.finalHash = rs(e.snapshot()), new Blob([ss(this.replay)], { type: "application/x-ball2d-replay" });
	}
}, gs = 5e5, _s = 721, vs = 4096, ys = U * 3600, bs = (e, t, n) => Number.isInteger(e) && e >= t && e <= n;
function xs(e) {
	if (e.magic !== "B2DR" || e.version !== 1 || e.engine !== Jt) throw Error("Unsupported replay engine/version");
	if (!Array.isArray(e.commands) || e.commands.length > gs || !Array.isArray(e.checkpoints) || e.checkpoints.length > _s || !Number.isInteger(e.end) || e.end < e.initial.tick || e.end - e.initial.tick > ys) throw Error("Invalid replay bounds");
}
function Ss(e) {
	let t = e.initial.tick;
	for (let n of e.commands) {
		let r = Object.hasOwn(ts, n.kind) ? ts[n.kind] : void 0;
		if (!r || !bs(n.tick, t, e.end) || !bs(n.slot, 0, r.slot) || !bs(n.value, 0, r.value)) throw Error("Invalid replay command");
		n.kind === "disc" && (n.properties = Ee(n.properties)), t = n.tick;
	}
}
function Cs(e) {
	if (!Array.isArray(e.roster) || e.roster.length > vs) throw Error("Invalid replay roster");
	let t = e.initial.tick;
	for (let n of e.roster) {
		if (!bs(n.tick, t, e.end) || !bs(n.slot, 0, 31) || n.name !== null && (typeof n.name != "string" || n.name.length > 24) || n.avatar !== void 0 && !eo(n.avatar)) throw Error("Invalid roster event");
		t = n.tick;
	}
}
function ws(e) {
	if (e.styles === void 0) return;
	if (!Array.isArray(e.styles) || e.styles.length > vs) throw Error("Invalid replay styles");
	let t = e.initial.tick;
	for (let n of e.styles) {
		if (!n || !bs(n.tick, t, e.end) || n.teams === void 0) throw Error("Invalid replay style");
		n.teams = gt(n.teams), t = n.tick;
	}
}
function Ts(e) {
	if (e.orders === void 0) return;
	if (!Array.isArray(e.orders) || e.orders.length > vs) throw Error("Invalid replay orders");
	let t = e.initial.tick;
	for (let n of e.orders) {
		if (!n || !bs(n.tick, t, e.end) || !Array.isArray(n.slots) || n.slots.length > 32 || n.slots.some((e) => !bs(e, 0, 31)) || new Set(n.slots).size !== n.slots.length) throw Error("Invalid replay order");
		t = n.tick;
	}
}
function Es(e) {
	let t = e.initial.tick;
	for (let n of e.checkpoints) {
		if (!bs(n.tick, t + 1, e.end) || n.state.tick !== n.tick || typeof n.hash != "string") throw Error("Invalid checkpoint");
		t = n.tick;
	}
}
function Ds(e) {
	let t = ls(e);
	return xs(t), Ss(t), Cs(t), ws(t), Ts(t), Es(t), t;
}
async function Os(e) {
	if (e.size > 33554432) throw Error("Replay exceeds 32 MB");
	return Ds(await e.arrayBuffer());
}
var ks = class {
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
		r && (i.properties = r), this.recorder && (!this.recorder.canRecord(this.engine) || !this.recorder.command(i)) && this.finishRecording("Recording limit reached"), this.assertOpen(), ns(this.engine, i);
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
		this.recorder = new hs(this.engine, e, t);
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
}, As = /* @__PURE__ */ new Set([
	"start",
	"goal",
	"end"
]), js = (e) => Math.max(0, Math.min(1, e));
function Ms({ p0: e, p1: t }, n, r) {
	let i = t[0] - e[0], a = t[1] - e[1], o = Math.hypot(i, a) || 1, s = ((n - e[0]) * i + (r - e[1]) * a) / o, c = ((n - e[0]) * a - (r - e[1]) * i) / o;
	return {
		along: s,
		across: (-e[0] * a + e[1] * i) / o < 0 ? -c : c,
		length: o
	};
}
function Ns(e, t) {
	let n = e.data, [r, i, a] = [
		n[0],
		n[1],
		n[B.RADIUS]
	], o = t * 18;
	return t > 0 && n[o + B.INVERSE_MASS] !== 0 ? "touch" : t > 0 && e.stadium.goals.some(({ p0: e, p1: t }) => [e, t].some(([e, t]) => Math.hypot(n[o] - e, n[o + B.Y] - t) <= n[o + B.RADIUS])) ? "post" : e.stadium.goals.some((e) => {
		let { along: t, across: n, length: o } = Ms(e, r, i);
		return t > -a && t < o + a && n < 0;
	}) ? "net" : "wall";
}
var Ps = class {
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
		}), a = .3 + .7 * js((Math.hypot(r[2], r[3]) - 4) / 5), o = (e.ballKicks ?? []).map((e) => ({
			...i("kick", a),
			slot: e
		})), s = e.phase === "playing" || e.phase === "goal", c = e.ballContact;
		c && !o.length && s && (e.tick < this.lastContactTick || e.tick - this.lastContactTick >= 6) && (o.push(i(Ns(e, c.disc), (c.speed - 1) / 10)), this.lastContactTick = e.tick);
		let l = e.playerContact;
		if (l && s) {
			let t = l.speed >= .6, n = e.tick - this.lastBumpTick;
			if (l.speed >= .06 && (n < 0 || n >= (t ? 6 : 15))) {
				let n = l.a * 18, a = l.b * 18;
				o.push(i("bump", t ? .15 + .85 * js(l.speed / 5) : l.speed / 4, (r[n] + r[a]) / 2, (r[n + B.Y] + r[a + B.Y]) / 2)), this.lastBumpTick = e.tick;
			}
		}
		if (e.phase !== n) {
			let t = e.phase === "goal" ? "goal" : e.phase === "playing" ? "start" : e.phase === "finished" || e.phase === "lobby" && n !== "finished" ? "end" : void 0;
			t && o.push(i(t, 1, 0, 0));
		}
		for (this.phase = e.phase, this.pending.push(...o); this.pending.length > 8;) {
			let e = this.pending.findIndex((e) => e.kind === "bump"), t = this.pending.findIndex((e) => !As.has(e.kind));
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
function Fs(e, t) {
	if (t) for (let n of e.peers.values()) n.control?.readyState === "open" && n.control.bufferedAmount < 16384 && e.control(n, t);
}
var Is = (e) => ({
	phase: e.phase,
	red: e.red,
	blue: e.blue,
	paused: e.paused,
	tick: e.tick
}), Ls = class {
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
		this.previous = Is(e), this.epoch = t, this.touch = e.lastTouch, this.touchPlayer = null;
	}
	capture(e, t, n = () => null, r) {
		if (t !== this.epoch || e.tick < this.previous.tick) return this.rebase(e, t), [];
		let i = this.previous;
		if (this.previous = Is(e), e.lastTouch !== this.touch) {
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
function Rs(e, t) {
	t.length && e.broadcast({
		type: "match-facts",
		version: 1,
		sentAtMs: performance.now(),
		streamId: t[0].streamId,
		facts: t
	});
}
var zs = Object.freeze({
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
	channels: Object.freeze({
		audio: !0,
		caption: !0,
		chat: !0
	})
}), Bs = (e, t, n, r) => Number.isFinite(e) ? Math.max(n, Math.min(r, e)) : t;
function Vs(e = {}, t = zs) {
	let n = { ...t.families };
	for (let [t, r] of Object.entries(e.families ?? {})) Hs.includes(t) && r && (n[t] = Object.freeze({
		...n[t],
		...typeof r.enabled == "boolean" ? { enabled: r.enabled } : {},
		...r.cooldownMs === void 0 ? {} : { cooldownMs: Bs(r.cooldownMs, 0, 0, 3e5) },
		...r.priority === void 0 ? {} : { priority: Bs(r.priority, 50, 0, 100) },
		...r.ttlMs === void 0 ? {} : { ttlMs: Bs(r.ttlMs, 1500, 100, 1e4) }
	}));
	return Object.freeze({
		locale: e.locale === "tr" || e.locale === "en" ? e.locale : t.locale,
		dose: [
			"off",
			"minimal",
			"balanced",
			"rich"
		].includes(e.dose ?? "") ? e.dose ?? t.dose : t.dose,
		reactionIntensity: Bs(e.reactionIntensity ?? t.reactionIntensity, .7, 0, 1),
		maxDurationMs: Bs(e.maxDurationMs ?? t.maxDurationMs, 2800, 250, 6e3),
		minGapMs: Bs(e.minGapMs ?? t.minGapMs, 3500, 0, 6e4),
		semanticCooldownMs: Bs(e.semanticCooldownMs ?? t.semanticCooldownMs, 3e4, 0, 3e5),
		historySize: Math.floor(Bs(e.historySize ?? t.historySize, 64, 1, 256)),
		traceSize: Math.floor(Bs(e.traceSize ?? t.traceSize, 128, 0, 512)),
		seed: Math.floor(Bs(e.seed ?? t.seed, 1, 0, 4294967295)),
		families: Object.freeze(n),
		contextFactsEnabled: typeof e.contextFactsEnabled == "boolean" ? e.contextFactsEnabled : t.contextFactsEnabled,
		channels: Object.freeze({
			audio: typeof e.channels?.audio == "boolean" ? e.channels.audio : t.channels?.audio ?? !0,
			caption: typeof e.channels?.caption == "boolean" ? e.channels.caption : t.channels?.caption ?? !0,
			chat: typeof e.channels?.chat == "boolean" ? e.channels.chat : t.channels?.chat ?? !0
		})
	});
}
var Hs = Object.freeze(/* @__PURE__ */ "kickoff,restart,goal.neutral,goal.first,goal.equalizer,goal.lead,goal.late-winner,goal.consolation,goal.own-goal,post,near-miss,pressure,pass,pass-chain,turnover,assist,save,shot,block,counterattack,attack-progress,sustained-pressure,tactical-summary,match-end.win,match-end.draw,match-stop,pause,resume,context.fact".split(",")), Us = (e) => typeof e == "string" && /^[a-f0-9]{64}$/u.test(e), Ws = (e) => !!e && typeof e == "object" && !Array.isArray(e), Gs = (e, t) => Object.keys(e).length === t.length && t.every((t) => Object.hasOwn(e, t)), Ks = (e) => typeof e == "string" && e.trim().length > 0 && e.length <= 512;
function qs(e, t) {
	if (!Ws(e) || !Gs(e, [
		"schemaVersion",
		"audioSha256",
		"textSha256",
		"durationMs",
		"words",
		"annotation"
	]) || e.schemaVersion !== 1 || !Us(e.audioSha256) || e.audioSha256 !== t.audio?.sha256 || !Us(e.textSha256) || !Number.isFinite(t.durationMs) || t.durationMs <= 0 || e.durationMs !== t.durationMs || !Ks(t.text) || !Array.isArray(e.words) || e.words.length < 1 || e.words.length > 128 || !Ws(e.annotation) || !Gs(e.annotation, [
		"source",
		"reviewer",
		"reference"
	]) || ![
		e.annotation.source,
		e.annotation.reviewer,
		e.annotation.reference
	].every(Ks)) throw Error("Invalid commentary word timing binding");
	let n = [...t.text.matchAll(/\S+/gu)];
	if (n.length !== e.words.length) throw Error("Word timing requires complete token coverage");
	let r = 0, i = e.words.map((e, i) => {
		let a = n[i];
		if (!Ws(e) || !Gs(e, [
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
var Js = (e) => /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Zi(1), /* @__PURE__ */ Yi(e)), Ys = /* @__PURE__ */ $(Js(96), /* @__PURE__ */ ea(/^[a-zA-Z0-9._:-]+$/)), Xs = (e, t) => /* @__PURE__ */ $(/* @__PURE__ */ la(), /* @__PURE__ */ qi(), /* @__PURE__ */ Qi(e), /* @__PURE__ */ Xi(t)), Zs = /* @__PURE__ */ $(/* @__PURE__ */ fa([Xs(0, 1), Xs(0, 1)]), /* @__PURE__ */ Ki((e) => e[0] <= e[1])), Qs = /* @__PURE__ */ X({
	source: Js(200),
	license: Js(200),
	status: /* @__PURE__ */ ua(["draft", "approved"])
}), $s = /* @__PURE__ */ X({
	url: /* @__PURE__ */ $(Js(1024), /* @__PURE__ */ Ki((e) => {
		if ((!e.startsWith("/") || e.startsWith("//") || e.includes("\\")) && !e.startsWith("https://")) return !1;
		try {
			let t = new URL(e, "https://ball2d.invalid");
			return t.protocol === "https:" && !t.username && !t.password;
		} catch {
			return !1;
		}
	})),
	sha256: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ ea(/^[a-f0-9]{64}$/))
}), ec = /* @__PURE__ */ X({
	id: Ys,
	locale: /* @__PURE__ */ ua(["tr", "en"]),
	role: /* @__PURE__ */ ua(["play-by-play", "analyst"]),
	family: /* @__PURE__ */ ua(Hs),
	semanticKey: Js(96),
	openingKey: Js(96),
	text: Js(300),
	intensity: Zs,
	durationMs: Xs(1, 12e3),
	onsetMs: Xs(0, 11999),
	interruptibleAtMs: /* @__PURE__ */ $(/* @__PURE__ */ aa(Xs(0, 12e3)), /* @__PURE__ */ Yi(16)),
	cooldownMs: Xs(0, 3e5),
	audio: /* @__PURE__ */ ca($s),
	wordTiming: /* @__PURE__ */ Z(/* @__PURE__ */ ha()),
	provenance: Qs,
	fallbackId: /* @__PURE__ */ Z(Ys),
	contextFactKey: /* @__PURE__ */ Z(Ys),
	contextFactValue: /* @__PURE__ */ Z(/* @__PURE__ */ ma([/* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Yi(80)), /* @__PURE__ */ $(/* @__PURE__ */ la(), /* @__PURE__ */ qi())]))
}), tc = /* @__PURE__ */ X({
	id: Ys,
	kind: /* @__PURE__ */ ua([
		"bed",
		"tension",
		"goal",
		"disappointment",
		"chant",
		"post",
		"near-miss",
		"release"
	]),
	team: /* @__PURE__ */ ma([
		/* @__PURE__ */ Y("neutral"),
		/* @__PURE__ */ Y(1),
		/* @__PURE__ */ Y(2)
	]),
	intensity: Zs,
	durationMs: Xs(100, 6e4),
	loop: /* @__PURE__ */ ca(/* @__PURE__ */ X({
		startMs: Xs(0, 6e4),
		endMs: Xs(1, 6e4)
	})),
	audio: $s,
	provenance: Qs
}), nc = (e) => {
	if (new TextEncoder().encode(JSON.stringify(e)).length > 262144) throw Error("Commentary assets exceed 256 KiB control budget");
};
function rc(e) {
	if (e === null) return null;
	let t = /* @__PURE__ */ _a(/* @__PURE__ */ $(/* @__PURE__ */ aa(ec), /* @__PURE__ */ Yi(4096)), e);
	if (!t.success) throw Error("Invalid commentary catalog");
	let n = t.output.map(({ wordTiming: e, ...t }) => ({
		...t,
		...e === void 0 ? {} : { wordTiming: qs(e, t) }
	}));
	nc(n);
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
function ic(e) {
	if (e === null) return null;
	let t = /* @__PURE__ */ _a(/* @__PURE__ */ X({
		id: Ys,
		version: Js(32),
		cues: /* @__PURE__ */ $(/* @__PURE__ */ aa(tc), /* @__PURE__ */ Yi(64))
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
	return nc(n), n;
}
var ac = Object.freeze({
	enabled: !0,
	bedIntensity: 1,
	reactionIntensity: 1,
	chantIntensity: .5,
	chantCooldownMs: 45e3,
	preferredTeam: "neutral"
}), oc = /* @__PURE__ */ X({
	enabled: /* @__PURE__ */ oa(),
	bedIntensity: Xs(0, 1),
	reactionIntensity: Xs(0, 1),
	chantIntensity: Xs(0, 1),
	chantCooldownMs: Xs(5e3, 3e5),
	preferredTeam: /* @__PURE__ */ ma([
		/* @__PURE__ */ Y("neutral"),
		/* @__PURE__ */ Y(1),
		/* @__PURE__ */ Y(2)
	])
});
function sc(e, t = ac) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid atmosphere policy");
	let n = /* @__PURE__ */ _a(oc, {
		...t,
		...e
	});
	if (!n.success) throw Error("Invalid atmosphere policy");
	return n.output;
}
var cc = class {
	policy = Vs();
	context = /* @__PURE__ */ new Map();
	catalog = null;
	atmosphere = ac;
	atmospherePack = null;
	setCatalog(e) {
		this.catalog = rc(e);
	}
	getCatalog() {
		return structuredClone(this.catalog);
	}
	setAtmosphere(e) {
		this.atmosphere = sc(e, this.atmosphere);
	}
	getAtmosphere() {
		return structuredClone(this.atmosphere);
	}
	setAtmospherePack(e) {
		this.atmospherePack = ic(e);
	}
	getAtmospherePack() {
		return structuredClone(this.atmospherePack);
	}
	configure(e) {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid commentary policy");
		this.policy = Vs(e, this.policy);
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
}, lc = {
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
	saveAreaGoalWidths: 1.5,
	progressGoalWidths: .75,
	counterWindowMs: 4e3,
	pressureHoldMs: 1800,
	pressureAreaGoalWidths: 1.5,
	summaryWindowMs: 15e3
}, uc = {
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
	saveAreaGoalWidths: [.25, 3],
	progressGoalWidths: [.25, 3],
	counterWindowMs: [1e3, 8e3],
	pressureHoldMs: [500, 6e3],
	pressureAreaGoalWidths: [.5, 4],
	summaryWindowMs: [5e3, 6e4]
};
function dc(e = {}, t = lc) {
	let n = e && typeof e == "object" ? e : {}, r = {
		...lc,
		...t
	};
	r.enabled = typeof n.enabled == "boolean" ? n.enabled : typeof t.enabled == "boolean" ? t.enabled : lc.enabled;
	for (let e of Object.keys(uc)) {
		let i = n[e], a = Number.isFinite(t[e]) ? t[e] : lc[e], [o, s] = uc[e];
		r[e] = Math.max(o, Math.min(s, typeof i == "number" && Number.isFinite(i) ? i : a));
	}
	return Object.freeze(r);
}
var fc = () => ({
	controlledMs: 0,
	completedPasses: 0,
	failedPasses: 0,
	turnoversWon: 0,
	directedShots: 0,
	blocks: 0,
	saves: 0,
	confirmedAssists: 0
}), pc = (e, t = 1) => Math.min(2 ** 53 - 1, e + t), mc = {
	"player-retired": 120,
	"control-ended": 110,
	"assist-confirmed": 100,
	"goalkeeper-save": 95,
	block: 90,
	"directed-shot": 85,
	counterattack: 80,
	"pass-chain": 75,
	"attack-progress": 70,
	"pass-completed": 65,
	turnover: 60,
	"pass-failed": 55,
	"sustained-pressure": 50,
	"control-established": 30,
	"tactical-summary": 10
}, hc = (e, t) => e.identity.playerId === t.identity.playerId && e.identity.sessionId === t.identity.sessionId && e.identity.team === t.identity.team && e.role === t.role, gc = (e, t) => e.length === t.length && e.every((e, n) => hc(e, t[n]) || t.some((t) => hc(e, t))), _c = (e, t) => e.id === t.id && e.defendingTeam === t.defendingTeam && e.p0[0] === t.p0[0] && e.p0[1] === t.p0[1] && e.p1[0] === t.p1[0] && e.p1[1] === t.p1[1] && e.pitchPoint[0] === t.pitchPoint[0] && e.pitchPoint[1] === t.pitchPoint[1], vc = (e, t) => e.length === t.length && e.every((e, n) => _c(e, t[n]) || t.some((t) => _c(e, t))), yc = class {
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
	contacts = /* @__PURE__ */ new Set();
	red = fc();
	blue = fc();
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
		this.policy = dc(e);
	}
	getPolicy() {
		return this.policy;
	}
	invalidate(e = "discontinuity") {
		this.clearContinuity(), this.completeAtTick = !1, this.unknown = [typeof e == "string" && e.length ? e.slice(0, 96) : "discontinuity"], this.status = this.policy.enabled ? "unknown" : "disabled";
	}
	configure(e) {
		return this.policy = dc(e, this.policy), this.reset(), this.policy;
	}
	reset() {
		this.clearContinuity(), this.streamId = null, this.epoch = this.tick = -1, this.confirmedSequence = this.sequence = 0, this.geometryBaseline = this.rosterBaseline = null, this.contacts.clear(), this.red = fc(), this.blue = fc(), this.observedMs = this.uncontrolledMs = this.emitted = this.dropped = 0, this.summarySince = -1, this.summaryBase = {
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
		}, this.attack = null, this.summarySince = -1;
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
			...a.player ? { player: h(a.player) } : {},
			...a.otherPlayer ? { otherPlayer: h(a.otherPlayer) } : {},
			...a.goalId ? { goalId: a.goalId } : {},
			...a.shotQuality ? { shotQuality: a.shotQuality } : {},
			...this.attack?.team === r ? { attackId: this.attack.id } : {}
		});
		e.length < 40 ? e.push(o) : this.dropped++;
	}
	finish(e) {
		return e.sort((e, t) => mc[t.kind] - mc[e.kind]), e.length > 8 && (this.dropped += e.length - 8, e.length = 8), this.emitted = pc(this.emitted, e.length), Object.freeze(e);
	}
	observe(e) {
		if (!this.policy.enabled) return this.status = "disabled", [];
		if (!y(e)) return this.clearContinuity(), this.completeAtTick = !1, this.status = "unknown", this.unknown = ["invalid-or-overflow-frame"], [];
		if (this.streamId && e.streamId !== this.streamId || this.epoch >= 0 && l(e.epoch, this.epoch) || e.epoch === this.epoch && e.tick <= this.tick) return [];
		this.epoch >= 0 && (e.epoch !== this.epoch || !this.rosterBaseline || !this.geometryBaseline || !gc(e.players, this.rosterBaseline) || !vc(e.goals, this.geometryBaseline)) && this.reset();
		let t = this.tick, n = t >= 0 ? this.ms(e.tick - t) : 0;
		this.streamId = e.streamId, this.epoch = e.epoch, this.tick = e.tick, this.rosterBaseline ||= e.players.map((e) => ({
			identity: h(e.identity),
			role: e.role
		})), this.geometryBaseline ||= e.goals.map((e) => ({
			...e,
			p0: [...e.p0],
			p1: [...e.p1],
			pitchPoint: [...e.pitchPoint]
		})), this.unknown = [], n > this.policy.maxGapMs && (this.clearContinuity(), this.unknown.push("sampling-gap"));
		let r = t < 0 ? e.tick - 1 : t, i = e.contacts.filter((e) => e.tick > r && !this.contacts.has(e.id));
		for (let e of i) {
			this.contacts.add(e.id);
			let t = this.contacts.values().next().value;
			this.contacts.size > 128 && t !== void 0 && this.contacts.delete(t);
		}
		let a = !1, o = -1, s = "";
		for (let e of i) {
			let t = e.player ? m(e.player) : e.kind;
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
		for (let e of i) e.player && this.lastPass && m(e.player) !== m(this.lastPass.to) && (this.lastPass = null);
		if (e.context.paused || e.context.phase !== "playing") return (e.context.paused || e.context.phase === "lobby") && this.clearContinuity(), this.controller = this.candidate = null, this.summarySince = -1, this.status = "paused", [];
		e.goals.length || this.unknown.push("goal-geometry-unavailable");
		let u = [];
		if (this.pass && this.ms(e.tick - this.pass.tick) > this.policy.passWindowMs && (this.pass = null), this.lastPass && this.ms(e.tick - this.lastPass.tick) > this.policy.assistWindowMs && (this.lastPass = null), this.shot && this.ms(e.tick - this.shot.tick) > this.policy.shotWindowMs && (this.shot = null), this.chain.team && this.ms(e.tick - this.chain.tick) > this.policy.chainWindowMs && (this.chain = {
			team: null,
			completed: 0,
			tick: -1
		}), this.lastController && this.ms(e.tick - this.lastController.tick) > this.policy.chainWindowMs && (this.attack = null, this.lastController = null), c) for (let t of i) {
			let n = t.player;
			if (n && this.pass && n.team !== this.pass.player.team) {
				let t = this.pass;
				this.team(t.player.team).failedPasses++, this.emit(u, e, "pass-failed", t.player.team, ["verified-kick", "opponent-contact-before-reception"], {
					player: t.player,
					otherPlayer: n,
					metrics: { flightMs: this.ms(e.tick - t.tick) }
				}), this.pass = null, this.chain = {
					team: null,
					completed: 0,
					tick: -1
				};
			}
			if (n && this.shot && n.team !== this.shot.player.team && (t.tick === e.tick ? this.defend(e, n, u) : this.shot = null), t.kind === "kick" && n) {
				if (this.pass = null, t.tick !== e.tick) continue;
				let r = e.goals.find((t) => t.defendingTeam !== n.team && x(e, t.id, this.policy.shotHorizonMs / 1e3)), i = Math.hypot(e.ball.vx, e.ball.vy) / e.ball.radius;
				r && i >= this.policy.shotMinSpeedRadii ? (this.shot = {
					player: h(n),
					goalId: r.id,
					tick: e.tick,
					threatTick: e.tick
				}, this.team(n.team).directedShots++, this.emit(u, e, "directed-shot", n.team, [
					"verified-kick",
					"trajectory-crosses-goal-mouth",
					"finite-flight-horizon"
				], {
					player: n,
					goalId: r.id,
					shotQuality: te(e, r.id, n.team)
				})) : (this.shot = null, ee(e, n, this.policy.passWindowMs, this.policy.passMinTravelRadii) && (this.pass = {
					player: h(n),
					tick: e.tick,
					x: e.ball.x,
					y: e.ball.y,
					radius: e.ball.radius
				}));
			}
		}
		this.shot && (x(e, this.shot.goalId, this.policy.shotHorizonMs / 1e3) ? this.shot.threatTick = e.tick : this.shot = null);
		let d = this.controller, f = i.some((e) => e.kind === "kick"), p = e.players.filter((t) => Math.hypot(t.x - e.ball.x, t.y - e.ball.y) <= t.radius + e.ball.radius * (1 + this.policy.controlExtraRadii)), g = p.length === 1 && !f && Math.hypot(p[0].vx - e.ball.vx, p[0].vy - e.ball.vy) <= e.ball.radius * this.policy.controlRelativeSpeedRadii ? p[0] : void 0;
		return g ? ((!this.candidate || m(this.candidate.player) !== m(g.identity)) && (this.candidate = {
			player: h(g.identity),
			began: e.tick
		}), this.ms(e.tick - this.candidate.began) >= this.policy.controlHoldMs ? (this.controller = this.candidate.player, (!d || m(d) !== m(this.controller)) && this.establish(e, u)) : this.controller = null) : (this.controller = this.candidate = null, p.length > 1 && this.unknown.push("contested-control")), c && d && !this.controller && this.endReleasedControl(e, d, i, u), n > 0 && n <= this.policy.maxGapMs && (this.observedMs = pc(this.observedMs, n), this.controller && d && m(this.controller) === m(d) ? this.team(this.controller.team).controlledMs = pc(this.team(this.controller.team).controlledMs, n) : this.uncontrolledMs = pc(this.uncontrolledMs, n)), this.controller ? (this.lastController = {
			player: this.controller,
			tick: e.tick
		}, this.advanceAttack(e, u)) : this.attack && (this.attack.pressureSince = null), this.summarize(e, u), this.status = this.unknown.length ? "unknown" : "tracking", this.finish(u);
	}
	endReleasedControl(e, t, n, r) {
		let i = m(t);
		if (!n.some((t) => t.kind === "kick" && t.tick === e.tick && t.player && m(t.player) === i)) return;
		let a = e.players.find((e) => m(e.identity) === i);
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
		let i = e.goals.find((e) => e.id === r.goalId), a = i && d(i, e.ball);
		if (!a || a.across <= e.ball.radius || this.ms(e.tick - r.threatTick) > this.policy.maxGapMs || x(e, r.goalId, this.policy.shotHorizonMs / 1e3)) return;
		let o = e.players.find((e) => m(e.identity) === m(t))?.role === "goalkeeper" && a.across / a.length <= this.policy.saveAreaGoalWidths, s = o ? "goalkeeper-save" : "block";
		this.team(t.team)[o ? "saves" : "blocks"]++, this.emit(n, e, s, t.team, [
			"prior-directed-shot",
			"recent-goal-bound-trajectory",
			"verified-opponent-ball-contact",
			"trajectory-no-longer-goal-bound",
			...o ? ["explicit-goalkeeper-role", "inside-configured-save-area"] : []
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
		}), a && i && (this.team(n.team).turnoversWon++, this.emit(t, e, "turnover", n.team, ["previous-observed-opponent-control", "new-sustained-control"], {
			player: n,
			otherPlayer: i.player
		}), this.chain = {
			team: null,
			completed: 0,
			tick: -1
		}), this.pass && m(this.pass.player) !== m(n)) {
			let r = this.pass, i = Math.hypot(e.ball.x - r.x, e.ball.y - r.y) / r.radius;
			r.player.team === n.team && i >= this.policy.passMinTravelRadii ? (this.team(n.team).completedPasses++, this.lastPass = {
				from: r.player,
				to: h(n),
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
			let t = b(e, n.team);
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
		let i = e.goals.find((e) => e.id === n.goalId), a = i && d(i, e.ball);
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
		if (!this.policy.enabled || !e || !u(e.context) || e.streamId !== this.streamId || e.epoch !== this.epoch || !Number.isSafeInteger(e.sequence) || e.sequence <= this.confirmedSequence || !Number.isSafeInteger(e.tick) || e.tick < this.tick || e.kind === "goal" && e.tick !== this.tick) return [];
		this.confirmedSequence = e.sequence;
		let t = [];
		if (e.kind === "goal") {
			let n = this.lastPass, r = e.goal?.scorer;
			e.tick === this.tick && this.completeAtTick && e.context.phase !== "lobby" && e.goal && !e.goal.ownGoal && r && n && m(n.to) === m(r) && r.team === e.goal.team && n.from.team === e.goal.team && this.ms(e.tick - n.tick) <= this.policy.assistWindowMs && (this.team(r.team).confirmedAssists++, this.emit(t, e, "assist-confirmed", r.team, [
				"authoritative-goal",
				"confirmed-last-completed-pass-to-scorer",
				"no-intervening-other-player-contact",
				"assist-window"
			], {
				player: n.from,
				otherPlayer: r,
				confidence: "authoritative",
				metrics: { sincePassMs: this.ms(e.tick - n.tick) }
			})), this.clearContinuity();
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
			controller: this.controller ? h(this.controller) : null,
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
function bc(e, t) {
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
var xc = (e, t) => e.sessionId === t.sessionId && e.playerId === t.playerId && e.team === t.team, Sc = class {
	onFrame;
	intelligence;
	roles = [];
	sampled;
	discontinuous = !1;
	constructor(e = {}, t) {
		this.onFrame = t, this.intelligence = new yc(e, U);
	}
	configure(e) {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Invalid match intelligence policy");
		let t = this.intelligence.getPolicy(), n = dc(e, t);
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
		}), i = r.length !== this.roles.length || r.some((e) => !this.roles.some((t) => xc(t.player, e.player) && t.role === e.role));
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
		let o = Array(32);
		for (let e of r) Number.isInteger(e.slot) && e.slot >= 0 && e.slot < 32 && (o[e.slot] ??= e);
		return this.observe(e, t, n, (e) => {
			let t = o[e];
			return t ? i(t) : null;
		}, a);
	}
	observe(e, t, n, r, i) {
		if (!this.intelligence.getPolicy().enabled) return [];
		let a = e.data, o = [], s = this.sampled?.streamId === n && this.sampled.epoch === t && this.sampled.tick === e.tick, c = !s && e.ballContacts.length ? /* @__PURE__ */ new Map() : void 0;
		for (let t = 0; t < 32; t++) {
			let n = r(t);
			if (!n) continue;
			let i = e.index(t), s = i * 18, l = this.roles.find((e) => xc(e.player, n))?.role;
			c?.set(i, n), o.push({
				identity: { ...n },
				x: a[s],
				y: a[s + B.Y],
				vx: a[s + B.SPEED_X] * U,
				vy: a[s + B.SPEED_Y] * U,
				radius: a[s + B.RADIUS],
				...l ? { role: l } : {}
			});
		}
		this.roles.some((e) => !o.some(({ identity: t }) => xc(e.player, t))) && (this.roles = this.roles.filter((e) => o.some(({ identity: t }) => xc(e.player, t))));
		let l = !this.sampled || s || this.sampled.streamId === n && this.sampled.epoch === t && e.tick === this.sampled.tick + 1;
		this.sampled = {
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
				let e = o.disc * 18, t = o.kind === "disc" && o.disc > 0 && a[e + B.INVERSE_MASS] === 0 ? i.find((t) => [t.p0, t.p1].some((t) => Math.hypot(a[e] - t[0], a[e + B.Y] - t[1]) <= a[e + B.RADIUS])) : void 0;
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
		let d = !this.discontinuous && l && (s || e.ballContactsComplete);
		s || (this.discontinuous = !1);
		let f = {
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
				radius: a[B.RADIUS]
			},
			goals: i,
			players: o,
			contacts: u,
			contactsComplete: d
		}, p = this.intelligence.observe(f);
		return this.onFrame?.(f, p), p;
	}
}, Cc = class {
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
}, wc = {
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
}, Tc = class {
	peers = /* @__PURE__ */ new Map();
	allow(e, t, n = performance.now()) {
		let r = this.peers.get(e);
		r || (r = {}, this.peers.set(e, r));
		let { burst: i, perSecond: a } = wc[t], o = r[t] ?? {
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
}, Ec = 32768, Dc = 62258, Oc = 4, kc = 32, Ac = (e, t) => typeof e == "number" && Number.isInteger(e) && e >= 0 && e <= t, jc = (e) => Math.max(-32768, Math.min(32767, Math.round(e * Oc)));
function Mc(e) {
	return Ac(e.halfWidthQ, 65535) && Ac(e.halfHeightQ, 65535) && e.halfWidthQ !== 0 && e.halfHeightQ !== 0 && Ac(e.grassWidthQ, e.halfWidthQ) && Ac(e.grassHeightQ, e.halfHeightQ) && Ac(e.cornerQ, Math.min(e.grassWidthQ, e.grassHeightQ));
}
function Nc(e) {
	let { bg: t } = e, n = {
		halfWidthQ: Math.round((Math.max(e.width, t.width) + kc) * Oc),
		halfHeightQ: Math.round((Math.max(e.height, t.height) + kc) * Oc),
		grassWidthQ: Math.round(t.width * Oc),
		grassHeightQ: Math.round(t.height * Oc),
		cornerQ: Math.round(Math.min(t.cornerRadius ?? 0, t.width, t.height) * Oc)
	};
	if (!Mc(n)) throw Error("Invalid turf field");
	return n;
}
var Pc = (e, t) => e.halfWidthQ === t.halfWidthQ && e.halfHeightQ === t.halfHeightQ && e.grassWidthQ === t.grassWidthQ && e.grassHeightQ === t.grassHeightQ && e.cornerQ === t.cornerQ, Fc = (e) => [e.halfWidthQ / Oc, e.halfHeightQ / Oc];
function Ic(e, t, { grassWidthQ: n, grassHeightQ: r, cornerQ: i }) {
	let a = Math.abs(e), o = Math.abs(t);
	return a > n || o > r ? !1 : !(i > 0 && a > n - i && o > r - i && (a - n + i) ** 2 + (o - r + i) ** 2 > i ** 2);
}
function Lc(e, [t, n, r, i], a, o, s) {
	let { halfWidthQ: c, halfHeightQ: l } = s, u = Math.max(0, Math.floor((Math.min(t, r) - a + c) * 256 / (2 * c))), d = Math.min(255, Math.ceil((Math.max(t, r) + a + c) * 256 / (2 * c))), f = Math.max(0, Math.floor((Math.min(n, i) - a + l) * 128 / (2 * l))), p = Math.min(127, Math.ceil((Math.max(n, i) + a + l) * 128 / (2 * l)));
	if (d < u || p < f) return !1;
	let m = r - t, h = i - n, g = m * m + h * h;
	if (!g) return !1;
	let _ = Math.sqrt(g), v = a * a, y = !1;
	for (let r = f; r <= p; r++) {
		let i = (2 * r + 1 - 128) * l / 128;
		for (let a = u; a <= d; a++) {
			let l = (2 * a + 1 - 256) * c / 256;
			if (!Ic(l, i, s)) continue;
			let u = Math.max(0, Math.min(1, ((l - t) * m + (i - n) * h) / g)), d = l - t - m * u, f = i - n - h * u, p = d * d + f * f;
			if (p >= v) continue;
			let b = r * 256 + a, x = Math.round(_ * o * (1 - p / v) * (1 - e[b] / 65535) / 32);
			if (!x) continue;
			let ee = Math.min(Dc, e[b] + x);
			ee !== e[b] && (e[b] = ee, y = !0);
		}
	}
	return y;
}
var Rc = Ec * 3, zc = 102400, Bc = 1, Vc = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, Hc = (e, t) => Math.imul(e ^ t, 16777619);
function Uc(e) {
	let t = 2166136261;
	for (let n of e) t = Hc(t, n);
	return t >>> 0;
}
function Wc(e) {
	let t = 2166136261;
	for (let n of e) t = Hc(Hc(t, n & 255), n >>> 8);
	return t >>> 0;
}
function Gc(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return btoa(t);
}
function Kc(e, t, n) {
	if (typeof e != "string" || e.length > Math.ceil(t / 3) * 4 || !Vc.test(e)) throw Error(n);
	return Uint8Array.from(atob(e), (e) => e.charCodeAt(0));
}
function qc(e) {
	let t = Kc(e, Ec * 2, "Invalid turf payload");
	if (t.length !== 65536) throw Error("Invalid turf atlas length");
	let n = new DataView(t.buffer, t.byteOffset, t.byteLength), r = new Uint16Array(Ec);
	for (let e = 0; e < Ec; e++) if (r[e] = n.getUint16(e * 2, !0), r[e] > 62258) throw Error("Invalid turf wear");
	return r;
}
function Jc(e) {
	let t = Kc(e, zc, "Invalid turf surface payload");
	if (!t.length || t.length > zc) throw Error("Invalid turf surface length");
	let n = new Uint8Array(Rc), r = 0, i = !1, a = new rr((e, t) => {
		if (r + e.length > Rc) throw Error("Expanded turf surface exceeds size limit");
		n.set(e, r), r += e.length, i = t;
	});
	for (let e = 0; e < t.length; e += 256) a.push(t.subarray(e, e + 256), e + 256 >= t.length);
	if (!i || r !== Rc) throw Error("Invalid turf surface length");
	return n;
}
function Yc(e) {
	let t = new Uint8Array(Ec * 2), n = new DataView(t.buffer);
	for (let t = 0; t < Ec; t++) n.setUint16(t * 2, e.atlas[t], !0);
	let r = {
		type: "turf-checkpoint",
		version: Bc,
		generation: e.generation,
		...e.field,
		digest: e.digest,
		atlas: Gc(t)
	};
	if (e.surfaceRgb) {
		let t = nr(e.surfaceRgb, { level: 1 });
		if (t.length > zc) throw Error("Compressed turf surface exceeds size limit");
		r.surface = Gc(t), r.surfaceDigest = Uc(e.surfaceRgb);
	}
	return r;
}
function Xc(e) {
	if (!e || typeof e != "object") throw Error("Invalid turf checkpoint");
	let t = e, n = {
		halfWidthQ: t.halfWidthQ,
		halfHeightQ: t.halfHeightQ,
		grassWidthQ: t.grassWidthQ,
		grassHeightQ: t.grassHeightQ,
		cornerQ: t.cornerQ
	};
	if (t.type !== "turf-checkpoint" || t.version !== Bc || !Ac(t.generation, 4294967295) || !Mc(n) || !Ac(t.digest, 4294967295)) throw Error("Invalid turf checkpoint");
	let r = qc(t.atlas);
	if (Wc(r) !== t.digest) throw Error("Turf checksum mismatch");
	if (t.surface === void 0 != (t.surfaceDigest === void 0)) throw Error("Invalid turf surface envelope");
	let i;
	if (t.surface !== void 0) {
		if (!Ac(t.surfaceDigest, 4294967295)) throw Error("Invalid turf surface checksum");
		if (i = Jc(t.surface), Uc(i) !== t.surfaceDigest) throw Error("Turf surface checksum mismatch");
	}
	return {
		field: n,
		generation: t.generation,
		digest: t.digest,
		atlas: r,
		surfaceRgb: i
	};
}
var Zc = 6, Qc = 33, $c = 31, el = 255, tl = {
	halfWidthQ: 0,
	halfHeightQ: 0,
	grassWidthQ: 0,
	grassHeightQ: 0,
	cornerQ: 0
}, nl = (e) => Math.min(Dc, Math.round(e * 65535 / 255)), rl = class {
	atlas = new Uint16Array(Ec);
	image = new Uint8Array(Ec);
	surfaceRgb;
	surfaceImage = new Uint8Array(Ec * 4);
	surfaceDirty = !0;
	imageDirty = !0;
	digestDirty = !0;
	digestValue = 0;
	previous = /* @__PURE__ */ new Map();
	stadium;
	lastTick = -1;
	lastElapsed = -1;
	lastPhase = "lobby";
	bounds = tl;
	generation = 0;
	revision = 0;
	field = [0, 0];
	get digest() {
		return this.digestDirty &&= (this.digestValue = Wc(this.atlas), !1), this.digestValue;
	}
	get hasPressure() {
		let e = this.surfaceRgb;
		if (!e) return !1;
		for (let t = 0; t < Rc; t += 3) if (e[t] !== 0) return !0;
		return !1;
	}
	pixels() {
		if (this.imageDirty) {
			for (let e = 0; e < Ec; e++) this.image[e] = Math.round(this.atlas[e] * 255 / 65535);
			this.imageDirty = !1;
		}
		return this.image;
	}
	surfacePixels() {
		if (this.surfaceDirty || this.imageDirty) {
			let e = this.pixels(), t = this.surfaceRgb;
			for (let n = 0; n < Ec; n++) {
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
		this.atlas.fill(0), this.surfaceRgb = void 0, this.previous.clear(), this.generation = this.generation + 1 >>> 0, this.bounds = e, this.field = Fc(e), this.changed();
	}
	startsOver(e, t) {
		return this.stadium !== e.stadium || this.lastTick > e.tick || this.lastElapsed > 0 && e.elapsed < this.lastElapsed || e.phase === "lobby" && this.lastPhase !== "lobby" || !Pc(this.bounds, t);
	}
	capture(e) {
		let t = e.stadium, n = Nc(t);
		if (this.startsOver(e, n) && this.reset(n), this.stadium = t, this.lastTick = e.tick, this.lastElapsed = e.elapsed, this.lastPhase = e.phase, e.phase !== "playing" || e.paused || e.resumeTicks || t.bg.type !== "grass") {
			this.previous.clear();
			return;
		}
		e.tick % Zc === 0 && this.sampleBodies(e.data);
	}
	sampleBodies(e) {
		let t = /* @__PURE__ */ new Set(), n = 0;
		for (let r = 0; r < e.length / 18; r++) {
			let i = r * 18;
			if (r !== 0 && (!e[i + B.PLAYER_SLOT] || e[i + B.TEAM] === 0)) continue;
			let a = e[i + B.X], o = e[i + B.Y], s = e[i + B.RADIUS];
			if (!Number.isFinite(a) || !Number.isFinite(o) || !Number.isFinite(s)) continue;
			t.add(r);
			let c = this.previous.get(r);
			if (c && n < Qc) {
				let e = Math.hypot(a - c[0], o - c[1]);
				if (e > .1 && e < 60) {
					n++;
					let e = [
						jc(c[0]),
						jc(c[1]),
						jc(a),
						jc(o)
					], t = Math.max(1, Math.min(96, Math.round(Math.max(3.5, s * .78) * 4))), i = r === 0 ? $c : el;
					Lc(this.atlas, e, t, i, this.bounds) && this.changed();
				}
			}
			this.previous.set(r, [a, o]);
		}
		for (let e of this.previous.keys()) t.has(e) || this.previous.delete(e);
	}
	seed(e) {
		if (!(e instanceof Uint8Array) || e.length !== 32768) throw Error("Invalid turf seed");
		for (let t = 0; t < Ec; t++) this.atlas[t] = nl(e[t]);
		this.surfaceRgb = void 0, this.changed();
	}
	seedSurface(e) {
		if (!(e instanceof Uint8Array) || e.length !== 131072) throw Error("Invalid turf surface seed");
		let t = new Uint8Array(Rc);
		for (let n = 0; n < Ec; n++) {
			let r = n * 4, i = n * 3;
			t[i] = e[r], t[i + 1] = e[r + 1], t[i + 2] = e[r + 2], this.atlas[n] = nl(e[r + 3]);
		}
		this.surfaceRgb = t, this.changed();
	}
	checkpoint() {
		if (!this.bounds.halfWidthQ || !this.bounds.halfHeightQ) throw Error("Turf field is not initialized");
		return Yc({
			field: this.bounds,
			generation: this.generation,
			digest: this.digest,
			atlas: this.atlas,
			surfaceRgb: this.surfaceRgb
		});
	}
	restore(e) {
		let t = Xc(e);
		this.generation > t.generation && this.generation - t.generation < 2147483648 || (this.atlas = t.atlas, this.surfaceRgb = t.surfaceRgb, this.generation = t.generation, this.bounds = t.field, this.field = Fc(t.field), this.previous.clear(), this.changed(), this.digestValue = t.digest, this.digestDirty = !1);
	}
}, il = class {
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
		return yo(this.players, e, t);
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
}, al = Object.freeze([]), ol = class {
	engine;
	runtime;
	hooks;
	xg;
	players = new il();
	match;
	inputs;
	traffic = new Tc();
	soundStream = new Ps();
	factStream = new Ls();
	commentary = new cc();
	commentaryAnalysis = new Xt();
	intelligence = new Sc();
	kickEstimates = al;
	intelligenceEvents = [];
	playerRetirements = new Cc();
	turfState = new rl();
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
	constructor(e, t, n, r, i = new mn()) {
		this.engine = e, this.runtime = t, this.hooks = n, this.xg = i, this.match = new ks(e, r), this.inputs = new es(this.match), this.xg.resetForStadium(e);
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
		let r = this.engine.kickRate;
		if (this.match.command(e, t, n), e === "kickRate" && this.engine.kickRate !== r && this.xg.invalidate("domain-change"), [
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
		return t.length && (this.broadcastState(), Rs(this.network, t)), t;
	}
	notifyCommentary(e) {
		let t = this.intelligenceEvents, n = this.kickEstimates;
		this.intelligenceEvents = [], this.kickEstimates = al;
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
		bc(this.network, [r]), this.invoke("onMatchIntelligenceEvent", this.hooks.onMatchIntelligenceEvent, structuredClone(r));
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
		this.kickEstimates = this.xg.active ? this.xg.capture(this.engine, this.xgContext()) : al;
	}
	captureIntelligence(e) {
		let t = [...this.intelligence.observePlayers(this.engine, this.epoch, this.factStream.streamId, this.players.all, (e) => e.team === 0 ? null : {
			sessionId: this.factStream.streamId,
			playerId: e.id,
			team: e.team,
			name: e.name
		}, this.commentaryAnalysis.getAnalysisGeometry(this.engine)), ...this.intelligence.confirm(e)];
		bc(this.network, t), this.intelligenceEvents = t;
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
		return Zt(this.network, e), e;
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
		let t = this.engine.index(e.slot) * 18, n = !this.closed && this.engine.phase !== "lobby" && this.engine.data[t + B.TEAM] > 0, { slot: r, avatarOverride: i, ...a } = e;
		return {
			...a,
			muted: !!e.muted,
			avatar: e.avatarOverride ?? e.avatar ?? null,
			position: n ? {
				x: this.engine.data[t],
				y: this.engine.data[t + B.Y]
			} : null,
			input: this.engine.data[t + B.INPUT]
		};
	}
	publicOrNull(e) {
		return e ? this.publicPlayer(e) : null;
	}
};
function sl(e) {
	return /^(?:[0-9a-f]{10}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(e) ? e.toLowerCase() : null;
}
function cl(e) {
	let t = sl(e);
	if (!t) throw Error("Invalid room code");
	return `/r/${t}`;
}
ba({ password: /* @__PURE__ */ ha() }), ba({
	password: /* @__PURE__ */ ha(),
	verifier: /* @__PURE__ */ ha()
}), ba({ verifier: /* @__PURE__ */ ha() }), ba({ verified: /* @__PURE__ */ oa() });
var ll = /* @__PURE__ */ X({ error: /* @__PURE__ */ $(/* @__PURE__ */ Q(), /* @__PURE__ */ Yi(300), /* @__PURE__ */ Ki((e) => e.trim() !== ""), /* @__PURE__ */ Ki((e) => !/[<>]/.test(e)), /* @__PURE__ */ Ki((e) => !/[\u0000-\u001f\u007f]/.test(e))) });
async function ul(e, t, n) {
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
var dl = 2048, fl = class extends Error {
	status;
	retryAfterSeconds;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.retryAfterSeconds = n, this.name = "RoomAdmissionError";
	}
};
async function pl(e, t) {
	let n = `Room creation failed (${e.status})`, r = e.status === 429 ? e.headers.get("Retry-After") : null, i = r && /^\d+$/.test(r) && Number.isSafeInteger(Number(r)) ? Number(r) : null, a = (t) => new fl(t, e.status, i), o = e.body;
	if (!o) return a(n);
	try {
		if (t.throwIfAborted(), e.status < 400 || e.status >= 500 || e.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return a(n);
		let r = await ul(o, dl, t);
		if (!r.ok) return t.throwIfAborted(), a(n);
		let i = /* @__PURE__ */ _a(ll, JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r.bytes)));
		return i.success ? a(`${i.output.error.trim()} (${e.status})`) : a(n);
	} catch {
		return t.throwIfAborted(), a(n);
	} finally {
		o.cancel().catch(() => {});
	}
}
function ml(e) {
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
var hl = (e, t) => /* @__PURE__ */ $(/* @__PURE__ */ Q(t), /* @__PURE__ */ Ki((t) => !!t.trim() && t.length <= e, t)), gl = (e) => /* @__PURE__ */ Z(/* @__PURE__ */ oa(`Invalid ${e} setting: expected a boolean`)), _l = "maxPlayers must be an integer between 2 and 32", vl = /* @__PURE__ */ $(/* @__PURE__ */ X({
	roomName: hl(64, "Room name must contain 1–64 characters"),
	public: gl("public"),
	noPlayer: gl("noPlayer"),
	maxPlayers: /* @__PURE__ */ Z(/* @__PURE__ */ $(/* @__PURE__ */ la(_l), /* @__PURE__ */ Ji(_l), /* @__PURE__ */ Qi(2, _l), /* @__PURE__ */ Xi(32, _l))),
	password: /* @__PURE__ */ Z(/* @__PURE__ */ $(/* @__PURE__ */ Q("Password must be a string of at most 64 characters"), /* @__PURE__ */ Yi(64, "Password must be a string of at most 64 characters"))),
	stadium: /* @__PURE__ */ Z(/* @__PURE__ */ Q("Stadium must be a Ball2D stadium source string")),
	playerName: /* @__PURE__ */ Z(/* @__PURE__ */ ha()),
	geo: /* @__PURE__ */ Z(/* @__PURE__ */ ha())
}), /* @__PURE__ */ Ki((e) => e.noPlayer !== !1 || e.playerName === void 0 || /* @__PURE__ */ ia(hl(24, ""), e.playerName), "Invalid host player name")), yl = new Set(Object.keys(vl.pipe[0].entries));
function bl(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	for (let t of Object.keys(e)) {
		if (t === "token") throw Error("External service tokens are not supported. Ball2D join verification is configured on the room.");
		if (!yl.has(t)) throw Error(`Unknown room setting: ${t}`);
	}
	let t = /* @__PURE__ */ _a(vl, e, { abortEarly: !0 });
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
		...n.geo === void 0 ? {} : { geo: ml(n.geo) }
	};
}
function xl(e) {
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
var Sl = 12e3;
function Cl(e) {
	if (e.noPlayer !== void 0 && typeof e.noPlayer != "boolean") throw Error("Invalid noPlayer setting");
	if (e.noPlayer !== !1) return null;
	let t = e.playerName ?? "Host";
	if (typeof t != "string" || !t.trim() || t.length > 24) throw Error("Invalid host player name");
	return t.trim();
}
function wl(e, t, n, r, i, a) {
	let o;
	return {
		ready: new Promise((s, c) => {
			o = setTimeout(() => c(Error("Signaling timed out")), Sl), e.network = new qa(n.id, { hostToken: n.hostToken }, {
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
async function Tl(e, t, n, r) {
	let i = dr(t.network.serviceOrigin), a = dr(t.publicOrigin ?? i), o = bl(e), s = Cl(o), c = xl(n), l;
	try {
		c.signal.throwIfAborted();
		let e = await c.run(t.loadEngine(c.signal));
		e.load(o.stadium ?? ke());
		let n = r.construct(e);
		l = n;
		let u = r.core(n), d = await c.run(t.request(new URL(ur.rooms, i), {
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
		if (!d.ok) throw await c.run(pl(d, c.signal));
		let f = await c.run(d.json());
		u.roomId = f.id, u.roomName = o.roomName, u.roomLink = `${a}${cl(f.id)}`;
		let p = wl(u, r.gateway(n), f, s, t, () => r.close(n));
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
var El = 32768;
function Dl(e, t, n, r) {
	let i = [...e.peers.values()].filter((e) => e.fast?.readyState === "open" && e.fast.bufferedAmount < El);
	if (!i.length) return;
	let a = xi(t, i.map((e) => r.acknowledgment(e.id)), n);
	for (let t = 0; t < i.length; t++) {
		let n = i[t], r = a[t], o = r.reduce((e, t) => e + t.byteLength, 0);
		if (!(n.fast?.readyState !== "open" || n.fast.bufferedAmount + o > El)) for (let t of r) e.fast(n, t);
	}
}
var Ol = 1e3 / U, kl = 500, Al = 32, jl = U / 30;
function Ml(e) {
	let { engine: t } = e, n = t.red, r = t.blue, i = t.phase;
	e.match.step(), e.turfState.capture(t), e.soundStream.capture(t, e.epoch);
	let a = {
		kickers: t.ballKicks.map((t) => {
			let n = e.players.bySlot(t);
			return n ? e.publicPlayer(n) : null;
		}).filter((e) => !!e),
		redGoal: t.red > n,
		blueGoal: t.blue > r,
		positionsReset: i === "goal" && t.phase === "playing",
		stopped: i === "finished" && t.phase === "lobby",
		victory: i !== "finished" && t.phase === "finished" ? Gr(e) : null
	}, o = e.captureCommentary();
	t.phase !== i && !o.length && e.broadcastState();
	let s = e.captureAnalysis();
	e.captureIntelligence(o), e.captureXg(), e.notifyCommentary(o);
	for (let t of s) e.invoke("onMatchObservation", e.hooks.onMatchObservation, structuredClone(t));
	return a;
}
var Nl = class {
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
		this.last = t, n > kl && e.engine.phase === "playing" && !e.engine.paused && (Vr(e, !0, null), e.report("Host scheduler stalled; match paused.")), this.accumulator += Math.max(0, Math.min(n, kl));
		let r = 0;
		try {
			for (; !e.closed && this.accumulator >= Ol && r++ < Al && (this.tick(t), !e.closed);) this.accumulator -= Ol;
			e.closed || Fs(e.network, e.soundStream.drain(t));
		} catch (t) {
			e.closed || (e.engine.setPaused(!0), e.report(String(t)));
		}
	}
	tick(e) {
		let { room: t } = this, { engine: n, hooks: r } = t;
		for (let n of t.players.all) t.inputs.expire(n.peerId, n.slot, e);
		if (t.match.checkRecordingLimit(), t.closed || (n.phase !== "lobby" && !n.paused && !n.resumeTicks && t.invoke("onGameTick", r.onGameTick), t.closed)) return;
		let i = Ml(t);
		i.stopped && t.invoke("onGameStop", r.onGameStop, null), i.victory && (t.invoke("onTeamVictory", r.onTeamVictory, { ...i.victory }), t.invoke("onGameVictory", r.onGameVictory, { ...i.victory }));
		for (let e of i.kickers) t.invoke("onPlayerBallKick", r.onPlayerBallKick, e);
		i.redGoal && t.invoke("onTeamGoal", r.onTeamGoal, 1), i.blueGoal && t.invoke("onTeamGoal", r.onTeamGoal, 2), i.positionsReset && t.invoke("onPositionsReset", r.onPositionsReset), !t.closed && n.tick % jl === 0 && Dl(t.network, n.snapshot(), t.epoch, t.inputs);
	}
}, Pl = Object.freeze({ ...Me }), Fl = (e) => new Blob([sr(e)], { type: "application/x-ball2d-replay" }), Il = class e {
	engine;
	core;
	loop;
	timer;
	linkNotification;
	closeController = new AbortController();
	signal = this.closeController.signal;
	gateway;
	lastRecording = null;
	constructor(e, t, n) {
		this.engine = e, this.core = new ol(e, t, this, (e, t) => {
			let n = Fl(e);
			this.lastRecording = n, this.core.invoke("onRecordingComplete", this.onRecordingComplete, n, t);
		}, n), this.loop = new Nl(this.core), this.gateway = $o(this.core);
	}
	static async create(t, n = Dr(), r, i = {}) {
		let a = new mn(i);
		return Tl(t, n, r, {
			construct: (t) => new e(t, n, a),
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
		return Pl;
	}
	getPlayerList() {
		return this.core.players.all.map((e) => this.core.publicPlayer(e));
	}
	getPlayer(e) {
		return this.core.publicOrNull(this.core.players.byId(e) ?? null);
	}
	getScores() {
		return Gr(this.core);
	}
	getBallPosition() {
		return Rr(this.core);
	}
	getDiscCount() {
		return jr(this.core);
	}
	getDiscProperties(e) {
		return Nr(this.core, e);
	}
	getPlayerDiscProperties(e) {
		return Ir(this.core, e);
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
		this.core.assertOpen(), this.core.commentary.configure(e), this.core.network.broadcast({
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
		Oo(this.core, e, t, n, r);
	}
	reorderPlayers(e, t) {
		ko(this.core, e, t);
	}
	setPlayerAvatar(e, t) {
		Ao(this.core, e, t);
	}
	setPlayerTeam(e, t) {
		Co(this.core, e, t, null);
	}
	setPlayerAdmin(e, t) {
		wo(this.core, e, t);
	}
	setPlayerMuted(e, t) {
		To(this.core, e, t, null);
	}
	setTeamsLock(e) {
		Eo(this.core, e, null);
	}
	kickPlayer(e, t = "Removed by host", n = !1) {
		if (this.core.assertOpen(), typeof n != "boolean") throw Error("Invalid ban flag");
		if (n) return Za(this.core, e, t);
		Xa(this.core, e, t, null);
	}
	clearBan(e) {
		return Qa(this.core, e);
	}
	clearBans() {
		return $a(this.core);
	}
	sendChat(e, t) {
		Xr(this.core, e, t);
	}
	sendAnnouncement(e, t, n, r, i) {
		Zr(this.core, e, t, n, r, i);
	}
	startGame() {
		zr(this.core, null);
	}
	stopGame() {
		Br(this.core, null);
	}
	pauseGame(e) {
		Vr(this.core, e, null);
	}
	setKickRateLimit(e = 2, t = 0, n = 0) {
		Hr(this.core, e, t, n, null);
	}
	setScoreLimit(e) {
		Ur(this.core, e);
	}
	setTimeLimit(e) {
		Wr(this.core, e);
	}
	async setPassword(e) {
		this.core.assertOpen(), await this.core.network.setPassword(e);
	}
	async setRequireVerification(e) {
		this.core.assertOpen(), await this.core.network.setRequireVerification(e);
	}
	setDefaultStadium(e) {
		return Mo(this.core, e);
	}
	setCustomStadium(e) {
		jo(this.core, e, null);
	}
	setDiscProperties(e, t) {
		Pr(this.core, e, t);
	}
	setPlayerDiscProperties(e, t) {
		Lr(this.core, e, t);
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
		return e ? Fl(e) : null;
	}
	close() {
		let { core: e } = this;
		if (!e.closed) {
			e.closed = !0, e.xg.close(), e.inputs.close(), this.closeController.abort();
			try {
				e.match.close();
			} finally {
				clearInterval(this.timer), clearTimeout(this.linkNotification), this.linkNotification = void 0, e.network?.close(), e.players.clear(), e.intelligence.reset(), e.intelligence.setRoles([], () => null), e.traffic.clear();
			}
		}
	}
};
function Ll(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Room configuration must be an object");
	let t = { ...e }, n = t.maxPlayers ?? 12;
	if (typeof n != "number" || !Number.isFinite(n) || !Number.isInteger(n)) throw Error("maxPlayers must be a finite integer");
	return bl({
		...t,
		roomName: t.roomName ?? "Headless Room",
		playerName: t.playerName ?? "Host",
		noPlayer: t.noPlayer ?? !1,
		public: t.public ?? !1,
		maxPlayers: Math.max(2, Math.min(30, n)),
		password: t.password ?? ""
	});
}
var Rl = class {
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
}, zl = /* @__PURE__ */ "sendChat.sendAnnouncement.setPlayerAdmin.setPlayerMuted.setPlayerTeam.kickPlayer.clearBan.clearBans.setScoreLimit.setTimeLimit.setCustomStadium.setDefaultStadium.setTeamsLock.setTeamColors.startGame.stopGame.pauseGame.setPassword.setRequireVerification.reorderPlayers.setKickRateLimit.setPlayerAvatar.setDiscProperties.setPlayerDiscProperties.setMatchXgConfig.setCommentaryPolicy.setMatchIntelligencePolicy.setMatchIntelligenceRoles.setPlayerCommentaryContext.setCommentaryGeometry.setCommentaryCatalog.setAtmospherePolicy.setAtmospherePack".split(".");
function Bl(e, t) {
	let n = Object.create(null);
	t && Object.defineProperty(n, "closed", {
		enumerable: !0,
		value: t
	});
	let r = new Rl((t) => {
		let n = e.onError?.(String(t));
		n instanceof Promise && n.catch(() => {});
	});
	e.signal.addEventListener("abort", () => r.close(), { once: !0 }), e.signal.aborted && r.close();
	for (let t of zl) Object.defineProperty(n, t, {
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
		"getPlayerCommentaryContext",
		"getCommentaryGeometry",
		"getCommentaryCatalog",
		"getAtmospherePolicy",
		"getAtmospherePack",
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
	for (let t of /* @__PURE__ */ "onRoomLink.onMatchKickEstimate.onMatchFact.onMatchIntelligenceEvent.onMatchObservation.onPlayerJoin.onPlayerLeave.onPlayerChat.onPlayerDirectChat.onPlayerTeamChange.onPlayerAdminChange.onPlayerMuteChange.onPlayerKicked.onPlayerActivity.onPlayerInput.onPlayerBallKick.onTeamGoal.onTeamVictory.onGameVictory.onGameStart.onGameStop.onGameTick.onGamePause.onGameUnpause.onGamePauseChange.onPositionsReset.onStadiumChange.onTeamsLockChange.onKickRateLimitSet.onRecordingComplete.onError".split(".")) {
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
function Vl(e) {
	return Os(e);
}
function Hl(e) {
	if (typeof e != "string") throw TypeError("Stadium source must be a string");
	let t = mt(e);
	return Object.freeze({
		name: t.name,
		canBeStored: t.canBeStored,
		warnings: Object.freeze([...t.warnings])
	});
}
async function Ul(e = {}, t = {}) {
	return Bl(await Il.create(Ll(e), void 0, t.signal, t.matchXgTrust));
}
export { fl as RoomAdmissionError, Ul as createRoom, Vl as readReplay, Hl as validateStadium };
