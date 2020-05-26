
## 旧的生命周期函数迁移

React 16.3 引入了新的生命周期方法，一些生命周期方法将在React 17 depreacte

下叙方法即将过期，在新代码中应避免使用

- componentWillUpdate()
- componentWillReceiveProps()

## 如何将 componentWillReceiveProps 用新的生命周期方法替代

我们先来看看 componentWillReceiveProps 如何工作的

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.someValue !== this.props.someValue) {
    // Perform some operation
    this.setState({someState: someValue})
    this.classMethod()
  }
}
```

我们比较 nextProps.someValue 与 this.props.someValue 的值，如果不同则执行
一些操作，调用classMethod()等，并将改变的值同步到 state。

### 用 getDerivedStateFromProps 来代替

```js
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.someValue !== prevState.someValue) {
    return { someState: nextProps.someValue }
  }
  else return null;
}

componentDidUpdate(prevProps, prevState) {
  if (prevProps.someValue !== this.props.someValue) {
    this.classMethod()
  }
}
```

getDerivedStateFromProps 是 static method，在实例初始化及组件接收到
新props时被调用，既然是 static method，getDerivedStateFromProps内无法
获取`this`，及调用class method。

> 可以对比 nextProps.someValue 与 this.props.someValue 的值，做业务处理
> 也可以，对比 nextProps.someValue 与 this.state.someValue 的值，
> 来执行操作

```js

static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.someValue !== prevState.someValue) {
    return {someValue: nextProps.someValue}
  }
  else return null
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.someValue !== this.state.someValue) {
    // Perform some operation
  }
}
```
