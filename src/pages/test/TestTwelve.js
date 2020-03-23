import React from 'react';
import { ThemeContextT, themes } from '@/context/ThemeContext';
import ThemeToggleButton from '@/components/TestComponent/ThemeToggleButton';
import product from 'immer';

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

      // 使用 immer 注意事项
      // immer 会改变原始 引用数据 值
      // 因此不能使用引用数据作为等值判断

      // this.setState(
      //   product(draft => {
      //     draft.context.theme = draft.context.theme.color1 === themes.dark.color1
      //       ? themes.light
      //       : themes.dark
      //   })
      // )
      this.setState(state => ({
        context: {
          ...state.context,
          theme: state.context.theme === themes.dark
          ? themes.light
          : themes.dark
        }
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
