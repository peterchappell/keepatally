var firebase = require("firebase/app");

var signInAnonymously = function() {
  console.log('signing in anonymously');
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (error) {
      console.log('There was an error with authenticating...', errorCode, errorMessage);
    }
  });
};

module.exports = signInAnonymously;
