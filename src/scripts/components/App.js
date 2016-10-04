import React from 'react'
import { Link } from 'react-router'
import firebase from 'firebase/app'
import 'firebase/auth'

// components
import UserNav from './UserNav'

export default React.createClass({
  childContextTypes: {
    user: React.PropTypes.object
  },
  getChildContext() {
    // using react's context to maintain the user details as per:
    // https://facebook.github.io/react/docs/context.html
    // requires stating "user" in contextTypes for any component that needs user
    return {
      user: this.state.user
    }
  },
  signInAnonymously() {
    firebase.auth().signInAnonymously().catch((error) => {
      if (error) {
        // TODO: Handle errors better
        console.error('ERROR: There was an error with anonymous authentication', error.code, error.message)
      }
    })
  },
  setupFirebaseAuthListener() {
    this.firebaseAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          user: user
        })
      } else {
        this.signInAnonymously()
      }
    })
  },
  getInitialState() {
    return {
      user: {
        isAnonymous: true,
        uid: 0
      }
    }
  },
  componentDidMount() {
    // using componentDidMount to bind to a listener that retrieves the user
    // https://facebook.github.io/react/tips/initial-ajax.html
    // http://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
    this.setupFirebaseAuthListener()
  },
  componentWillUnmount() {
    this.firebaseAuthListener && this.firebaseAuthListener()
    this.firebaseAuthListener = undefined
  },
  render() {
    return (
      <section className="main">
        <header className="banner">
          <h1><Link to="/">Keep a tally</Link></h1>
          <UserNav isLoggedIn = {!this.state.user.isAnonymous} />
          <nav>
            <Link to="/create">New tally</Link>
            <Link to="/tallies">My tallies</Link>
          </nav>
        </header>

        {this.props.children}

      </section>
    )
  }
})
