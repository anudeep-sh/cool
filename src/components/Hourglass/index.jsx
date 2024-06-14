import React from 'react';
import './index.scss';

const HourGlass = () => {
  return (
    <div id="hourglass" className="fa-stack fa-4x">
      <i className="fa fa-stack-1x fa-hourglass-start"></i>
      <i className="fa fa-stack-1x fa-hourglass-half"></i>
      <i className="fa fa-stack-1x fa-hourglass-end"></i>
      <i className="fa fa-stack-1x fa-hourglass-end"></i>
      <i className="fa fa-stack-1x fa-hourglass-o"></i>
    </div>
  );
};

export default HourGlass;
