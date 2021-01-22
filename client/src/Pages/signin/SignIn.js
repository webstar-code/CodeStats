import React, { useEffect } from 'react'
import styled from 'styled-components'
import {  useHistory } from 'react-router-dom';
import firebase from '../../lib/firebase.prod';

const SignIn = () => {
  const history = useHistory();

  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (params.has('token')) {
      console.log(params.get('token'));
      let token = params.get('token');
      localStorage.setItem('token', token);
      history.push('/import');
    }
  }, [])

  function BetaSignin() {
    let userid = 'dcba6617-3d13-4b5e-80a1-3969c2b157dd';
    firebase.firestore().collection('users').doc(userid).get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data().token);
          let token = doc.data().token;
          localStorage.setItem('token', token);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <BoldText>CodeStats</BoldText>
      <Text onClick={() => { params.set('namedas', 1); params.toString(); }}>Signin into your wakatime account</Text>
      <Button>
        <Link href="http://localhost:5000/auth">Signin with wakatime</Link>
      </Button>
      <Text>For testing Purposes</Text>
      <Button onClick={() => BetaSignin()}>
        Beta Signin
      </Button>
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
  font-size: 18px;
  font-weight: 500;
  color: #001A33;
  margin-bottom: 50px;
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
export default SignIn
