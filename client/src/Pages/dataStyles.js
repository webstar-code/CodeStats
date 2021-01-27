import styled from "styled-components/macro";
import { breakpoints } from '../Breakpoints';

export const Container = styled.div`
  width: 100%;
  padding: 60px 30px 0px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1;
  gap: 10px 10px;
  grid-template-areas:
    "Head Head Head Head"
    "graph graph graph graph"
    "graph graph graph graph"
    "graph graph graph graph"
    "graph graph graph graph";

  @media (max-width:${breakpoints.md}) {
    padding: 30px 10px;
  }
`;

export const Head = styled.div`
  grid-area: Head; 
  display: flex;
  @media only screen and (max-width:${breakpoints.md}) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;
export const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: graph; 
  padding: 10px 30px;
  background: #F0F7FF;
  box-shadow: 6px 6px 16px rgba(209, 205, 199, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  @media (max-width:${breakpoints.md}) {
    padding: 10px 15px;
  }
`;

export const GraphContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Selection = styled.div`
  display: flex;
  align-self: start;
  @media (max-width:${breakpoints.md}) {
    align-self: center;
    margin: 10px 0px;
  }
`;

export const Selector = styled.select`
  font-size: 14px;
  border: 1px solid rgb(0,0,0,0.2);
  display: inline-flex;
  margin: 0px 10px;
  font-weight: bold;
  color: #001A33;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 6px 6px 16px rgba(209, 205, 199, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.5);
`;

export const Option = styled.option`
`;

export const Icon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  width: 32px;
  height: 32px;
  padding: 5px;
  cursor: pointer;
  border-radius: 999px;
  &:hover {
  background: rgba(209, 205, 199, 0.5);
  }

`;

export const Display = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  p {
    margin: 0px 10px;
  }
`;

export const Pane = styled.div`
  widthL 50%;

`;