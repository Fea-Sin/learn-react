import React from 'react';

export const ThemeContext = React.createContext('dark');

export const ThemeContextUse = React.createContext('red');

export const themes = {
  light: {
    color1: '#000',
    color2: '#eee',
  },
  dark: {
    color1: '#00f',
    color2: '#222',
  }
}

export const ThemeContextT = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
})

export const UserContext = React.createContext({
  name: 'Guest'
})
