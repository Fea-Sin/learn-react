import React from 'react';
import ChildChild from '@/components/TestComponent/ChildChild';

class Child extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      child: '子组件'
    }
    console.log('子组件 constructor')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('子组件 getDerivedStateFromProps')
    return null
  }

  componentDidMount() {
    console.log('子组件 componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('子组件 shouldComponentUpdate')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('子组件 getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('子组件 componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('子组件 componentWillUnmount')
  }

  render() {

    console.log('子组件 render')

    return (
      <div>
        <div>Child</div>
        <ChildChild />
      </div>
    )
  }
}

export default Child;