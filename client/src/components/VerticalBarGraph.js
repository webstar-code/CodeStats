import React from 'react'
import styled from 'styled-components/macro';
import { breakpoints } from '../Breakpoints';
import Graph from './Graph';
import { format_date_toMonth, format_toReadable_time } from '../utils/functions';

export default function VerticalBarGraph({ userData }) {

  let labels = userData.map(item => (
    format_date_toMonth(item.date)
  ))

  let days = userData.map(item => (
    item.grand_total.total_seconds / 3600
  ))

  const data = {
    labels: [...labels],
    datasets: [
      {
        label: 'Coding',
        data: [...days],
        backgroundColor:
          days.map((item, index) => (
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
      },
    ],
  }

  const options = {
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltips: {
      titleFontSize: 14,
      titleSpacing: 4,
      bodyFontSize: 12,
      bodySpacing: 4,
      // backgroundColor: '#001A33',
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label += format_toReadable_time(tooltipItem.yLabel);
          return label;
        }
      }
    },

    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
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
      {userData.length > 0 ?
        <Graph type="bar" data={data} options={options} />
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
  width: 100%;
  height: 100%;
  display: inline-flex;
  color: #001A33;
  justify-content: center;
  align-items: center;
  flex-direction: column;  

  @media (max-width:${breakpoints.md}) {
  }
`;