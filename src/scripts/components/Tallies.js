import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database';

//components
import TallyList from './TallyList'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      tallies: {},
      loaded: false
    };
  },
  getTalliesForUser(user) {
    if (user && !user.isAnonymous) {
      var talliesRef = firebase.database().ref('tallies').orderByChild("owner_id").equalTo(user.uid);
      talliesRef.once('value', (talliesSnapshot) => {
        var tallyRecords = talliesSnapshot.val();
        this.setState({
          tallies: tallyRecords,
          loaded: true
        });
      });
    }
  },
  componentWillMount() {
    this.getTalliesForUser(this.context.user);
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.getTalliesForUser(nextContext.user);
  },
  render() {
    return (
      <section className="panel">
        <header>
          <h1>My tallies</h1>
        </header>
        <TallyList tallies={this.state.tallies} loaded={this.state.loaded} />
      </section>
    )
  }
})
