
## useContext

接收一个context对象（React.createContext的返回值）并返回该context的当前值，
当前的context值由上层组件中距离当前组件最近的<MyContext.Provider>的value prop决定。

```js
const MyContext = React.createContext('the init value')
const value = useContext(MyContext)
```

当组件上层最近的 <MyContext.Provider>更新时，该Hook会触发重新渲染，并使用最新
传递给 MyContext provider的context值，即使祖先使用React.memo或shouldComponentUpdate，
也会在组件本身使用useContext时重新渲染。

useContext的参数必须是context对象本身

- 正确：useContext(MyContext)
- 错误：useContext(MyContext.Consumer)
- 错误：useContext(MyContext.Provider)

> **提示**
>
> 如果你在接触Hook前已经对context API 比较熟悉，那应该可以理解 useContext(MyContext)
> 相当于class组件中的 static contextType = MyContext 或 <MyContext.Consumer>
> useContext(MyContext)只是让你能够读取context的值以及订阅context的变化。你仍然需要在上层组件树使用 <MyContext.Provider>来为下层组件提供context。

```js
const themes = {
  light: {
    foreground: '#000',
    background: '#eee',
  },
  dark: {
    foreground: '#fff',
    background: '#222',
  }
}
const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContext)

  return (
    <button style={{background: theme.background, color: theme.foreground}}>
      I am styled by theme context!
    </button>
  )
}
```

[实例二十](./src/pages/test/TestTwenty.js)
