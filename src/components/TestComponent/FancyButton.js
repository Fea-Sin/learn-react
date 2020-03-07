import React from 'react';

const FancyButton = React.forwardRef((props, ref) => {
  return (
    <div>
      <button ref={ref} className='fancyButton'>
        {props.children}
      </button>
    </div>
  )
})

export default FancyButton;