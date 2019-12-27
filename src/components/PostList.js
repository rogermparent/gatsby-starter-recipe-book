/** @jsx jsx */
import { jsx } from "theme-ui"
import PostCard from "./PostCard"

const PostList = ({ nodes }) => {
  return (
    <ul
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        listStyle: "none",
        mx: 0,
        my: [3, null, 0],
        px: 0,
      }}
    >
      {nodes.map(({ parent }, i) => (
        <li
          key={i}
          sx={{
            flex: "1 1 300px",
            my: 3,
            mx: 3,
          }}
        >
          <PostCard
            link={parent.pagePath}
            title={parent.frontmatter.title}
            fluidImage={parent.frontmatter.image.childImageSharp.fluid}
            description={parent.frontmatter.description}
          />
        </li>
      ))}
    </ul>
  )
}

export default PostList
