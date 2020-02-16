import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

class Example extends React.Component {

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('每次渲染都会执行')
    console.log('nextProps', nextProps.test.exampleA)
    console.log('prevState', prevState)
    return nextProps.test.exampleA === prevState.exampleA
      ? null
      : { exampleA: nextProps.test.exampleA }
  }

  handleClick = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'test/fetchTA'
    })
  }

  render() {
    return (
      <div>
        <div>hello world</div>
        <div>{this.state.exampleA}</div>
        <div><Button onClick={this.handleClick}>获取数据</Button></div>
      </div>
    )
  }
}

export default connect(({ test }) => ({
  test
}))(Example);