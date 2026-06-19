(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        i(s);
    new MutationObserver(s => {
        for (const a of s)
            if (a.type === "childList")
                for (const r of a.addedNodes)
                    r.tagName === "LINK" && r.rel === "modulepreload" && i(r)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(s) {
        const a = {};
        return s.integrity && (a.integrity = s.integrity),
        s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials" ? a.credentials = "include" : s.crossOrigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin",
        a
    }
    function i(s) {
        if (s.ep)
            return;
        s.ep = !0;
        const a = n(s);
        fetch(s.href, a)
    }
}
)();
let B = null;
function L() {
    if (!B)
        try {
            B = new (window.AudioContext || window.webkitAudioContext)
        } catch {
            return null
        }
    return B.state === "suspended" && B.resume(),
    B
}
function T({type: e="sine", freq: t, gain: n=.18, start: i=0, dur: s=.18, rampDown: a=!0, vibrato: r=0}={}) {
    const d = L();
    if (!d)
        return;
    const u = d.createOscillator()
      , g = d.createGain();
    if (u.type = e,
    u.frequency.setValueAtTime(t, d.currentTime + i),
    r > 0) {
        const c = d.createOscillator()
          , h = d.createGain();
        c.frequency.value = 5,
        h.gain.value = r,
        c.connect(h),
        h.connect(u.frequency),
        c.start(d.currentTime + i),
        c.stop(d.currentTime + i + s + .05)
    }
    g.gain.setValueAtTime(0, d.currentTime + i),
    g.gain.linearRampToValueAtTime(n, d.currentTime + i + .02),
    a && g.gain.exponentialRampToValueAtTime(1e-4, d.currentTime + i + s),
    u.connect(g),
    g.connect(d.destination),
    u.start(d.currentTime + i),
    u.stop(d.currentTime + i + s + .05)
}
function Te({filterFreq: e=800, gain: t=.12, start: n=0, dur: i=.2}={}) {
    const s = L();
    if (!s)
        return;
    const a = Math.floor(s.sampleRate * (i + .1))
      , r = s.createBuffer(1, a, s.sampleRate)
      , d = r.getChannelData(0);
    for (let h = 0; h < a; h++)
        d[h] = Math.random() * 2 - 1;
    const u = s.createBufferSource()
      , g = s.createBiquadFilter()
      , c = s.createGain();
    u.buffer = r,
    g.type = "bandpass",
    g.frequency.value = e,
    g.Q.value = 1.5,
    c.gain.setValueAtTime(0, s.currentTime + n),
    c.gain.linearRampToValueAtTime(t, s.currentTime + n + .01),
    c.gain.exponentialRampToValueAtTime(1e-4, s.currentTime + n + i),
    u.connect(g),
    g.connect(c),
    c.connect(s.destination),
    u.start(s.currentTime + n),
    u.stop(s.currentTime + n + i + .1)
}
function F() {
    const e = L();
    if (!e)
        return;
    const t = e.createOscillator()
      , n = e.createGain();
    t.type = "triangle",
    t.frequency.setValueAtTime(320, e.currentTime),
    t.frequency.exponentialRampToValueAtTime(180, e.currentTime + .18),
    n.gain.setValueAtTime(0, e.currentTime),
    n.gain.linearRampToValueAtTime(.14, e.currentTime + .02),
    n.gain.exponentialRampToValueAtTime(1e-4, e.currentTime + .22),
    t.connect(n),
    n.connect(e.destination),
    t.start(e.currentTime),
    t.stop(e.currentTime + .25);
    const i = e.createOscillator()
      , s = e.createGain();
    i.type = "triangle",
    i.frequency.setValueAtTime(280, e.currentTime + .28),
    i.frequency.exponentialRampToValueAtTime(160, e.currentTime + .46),
    s.gain.setValueAtTime(0, e.currentTime + .28),
    s.gain.linearRampToValueAtTime(.1, e.currentTime + .3),
    s.gain.exponentialRampToValueAtTime(1e-4, e.currentTime + .5),
    i.connect(s),
    s.connect(e.destination),
    i.start(e.currentTime + .28),
    i.stop(e.currentTime + .55),
    Te({
        filterFreq: 600,
        gain: .08,
        start: .18,
        dur: .14
    })
}
function Ee() {
    L() && (T({
        type: "sine",
        freq: 200,
        gain: .12,
        start: 0,
        dur: .06
    }),
    T({
        type: "triangle",
        freq: 1200,
        gain: .06,
        start: .04,
        dur: .1
    }))
}
function ke() {
    F()
}
function $e() {
    if (!L())
        return;
    [{
        f: 392,
        t: 0,
        d: .3
    }, {
        f: 329.6,
        t: .3,
        d: .2
    }, {
        f: 392,
        t: .5,
        d: .2
    }, {
        f: 523.3,
        t: .7,
        d: .3
    }, {
        f: 392,
        t: 1,
        d: .2
    }, {
        f: 523.3,
        t: 1.2,
        d: .2
    }, {
        f: 659.3,
        t: 1.4,
        d: .2
    }, {
        f: 784,
        t: 1.6,
        d: .5
    }].forEach( ({f: n, t: i, d: s}) => {
        T({
            type: "sine",
            freq: n,
            gain: .13,
            start: i,
            dur: s,
            vibrato: 3
        }),
        T({
            type: "triangle",
            freq: n * 1.5,
            gain: .04,
            start: i,
            dur: s * .8
        })
    }
    ),
    setTimeout( () => F(), 2e3),
    setTimeout( () => F(), 2600),
    setTimeout( () => F(), 3100)
}
function Q() {
    T({
        type: "sine",
        freq: 600,
        gain: .07,
        start: 0,
        dur: .08
    })
}
function Me() {
    T({
        type: "sine",
        freq: 880,
        gain: .09,
        start: 0,
        dur: .18,
        vibrato: 4
    }),
    T({
        type: "sine",
        freq: 1100,
        gain: .05,
        start: .16,
        dur: .2,
        vibrato: 4
    })
}
function ee() {
    L()
}
const A = {
    green: {
        body: "#7FC9A0",
        belly: "#D8F5E2",
        outline: "#3a7a3a",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    },
    blue: {
        body: "#BFE0F2",
        belly: "#DCF0FA",
        outline: "#4a78a8",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    },
    rainbow: [{
        body: "#FFE066",
        belly: "#FFF4AA",
        outline: "#bb8800",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    }, {
        body: "#7FC9A0",
        belly: "#D8F5E2",
        outline: "#3a7a3a",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    }, {
        body: "#BFE0F2",
        belly: "#DCF0FA",
        outline: "#4a78a8",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    }, {
        body: "#FFB3C6",
        belly: "#FFD4E0",
        outline: "#aa3060",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    }, {
        body: "#FFB347",
        belly: "#FFD090",
        outline: "#cc6600",
        eye: "#1a6be8",
        eyeWhite: "#fff"
    }]
}
  , ae = [{
    id: "teeth",
    icon: "🦷",
    name: "Escovar dentes"
}, {
    id: "bath",
    icon: "🛁",
    name: "Tomar banho"
}, {
    id: "toys",
    icon: "🧸",
    name: "Guardar brinquedos"
}, {
    id: "homework",
    icon: "📚",
    name: "Fazer tarefa"
}, {
    id: "snack",
    icon: "🍪",
    name: "Hora do lanche"
}, {
    id: "play",
    icon: "🎮",
    name: "Brincar"
}];
function M() {
    return o.customTasks || ae
}
function re(e) {
    document.querySelectorAll(".tab-panel").forEach(i => i.classList.remove("active")),
    document.querySelectorAll(".tab-btn").forEach(i => i.classList.remove("active"));
    const t = document.getElementById(`tab-${e}`)
      , n = document.querySelector(`.tab-btn[data-tab="${e}"]`);
    t && t.classList.add("active"),
    n && n.classList.add("active"),
    o.activeTab = e,
    f(),
    e === "estrelas" && V()
}
const _ = ["Você está indo muito bem! 🐸", "Falta só um pouquinho!", "O sapinho está torcendo por você!", "Excelente trabalho! ⭐", "Continue assim, você consegue!", "Cada minuto é uma vitória! 🎉", "Quase lá! O lago está te esperando!", "Você é incrível! 💚"]
  , te = ["Croac! Croac! 🐸", "Que dia lindo no lago!", "Adoro morar aqui!", "Vamos conseguir juntos!", "Você consegue!", "Estou torcendo por você!", "O lago é minha casinha!", "Que delícia de sol hoje!", "Croac! Croac!"]
  , ce = {
    totalMinutes: 5,
    frogColor: "green",
    activeTab: "timer",
    nightMode: !1,
    showSeconds: !1,
    showProgress: !1,
    vibration: !1,
    soundEffects: !0,
    reduceMotion: !1,
    highContrast: !1,
    totalFliesEaten: 0,
    stars: [],
    rotinaPeriod: "morning",
    rotinaHistory: {},
    rotinaToday: {},
    pdPrimeiro: null,
    pdDepois: null,
    objetivos: [null, null, null],
    logDiario: [],
    customTasks: null
};
let o = {
    ...ce
};
const le = "sapo_do_tempo_v1";
function Le() {
    try {
        const e = localStorage.getItem(le);
        if (e) {
            const t = JSON.parse(e);
            o = {
                ...ce,
                ...t
            },
            gt()
        }
    } catch {}
}
function f() {
    try {
        localStorage.setItem(le, JSON.stringify(o))
    } catch {}
}
let p = !1
  , x = !1
  , y = 0
  , E = 0
  , P = 0
  , k = 0
  , D = null
  , de = null
  , q = 0
  , m = []
  , S = null
  , ne = -1
  , I = null;
function xe(e, t) {
    const n = `f${t}`
      , {body: i, belly: s, outline: a, eye: r, eyeWhite: d} = e
      , u = o.highContrast
      , g = o.nightMode
      , c = u ? g ? "#fff" : "#111" : i
      , h = u ? g ? "#ccc" : "#444" : s
      , l = u ? g ? "#aaa" : "#000" : a
      , X = u ? g ? "#888" : "#333" : r;
    return `<svg viewBox="0 0 100 102" xmlns="http://www.w3.org/2000/svg" overflow="visible">
  <defs>
    <radialGradient id="bg${n}" cx="38%" cy="28%" r="62%">
      <stop offset="0%" stop-color="${u ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.28)"}"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>

  <!-- Sombra -->
  <ellipse cx="50" cy="100" rx="22" ry="4" fill="rgba(0,0,0,0.18)"/>

  <!-- Pernas traseiras -->
  <path d="M 26 84 Q 10 80 6 91 Q 4 99 14 99 Q 22 99 27 91"
        fill="${c}" stroke="${l}" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="5"  cy="95" r="3.2" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="10" cy="99" r="3.2" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="16" cy="101" r="3.2" fill="${c}" stroke="${l}" stroke-width="1.2"/>

  <path d="M 74 84 Q 90 80 94 91 Q 96 99 86 99 Q 78 99 73 91"
        fill="${c}" stroke="${l}" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="95" cy="95"  r="3.2" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="90" cy="99"  r="3.2" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="84" cy="101" r="3.2" fill="${c}" stroke="${l}" stroke-width="1.2"/>

  <!-- Corpo -->
  <ellipse cx="50" cy="77" rx="25" ry="21" fill="${c}" stroke="${l}" stroke-width="2"/>
  <ellipse cx="50" cy="77" rx="25" ry="21" fill="url(#bg${n})"/>

  <!-- Barriga -->
  <ellipse cx="50" cy="80" rx="16" ry="14" fill="${h}" opacity="0.92"/>

  <!-- Braços -->
  <path d="M 27 73 Q 14 75 12 84 Q 14 91 22 90 Q 28 89 30 81"
        fill="${c}" stroke="${l}" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="11" cy="87" r="2.8" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="13" cy="91" r="2.8" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="18" cy="93" r="2.8" fill="${c}" stroke="${l}" stroke-width="1.2"/>

  <path d="M 73 73 Q 86 75 88 84 Q 86 91 78 90 Q 72 89 70 81"
        fill="${c}" stroke="${l}" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="89" cy="87" r="2.8" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="87" cy="91" r="2.8" fill="${c}" stroke="${l}" stroke-width="1.2"/>
  <circle cx="82" cy="93" r="2.8" fill="${c}" stroke="${l}" stroke-width="1.2"/>

  <!-- Cabeça -->
  <circle cx="50" cy="43" r="27" fill="${c}" stroke="${l}" stroke-width="2"/>
  <ellipse cx="41" cy="30" rx="13" ry="8" fill="rgba(255,255,255,0.16)" transform="rotate(-20,41,30)"/>

  <!-- Saliências dos olhos -->
  <circle cx="33" cy="25" r="14" fill="${c}" stroke="${l}" stroke-width="1.8"/>
  <circle cx="67" cy="25" r="14" fill="${c}" stroke="${l}" stroke-width="1.8"/>

  <!-- Olho esquerdo -->
  <circle cx="33" cy="25" r="12"  fill="${d}"/>
  <circle cx="34" cy="26" r="8.2" fill="${X}"/>
  <circle cx="34" cy="26" r="8.2" fill="rgba(120,180,255,0.25)"/>
  <circle cx="34" cy="27" r="5.2" fill="#06060f"/>
  <circle cx="30" cy="21" r="2.6" fill="rgba(255,255,255,0.92)"/>
  <circle cx="36" cy="29" r="1.2" fill="rgba(255,255,255,0.55)"/>
  <!-- Pálpebra esquerda (desliza de cima para baixo) -->
  <circle class="eyelid eyelid-l-${n}" cx="33" cy="25" r="13" fill="${c}" stroke="${l}" stroke-width="1.8"
          style="transform-origin:33px 12px; transform:scaleY(0); transition:transform 0.09s ease-in;"/>

  <!-- Olho direito -->
  <circle cx="67" cy="25" r="12"  fill="${d}"/>
  <circle cx="66" cy="26" r="8.2" fill="${X}"/>
  <circle cx="66" cy="26" r="8.2" fill="rgba(120,180,255,0.25)"/>
  <circle cx="66" cy="27" r="5.2" fill="#06060f"/>
  <circle cx="63" cy="21" r="2.6" fill="rgba(255,255,255,0.92)"/>
  <circle cx="69" cy="29" r="1.2" fill="rgba(255,255,255,0.55)"/>
  <!-- Pálpebra direita -->
  <circle class="eyelid eyelid-r-${n}" cx="67" cy="25" r="13" fill="${c}" stroke="${l}" stroke-width="1.8"
          style="transform-origin:67px 12px; transform:scaleY(0); transition:transform 0.09s ease-in;"/>

  <!-- Narinas -->
  <circle cx="44" cy="48" r="2.8" fill="#5c2a0a" opacity="0.72"/>
  <circle cx="56" cy="48" r="2.8" fill="#5c2a0a" opacity="0.72"/>

  <!-- Boca sorrindo -->
  <g class="mouth-smile-${n}" style="opacity:1">
    <path d="M 36 56 Q 50 70 64 56" stroke="${l}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 36 56 Q 34 60 38 62" stroke="${l}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M 64 56 Q 66 60 62 62" stroke="${l}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Boca aberta (comer mosca / língua pra fora) -->
  <g class="mouth-open-${n}" style="opacity:0">
    <path d="M 36 56 Q 50 72 64 56 Z" fill="#2a0f0f" stroke="${l}" stroke-width="2"/>
    <ellipse cx="50" cy="63" rx="12" ry="8" fill="#2a0f0f"/>
    <!-- Língua rosada (visível ao mostrar língua) -->
    <ellipse class="tongue-${n}" cx="50" cy="69" rx="10" ry="7" fill="#ff7fa0" style="opacity:0"/>
    <ellipse class="tongue-${n}" cx="50" cy="73" rx="8"  ry="4" fill="#ff9ab8" style="opacity:0; pointer-events:none;"/>
  </g>
</svg>`
}
function Be(e) {
    return o.frogColor === "rainbow" ? A.rainbow[e % A.rainbow.length] : A[o.frogColor] || A.green
}
function ue(e) {
    const t = e / 10;
    return t <= 30 ? {
        count: Math.ceil(t),
        value: 10
    } : {
        count: 30,
        value: Math.ceil(t / 30) * 10
    }
}
function Ie(e) {
    return e <= 10 ? "" : e < 60 ? `${e}s` : `${e / 60}m`
}
function $() {
    const e = document.getElementById("frog-grid");
    e.innerHTML = "",
    m = [];
    const t = o.totalMinutes === 1;
    for (let n = 0; n < E; n++) {
        const i = Be(n)
          , s = document.createElement("div");
        s.className = "frog-unit" + (t ? " big-mode" : ""),
        s.dataset.idx = n;
        const a = document.createElement("div");
        a.className = "frog-svg-wrap",
        a.innerHTML = xe(i, n);
        const r = document.createElement("div");
        r.className = "fly-eat-overlay",
        a.appendChild(r);
        const d = document.createElement("div");
        d.className = "lily-pad";
        const u = document.createElement("div");
        u.className = "frog-label",
        u.textContent = Ie(P),
        s.appendChild(a),
        s.appendChild(d),
        u.textContent && s.appendChild(u),
        e.appendChild(s),
        m.push({
            el: s,
            wrap: a,
            flyOverlay: r,
            gone: !1,
            jumping: !1,
            swimming: !1,
            blinkTimer: null,
            speechTimer: null,
            lastAction: -1,
            eating: !1
        }),
        J(n)
    }
    t && e.querySelectorAll(".clover").forEach(n => {
        n.setAttribute("opacity", "1")
    }
    )
}
function J(e) {
    if (!m[e] || m[e].gone)
        return;
    const t = (5 + Math.random() * 1.5) * 1e3;
    m[e].blinkTimer = setTimeout( () => {
        we(e)
    }
    , t)
}
function we(e) {
    if (!m[e] || m[e].gone || o.reduceMotion) {
        J(e);
        return
    }
    const t = m[e].el;
    t.classList.add("blinking");
    const n = t.querySelectorAll(".eyelid");
    n.forEach(i => {
        i.style.transform = "scaleY(1)"
    }
    ),
    setTimeout( () => {
        t.classList.remove("blinking"),
        n.forEach(i => {
            i.style.transform = "scaleY(0)"
        }
        ),
        J(e)
    }
    , 160)
}
function oe() {
    for (let e = 0; e < m.length; e++) {
        const t = m[e];
        t.gone || e < k && (t.jumping || Se(e))
    }
}
function Se(e) {
    const t = m[e];
    !t || t.gone || t.jumping || (t.jumping = !0,
    clearTimeout(t.blinkTimer),
    clearTimeout(t.speechTimer),
    v(e, "smile"),
    o.reduceMotion || t.el.classList.add("jumping"),
    o.soundEffects && ke(),
    setTimeout( () => pe(), 600),
    setTimeout( () => {
        t.el.classList.remove("jumping"),
        t.gone = !0,
        t.el.classList.add("gone"),
        setTimeout( () => Ae(), 500)
    }
    , o.reduceMotion ? 50 : 900),
    o.vibration && navigator.vibrate && navigator.vibrate(80))
}
function Ce(e) {
    const t = m[e];
    t && (t.swimming = !0,
    t.el.classList.remove("gone"),
    t.el.classList.add("swimming"),
    pe())
}
function v(e, t) {
    const n = m[e]?.el;
    if (!n)
        return;
    const i = n.querySelector('[class*="mouth-smile-"]')
      , s = n.querySelector('[class*="mouth-open-"]');
    i && (i.style.opacity = t === "smile" ? "1" : "0"),
    s && (s.style.opacity = t === "open" ? "1" : "0"),
    n.querySelectorAll('[class*="tongue-"]').forEach(a => a.style.opacity = "0")
}
function j(e, t) {
    const n = m[e]?.el;
    n && n.querySelectorAll('[class*="tongue-"]').forEach(i => i.style.opacity = t ? "1" : "0")
}
const G = ["stretch", "dive", "speech", "croak", "look", "tongue"];
function Ae() {
    if (o.reduceMotion)
        return;
    const e = m.map( (a, r) => ({
        fu: a,
        i: r
    })).filter( ({fu: a}) => !a.gone && !a.jumping && !a.swimming && !a.eating);
    if (!e.length)
        return;
    const {fu: t, i: n} = e[Math.floor(Math.random() * e.length)];
    let i;
    do
        i = Math.floor(Math.random() * G.length);
    while (i === t.lastAction && G.length > 1);
    t.lastAction = i;
    const s = G[i];
    s === "stretch" ? (t.el.classList.add("stretching"),
    setTimeout( () => t.el.classList.remove("stretching"), 1400)) : s === "dive" ? (t.el.classList.add("diving"),
    setTimeout( () => t.el.classList.remove("diving"), 1200)) : s === "speech" ? Fe(n) : s === "croak" ? (v(n, "open"),
    setTimeout( () => v(n, "smile"), 600)) : s === "tongue" ? (v(n, "open"),
    j(n, !0),
    setTimeout( () => {
        j(n, !1),
        v(n, "smile")
    }
    , 1400)) : s === "look" && (t.el.classList.add("looking"),
    setTimeout( () => t.el.classList.remove("looking"), 1600))
}
function Fe(e) {
    const t = m[e];
    if (!t)
        return;
    const n = document.getElementById("frog-speech")
      , i = t.wrap.getBoundingClientRect()
      , s = te[Math.floor(Math.random() * te.length)];
    n.textContent = s,
    n.classList.remove("hidden"),
    n.style.left = Math.max(8, i.left + i.width / 2 - 110) + "px",
    n.style.top = Math.max(8, i.top - 56) + "px",
    clearTimeout(t.speechTimer),
    t.speechTimer = setTimeout( () => {
        n.classList.add("hidden")
    }
    , 2200)
}
function je() {
    x || p || (p = !0,
    de = performance.now() - q * 1e3,
    R(),
    qe(),
    fe(),
    D = requestAnimationFrame(me))
}
function Oe() {
    p && (p = !1,
    cancelAnimationFrame(D),
    W(),
    clearTimeout(S),
    R())
}
function Pe() {
    cancelAnimationFrame(D),
    p = !1,
    x = !1,
    q = 0,
    k = 0,
    m.forEach( (e, t) => {
        clearTimeout(e.blinkTimer),
        clearTimeout(e.speechTimer)
    }
    ),
    W(),
    clearTimeout(S),
    document.getElementById("frog-speech").classList.add("hidden"),
    document.getElementById("motivation-msg").classList.add("hidden"),
    R(),
    N(y),
    $(),
    H(1)
}
function me(e) {
    if (!p)
        return;
    const t = (e - de) / 1e3;
    q = t;
    const n = Math.max(0, y - t);
    N(n),
    H(n / y);
    const i = Math.min(E - 1, Math.floor(t / P));
    if (i > k && (k = i,
    oe()),
    n <= 0) {
        p = !1,
        x = !0,
        k = E - 1,
        oe(),
        setTimeout( () => {
            Ce(E - 1)
        }
        , 600),
        setTimeout( () => {
            De()
        }
        , 1400);
        return
    }
    D = requestAnimationFrame(me)
}
function De() {
    W(),
    clearTimeout(S),
    Ge(o.totalMinutes),
    Y(),
    o.soundEffects && $e(),
    Je(),
    R(),
    o.vibration && navigator.vibrate && navigator.vibrate([200, 100, 200])
}
function N(e) {
    const t = Math.floor(e / 60)
      , n = Math.floor(e % 60);
    document.getElementById("time-text").textContent = String(t).padStart(2, "0") + ":" + String(n).padStart(2, "0"),
    o.showSeconds && (document.getElementById("time-seconds").textContent = `(${Math.ceil(e)} segundos restantes)`)
}
function H(e) {
    o.showProgress && (document.getElementById("progress-bar-fill").style.width = e * 100 + "%")
}
function R() {
    const e = document.getElementById("btn-start")
      , t = document.getElementById("btn-pause");
    document.getElementById("btn-reset"),
    p ? (e.classList.add("hidden"),
    t.classList.remove("hidden")) : (e.classList.remove("hidden"),
    t.classList.add("hidden")),
    x && e.classList.add("hidden")
}
function qe() {
    I || (I = setInterval( () => {
        if (o.totalFliesEaten++,
        f(),
        He(),
        !o.reduceMotion) {
            const e = m.filter(t => !t.gone && !t.jumping && !t.swimming && !t.eating);
            if (e.length) {
                const t = e[Math.floor(Math.random() * e.length)]
                  , n = m.indexOf(t);
                Ne(n)
            }
        }
    }
    , 5e3))
}
function W() {
    I && (clearInterval(I),
    I = null)
}
function Ne(e) {
    const t = m[e];
    if (!t || t.eating || t.gone)
        return;
    t.eating = !0,
    v(e, "open"),
    j(e, !0),
    o.soundEffects && Ee();
    const n = document.createElement("div");
    n.className = "fly-dot",
    n.textContent = "🪰",
    n.style.cssText = `left:${20 + Math.random() * 60}%;top:${5 + Math.random() * 40}%;`,
    n.style.setProperty("--tx", `${50 - (20 + Math.random() * 60)}px`),
    n.style.setProperty("--ty", `${70 - (5 + Math.random() * 40)}px`),
    t.flyOverlay.appendChild(n),
    setTimeout( () => {
        n.remove(),
        j(e, !1),
        v(e, "smile"),
        t.eating = !1
    }
    , o.reduceMotion ? 10 : 900)
}
function He() {
    const e = document.getElementById("fly-count-text");
    if (!e)
        return;
    const t = o.totalFliesEaten;
    e.textContent = `${t} ${t === 1 ? "mosca comida" : "moscas comidas"} pelo sapinho`
}
function fe() {
    clearTimeout(S),
    S = setTimeout(Re, 9e4)
}
function Re() {
    if (!p)
        return;
    let e;
    do
        e = Math.floor(Math.random() * _.length);
    while (e === ne && _.length > 1);
    ne = e;
    const t = document.getElementById("motivation-msg");
    t.textContent = _[e],
    t.classList.remove("hidden"),
    o.soundEffects && Me(),
    setTimeout( () => t.classList.add("hidden"), 4e3),
    fe()
}
function Ve() {
    return new Date().toLocaleDateString("pt-BR")
}
function ge() {
    o.logDiario || (o.logDiario = []);
    const e = Ve();
    let t = o.logDiario.find(n => n.date === e);
    return t || (t = {
        date: e,
        tasks: [],
        stars: []
    },
    o.logDiario.unshift(t),
    o.logDiario.length > 60 && (o.logDiario = o.logDiario.slice(0, 60))),
    t
}
function Qe(e, t) {
    const n = ge();
    n.tasks.find(i => i.name === t) || n.tasks.push({
        icon: e,
        name: t
    }),
    f(),
    V()
}
function _e(e, t) {
    ge().stars.push({
        durationMin: e,
        timeStr: t
    }),
    f(),
    V()
}
function Ge(e) {
    const t = new Date
      , n = t.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
    o.stars.unshift({
        durationMin: e,
        date: t.toLocaleDateString("pt-BR"),
        timeStr: n
    }),
    o.stars.length > 8 && (o.stars = o.stars.slice(0, 8)),
    _e(e, n),
    f()
}
function Y() {
    const e = document.getElementById("stars-display")
      , t = document.getElementById("stars-count")
      , n = o.stars.length;
    e.innerHTML = "";
    for (let i = 0; i < Math.min(n, 8); i++) {
        const s = document.createElement("span");
        s.className = "star-item",
        s.textContent = "⭐",
        s.style.animationDelay = i * .05 + "s",
        e.appendChild(s)
    }
    t.textContent = n > 0 ? `${n} estrela${n > 1 ? "s" : ""}` : ""
}
function Je() {
    const e = document.getElementById("modal-congrats")
      , t = document.getElementById("congrats-msg")
      , n = document.getElementById("congrats-stars")
      , i = o.stars.length;
    n.textContent = "⭐".repeat(Math.min(i, 5)),
    t.textContent = `Você completou ${o.totalMinutes} minuto${o.totalMinutes !== 1 ? "s" : ""}! Incrível! 🎉`,
    e.classList.remove("hidden"),
    Ue()
}
function Ue() {
    const e = document.getElementById("confetti-container");
    e.innerHTML = "";
    const t = ["#FFD700", "#FF6B6B", "#5cba6e", "#BFE0F2", "#FFB3C6", "#FFB347"];
    for (let n = 0; n < 24; n++) {
        const i = document.createElement("div");
        i.className = "confetti-piece",
        i.style.cssText = `
      left:${Math.random() * 100}%;
      background:${t[n % t.length]};
      animation-delay:${Math.random() * .6}s;
      animation-duration:${1 + Math.random() * .6}s;
      border-radius:${Math.random() > .5 ? "50%" : "2px"};
      width:${6 + Math.random() * 6}px;height:${6 + Math.random() * 6}px;
    `,
        e.appendChild(i)
    }
}
function pe() {
    const e = document.getElementById("water")
      , t = document.createElement("div");
    t.className = "splash-ring",
    t.style.cssText = `left:${15 + Math.random() * 70}%;top:20%;`,
    e.appendChild(t),
    setTimeout( () => t.remove(), 700)
}
function ze() {
    const e = document.getElementById("water-bubbles");
    e.innerHTML = "";
    for (let t = 0; t < 10; t++) {
        const n = document.createElement("div");
        n.className = "bubble";
        const i = 4 + Math.random() * 6;
        n.style.cssText = `
      width:${i}px; height:${i}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 30}%;
      animation-duration:${3 + Math.random() * 4}s;
      animation-delay:${Math.random() * 5}s;
    `,
        e.appendChild(n)
    }
}
function We() {
    const e = document.getElementById("stars");
    e.innerHTML = "";
    for (let t = 0; t < 50; t++) {
        const n = document.createElement("div");
        n.className = "star-dot";
        const i = 1.5 + Math.random() * 2.5;
        n.style.cssText = `
      width:${i}px; height:${i}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 85}%;
      --dur:${2 + Math.random() * 3}s;
      --delay:${Math.random() * 4}s;
    `,
        e.appendChild(n)
    }
}
function Ye() {
    const e = document.getElementById("scene-flies");
    e.innerHTML = "";
    for (let t = 0; t < 3; t++) {
        const n = document.createElement("div");
        n.className = "scene-fly",
        n.textContent = "🪰",
        n.style.cssText = `
      left:${10 + Math.random() * 80}%;
      top:${10 + Math.random() * 50}%;
      animation-duration:${4 + Math.random() * 5}s;
      animation-delay:${Math.random() * 4}s;
    `,
        e.appendChild(n)
    }
}
function b() {
    const e = document.body;
    e.classList.toggle("night", !!o.nightMode),
    e.classList.toggle("reduce-motion", !!o.reduceMotion),
    e.classList.toggle("high-contrast", !!o.highContrast),
    document.getElementById("time-seconds").classList.toggle("hidden", !o.showSeconds),
    document.getElementById("progress-bar-wrap").classList.toggle("hidden", !o.showProgress);
    const t = document.getElementById("night-btn-icon")
      , n = document.getElementById("night-status")
      , i = document.getElementById("btn-night");
    t && (t.textContent = o.nightMode ? "☀️" : "🌙"),
    n && (n.textContent = o.nightMode ? "ON" : "OFF"),
    i && i.classList.toggle("night-on", !!o.nightMode),
    document.querySelectorAll(".color-btn").forEach(a => {
        a.classList.toggle("active", a.dataset.color === o.frogColor)
    }
    ),
    document.querySelectorAll(".preset-btn:not(#btn-custom)").forEach(a => {
        a.classList.toggle("active", parseInt(a.dataset.min) === o.totalMinutes)
    }
    ),
    Object.entries({
        "show-seconds": "showSeconds",
        "show-progress": "showProgress",
        vibration: "vibration",
        "sound-effects": "soundEffects",
        "reduce-motion": "reduceMotion",
        "high-contrast": "highContrast"
    }).forEach( ([a,r]) => {
        const d = document.getElementById(`setting-${a}`);
        d && (d.checked = !!o[r])
    }
    )
}
const Ke = [1, 3, 5, 10, 15, 20, 30];
let w = null
  , he = -1;
function Ze() {
    K(),
    O(),
    nt()
}
function K() {
    const e = document.getElementById("pd-tasks-grid");
    if (!e)
        return;
    e.innerHTML = M().map(n => `<button class="pd-task-btn" data-id="${n.id}">
      <span class="task-icon">${n.icon}</span>
      <span>${n.name}</span>
    </button>`).join("");
    const t = document.getElementById("pd-minute-grid");
    t && (t.innerHTML = Ke.map(n => `<button class="pd-minute-btn" data-min="${n}">${n} MIN</button>`).join("")),
    Xe(),
    tt()
}
function Xe() {
    document.querySelectorAll(".pd-task-btn").forEach(e => {
        e.addEventListener("click", () => {
            const t = e.dataset.id;
            if (w === "primeiro") {
                o.pdPrimeiro = {
                    taskId: t,
                    minutes: o.pdPrimeiro?.minutes || null
                },
                f(),
                O(),
                et(t);
                return
            }
            w === "depois" ? (o.pdDepois = {
                taskId: t
            },
            O()) : w === "objetivo" && (o.objetivos || (o.objetivos = [null, null, null]),
            o.objetivos[he] = {
                taskId: t,
                done: !1
            },
            C()),
            Z(),
            f()
        }
        )
    }
    )
}
function et(e) {
    const t = M().find(s => s.id === e)
      , n = document.getElementById("pd-picker-title");
    n && (n.innerHTML = `QUANTO TEMPO?<span class="pd-picker-task-hint"> — ${t?.icon || ""} ${t?.name || ""}</span>`),
    document.getElementById("pd-tasks-grid").classList.add("hidden"),
    document.getElementById("pd-minute-section").classList.remove("hidden");
    const i = o.pdPrimeiro?.minutes;
    document.querySelectorAll(".pd-minute-btn").forEach(s => s.classList.toggle("selected", parseInt(s.dataset.min) === i))
}
function tt() {
    document.querySelectorAll(".pd-minute-btn").forEach(e => {
        e.addEventListener("click", () => {
            const t = parseInt(e.dataset.min);
            o.pdPrimeiro || (o.pdPrimeiro = {}),
            o.pdPrimeiro.minutes = t,
            p || pt(t),
            f(),
            O(),
            Z()
        }
        )
    }
    )
}
function ye() {
    const e = document.getElementById("pd-picker-title");
    e && (e.innerHTML = "ESCOLHER TAREFA");
    const t = document.getElementById("pd-tasks-grid")
      , n = document.getElementById("pd-minute-section");
    t && t.classList.remove("hidden"),
    n && n.classList.add("hidden")
}
function O() {
    const e = document.getElementById("pd-primeiro-task")
      , t = document.getElementById("pd-depois-task")
      , n = document.getElementById("pd-primeiro-task-card")
      , i = document.getElementById("pd-depois-task-card");
    if (e) {
        if (o.pdPrimeiro?.taskId) {
            const s = M().find(r => r.id === o.pdPrimeiro.taskId)
              , a = o.pdPrimeiro.minutes;
            e.innerHTML = `
      <span class="pd-task-icon">${s?.icon || "?"}</span>
      <span class="pd-task-name">${s?.name || ""}</span>
      ${a ? `<span class="pd-task-mins">${a} MIN</span>` : '<span class="pd-task-mins-hint">TOQUE PARA EDITAR</span>'}
    `,
            n.classList.add("selected")
        } else
            e.innerHTML = '<span class="pd-placeholder">TOQUE<br>AQUI</span>',
            n.classList.remove("selected");
        if (o.pdDepois?.taskId) {
            const s = M().find(a => a.id === o.pdDepois.taskId);
            t.innerHTML = `<span class="pd-task-icon">${s?.icon || "?"}</span><span class="pd-task-name">${s?.name || ""}</span>`,
            i.classList.add("selected")
        } else
            t.innerHTML = '<span class="pd-placeholder">TOQUE<br>AQUI</span>',
            i.classList.remove("selected")
    }
}
function U(e) {
    w = e,
    ye(),
    document.getElementById("pd-task-picker").classList.remove("hidden"),
    document.getElementById("pd-task-picker").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    })
}
function Z() {
    const e = document.getElementById("pd-task-picker");
    e && e.classList.add("hidden"),
    ye()
}
function nt() {
    document.getElementById("pd-primeiro-task-card")?.addEventListener("click", () => {
        U("primeiro")
    }
    ),
    document.getElementById("pd-depois-task-card")?.addEventListener("click", () => {
        U("depois")
    }
    )
}
const ot = ["#FF9A3C", "#06D6A0", "#118AB2"]
  , it = ["#c96800", "#048a67", "#0a5e80"]
  , ie = ["OBJETIVO 1", "OBJETIVO 2", "OBJETIVO 3"];
