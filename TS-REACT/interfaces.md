
## 对象的类型 - 接口

在 TypeScript 中，我们使用接口(interface)来定义对象的类型。


## 什么是接口

在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要
由class去实现(implement)

TypeScript中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象意外，
也常用用于对 对象的形状(shape) 进行描述。接口一般首字母大写

## 简单的例子

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```
