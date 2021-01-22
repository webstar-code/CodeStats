import React from 'react'
import styled from 'styled-components';
import { breakpoints } from '../Breakpoints';
import Graph from './Graph';
import { format_toReadable_time } from '../utils/functions';


export default function HorizontalBarGraph({ userData }) {
  if(!userData) {
    return null;
  }


  const data = {
    labels: userData.projects.map(el => el.project),
    datasets: [
      {
        label: 'Projects',
        data: userData.projects.map(el => el.duration / 3600),
        backgroundColor:
          userData.projects.map((item, index) => (
            `rgba(${Math.floor(Math.random() * 252)}, ${Math.floor(Math.random() * 252)}, ${Math.floor(Math.random() * 252)}, 0.8)`
          ))
        ,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        maxBarThickness: 24
      },
    ],
  }


const options = {
  legend: {
    display: true,
    align: 'center',
    labels: {
      boxWidth: 0,
      fontSize: 16,
      fontColor: '#001A33'
    }
  },
  title: {
    display: false
  },
  tooltips: {
    titleFontSize: 14,
    titleSpacing: 4,
    bodyFontSize: 12,
    bodySpacing: 4,
    backgroundColor: '#001A33',
    callbacks: {
      label: function (tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label || '';
        if (label) {
          label += ': ';
        }
        label += format_toReadable_time(tooltipItem.value);
        return label;
      }
    }
  },

  scales: {
    xAxes: [ 
      {
        gridLines: {
          display: true
        },
        ticks: {
          beginAtZero: true,
        },
        labelString: 'Hours'
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },

      },
    ],
  },
}
return (
  <Container>
    {userData ?
      <Graph type="horizontalBar" data={data} options={options} />
      :
      <>
        <h1>No data Available</h1>
        <p>The data for this period of time may have been not recorded or lost</p>
      </>
    }
  </Container>
)
}

export const Container = styled.div`
width: 60%;
color: #001A33;
justify-content: center;
align-items: center;
flex-direction: column;  
  @media (max-width:${breakpoints.md}) {
    width: 100%;
    padding: 10px 0px;
  }
`;
