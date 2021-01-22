import React, {useEffect, useRef } from  'react';
import Chart from 'chart.js';

let chart = undefined;
const Graph = ({type, data, options}) => {
  const canvasref = useRef();
  useEffect(() => {
    if(typeof chart !== "undefined") chart.destroy();
    const chartref = canvasref.current.getContext("2d");
     chart = new Chart(chartref, {
      type: type,
      data: data,
      options: options
    })
  })
  
  return (
    <>
    <canvas ref={canvasref}></canvas>
    </>

  )
}

export default Graph;