function st() {
    o.objetivos || (o.objetivos = [null, null, null]),
    C()
}
function C() {
    o.objetivos || (o.objetivos = [null, null, null]);
    const e = document.getElementById("objetivos-grid");
    e && (e.innerHTML = "",
    o.objetivos.forEach( (t, n) => {
        const i = document.createElement("div");
        if (i.className = "objetivo-card" + (t ? t.done ? " obj-done" : " obj-set" : " obj-empty"),
        i.style.setProperty("--obj-color", ot[n]),
        i.style.setProperty("--obj-dark", it[n]),
        t) {
            const s = M().find(r => r.id === t.taskId);
            i.innerHTML = `
        <div class="obj-label">${ie[n]}</div>
        <div class="obj-icon">${s?.icon || "?"}</div>
        <div class="obj-name">${s?.name || ""}</div>
        ${t.done ? '<div class="obj-done-badge">FEITO!</div>' : ""}
      `,
            i.addEventListener("click", () => {
                const r = t.done;
                o.objetivos[n] = {
                    ...t,
                    done: !t.done
                },
                f(),
                C(),
                !r && s && Qe(s.icon, s.name),
                r || at()
            }
            );
            let a;
            i.addEventListener("pointerdown", () => {
                a = setTimeout( () => {
                    o.objetivos[n] = null,
                    f(),
                    C()
                }
                , 700)
            }
            ),
            ["pointerup", "pointerleave", "pointercancel"].forEach(r => i.addEventListener(r, () => clearTimeout(a)))
        } else
            i.innerHTML = `
        <div class="obj-label">${ie[n]}</div>
        <div class="obj-add-icon">+</div>
        <div class="obj-add-text">ADICIONAR</div>
      `,
            i.addEventListener("click", () => {
                w = "objetivo",
                he = n,
                U("objetivo"),
                document.getElementById("primeiro-depois-section").scrollIntoView({
                    behavior: "smooth"
                })
            }
            );
        e.appendChild(i)
    }
    ))
}
function at() {
    if (!o.objetivos)
        return;
    o.objetivos.length === 3 && o.objetivos.every(t => t && t.done) && setTimeout( () => rt(), 300)
}
function rt() {
    ct(),
    lt()
}
function ct() {
    let e = document.getElementById("objetivos-confetti-overlay");
    e || (e = document.createElement("div"),
    e.id = "objetivos-confetti-overlay",
    e.className = "objetivos-confetti-overlay",
    document.getElementById("app").appendChild(e)),
    e.innerHTML = '<div class="obj-celebrate-msg">PARABENS!<br>TODOS OS OBJETIVOS CONCLUIDOS!</div>';
    const t = ["#FF9A3C", "#06D6A0", "#118AB2", "#FFD700", "#FF6B6B", "#5cba6e", "#FFB3C6"];
    for (let n = 0; n < 60; n++) {
        const i = document.createElement("div");
        i.className = "obj-confetti-piece",
        i.style.cssText = `
      left:${Math.random() * 100}%;
      background:${t[Math.floor(Math.random() * t.length)]};
      animation-delay:${Math.random() * 1.2}s;
      animation-duration:${1.5 + Math.random() * 1.2}s;
      border-radius:${Math.random() > .5 ? "50%" : "3px"};
      width:${7 + Math.random() * 8}px;
      height:${7 + Math.random() * 8}px;
    `,
        e.appendChild(i)
    }
    e.classList.remove("hidden"),
    o.soundEffects && playComplete(),
    setTimeout( () => {
        e.classList.add("fade-out"),
        setTimeout( () => {
            e.parentNode && e.parentNode.removeChild(e)
        }
        , 600)
    }
    , 3500)
}
function lt() {
    if (!m.length)
        return;
    const e = m.filter(n => !n.gone && !n.jumping && !n.swimming);
    if (!e.length)
        return;
    const t = e[Math.floor(Math.random() * e.length)];
    t.el.classList.add("celebrating"),
    setTimeout( () => t.el.classList.remove("celebrating"), 2500)
}
function V() {
    o.logDiario || (o.logDiario = []);
    const e = document.getElementById("registro-list")
      , t = document.getElementById("registro-empty");
    if (!e)
        return;
    const n = o.logDiario.filter(i => i.tasks.length > 0 || i.stars.length > 0);
    if (!n.length) {
        e.innerHTML = "",
        t.classList.remove("hidden");
        return
    }
    t.classList.add("hidden"),
    e.innerHTML = n.map(i => {
        const s = i.tasks.length ? i.tasks.map(r => `<div class="registro-item">${r.icon} ${r.name}</div>`).join("") : '<div class="registro-vazio">Nenhuma tarefa concluída</div>'
          , a = i.stars.length ? i.stars.map(r => `<div class="registro-item">⭐ ${r.durationMin} MIN — ${r.timeStr}</div>`).join("") : '<div class="registro-vazio">Nenhuma estrela ainda</div>';
        return `<div class="registro-dia">
      <div class="registro-data">📅 ${i.date}</div>
      <div class="registro-bloco-title">TAREFAS</div>${s}
      <div class="registro-bloco-title">ESTRELAS</div>${a}
    </div>`
    }
    ).join("")
}
function dt() {
    o.stars = [],
    o.logDiario = [],
    o.objetivos = [null, null, null],
    f(),
    Y(),
    V(),
    C()
}
const ut = ["🦷", "🛁", "🧸", "📚", "🍪", "🎮", "🎨", "⚽", "🏊", "🧩", "🍎", "🛏️", "🚿", "🏃", "📖", "🎵", "🧹", "🍽️", "🌳", "😴", "🎯", "🏆", "🌈", "🦋", "🐾", "🚲", "🎪", "🧪", "🖍️", "💪"];
let z = null;
function mt() {
    ve()
}
function ve() {
    const e = document.getElementById("task-editor");
    if (!e)
        return;
    const t = M();
    e.innerHTML = t.map( (n, i) => `
    <div class="task-editor-row">
      <button class="task-emoji-btn" data-idx="${i}" title="Trocar ícone">${n.icon}</button>
      <input class="task-name-input" data-idx="${i}" value="${n.name}" maxlength="22" />
    </div>
  `).join(""),
    e.querySelectorAll(".task-emoji-btn").forEach(n => {
        n.addEventListener("click", () => {
            z = parseInt(n.dataset.idx),
            ft(),
            document.getElementById("modal-emoji").classList.remove("hidden")
        }
        )
    }
    ),
    e.querySelectorAll(".task-name-input").forEach(n => {
        n.addEventListener("change", () => {
            const i = parseInt(n.dataset.idx);
            be();
            const s = n.value.trim();
            s && (o.customTasks[i].name = s),
            f(),
            K()
        }
        )
    }
    )
}
function be() {
    o.customTasks || (o.customTasks = ae.map(e => ({
        ...e
    })))
}
function ft() {
    const e = document.getElementById("emoji-grid");
    e && (e.innerHTML = ut.map(t => `<button class="emoji-pick-btn" title="${t}">${t}</button>`).join(""),
    e.querySelectorAll(".emoji-pick-btn").forEach(t => {
        t.addEventListener("click", () => {
            z !== null && (be(),
            o.customTasks[z].icon = t.textContent.trim(),
            f(),
            ve(),
            K(),
            document.getElementById("modal-emoji").classList.add("hidden"))
        }
        )
    }
    ))
}
function gt() {
    const e = new Date().toLocaleDateString("pt-BR");
    o.rotinaToday || (o.rotinaToday = {}),
    (!o.rotinaToday._date || o.rotinaToday._date !== e) && (o.rotinaToday._date && (o.rotinaHistory || (o.rotinaHistory = {}),
    Object.entries(o.rotinaToday).forEach( ([t,n]) => {
        t !== "_date" && (o.rotinaHistory[t] || (o.rotinaHistory[t] = []),
        o.rotinaHistory[t].push({
            date: o.rotinaToday._date,
            tasks: n
        }),
        o.rotinaHistory[t].length > 60 && o.rotinaHistory[t].shift())
    }
    )),
    o.rotinaToday = {
        _date: e
    },
    f())
}
function pt(e, t) {
    if (o.totalMinutes = e,
    f(),
    !p && !x) {
        y = e * 60;
        const n = ue(y);
        E = n.count,
        P = n.value,
        k = 0,
        q = 0,
        $(),
        N(y),
        H(1),
        b()
    } else
        b();
    b()
}
function ht() {
    document.querySelectorAll(".tab-btn").forEach(e => {
        e.addEventListener("click", () => re(e.dataset.tab))
    }
    ),
    document.getElementById("btn-night")?.addEventListener("click", () => {
        o.nightMode = !o.nightMode,
        f(),
        b(),
        $()
    }
    ),
    ["show-seconds", "show-progress", "vibration", "sound-effects", "reduce-motion", "high-contrast"].forEach(e => {
        const t = document.getElementById(`setting-${e}`);
        t && t.addEventListener("change", () => {
            const n = e.replace(/-([a-z])/g, (i, s) => s.toUpperCase());
            o[n] = t.checked,
            f(),
            b(),
            e === "high-contrast" && $(),
            e === "sound-effects" && t.checked && ee()
        }
        )
    }
    ),
    document.getElementById("btn-start")?.addEventListener("click", () => {
        ee(),
        o.soundEffects && Q(),
        je()
    }
    ),
    document.getElementById("btn-pause")?.addEventListener("click", () => {
        o.soundEffects && Q(),
        Oe()
    }
    ),
    document.getElementById("btn-reset")?.addEventListener("click", () => {
        o.soundEffects && Q(),
        x = !1,
        Pe()
    }
    ),
    document.getElementById("btn-congrats-ok")?.addEventListener("click", () => {
        document.getElementById("modal-congrats").classList.add("hidden")
    }
    ),
    document.querySelectorAll(".color-btn").forEach(e => {
        e.addEventListener("click", () => {
            o.frogColor = e.dataset.color,
            f(),
            b(),
            p || $()
        }
        )
    }
    ),
    document.getElementById("btn-reset-all")?.addEventListener("click", () => {
        confirm("Zerar todas as estrelas e registros? Essa ação não pode ser desfeita.") && dt()
    }
    ),
    document.getElementById("btn-emoji-cancel")?.addEventListener("click", () => {
        document.getElementById("modal-emoji").classList.add("hidden")
    }
    ),
    ["modal-custom", "modal-congrats", "modal-emoji"].forEach(e => {
        const t = document.getElementById(e);
        t && t.addEventListener("click", n => {
            n.target === t && t.classList.add("hidden")
        }
        )
    }
    )
}
function se() {
    Le(),
    y = o.totalMinutes * 60;
    const e = ue(y);
    E = e.count,
    P = e.value,
    b(),
    $(),
    ze(),
    We(),
    Ye(),
    Ze(),
    st(),
    mt(),
    Z(),
    Y(),
    N(y),
    H(1),
    ht(),
    o.activeTab && o.activeTab !== "timer" && re(o.activeTab)
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", se) : se();
