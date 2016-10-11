import React from 'react'
import { Link } from 'react-router'

import SignedInPanel from './SignedInPanel'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      user: {
        isAnonymous: true,
        uid: 0
      },
      showPanel: false
    }
  },
  componentWillMount() {
    this.setState({
      user: this.context.user
    })
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      user: nextContext.user
    })
  },
  toggleProfile() {
    this.setState({
      showPanel: !this.state.showPanel
    })
  },
  closeUserPanelClickHandler(ev) {
    this.setState({
      showPanel: false
    })
  },
  render() {
    var userNavLink = <Link to="/signin" className="signin">Sign in</Link>
    if (this.props.isLoggedIn) {
      userNavLink = (
        <div className="signout">
          <img src={this.state.user.photoURL} className="profilePic" onClick={this.toggleProfile} />
          <SignedInPanel isShowing={this.state.showPanel} userName={this.state.user.displayName} clickAnywhereToCloseHandler={this.closeUserPanelClickHandler} />
        </div>
      )
    }
    return (
      <div className="user-nav">
        {userNavLink}
      </div>
    )
  }
})
