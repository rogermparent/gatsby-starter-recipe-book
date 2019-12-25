/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { BigHeader } from "../components/Header"
import PostCard from "../components/PostCard"
import pluralize from "../utils/pluralize"

export default ({
  data: {
    taxonomy: {
      termPagePath,
      label,
      terms
    },
  }
}) => {
  const subtitle = `Taxonomy with ${terms.totalCount} term${pluralize(terms.totalCount)}.`
  return (
    <Layout
      title={label}
      subtitle={subtitle}
    >
      <BigHeader title={label} subtitle={subtitle} />
      <Container>
        <ul sx={{
          listStyle: "none",
          px: 0,
          py: 3
        }}>
          {terms.edges.map(({ count, term: { label, slug } }) => (
            <li sx={{my: 3}}>
              <PostCard
                title = {`${label} (${count})`}
                link = {`${termPagePath}/${slug}`}
              />
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
        totalCount
        edges {
          count
          term{
            label
            slug
          }
        }
      }
    }
  }
`
