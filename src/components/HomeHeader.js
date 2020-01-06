/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { useHeaderMetadata, HeaderContainer, Nav, Logo } from "./Header"

const HomeHeader = () => {
  const { headerNav, title, subtitle } = useHeaderMetadata()
  return (
    <HeaderContainer>
      <div
        sx={{
          mt: [4, 5],
          mb: 5,
        }}
      >
        <Logo
          sx={{
            p: 1,
            fontSize: [6, 7],
          }}
          as="h1"
          text={title}
        />
        {subtitle && (
          <Heading
            as="h2"
            sx={{
              fontWeight: "250",
              fontSize: [4, 5],
            }}
          >
            {subtitle}
          </Heading>
        )}
      </div>
      <Nav links={headerNav} />
    </HeaderContainer>
  )
}

export default HomeHeader
