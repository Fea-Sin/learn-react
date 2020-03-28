import React from 'react';

class Mouse extends React.Component {
  state = {
    x: 0,
    y: 0,
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    const { children } = this.props
    return(
      <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
        {children(this.state)}
      </div>
    )
  }
}

export default Mouse;
