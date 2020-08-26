import React, { useState } from 'react';

let BODYCLICK = () => {};
BODYCLICK.LABEL = null;

function useBodyClickStatus(initSign) {
  const [clickSign, setClickSign] = useState(initSign);

  const bodyHandle = e => {
    if (e.target && e.target.className && typeof e.target.className === 'string') {
      if ( e.target.className && e.target.className.includes('other') ) {
        console.log('不会自动执行-----')
        return;
      }
    }
    console.log('执行关闭-----')
    setClickSign(false)
    clearEvent()
  }
  
  // 单例订阅
  const addEvent = () => {
    if (!BODYCLICK.LABEL) {
      console.log('事件订阅-----')
      document.body.addEventListener('click', bodyHandle);
      BODYCLICK.LABEL = true;
    }
  }
  addEvent()

  const clearEvent = () => {
    console.log('事件清除-----')
    document.body.removeEventListener('click', bodyHandle);
    BODYCLICK.LABEL = null;
  }
  return {
    clickSign,
    clearEvent,
    setClickSign,
    addEvent,
  }
  
}

export default useBodyClickStatus;
