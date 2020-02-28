
## Immer

Immer(德语：永远)是一个很小的程序包，它使您可以方便地处理不可变状态
基本思想是，您将所有更改都应用于一个临时的draftState，该状态是currentState的代理。一旦完成所有
突变，Immer将基于draftState突变到nextState，这意味着您可以通过简单地修改数据而与数据进行交互，
同时保留不可变数据的所有有点。

Current  =immer=>  Draft  =immer=>  Next

快速范例

```js
import produce from 'immer';
const baseState = [
  {
    todo: 'Learn typescript',
    done: true
  },
]
```


[实例六]()