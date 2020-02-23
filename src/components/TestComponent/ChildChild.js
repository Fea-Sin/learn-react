import React from 'react';

class ChildChild extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      child: '孙组件'
    }
    console.log('孙组件 constructor')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('孙组件 getDerivedStateFromProps')
    return null
  }

  componentDidMount() {
    console.log('孙组件 componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('孙组件 shouldComponentUpdate')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('孙组件 getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('孙组件 componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('孙组件 componentWillUnmount')
  }


  render() {

    console.log('孙组件 render')

    return (
      <div>Child Child</div>
    )
  }
}

export default ChildChild;