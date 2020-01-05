const buildNetlifyCMSConfig = require("./src/gatsby-plugin-embedded-netlify-cms/build-config")

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
  const collectedIngredients = []

  if (node.ingredients) {
    for (const { ingredient } of node.ingredients) {
      if (ingredient) collectedIngredients.push(ingredient)
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
    headerNav: [
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
    footerCopy: "Gatsby Recipe Blog Starter © 2019",
    footerNav: [],
  },
  plugins: [
    {
      resolve: `@arrempee/gatsby-plugin-collections`,
      options: {
        indexComponent: `src/templates/index`,
        resolvers: {
          MdxRecipe: "recipes",
        },
      },
    },
    {
      resolve: `@arrempee/gatsby-plugin-taxonomies`,
      options: {
        taxonomies: {
          ingredients: {
            label: "Ingredients",
            labelSingular: "Ingredient",
            terms: {
              "garbanzo-beans": {
                redirect: "chickpeas",
              },
            },
          },
          methods: {
            label: `Methods`,
            labelSingular: `Method`,
          },
          cuisines: {
            label: `Cuisines`,
            labelSingular: `Cuisine`,
          },
          categories: {
            label: `Categories`,
            labelSingular: `Category`,
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
        assetsDirectory: `static/uploads`,
        transformerMdxContentPagesOptions: [
          {
            relativeDirectory: ``,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-mdx-content-page-recipes`,
      options: {
        relativeDirectory: `recipes`,
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
    `gatsby-plugin-preload-link-crossorigin`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-embedded-netlify-cms`,
      options: {
        enableIdentityWidget: false,
        buildConfig: buildNetlifyCMSConfig,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cache`,
    },
  ],
}
