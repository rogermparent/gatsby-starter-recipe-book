/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { Link } from "gatsby"
import Image from "gatsby-image"

const PostCard = ({
  link,
  fluidImage,
  title,
  description,
}) => {
  return (
    <div
      sx={{
        borderRadius: "lg",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "xl",
        maxWidth: "500px",
        m: "auto",
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translate3D(0,-1px,0) scale(1.02)"
        }
      }}
    >
      {fluidImage && (
        <Link to={link} sx={{
          display: "block",
          width: "100%",
          overflow: "hidden"
        }}>
          <Image
            fluid={fluidImage}
            objectFit="cover"
            sx={{height: "200px"}}
            objectPosition="center center"
          />
        </Link>
      )}
      {(title || description) && (
        <Link to={link} sx={{
          display: "block",
          color: "inherit",
          textDecoration: "none",
          p: 3,
        }}>
          {title && (
              <Heading as="div">{title}</Heading>
          )}
          {description && (
            <p sx={{fontSize: 1}}>{description}</p>
          )}
        </Link>
      )}
    </div>
  )
}

export default PostCard
