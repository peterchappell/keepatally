import React from 'react'
import { Link, IndexLink } from 'react-router'

const rae_image_src = require('../../images/star-wars-tally.gif');

export default React.createClass({
  render() {
    return (
      <section className="panel">
        <header>
          <h1>Good reasons to keep a tally...</h1>
        </header>
        <ol className="welcome-points">
          <li>
            <p>
              The number 1 reason is of course... <strong>to be like Rey!</strong>
            </p>
            <img src={rae_image_src} />
          </li>
          <li>
            Track how many days you've not been smoking.
          </li>
          <li>
            Keep a swear jar!
          </li>
        </ol>
        <Link to="/create" className="button">Create a tally board</Link>
      </section>
    )
  }
})
