import React from 'react';

interface WatchTimeChartProps {
  watchTimeData: { [key: string]: number };
}

export function WatchTimeChart({ watchTimeData }: WatchTimeChartProps) {
  const months = Object.keys(watchTimeData).sort().slice(-6);
  const maxValue = Math.max(...Object.values(watchTimeData));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Watch History Timeline</h3>
      <div className="space-y-4">
        {months.map(month => {
          const value = watchTimeData[month];
          const percentage = (value / maxValue) * 100;
          const [year, monthNum] = month.split('-');
          const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'long' });
          
          return (
            <div key={month} className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  {monthName} {year}
                </span>
                <span className="text-sm font-medium text-gray-900">{value} videos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}