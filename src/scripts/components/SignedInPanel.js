import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  componentWillReceiveProps(nextProps) {
    if (nextProps.isShowing) {
      document.addEventListener('click', this.props.clickAnywhereToCloseHandler, false)
    } else {
      document.removeEventListener('click', this.props.clickAnywhereToCloseHandler, false)
    }
  },
  render() {
    return (
      <div className={this.props.isShowing?'profilePanel':'hide'}>
        <p className="loggedInAs">Signed in as {this.props.userName}</p>
        <Link to="/signout" className="button">Sign out</Link>
        <div className="arrow-up"></div>
      </div>
    )
  }
})
