import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router'

export default React.createClass({
  handleGoogleSignIn(event) {
    event.preventDefault()
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut().then(function() {
      firebase.auth().signInWithRedirect(provider);
    }, function() {
      firebase.auth().signInWithRedirect(provider);
    });
  },
  render() {
    return (
      <section className="panel">
        <header>
          <h1>Sign in</h1>
        </header>
        <p>You have to be signed in to create or modify tallies. You can use
          your Google account to sign in and get started.</p>
        <button className="signInGoogle" onClick={this.handleGoogleSignIn}>Sign in with Google</button>
      </section>
    )
  }
})
