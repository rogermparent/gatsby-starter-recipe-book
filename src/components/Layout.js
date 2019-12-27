/** @jsx jsx */
import { jsx, Layout } from "theme-ui"
import { Global } from "@emotion/core"
import StyleReset from "gatsby-theme-platinum/src/utils/normalize-css"
import React from "react"
import Header from "./Header"
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
