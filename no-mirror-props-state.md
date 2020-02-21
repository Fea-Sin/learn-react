
## 为什么说props复制给state经常会产生bug

最常见的误解就是getDerivedStateFromProps和componentWillReceiveProps只会在
props改变时才会调用，实际上只要父级重新渲染时，这两个生命周期函数就会重新调用，
不管props有没有变化，所以，在这两个方法内直接复制props到state是不安全的，这样会导致
state没有正确渲染。

大部分使用派生state导致的问题，不外乎两个原因，1 直接复制props到state, 2 如果props和
state不一致就更新state。当一个派生state值也被setState方法更新时，这个值就不是一个单一来源的值了，
此时问题也会出现。

如果只是用来保存props或者和当前state比较之后不一致后更新state，那你的组件应该是太频繁更新了state。

## 建议的模式

- 完全可控的组件

- 有key的非可控组件

名词**受控**和**非受控**通常用来指代表单的inouts，但是也可以用来描述数据频繁更新的组件。
用props传入数据的话，组件可以被认为是**受控**（因为组件被父级传入的props控制），数据只保存
在组件内部的state的话，是**非受控**组件（因为外部没办法直接控制state）。

### 完全可控的组件

完全可控的组件是，从组件里删除state，这样我们就没必要担心它和state冲突。

示例

```js
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />
}
```
如果我们需要保存临时的值，则需要父组件手动执行保存这个动作。

### 有key的非受控组件

另外一个选择是让组件自己存储临时的email state，在这种情况下，组件仍然从props接收
‘初始值’，但是更改之后的值就和props没关系了。

示例

```js
  class EmailInput extends Reaact.Component {
    state = { email: this.props.defaultEmail }

    handleChange = event => {
      this.setState({ email: event.target.value })
    }

    render() {
      return <input onChange={this.handleChange} value={this.state.email} />
    }
  }
```

在这个组件中，为了在不同的页面切换不同的值，我们可以使用key这个特殊的React属性，当key变化时，
React会创建一个新的而不是更新一个既有的组件。key 一般用来渲染动态列表，但是这里可以使用。

```js
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```