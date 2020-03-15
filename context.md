
## Context 

Context 提供了一个无需为每层组件手动添加props，就能在组件树间进行数据
传递的方法。

在典型的React应用中，数据是通过props属性自上而下（由父及子）进行传递的，
但这种做法对于某些类型的属性而言是极其繁琐的（例如：国际化，UI主题），这些
属性是应用程序中许多组件都需要的。Context提供了一种在组件之间共享此类值的方式，
而不必显式地通过组件树的逐层传递props。

## 何时使用Context 

Context 设计目的是为了共享那些对于一个组件树而言是 '全局' 的数据，例如当前认证的用户、
主题、或首选语言。

示例

```js
class App extends React.Component {
  render() {
    return <Toolbar theme='dark' />
  }
}

function Toolbar(props) {
  // Toolbar 组件接收一个额外的'theme'属性，然后传递给 ThemeButton 组件
  // 如果应用中的每一个单独的按钮都需要知道theme的值，这会是件很麻烦的事
  // 因为必须将这个值层层传递给所有组件

  return (
    <div>
      <ThemeButton theme={props.theme}></ThemeButton>
    </div>
  )
}

class ThemeButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />
  }
}
```

使用 Context 可以避免通过中间元素传递props

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树
// 为当前 theme 创建一个 context ('light'默认值)

const ThemeContext = React.createContext('light')

class App extends React.Component {
  // 使用一个 Provider 将当前的 theme 传递给一下的组件树
  // 无论多深，任何组件都能读取这个值
  // 在这个例子中，我们将'dark'作为当前值传递一下

  render() {
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

// 中间的组件再也不必指明往下传递  theme 了
function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}

class ThemeButton extends React.Component {
  // 指定 contextType 读取当前的 theme context
  // React 会往上找到最近的 theme Provider，然后使用它的值
  // 这个例子中，当前的 theme 值为'dark'
  static contextType = ThemeContext

  render() {
    return <Button theme={this.context} />
  }
}
```