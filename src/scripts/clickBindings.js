var firebase = require("firebase/app");

module.exports = (function(router) {
  var signInAnonymously = require('./signInAnonymously');

  /* trap clicks */
  for (let el of document.querySelectorAll('a')) {
    el.addEventListener('click', function(ev) {
      ev.preventDefault();
      console.log('clicked link');
      router.navigate(ev.target.pathname);
    });
  }

  /* handle creating */
  document.querySelector('#create_form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    var tallyKey = document.querySelector('#tally-id').value;
    if (tallyKey === "") {
      tallyKey = firebase.database().ref().child('tallies').push().key;
    }
    console.log('new key', tallyKey);
    var updates = {};
    updates['/tallies/' + tallyKey] = {
      "title": document.querySelector('#create-title').value,
      "tally_current": document.querySelector('#create-current-tally').value,
      "tally_total": document.querySelector('#create-total-tally').value,
      "owner_id": firebase.auth().currentUser.uid,
      "shared_with": {} // TODO: Allow for sharing
    };
    return firebase.database().ref().update(updates).then(
      function(resolved) {
        console.log('Update resolved', resolved);
        router.navigate('tallies/' + tallyKey);
      },
      function(rejected) {
        console.log('Update rejected', rejected);
      }
    );

  });

  document.querySelector('.signInGoogle').addEventListener('click', function(ev) {
    ev.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut().then(function() {
      firebase.auth().signInWithRedirect(provider);
    }, function() {
      firebase.auth().signInWithRedirect(provider);
    });

  });

  document.querySelector('.signOut').addEventListener('click', function(ev) {
    console.log('clicked signout');
    ev.preventDefault();
    firebase.auth().signOut().then(function() {
      console.log('signed out');
      signInAnonymously();
      router.navigate('/');
    }, function(error) {
      console.log('error - could not sign out', error);
    });
  });
});
