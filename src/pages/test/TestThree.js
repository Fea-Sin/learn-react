import React from 'react';
import EmailInput from '@/components/TestComponent/EmailInputTwo';
import { Button } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.emailRef = React.createRef();
  }

  componentDidMount() {
    console.log('ref----', this.emailRef.current)
    // console.log('ref function---', this.emailRef.current.resetEmailForNewUser)
  }

  handleClick = () => {
    this.emailRef.current.resetEmailForNewUser('888@qq.com')
  }

  render() {
    return (
      <div>
        <div>Test Three</div>
        <EmailInput
          defaultEmail={'123@qq.com'}
          ref={this.emailRef}
        />
        <div>
          <Button onClick={this.handleClick}>更新</Button>
        </div>
      </div>
    )
  }
}

export default App;