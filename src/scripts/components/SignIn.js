import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  handleGoogleSignIn(event) {
    event.preventDefault()
    if (this.context.user && this.context.user.isAnonymous) {
      //this.context.user.delete()
    }
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signOut().then(function() {
      firebase.auth().signInWithRedirect(provider)
    }, function(error) {
      console.error('ERROR: There was a problem signing out', error.code, error.message)
      firebase.auth().signInWithRedirect(provider)
    })
  },
  render() {
    var signInContent = (
      <div><p>You have to be signed in to create or modify tallies. You can use
      your Google account to sign in and get started.</p>
    <button className="signInGoogle" onClick={this.handleGoogleSignIn}>Sign in with Google</button></div>
    )
    if (this.context.user && !this.context.user.isAnonymous) {
      signInContent = (
        <div><p>Thanks for signing in!</p>
        <p>Now you can create a tally or <Link to="/tallies">take a look at your existing tallies</Link>.</p>
        <Link className="button" to="/create">Create a new tally</Link></div>
      )
    }
    return (
      <section className="panel">
        <header>
          <h1>Sign in</h1>
        </header>
        {signInContent}
      </section>
    )
  }
})
