/** @jsx jsx */
import { jsx } from "theme-ui"

export const roundedBoxStyle = {
  display: "block",
  borderRadius: "lg",
  overflow: "hidden",
  backgroundColor: "white",
}

export default ({ children, className, ...props }) => (
  <div {...props} className={className} sx={roundedBoxStyle}>
    {children}
  </div>
)
