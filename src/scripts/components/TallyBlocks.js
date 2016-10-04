import React from 'react'
import getStrokesArrayForBlock from '../helpers/getStrokesArrayForBlock'

// components
import TallyBlock from './TallyBlock'

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
    var numTallyBlocks = Math.ceil(Math.max(this.props.total, this.props.count)/5)
    var tallyBlocks = []
    var blockStrokesArray = []
    var isActiveBlock
    for (var i = 0; i < numTallyBlocks; i++) {
      blockStrokesArray = this.getStrokesArray(i)
      isActiveBlock = this.isThisBlockActive(i)
      tallyBlocks.push(<TallyBlock key={'tally_' + i} strokesArray={blockStrokesArray} isActive={isActiveBlock} clickHandler={isActiveBlock?this.props.incrementActionHandler:null} />)
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
