import React from 'react'
import { Link, browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  redirectAnonUsers(user) {
    if (user && user.isAnonymous && user.uid !== 0) {
      browserHistory.replace("/signin")
    }
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.redirectAnonUsers(nextContext.user);
  },
  componentDidMount() {
    console.log('maybe redirect', this.context.user)
    this.redirectAnonUsers(this.context.user)
  },
  render() {
    if (!this.context.user || this.context.user.isAnonymous) {
      return null
    } else {
      return this.props.children
    }
  }
})
