import React from 'react'
import getStrokesArrayForBlock from '../helpers/getStrokesArrayForBlock'

// components
import TallyBlock from './TallyBlock'

export default React.createClass({
  getDefaultProps() {
    return {
      total: 0,
      count: 0
    }
  },
  getStrokesArray(blockIndex) {
    return getStrokesArrayForBlock(blockIndex, this.props.count, this.props.total)
  },
  getTallyBlocks() {
    var numTallyBlocks = Math.ceil(Math.max(this.props.total, this.props.count)/5)
    var tallyBlocks = []
    var blockStrokesArray = []
    for (var i = 0; i < numTallyBlocks; i++) {
      blockStrokesArray = this.getStrokesArray(i)
      tallyBlocks.push(<TallyBlock key={'tally_' + i} strokesArray={blockStrokesArray} />)
    }
    return tallyBlocks
  },
  render() {
    var tallyBlocksContent = this.getTallyBlocks();
    if (!tallyBlocksContent.length) {
      tallyBlocksContent = 'TODO: Message to encourage user to make the first mark...'
    }
    return (
      <div>{tallyBlocksContent}</div>
    )
  }
})
