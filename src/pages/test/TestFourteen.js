import React from 'react';

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse

    return (
      <div style={{
        position: 'absolute',
        left: mouse.x,
        top: mouse.y,
        width: 30,
        height: 30,
        border: '1px solid green',
        borderRadius: '50%',
      }}></div>
    )
  }
}

class Mouse extends React.Component {
  state = {
    x: 0,
    y: 0,
  }
  handleMouse = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }
  render() {
    return (
      <div style={{height: '100vh'}} onMouseMove={this.handleMouse}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标！</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} />
      </div>
    )
  }
}

export default MouseTracker;

