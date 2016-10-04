import React from 'react'
import { Link } from 'react-router'
import firebase from 'firebase/app'
import ReactFireMixin from 'reactfire'

// components
import TallyBlocks from './TallyBlocks'

export default React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      tallyData: {
        title: '',
        tally_total: 0,
        tally_current: 0,
        owner_id: null
      }
    };
  },
  isEditable() {
    return this.context.user && !this.context.user.isAnonymous && this.context.user.uid === this.state.tallyData.owner_id
  },
  componentWillMount() {
    this.tallyRef = firebase.database().ref('tallies/' + this.props.params.tallyId);
    this.bindAsObject(this.tallyRef, "tallyData");
  },
  incrementCount() {
    var updates = {};
    var tallyCountRef = 'tallies/' + this.props.params.tallyId + '/tally_current';
    updates[tallyCountRef] = this.state.tallyData.tally_current + 1
    firebase.database().ref().update(updates)
  },
  render() {
    var isEditable = this.isEditable()
    var editPath = '/tallies/' + this.props.params.tallyId + '/edit'
    return (
      <section className="panel">
        <header>
          <h1 className="tally-title">{this.state.tallyData.title}</h1>
          <nav className={isEditable?'tally-edit':'hide'}><Link to={editPath}>Edit</Link></nav>
        </header>
        <div className="show-tally">
          <TallyBlocks total={parseInt(this.state.tallyData.tally_total, 10)} count={parseInt(this.state.tallyData.tally_current, 10)} isEditable={isEditable} incrementActionHandler={this.incrementCount} />
        </div>
      </section>
    )
  }
})
