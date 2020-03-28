## render prop

术语 render prop 是指一种在React组件之间 使用一个变量函数 的prop共享代码的简单技术

具有render prop的组件接收一个函数，该函数返回一个React元素并调用它，而不是
实现自己的渲染逻辑

```js
  <DataProvider render={data => (
    <h1>Hello {data.target}</h1>
  )}>
```
使用 render-porp 的典型案例 路由库 等。

## 使用render-prop来解决横切关注点

组件是React代码本身的主要单元，但如何共享一个组件的 状态或行为 不是很容易。

以下组件共享应用程序中的鼠标位置
```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse

    return (
      <img src='/cat.jpg' style={{position: 'absolute', left: mouse.x, top: mouse.y}} />
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

```

现在，我们提供了一个render方法让<Mouse>能动态决定需要渲染什么，而不是克隆
<Mouse>组件然乎硬编码来解决特定的用例。

> 任何使用函数prop动态渲染的技术都被称为 render-prop
> 尽管之前的示例使用了render，我们也可以简单地使用 children prop!

```js
<Mouse children={mouse => (
  <p>鼠标的位置是 {mouse.x}, {mouse.y}</p>
)}>
```

children prop 不一定真正需要添加到jsx元素的属性列表中，你可以直接放置到
元素内部

```js
<Mouse>
  {mouse => (
    <p>鼠标的位置是 {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

## 注意事项

将 render-prop 与React.PureComponent一起使用时要小心
如果您在render方法里创建函数，那么使用render-prop会将使用React.PureComponent带来的
优势去掉，因为浅比较props的时候总会得到false

```js
class MouseTracker extends React.Component {
  render() {
    return (
      // 这是不好的
      // 每个渲染 render prop的值将会是不同的
      <div>
        <Mouse render={mouse => (
          <Cat mouse={mouse}>
        )} />
      </div>
    )
  }
}
```

为了绕过这个问题，你可以定义一个实例方法作为prop
```js
class MouseTracker extends React.Compoent {
  renderTheCat = (mouse) => {
    return <Cat mouse={mouse}>
  }

  render() {
    return (
      <div>
        <Mouse render={this.renderTheCat} />
      </div>
    )
  }
}
```
