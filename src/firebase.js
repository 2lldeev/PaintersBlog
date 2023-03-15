import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCRsud8bithNFhnAiK8Z6NqAmaMJ4-JwYo",
    authDomain: "paintie.firebaseapp.com",
    projectId: "paintie",
    storageBucket: "paintie.appspot.com",
    messagingSenderId: "113641162096",
    appId: "1:113641162096:web:b715a0cb1e7355050b7bb5"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;