import React from 'react';
import useBodyClickStatus from '@/components/TestComponent/BodyClickHook';

function TwentyTwo(props) {

  const { clickSign, setClickSign, addEvent } = useBodyClickStatus(true)

  function handleOpen() {
    setClickSign(true)
    addEvent()
  }

  return (
    <div>
      <div>hello world</div>
      <div 
        style={{
          width: 100,
          border: '1px solid red',
          lineHeight: '30px',
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={handleOpen}
      >
        打开
      </div>
      <div className='other' style={{width: '100%', height: 300, backgroundColor: 'green'}}></div>
      {
        clickSign
          ? <div>初始打开</div>
          : <div>此时关闭</div>
      }
    </div>
  )
}

export default TwentyTwo;
