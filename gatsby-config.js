const resolveCollectionFromParentFile = ({ node, getNode, options }) => {
  const mdxNode = getNode(node.parent)
  const fileNode = getNode(mdxNode.parent)

  return fileNode.relativeDirectory.split("/")[0] || null
}

const resolveMdxContentPageTaxonomyTerms = ({
  node,
  getNode,
  key,
  options,
}) => {
  const MdxNode = getNode(node.parent)
  return MdxNode.frontmatter[options.key || key]
}

const resolveIngredientTerms = ({ node, getNode, key, options }) => {
  const MdxNode = getNode(node.parent)
  const collectedIngredients = []

  const ingredientEntries = MdxNode.frontmatter.ingredients

  if (ingredientEntries) {
    for (const ingredientEntry of ingredientEntries) {
      if (ingredientEntry.type === "ingredient" && ingredientEntry.ingredient) {
        collectedIngredients.push(ingredientEntry.ingredient)
      }
    }
  }

  return collectedIngredients
}

const resolveRecipeTaxonomyTerms = args =>
  args.key === "ingredients"
    ? resolveIngredientTerms(args)
    : resolveMdxContentPageTaxonomyTerms(args)

module.exports = {
  siteMetadata: {
    title: `My Recipe Blog`,
    subtitle: `A Recipe Website Example`,
    description: `A basic proof-of-concept for a Gatsby-base recipe blog, showing off complex relations between multiple types.`,
    author: `rmp`,
    // Change to your site's address, required for sitemap.xml and robots.txt file
    siteUrl: `https://gatsby-theme-platinum-demo.netlify.com`,
    menuLinks: [
      {
        name: `About`,
        link: `/about`,
      },
      {
        name: `Recipes`,
        link: `/recipes`,
      },
      {
        name: `Ingredients`,
        link: `/ingredients`,
      },
    ],
  },
  plugins: [
    {
      resolve: `@arrempee/gatsby-plugin-collections`,
      options: {
        indexComponent: `src/templates/index`,
        resolvers: {
          MdxContentPage: resolveCollectionFromParentFile,
          MdxRecipe: resolveCollectionFromParentFile,
        },
      },
    },
    {
      resolve: `@arrempee/gatsby-plugin-taxonomies`,
      options: {
        taxonomies: {
          ingredients: {
            label: "Ingredients",
            label_singular: "Ingredient",
            terms: {
              "garbanzo-beans": {
                redirect: "chickpeas",
              },
            },
          },
          methods: {
            label: `Methods`,
            label_singular: `Method`
          },
          cuisines: {
            label: `Cuisines`,
            label_singular: `Cuisine`
          },
          categories: {
            label: `Categories`,
            label_singular: `Category`
          },
        },
        resolvers: {
          MdxContentPage: resolveMdxContentPageTaxonomyTerms,
          MdxRecipe: resolveRecipeTaxonomyTerms,
        },
      },
    },
    {
      resolve: `gatsby-theme-platinum`,
      options: {
        assetPath: `static/uploads`,
        transfomerMdxContentPagesOptions: [
          {
            contentDirectory: ``,
          },
          {
            contentDirectory: `recipes`,
            typeName: `MdxRecipe`,
            defaultTemplate: `recipe`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-theme-platinum-demo`,
        short_name: `platinum`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `assets/logo-512.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-embedded-netlify-cms`,
      options: {
        enableIdentityWidget: false,
        modulePath: `${__dirname}/src/cms/cms.js`,
        manualInit: true,
      },
    },
  ],
}
