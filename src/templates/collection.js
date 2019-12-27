/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { graphql, Link } from "gatsby"
import { BigHeader } from "../components/Header"
import Layout from "../components/Layout"
import { PageContainer } from "../components/PageContainer"
import PostList from "../components/PostList"
import capitalize from "../utils/capitalize"

const CollectionPage = ({ data: { collection, collectionEntries } }) => {
  const title = collection.label || capitalize(collection.key)
  const subtitle = `Collection with ${collectionEntries.totalCount} entr${
    collectionEntries.totalCount === 1 ? "y" : "ies"
  }.`
  return (
    <Layout title={title} subtitle={subtitle}>
      <BigHeader title={title} subtitle={subtitle} />
      <PageContainer>
        <PostList nodes={collectionEntries.nodes} />
      </PageContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CollectionIndexPageQuery($id: String!) {
    collection(id: { eq: $id }) {
      key
      label
    }
    collectionEntries: allCollectionEntry(
      filter: { collection: { id: { eq: $id } } }
    ) {
      totalCount
      nodes {
        parent {
          ... on ContentPage {
            pagePath
          }
          ... on IMdxContentPage {
            frontmatter {
              title
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 660, maxHeight: 440) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CollectionPage
