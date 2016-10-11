import React from 'react'

export default React.createClass({
  convertDate(date) {
    var dateAsDate = new Date(date)
    var dateAsString
    try {
      dateAsString = `${dateAsDate.toLocaleDateString()} ${dateAsDate.toLocaleTimeString()}`
    } catch (er) {
      console.warn('Old browser, cannae do toLocaleDateString :(')
      dateAsString = dateAsDate.toUTCString()
    }
    return dateAsString
  },
  dateAsString(type, date) {
    var prettyDate = this.convertDate(date)
    if (type === 'updated' && date) {
      return `Last updated: ${prettyDate}.`
    } else if (type === 'updated') {
      return `No updates yet.`
    } else if (type === 'created' && date)  {
      return `Created: ${prettyDate}.`
    } else if (type === 'created') {
      return `Created before time was even being recorded!`
    }
    return false
  },
  render() {
    var createdDateInfo = this.dateAsString('created', this.props.dateCreated)
    var updatedDateInfo = this.dateAsString('updated', this.props.dateUpdated)
    return (
      <ul className="tally-info-dates">
         <li>{createdDateInfo}</li>
         <li>{updatedDateInfo}</li>
      </ul>
    )
  }
})
