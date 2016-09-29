// pull the index.html file with webpack and use this in it
require('../index.html')

// libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// config for Firebase
import firebase from 'firebase/app'
import 'firebase/database';
var config = {
  apiKey: "AIzaSyApc0Mt7k0FCncn8k0DYfI3q9FV2OeSXAo",
  authDomain: "keepatally.firebaseapp.com",
  databaseURL: "https://keepatally.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "1062744934959"
};
firebase.initializeApp(config);

// components
import Routes from './components/Routes'

// render to the DOM and handle firebase authentication
ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);
