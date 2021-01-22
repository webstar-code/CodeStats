import React from 'react';
import { Redirect, Route } from 'react-router';


export const IsUserRedirect = ({user, loggedInPath, children , ...rest}) => {
  return(
    <Route 
    {...rest}
    render={() => {
      if(!user) {
        return children;
      }

      if(user) {
        return <Redirect to={{pathname: loggedInPath}} />
      }
      return null;
    }}
    >
    </Route>
  )
}

export const ProtectedRoute = ({user, children , ...rest}) => {
  return(
    <Route 
    {...rest}
    render={({location}) => {
      if(user)
        return children

      if(!user) {
        return (
        <Redirect to={{
          pathname: '/signin',
          state: {from: location}
        }} />
        )
      }
      return null;
    }}
    >
    </Route>
  )
}