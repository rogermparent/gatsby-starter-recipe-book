/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Layout } from "gatsby-theme-platinum"

export default ({
  data: {
    taxonomy: { termPagePath, label, terms },
  },
}) => {
  return (
    <Layout title={label}>
      <Container>
        <h1>{label}</h1>
        <ul>
          {terms.map(({ count, term: { label, slug } }) => (
            <li>
              <Link
                sx={{
                  fontSize: 3,
                  p: 2,
                  display: "inline-block",
                }}
                to={`${termPagePath}/${slug}`}
              >
                {label} ({count})
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query TaxonomyPageQuery($id: String!) {
    taxonomy(id: { eq: $id }) {
      key
      label
      termPagePath
      terms {
        count
        term {
          label
          slug
        }
      }
    }
  }
`
