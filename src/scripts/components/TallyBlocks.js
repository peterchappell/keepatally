import React from 'react'

// components
import TallyBlock from './TallyBlock'

export default React.createClass({
  getTallyBlocks() {
    var numTallyBlocks = Math.floor(Math.max(this.props.total, this.props.count)/5)
    var tallyBlocks = []
    for (var i = 0; i < numTallyBlocks; i++) {
      tallyBlocks.push(<TallyBlock key={'tally_' + i} />)
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
