import React from 'react'

const ArrowSVG = require('babel!svg-react!../../images/arrow.svg?name=ArrowSVG');

export default React.createClass({
  getDefaultProps() {
    return {
      isEditable: false,
      clickHandler: null
    }
  },
  render() {
    if (this.props.isEditable) {
      return (
        <div onClick={this.props.clickHandler} className="makeFirstMark">
          <ArrowSVG className="arrow"/>
          <p>Make your first mark here.</p>
        </div>
      )
    }
    return (<p>This tally hasn't been started yet.</p>)
  }
})
