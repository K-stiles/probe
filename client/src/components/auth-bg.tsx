import { ReactNode } from "react";

export const AuthBackground = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full  relative grid-animated-container">
    <BgPattern />
    <div className="relative z-10">{children}</div>
  </div>
);

export const BgPattern = () => (
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(90deg, rgba(16,185,129,0.25) 1px, transparent 0),
        linear-gradient(180deg, rgba(16,185,129,0.25) 1px, transparent 0),
        repeating-linear-gradient(45deg, rgba(16,185,129,0.2) 0 2px, transparent 2px 6px)
      `,
      backgroundSize: "24px 24px, 24px 24px, 24px 24px",
      WebkitMask:
        "radial-gradient(circle at var(--x, 50%) var(--y, 50%), black 0, transparent 30%)",
      mask: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), black 0, transparent 30%)",
      animation: "spotlight 8s ease-in-out infinite",
    }}
  />
);
