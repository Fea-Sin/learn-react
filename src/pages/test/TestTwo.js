import React from 'react';
import { connect } from 'dva';
import EmailInput from '@/components/TestComponent/EmailInput';
import { Button } from 'antd';

class App extends React.Component {

  handleClick = () => {
    console.log('更新数据')
    const { dispatch } = this.props
    dispatch({
      type: 'test/setTB',
      payload: {
        userEmail: '777@qq.com',
        userID: '777',
      }
    })
  }

  render() {
    return (
      <div>
        <div>Test Two</div>
        <EmailInput
          defaultEmail={this.props.test.exampleB.userEmail}
          key={this.props.test.exampleB.userID}
        />
        <div>
          <Button onClick={this.handleClick}>更新</Button>
        </div>
      </div>
    )
  }
}

export default connect(({ test }) => ({
  test
}))(App);