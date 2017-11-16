const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

export const fire = firebase.initializeApp({
  apiKey: 'AIzaSyDkru4DlzkS1qHU--pZk8uhuBh01KOdz0Q',
  authDomain: 'capstone-98fe9.firebaseapp.com',
  databaseURL: 'https://capstone-98fe9.firebaseio.com',
  projectId: 'capstone-98fe9',
  storageBucket: 'capstone-98fe9.appspot.com',
  messagingSenderId: '457370853523'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// db.collection('users').add({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// })
// .then(function(docRef) {
//   console.log('Document written with ID: ', docRef.id);
// })
// .catch(function(error) {
//   console.error('Error adding document: ', error);
// });

