
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

当使用Component 时，过滤列表很大时，render 函数会重复渲染，我们可以添加 memoization 帮组函数来优化

```js
import memoize from "memoize-one";

class Example extends Component {
  // state 只需要保存当前的 filter 值：
  state = { filterText: "" };

  // 在 list 或者 filter 变化时，重新运行 filter：
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  );

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // 计算最新的过滤后的 list。
    // 如果和上次 render 参数一样，`memoize-one` 会重复使用上一次的值。
    const filteredList = this.filter(this.props.list, this.state.filterText);

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```