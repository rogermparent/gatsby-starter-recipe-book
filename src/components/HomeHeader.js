/** @jsx jsx */
import { jsx, Flex } from "theme-ui"
import {Link, graphql, useStaticQuery} from "gatsby"
import { Heading } from "@theme-ui/components"
import { useHeaderMetadata, HeaderContainer, Nav, Logo } from "./Header"

const HomeHeader = () => {
  const {menuLinks, title, subtitle} = useHeaderMetadata()
  return(
    <HeaderContainer>
      <div sx={{
        my: [5, 6],
      }}>
        <Logo
          style={{
            p: 1,
            fontSize: [6, 7],
          }} as="h1" text={title} />
        {subtitle &&
         <Heading
           as="h2"
           sx={{
             fontWeight: "250",
             fontSize: [4,5]
           }}
         >
           {subtitle}
         </Heading>}
      </div>
      <Nav
        links={menuLinks}
      />
    </HeaderContainer>
  )
}

export default HomeHeader
