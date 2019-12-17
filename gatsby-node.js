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
      },
    }),
  ])
}
