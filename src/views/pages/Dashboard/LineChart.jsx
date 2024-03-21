import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const MyLineChart = ({ data, label }) => {

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          minRotation: 90, // Rotate labels 90 degrees for vertical orientation
          autoSkip: false, // Prevent label overlap (optional)
        },
      },
    },
  };
  return (
    <LineChart

      height={300}
      series={[
        { data: data.map(item => item.total), label: label },
      ]}
      options={chartOptions}
      xAxis={[{ scaleType: 'point', data: data.map(item => item.label) }]}
    />
  );

};

export default MyLineChart;