
## 自定义Hook

**通过自定义Hook可以将组件逻辑提取到可重用的函数中**

在React中有两种流行的方式来共享组件之间的状态逻辑，render props和高阶组件，
Hook可以在不增加组件的情况下解决相同的问题。

### 提取自定义Hook

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。
自定义Hook时一个函数，其名称以“use”开头，函数内部可以调用其他的Hook,
请确保只在自定义组件的顶层调用其他Hook。

```js
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline;
}
```

与React组件不同的是，自定义Hook不需要具有特殊的标识，我们可以自由的决定它的参数是什么，
以及它应该返回什么（如果需要的话），换句话说它就是一个正常的函数，但是它的名字始终
以use开头

### 使用自定义Hook

现在我们已经将 好友是否在线 这个逻辑提取到 useFriendStatus 的自定义Hook中，然后
就可以使用它了

```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)
  
  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li style={{color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  )
}
```

自定义Hook是一种遵循Hook设计的约定，而不是React的特性。自定义Hook必须以‘use’开头，
如果不遵循这种规范，React将无法自动检查你的Hook是否违反了Hook的规则。

在两个组件中使用相同的Hook会共享state吗？不会。
自定义Hook是一种重用**状态逻辑**的机制，所以每次使用自定义Hook时，其中的所有state和副作用
都时完全隔离的。

### 在多个Hook之间传递信息

由于Hook本身就是函数，因此我们可以在它们之间传递信息。

```js
const friendlist = [
  { id: 1, name: 'Phoebe'},
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
]

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID)

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  )
}
```