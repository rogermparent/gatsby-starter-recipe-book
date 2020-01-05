/** @jsx jsx */
import { jsx } from "theme-ui"
import { Flex } from "@theme-ui/components"
import { Global } from "@emotion/core"
import StyleReset from "gatsby-theme-platinum/src/utils/normalize-css"

const BaseLayout = ({className, children}) => {
  return (
    <Flex
      sx={{
        flexFlow: "column nowrap",
        minHeight: "100vh",
        overflow: "visible",
        "@media print": {
          display: "block",
          background: "none",
        },
      }}
      className={className}
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
    </Flex>
  )
}

export default BaseLayout
