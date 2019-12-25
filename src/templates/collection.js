/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { graphql, Link } from "gatsby"
import { BigHeader } from "../components/Header"
import Layout from "../components/Layout"
import PostCard from "../components/PostCard"
import capitalize from "../utils/capitalize"

const CollectionPage = ({ data: { collection, collectionEntries } }) => {
  const title = collection.label || capitalize(collection.key)
  const subtitle = `Collection with ${collectionEntries.totalCount} entr${collectionEntries.totalCount === 1 ? 'y' : 'ies'}.`
  return (
    <Layout
      title={title}
      subtitle={subtitle}
    >
      <BigHeader title={title} subtitle={subtitle} />
      <Container sx={{maxWidth: "maxPageWidth"}}>
        <ul sx={{
          display: "flex",
          flexFlow: "row wrap",
          listStyle: "none",
          px: 0,
          py: 1
        }}>
          {collectionEntries.nodes.map(({ parent }, i) => (
            <li key={i} sx={{
              flex: "1 1 300px",
              my: 3,
              mx: [0, 3]
            }}>
              <PostCard
                link={parent.pagePath}
                title={parent.frontmatter.title}
                fluidImage={parent.frontmatter.image.childImageSharp.fluid}
                description={parent.frontmatter.description}
              />
            </li>
          ))}
        </ul>
      </Container>
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
                  fluid(maxWidth: 660, maxHeight: 440){
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
