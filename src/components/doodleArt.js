// ---------------------------------------------------------------------------
// Hand-drawn line illustrations ("doodles") drawn over the photos.
// Each doodle is a list of strokes in its own little drawing space (`vb` =
// width and height). Strokes are plain SVG path data; strokes marked
// `accent` are drawn in lime, the rest in cream.
// Shapes are built from points and smoothed, with a little seeded wobble, so
// the lines look drawn by hand but come out the same on every visit.
// ---------------------------------------------------------------------------

const rng = (seed) => { let s = seed % 2147483647 || 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const f = (n) => Math.round(n * 10) / 10;
const TAU = Math.PI * 2;

// Smooth line through points (Catmull-Rom as cubic Béziers).
export function smooth(pts, closed = false) {
  if (pts.length < 2) return '';
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? d + 'Z' : d;
}
const line = (pts) => 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
const jit = (pts, r, a = 1.2) => pts.map(([x, y]) => [x + (r() - 0.5) * 2 * a, y + (r() - 0.5) * 2 * a]);
const rot = (pts, deg, cx, cy) => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]);
};
const move = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);

// A loose loop, like a circle drawn in one go: it overshoots its start.
function loopPts(cx, cy, rx, ry, r, { n = 18, wob = 0.06, start = -1.9, over = 0.35, tilt = 0 } = {}) {
  const pts = [];
  const steps = Math.round(n * (1 + over / TAU));
  for (let i = 0; i <= steps; i++) {
    const t = start + (i / n) * TAU;
    const k = 1 + (r() - 0.5) * 2 * wob;
    pts.push([cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k]);
  }
  return tilt ? rot(pts, tilt, cx, cy) : pts;
}
const loop = (...a) => smooth(loopPts(...a));
const dot = (x, y, s = 1.6) => `M${f(x - s)} ${f(y)}a${s} ${s} 0 1 0 ${f(2 * s)} 0a${s} ${s} 0 1 0 ${f(-2 * s)} 0`;
const sparkle = (x, y, s) => `M${f(x)} ${f(y - s)}Q${f(x + s * 0.12)} ${f(y - s * 0.12)} ${f(x + s)} ${f(y)}Q${f(x + s * 0.12)} ${f(y + s * 0.12)} ${f(x)} ${f(y + s)}Q${f(x - s * 0.12)} ${f(y + s * 0.12)} ${f(x - s)} ${f(y)}Q${f(x - s * 0.12)} ${f(y - s * 0.12)} ${f(x)} ${f(y - s)}Z`;
const A = (d) => ({ d, accent: true });

// ---------- Generators ----------

function hangingString(w, sag, r) {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const x = (w * i) / 10;
    const u = (x - w / 2) / (w / 2);
    pts.push([x, 10 + sag * (1 - u * u) + (r() - 0.5) * 2]);
  }
  return pts;
}
const yAt = (w, sag, x) => { const u = (x - w / 2) / (w / 2); return 10 + sag * (1 - u * u); };

function bunting(seed = 3) {
  const r = rng(seed), w = 420, sag = 46, out = [smooth(hangingString(w, sag, r))];
  for (let i = 1; i <= 9; i++) {
    const x = (w * i) / 10, y = yAt(w, sag, x);
    const tri = jit([[x - 15, y + 1], [x + 15, y + 2], [x + (r() - 0.5) * 5, y + 34], [x - 15, y + 1]], r, 1);
    out.push(i % 3 === 1 ? A(line(tri)) : line(tri));
  }
  return { vb: [420, 100], paths: out };
}

