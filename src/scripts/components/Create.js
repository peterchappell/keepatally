import React from 'react'

// components
import TallyForm from './TallyForm'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      userId: null
    }
  },
  componentWillMount() {
    this.setState({
      userId: this.context.user.uid
    })
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      userId: nextContext.user.uid
    })
  },
  render() {
    return (
      <section id="form" className="panel">
        <header>
          <h1 id="form_title">Create a new tally</h1>
        </header>
        <div id="create_form">
          <TallyForm userId={this.state.userId} />
        </div>
      </section>
    )
  }
})
