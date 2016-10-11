import React from 'react'
import { Link } from 'react-router'
import firebase from 'firebase/app'
import 'firebase/auth'

// components
import UserNav from './UserNav'

import SESSIONCONSTS from '../consts/sessionConsts'

const LogoSVG = require('babel!svg-react!../../images/keep-a-tally.svg?name=LogoSVG')
const CreateIcon = require('babel!svg-react!../../images/icon-create.svg?name=CreateIcon')
const ListIcon = require('babel!svg-react!../../images/icon-list.svg?name=ListIcon')

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
  setupFirebaseAuthListener() {
    this.firebaseAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          user: user
        })
      }
    })
  },
  getInitialState() {
    // set a default user so that there is always a user object in state
    // use the "isAnonymous" flag to determine logged in state
    // (simulates Firebase anonymous Auth but without having to create all the anoymous users in Firebase)
    return {
      user: {
        isAnonymous: true,
        uid: 0,
        displayName: 'Someone...',
        isPending: false
      }
    }
  },
  setPendingUserState(pendingValue) {
    let newUser = Object.assign({}, this.state.user, {isPending: pendingValue})
    this.setState({
      user: newUser
    })
  },
  componentDidMount() {
    // using componentDidMount to bind to a listener that retrieves the user
    // https://facebook.github.io/react/tips/initial-ajax.html
    // http://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
    this.setupFirebaseAuthListener()
    // also get it to check the session variable that we set when attempting to login
    // (because session access is often faster that waiting for auth - the delay in auth is confusing)
    var authCheck = sessionStorage.getItem(SESSIONCONSTS.key)
    if (authCheck && authCheck === SESSIONCONSTS.value) {
      this.setPendingUserState(true)
    }
    // remove the session variable after 5 seconds (to handle an incomplete auth process)
    window.setTimeout(() => {
      sessionStorage.removeItem(SESSIONCONSTS.key)
      this.setPendingUserState(false)
    }, 5000)
  },
  componentWillUnmount() {
    this.firebaseAuthListener && this.firebaseAuthListener()
    this.firebaseAuthListener = undefined
  },
  render() {
    return (
      <section className="main">
        <header className="banner">
          <h1><Link to="/"><LogoSVG className="logo" /></Link></h1>
          <UserNav isLoggedIn = {!this.state.user.isAnonymous} />
          <nav>
            <Link to="/create"><CreateIcon className="icon" /><span className="text">Create</span></Link>
            <Link to="/tallies"><ListIcon className="icon" /><span className="text">List</span></Link>
          </nav>
        </header>

        {this.props.children}

      </section>
    )
  }
})
