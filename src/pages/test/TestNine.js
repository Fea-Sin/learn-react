import React from 'react';
import logProps from '@/components/TestComponent/logProps';
import FancyButton from '@/components/TestComponent/FancyButton';

const LogFancyButton = logProps(FancyButton)

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.button = React.createRef()
  }
  componentDidMount() {
    console.log('this is loged forward ref', this.button.current)
  }
  
  render() {
    return (
      <div>
        <div>Test Nine</div>
        <LogFancyButton ref={this.button}>This is LogFancyButton</LogFancyButton>
      </div>
    )
  }
}