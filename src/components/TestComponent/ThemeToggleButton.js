import { ThemeContextT, themes } from '@/context/ThemeContext';

function ThemeToggleButton() {
  return (
    <ThemeContextT.Consumer>
      {({theme, toggleTheme}) => {
        console.log('change theme----', theme.color1)
        return (
        <button
          onClick={toggleTheme}
          style={{color: theme.color1}}
        >
          Toggle Theme
        </button>
      )
      }}
    </ThemeContextT.Consumer>
  )
}

export default ThemeToggleButton;
