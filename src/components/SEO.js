import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { SEO } from "gatsby-theme-platinum"

function QueriedSEO({
  description,
  lang = "en",
  meta = [],
  keywords = [],
  title,

  siteTitle,
  siteDescription,
  siteAuthor,
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)
  return (
    <SEO
      siteTitle={siteMetadata.title}
      siteDescription={siteMetadata.description}
      siteAuthor={siteMetadata.author}
      description={description}
      lang={lang}
      meta={meta}
      keywords={keywords}
      title={title}
    />
  )
}

export default QueriedSEO
