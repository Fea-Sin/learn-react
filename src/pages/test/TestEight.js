import React from 'react';
import FancyButton from '@/components/TestComponent/FancyButton';
import FancyButtonClass from '@/components/TestComponent/FancyButtonClass';

export default class Example extends React.Component {

  constructor(props) {
    super(props)
    this.button = React.createRef()
    this.buttonClass = React.createRef()
  }

  componentDidMount() {
    console.log('forwardRef about DOM component---', this.button.current)
    console.log('forwardRef about class component----', this.buttonClass.current)
  }

  render() {
    return (
      <div>
        <div>Test Eight 2222</div>
        <FancyButton ref={this.button}>FancyButton</FancyButton>
        <FancyButtonClass ref={this.buttonClass}>FancyButtonClass</FancyButtonClass>
      </div>
    )
  }
} 