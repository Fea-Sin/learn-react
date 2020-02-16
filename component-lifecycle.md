
## component lifecycle

## 挂载

当组件实例被创建并插入DOM中时，其生命周期顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

## 更新

当组件的props或state发生变化时会触发更新。组件更新的生命周期调用顺序如下

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

> 注意
> 下述方法即将过期，在新代码中应该避免使用它们
> - componentWillUpdate()
> - componentWillReceiveProps()

## 卸载

当组件从DOM中移除时会调用如下方法

- componentWillUnmount()

## 错误处理

当渲染过程中，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法

- static getDerivedStateFromError()
- componentDidCatch()





























