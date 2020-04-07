
## PureComponent

React.pureComponent 与 React.Component 很相似。两者的区别在于React.Component并未
实现shouldComponentUpdate()，而React.PureComponent中以浅层对比props和state的方式
来实现了该函数。

如果赋予React组件相同的props和state，render()函数会渲染相同的内容，那么在某些情况下使用
React.PureComponent可能提高性能。

> **注意**
> PureComponent中的shouldComponentUpdate()仅作对象的浅层比较。如果对象中包含复杂的数据
> 结构，则有可能因为无法检查深层的差别，产生错误的对比结果。仅在你的props和state较为简单时，才
> 使用PureComponent，或者在深层次数据结构发生变化时调用forceUpdate()来确保组件被正确地更新
> 你也可以考虑使用 immutable对象 加速嵌套数据的比较。
> PureComponent 与 [Immer](./Immer.md) 是比较搭配的选择
>
> 此外，PureComponent中的shouldComponentUpdate()将跳过所有子组件树的props更新。因此，请
> 确保所有子组件也都是"纯"的组件

PureComponent 只会在state和props的值修改时才会再次渲染
通过对state和props的key做浅比较(shallow comparison)来确定有没有变化

- 在PureComponent组件的render方法可以执行state,props改变后的操作
- 用memoization来帮助阻止非必要的过滤

在使用memoization时，请记住这些约束

- 大部分情况下，每个组件内部都要引入 memoized 方法，以免实例之间相互影响
- 一般情况下，我们会限制 memoization 帮助函数的缓存空间，以免内存泄漏，使用 memoize-one
只缓存最后一次的参数和结果。