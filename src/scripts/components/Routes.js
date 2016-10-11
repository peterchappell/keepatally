import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// components
import App from './App'
import Welcome from './PageWelcome'
import Create from './PageCreate'
import Tallies from './PageTallies'
import Tally from './PageTally'
import EditTally from './PageEditTally'
import SignIn from './PageSignIn'
import SignOut from './PageSignOut'
import EnsureLoggedInRoute from './EnsureLoggedInRoute'

export default React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome}/>
          <Route path="/tallies" component={Tallies} />
          <Route path="/tallies/:tallyId" component={Tally} />
          <Route component={EnsureLoggedInRoute}>
            <Route path="/create" component={Create}/>
            <Route path="/tallies/:tallyId/edit" component={EditTally} />
          </Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
        </Route>
      </Router>
    )
  }
})
