"use strict";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

/* set up firebase */
var config = {
  apiKey: "AIzaSyApc0Mt7k0FCncn8k0DYfI3q9FV2OeSXAo",
  authDomain: "keepatally.firebaseapp.com",
  databaseURL: "https://keepatally.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "1062744934959"
};
firebase.initializeApp(config);

// set up router
var Navigo = require("navigo");
var router = new Navigo();

// extra requires
var handleRoutes = require('./handleRoutes');
var clickBindings = require('./clickBindings');
var signInAnonymously = require('./signInAnonymously');

/* set up on window load */
window.addEventListener('load', function() {

  firebase.auth().onAuthStateChanged(function(user) {
    console.log('AUTH STATE CHANGED', user);
    if (user) {
      var currentUser = firebase.auth().currentUser;
      console.log('We are good to go', currentUser);
      if (!firebase.auth().currentUser.isAnonymous) {
        document.querySelector('#signInButton').text = "Sign out";
      }
    } else {
      console.log('NO CAN DO!');
      signInAnonymously();
    }
    handleRoutes(router);
    clickBindings(router);
  });

  firebase.auth().getRedirectResult().then(function(result) {
    console.log('AUTH REDIRECT', result);
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log('token', token);
    }
    handleRoutes(router);
    clickBindings(router);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('there was an error with the login', errorCode, errorMessage);
  });

});
