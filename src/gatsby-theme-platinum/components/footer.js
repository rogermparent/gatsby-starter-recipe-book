/** @jsx jsx */
import { jsx } from "theme-ui"
import { Container } from "@theme-ui/components"

const SiteFooter = () => {
  return (
    <footer
      sx={{
        fontSize: 1,
        textAlign: "center",
        bg: "primary",
        color: "background",
      }}
      id="footer"
    >
      <Container
        sx={{
          p: 1,
        }}
      >
        Made by RMP, with{" "}
        <a
          sx={{
            variant: "styles.invertLink",
          }}
          href="http://gatsbyjs.org"
        >
          Gatsby
        </a>
      </Container>
    </footer>
  )
}

export default SiteFooter
