
import React from 'react';
import AttacksChartCard from './AttacksChartCard';
import SystemHealthCard from './SystemHealthCard';

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <AttacksChartCard />
      <SystemHealthCard />
    </div>
  );
};

export default ChartSection;
