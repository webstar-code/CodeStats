import React from 'react'
import styled from 'styled-components';
import { breakpoints } from '../Breakpoints';

const CodeTime = ({type, time}) => {
  return (
    <Container>
      <Label>{type}</Label>
      <BoldText>{time}</BoldText>
    </Container>
  )
}

export const Container = styled.div`
  max-height: 85px;
  display: flex;
  flex-direction: column;  
  padding: 10px 30px;
  background: #F0F7FF;
  box-shadow: 6px 6px 16px rgba(209, 205, 199, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.5);
  border-radius: 10px;

  @media only screen and (max-width: ${breakpoints.md}) {
    text-align: center;
  }
`;

export const Label = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);

`;

export const BoldText = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: #001A33;
`;

export default CodeTime
