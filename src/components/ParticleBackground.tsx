import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  isDark: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: 'blue' | 'purple';
}

export function ParticleBackground({ isDark }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const particleCount = width < 768 ? 24 : 44;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.6 + 0.9,
      alpha: Math.random() * 0.38 + 0.14,
      hue: i % 2 === 0 ? 'blue' : 'purple',
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const color =
          p.hue === 'blue'
            ? isDark
              ? `rgba(96, 165, 250, ${p.alpha})`
              : `rgba(37, 99, 235, ${p.alpha * 0.55})`
            : isDark
              ? `rgba(167, 139, 250, ${p.alpha})`
              : `rgba(124, 58, 237, ${p.alpha * 0.5})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Subtle connecting lines between close neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            const lineAlpha = (1 - dist / 135) * (isDark ? 0.11 : 0.075);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isDark
              ? `rgba(129, 140, 248, ${lineAlpha})`
              : `rgba(79, 70, 229, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationId = window.requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
    >
      {/* Base atmospheric canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-indigo-50/40 dark:from-[#070B19] dark:via-[#0A1024] dark:to-[#070B19] transition-colors duration-500" />

      {/* Subtle animated blue & purple ambient meshes */}
      <div className="animate-gradient-drift absolute -top-36 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] rounded-full bg-gradient-to-r from-blue-500/18 via-indigo-500/16 to-purple-500/18 dark:from-blue-600/20 dark:via-indigo-600/18 dark:to-purple-600/20 blur-[120px]" />
      <div className="animate-gradient-drift-reverse absolute top-[38%] -left-44 w-[34rem] h-[34rem] rounded-full bg-blue-500/10 dark:bg-blue-600/12 blur-[130px]" />
      <div className="animate-gradient-drift absolute top-[66%] -right-44 w-[36rem] h-[36rem] rounded-full bg-purple-500/10 dark:bg-purple-600/14 blur-[140px]" />

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(148, 163, 184, 0.22) 1px, transparent 1px)'
            : 'radial-gradient(rgba(99, 102, 241, 0.16) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Interactive lightweight particle layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
