/** @jsx jsx */
import { jsx, Flex } from "theme-ui"
import {Link, graphql, useStaticQuery} from "gatsby"
import { Heading, Styled } from "@theme-ui/components"

export const useHeaderMetadata = () => (
  useStaticQuery(graphql`
    {
      site{
        siteMetadata{
          title
          subtitle
          menuLinks{
            name
            link
            type
          }
        }
      }
    }
  `).site.siteMetadata
)

export const HeaderContainer = ({children, styles}) => (
  <header sx={{
    backgroundColor: 'primary',
    color: 'background',
    textAlign: 'center',
    px: 2,
    overflow: "auto",
    ...styles
  }}>
    {children}
  </header>
)

export const SmallHeader = () => (
  <HeaderContainer>
    <SiteNav />
  </HeaderContainer>
)

const BigHeaderText = ({title, subtitle}) => {
  return (
    <div sx={{
      textAlign: 'center',
      mt: [4, 5],
      mb: [5, null, null, 6],
    }}>
      <Heading as="h1"
        sx={{
          fontSize: 7
        }}
      >{title}</Heading>
      {
        subtitle &&
        <Heading as="h2"
          sx={{
            mt: 1,
            fontWeight: "lighter",
            fontSize: 4,
          }}
        >
          {subtitle}
        </Heading>
      }
    </div>
  )
}

export const BigHeader = ({title, subtitle}) => (
  <HeaderContainer>
    <SiteNav />
    <BigHeaderText title={title} subtitle={subtitle} />
  </HeaderContainer>
)

export const Logo = ({text, image, style}) => {
  return(
    <Link
      to='/'
      sx={{
        variant: 'styles.NavLink',
        color: 'background',
        fontSize: [4, 3],
        lineHeight: ['linkMinimum', 'normal'],
        minHeight: ['linkMinimum', 0],
        fontWeight: 'bold',
        flex: '1',
        ...style
      }}
    >
      {text}
    </Link>
  )
}

const SiteNav = () => {
  const {menuLinks, title} = useHeaderMetadata()

  return(
    <Flex
      as="nav"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: ["column", "row"],
        flexWrap: "nowrap",
        mx: "auto",
        lineHeight: "normal",
        mt: [0, 1],
        mb: [0, 2],
        maxWidth: "maxPageWidth"
      }}
    >
      <Logo text={title}
        style={{
          textAlign: ['center', 'left'],
        }}
      />
      <Nav
        links={menuLinks}
        sx={{
          flexFlow: "row nowrap",
          justifyContent: "flex-end",
          flex: "1"
        }}
      />
    </Flex>
  )
}

const NavLink = ({name, link, external})=>(
  external ?
  <a
    sx={{variant: "styles.NavLink"}}
    href={link}
  >{name}</a> :
  <Link
    sx={{variant: "styles.NavLink"}}
    to={link}
  >{name}</Link>
)

export const Nav = ({links}) => (
  <Flex sx={{
    justifyContent: 'center',
  }}>
    {
      links.map((link, i) => (
        <NavLink
          name={link.name}
          link={link.link}
          external={link.type === "external"}
          key={i}
        />
      ))
    }
  </Flex>
)
