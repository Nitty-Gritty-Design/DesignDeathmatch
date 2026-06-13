/* VEKTRA v2 — Simplex-like noise and flow-field utilities */

const VEKTRA = {
  noise: (() => {
    const perm = new Uint8Array(512);
    const grad = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    let seed = 42;
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) {
      seed = (seed * 16807 + 0) % 2147483647;
      const j = seed % (i + 1);
      [perm[i], perm[j]] = [perm[j], perm[i]];
      perm[i + 256] = perm[i];
    }
    const dot = (g, x, y) => g[0]*x + g[1]*y;
    const fade = t => t*t*t*(t*(t*6-15)+10);
    const mix = (a, b, t) => a + t*(b - a);
    return (x, y) => {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const u = fade(x), v = fade(y);
      const a = perm[X] + Y, b = perm[X+1] + Y;
      return mix(
        mix(dot(grad[perm[a] % 12], x, y), dot(grad[perm[b] % 12], x-1, y), u),
        mix(dot(grad[perm[a+1] % 12], x, y-1), dot(grad[perm[b+1] % 12], x-1, y-1), u),
        v
      );
    };
  })(),

  lerp: (a, b, t) => a + (b - a) * t,
  clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, v)),
  dist: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),

  springPhysics: (() => {
    const targets = new Map();
    const values = new Map();
    const velocities = new Map();
    const stiffness = 0.08;
    const damping = 0.78;
    return {
      register(id, initial) {
        values.set(id, initial);
        targets.set(id, initial);
        velocities.set(id, 0);
      },
      setTarget(id, val) { targets.set(id, val); },
      getValue(id) { return values.get(id) || 0; },
      tick() {
        for (const [id] of targets) {
          if (!values.has(id)) values.set(id, targets.get(id));
          const v = values.get(id), t = targets.get(id), vel = velocities.get(id) || 0;
          const force = (t - v) * stiffness;
          velocities.set(id, (vel + force) * damping);
          values.set(id, v + velocities.get(id));
        }
      }
    };
  })()
};
