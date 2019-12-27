/** @jsx jsx */
import { jsx, Layout } from "theme-ui"
import { Global } from "@emotion/core"
import StyleReset from "gatsby-theme-platinum/src/utils/normalize-css"

const BaseLayout = props => {
  const { children, styles } = props
  return (
    <Layout
      sx={{
        "@media print": {
          display: "block",
          background: "none",
        },
        overflow: "visible",
        ...styles,
      }}
    >
      <Global
        styles={theme => ({
          body: {
            minWidth: theme.sizes.minPageWidth,
          },
        })}
      />
      <StyleReset />
      {children}
    </Layout>
  )
}

export default BaseLayout
