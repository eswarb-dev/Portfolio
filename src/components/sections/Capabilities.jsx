import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillBar = ({ name, level, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="mb-6 last:mb-0"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest leading-none">{name}</span>
      <span className="text-sm font-mono text-accent-blue">{level}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 1, ease: "circOut" }}
        className="h-full bg-gradient-to-r from-accent-blue to-accent-indigo"
      />
    </div>
  </motion.div>
);

const Capabilities = () => {
  const radarData = {
    labels: ['Teamwork', 'Communication', 'Volunteering', 'Problem-Solving', 'Adaptability'],
    datasets: [
      {
        label: 'Level',
        data: [90, 75, 70, 85, 90],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'monospace',
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
      <div>
        <h2 className="text-3xl font-black mb-8 tracking-tighter">Core Competencies</h2>
        <GlassCard className="border-accent-blue/20">
          <SkillBar name="Python / Automation" level={90} delay={0.1} />
          <SkillBar name="Prompt Engineering / GEN Ai" level={75} delay={0.2} />
          <SkillBar name="UI / UX" level={85} delay={0.3} />
          <SkillBar name="Graphic Design" level={80} delay={0.4} />
        </GlassCard>
      </div>

      <div>
        <h2 className="text-3xl font-black mb-8 tracking-tighter uppercase">Professional Skills</h2>
        <GlassCard className="h-[400px] flex items-center justify-center border-accent-indigo/20" delay={0.2}>
          <div className="w-full h-full relative p-4">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default Capabilities;
