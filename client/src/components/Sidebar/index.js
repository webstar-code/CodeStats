import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../Breakpoints';
import Links from './Links/Links';
import Avatar from './Avatar/Avatar';
import { MdMenu, MdClose } from 'react-icons/md'
import { ReactContext } from '../../context/context';

const Sidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const state = useContext(ReactContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if(state)
      setUser(state.user);
  }, [sidebarActive, state])

  const ToggleSidebar = () => {
    setSidebarActive(false);
  }
  return (
    <>
      <Icon onClick={() => setSidebarActive(!sidebarActive)}>
        {sidebarActive ? <MdClose /> : <MdMenu />}
      </Icon>

      <Container active={sidebarActive} >
        {user && <Avatar user={user} ToggleSidebar={ToggleSidebar}/> }
        <Links ToggleSidebar={ToggleSidebar} />
      </Container>
    </>
  )
};



export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  min-width: 200px;
  height: 100vh;
  background: #F0F7FF;
  padding: 60px 10px;
  transition: all linear 0.2s;

  @media only screen and (max-width:${breakpoints.md}) {
    position: absolute;
    left: ${({ active }) => active ? '0%' : '-100%'};
    width: 100%;
    z-index: 100;
    transition: all linear 0.2s;
    
  }
  `;
  
  
export const Icon = styled.div`
  position: absolute;
  top: 15px;
  left: 5px;
  z-index: 199;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  cursor: pointer;

  @media only screen and (max-width:${breakpoints.md}) {
      display: flex;
  }
`;

export default Sidebar;