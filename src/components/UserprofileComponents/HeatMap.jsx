import React from 'react';
import Calendar from 'react-github-contribution-calendar';

const HeatMap = () => {
  var values = {
    '2023-01-23': 1,
    '2023-02-01': 2,
    '2023-01-20': 3,
    '2023-02-19': 4,
    '2023-03-01': 6,
    '2023-02-01': 6,
  };
  var until = '2023-03-30';
  var panelColors = ['#e7e7e7', '#E3F6FF', '#B9F3FC', '#AEE2FF', '#93C6E7', '#7286D3'];
  var panelAttributes = { width: 12, height: 12, margin: 1, padding: 1 };
  return (
    <>
      <Calendar
        values={values}
        until={until}
        panelColors={panelColors}
        panelAttributes={panelAttributes}
      />
    </>
  );
};

export default HeatMap;
