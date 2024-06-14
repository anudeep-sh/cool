import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = ['2017', '2018', '2019', '2020', '2021', '2022'];

const options = {
  // plugins: {
  //   legend: {
  //     position: "top",
  //   },
  // },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (context) {
          return ``;
        },
        label: function (context) {
          return `#${context.raw}000`;
        },
        footer: function (context) {
          return context[0].dataset.label;
        },
        afterLabel: function (context) {
          return 'Global ranking';
        },
        labelColor: function (context) {
          return {
            backgroundColor: 'fff',
            bodyFontColor: `${context.dataset.backgroundColor}`,
            borderColor: '#ffffff',
          };
        },
        labelTextColor: function (context) {
          return `${context.dataset.backgroundColor}`;
        },
        bodyFontColor: function (context) {
          return '#543453';
        },
      },
      backgroundColor: '#ffffff',
      footerColor: '#3d3d3d',
      borderColor: '#e5e5e5',
      borderWidth: 1,
      displayColors: false,
      // bodyFont:{
      //   weight: "bold"
      // },
      footerFont: {
        weight: 'light',
      },
      label: {
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
  },

  scales: {
    // x: {
    //   grid: {
    //     color: "#e5e5e5",
    //   },
    //   border: {
    //     dash: [2, 4],
    //   },
    //   ticks: { display: false },
    // },
    y: {
      grid: {
        color: '#e5e5e5',
      },
      ticks: {
        callback: function (value) {
          return value + 'k';
        },
      },
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'July Lunchtime 2022',
      data: [1, 3, 4, 5, 7, 1],
      backgroundColor: '#2196F3',
      borderColor: '#2196F3',
      tension: 0.4,
    },
    {
      label: 'BIT Mesra Junior Hackathon Contest',
      data: [10, 3, 4, 2, 5],
      backgroundColor: '#05CE94',
      borderColor: '#05CE94',
      tension: 0.4,
    },
  ],
};

const ChartsComponent = () => {
  return (
    <div style={{ width: 1000, height: 600 }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartsComponent;
