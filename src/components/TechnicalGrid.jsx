import React from 'react';
import PhysicsCard from './PhysicsCard';

const TechnicalGrid = () => {
  return (
    <>
      <PhysicsCard style={{ top: '15%', left: '60%', width: '300px' }}>
        <h3 className="mono" style={{ color: '#6366f1', margin: '0 0 0.5rem 0' }}>// Python Automation</h3>
        <p style={{ fontSize: '0.9rem', color: '#A0A0B0' }}>
          Practiced basic data-processing automation. Built pipelines for ETL tasks.
        </p>
      </PhysicsCard>

      <PhysicsCard style={{ top: '45%', left: '70%', width: '300px' }}>
        <h3 className="mono" style={{ color: '#007AFF', margin: '0 0 0.5rem 0' }}>// Graphic Design</h3>
        <p style={{ fontSize: '0.9rem', color: '#A0A0B0' }}>
          Completed a short graphic designing internship. Focused on visual communication.
        </p>
      </PhysicsCard>
    </>
  );
};

export default TechnicalGrid;
