
## Immer

Immer(德语：永远)是一个很小的程序包，它使您可以方便地处理不可变状态
基本思想是，您将所有更改都应用于一个临时的draftState，该状态是currentState的代理。一旦完成所有
突变，Immer将基于draftState突变到nextState，这意味着您可以通过简单地修改数据而与数据进行交互，
同时保留不可变数据的所有有点。

Current  =immer=>  Draft  =immer=>  Next

使用Immer就像有个私人助理，他拿了一封信（当前状态）并给您了一份副本（草稿）以将更改记入。完成后，
并为您生成真正不变的一封信（下一个状态）。

快速范例

```js
import produce from 'immer';
const baseState = [
  {
    todo: 'Learn typescript',
    done: true
  },
  {
    todo: 'Try immer',
    done: false
  }
]

const nextState = produce(baseState, draftState => {
  draftState.push({todo: 'tweet about it'})
  dreftState[1].done = true
})
```

## React setState example

Deep updates in the state of React components can be greatly simplified as well
by using immer.

```js
import produce from 'immer';

state = {
  user: {
    name: 'Michel',
    age: 33,
  }
}
/**
 * Classic React.setState with a deep merge
 */
handleClick1 = () => {
  this.setState(state => ({
    user: {
      ...state.user,
      age: state.user.age + 1
    }
  }))
}

/**
 * Produce the next state before passing it to setState
 */
handleClick2 = () => {
  this.setState(
    produce(this.state, draft => {
      draft.user.age += 1
    })
  )
}

/**
 * Since setState accepts functions,
 * we can just create curried producer
 */
handleClick3 = () => {
  this.setState(
    produce(draft => {
      draft.user.age += 1
    })
  )
}

```


[实例六](../src/pages/test/TestSix.js)

## 片段数据

```js
const state = {
  x: 0
}

const nextState = produce(state, draft => {
  draft.x = draft.x + 1;
})
```
