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
var formBindings = require('./formBindings');
var signInAnonymously = require('./signInAnonymously');

/* set up on window load */
window.addEventListener('load', function() {

  firebase.auth().onAuthStateChanged(function(user) {
    console.log('AUTH STATE CHANGED', user);
    if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
      console.log('SIGNED IN');
      document.querySelector('#signInButton').text = "Sign out";
      document.querySelector('#signInButton').setAttribute("href", "/signout");
    } else {
      console.log('NOT SIGNED IN (or signed in anonymously)');
      document.querySelector('#signInButton').text = "Sign in";
      document.querySelector('#signInButton').setAttribute("href", "/signin");
      signInAnonymously();
    }
    handleRoutes(router);
    clickBindings(router);
    formBindings(router);
  });

  firebase.auth().getRedirectResult().then(function(result) {
    console.log('AUTH REDIRECT', result);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('there was an error with the login', errorCode, errorMessage);
  });

});