function lights(seed = 5) {
  const r = rng(seed), w = 420, sag = 40, out = [smooth(hangingString(w, sag, r))];
  for (let i = 1; i <= 11; i++) {
    const x = (w * i) / 12, y = yAt(w, sag, x);
    out.push(line([[x, y], [x + 0.5, y + 6]]));
    out.push(A(loop(x + 0.5, y + 14, 5.5, 8, r, { n: 12, wob: 0.05 })));
    if (i % 3 === 2) {
      out.push(A(line([[x - 13, y + 14], [x - 18, y + 14]])));
      out.push(A(line([[x + 14, y + 14], [x + 19, y + 14]])));
      out.push(A(line([[x - 9, y + 25], [x - 13, y + 29]])));
    }
  }
  return { vb: [420, 100], paths: out };
}

function burst(seed = 7, rays = 16) {
  const r = rng(seed), out = [];
  for (let k = 0; k < rays; k++) {
    const a = (k / rays) * TAU + (r() - 0.5) * 0.2;
    const r1 = 16 + r() * 8, r2 = 52 + r() * 34, bend = (r() - 0.5) * 10;
    const p1 = [100 + Math.cos(a) * r1, 100 + Math.sin(a) * r1];
    const p2 = [100 + Math.cos(a) * r2, 100 + Math.sin(a) * r2];
    const m = [(p1[0] + p2[0]) / 2 - Math.sin(a) * bend, (p1[1] + p2[1]) / 2 + Math.cos(a) * bend];
    out.push(`M${f(p1[0])} ${f(p1[1])}Q${f(m[0])} ${f(m[1])} ${f(p2[0])} ${f(p2[1])}`);
    if (k % 2 === 0) out.push(A(dot(100 + Math.cos(a) * (r2 + 9), 100 + Math.sin(a) * (r2 + 9), 2)));
  }
  out.push(A(sparkle(100, 100, 7)));
  return { vb: [200, 200], paths: out };
}

function sparkles() {
  return { vb: [120, 100], paths: [sparkle(30, 34, 20), A(sparkle(84, 22, 11)), sparkle(78, 72, 14), A(dot(46, 82, 2.4)), dot(104, 48, 2)] };
}

function flower(r, ox) {
  const cx = ox + 45, cy = 44, out = [];
  for (let j = 0; j < 5; j++) {
    const th = (j * TAU) / 5 - Math.PI / 2 + (r() - 0.5) * 0.3;
    const len = 26 + r() * 8;
    const pts = [[cx, cy]];
    for (const [da, k] of [[-0.42, 0.55], [-0.38, 0.92], [0, 1.08], [0.38, 0.92], [0.42, 0.55]]) {
      pts.push([cx + Math.cos(th + da) * len * k, cy + Math.sin(th + da) * len * k]);
    }
    pts.push([cx + 1, cy + 1]);
    out.push(smooth(jit(pts, r, 1)));
  }
  out.push(A(loop(cx, cy, 6, 6, r, { n: 10 })));
  out.push(smooth([[cx, cy + 8], [cx - 3 + r() * 6, cy + 40], [cx + 1, cy + 72]]));
  out.push(smooth([[cx, cy + 52], [cx + 14, cy + 40], [cx + 22, cy + 42], [cx + 12, cy + 54], [cx + 1, cy + 55]]));
  out.push(line(jit([[cx - 30, cy + 72], [cx + 30, cy + 73], [cx + 23, cy + 112], [cx - 23, cy + 112], [cx - 30, cy + 72]], r, 1)));
  return out;
}
function flowers(seed = 11) {
  const r = rng(seed);
  return { vb: [280, 160], paths: [...flower(r, 0), ...flower(r, 95), ...flower(r, 190)] };
}

function balloons(seed = 13) {
  const r = rng(seed), out = [];
  const b = [[50, 52, 26, 33, -8], [98, 40, 24, 31, 6], [76, 92, 22, 28, 0]];
  b.forEach(([x, y, rx, ry, t], i) => {
    const d = loop(x, y, rx, ry, r, { n: 16, wob: 0.03, tilt: t });
    out.push(i === 1 ? A(d) : d);
    const ky = y + ry;
    out.push(line([[x - 4, ky + 6], [x, ky], [x + 4, ky + 6], [x - 4, ky + 6]]));
    out.push(smooth([[x, ky + 6], [x + (76 - x) * 0.3 + 5, ky + (214 - ky) * 0.35], [x + (76 - x) * 0.7 - 4, ky + (214 - ky) * 0.7], [76, 214]]));
  });
  out.push(A(sparkle(132, 92, 9)));
  return { vb: [150, 220], paths: out };
}

