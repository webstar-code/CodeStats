import styled from 'styled-components/macro';
import { breakpoints } from '../../Breakpoints';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  margin: 30px 0px;
`;

export const Image = styled.img`
display: none;
  width: 100px;
  height: 100px;
  border-radius: 999px;
  background: green;
  margin-bottom: 20px;

  @media only screen and (max-width: ${breakpoints.md}) {
    display: flex;
  }

`;

export const Pane = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
`;

export const LText = styled.div`
font-weight: bold;
font-size: 32px;
color: #001A33;
`;


export const MText = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  `;


export const NText = styled.div`
  font-size: 16px;
`;


export const SText = styled.div`
font-weight: bold;
font-size: 14px;
color: rgba(0, 0, 0, 0.5);
margin-top: 10px;
`;

export const Grid = styled.div`
  width: 75vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 10px;

  @media only screen and (max-width: ${breakpoints.md}) {
    width: 90vw;
    grid-gap: 30px;
  }

`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Gif =  styled.img`
  width: 75px;
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
