import React from 'react'
import firebase from 'firebase/app'
import ReactFireMixin from 'reactfire'

// components
import TallyForm from './TallyForm'

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
    }
  },
  componentWillMount() {
    this.tallyRef = firebase.database().ref('tallies/' + this.props.params.tallyId)
    this.bindAsObject(this.tallyRef, 'tallyData')
    this.setState({
      userId: this.context.user.uid
    })
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      userId: nextContext.user.uid
    })
  },
  render() {
    return (
      <section id="form" className="panel">
        <header>
          <h1 className="tally-title">{this.state.tallyData.title}</h1>
        </header>
        <div id="create_form">
          <TallyForm userId={this.state.userId} tallyId={this.props.params.tallyId} tallyData={this.state.tallyData} />
        </div>
      </section>
    )
  }
})
