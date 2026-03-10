import React from 'react';
import PhysicsCard from './PhysicsCard';

const Hero = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText('eswarbalu28@gmail.com');
    alert('Email copied!');
  };

  return (
    <>
      <PhysicsCard 
        style={{ top: '15%', left: '10%', width: 'auto' }}
        className="neural-pulse-glow"
      >
        <h1 className="hero-title">ESWAR B</h1>
        <p className="hero-subtitle mono">Aspiring AI Engineering Student</p>
      </PhysicsCard>

      <PhysicsCard style={{ top: '40%', left: '15%' }}>
        <div className="status-badge mono">
          <span className="status-dot"></span>
          Current Status: B.Tech in AI & DS @ SREC
        </div>
      </PhysicsCard>

      <PhysicsCard style={{ top: '60%', left: '10%' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://linkedin.com/in/eswar-balu" target="_blank" className="btn-pill btn-blue mono">
            LinkedIn
          </a>
          <button onClick={copyEmail} className="btn-pill btn-outline mono">
            Copy Email
          </button>
        </div>
      </PhysicsCard>
    </>
  );
};

export default Hero;
