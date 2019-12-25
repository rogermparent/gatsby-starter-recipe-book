/** @jsx jsx */
import { jsx } from "theme-ui"
import { BaseLayout } from "gatsby-theme-platinum";
import Header from "./Header"
import SEO from "./SEO"

const Layout = ({
  children,
  title,
  subtitle
}) => {
  return (
    <BaseLayout>
      <SEO title={title} />
      {children}
    </BaseLayout>
  )
}

export default Layout
