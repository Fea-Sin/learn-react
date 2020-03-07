import React from 'react';

class WrappedButton extends React.Component {

  render() {

    return (
      <div>
        <div>fancy button class</div>
        <button className='fancyButton' ref={this.props.innerRef}>
          {this.props.children}
        </button>
      </div>
    )
  }
}

const FancyButtonClass = React.forwardRef((props, ref) => {
  return <WrappedButton innerRef={ref} {...props} />
})

export default FancyButtonClass;