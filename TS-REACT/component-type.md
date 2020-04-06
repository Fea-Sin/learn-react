
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

## class 组件

```js
import React from 'react';

export interface HeadViewProps {
  isMobile?: boolean;
  logo?: React.ReactNode;
}

class HeadView extends React.Component<HeadViewProps> {

  render() {
    const {
      isMobile,
      logo,
    } = this.props
    

    return (
      <div>
        <div>This is HeadView</div>
        {logo && <div>logo</div>}
        <div>是否时移动端：{isMobile ? '是' : '否'}</div>
        
      </div>
    )
  }
}

export default HeadView
```


## type 类型

- React.ReactNode

- React.ComponentClass

- React.FunctionComponent

- React.FC<TestProps>

- React.SFC<TestProps> stateless 无状态组件
