/** @jsx jsx */
import { jsx } from "theme-ui"
import SEO from "./SEO"

import Layout from "gatsby-theme-platinum/src/components/layout.js"

const LayoutWithSEO = ({
  children,
  description,
  lang,
  meta,
  keywords,
  title,
  subtitle,
  className,
  ...rest
}) => {
  return (
    <Layout
      sx={{
        backgroundColor: "secondary",
        display: "flex",
      }}
      className={className}
      {...rest}
    >
      <SEO
        description={description}
        lang={lang}
        meta={meta}
        keywords={keywords}
        title={title}
      />
      {children}
    </Layout>
  )
}

export default LayoutWithSEO
