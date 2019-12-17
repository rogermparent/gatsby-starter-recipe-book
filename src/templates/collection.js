/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Layout } from "gatsby-theme-platinum"

const CollectionPage = ({ data: { collection, collectionEntries } }) => (
  <Layout>
    <Container>
      <h1>{collection.key}</h1>
      <ul>
        {collectionEntries.nodes.map(({ parent }, i) => (
          <li key={i}>
            <Link to={parent.pagePath}>{parent.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  </Layout>
)

export const pageQuery = graphql`
  query CollectionIndexPageQuery($id: String!) {
    collection(id: { eq: $id }) {
      key
    }
    collectionEntries: allCollectionEntry(
      filter: { collection: { id: { eq: $id } } }
    ) {
      nodes {
        parent {
          ... on ContentPage {
            pagePath
          }
          ... on IMdxContentPage {
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`

export default CollectionPage
