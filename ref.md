

## Refs and the DOM

Refs 提供了一种方式，允许我们访问DOM节点或在render方法中创建的React元素

在典型的React数据流中，props是父组件与子组件交互的唯一方式。但是，在某些情况下，你需要在典型
数据流之外强制修改子组件，被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素，对于
这两种情况，React都提供了解决办法。

## 何时使用Refs

下面是几个合适使用refs的情况

- 管理焦点，文本选择或媒体播放
- 触发强制动画
- 集成第三方DOM库

避免使用refs来做可以通过声明式实现来完成的事情。

> **注意**
> 推荐使用React 16.3 版本引入的 React.createRef() API
> 如果你正在使用一个较早版本的React，推荐你使用 **回调形式的refs**

## 创建Refs

Refs是使用React.createRef()创建的，并通过ref属性附加到React元素，在构造组件时，
通常将Refs分配给实例属性，以便可以在整个组件中引用它们。
React会在组件挂载时给current属性传入值，并在组件卸载时传入null值，ref会在componentDidMount
或componentDidUpdate生命周期钩子触发前更新。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  render() {
    return <div ref={this.myRef} />
  }
}
```

当ref被传递给 render() 中的元素时，对该节点的饮用可以在ref的current属性中被访问。

```js
const node = this.myRef.current
```

ref的值根据节点类型而有所不同

- 当ref属性用于HTML元素时，构造函数中使用React.createRef()创建的ref接收底层DOM元素
作为其current属性

- 当ref属性用于自定义class组件时，ref对象接收组件的挂载实例作为其current属性

- 你不能在函数组件上使用ref属性，因为它们没有实例

## Refs 与函数组件

默认情况下，你不能在函数组件上使用ref属性，因为它们没有实例

```js
function MyFunctionComponent() {
  return <input />
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  render() {
    // This will not work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    )
  }
}
```

但是你可以**在函数组件内部使用ref属性**，只要它指向一个DOM元素或class组件

```js
function CustomTextInput(porps) {
  // 这里必须声明 textInput ，这样ref才可以饮用它
  let textInput = React.createRef();

  return (
    <div>
      <input type='text' ref={textInput} />
    </div>
  )
}
```

##将DOM Refs暴露给父组件

在极少情况下，你可能希望在父组件中引用子节点的DOM节点。通常不建议这样做，
因为会打破组件的封装，但它偶尔可以用于触发焦点或测量子DOM节点的大小和位置。

如果你使用 16.3 或更高版本React，这种情况一下我们推荐使用 [ref转发](./forwardRef.md)。
Ref转发使组件可以像暴露自己的ref一样暴露组件的ref。

如果你使用16.2或更低版本的React，或者你需要比ref转发更高的灵活性的 **回调Refs**

## 回调Refs


