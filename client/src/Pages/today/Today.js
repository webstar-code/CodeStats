import React, { useContext, useEffect, useState } from 'react';
// import { Container, Head, GraphContainer, Pane } from '../dataStyles';
import CodeTime from '../../components/CodeTime';
import HorizontalBarGraph from '../../components/HorizontalGraph';
import Progressbar from '../../components/Progressbar';
import styled from 'styled-components';
import { breakpoints } from '../../Breakpoints';
import { ReactContext } from '../../context/context';
import { Redirect } from 'react-router';
import LoadingGif from '../../loading.gif';

const Today = () => {
  const [today, setToday] = useState('');
  const state = useContext(ReactContext);

  useEffect(() => {
    let localURL = 'http://localhost:5000'
    // [Can be improved] Coversion to 2021-01-01
    let date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];

    // Today stats
    fetch(`${localURL}/api/user/today_stats?date=${dateString}`, {
      method: 'GET',
      headers: { 'token': state.token }
    })
      .then(res => res.json())
      .then(data => setToday(data))
      .catch(err => console.log(err));

  }, []);

  let time = '';
  if (today) {
    let hrs = Math.floor(today.grand_total.total_seconds / 3600);
    let mins = Math.floor((today.grand_total.total_seconds - hrs * 3600) / 60);
    time = `${hrs}hrs ${mins}min`
  }

  return (
    <Container>
      {!localStorage.getItem('userid') && <Redirect to="/import" />}
      {today ?
        <Grid>
          <Head>
            <CodeTime type="Today" time={time} />
          </Head>
          <GraphContainer>
            <HorizontalBarGraph userData={today} />
            <Progressbar today={today} />
          </GraphContainer>
        </Grid>
        :
        <Loading>
          <Gif src={LoadingGif} />
        </Loading>
      }
    </Container>
  )
}

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
// padding: 60px x30px 0px 30px;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    "Head Head Head"
    "graph graph graph"
    "graph graph graph"
    "graph graph graph"
    "graph graph graph"
`;

export const Head = styled.div`
  grid-area: Head; 
  display: flex;
  @media only screen and (max-width:${breakpoints.md}) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
`;

export const GraphContainer = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: graph; 
  padding: 10px 30px;
  background: #F0F7FF;
  box-shadow: 6px 6px 16px rgba(209, 205, 199, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  
  @media only screen and (max-width:${breakpoints.md}) {
  flex-direction: column;
}
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Gif = styled.img`
  width: 75px;
`;

export default Today;