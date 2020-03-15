import React from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const theme = {
  red: 'red',
  green: 'green',
  dark: '#000',
  blue: 'blue',
}

export default class ThemeButton extends React.Component {

  static contextType = ThemeContext;

  render() {
    const { context } = this
    console.log('Theme Button this-----', this)
    return (
      <div>
        <div style={{ color: theme[context] }}>ThemeButton the theme is {context}</div>
      </div>
    )
  }
}