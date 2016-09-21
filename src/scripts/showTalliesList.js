var firebase = require("firebase/app");
var clickBindings = require('./clickBindings');

var showTalliesList = function(router) {
  console.log('retrieving tallies list...');
  var userId = firebase.auth().currentUser.uid;
  var talliesRef = firebase.database().ref('tallies').orderByChild("owner_id").equalTo(userId);
  talliesRef.once('value', function(talliesSnapshot) {
    var tallies = talliesSnapshot.val();
    var listEl = document.querySelector('#tallies_ul');
    var htmlAppend = '';
    if (tallies) {
      var tallyKeys = Object.keys(tallies);
      for (let thisTallyKey of tallyKeys) {
        htmlAppend += '<li><a href="/tallies/' + thisTallyKey + '">' + tallies[thisTallyKey].title + '</a></li>';
      }
    } else {
      htmlAppend += '<li>You don\'t have any tallies yet. Why don\'t you <a href="/create">create</a> one?</li>';
    }
    listEl.innerHTML = htmlAppend;
    clickBindings(router);
  });
};

module.exports = showTalliesList;
