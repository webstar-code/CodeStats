import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { breakpoints } from '../Breakpoints';
import { ReactContext } from '../context/context';
import { format_toReadable_time } from '../utils/functions';
import { Doughnut } from 'react-chartjs-2';


const Progressbar = ({ today }) => {
  const [all_time, setAll_time] = useState();
  const state = useContext(ReactContext);

  useEffect(() => {
    let localURL = process.env.REACT_APP_SERVER_DEV;
    if(window.location.hostname != 'localhost') {
      localURL = process.env.REACT_APP_SERVER_PROD;
    }

    // All time since Today
    fetch(`${localURL}/api/user/all_time_since_today`, {
      method: 'GET',
      headers: { 'token': state.token }
    })
      .then((res) => res.json())
      .then((data) => {
        setAll_time(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  function calculate_alltime_dailyAverage() {
    let start_time = new Date(state.user.created_at).getTime();
    let today_time = new Date().getTime();
    let total_hours = all_time.total_seconds / 3600;
    let number_ofdays = (today_time - start_time) / 86400000;
    let average = total_hours / number_ofdays;
    return average;
  }

  let data;
  let options;
  let percentage;

  if (all_time) {
    let today_inHour = today.grand_total.total_seconds / 3600;
    let average_inHour = calculate_alltime_dailyAverage();
    percentage = ((today_inHour / average_inHour).toFixed(2) * 100);
    if (percentage >= 100) {
      percentage = 100;
    }
    // Normalize to 0 - 2 scale
    let min = 0;
    let max = 100;
    let startScale = 0;
    let endScale = 2;

    let x = startScale + (percentage - 0) * (endScale - startScale) / (max - min);

    data = {
      labels: [''],
      datasets: [{
        data: [percentage],
        backgroundColor: 'green',
      }],
    };

    options = {
      cutoutPercentage: 75,
      rotation: 1 * Math.PI,
      circumference: x * Math.PI,
      legend: {
        display: false
      },
    }

  }



  return (
    <Container>
      {all_time &&
        <>
          <Text>Daily Average: {format_toReadable_time(calculate_alltime_dailyAverage())}</Text>
          <Doughnut data={data} options={options} />
          <Text>{percentage}%</Text>
        </>
      }
    </Container>
  )
}

export const Container = styled.div`
display: inline-flex;
color: #001A33;
justify-content: center;
align-items: center;
flex-direction: column;  

  @media (max-width:${breakpoints.md}) {
  }
`;

export const Text = styled.h1`
font-weight: bold;
font-size: 18px;
color: #001A33;

`;

export const ProgressText = styled.h1`
font-weight: bold;
font-size: 24px;
color: #001A33;
position: relative;
top: 35%;

`;

export default Progressbar
