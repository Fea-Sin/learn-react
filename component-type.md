
## component type

如何写一个 TS React 组件

- 元素组件

- 函数组件

- class组件

## 元素组件

```js
import React from 'react';

export default (): React.ReactNode => (
  <div>
    <div>element ts react component</div>
  </div>
)
```

## 函数组件

```js
import React from 'react';

interface FunComponentProps = {

}

const FunComponent: React.FC<FunComponentProps> = ({
  children,
}) => {
  return (
    <div>
      <div>Fun TS React Component</div>
      <div>{children}</div>
    </div>
  )
}

```
