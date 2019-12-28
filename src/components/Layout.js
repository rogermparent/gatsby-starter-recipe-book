/** @jsx jsx */
import { jsx } from "theme-ui"
import Footer from "./Footer"
import SEO from "./SEO"

import BaseLayout from "./base-layout"

const NewBaseLayout = ({ children, title, subtitle }) => {
  return (
    <BaseLayout
      styles={{
        backgroundColor: "secondary",
      }}
    >
      <SEO title={title} />
      {children}
      <Footer />
    </BaseLayout>
  )
}

export default NewBaseLayout
