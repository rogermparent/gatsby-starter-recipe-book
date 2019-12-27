/** @jsx jsx */
import { jsx } from "theme-ui"

export const roundedBoxStyle = {
  display: "block",
  borderRadius: "lg",
  overflow: "hidden",
  backgroundColor: "white",
}

export default ({ children, styles, ...props }) => (
  <div
    {...props}
    sx={{
      ...roundedBoxStyle,
      ...styles,
    }}
  >
    {children}
  </div>
)
