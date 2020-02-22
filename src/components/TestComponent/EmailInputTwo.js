import React from 'react';

class EmailInputTwo extends React.Component {
  state = {
    email: this.props.defaultEmail,
  }

  resetEmailForNewUser(newEmail) {
    this.setState({
      email: newEmail
    })
  }

  handleChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />
  }
}

export default EmailInputTwo;