import React, { useState } from 'react';
// import {  Chart as ChartJS, registerables, } from chart.js;
//   import { Line } from react-chartjs-2;
//   import {enGB} from date-fns/locale;
//this sets the display language. In the documentation it uses "de", which will display dates in German.
//   ChartJS.register(…registerables);

import { Line } from 'react-chartjs-2';
import LineChart from './LineChart';

import RankData from './RankData';
// year:2017,
// rank:2000,
// title:"Long code Mar 2017",

const RankChart = () => {
  const [chartData, setChartData] = useState({
    labels: RankData.map((Data) => Data.year),
    datasets: [
      {
        label: 'Global Rank',
        data: RankData.map((Data) => Data.rank),
        borderColor: '#698AFF',
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <LineChart chartData={chartData} />
    </>
  );
};

export default RankChart;
