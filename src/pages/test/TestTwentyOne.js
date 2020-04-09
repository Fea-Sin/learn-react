import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    inputEl.current.focus()
  }

  return (
    <>
      <div><input ref={inputEl} type='text' /></div>
      <button onClick={onButtonClick}>Focus the input</button> 
    </>  
  )
}

export default TextInputWithFocusButton;
