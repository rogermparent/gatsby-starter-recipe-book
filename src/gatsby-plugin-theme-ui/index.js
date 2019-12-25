import { BaseTheme } from "gatsby-theme-platinum"

const theme = {
  ...BaseTheme,
  colors: {
    ...BaseTheme.colors,
    primary: '#111',
    secondary: '#222'
  },
  styles: {
    ...BaseTheme.styles,
    NavLink: {
      display: "inline-block",
      color: "muted",
      fontSize: [1,2],
      px: 2,
      verticalAlign: "middle",
      lineHeight: "32px",
      minHeight: ["linkMinimum", 0],
      textDecoration: "none"
    }
  }
}

export default theme
