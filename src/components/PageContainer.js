/** @jsx jsx */
import { jsx } from "theme-ui"

export const PageBackground = ({ children, className }) => (
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
    }}
    className={className}
  >
    {children}
  </div>
)

export const PageContainer = ({ children, className, maxWidth }) => (
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
    }}
    className={className}
  >
    {children}
  </div>
)

const ContainedPageBackground = ({ children, className, maxWidth }) => (
  <PageContainer maxWidth={maxWidth}>
    <PageBackground className={className}>{children}</PageBackground>
  </PageContainer>
)

export default ContainedPageBackground
