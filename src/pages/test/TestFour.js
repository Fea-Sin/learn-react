import React from 'react';
import Child from '@/components/TestComponent/Child';

class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
      testFour: '父组件'
    }
    console.log('父组件 constructor')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('父组件 getDerivedStateFromProps')
    return null
  }

  componentDidMount() {
    console.log('父组件 componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('父组件 shouldComponentUpdate')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('父组件 getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('父组件 componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('父组件 componentWillUnmount')
  }

  render() {

    console.log('父组件 render')

    return (
      <div>
        <div>Test Four</div>
        <Child />
      </div>
    )
  }
}

export default App;