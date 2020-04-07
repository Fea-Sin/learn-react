
## Hook 规则

- 只在最顶层使用 Hook

- 只在React的函数组件中调用 Hook，（在自定义Hook中调用其他Hook）

### 说明

我们在单个组件中使用多个State Hook 或 Effect Hook

```js
function Form() {
  // 1. Use the name state
  const [name, setName] = useState('Mary')

  // 2. Use an effect for persisting he form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name)
  })

  // 3. Use the surname state
  const [surname, setSurname] = useState('Poppins')

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname
  })
}
```

那么React 怎么知道哪个state对应哪个useState呢，答案是React靠的时Hook调用
的顺序，因为我们的示例中，Hook的调用顺序在每次渲染中都是相同的，所以它能够正常工作

```js
// ---------
// 首次渲染
// ---------
useState('Mary')        // 1. 使用Mary初始化变量名为name的state
useEffect(persisForm)   // 2. 添加 effect 以保存 form 操作
useState('Poppins')     // 3. 使用Poppins初始化变量名为surname的state
useEffect(updateTitle)  // 4. 添加effect以更新标题

// ---------
// 二次渲染
// ---------
useState('Mary')        // 1. 读取变量名为name 的state(参数被忽略)
useEffect(persisForm)   // 2. 替换保存form 的effect
useState('Poppins')     // 3. 读取变量名为 surname的state(参数被忽略)
useEffect(updateTitle)  // 4. 替换更新标题effect
```

只要Hook的调用顺序在多次渲染之间保持一致，React就能正确地将内部state和对应的
Hook进行关联

```js
// 🔴 在条件语句中使用 Hook 违反第一条规则
if (name !== '') {
  useEffect(function persistForm() {
    localStorage.setItem('formData', name)
  })
}
```
在第一次渲染中 name !== ''，这个条件值为true，所以我们会执行这个Hook。但是下一次
渲染时我们可能清空了表单，表达式值变为false，此时的渲染会跳过该Hook，Hook的调用顺序
发生了改变
```js
useState('Mary')            // 1. 读取变量名name的state(参数忽略)
// useEffect(persistForm)   // 此Hook被忽略
useState('Poppins')         // 2 (之前为3) 读取变量名 surname 的state失败
useEffect(updateTitle)      // 3 (之前为4) 替换新标题失败
```
React 不知道第二个useState的Hook应该返回什么，从这里开始，后面的Hook调用都被提前执行，
导致bug产生。
**这就是为什么Hook需要在我们组件的最顶层调用**

如果我们想要有条件地执行一个effect，可以将判断放到Hook内部

```js
useEffect(function persistForm{
  // 将条件判断放在effect中
  if (name !== '') {
    localStorage.setItem('formData', name)
  }
})
```