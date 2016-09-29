import React from 'react'

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
          title: this.props.tallies[key] && this.props.tallies[key].title
        }
      })
      tallyNodes = talliesArray.map(function (tally, index) {
        return <TalliesListItem key={tally.id} id={tally.id}>{tally.title}</TalliesListItem>;
      });
    }
    return tallyNodes
  },
  componentDidMount() {
    this.setState({
      loaded: true
    })
  },
  render() {
    var listToRender;
    var tallyNodesToRender = this.getTalliesNodes();
    if (!this.props.loaded) {
      listToRender = (<p>Loading...</p>)
    } else if (tallyNodesToRender.length) {
      listToRender = (<ul>{tallyNodesToRender}</ul>)
    } else {
      listToRender = (<p>You don't have any tallies yet. Maybe you should create one!</p>)
    }
    return (
      <div className={this.state.loaded?null:'hide'}>{listToRender}</div>
    )
  }
})
