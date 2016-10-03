import React from 'react'
import { Link } from 'react-router'
import firebase from 'firebase/app'
import ReactFireMixin from 'reactfire'

// components
import TallyBlocks from './TallyBlocks'

export default React.createClass({
  mixins: [ReactFireMixin],
  getInitialState() {
    return {
      tallyData: {
        title: '',
        tally_total: 0,
        tally_current: 0
      }
    };
  },
  componentWillMount() {
    var thisTallyRef = firebase.database().ref('tallies/' + this.props.params.tallyId);
    this.bindAsObject(thisTallyRef, "tallyData");
  },
  render() {
    return (
      <section className="panel">
        <header>
          <h1 className="tally-title">{this.state.tallyData.title}</h1>
          <nav className="tally-edit"><Link to="edit">Edit</Link></nav>
        </header>
        <div className="show-tally">
          <TallyBlocks total={parseInt(this.state.tallyData.tally_total, 10)} count={parseInt(this.state.tallyData.tally_current, 10)} />
        </div>
      </section>
    )
  }
})
