
## memoization

仅在输入变化时，重新计算render需要的值，这个技术叫做 memoization

这里有个示例，组件使用一个prop，一个列表，并在用户输入查询条件时显示匹配的项

```js
// PureComponents 只会在state或者prop的值修改时才会再次渲染
class Example extends PureComponent {
  // state 只需要保存 filter的值
  state = {
    filterText: ''
  }
  handleChange = event => {
    this.setState({
      this.setState({
        filterText: event.target.value
      })
    })
  }

  render() {
    // PureComponent 的 render 只有
    // 在 props.list 或者 state.filterText 变化时才会调用
    const filteredList = this.props.list.filter(
      item => item.text.includes(this.state.filterText)
    )

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {
            filteredList.map(item => <li key={item.id}>{item.text}</li>)
          }
        </ul>
      </Fragment>
    )
  }
}
```