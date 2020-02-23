
## lifecycle-order

以 React.Component 测试

## 父组件单独渲染

生命周期函数顺序

挂载时

- 父组件 constructor
- 父组件 getDerivedStateFromProps
- 父组件 render
- 父组件 componentDidMount

state props 更新时

- 父组件 getDerivedStateFromProps
- 父组件 shouldComponentUpdate
- 父组件 render
- 父组件 getSnapshotBeforeUpdate
- 父组件 componentDidUpdate

卸载时

- 父组件 componentWillUnmount

## 父组件与子组件渲染

- 父组件 constructor
- 父组件 getDerivedStateFromProps
- 父组件 render
- 子组件 constructor
- 子组件 getDerivedStateFromProps
- 子组件 render
- 子组件 componentDidMount
- 父组件 componentDidMount

- 父组件 getDerivedStateFromProps
- 父组件 shouldComponentUpdate
- 父组件 render
- 子组件 getDerivedStateFromProps
- 子组件 shouldComponentUpdate
- 子组件 render
- 子组件 getSnapshotBeforeUpdate
- 父组件 getSnapshotBeforeUpdate
- 子组件 componentDidUpdate
- 父组件 componentDidUpdate

- 父组件 componentWillUnmount
- 子组件 componentWillUnmount


## 父组件 子组件 孙组件同时渲染

- 父组件 constructor
- 父组件 getDerivedStateFromProps
- 父组件 render
- 子组件 constructor
- 子组件 getDerivedStateFromProps
- 子组件 render
- 孙组件 constructor
- 孙组件 getDerivedStateFromProps
- 孙组件 render
- 孙组件 componentDidMount
- 子组件 componentDidMount
- 父组件 componentDidMount

- 父组件 getDerivedStateFromProps
- 父组件 shouldComponentUpdate
- 父组件 render
- 子组件 getDerivedStateFromProps
- 子组件 shouldComponentUpdate
- 子组件 render
- 孙组件 getDerivedStateFromProps
- 孙组件 shouldComponentUpdate
- 孙组件 render
- 孙组件 getSnapshotBeforeUpdate
- 子组件 getSnapshotBeforeUpdate
- 父组件 getSnapshotBeforeUpdate
- 孙组件 componentDidUpdate
- 子组件 componentDidUpdate
- 父组件 componentDidUpdate

- 父组件 componentWillUnmount
- 子组件 componentWillUnmount
- 孙组件 componentWillUnmount


[实例四](./src/pages/test/TestFour.js)