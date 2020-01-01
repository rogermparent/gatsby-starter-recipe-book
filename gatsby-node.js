exports.createSchemaCustomization = ({ actions, schema }, pluginOptions) => {
  const { createTypes } = actions

  createTypes([
    schema.buildObjectType({
      name: `NavLink`,
      fields: {
        name: `String!`,
        link: `String!`,
        type: `String`,
      },
    }),
    schema.buildObjectType({
      name: `SiteSiteMetadata`,
      fields: {
        title: "String!",
        subtitle: "String",
        headerNav: "[NavLink]",
        footerCopy: "String",
        footerNav: "[NavLink]",
      },
    }),
    schema.buildObjectType({
      name: `MdxFrontmatter`,
      fields: {
        pageHeading: `String`,
        image: {
          type: `File`,
          resolve: (source, args, context, info) => {
            const originalPath = context.defaultFieldResolver(
              source,
              args,
              context,
              info
            )
            const convertedPath = originalPath.replace("/uploads/", "")
            return context.nodeModel.runQuery({
              query: {
                filter: {
                  relativePath: { eq: convertedPath },
                  sourceInstanceName: { eq: "assets" },
                },
              },
              type: "File",
              firstOnly: true,
            })
          },
        },
      },
    }),
  ])
}
