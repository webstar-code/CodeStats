import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQI_wxv-BeCDQUXVOiQdf1gJWM_obJtqQ",
  authDomain: "codestats-23905.firebaseapp.com",
  projectId: "codestats-23905",
  storageBucket: "codestats-23905.appspot.com",
  messagingSenderId: "49046516128",
  appId: "1:49046516128:web:0f604a76c5b7f76510b4c5",
  measurementId: "G-Z5WJ6Z2LZ8"
};
const firebase = Firebase.initializeApp(firebaseConfig);

// seedDatabase(firebase);

export default firebase;