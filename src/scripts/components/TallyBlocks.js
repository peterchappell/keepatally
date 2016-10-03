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
    getStrokesArrayForBlock(blockIndex, this.props.count, this.props.total)
  },
  getTallyBlocks() {
    var numTallyBlocks = Math.ceil(Math.max(this.props.total, this.props.count)/5)
    var tallyBlocks = []
    var blockStrokesArray = []
    for (var i = 0; i < numTallyBlocks; i++) {


      // tallyBlockCompleteStrokes = 0
      // tallyBlockWaitingStrokes = 0
      // if (i < numTallyBlocksComplete) {
      //   tallyBlockCompleteStrokes = 5
      // } else if (i = numTallyBlocksComplete){
      //   tallyBlockCompleteStrokes = 2
      // }

      // if (i < numTallyBlocksComplete) {
      //   tallyBlockCompleteStrokes = 5
      //   tallyBlockWaitingStrokes = 5
      // } else if (i > numTallyBlocksComplete && i < numTallyBlocks) {
      //   tallyBlockCompleteStrokes = 0
      //   tallyBlockWaitingStrokes = 5
      // } else {
      //   tallyBlockType = 'partial'
      // }
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
