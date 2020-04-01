
## 错误边界

组件内的JavaScript错误会导致React的内部状态被破坏，并且在下一次
渲染时产生可能无法追踪的错误，这些错误基本上是由其他代码（非React组件代码）
错误引起的，但React并没有提供一种在组件中优雅处理这些错误的方式，也无法从
错误中恢复。

部分UI的JavaScript错误不应该导致整个应用崩溃，为了解决这个问题，React16引入
了一个新的概念 - 错误边界

### 如何定义一个错误边界组件

如果一个class组件中定义了 static getDerivedStateFromError() 或者
componentDidCatch()这两个生命周期方法中的任意一个（或两个）时，那么它
就变成一个错误边界组件，当抛出错误后，可以使用 static getDerivedStateFromError()
渲染备用UI，使用 componentDidCatch() 打印错误信息。

```js
class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>
    }
    return this.props.children;
  }
}
```
然后你可以将它作为一个常规组件去使用
```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
> **注意**
>
> 只有它包裹的**子组件**出现报错，才会捕获。如果是children元素出现报错并不能捕获(亲测如  此)

错误边界的工作方式类似于JavaScript的 catch{}，不同的地方在于错误边界
只针对React组件，只有class组件才可以成为错误边界组件大多数情况下，你只需要
声明一次错误边界组件，并在整个应用中使用它。

注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误，如果一个错误边界
无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于JavaScript中
catch{} 的工作机制。

### 错误边界应该放置在哪？

错误边界的粒度由你来决定，可以将其包装在最顶层的路由组件并为用户展示一个“Something
went wrong”的错误信息，就像服务端框架经常处理崩溃一样，你也可以将单独的部件包装在错误
边界以保护应用其他部分不崩溃。

## 关于 try/catch

try/catch 很棒，但它仅能用于命令行代码
```js
try {
  showButton();
} catch (error) {
  // ...
}
```
然而，React组件是声明式的并具体指出什么需要被渲染，错误边界组件可以
捕获到声明式代码错误。

> **注意**
>
> 错误边界无法捕获以下场景产生的错误
> 
> - 事件处理
> - 异步代码（例如 setTimeout 或 requestAnimationFrame 回掉函数）
> - 服务端渲染
> - 它自身抛出的错误（并非它的子组件）

### 关于事件处理器

错误边界无法捕获事件处理器内部的错误。
React不需要错误边界来捕获事件处理器中的错误，与render方法和生命周期方法不同，
事件处理器不会在渲染期间触发，因此，如果它们抛出异常，React仍然能够知道需要在屏幕
上显示什么。
如果你需要在事件处理器内部捕获错误，使用普通的JavaScript try/catch 语句

```js
class MyComponent extends React.Component {
  state = {
    error: null
  }
  handleClick = () => {
    try {
      // 执行操作，如果有错误抛出
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  render () {
    if (this.state.error) {
      return <h1>Caught an error</h1>
    }
    return <button onClick={this.handleClick}>Click me</button>
  }
}
```

