/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import HomeHeader from "../components/HomeHeader"
import PageContainer from "../components/PageContainer"

export default ({ data }) => {
  return (
    <Layout title={data.contentPage.frontmatter.title}>
      <HomeHeader />
      <PageContainer maxWidth="maxContentWidth">
        <MDXRenderer>{data.contentPage.parent.body}</MDXRenderer>
      </PageContainer>
    </Layout>
  )
}
export const query = graphql`
  query HomePageQuery($id: String!) {
    contentPage(id: { eq: $id }) {
      id
      pagePath
      template
      ... on MdxContentPage {
        frontmatter {
          title
        }
        parent {
          ... on Mdx {
            body
          }
        }
      }
    }
  }
`
