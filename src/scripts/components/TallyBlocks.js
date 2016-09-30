import React from 'react'

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
    var emptyStrokeFlag = 0
    var completedStrokeFlag = 1
    var waitingStrokeFlag = -1
    var tallyBlockStrokesArray = Array(5).fill(0);
    var totalCountForBlock = (blockIndex+1)*5
    if (this.props.count && this.props.count > totalCountForBlock) {
      return tallyBlockStrokesArray.fill(completedStrokeFlag);
    }
    if (this.props.total && this.props.total > totalCountForBlock) {
      return tallyBlockStrokesArray.fill(waitingStrokeFlag);
    }
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
