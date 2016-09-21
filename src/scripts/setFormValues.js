var firebase = require("firebase/app");

var setFormVals = function(tallyId) {
  if (tallyId) {
    document.querySelector('#form_title').textContent = 'Edit your tally';
    document.querySelector('#tally-id').value = tallyId;
    var thisTallyRef = firebase.database().ref('tallies/' + tallyId);
    thisTallyRef.on('value', function(thisTallySnapshot) {
      var thisTallyData = thisTallySnapshot.val();
      document.querySelector('#create-title').value = thisTallyData.title;
      document.querySelector('#create-current-tally').value = thisTallyData.tally_current;
      document.querySelector('#create-total-tally').value = thisTallyData.tally_total;
    });
  } else {
    document.querySelector('#form_title').textContent = 'Create a new tally';
    document.querySelector('#tally-id').value = "";
    document.querySelector('#create-title').value = "";
    document.querySelector('#create-current-tally').value = "0";
    document.querySelector('#create-total-tally').value = "0";
  }
};

module.exports = setFormVals;
