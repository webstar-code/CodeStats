import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../Breakpoints';

const Navbar = () => {
  function LogOut() {
    localStorage.removeItem('token');
    window.location.reload();
    // history.push('/signin');
  }

  return (
    <>
      <Container >
        <Brand>CodeStats</Brand>
        {localStorage.getItem('token') &&
          <Button onClick={() => LogOut()}>Logout</Button>
        }
      </Container>
    </>
  )
}


export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #00264C;
  height: 60px;

  @media only screen and (max-width:${breakpoints.md}) {
  }

`;

export const Brand = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #F0F7FF;
  letter-spacing: 2px;
  margin-left: 30px;
  @media only screen and (max-width:${breakpoints.md}) {
    margin-left: 40px;
  }
`;

export const Button = styled.button`
  padding: 10px;
  border: 1px solid black;
  background: none;
  border-radius: 5px;
  font-size: 16px;
  color: #F0F7FF;
  margin: 0px 10px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    border: 1px solid #F0F7FF;
  }
`;

export default Navbar;