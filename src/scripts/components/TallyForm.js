import React from 'react'
import { browserHistory, Link } from 'react-router'
import firebase from 'firebase/app'
import ReactFireMixin from 'reactfire'

export default React.createClass({
  mixins: [ReactFireMixin],
  getDefaultProps() {
    return {
      tallyId: null,
      userId: null,
      userName: null
    }
  },
  getInitialState() {
    return {
      title: '',
      tally_current: 0,
      tally_total: 0,
      dateCreated: null
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.tallyData) {
      this.setState(nextProps.tallyData)
    }
  },
  handleValueChange(event) {
    var stateUpdate = {}
    stateUpdate[event.target.name] = event.target.value
    this.setState(stateUpdate)
  },
  handleSubmit(event) {
    var tallyKey
    var dbUpdates
    var thisTallyUpdate
    event.preventDefault()
    if (!this.props.tallyId) {
      tallyKey = firebase.database().ref().child('tallies').push().key
    } else {
      tallyKey = this.props.tallyId
    }
    dbUpdates = {}
    thisTallyUpdate = {
      'title': this.state.title,
      'tally_current': this.state.tally_current,
      'tally_total': this.state.tally_total,
      'owner_id': this.props.userId,
      'owner_name': this.props.userName,
      'shared_with': {} // TODO: Allow for sharing
    }
    if (this.props.type === 'create') {
      thisTallyUpdate.dateCreated = Date.now()
    } else {
      thisTallyUpdate.dateCreated = this.state.dateCreated
      thisTallyUpdate.dateUpdated = Date.now()
    }
    dbUpdates['/tallies/' + tallyKey] = thisTallyUpdate
    firebase.database().ref().update(dbUpdates).then(
      function() {
        browserHistory.replace('/tallies/' + tallyKey)
      },
      function(rejected) {
        // TODO: Handle errors better
        console.error('ERROR: There was a problem creating that tally...', rejected)
      }
    )
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form">
          <div className="form-row">
            <label htmlFor="tally-form-title" className="form-label">Title</label>
            <input name="title" id="tally-form-title" required className="tally-title" placeholder="Tally of things..." value={this.state.title} onChange={this.handleValueChange} />
          </div>
          <div className="form-row">
            <label htmlFor="tally-form-count" className="form-label">Current tally</label>
            <input type="number" min="0" max="10000" required id="tally-form-count" name="tally_current" placeholder="0" value={parseInt(this.state.tally_current,10)} onChange={this.handleValueChange}/>
          </div>
          <div className="form-row">
            <label htmlFor="tally-form-total" className="form-label">Goal</label>
            <input name="tally_total" min="0" max="10000" required id="tally-form-total" type="number" placeholder="∞" value={parseInt(this.state.tally_total,10)} onChange={this.handleValueChange} />
            <p className="form-help">Hint: You can set a goal if you want to tally a known number of things. Otherwise just set the goal to zero.</p>
          </div>
        </div>
        <button type="submit">Save</button>
        <Link to={'/tallies/' + this.props.tallyId} className={this.props.type==='create'?'hide':'button button-cancel'}>Cancel</Link>
      </form>
    )
  }
})
