
## getDerivedStateFromProps

getDerivedStateFromProps 会在调用render()方法之前调用，并且在初始挂载及后续更新时
都会被调用。
它应该返回一个对象来更新state，如果返回null则不更新任何内容。

getDerivedStateFromProps 的存在只有一个目的，让组件在props变化时更新state.

## 异步渲染更新

React团队一直致力于实现异步渲染，

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

这些过时的组件生命周期往往带来不安全的编码实践，这些生命周期方法经常被误用和滥用，
这里的不安全，表示使用这些生命周期的代码在React的未来版本中更有可能出现bug.

static getDerivedStateFromProps方法用于替换原来的componentWillReceiveProps.

## 如何使用

Before

```js
class Example extends React.Component {
  state = {
    derivedData: computeDerivedState(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.someValue !== nextProps.someValue) {
      this.setState({
        derivedData: computeDerivedState(nextProps)
      })
    }
  }
}
```

After

```js
class Example extends React.component {

  // Initialize state in constructor
  // Or with a property initializer
  state = {}

  static getDerivedStateStateFromProps(nextProps, prevState) {
    if (preState.someMirroredValue !== nextProps.someValue) {
      return {
        derivedData: computeDerivedState(nextProps),
        someMirroredValue: nextProps.someValue
      }
    }

    // Return null to indicate no change to state
    return null;
  }
}
```

Another

```js
static getDerivedStateFromProps(nextProps, prevState) {
  return nextProps.someValue === prevState.someValue
    ? null
    : { someValue: nextProps.someValue }
}
```