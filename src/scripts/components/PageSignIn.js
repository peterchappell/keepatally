import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router'

import SESSIONCONSTS from '../consts/sessionConsts'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  flagAuthAttempt() {
    sessionStorage.setItem(SESSIONCONSTS.key, SESSIONCONSTS.value)
  },
  handleGoogleSignIn(event) {
    event.preventDefault()
    this.flagAuthAttempt()
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  handleFacebookSignIn(event) {
    event.preventDefault()
    this.flagAuthAttempt()
    var provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  render() {
    document.title = 'Sign in - Keep a tally'
    var signInHeadingText = 'Sign in'
    var signInContent = (
      <div><p>You have to be signed in to create or modify tallies. You can use
      your Google account to sign in and get started.</p>
      <div className="signInButtons">
        <button className="signInGoogle button" onClick={this.handleGoogleSignIn}>Sign in with Google</button>
        <button className="signInFacebook button" onClick={this.handleFacebookSignIn}>Sign in with Facebook</button>
      </div>
      </div>
    )
    if (this.context.user.isPending || !this.context.user.isAnonymous) {
      signInHeadingText = 'Thank you'
      signInContent = (
        <div><p>Thanks for signing in!</p>
        <p>Now you can create a tally or <Link to="/tallies">take a look at your existing tallies</Link>.</p>
        <Link className="button" to="/create">Create a new tally</Link></div>
      )
    }
    return (
      <section className="panel">
        <header>
          <h1>{signInHeadingText}</h1>
        </header>
        {signInContent}
      </section>
    )
  }
})
