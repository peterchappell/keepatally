import React from 'react'
import { browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  redirectAnonUsers(user) {
    if (user && user.isAnonymous && user.uid !== 0) {
      browserHistory.replace('/signin')
    }
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.redirectAnonUsers(nextContext.user)
  },
  componentDidMount() {
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
