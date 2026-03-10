import React from 'react';
import PhysicsCard from './PhysicsCard';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LanguageMeter = ({ lang, level, percent }) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span className="mono" style={{ fontSize: '0.8rem' }}>{lang}</span>
      <span className="mono" style={{ fontSize: '0.8rem', color: '#A0A0B0' }}>{level}</span>
    </div>
    <div className="language-bar-container">
      <div className="language-bar" style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

const Capabilities = () => {
  const radarData = {
    labels: ['Teamwork', 'Communication', 'Volunteering', 'Problem Solving', 'Adaptability'],
    datasets: [
      {
        label: 'Strengths',
        data: [90, 85, 75, 80, 85],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#EAEAEA', font: { family: 'Geist Mono', size: 10 } },
        ticks: { display: false, count: 5 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <>
      <PhysicsCard style={{ top: '70%', left: '40%', width: '250px' }}>
        <h4 className="mono bento-header" style={{ marginBottom: '1.5rem' }}>Linguistic</h4>
        <LanguageMeter lang="English" level="Fluent" percent={90} />
        <LanguageMeter lang="Tamil" level="Native" percent={100} />
        
      </PhysicsCard>

      <PhysicsCard style={{ top: '65%', left: '65%', width: 'auto' }}>
        <h4 className="mono bento-header" style={{ marginBottom: '1rem', textAlign: 'center' }}>Soft Skills</h4>
        <div className="radar-container">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </PhysicsCard>
    </>
  );
};

export default Capabilities;
