
## Portals 

Portals 提供了一种将子节点渲染到父组件以外的DOM节点的优秀的方案。

```js
ReactDOM.createPortal(child, container)
```
第一个参数child时任何可渲染的React子元素，例如一个元素、字符串或fragment
第二个参数container是一个DOM元素

通常来讲，当你从组件的render方法返回一个元素时，该元素将被挂载到DOM节点中离其最近的父节点

portal的典型用例是当父组件有 `overflow:hidden`或`z-index`样式时，但你需要子组件能够在视觉上
跳出其容器，如对话框、悬浮卡、提示框等

尽管portal可以被放置在DOM树中任何地方，但在任何其他方面，其行为和普通的React子节点行为一致，由于
portal仍存在于React树，且与DOM树中的位置无关，那么无论其子节点是否是portal，像context这样的功能
特性都是不变的。这包含事件冒泡，一个从portal内部触发的事件会一直冒泡至包含React树的祖先，即便这些元素
并不是DOM树中的祖先。

示例

```html
<html>
  <body>
    <div id='app-root'></div>
    <div id='modal-root'></div>
  </body>
</html>
```

```js
const appRoot = document.getElementById('app-root')
const modalRoot = document.getElementById('modal-root')

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount() {
    // 在Modal的所有子元素被挂载后
    // 这个portal元素会被嵌到DOM树中
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    )
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    clicks: 0
  }

  handleClick = () => {
    // 当子元素里的按钮被点击时
    // 这个将会被触发更新父元素的 state
    // 即使这个按钮在DOM中不是直接关联的后代
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks {this.state.clicks}</p>
        <Modal>
          <Child />
        </Modal>
      </div>
    )
  }
}

function Child() {
  return (
    <div>
      <button>Click</button>
    </div>
  )
}
```

[实例十九](../src/pages/test/TestNineteen.js)
