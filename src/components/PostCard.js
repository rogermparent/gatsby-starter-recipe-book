/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { Link } from "gatsby"
import Image from "gatsby-image"
import RoundedBox from "./RoundedBox"

const PostCard = ({ link, fluidImage, title, description }) => {
  return (
    <RoundedBox
      styles={{
        height: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        m: "auto",
        transition: "all 0.4s ease",
        boxShadow: "xl",
        "&:hover": {
          transform: "translate3D(0,-1px,0) scale(1.02)",
        },
      }}
    >
      {fluidImage && (
        <Link
          to={link}
          sx={{
            display: "block",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            fluid={fluidImage}
            sx={{ height: "200px" }}
            objectFit="cover"
            objectPosition="center center"
          />
        </Link>
      )}
      {(title || description) && (
        <Link
          to={link}
          sx={{
            display: "block",
            color: "inherit",
            textDecoration: "none",
            p: 3,
            flex: "1",
          }}
        >
          {title && <Heading as="div">{title}</Heading>}
          {description && <p sx={{ fontSize: 1 }}>{description}</p>}
        </Link>
      )}
    </RoundedBox>
  )
}

export default PostCard
