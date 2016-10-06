import React from 'react'
import { Link } from 'react-router'

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
  render() {
    console.log('user for nav', this.state.user)
    var userNavLink = <Link to="/signin" className="signin">Sign in</Link>
    if (this.props.isLoggedIn) {
      userNavLink = (
        <div className="signin">
          <img src={this.state.user.photoURL} className="profilePic" onClick={this.toggleProfile} />
          <div className={this.state.showPanel?'profilePanel':'hide'}>
            <p className="loggedInAs">Signed in as <strong>{this.state.user.displayName}</strong></p>
            <Link to="/signout" className="button">Sign out</Link>
          </div>
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
