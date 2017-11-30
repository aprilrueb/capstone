import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'




firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase
export const db = firebase.firestore()
export const tripById = (id) => db.collection('trips').doc(id)

// Initialize the FirebaseUI Widget using Firebase.
// export const ui = new firebaseui.auth.AuthUI(firebase.auth());