function rosette(seed = 17) {
  const r = rng(seed), out = [];
  const pts = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * TAU;
    const rr = 40 + 6 * Math.abs(Math.sin(t * 7));
    pts.push([60 + Math.cos(t) * rr, 58 + Math.sin(t) * rr]);
  }
  out.push(smooth(pts, true));
  out.push(A(loop(60, 58, 23, 23, r, { n: 14 })));
  out.push(A(sparkle(60, 58, 8)));
  out.push(line(jit([[44, 96], [32, 168], [42, 160], [52, 172], [60, 100]], r, 1)));
  out.push(line(jit([[62, 100], [70, 172], [80, 160], [90, 168], [78, 96]], r, 1)));
  return { vb: [120, 180], paths: out };
}

function paws(seed = 19) {
  const r = rng(seed), out = [];
  const paw = (x, y, t) => {
    out.push(loop(x, y + 4, 11, 9, r, { n: 14, wob: 0.04, tilt: t }));
    [[-14, -14], [-5, -21], [5, -21], [14, -14]].forEach(([dx, dy]) => {
      const [[px, py]] = rot([[x + dx, y + dy]], t, x, y);
      out.push(A(loop(px, py, 3.6, 4.6, r, { n: 10, tilt: t })));
    });
  };
  paw(28, 120, -20); paw(70, 84, 10); paw(46, 42, -15); paw(92, 22, 15);
  return { vb: [120, 140], paths: out };
}

function cup() {
  return {
    vb: [130, 150],
    paths: [
      smooth([[22, 58], [25, 92], [30, 122], [44, 132], [76, 132], [90, 122], [95, 92], [98, 58]]),
      smooth([[20, 58], [60, 62], [100, 57]]),
      smooth([[97, 72], [116, 70], [120, 88], [108, 104], [92, 106]]),
      smooth([[6, 138], [40, 145], [80, 145], [124, 137]]),
      A(smooth([[44, 48], [38, 36], [47, 24], [41, 10]])),
      A(smooth([[62, 46], [56, 32], [66, 20], [59, 4]])),
      A(smooth([[80, 48], [74, 36], [83, 24], [77, 12]])),
    ],
  };
}

function cake() {
  return {
    vb: [150, 130],
    paths: [
      line([[14, 74], [130, 44], [136, 102], [20, 116], [14, 74]]),
      smooth([[14, 74], [10, 84], [16, 92], [24, 86], [32, 94], [40, 86], [50, 92], [58, 84]]),
      line([[17, 96], [134, 78]]),
      line([[130, 44], [116, 36], [12, 66], [14, 74]]),
      A(loop(118, 26, 8, 8, rng(2), { n: 12 })),
      A(smooth([[120, 18], [124, 8], [132, 4]])),
    ],
  };
}

function heart(seed = 23) {
  const r = rng(seed), pts = [];
  for (let i = 0; i <= 30; i++) {
    const t = Math.PI + (i / 28) * TAU;
    const x = 16 * Math.sin(t) ** 3, y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    pts.push([60 + x * 3.2 + (r() - 0.5) * 2, 52 - y * 3.2 + (r() - 0.5) * 2]);
  }
  return { vb: [120, 110], paths: [smooth(pts), A(sparkle(104, 18, 9)), A(dot(14, 22, 2.2))] };
}

