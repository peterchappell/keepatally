var firebase = require("firebase/app");

module.exports = function(router) {

  /* handle creating */
  document.querySelector('#create_form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    var tallyKey = document.querySelector('#tally-id').value;
    console.log('tallyKey in doc', tallyKey);
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

};
