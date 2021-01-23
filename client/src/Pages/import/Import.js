import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router';
import styled from 'styled-components'
import { ReactContext } from '../../context/context';
import firebase from '../../lib/firebase.prod';
import { seedDatabase } from '../../SeedDatabase';
import { breakpoints } from '../../Breakpoints';


const Import = () => {
  const { token } = useContext(ReactContext);
  const [message, setMessage] = useState('asd');

  let localURL = process.env.REACT_APP_SERVER_DEV;
  if (window.location.hostname != 'localhost') {
    localURL = process.env.REACT_APP_SERVER_PROD;
  }

  function get_data_dumps() {
    fetch(`${localURL}/api/user/data_dumps`, {
      method: 'GET',
      headers: { 'token': token }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
          return;
        }
        console.log(data);
        localStorage.setItem('userid', data.user.id);
        seedDatabase(firebase, data);
      })
      .catch(err => console.log(err));
  }

  return (
    <Container>
      {localStorage.getItem('userid') && <Redirect to="/" />}
      <BoldText>CodeStats</BoldText>
      <>
        <Text>To view your data you need to import it first.</Text>
        <Button>
          <Link onClick={() => get_data_dumps()}>Import Data</Link>
        </Button>
        {message &&
          <Message>
            <Info>
              Sorry, somthing went wrong.
              <br></br>
              <br></br>
              Please go to your wakatime account 
              <b> -Settings</b><b>-Account. </b> Under Export, Click <b>export my coding activity</b> And try again.
          </Info>
          </Message>
        }
      </>
    </Container>

  )
}


export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`;

export const BoldText = styled.h1`
  font-size: 84px;
  font-weight: 700;
  color: #001A33;
  margin-bottom: 10px;
  margin-top: -100px;
  @media only screen and (max-width: ${breakpoints.md}) {
    font-size: 48px;
  }
  `;

export const Text = styled.h3`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  font-weight: 500;
`;


export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #7AD930;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.5);
  &:hover {
    background: #5CA91E;
  }
`;

export const Link = styled.a`
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  color: #001A33;
`;

export const Message = styled.div`
  width: 75%;
  border: 1px solid rgba(0,0,0,0.5);
  background: #F0F7FF;
  padding: 30px;
  border-radius: 5px;
  margin-top: 30px;
`;

export const Info = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #001A33;
`;

export default Import
