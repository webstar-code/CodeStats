import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {breakpoints } from '../../../Breakpoints';
const Links = ({ToggleSidebar}) => {
  return(
      <Container>
       <Option onClick={() => ToggleSidebar()}>
         <Link to="/today">Today</Link>
        </Option>
        <Option onClick={() => ToggleSidebar()}>
          <Link to="/weekly">Weekly</Link>
          </Option>
        <Option onClick={() => ToggleSidebar()}><Link to="/monthly">Monthly</Link></Option>
        <Option onClick={() => ToggleSidebar()}><Link to="/yearly">Yearly</Link></Option>
      </Container>
  )
}

export const Container = styled.div`
padding: 10px;
margin: 20px;
display: flex;
flex-direction: column;
@media only screen and (max-width: ${breakpoints.md}) {
  margin: 50px;
  align-items: center;
    justify-content: center;
  }
`;

export const Option = styled.p`
  font-size: 18px;
  color: #001A33;
  margin-bottom: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #00264C;
    text-decoration: underline;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  `;

export default Links;