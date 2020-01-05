/** @jsx jsx */
import { jsx } from "theme-ui"
import { Container } from "@theme-ui/components"

export default ({ children, parentStyles, childStyles }) => {
  return (
    <div sx={{ py: 1, ...parentStyles }}>
      <Container sx={{ my: 3, ...childStyles }}>{children}</Container>
    </div>
  )
}
