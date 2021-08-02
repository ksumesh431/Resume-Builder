import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import 'firebase/firestore'; //for firebase.firestore()
import 'firebase/auth'  
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

//FIREBASE~~~~~~~~~~~~~~~~~~~~~~~~~
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCYOq2QJY6uKlS5eOOYQU7bEdAeej3nNeY",
  authDomain: "resume-builder-dfb51.firebaseapp.com",
  projectId: "resume-builder-dfb51",
  storageBucket: "resume-builder-dfb51.appspot.com",
  messagingSenderId: "45493642214",
  appId: "1:45493642214:web:84cd9a28d5f8f239896c27"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore=firebase.firestore();

const database = {
  users: firestore.collection("users"),
}
database.users.doc("iyWPYxbLldNTkhDphVX4UrgkwNN2").onSnapshot(doc => {
  const data=doc.data();
  console.log(data);
})

//STORE~~~~~~~~~~~~~~~~~~~~~~~~~
const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase) //redux binding for firestore
  )
);

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);