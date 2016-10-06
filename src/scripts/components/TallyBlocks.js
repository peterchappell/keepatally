import React from 'react'
import getStrokesArrayForBlock from '../helpers/getStrokesArrayForBlock'

// components
import TallyBlock from './TallyBlock'
import EmptyTally from './EmptyTally'

export default React.createClass({
  getDefaultProps() {
    return {
      total: 0,
      count: 0,
      isEditable: false,
      incrementActionHandler: null
    }
  },
  getStrokesArray(blockIndex) {
    return getStrokesArrayForBlock(blockIndex, this.props.count, this.props.total)
  },
  isThisBlockActive(blockIndex) {
    return this.props.isEditable && this.props.count >= blockIndex * 5 && this.props.count < (blockIndex + 1) * 5
  },
  getTallyBlocks() {
    var maxVisibleStrokes = Math.max(this.props.total, this.props.count)
    var numTallyBlocks = Math.ceil(maxVisibleStrokes/5)
    var tallyBlocks = []
    var blockStrokesArray = []
    var isActiveBlock
    // add an extra block ready to be clicked when all tallies on board are complete
    if (numTallyBlocks && this.props.count % 5 === 0 && maxVisibleStrokes % 5 === 0) {
      numTallyBlocks += 1
    }
    for (var i = 0; i < numTallyBlocks; i++) {
      blockStrokesArray = this.getStrokesArray(i)
      isActiveBlock = this.isThisBlockActive(i)
      tallyBlocks.push(<TallyBlock key={'tally_' + i} strokesArray={blockStrokesArray} isActive={isActiveBlock} clickHandler={isActiveBlock?this.props.incrementActionHandler:null} />)
    }
    return tallyBlocks
  },
  render() {
    var tallyBlocksContent = this.getTallyBlocks()
    if (!tallyBlocksContent.length) {
      tallyBlocksContent = <EmptyTally clickHandler={this.props.incrementActionHandler} isEditable={this.props.isEditable} />
    }
    return (
      <div>{tallyBlocksContent}</div>
    )
  }
})
