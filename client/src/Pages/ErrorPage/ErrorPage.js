import React from 'react'
import styled from 'styled-components';

const ErrorPage = () => {
  return (
    <Container>
      <Banner>
      <BoldText>Error 404</BoldText>
      <Text>Page not found</Text>
      </Banner>
    </Container>
  )
}

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Banner = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;

export const BoldText = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: #001A33;
  `;

export const Text = styled.h3`
  font-size: 16px;
  color: #001A33;
  font-weight: 500;
`;



export default ErrorPage
