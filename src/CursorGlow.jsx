import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y - 200,
        left: position.x - 200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(76,201,240,0.15) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 50,
        mixBlendMode: "screen"
      }}
    />
  );
}
