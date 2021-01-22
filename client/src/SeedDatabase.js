import { formatData } from './formatData';


export function seedDatabase (firebase, seed) {
  const data = formatData(seed);
  localStorage.setItem('userid', data.user.id);
  firebase.firestore().collection(data.user.id).doc('user').set(data.user);
  firebase.firestore().collection(data.user.id).doc('range').set(data.range);
  firebase.firestore().collection(data.user.id).doc('days').set({days: data.days});
}