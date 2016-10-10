import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    var dateCreated = new Date(this.props.tallyData.dateCreated).toUTCString()
    var dateUpdated = 'No updates yet.'
    if (this.props.tallyData.dateUpdated) {
      dateUpdated = 'Last updated ' + new Date(this.props.tallyData.dateUpdated).toUTCString() + '.'
    }
    return (
      <article className="talliesListItem">
        <Link to={'/tallies/' + this.props.id}>
          <header><h1>{this.props.children}</h1></header>
          <ul>
            <li>Current tally: {this.props.tallyData.count}</li>
            <li className={this.props.tallyData.total==0?'hide':''}>Goal: {this.props.tallyData.total}</li>
          </ul>
          <ul>
            <li>{dateUpdated}</li>
            <li>Created {dateCreated}.</li>
          </ul>
        </Link>
      </article>
    )
  }
})
