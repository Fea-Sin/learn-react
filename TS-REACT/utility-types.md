
## Utility Types

### 介绍

TypeScript 提供了几种 utility tyepes 帮助 common type transformations(转换)，这些 utilities
全局有效。


### Omit<T, K>

包含 T 中所有的属性，并将关于 K 的属性删除

```js
interfacr Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: true
}
```


