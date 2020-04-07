
## forceUpdate

```js
this.forceUpdate(callback)
// or
// component 可以通过 ref 获得
component.forceUpdate(callback)
```

默认情况下，当组件的state或props发生变化时，组件将重新渲染，如果render()方法依赖
于其他数据，则可以调用forceUpdate()强制让组件重新渲染。

调用forceUpdate()将致使组件调用render()方法，此操作会跳过该组件的shouldComponentUpdate(),
但其子组件会触发正常的生命周期方法，包括shouldComponentUpdate()方法，如果state或props发生变化，
React仍将只更新DOM。

通常你应该避免使用forceUpdate()。