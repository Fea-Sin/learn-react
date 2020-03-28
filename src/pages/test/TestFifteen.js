import React from 'react';
import Mouse from '@/components/TestComponent/Mouse';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Mouse>
          {mouse => (
            <div>
              <h1>鼠标移动</h1>
              <p>鼠标的位置是 {mouse.x}, {mouse.y}</p>
            </div>
          )}
        </Mouse>
      </div>
    )
  }
}
