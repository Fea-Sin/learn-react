import React, { useState } from 'react';
import { ThemeContextUse } from '@/context/ThemeContext';
import Toolbar from '@/components/TestComponent/ContextUse';

function App() {
  const [color, setColor] = useState('blue')
  const handleClick = () => {
    let sc = color === 'blue' ? 'green' : 'blue'; 
    setColor(sc)
  }

  return (
    <div>
      <ThemeContextUse.Provider value={color}>
        <div>Test Twenty</div>
        <div><button onClick={handleClick}>CHANGE</button></div>
        <div>
          <Toolbar />
        </div>
      </ThemeContextUse.Provider>
    </div>
  )
}

export default App;
