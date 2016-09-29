import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// components
import App from './App'
import Welcome from './Welcome'
import Create from './Create'
import Tallies from './Tallies'
import Tally from './Tally'
import EditTally from './EditTally'
import SignIn from './SignIn'
import SignOut from './SignOut'

export default React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome}/>
          <Route path="/create" component={Create}/>
          <Route path="/tallies" component={Tallies} />
          <Route path="/tallies/:tallyId" component={Tally} />
          <Route path="/tallies/:tallyId/edit" component={EditTally} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
        </Route>
      </Router>
    )
  }
})
