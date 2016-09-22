var firebase = require("firebase/app");

module.exports = function(router) {

  /* trap clicks */
  for (let el of document.querySelectorAll('a')) {
    el.addEventListener('click', function(ev) {
      ev.preventDefault();
      console.log('clicked link');
      router.navigate(ev.target.pathname);
    });
  }

  var signInGoogleButton = document.querySelector('.signInGoogle');
  if (signInGoogleButton) {
    signInGoogleButton.addEventListener('click', function(ev) {
      ev.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signOut().then(function() {
        firebase.auth().signInWithRedirect(provider);
      }, function() {
        firebase.auth().signInWithRedirect(provider);
      });
    });
  }

};
