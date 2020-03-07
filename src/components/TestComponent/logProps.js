import React from 'react';

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props', prevProps)
      console.log('new props', this.props)
    }

    render() {
      const {forwardRef, ...rest} = this.props

      // 将自定义prop属性forwardRef定义为 ref
      return <Component ref={forwardRef} {...rest} />
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />
  })
}

export default logProps;