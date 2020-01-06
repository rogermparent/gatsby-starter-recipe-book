/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({
  data: {
    contentPage: {
      body,
      frontmatter: { title, pageHeading },
    },
  },
}) => {
  return (
    <Layout title={title}>
      <div
        sx={{
          flex: 1,
          backgroundColor: "background",
        }}
      >
        {pageHeading && (
          <Heading
            as="h1"
            sx={{
              fontSize: [6, 8],
              textAlign: "center",
              mt: [4],
              mb: [3, 4],
            }}
          >
            {pageHeading}
          </Heading>
        )}
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query ContentPageDefaultQuery($id: String!) {
    contentPage(id: { eq: $id }) {
      template
      ... on IMdxContentPage {
        body
        frontmatter {
          title
          pageHeading
        }
      }
    }
  }
`
