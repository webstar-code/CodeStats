import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Avatar = ({user, ToggleSidebar}) => {
  const history = useHistory();

  return(
    <Container onClick={() => history.push('/profile')}>
      <Image src={user.photo}>
      </Image>
      <Name>{user.username}</Name>
      <Option onClick={() => ToggleSidebar()}><Link to="/profile">View Profile</Link></Option>
      
    </Container>
  )
}

export const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 999px;
  background: green;
  margin-bottom: 20px;
`;

export const Name = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #001A33;
`;

export const Option = styled.p`
  font-size: 18px;
  color: #blue;
  margin-bottom: 20px;
  font-weight: 400;
  margin-top: 15px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #00264C;
  }
  a {
    color: inherit;
  }
  `;

export default Avatar;