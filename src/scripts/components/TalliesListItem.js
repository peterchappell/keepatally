import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <article className="talliesListItem">
        <Link to={'/tallies/' + this.props.id}>
          <header><h1>{this.props.children}</h1></header>
          <ul>
            <li>Current tally: {this.props.count}</li>
            <li className={this.props.total==0?'hide':''}>Goal: {this.props.total}</li>
          </ul>
        </Link>
      </article>
    )
  }
})
