import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { GravityContext } from './gravityContext';

const GravityCanvas = ({ children }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const bodiesMap = useRef(new Map());

  useEffect(() => {
    const engine = engineRef.current;
    const world = engine.world;
    
    // Antigravity feel: very low gravity or zero
    engine.gravity.y = 0; 
    engine.gravity.x = 0;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false,
        pixelRatio: 1
      }
    });

    render.canvas.style.display = 'none';

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Boundaries
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true }
    );
    const ceiling = Matter.Bodies.rectangle(
      window.innerWidth / 2, -50, window.innerWidth, 100, { isStatic: true }
    );
    const leftWall = Matter.Bodies.rectangle(
      -50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true }
    );
    const rightWall = Matter.Bodies.rectangle(
      window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true }
    );

    Matter.Composite.add(world, [ground, ceiling, leftWall, rightWall]);

    // Mouse control - allow interaction with the whole screen
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false }
      }
    });

    Matter.Composite.add(world, mouseConstraint);

    // Single update loop for all bodies
    const update = () => {
      bodiesMap.current.forEach(({ body, ref, initialRect }) => {
        if (ref.current) {
          const { x, y } = body.position;
          const angle = body.angle;
          // Calculate displacement from initial position
          const dx = x - (initialRect.left + initialRect.width / 2);
          const dy = y - (initialRect.top + initialRect.height / 2);
          ref.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
        }
      });
      requestAnimationFrame(update);
    };
    const animId = requestAnimationFrame(update);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const registerBody = (ref, options = {}) => {
    if (!ref.current || bodiesMap.current.has(ref)) return;
    
    const rect = ref.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const body = Matter.Bodies.rectangle(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width,
      rect.height,
      {
        restitution: 0.7,
        frictionAir: 0.1,
        friction: 0.01,
        ...options
      }
    );

    // Initial floating motion
    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 1.5,
      y: (Math.random() - 0.5) * 1.5
    });

    Matter.Composite.add(engineRef.current.world, body);
    bodiesMap.current.set(ref, { body, ref, initialRect: rect });

    return () => {
      Matter.Composite.remove(engineRef.current.world, body);
      bodiesMap.current.delete(ref);
    };
  };

  return (
    <GravityContext.Provider value={{ registerBody }}>
      <div ref={sceneRef} style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}></div>
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        {children}
      </div>
    </GravityContext.Provider>
  );
};

export default GravityCanvas;
