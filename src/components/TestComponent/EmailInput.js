import React from 'react';

class EmailInput extends React.Component {

  state = {
    email: this.props.defaultEmail
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />
  }
}

export default EmailInput;