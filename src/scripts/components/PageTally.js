import React from 'react'
import { Link } from 'react-router'
import firebase from 'firebase/app'
import ReactFireMixin from 'reactfire'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// components
import TallyBlocks from './TallyBlocks'
import TallyDates from './TallyDates'

export default React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      tallyData: {
        title: 'Loading the tally...',
        tally_total: 0,
        tally_current: 0,
        owner_id: null,
        owner_name: 'someone...',
        dateUpdated: null,
        dateCreated: null
      }
    }
  },
  isEditable() {
    return this.context.user && !this.context.user.isAnonymous && this.context.user.uid === this.state.tallyData.owner_id
  },
  componentWillMount() {
    this.tallyRef = firebase.database().ref('tallies/' + this.props.params.tallyId)
    this.bindAsObject(this.tallyRef, 'tallyData')
  },
  incrementCount() {
    var updates = {}
    var tallyRef = 'tallies/' + this.props.params.tallyId
    updates[tallyRef + '/tally_current'] = parseInt(this.state.tallyData.tally_current,10) + 1
    updates[tallyRef + '/dateUpdated'] = Date.now()
    firebase.database().ref().update(updates)
  },
  render() {
    document.title = `${this.state.tallyData.title} - Keep a tally`
    var isEditable = this.isEditable()
    var editPath = '/tallies/' + this.props.params.tallyId + '/edit'
    var createdByText = isEditable?'YOU!':this.state.tallyData.owner_name + '.'
    return (
      <ReactCSSTransitionGroup transitionName="fadeIn" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500}>
      <section className="panel">
        <header>
          <h1 className="tally-title">{this.state.tallyData.title}</h1>
          <div className="tally-info-owner">
            This tally is being kept by {createdByText}
            <nav className={isEditable?'tally-edit':'hide'}>(<Link to={editPath}>edit your tally</Link>).</nav>
          </div>
          <TallyDates dateCreated={this.state.tallyData.dateCreated} dateUpdated={this.state.tallyData.dateUpdated} />
        </header>
        <div className="show-tally">
          <TallyBlocks total={parseInt(this.state.tallyData.tally_total, 10)} count={parseInt(this.state.tallyData.tally_current, 10)} isEditable={isEditable} incrementActionHandler={this.incrementCount} />
        </div>
      </section>
      </ReactCSSTransitionGroup>
    )
  }
})
