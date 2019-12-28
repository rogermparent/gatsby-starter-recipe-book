/** @jsx jsx */
import { jsx } from "theme-ui"

export const PageBackground = ({ children, styles }) => (
  <div
    sx={{
      py: 1,
      backgroundColor: "background",
      borderRadius: [null, "lg"],
      boxShadow: "xl",
      minHeight: "100%",
      flex: "1",
      width: "100%",
      mx: "auto",
      ...styles,
    }}
  >
    {children}
  </div>
)

export const PageContainer = ({ children, styles, maxWidth }) => (
  <div
    sx={{
      maxWidth: maxWidth || "maxPageWidth",
      zIndex: 1,
      flex: "1",
      display: "flex",
      flexFlow: "column nowrap",
      width: "100%",
      mx: "auto",
      mb: [0, 4],
      p: [0, 2],
      minHeight: "100%",
      ...styles,
    }}
  >
    {children}
  </div>
)

const ContainedPageBackground = ({ children, styles, maxWidth }) => (
  <PageContainer maxWidth={maxWidth}>
    <PageBackground styles={styles}>{children}</PageBackground>
  </PageContainer>
)

export default ContainedPageBackground