function speech(seed = 29) {
  const r = rng(seed);
  return {
    vb: [200, 150],
    paths: [
      smooth(jit([[30, 14], [110, 10], [124, 22], [124, 62], [110, 72], [56, 72], [38, 92], [42, 72], [24, 70], [14, 58], [14, 24], [32, 13]], r, 1)),
      A(dot(48, 42, 3)), A(dot(68, 42, 3)), A(dot(88, 42, 3)),
      loop(150, 104, 40, 28, r, { n: 18, start: 2.2, over: 0.1 }),
      smooth([[132, 129], [126, 144], [146, 132]]),
      smooth([[132, 100], [148, 96], [168, 102]]),
      smooth([[134, 112], [160, 110]]),
    ],
  };
}

function sun(seed = 31) {
  const r = rng(seed), out = [loop(60, 60, 24, 24, r, { n: 16 })];
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * TAU + 0.12, r1 = 34, r2 = k % 2 ? 46 : 52;
    const d = line([[60 + Math.cos(a) * r1, 60 + Math.sin(a) * r1], [60 + Math.cos(a) * r2, 60 + Math.sin(a) * r2]]);
    out.push(k % 3 === 0 ? A(d) : d);
  }
  return { vb: [120, 120], paths: out };
}

function music(seed = 37) {
  const r = rng(seed);
  return {
    vb: [150, 130],
    paths: [
      loop(26, 104, 11, 8, r, { n: 12, tilt: -20 }), line([[36, 100], [38, 34]]), smooth([[38, 34], [52, 44], [58, 60], [50, 72]]),
      A(loop(84, 96, 10, 7.5, r, { n: 12, tilt: -20 })), A(loop(124, 86, 10, 7.5, r, { n: 12, tilt: -20 })),
      line([[93, 92], [96, 30]]), line([[133, 82], [136, 20]]), line([[96, 30], [136, 20]]), line([[96, 40], [136, 30]]),
    ],
  };
}

function cricket(seed = 41) {
  const r = rng(seed);
  const bat = rot([[46, 6], [54, 6], [54, 50], [64, 58], [64, 148], [60, 156], [40, 156], [36, 148], [36, 58], [46, 50], [46, 6]], 18, 50, 90);
  return {
    vb: [200, 180],
    paths: [
      line(jit(bat, r, 0.6)), line(rot([[44, 14], [56, 14]], 18, 50, 90)), line(rot([[44, 24], [56, 24]], 18, 50, 90)), line(rot([[44, 34], [56, 34]], 18, 50, 90)),
      ...[130, 146, 162].map((x) => line([[x, 72], [x + 1, 168]])),
      A(line([[126, 72], [148, 70]])), A(line([[148, 70], [167, 72]])),
      loop(100, 152, 12, 12, r, { n: 14 }), A(smooth([[92, 144], [99, 152], [108, 160]])),
      line([[8, 170], [194, 170]]),
    ],
  };
}

function swing() {
  return {
    vb: [200, 170],
    paths: [
      line([[22, 166], [58, 14], [94, 166]]), line([[106, 166], [142, 14], [178, 166]]),
      line([[44, 16], [160, 12]]),
      line([[86, 15], [84, 116]]), line([[118, 14], [120, 116]]),
      A(line([[74, 116], [130, 116], [128, 124], [76, 124], [74, 116]])),
      A(smooth([[150, 70], [168, 60], [186, 66]])),
    ],
  };
}

function tree(seed = 43) {
  const r = rng(seed), pts = [];
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * TAU;
    const rr = 42 + 7 * Math.sin(t * 6) + (r() - 0.5) * 3;
    pts.push([70 + Math.cos(t) * rr * 1.05, 62 + Math.sin(t) * rr * 0.9]);
  }
  return { vb: [140, 190], paths: [smooth(pts, true), line([[64, 100], [62, 184]]), line([[78, 100], [80, 184]]), smooth([[72, 140], [88, 126], [98, 124]]), line([[30, 186], [110, 186]]), A(sparkle(118, 24, 7))] };
}

