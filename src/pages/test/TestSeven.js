import React from 'react';

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    console.log('Parent get child input', this.inputElement)
  }

  render() {
    return (
      <div>
        <div>Test Seven</div>
        <CustomTextInput
          inputRef={el => this.inputElement = el}
        />
      </div>
    )
  }
}