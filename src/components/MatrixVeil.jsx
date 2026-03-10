import { useRef, useEffect } from 'react';
import './MatrixVeil.css';

/**
 * MatrixVeil — a WebGL background inspired by perspective binary-code streams
 * converging to a vanishing point, deep navy + matrix-green palette.
 *
 * Props:
 *   speed           {number}  animation speed multiplier  (default 0.18)
 *   greenIntensity  {number}  0–1 brightness of green streams (default 0.85)
 *   blueGlow        {number}  0–1 intensity of the blue radial glow (default 0.6)
 *   noiseAmount     {number}  0–1 film-grain overlay (default 0.035)
 *   streamCount     {number}  number of binary columns (default 28)
 *   vanishX         {number}  0–1 horizontal vanish point (default 0.5)
 *   vanishY         {number}  0–1 vertical vanish point (default 0.42)
 */
export default function MatrixVeil({
  speed = 0.18,
  greenIntensity = 0.85,
  blueGlow = 0.6,
  noiseAmount = 0.035,
  streamCount = 28,
  vanishX = 0.5,
  vanishY = 0.42,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let startTime = performance.now();

    // ── column state ────────────────────────────────────────────────────────
    const cols = [];

    const init = () => {
      const W = canvas.width;
      const H = canvas.height;
      cols.length = 0;

      for (let i = 0; i < streamCount; i++) {
        const t = i / (streamCount - 1); // 0 … 1 across bottom edge

        // spread columns across bottom, they converge to vanish point
        const bx = W * (0.05 + t * 0.90);
        const by = H;

        // target near the vanish point with slight scatter
        const vx = W * vanishX + (Math.random() - 0.5) * W * 0.08;
        const vy = H * vanishY + (Math.random() - 0.5) * H * 0.06;

        const dx = vx - bx;
        const dy = vy - by; // negative (going up)
        const len = Math.sqrt(dx * dx + dy * dy);

        // number of glyphs along this stream (perspective: fewer near horizon)
        const depth = Math.abs(dy) / H; // 0 = horizon, 1 = bottom
        const glyphCount = Math.max(4, Math.floor(depth * 32));

        // random offset so streams don't all start at same phase
        const phaseOffset = Math.random() * 1000;

        // color: left side more pure green, right side more cyan-ish
        const hue = 120 + t * 30; // 120°(green) → 150°(teal)
        const saturation = 80 + Math.random() * 20;

        cols.push({ bx, by, vx, vy, dx, dy, len, glyphCount, phaseOffset, hue, saturation, depth });
      }
    };

    // ── resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      init();
    };

    window.addEventListener('resize', resize);
    resize();

    // ── random binary glyph ──────────────────────────────────────────────────
    const glyphs = '01';
    const glyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

    // pre-generate per-col glyph arrays (they flicker individually)
    const glyphArrays = cols.map(c => Array.from({ length: c.glyphCount }, glyph));

    // ── draw loop ────────────────────────────────────────────────────────────
    const draw = (now) => {
      const t = ((now - startTime) / 1000) * speed;
      const W = canvas.width;
      const H = canvas.height;

      // ── background: deep space gradient ──────────────────────────────────
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      const bg = ctx.createRadialGradient(
        W * 0.35, H * 0.35, 0,
        W * 0.5,  H * 0.5,  Math.max(W, H) * 0.85
      );
      bg.addColorStop(0,   '#07102a');  // deep indigo center
      bg.addColorStop(0.5, '#040d1c');
      bg.addColorStop(1,   '#010508');  // near-black edge
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── top-right green glow (like the image) ────────────────────────────
      const trgGlow = ctx.createRadialGradient(W * 0.82, H * 0.18, 0, W * 0.82, H * 0.18, W * 0.38);
      trgGlow.addColorStop(0, `rgba(0,80,20,${0.28 * blueGlow})`);
      trgGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = trgGlow;
      ctx.fillRect(0, 0, W, H);

      // ── center-left blue glow ─────────────────────────────────────────────
      const blGlow = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.55);
      blGlow.addColorStop(0, `rgba(10,30,100,${0.35 * blueGlow})`);
      blGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = blGlow;
      ctx.fillRect(0, 0, W, H);

      // ── streams ───────────────────────────────────────────────────────────
      cols.forEach((col, ci) => {
        const { bx, by, dx, dy, len, glyphCount, phaseOffset, hue, saturation, depth } = col;

        // glyph flip frequency (very slow for ambient feel)
        const flipPeriod = 2.5 + depth * 4;
        if (Math.floor((t + phaseOffset) * 3) !== Math.floor((t + phaseOffset - 0.016) * 3)) {
          // stagger flips
          const flipIdx = Math.floor(Math.random() * glyphCount);
          glyphArrays[ci][flipIdx] = glyph();
        }

        for (let g = 0; g < glyphCount; g++) {
          // g=0 is near vanish (top), g=glyphCount-1 is at bottom
          const frac = g / glyphCount; // 0=horizon … 1=bottom

          // position along stream line
          const px = bx + dx * (1 - frac);
          const py = by + dy * (1 - frac);

          // perspective scale: tiny near horizon, large near bottom
          const scl = 0.12 + frac * 0.88;
          const fontSize = Math.max(7, Math.floor(scl * 18 * depth));

          // brightness: brighter near bottom, fade near horizon
          const brightness = 30 + frac * 70;
          // leading glyph (head) is brighter
          const isHead = g === glyphCount - 1;
          const alpha = isHead
            ? Math.min(1, greenIntensity * 1.4)
            : frac * greenIntensity * 0.9;

          ctx.globalAlpha = alpha;
          ctx.font = `${fontSize}px 'Courier New', monospace`;

          if (isHead) {
            // bright white-green head
            ctx.fillStyle = `hsl(${hue}, 80%, 88%)`;
          } else {
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${brightness * greenIntensity}%)`;
          }

          ctx.fillText(glyphArrays[ci][g], px - fontSize * 0.3, py);
        }

        // ── glow line along the stream ─────────────────────────────────────
        const grad = ctx.createLinearGradient(bx, by, col.vx, col.vy);
        grad.addColorStop(0, `hsla(${hue},90%,45%,${0.18 * depth * greenIntensity})`);
        grad.addColorStop(0.7, `hsla(${hue},90%,35%,${0.08 * greenIntensity})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(0.5, depth * 2.5);
        ctx.globalCompositeOperation = 'screen';
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(col.vx, col.vy);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
      });

      // ── film grain ────────────────────────────────────────────────────────
      if (noiseAmount > 0) {
        const imgData = ctx.getImageData(0, 0, W, H);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * noiseAmount * 255;
          d[i]     = Math.min(255, Math.max(0, d[i] + n));
          d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + n));
          d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + n));
        }
        ctx.putImageData(imgData, 0, 0);
      }

      // ── dark vignette border ──────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, Math.max(W, H) * 0.8);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.72)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [speed, greenIntensity, blueGlow, noiseAmount, streamCount, vanishX, vanishY]);

  return <canvas ref={canvasRef} className="matrixveil-canvas" />;
}