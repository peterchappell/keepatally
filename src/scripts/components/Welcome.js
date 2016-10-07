import React from 'react'
import { Link } from 'react-router'

const rae_image_src = require('../../images/star-wars-tally.gif')
const ListIcon = require('babel!svg-react!../../images/icon-list.svg?name=ListIcon')

export default React.createClass({
  render() {
    return (
      <section className="panel panel-welcome">
        <section className="sub-panel-1">
          <header>
            <h1><ListIcon className="tally" /> reasons to keep a tally...</h1>
          </header>
          <ol className="welcome-points">
            <li>
              <p>
                So that next time you're stranded on a desert planet you can be like Rey!
              </p>
              <img src={rae_image_src} />
            </li>
            <li>
              Keep a swear jar!
            </li>
            <li>
              Count down the work days until your next holiday.
            </li>
            <li>
              How many meetings have you been to this week?
            </li>
            <li>
              Count just how many roads you really must walk down before...
            </li>
          </ol>
          <Link to="/create" className="button">Create a tally board</Link>
        </section>
        <aside className="sub-panel-2">
          <header><h2>How it works</h2></header>
          <ul>
            <li><Link to="/signin">Sign in</Link> using your google account</li>
            <li><Link to="/create">Create a tally</Link></li>
            <li>Click or tap to add the next stroke</li>
            <li>Share your tally with anyone - others can view your tally but only you can increase or edit it</li>
          </ul>
        </aside>
        <section className="sub-panel-3">
          <header>
            <h2>Ummm... Okay... Huh?</h2>
          </header>
          <p>Well... you see, this project was just a bit of "fun". Really it was an excuse to play around
            with <a href="https://facebook.github.io/react/">React</a> and <a href="https://firebase.google.com/">Firebase</a> and
            a few other things. It won't work on older browsers and it probably has the odd bug here or there.
            You're welcome to <a href="https://github.com/peterchappell/keepatally">look
            at the code on Github</a> and/or fork it, contribute to it or <a href="https://github.com/peterchappell/keepatally/issues">create issues</a>.</p>
          <p>Or... you could just <a href="/create">create a tally already</a>!</p>
        </section>
      </section>
    )
  }
})
