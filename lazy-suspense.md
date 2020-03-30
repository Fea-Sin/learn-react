
## 代码分割

### 打包

大多数React应用都会使用webpack,rollup,browserify这类的构建工具来打包文件。
打包是一个将文件引入合并到一个单独文件的过程，最终形成一个bundle，接着在页面上
引入bundle，整个应用一次性加载。

示例

```js
// app.js
import { add } from './math.js';
console.log( add(16, 30) )
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

打包后的文件
```js
function add(a, b) {
  return a + b;
}
console.log( add(16, 30) )
```
> **注意** ：最终你的打包文件看起来会和上面的例子区别很大。

### 代码分割

打包是个非常棒的技术，但随着你的应用增长，你的代码包也随之增长。尤其是在整合了
体积巨大的第三方库的情况下，你需要关注你的代码，以免因体积过大而导致加载时间过长。

为了避免搞出大体积的代码包，在前期思考对代码进行分割是不错的选择，代码分割是由
诸如webpack,rollup,browserify这类打包器支持的一项技术，能创建多个包并在运行
时动态加载。

对你的应用进行代码分割能帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用
性能，尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在
初始加载的时候减少所需加载的代码量。

### 动态import语法

在你的应用中引入代码分割的最佳方式是通过动态import()语法

使用之前
```js
import { add } from './math';
console.log( add(16, 30) )
```
使用之后
```js
import('./math').then(math => {
  console.log( math.add(16, 30) )
})
```

当webpack解析到该语法时，会自动进行代码分割。如果你使用 Create React App,
该功能已开箱即用。如果你自己配置webpack，可以阅读webpack关于[代码分割](https://webpack.docschina.org/guides/code-splitting/)的指南。

当使用Babel时，你要确保Babel能够解析动态import语法而不是将其进行转换，对于这一
要求你需要[babel-plugin-syntax-dynamic-improt](https://classic.yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import)插件

### React.lazy

React.lazy函数能让你像渲染常规组件一样动态引入组件

使用之前
```js
import OtherComponent from './OtherComponent';
```
使用之后
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

此代码会在组件首次渲染时，自动导入包含OtherComponent组件的包。

React.lazy接受一个函数，这个函数需要调用动态import()，它必须返回一个Promise，
该Promise需要resolve一个 default export 的React组件。

然后应在 Suspense 组件中渲染lazy组件，如此使得我们可以使用在等待加载lazy组件时做
优雅降级，如loading指示器等。

```js
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}
```
fallback属性接受任何在组件加载过程中你想展示的React元素。你可以将Suspense组件
置于懒加载组件之上的任何位置，你甚至可以用一个Suspense组件包裹多个懒加载组件。
```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <OtherComponent />
          <AnotherComponent />
        </div>
      </Suspense>
    </div>
  )
}
```

### 基于路由的代码分割

决定在哪里引入代码分割需要一些技巧，你需要确保选择的位置能够均匀地分割代码包
而不会影响用户体验

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
    </Suspense>
  </Router>
)
```

### 命名导出(Named Exports)

React.lazy 目前只支持默认导出(default exports)，如果你想引入使用命名导出的模块，
你可以创建一个中间模块，来重新导出为默认模块，这能保证tree shaking不会出错，并且不必
引入不需要的组件。
```js
// ManyComponents.js
export const MyComponent = /* ... */
export const MyUnusedComponent = /* ... */
```

```js
// MyComponent.js
export { MyComponent as default } from './ManyComponents';
```

```js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import('./MyComponent'));
```

> **注意**
>
> React.lazy 和 Suspense 技术还不支持服务端渲染。
