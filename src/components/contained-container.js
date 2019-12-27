/** @jsx jsx */
import { jsx, Container } from "theme-ui"

export default ({ children, parentStyles, childStyles }) => {
  return (
    <div sx={{ py: 1, ...parentStyles }}>
      <Container sx={{ my: 3, ...childStyles }}>{children}</Container>
    </div>
  )
}
