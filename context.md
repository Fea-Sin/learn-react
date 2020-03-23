
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

## React.createContext

创建一个Context对象，当React渲染了一个订阅了这个Context对象的组件，这个组件会从组件树
中离自身最近的那个匹配的 Provider 中读取当当前的 context 值。

```js
const MyContext = React.createContext(defaultValue)
```

只有当前组件所处的树中没有匹配到 Provider 时，其defaultValue参数才会生效，
这有助于在不使用Provider包装组件的情况下对组件进行测试，注意，将 undefined 传递给 Provider
的value时，消费组件的 defaultValue 不会生效。

## Context.Provider

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
Provider 接收一个 value 属性，传递给消费组件，一个 Provider 可以和多个消费组件对应关系，多个
 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

 当Provider的value值发生变化时，它内部的所有消费组件都会重新渲染。 Provider 及其内部 consumer 组件
 都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件 退出更新 的情况下
 也能更新。

 ## class.contextType

挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的
Context 对象，这能让你使用 this.context 来消费最近 Context 上的那个值，你可以在任何
生命周期函数中访问到它，包括 render 函数。

> **注意**
>
> 这个API只能订阅单一 context
> 如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化
> 你的contextType

```js
class MyClass extends React.Component {
  static contextType = MyContext;

  render() {
    const value = this.context;
  }
}
```

## Context.Consumer

让你的**函数组件**中完成订阅context，这需要**函数作为子元素(function as child)**这种模式。

```js
<MyContext.Consumer>
  {value => (/* 基于 context 值进行渲染 */)}
</MyContext.Consumer>
```
这个函数接收当前的context值，返回一个React节点，传递给函数的value值等同于往上组件树
离这个context最近的Provider提供的value值，如果没有对应的Provider，value参数
等同于传递给 createContext()的defaultValue值。

## 注意事项

因为context会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些
陷阱，当provider的父组件进行重渲染时，可能会在 consumer 组件中触发意外的渲染

示例

```js
class App extends React.Component {
  render() {
    <Provider value={{something: 'some value'}}>
      <Toolbar />
    </Provider>
  }
}
```
当每一次Provider重新渲染时，provider下的所有 consumer 组件都会重新渲染，因为
value 属性总是被赋予新的对象。

为防止这种情况，将value状态提升到父节点的 state 里。

```js
class App extends React.Component {
  state = {
    value: {something: 'some value'}
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    )
  }
}
```

## 在嵌套组件中更新 Context

从一个组件树中嵌套很深的组件中更新 context 是很必要的，你可以通过
context 传递一个函数，使得consumers组件更新context。

`theme-context.js`
```js
// 确保传递给 createContext 的默认值数据结构时调用组件 consumer 所能匹配的
export default ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
})
```

`theme-toggle-button.js`
```js
import { ThemeContext } from './theme-context';

function ThemeToggleButton() {
  return (
    <ThemeContext.Consumer>
      {
        ({theme, toggleTheme}) => (
          <button
            onClick={toggleTheme}
            style={{backgroundColor: theme.background}}
          >
            Toggle Theme
          </button>
        )
      }
    </ThemeContext.Consumer>
  )
}
export default ThemeToggleButton;
```

`app.js`
```js
import { ThemeContext, themes } from './theme-context';
import ThemeToggleButton from './theme-toggle-button';

class App extends React.Component {
  this.state = {
    context: {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    }
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.context}>
        <Content />>
      </ThemeContext.Provider>
    )
  }
}

function Content() {
  return (
    <div>
      <ThemeToggleButton />
    </div>
  )
}

ReactDOM.render(<App />, document.root)
```
