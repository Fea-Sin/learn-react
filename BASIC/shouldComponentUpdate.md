
## shouldComponentUpdate

React构建并维护了一套内部的UI渲染描述，它包含了来自你的组件返回的React元素，该
描述使得React避免创建DOM节点以及没有必要的节点访问，因为DOM操作相对于JavaScript
对象操作更慢，虽然有时候它被称为"虚拟DOM"，但是它在React Native中拥有相同的工作原理。

当一个组件的props或state变更，React会将最新返回的元素与之前渲染的元素进行比较，以此
决定是否有必要更新真实的DOM，当它们不同时，React会更新该DOM。

即使React只更新改变了DOM节点，重新渲染仍然话费一些时间，在大部分情况下它并不是问题，不过
如果它已经慢到让人注意了，你可以通过**覆盖生命周期方法shouldComponentUpdate**来进行提速。
该方法会在重新渲染前被触发。

根据shouldComponentUpdate()返回值，判断React组件的输出是否受当前state或props
更改的影响。默认行为是state或props每次发生变化组件都会重新渲染。大部分情况下，你应该
遵循默认行为。

```js
shouldComponentUpdate(nextProps, nextState)
```

当props或state发生变化时（实际情况要频繁的多，只要父组件重新渲染就会调用），shouldComponentUpdate()
会在渲染执行之前被调用，返回默认值为true。**首次渲染或使用forceUpdate()时不会调用该方法**

此方法仅作为性能优化的方式而存在，不要企图依靠此方法来阻止渲染，因为这可能会产生bug,

如果你一定要手动编写此函数，可以将this.props与nextProps以及this.state与nextState
进行比较，并返回false以告知React可以跳过更新。请注意，返回false并不会阻止子组件在state更新
时重新渲染。

我们不建议在shouldComponentUpdate()中进行深层次比较或使用JSON.stringfy()这样非常影响效率，
且会损害性能。

目前，如果shouldComponentUpdate()返回false，则不会调用 UNSAFE_componentWillUpdate(),
render()和componentDidUpdate()。

## 大部分情况，PureComponent代替手写shouldComponentUpdate生命周期方法

继承 React.PureComponent 以代替手写shouldComponentUpdate，它用当前与之前props和state
的浅比较覆写了shouldComponentUpdate()的实现。

示例

如果你的组件只有当props.color或者state.count的值改变才需要更新

```js
class CountButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 1 }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}
      >
        Count: {this.state.count}
      </button>
    )
  }
}

```

这段代码中，shouldComponentUpdate仅检查了props.color或state.count是否改变
如果这些值没有改变，那么这个组件不会更新。

如果你的组件更复杂一些，你可以使用类似"浅比较"的模式来检查props和state中所有字段，
以此来决定组件是否需要更新。React已经提供了一位好帮手帮你实现这种常见的模式，你只要
继承React.PureComponent就行了。
所以这段代码可以改成如下这种更简洁的形式

```js
class CountButton extends React.PureComponet {
  constructor(props) {
    super(props)
    this.state = { count: 1 }
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}
      >
        Count: {this.state.count}
      </button>
    )
  }
}
```

## 使用PureComponent时要注意的问题

PureCompoent只进行浅比较，所以当props或者state某种程度是**可变的**话，
浅比较会有遗漏，当数据结构很复杂时，情况也会变得麻烦。

示例

```js
class ListOfWorlds extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>
  }
}

class WordAdder extends React.Componet {
  constructor(props) {
    super(props)
    this.state = {
      words: ['marklar']
    }
  }

  handleClick = () => {
    // 这部分代码很糟
    let words = this.state.words
    words.push('marklar')
    this.setState({
      words: words
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}></button>
        <ListOfWords words={this.state.words} />
      </div>
    )
  }
}
```

Component 没有问题，但PureComponent 会有问题

[实例五](../src/pages/test/TestFive.js)


## 不可变数据的力量

避免该问题最简单的方式是避免更改你正用于 props 或 state 的值，因为这些数据都是
引用数据类型。

ES6 数组支持扩展运算符，这让代码写起来很方便

```js
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar']
  }))
}
```

如果你想改变一个对象的值，例如，我们希望将 colormap.right 设置为 'blue'

```js
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```

为了不改变原本的对象，我们可以使用Object.asssign方法
```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```
现在 updateColorMap返回了一个新对象，而不是修改老对象。

也可以使用对象扩展
```js
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```

当处理深层嵌套对象时，请参阅 [Immer](./Immer.md)



