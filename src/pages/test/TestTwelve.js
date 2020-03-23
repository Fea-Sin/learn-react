import React from 'react';
import { ThemeContextT, themes } from '@/context/ThemeContext';
import ThemeToggleButton from '@/components/TestComponent/ThemeToggleButton';

function Content() {
  return (
    <div>
      <ThemeToggleButton />
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.toggleTheme = () => {
      console.log('jjjj---')
      this.setState(state => ({
        theme: 
          state.theme === themes.dark
            ? themes.light
            : themes.dark
      }))      
    }

    this.state = {
      context: {
        theme: themes.light,
        toggleTheme: this.toggleTheme
      }      
    }
  }
  

  render() {
    return (
      <div>
        <div>this is twelve</div>
        <ThemeContextT.Provider value={this.state.context}>
          <Content />
        </ThemeContextT.Provider>
      </div>
    )
  }
}

export default App;
