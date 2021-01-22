import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { SignIn, Profile, Today, Week, Month, Year, Import, ErrorPage } from './Pages';
import { IsUserRedirect, ProtectedRoute } from './routes';
import { ReactContext } from './context/context';

const App = () => { 
  const [token, setState] = useState();
  const state = useContext(ReactContext);
  useEffect(() => {
    if(state && state.token) {
      setState(state.token);
    }
  }, [state]);

  return (
    <AppContainer>
      <Router>
        <Navbar />
        <Container>
          {token && <Sidebar />}
          <Switch>
            <IsUserRedirect user={token} loggedInPath={'/import'} path="/signin"><SignIn /></IsUserRedirect>

            <ProtectedRoute user={token} path="/import"><Import /></ProtectedRoute>
            <ProtectedRoute user={token} path="/profile" exact><Profile /></ProtectedRoute>
            <ProtectedRoute user={token} path="/today"><Today /></ProtectedRoute>
            <ProtectedRoute user={token} path="/weekly"><Week /></ProtectedRoute>
            <ProtectedRoute user={token} path="/monthly"><Month /></ProtectedRoute>
            <ProtectedRoute user={token} path="/yearly"><Year /></ProtectedRoute>
            <Route component={ErrorPage} exact />
          </Switch>
        </Container>
      </Router>
    </AppContainer>
  )
}

export const AppContainer = styled.div`
display: flex;
flex-direction: column;
`;

export const Container = styled.div`
display: flex;
`;
export default App;