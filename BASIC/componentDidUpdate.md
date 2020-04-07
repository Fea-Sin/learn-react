## componentDidUpdate

componentDidUpdate() 会在更新后被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对DOM进行操作。如果你对更新后的props进行了比较，也可以选择在此处进行网络
请求。（如，当props未发生变化时，则不会执行网络请求）

例如：

```js
componentDidUpdate(prevProps) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID)
  }
}
```

组件何时会触发更新？

- New props
- setState()
- forceUpdate()

你也可以在componentDidUpdate()中直接调用setState()，但请注意**它必须被包裹在一个条件语句中**，
正如上述例子中那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件
性能。

不要将props镜像给state，请考虑直接使用props。

如果组件实现了 getSnapshotBeforeUpdate 生命周期，则它的返回值将作为componentDidUpdate()的第三
个参数，否则此参数将为undefined。

> 注意
> 如果 shouldComponentUpdate()返回值为false，则不会调用componentDidUpdate()。

[为什么props复制给state会产生bug](./no-mirror-props-state.md)