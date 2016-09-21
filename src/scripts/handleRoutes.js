var firebase = require("firebase/app");

var setFormVals = require('./setFormValues');
var showTally = require('./showTally');
var showTalliesList = require('./showTalliesList');

var handleRoutes = function(router) {
  /* show tally */
  router
    .on('/tallies/:id/edit', function (params) {
      console.log('edit tally');
      document.querySelector('#welcome').classList.add('hide');
      document.querySelector('#form').classList.remove('hide');
      document.querySelector('#show').classList.add('hide');
      document.querySelector('#signIn').classList.add('hide');
      document.querySelector('#talliesList').classList.add('hide');
      setFormVals(params.id);
    })
    .on('/tallies/:id', function (params) {
      console.log('TALLY!');
      document.querySelector('#welcome').classList.add('hide');
      document.querySelector('#form').classList.add('hide');
      document.querySelector('#show').classList.remove('hide');
      document.querySelector('#signIn').classList.add('hide');
      document.querySelector('#talliesList').classList.add('hide');
      showTally(params.id);
    })
    .on('/tallies', function () {
      console.log('TALLIES!');
      document.querySelector('#welcome').classList.add('hide');
      document.querySelector('#form').classList.add('hide');
      document.querySelector('#show').classList.add('hide');
      document.querySelector('#signIn').classList.add('hide');
      document.querySelector('#talliesList').classList.remove('hide');
      showTalliesList(router);
    })
    .on('/create', function () {
      var currentUser = firebase.auth().currentUser;
      console.log('can we create?', currentUser);
      if (!currentUser || currentUser.isAnonymous) {
        console.log('not logged in - navigating to sign in');
        router.navigate('/signin');
      } else {
        console.log('CREATE!');
        setFormVals();
        document.querySelector('#welcome').classList.add('hide');
        document.querySelector('#show').classList.add('hide');
        document.querySelector('#signIn').classList.add('hide');
        document.querySelector('#form').classList.remove('hide');
        document.querySelector('#talliesList').classList.add('hide');
      }
    })
    .on('/signin', function () {
      console.log('SIGN IN');
      document.querySelector('#welcome').classList.add('hide');
      document.querySelector('#form').classList.add('hide');
      document.querySelector('#show').classList.add('hide');
      document.querySelector('#signIn').classList.remove('hide');
      document.querySelector('#talliesList').classList.add('hide');
    })
    .on(function () {
      document.querySelector('#welcome').classList.remove('hide');
      document.querySelector('#form').classList.add('hide');
      document.querySelector('#show').classList.add('hide');
      document.querySelector('#signIn').classList.add('hide');
      document.querySelector('#talliesList').classList.add('hide');
      console.log('welcome to welcome');
    })
    .resolve();
};

module.exports = handleRoutes;
