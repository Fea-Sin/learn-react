
## getSnapshotBeforeUpdate

getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到DOM节点）之前调用。它使得组件
能在发生更改之前从DOM中捕获一些信息（如，滚动位置）。此生命周期的任何返回值将作为参数
传递给 componentDidUpdate()

此用法并不常见，但它可能出现在UI处理中。

返回值snapshot的值（或null）

```js
getSnapshotBeforeUpdate(prevProps, prevState)
```

示例

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在list中添加新的items
    // 捕获滚动位置以便我们稍后调整滚动位置
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current
      return list.scrollHeight - list.scrollTop;
    }

    return null
  }

  compoentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们snapshot有值，说明我们刚刚添加了新的items
    // 调整滚动位置使得新的items不会将旧的items推出视图
    // 这里的snapshot是getSnapshotBeforeUpdate的返回值
    if (snapshot !== null) {
      const list = this.listRef.current
      list.scrollTop = list.scrollHeight - snapshot
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    )
  }
}
```