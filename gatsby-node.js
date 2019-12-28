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

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data, errors } = await graphql(`
    {
      allTaxonomy {
        nodes {
          key
          terms {
            edges {
              term {
                slug
                label
              }
            }
          }
        }
      }
    }
  `)
  if (errors) throw errors

  const processedTaxonomyTerms = {}
  for (const { key, terms } of data.allTaxonomy.nodes) {
    processedTaxonomyTerms[key] = terms.edges.map(({ term }) => term.label)
  }

  createPage({
    path: "/admin",
    component: require.resolve(
      "gatsby-plugin-embedded-netlify-cms/src/cms-page"
    ),
    context: {
      taxonomies: processedTaxonomyTerms,
      htmlTitle: "Content Manager",
    },
  })
}
