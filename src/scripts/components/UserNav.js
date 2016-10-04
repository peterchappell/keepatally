import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    var userNavLink = <Link to="/signin" className="signin">Sign in</Link>
    if (this.props.isLoggedIn) {
      userNavLink = <Link to="/signout" className="signout">Sign out</Link>
    }
    return (
      <div className="user-nav">
        {userNavLink}
      </div>
    )
  }
})
