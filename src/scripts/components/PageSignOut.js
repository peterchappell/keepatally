import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import SESSIONCONSTS from '../consts/sessionConsts'

export default React.createClass({
  componentDidMount() {
    sessionStorage.removeItem(SESSIONCONSTS.key)
    firebase.auth().signOut().then(function() {
      location.href = '/'
    }, function(error) {
      // TODO: Handle errors better
      console.error('ERROR: There was an error signing out', error.code, error.message)
    })
  },
  render() {
    document.title = 'Sign out - Keep a tally'
    return (
      <section className="panel">
        <header>
          <h1>Signing out</h1>
        </header>
        <p>Come back again sometime!</p>
      </section>
    )
  }
})
