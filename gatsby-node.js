exports.createSchemaCustomization = ({ actions, schema }, pluginOptions) => {
  const { createTypes } = actions

  createTypes([
    schema.buildObjectType({
      name: `HeaderLink`,
      fields: {
        name: `String!`,
        link: `String!`,
        type: `String`,
      },
    }),
    schema.buildObjectType({
      name: `SiteSiteMetadata`,
      fields: {
        menuLinks: "[HeaderLink]",
      },
    }),
    schema.buildObjectType({
      name: `MdxFrontmatterIngredient`,
      fields: {
        type: {
          type: `String`,
        },
        amount: {
          type: `String`,
          extensions: {
            infer: false,
          },
        },
        ingredient: {
          type: `String`,
        },
        unit: {
          type: `String`,
        },
        ingredientSlug: {
          type: `String`,
          extensions: {
            toTagSlug: {
              taxonomy: "ingredients",
              field: "ingredient",
            },
          },
        },
      },
    }),
    schema.buildObjectType({
      name: `MdxFrontmatterYield`,
      fields: {
        unit: {
          type: `String`,
        },
        quantity: {
          type: `String`,
          extensions: {
            infer: false,
          },
        },
      },
    }),
    schema.buildObjectType({
      name: `MdxFrontmatter`,
      fields: {
        yield: {
          type: `[MdxFrontmatterYield]`,
        },
        ingredients: {
          type: `[MdxFrontmatterIngredient]`,
        },
        image: {
          type: `File`,
          resolve: (source, args, context, info) => {
            const originalPath = context.defaultFieldResolver(source, args, context, info)
            const convertedPath = originalPath.replace("/uploads/", "")
            return context.nodeModel.runQuery({
              query:{
                filter: {
                  relativePath: { eq: convertedPath },
                  sourceInstanceName: { eq: "assets" },
                },
              },
              type: 'File',
              firstOnly: true
            })
          }
        }
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
            term {
              slug
              label
            }
          }
        }
      }
    }
  `)
  if (errors) throw errors

  const processedTaxonomyTerms = {}
  for (const { key, terms } of data.allTaxonomy.nodes) {
    processedTaxonomyTerms[key] = terms.map(({ term }) => term.label)
  }

  createPage({
    path: "/admin",
    component: require.resolve("gatsby-plugin-embedded-netlify-cms/src/cms-page"),
    context: {
      taxonomies: processedTaxonomyTerms,
      htmlTitle: "Content Manager"
    },
  })
}
