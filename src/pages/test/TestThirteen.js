import React from 'react';
import { ThemeContext, UserContext } from '@/context/ThemeContext';
import Layout from '@/components/TestComponent/Layout';

class App extends React.Component {

  //这就是所谓的隔空传物吗😊

  state = {
    theme: 'light00000😊',
    user: {
      name: 'Hello'
    },
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <UserContext.Provider value={this.state.user}>
          <div>
            <div>Test Thirteen</div>
            <Layout />
          </div>
        </UserContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App;
