import { BaseTheme } from "gatsby-theme-platinum"

const theme = {
  ...BaseTheme,
  sizes: {
    ...BaseTheme.sizes,
    maxContentWidth: "736px",
    maxPageWidth: "960px",
  },
  colors: {
    ...BaseTheme.colors,
    primary: "#111",
    secondary: "#EEE",
  },
  styles: {
    ...BaseTheme.styles,
    NavLink: {
      display: "inline-block",
      color: "muted",
      fontSize: [1, 2],
      px: 2,
      verticalAlign: "middle",
      lineHeight: ["48px", "32px"],
      minHeight: ["linkMinimum", 0],
      textDecoration: "none",
    },
  },
}

export default theme
