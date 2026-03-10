import React from 'react';
import PhysicsCard from './PhysicsCard';

const Footer = () => {
  return (
    <PhysicsCard 
      style={{ bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: 'auto' }}
      options={{ isStatic: true }}
    >
      <div style={{ textAlign: 'center' }}>
        <p className="mono" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Get in Touch</p>
        <p className="mono" style={{ fontSize: '0.8rem', color: '#A0A0B0' }}>
          +91 8925252192 | eswarbalu28@gmail.com
        </p>
      </div>
    </PhysicsCard>
  );
};

export default Footer;
