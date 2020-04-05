import React from 'react';
import Modal from '@/components/TestComponent/Modal';

function Child() {
  return (
    <div>
      <button>Click</button>
    </div>
  )
}

class App extends React.Component {

  state = {
    clicks: 0,
  }
  handleClick = () => {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render() {
    return (
      <div>
        <div>Nineteen</div>
        <div id='modal-root'></div>
        <div id='app-root' onClick={this.handleClick}>
          <div>app root</div>
          <div>Number of clicks {this.state.clicks}</div>
          <Modal>
            <Child />
          </Modal>
        </div>
      </div>
    )
  }
}

export default App;