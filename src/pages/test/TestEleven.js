import React from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import Toolbar from '@/components/TestComponent/Toolbar';
import { Button } from 'antd';


class App extends React.Component {

  state = {
    theme: 'red'
  }
  handleChange = () => {
    this.setState({
      theme: 'blue'
    })
  }

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.handleChange}>change theme</Button>
        </div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar />
        </ThemeContext.Provider>
        <div>
          <Toolbar />
        </div>
      </div>
    )
  }
}

export default App;