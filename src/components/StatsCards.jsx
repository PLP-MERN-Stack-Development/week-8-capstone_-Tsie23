import React from 'react';

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;