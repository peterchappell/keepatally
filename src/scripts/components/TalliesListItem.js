import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <li><Link to={'/tallies/' + this.props.id}>{this.props.children}</Link></li>
    )
  }
})
