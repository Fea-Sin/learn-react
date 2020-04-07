
## 组件

组件，从概念上类似于 JavaScript 函数，它接收任意的入参(props)，并返回用于描述页面展示
内容的React元素。

## 函数组件

定义组件最简单的方式就是编写 JavaScript 函数

```js
function Welcome(props) {
  return <h1>hello, {props.name}</h1>
}
```
该函数是一个React组件，因为它接收唯一props对象并返回一个React元素。
它本质上就是 JavaScript 函数。

## 用 ES6 的 class 来定义组件

```js
class Welcome extends React.Component {
  render() {
    return <h1>hello, {this.props.name}</h1>
  }
}
```

> **注意：组件的名称必须以大写字母开头**
>
> React 会将以小写字母开头的组件视为原生DOM标签，例如，<div /> 代表HTML的div标签，
> 而 <Welcome /> 则代表一个组件，并且需要在作用域内使用。

## 渲染组件

React 元素可以时DOM标签

```js
const element = <div />
```

React元素也可以是用户自定义的组件

```js
const element = <Welcome name='feasin' />
```

渲染组件

```js
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

上面例子中发生了什么

- 我们调用 ReactDOM.render() 函数，并传入 <Welcome name='feasin' /> 作为参数
- React 调用 Welcome 组件，并将 { name: 'feasin' } 作为props传入
- Welcome 组件将 `<h1>hello, feasin</h1>`元素作为返回值
- ReactDOM 将 DOM 高效地更新为 `<h1>hello, feasin</h1>`