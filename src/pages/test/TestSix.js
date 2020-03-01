import React from 'react';
import produce from 'immer';



export default class App extends React.Component {

  componentDidMount() {
    const todos = [{
      todo: 'Learn typescript',
      done: true
    }, {
      todo: 'Try immer',
      done: false
    }]
    
    const nextTodos = produce(todos, draft => {
      draft.push({todo: 'Tweet about it', done: false})
      draft[1].done = true
    })


    // old state is unmodified
    console.log('old state is unmodified', todos.length)
    console.log('old state is unmodified', todos[1].done)

    // new state reflects the draft
    console.log('new state reflects the draft', nextTodos.length)
    console.log('new state reflects the draft', nextTodos[1].done)

    // structural sharing
    console.log('structual shsaring', todos === nextTodos)
    console.log('structual shsaring', todos[0] === nextTodos[0])
    console.log('structual shsaring', todos[1] === nextTodos[1])


  }
  render() {
    return (
      <div>
        <div>Immer</div>
      </div>
    )
  }
}