function xtree(seed = 47) {
  const r = rng(seed);
  const left = [[70, 26], [46, 64], [58, 64], [32, 104], [46, 104], [16, 146], [70, 146]];
  const right = [[70, 146], [124, 146], [94, 104], [108, 104], [82, 64], [94, 64], [70, 26]];
  return {
    vb: [140, 190],
    paths: [
      line(jit([...left, ...right.slice(1)], r, 1)),
      A(`M70 2l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z`),
      A(loop(58, 92, 4, 4, r, { n: 10 })), A(loop(86, 122, 4, 4, r, { n: 10 })), A(loop(44, 132, 4, 4, r, { n: 10 })),
      smooth([[40, 82], [70, 92], [96, 78]]), smooth([[30, 120], [70, 132], [112, 116]]),
      line([[62, 146], [62, 172], [78, 172], [78, 146]]),
    ],
  };
}

function glasses(seed = 53) {
  const r = rng(seed);
  const glass = (cx, t) => rot([[cx - 22, 40], [cx - 20, 70], [cx, 84], [cx + 20, 70], [cx + 22, 40]], t, cx, 100);
  const stem = (cx, t) => rot([[cx, 84], [cx, 128], [cx - 18, 132], [cx + 18, 132]], t, cx, 100);
  const g = [];
  [[60, -14], [128, 14]].forEach(([cx, t]) => {
    g.push(smooth(jit(glass(cx, t), r, 0.6)));
    const s = stem(cx, t);
    g.push(line([s[0], s[1]]), line([s[2], s[3]]));
    const top = rot([[cx - 22, 40], [cx + 22, 40]], t, cx, 100);
    g.push(line(top));
    const wine = rot([[cx - 21, 56], [cx, 60], [cx + 21, 56]], t, cx, 100);
    g.push(A(smooth(wine)));
  });
  g.push(A(line([[92, 18], [90, 6]])), A(line([[100, 20], [108, 8]])), A(line([[84, 22], [74, 12]])));
  return { vb: [190, 150], paths: g };
}

function table() {
  return {
    vb: [220, 180],
    paths: [
      line([[70, 104], [150, 104]]), line([[110, 104], [110, 168]]), smooth([[90, 172], [110, 168], [130, 172]]),
      smooth([[30, 54], [26, 92], [34, 124]]), line([[30, 124], [68, 124]]), line([[34, 124], [28, 172]]), line([[64, 124], [70, 172]]),
      smooth([[190, 54], [194, 92], [186, 124]]), line([[190, 124], [152, 124]]), line([[186, 124], [192, 172]]), line([[156, 124], [150, 172]]),
      A(line([[88, 84], [90, 104], [102, 104], [104, 84], [88, 84]])), A(line([[118, 84], [120, 104], [132, 104], [134, 84], [118, 84]])),
      smooth([[94, 76], [92, 68], [97, 60]]), smooth([[126, 76], [124, 68], [129, 60]]),
    ],
  };
}

function flames(seed = 59) {
  const r = rng(seed);
  const flame = (x, h, w) => smooth(jit([[x, 150], [x - w * 0.85, 140], [x - w, 118], [x - w * 0.6, 150 - h * 0.55], [x - w * 0.05, 150 - h * 0.78], [x + w * 0.05, 150 - h], [x + w * 0.35, 150 - h * 0.62], [x + w * 0.95, 122], [x + w * 0.8, 142], [x, 150]], r, 1));
  return {
    vb: [180, 180],
    paths: [flame(90, 120, 30), A(flame(58, 80, 22)), flame(122, 90, 22), line([[30, 164], [150, 148]]), line([[30, 148], [150, 166]]), A(dot(70, 26, 2.4)), A(dot(118, 38, 2)), A(sparkle(140, 18, 7))],
  };
}

