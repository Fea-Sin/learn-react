## Refs 转发

Ref 转发是一项将ref自动地通过组件传递到其一组件的技巧，对于大多数应用中的组件来说
这通常不是必须的，但其对某些组件，尤其是可重用的组件库是很有用的。

## 转发refs到DOM组件

```js
function FancyButton(props) {
  return (
    <Button className='fancyButton'>
      {props.children}
    </Button>
  )
}
```
React组件隐藏其实现细节，这很好，但对高可复用的组件来说可能不方便，这些组件倾向于
在整个应用中以一种类似常规DOM的方式被使用，并访问其DOM节点，对焦点管理等。

Ref转发是一个可选特性，其允许某些组件接收ref，并向下传递给子组件。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className='fancyButton'>
    {props.children}
  </button>
))
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.button = React.createRef();
  }

  <FancyButton ref={this.button}>Click me!</FancyButton>
}
```

> **注意**
> 第二个参数ref只在使用React.forwardRef定义组件组件时存在，常规函数和class组件不接收
> ref参数，且props中也不存在ref
>
> Ref转发不仅限于DOM组件，你也可以转发refs到class组件

[实例八](./src/pages/test/TestEight.js)

## 在高阶组件中转发refs

这个技巧对高阶组件(HOC)特别有用

```js
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props', prevProps)
      console.log('new props', this.props)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return LogProps;
}
```

上面的示例有一点需要注意，refs将不会透传下去，这是因为ref不是prop属性，就像key一样，
其被React进行了特殊处理。如果你对HOC添加ref，该ref将引用最外层的容器组件，而不是被
包裹的组件。

新运的是，我们可以使用React.forwardRef明确地将refs转发到内部的FancyButton组件。

```js
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props', prevProps)
      console.log('new props', this.props)
    }

    render() {
      const {forwardRef, ...rest} = this.props

      // 将自定义的prop属性forwardRef定义为ref
      return <Component ref={forwardRef} {...rest} />
    }
  }

  // 注意React.forwardRef回调的第二个参数 ref
  // 我们可以将其作为常规 prop 属性传递给 LogProps 例如 'forwardRef'
  // 然后它就可以被挂载到 LogProps 包裹的子组件上

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />
  })
}
```

[实例九](./src/pages/test/TestNine.js)
