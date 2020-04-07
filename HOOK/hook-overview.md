
## Hook 概览

> Hook 是React 16.8 新增特性，它可以让你在不编写class的情况下使用state
> 及其他的React特性

### 什么是Hook

Hook 是一些可以让你在函数组件里钩入React state 及生命周期等特性的函数，
Hook不能在class组件中使用，React内置了一些像useState这样的Hook，你也可以创建
你自己的Hook来复用不同组件之间的状态逻辑。

### State Hook

这个例子用来显示一个计数器，当你点击，计数器的值会增加
```js
import React, { useState } from 'react';

function Example() {
  // 声明一个 count 的state变量
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>You clicked {count} tiems</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```
这里的useState就是一个Hook，通过在函数组件里调用它来给组件
内部添加一些内部state，React会在重复渲染时保留这个state，useState会返回
一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方
调用这个函数。useState 唯一的参数就是初始state，这里的state不一定是一个
对象，这个初始state参数只有第一次渲染时会被用到。

### 声明多个state变量

```js
function ExampleWithManyStates() {
  const [age, setAge] = useState(42)
  const [fruit, setFruit] = useState('banana')
  const [todos, setTodos] = useState([{text: 'Learn Hooks'}])
}
```

### Hook 使用规则

Hook 就是JavaScript函数，但是使用它们会有两个额外的规则

- 只能在函数最外层调用Hook，不要在循环、条件判断或者子函数中调用

- 只能在React的函数组件中调用Hook，不要在其他JavaScript函数中调用，还有一个地方可以调用Hook
就是自定义Hook中。
