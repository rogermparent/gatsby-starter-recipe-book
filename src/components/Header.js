/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Heading, Flex } from "@theme-ui/components"

export const useHeaderMetadata = () =>
  useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          subtitle
          headerNav {
            name
            link
            type
          }
        }
      }
    }
  `).site.siteMetadata

export const HeaderContainer = ({ children, className }) => (
  <header
    sx={{
      backgroundColor: "primary",
      color: "background",
      textAlign: "center",
      mb: [null, null, null, -5],
      pb: [null, null, null, 5],
      px: 2,
      overflow: "auto",
      "@media print": {
        display: "none",
      },
    }}
    className={className}
  >
    {children}
  </header>
)

export const SmallHeader = () => (
  <HeaderContainer>
    <SiteNav />
  </HeaderContainer>
)

const BigHeaderText = ({ title, subtitle }) => {
  return (
    <div
      sx={{
        textAlign: "center",
        mt: [4, 5],
        mb: 5,
      }}
    >
      <Heading
        as="h1"
        sx={{
          fontSize: 7,
        }}
      >
        {title}
      </Heading>
      {subtitle && (
        <Heading
          as="h2"
          sx={{
            mt: 1,
            fontWeight: "lighter",
            fontSize: 4,
          }}
        >
          {subtitle}
        </Heading>
      )}
    </div>
  )
}

export const BigHeader = ({ title, subtitle }) => (
  <HeaderContainer>
    <SiteNav />
    <BigHeaderText title={title} subtitle={subtitle} />
  </HeaderContainer>
)

export const Logo = ({ text, image, className }) => {
  return (
    <Link
      to="/"
      sx={{
        variant: "styles.NavLink",
        color: "background",
        fontSize: [4, 3],
        lineHeight: ["linkMinimum", "normal"],
        minHeight: ["linkMinimum", 0],
        fontWeight: "bold",
      }}
      className={className}
    >
      {text}
    </Link>
  )
}

const SiteNav = () => {
  const { headerNav, title } = useHeaderMetadata()

  return (
    <Flex
      as="nav"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: ["column", "row"],
        flexWrap: "nowrap",
        mx: "auto",
        px: [0, 4, 0],
        lineHeight: "normal",
        my: [0, 3],
        maxWidth: "maxPageWidth",
      }}
    >
      <div
        sx={{
          flex: 1,
          textAlign: "left",
        }}
      >
        <Logo
          text={title}
          sx={{
            textAlign: ["center", "left"],
          }}
        />
      </div>
      <Nav
        links={headerNav}
        sx={{
          flexFlow: "row nowrap",
          justifyContent: "flex-end",
          flex: "1",
        }}
      />
    </Flex>
  )
}

export const NavLink = ({ name, link, external }) =>
  external ? (
    <a sx={{ variant: "styles.NavLink" }} href={link}>
      {name}
    </a>
  ) : (
    <Link sx={{ variant: "styles.NavLink" }} to={link}>
      {name}
    </Link>
  )

export const Nav = ({ links }) => (
  <Flex
    sx={{
      justifyContent: "center",
      flexFlow: "row wrap",
    }}
  >
    {links.map((link, i) => (
      <NavLink
        name={link.name}
        link={link.link}
        external={link.type === "external"}
        key={i}
      />
    ))}
  </Flex>
)
