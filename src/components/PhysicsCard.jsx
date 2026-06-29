import React, { useEffect, useRef } from 'react';
import { useGravity } from './gravityContext';

const PhysicsCard = ({ children, className = '', options = {}, ...props }) => {
  const cardRef = useRef(null);
  const { registerBody } = useGravity();

  useEffect(() => {
    let cleanup;
    if (registerBody) {
      // Try to register as soon as possible, but need a frame for layout
      const handle = requestAnimationFrame(() => {
        cleanup = registerBody(cardRef, options);
        // If it failed (0 width), try once more after a delay
        if (!cleanup) {
          setTimeout(() => {
            cleanup = registerBody(cardRef, options);
          }, 500);
        }
      });
      return () => {
        cancelAnimationFrame(handle);
        if (cleanup) cleanup();
      };
    }
  }, [options, registerBody]);

  return (
    <div 
      ref={cardRef} 
      className={`glass-card ${className}`}
      style={{ 
        position: 'absolute', 
        cursor: 'grab', 
        userSelect: 'none',
        padding: '1.5rem',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default PhysicsCard;
