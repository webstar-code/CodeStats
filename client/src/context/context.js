import React, { useEffect, useState } from 'react';
import firebase from '../lib/firebase.prod';
const ReactContext = React.createContext({});

const ReactProvider = (props) => {
  let userid = localStorage.getItem('userid') || '';
  const [state, setState] = useState({
  });

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setState(state => state = { ...state, token: localStorage.getItem('token')});
    }
    if (userid && state.token) {
      firebase.firestore().collection('users').doc(userid).set({
        token: state.token
      }, { merge: true })
    }
  }, [state.token]);

  const GetData = async (target) => {
    let content;
    const ref = firebase.firestore().collection(userid).doc(target);
    await ref.get()
      .then((doc) => {
        if (doc.exists) {
          content = doc.data();
        } else {
          console.log("No such document");
        }
      })
      .catch(err => console.log(err));
    return { [target]: content };
  };


  useEffect(() => {
    if (userid) {
      GetData('user').then(data => setState(state => state = { ...state, user: data.user }))
      GetData('range').then(data => setState(state => state = { ...state, range: data.range }))
      GetData('days').then(data => setState(state => state = { ...state, days: data.days }))
    }
  }, []);

  return (
    <ReactContext.Provider value={state}>
      {props.children}
    </ReactContext.Provider>
  )
}

export { ReactContext, ReactProvider };