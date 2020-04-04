
## 使用 Effect Hook

数据获取，设置订阅以及手动更改React组件中的DOM都属于副作用，Effect Hook
可以让你在函数组件中执行副作用操作，如果你熟悉React class 的生命周期函数，
useeEffect Hook看做componentDidMount，componentDidUpdate和componentWillUnmount
这三个函数的组合

```js
import React, {  } from 'react';

function Example() {
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```
通过使用这个Hook，你可以告诉React组件需要在渲染后执行某些操作，React会保存你传递的函数
（我们将它称之为effect），并且在执行DOM更新之后调用它，在这effect中我们设置了document
的title属性，不过我们也可以执行苏剧获取或调用其他命令式API

**为什么在组件内部调用useEffect**将useEffect放在组件内部让我们可以在effect中直接访问
state变量（或其他props），我们不需要特殊的API来读取它，它已经保存在函数作用域中，Hook使用
了JavaScript的闭包机制。

**useEffect会在每次渲染后都执行**，React保证了每次运行effect的同时，DOM都已经更新完毕。

经验丰富的JavaScript开发人员可能会注意到，传递给useEffect的函数在每次渲染中都会有所不同，
这是刻意为之的，事实上这正是我们可以在effect中获取最新的 count 的值，而不用担心其过期的原因。
每次我们重新渲染，都会生成新的effect，替换掉之前的，某种意义上讲effect更像是渲染结果的一部分，
与componentDidMount或componentDidUpdate不同，使用useEffect调度effect不会阻塞浏览器更新
屏幕，这让你的应用看起来响应更快


在React组件中有两种常见副作用操作，需要清除的和不需要清除的

无须清除的effect
有时候我们只想在React更新DOM之后运行一些额外的代码，比如发送网络请求，手动变更DOM,
记录日志，这些都是常见的无须清除的操作，因为在执行完这些操作之后就可以忽略他们了。

需要清除的effect
还有一些副作用是需要清除的，例如订阅外部数据愿，这种情况下，清除工作是非常重要的，以防止
引起内存泄露

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)

    // Specify how to clean up after this effect
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```
**为什么要在effect中返回一个函数**，这是effect可选的清除机制，每个effect都可以返回一个清除
函数，此次可以将添加和移除逻辑放在一起，它们都属于effect的一部分。

**每次更新的时候都要运行Effect**

**React何时清除effect**，React会在每次执行当前effect之前对上一个effect进行清除

并不是必须为effect中返回的函数命名，这里我们将其命名为cleanup是为了表明此函数的目的，其实也可以返回一个箭头函数
或者给起一个别的名字

### 使用多个Effect

```js
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  const [isOnline, setIsOnline] = useState(null)
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })
}
```
Hook 允许我们按照代码的用途分离它们，而不是像生命周期那样，React将按照effect声明
的顺序以此调用组件中的每一个effect。

### 通过跳过Effect进行性能优化

在某些情况下，每次渲染后都执行清理或着执行effect可能导致性能问题，在class组件中我们
可以通过在componentDidUpdate中加添对prevProps或prevState的比较逻辑解决。

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`
  }
}
```

这是很常见的需求，所以它被内置到了 useEffect 的Hook API中，如果某些特定值在两次重渲染
之间没有发生变化，你可以通知React跳过对effect的调用，只要传递数组作为useEffect的第二个
可选参数即可。

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在count更新时更新
```
如果数组中有多个元素，即使只有一个元素发生变化，React也会执行effect。

对于有清除操作的effect同样使用
```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
  }
}, [props.friend.id]) // 仅在props.friend.id 发生变化时，重新订阅
```

> **注意**
>
> 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在effect中使用
> 的变量，否则可能无法渲染最新的值
>
> 如果只想运行一次effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]），作为第二个参数
> 这就告诉React你的effect不依赖props和state中的任何值，所以它永远都不需要重复执行。
