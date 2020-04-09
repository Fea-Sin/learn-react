
## useRef

```js
import React, { useRef } from 'react';

const refContainer = useRef('initialValue');
```

useRef 返回一个可变的ref对象，其current属性被初始化为传入的参数（initialValue），
返回的ref对象在组件的整个生命周期内保持不变。

一个常见的用例便是命令式地访问子组件
```js
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    inputEl.current.focus()
  }
  
  return (
    <div>
      <div><input ref={inputEl} type='text' /></div>
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  )
}
```
