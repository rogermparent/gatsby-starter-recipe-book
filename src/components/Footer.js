/** @jsx jsx */
import { jsx, Flex } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import { Nav } from "./Header"

const useFooterMetadata = () =>
  useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          footerCopy
          footerNav {
            name
            link
            type
          }
        }
      }
    }
  `)

const Footer = () => {
  const {
    site: {
      siteMetadata: { footerCopy, footerNav },
    },
  } = useFooterMetadata()
  return (
    <footer
      sx={{
        backgroundColor: "primary",
        color: "background",
        fontSize: [0, 1],
        px: 3,
        py: 2,
      }}
    >
      <Flex
        sx={{
          flexFlow: "row wrap",
          textAlign: "center",
          maxWidth: "maxPageWidth",
        }}
      >
        {footerCopy && (
          <div
            sx={{
              flex: 1,
            }}
          >
            {footerCopy}
          </div>
        )}
        {footerNav && footerNav.length > 0 && <Nav links={footerNav} />}
      </Flex>
    </footer>
  )
}

export default Footer
