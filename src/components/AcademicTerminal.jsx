import React, { useState, useEffect } from 'react';
import PhysicsCard from './PhysicsCard';

const AcademicTerminal = () => {
  const [text, setText] = useState('');
  const fullContent = `root@eswar:~$ cat education.txt\n\n> Sri Ramakrishna Engineering College\n  Coimbatore | 2024-2028\n\n> Jaycees Matric Hr. Sec. School\n  Tirupur | 2023-2024`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullContent.slice(0, i));
      i++;
      if (i > fullContent.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <PhysicsCard style={{ top: '25%', left: '35%' }} className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ backgroundColor: '#FF5F56' }}></div>
        <div className="terminal-dot" style={{ backgroundColor: '#FFBD2E' }}></div>
        <div className="terminal-dot" style={{ backgroundColor: '#27C93F' }}></div>
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#00FF41' }} className="mono">
        {text}
        <span className="cursor"></span>
      </pre>
    </PhysicsCard>
  );
};

export default AcademicTerminal;
