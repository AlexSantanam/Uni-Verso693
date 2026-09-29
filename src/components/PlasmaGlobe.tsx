import React, { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Volumetric plasma inside a glass sphere: swirling smoke (domain-warped fbm),
// radial filaments (ridged noise on the direction from the core), a hot core,
// fresnel rim and an outer halo. One filament bundle leans toward the pointer.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseOn;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return v;
}
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  float R = 0.8;
  vec2 q = uv / R;
  float r = length(q);
  float t = uTime;
  vec2 mdir = normalize(uMouse + 1e-4);

  if (r >= 1.0) {
    // outer halo
    // fades to exactly zero before the canvas edge (r = 1.25) so no square shows
    float h = exp(-(r - 1.0) * 8.0) * smoothstep(1.24, 1.0, r);
    vec3 hc = mix(vec3(0.35, 0.3, 1.0), vec3(0.2, 0.7, 1.0), 0.5 + 0.5 * sin(t * 0.3));
    float a = h * 0.55;
    gl_FragColor = vec4(hc * a, a);
    return;
  }

  float z = sqrt(1.0 - r * r);
  vec3 acc = vec3(0.0);

  for (int k = 0; k < 5; k++) {
    float d = float(k) / 4.0;
    vec3 s = vec3(q, mix(z, -z, d));
    s.xz *= rot(t * 0.12);
    s.yz *= rot(t * 0.05);

    vec3 w = vec3(
      fbm(s * 1.5 + vec3(0.0, 0.0, t * 0.22)),
      fbm(s * 1.5 + vec3(5.2, 1.3, 2.8) - t * 0.17),
      fbm(s * 1.5 + vec3(2.1, 7.7, 4.4) + t * 0.13));
    vec3 sp = s * 2.0 + w * 2.6;

    // swirling smoke
    float smoke = fbm(sp);
    smoke = smoothstep(0.35, 0.85, smoke);

    // filaments radiating from the core
    vec3 dir = normalize(s + 1e-4);
    float n = noise(dir * 3.2 + w * 1.4 + vec3(0.0, t * 0.35, t * 0.2));
    float fil = pow(1.0 - abs(n * 2.0 - 1.0), 18.0);
    float n2 = noise(dir * 6.5 - w + vec3(t * 0.5, 0.0, 0.0));
    fil += 0.6 * pow(1.0 - abs(n2 * 2.0 - 1.0), 26.0);
    float len = length(s);
    fil *= smoothstep(0.02, 0.25, len) * (0.6 + 0.8 * len);

    float core = exp(-len * 4.5);

    vec3 smokeCol = mix(vec3(0.16, 0.1, 0.6), vec3(0.1, 0.45, 0.95), smoothstep(0.2, 0.9, w.x));
    vec3 filCol = mix(vec3(0.55, 0.45, 1.0), vec3(0.6, 0.95, 1.0), w.y);

    acc += smokeCol * smoke * 0.9 + filCol * fil * 1.6 + vec3(1.0, 0.9, 1.0) * core * 0.9;
  }
  acc /= 3.2;

  // pointer: brighten plasma leaning toward the cursor
  float lean = pow(max(dot(normalize(q + 1e-4), mdir), 0.0), 6.0) * smoothstep(0.1, 0.9, r);
  acc += vec3(0.5, 0.8, 1.0) * lean * uMouseOn * 0.35;

  // glass: dark interior, fresnel rim, specular highlight
  vec3 base = vec3(0.012, 0.015, 0.05);
  float fres = pow(1.0 - z, 2.5);
  vec3 rim = mix(vec3(0.35, 0.3, 1.0), vec3(0.3, 0.8, 1.0), 0.5 + 0.5 * q.y) * fres * 0.9;
  float spec = smoothstep(0.32, 0.0, length(q - vec2(-0.38, 0.45))) * 0.22;

  vec3 col = base + acc + rim + spec;
  col = 1.0 - exp(-col * 1.5);
  float edge = smoothstep(1.0, 0.985, r);
  gl_FragColor = vec4(col * edge, edge);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
};

/** Real-time WebGL plasma lamp. Falls back to a static CSS glow without WebGL. */
export const PlasmaGlobe: React.FC<{ className?: string }> = ({ className = '' }) => {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = React.useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = host.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      setFailed(true);
      return;
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uMouseOn = gl.getUniformLocation(prog, 'uMouseOn');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0.6, y: 0.4, on: 0, target: 0 };
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      mouse.on += (mouse.target - mouse.on) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseOn, mouse.on);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mouse.x = e.clientX - cx;
      mouse.y = cy - e.clientY; // GL y points up
      const dist = Math.hypot(mouse.x, mouse.y);
      mouse.target = dist < r.width * 1.2 ? 1 : 0;
    };

    resize();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(wrap);

    // stop rendering when the globe is scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(wrap);

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div ref={host} className={`orb ${className}`} aria-hidden>
      {failed ? (
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,#c4b5fd_0%,#4f46e5_25%,#0b1030_70%)] shadow-[0_0_80px_rgba(99,102,241,0.5)]" />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
};
