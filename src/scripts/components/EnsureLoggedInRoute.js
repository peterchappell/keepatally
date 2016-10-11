import React from 'react'
import { browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  redirectAnonUsers(user) {
    if (user.isAnonymous) {
      browserHistory.replace('/signin')
    }
  },
  componentWillReceiveProps(nextProps, nextContext) {
    window.clearTimeout(this.waitForAuthBeforeRedirect)
    this.redirectAnonUsers(nextContext.user)
  },
  componentDidMount() {
    this.waitForAuthBeforeRedirect = window.setTimeout(() => {
      this.redirectAnonUsers(this.context.user)
    }, 1500) // This is dodgy I know... Pausing for user auth to come from firebase...
  },
  render() {
    if (!this.context.user || this.context.user.isAnonymous) {
      return null
    } else {
      return this.props.children
    }
  }
})
