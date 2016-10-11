import React from 'react'

// components
import TallyForm from './TallyForm'

export default React.createClass({
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      uid: null,
      userName: 'Someone...'
    }
  },
  componentWillMount() {
    this.setState({
      userId: this.context.user.uid,
      userName: this.context.user.displayName
    })
  },
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      userId: nextContext.user.uid,
      userName: nextContext.user.displayName
    })
  },
  render() {
    document.title = 'Create a tally - Keep a tally'
    return (
      <section id="form" className="panel">
        <header>
          <h1 id="form_title">Create a new tally</h1>
        </header>
        <div id="create_form">
          <TallyForm userId={this.state.userId} userName={this.state.userName} type="create" />
        </div>
      </section>
    )
  }
})
