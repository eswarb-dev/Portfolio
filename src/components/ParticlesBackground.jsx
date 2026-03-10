import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
      <Particles
        id="tsparticles"
        className="h-full w-full"
        options={{
        background: {
          color: {
            value: "transparent"
          }
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 80
          },
          color: {
            value: "#4cc9f0"
          },
          opacity: {
            value: 0.4
          },
          size: {
            value: { min: 2, max: 4 }
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: {
              default: "out"
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#4cc9f0",
            opacity: 0.2,
            width: 1
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            }
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5
              }
            }
          }
        },
        detectRetina: true
      }}
    />
    </div>
  );
}