function hall() {
  return {
    vb: [240, 190],
    paths: [
      line([[24, 176], [24, 82], [120, 18], [216, 82], [216, 176]]),
      line([[160, 46], [160, 20], [178, 20], [178, 58]]),
      line([[104, 176], [104, 128], [136, 128], [136, 176]]),
      line([[48, 104], [84, 104], [84, 140], [48, 140], [48, 104]]), line([[66, 104], [66, 140]]),
      line([[156, 104], [192, 104], [192, 140], [156, 140], [156, 104]]), line([[174, 104], [174, 140]]),
      smooth([[96, 76], [120, 64], [144, 76]]),
      line([[4, 178], [236, 178]]),
      ...[[60, 58], [92, 40], [148, 40], [180, 58]].map(([x, y], i) => (i % 2 ? A : (d) => d)(line([[x - 7, y], [x + 7, y + 1], [x, y + 14], [x - 7, y]])))
    ],
  };
}

function walker() {
  return {
    vb: [170, 270],
    paths: [
      smooth([[72, 44], [70, 22], [84, 10], [102, 14], [108, 30], [108, 46], [96, 44]]),
      line([[78, 30], [104, 28]]),
      line([[88, 46], [88, 56]]),
      smooth([[66, 62], [88, 54], [112, 62], [122, 112], [120, 146], [94, 152], [68, 148], [62, 104], [66, 62]]),
      smooth([[70, 70], [48, 92], [34, 106]]), smooth([[80, 86], [56, 108], [44, 116]]),
      A(line([[18, 92], [22, 126], [40, 126], [44, 92], [18, 92]])), A(line([[16, 92], [46, 92]])),
      line([[74, 150], [52, 240]]), line([[92, 152], [64, 242]]), line([[98, 152], [114, 240]]), line([[118, 148], [130, 238]]),
      line([[44, 242], [70, 244]]), line([[110, 242], [136, 240]]),
    ],
  };
}

function stretcher() {
  return {
    vb: [140, 270],
    paths: [
      loop(70, 52, 14, 15, rng(61), { n: 14 }),
      smooth([[54, 76], [70, 70], [86, 76], [90, 150], [70, 156], [50, 150], [54, 76]]),
      smooth([[56, 80], [40, 46], [32, 10]]), smooth([[84, 80], [100, 46], [108, 10]]),
      line([[60, 154], [54, 240]]), line([[80, 154], [88, 240]]),
      line([[42, 242], [58, 242]]), line([[84, 242], [100, 242]]),
      A(smooth([[10, 250], [70, 254], [130, 250]])),
      A(sparkle(122, 40, 8)), A(sparkle(20, 60, 6)),
    ],
  };
}

function arrow() {
  return { vb: [160, 90], paths: [smooth([[6, 70], [34, 30], [62, 60], [44, 74], [40, 52], [80, 26], [140, 30]]), line([[124, 18], [142, 30], [126, 44]])] };
}

function sprig(seed = 67) {
  const r = rng(seed), out = [smooth([[20, 170], [40, 120], [70, 70], [110, 20]])];
  const leaf = (x, y, a, s) => {
    const tip = [x + Math.cos(a) * s, y + Math.sin(a) * s];
    const n = [-Math.sin(a) * s * 0.32, Math.cos(a) * s * 0.32];
    return smooth([[x, y], [x + (tip[0] - x) / 2 + n[0], y + (tip[1] - y) / 2 + n[1]], tip, [x + (tip[0] - x) / 2 - n[0], y + (tip[1] - y) / 2 - n[1]], [x, y]]);
  };
  [[36, 132, -2.6], [42, 118, -0.6], [56, 94, -2.4], [64, 82, -0.4], [84, 54, -2.2], [92, 44, -0.2]].forEach(([x, y, a], i) => {
    const d = leaf(x, y, a + (r() - 0.5) * 0.2, 30);
    out.push(i % 3 === 1 ? A(d) : d);
  });
  return { vb: [130, 180], paths: out };
}

export const ART = {
  bunting: bunting(), lights: lights(), burst: burst(), burst2: burst(71, 12), sparkles: sparkles(), flowers: flowers(),
  balloons: balloons(), rosette: rosette(), paws: paws(), cup: cup(), cake: cake(), heart: heart(), speech: speech(),
  sun: sun(), music: music(), cricket: cricket(), swing: swing(), tree: tree(), xtree: xtree(), glasses: glasses(),
  table: table(), flames: flames(), hall: hall(), walker: walker(), stretcher: stretcher(), arrow: arrow(), sprig: sprig(),
};

