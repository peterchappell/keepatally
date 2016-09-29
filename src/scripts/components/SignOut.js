import React from 'react'
import { Link, IndexLink } from 'react-router'
import firebase from 'firebase/app'
import 'firebase/auth'

export default React.createClass({
  componentDidMount() {
    firebase.auth().signOut().then(function() {
      location.href="/";
    }, function(error) {
      console.log('There was an error signing out', error.code, error.message)
    });
  },
  render() {
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
