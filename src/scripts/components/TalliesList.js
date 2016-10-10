import React from 'react'
import { Link } from 'react-router'

//components
import TalliesListItem from './TalliesListItem'

export default React.createClass({
  getInitialState() {
    return {
      loaded: false
    }
  },
  getTalliesNodes() {
    var tallyNodes = []
    if (this.props.tallies) {
      let talliesArray = Object.keys(this.props.tallies).map((key) => {
        return {
          id: key,
          title: this.props.tallies[key] && this.props.tallies[key].title,
          count: this.props.tallies[key] && this.props.tallies[key].tally_current,
          total: this.props.tallies[key] && this.props.tallies[key].tally_total,
          dateUpdated: this.props.tallies[key] && this.props.tallies[key].dateUpdated,
          dateCreated: this.props.tallies[key] && this.props.tallies[key].dateCreated
        }
      })
      tallyNodes = talliesArray.map(function (tally) {
        return <TalliesListItem key={tally.id} id={tally.id} tallyData={tally}>{tally.title}</TalliesListItem>
      })
    }
    return tallyNodes
  },
  componentDidMount() {
    this.setState({
      loaded: true
    })
  },
  render() {
    var listToRender
    var tallyNodesToRender = this.getTalliesNodes()
    if (!this.props.loaded) {
      listToRender = (<p>Loading...</p>)
    } else if (tallyNodesToRender.length) {
      listToRender = (<div>{tallyNodesToRender}</div>)
    } else {
      listToRender = (<div><p>You don't have any tallies yet. Maybe you should create one!</p><Link to='/create' className='button'>New Tally</Link></div>)
    }
    return (
      <div className={this.state.loaded?null:'hide'}>{listToRender}</div>
    )
  }
})
