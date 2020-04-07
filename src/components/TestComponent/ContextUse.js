import React, { useContext } from 'react';
import { ThemeContextUse } from '@/context/ThemeContext';

function Toolbar() {
  return (
    <div>
      <div>This is Toolbar</div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContextUse)
  return (
    <button style={{color: theme}}>
      I am styled by theme context!
    </button>
  )
}

export default Toolbar;
