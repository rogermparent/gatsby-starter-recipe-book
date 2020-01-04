/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { BigHeader } from "../components/Header"
import Layout from "../components/Layout"
import { PageContainer } from "../components/PageContainer"
import PostList from "../components/PostList"
import capitalize from "../utils/capitalize"

export default ({
  data: {
    taxonomyTerm: {
      taxonomy: { taxonomyLabel, taxonomyPagePath },
      label,
      slug,
    },
    allTaxonomyValueTerm: { totalCount, nodes },
  },
}) => {
  const title = label
  const subtitle = `${taxonomyLabel} with ${totalCount} entr${
    totalCount === 1 ? "y" : "ies"
  }.`
  return (
    <Layout title={title} subtitle={subtitle}>
      <BigHeader title={capitalize(title)} subtitle={subtitle} />
      <PageContainer>
        <PostList nodes={nodes} />
      </PageContainer>
    </Layout>
  )
}

export const query = graphql`
  query TermPageQuery($id: String!) {
    taxonomyTerm(id: { eq: $id }) {
      label
      slug
      taxonomy {
        taxonomyLabel: labelSingular
        taxonomyPagePath
      }
    }
    allTaxonomyValueTerm(filter: { term: { id: { eq: $id } } }) {
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
