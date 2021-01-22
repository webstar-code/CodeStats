import React, { useContext, useEffect, useState } from 'react'
import { ReactContext } from '../../context/context';
import { Container, Row, Pane, Image, LText, MText, SText, Grid, Loading, Gif } from './ProfileStyles';
import { format_date_toMonth, format_toReadable_time } from '../../utils/functions';
import CodeTime from '../../components/CodeTime';
import { Redirect } from 'react-router';
import LoadingGif from '../../loading.gif';

const Profile = () => {
  const state = useContext(ReactContext);
  const [user, setuser] = useState();
  const [all_time, setAll_time] = useState();
  let localURL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${localURL}/api/user/all_time_since_today`, {
      method: 'GET',
      headers: { 'token': state.token }
    })
      .then((res) => res.json())
      .then((data) => {
        setAll_time(data.data);
      })
      .catch(err => console.log(err));


    if (state)
      setuser(state.user);
      
  }, [state]);

  function calculate_alltime_dailyAverage() {
    let start = new Date(user.created_at).getTime();
    let today = new Date().getTime();
    let total_hours = all_time.total_seconds / 3600;
    let number_ofdays = (today - start) / 86400000;
    let average = total_hours / number_ofdays;
    return format_toReadable_time(average);
  }

  return (
      <Container>
      {!localStorage.getItem('userid') && <Redirect to="/import"/> }
      {user && all_time ?
      <>
          <Row>
            <Image src={user.photo} />
            <Pane>
              <LText>{user.display_name}</LText>
              <MText>@{user.username}</MText>
              <SText>Joined <i>{new Date(user.created_at).toDateString().split(" ").slice(1,).join(" ")}</i></SText>
            </Pane>
          </Row>
          <Grid>
            <CodeTime type="All Time" time={all_time.text} />
            <CodeTime type="Daily Average" time={calculate_alltime_dailyAverage()} />
          </Grid>
          </>
        :
        <Loading>
          <Gif src={LoadingGif} />
        </Loading>
        
        }
        </Container>
  )
}

export default Profile
