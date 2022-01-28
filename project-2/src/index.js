import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'; //get everything from this library
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBcmF2mDQg7K76YWcwJE1GAHkeFNP-1SHw',
    authDomain: 'goal-husky.firebaseapp.com',
    databaseURL: 'https://goal-husky-default-rtdb.firebaseio.com',
    projectId: 'goal-husky',
    storageBucket: 'goal-husky.appspot.com',
    messagingSenderId: '433839611230',
    appId: '1:433839611230:web:a753a2c113c492452fc3cf',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root') || document.createElement('div')
);
