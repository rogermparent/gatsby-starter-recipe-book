/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Layout } from "gatsby-theme-platinum"

export default ({ data }) => {
  return (
    <Layout>
      <ul>
        {data.allTaxonomyValueTerm.nodes.map(
          ({ page: { type, pagePath, frontmatter } }, i) => (
            <li key={i}>
              <Link to={pagePath}>{frontmatter.title}</Link>
            </li>
          )
        )}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query TermPageQuery($termSlug: String!) {
    allTaxonomyValueTerm(filter: { term: { slug: { eq: $termSlug } } }) {
      nodes {
        page: parent {
          type: __typename
          ... on IMdxContentPage {
            pagePath
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`
