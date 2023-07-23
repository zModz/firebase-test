import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQzvr75ZN8u-AbMxGmSxqyiUMHDffCUWQ",
    authDomain: "placeholder-app-7f60a.firebaseapp.com",
    databaseURL: 'https://placeholder-app-7f60a.firebaseio.com',
    projectId: "placeholder-app-7f60a",
    storageBucket: "placeholder-app-7f60a.appspot.com",
    messagingSenderId: "974297217791",
    appId: "1:974297217791:android:6008d5168f53ca80086aca"
};

var app = null
if (!firebase.getApps.length) {
    app = firebase.initializeApp(firebaseConfig)
}

export { app, auth, firestore };