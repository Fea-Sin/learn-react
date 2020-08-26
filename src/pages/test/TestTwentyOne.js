import React, { useRef } from 'react';
import useBodyClickStatus from '@/components/TestComponent/BodyClickHook';

function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    inputEl.current.focus()
  }

  const { clickSign, setClickSign, addEvent } = useBodyClickStatus(false)


  return (
    <>
      <div><input ref={inputEl} type='text' /></div>
      <button onClick={onButtonClick}>Focus the input</button>
      <div>
        {
          clickSign
            ? <div>这里是打开的</div>
            : <div>关闭吧</div>
        }
      </div>
    </>  
  )
}

export default TextInputWithFocusButton;
