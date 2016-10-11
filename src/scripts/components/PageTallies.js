import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router'

//components
import TalliesList from './TalliesList'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      tallies: {},
      loaded: false
    }
  },
  getTalliesForUser(user) {
    if (user && !user.isAnonymous) {
      var talliesRef = firebase.database().ref('tallies').orderByChild('owner_id').equalTo(user.uid)
      talliesRef.once('value', (talliesSnapshot) => {
        var tallyRecords = talliesSnapshot.val()
        this.setState({
          tallies: tallyRecords,
          loaded: true
        })
      })
    }
  },
  componentWillMount() {
    this.getTalliesForUser(this.context.user)
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.getTalliesForUser(nextContext.user)
  },
  render() {
    document.title = 'Tallies - Keep a tally'
    var talliesListContent = (<div><p>You'll need to sign in to see the tallies you've created.</p><Link to='/signin' className='button'>Sign in</Link></div>)
    if (this.context.user && !this.context.user.isAnonymous) {
      talliesListContent = <TalliesList tallies={this.state.tallies} loaded={this.state.loaded} />
    }
    return (
      <section className="panel">
        <header>
          <h1>My tallies</h1>
        </header>
        {talliesListContent}
      </section>
    )
  }
})
