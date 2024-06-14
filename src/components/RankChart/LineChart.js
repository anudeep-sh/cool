import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = ({ chartData }) => {
  return (
    <>
      <h1>Line Chart</h1>
      <div className="container-line-chart" style={{ height: '300px' }}>
        {/* <Line data={chartData}/> */}
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Users Gained between 2016-2020',
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default LineChart;
