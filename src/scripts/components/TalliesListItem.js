import React from 'react'
import { Link } from 'react-router'

import TallyDates from './TallyDates'

export default React.createClass({
  render() {
    return (
      <article className="talliesListItem">
        <Link to={'/tallies/' + this.props.id}>
          <header><h1>{this.props.children}</h1></header>
          <ul>
            <li>Current tally: {this.props.tallyData.count}</li>
            <li className={this.props.tallyData.total==0?'hide':''}>Goal: {this.props.tallyData.total}</li>
          </ul>
          <TallyDates dateCreated={this.props.tallyData.dateCreated} dateUpdated={this.props.tallyData.dateUpdated} />
        </Link>
      </article>
    )
  }
})