// A gathering: two friends chatting over coffee, a child with a balloon and a
// dog. Strokes are in drawing order, person by person.
function people() {
  const r = rng(73);
  return {
    vb: [430, 300],
    paths: [
      // Friend 1, cap and big T-shirt, holding a cup
      loop(78, 42, 14, 15, r, { n: 14 }),
      smooth([[63, 36], [70, 24], [86, 23], [94, 33], [106, 34]]),
      line([[78, 57], [78, 63]]),
      smooth([[56, 72], [78, 63], [100, 71], [107, 150], [78, 157], [51, 150], [56, 72]]),
      smooth([[59, 80], [50, 118], [55, 146]]),
      smooth([[97, 78], [110, 108], [127, 104]]),
      line([[56, 152], [48, 270], [72, 272], [80, 178], [88, 272], [112, 270], [104, 152]]),
      smooth([[44, 272], [45, 283], [76, 284], [74, 273]]),
      smooth([[86, 274], [87, 284], [118, 283], [113, 272]]),
      A(line([[126, 92], [128, 112], [141, 112], [143, 92], [126, 92]])),
      // Friend 2, bob hair and long coat, holding a cup and a bag
      loop(198, 44, 13, 14, r, { n: 14 }),
      smooth([[184, 56], [180, 36], [192, 26], [208, 28], [215, 42], [214, 58], [206, 56]]),
      line([[198, 58], [198, 65]]),
      smooth([[180, 72], [198, 65], [216, 72], [226, 192], [168, 192], [180, 72]]),
      smooth([[182, 82], [168, 110], [154, 107]]),
      smooth([[214, 82], [224, 122], [221, 150]]),
      A(line([[214, 150], [215, 172], [234, 171], [233, 150], [214, 150]])),
      A(smooth([[217, 150], [223, 139], [230, 150]])),
      A(line([[146, 94], [148, 114], [160, 114], [162, 94], [146, 94]])),
      line([[190, 192], [187, 272]]), line([[208, 192], [212, 272]]),
      line([[176, 275], [194, 273]]), line([[208, 273], [226, 275]]),
      A(line([[140, 78], [136, 68]])), A(line([[145, 76], [146, 64]])), A(line([[150, 78], [156, 69]])),
      // Child with a balloon
      loop(304, 150, 11, 12, r, { n: 12 }),
      smooth([[293, 145], [285, 139], [283, 151]]), smooth([[315, 145], [323, 139], [325, 151]]),
      smooth([[292, 167], [304, 163], [316, 167], [321, 228], [287, 228], [292, 167]]),
      smooth([[293, 174], [284, 197], [286, 212]]),
      smooth([[315, 172], [325, 152], [331, 132]]),
      line([[298, 228], [296, 272]]), line([[310, 228], [312, 272]]),
      line([[288, 274], [298, 273]]), line([[311, 273], [321, 274]]),
      smooth([[331, 132], [337, 112], [332, 94], [339, 80]]),
      A(loop(342, 58, 16, 20, r, { n: 16, wob: 0.03 })),
      A(line([[338, 80], [342, 76], [346, 80], [338, 80]])),
      // Dog
      loop(376, 212, 13, 12, r, { n: 12 }),
      smooth([[367, 203], [359, 210], [362, 226]]),
      smooth([[364, 214], [352, 217], [354, 224], [366, 223]]),
      smooth([[384, 222], [398, 238], [402, 264], [398, 278], [376, 279], [372, 258], [374, 232]]),
      line([[378, 252], [376, 279]]),
      A(smooth([[400, 268], [414, 262], [419, 247]])),
      // Ground
      A(smooth([[18, 290], [210, 293], [418, 289]])),
    ],
  };
}
ART.people = people();
