/** Cinematic ambient background shared across the public and authenticated experience. */
export function MagicBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,oklch(0.92_0.02_260/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.02_260/0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="animate-fog absolute -top-48 right-[-10%] size-[36rem] rounded-full bg-primary/14 blur-3xl" />
      <div className="animate-fog absolute -bottom-64 left-[-8%] size-[42rem] rounded-full bg-secondary/12 blur-3xl [animation-delay:-7s]" />
      <div className="absolute left-[15%] top-[13%] h-px w-[70%] -rotate-6 bg-gradient-to-r from-transparent via-primary/45 to-transparent shadow-[0_0_22px_oklch(0.68_0.2_34/0.4)]" />
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="animate-sparkle absolute rounded-full bg-primary-glow"
          style={particle}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,oklch(0.105_0.018_265/0.78)_100%)]" />
    </div>
  );
}

const PARTICLES = [
  { top: "14%", left: "10%", width: 3, height: 3, animationDelay: "0s" },
  { top: "28%", left: "87%", width: 2, height: 2, animationDelay: ".7s" },
  { top: "48%", left: "18%", width: 3, height: 3, animationDelay: "1.4s" },
  { top: "66%", left: "92%", width: 2, height: 2, animationDelay: ".3s" },
  { top: "82%", left: "34%", width: 3, height: 3, animationDelay: "1.9s" },
  { top: "38%", left: "56%", width: 2, height: 2, animationDelay: "2.3s" },
];
