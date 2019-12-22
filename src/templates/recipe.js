/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "gatsby-theme-platinum"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Image from "gatsby-image"

const Yields = ({ yields }) => {
  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        flexFlow: "row nowrap",
      }}
    >
      <span sx={{ mr: 2 }}>Yield: </span>
      {yields.length > 1 ? (
        <span>
          {yields.map((yieldSetting, i) => (
            <div>
              {yieldSetting.quantity} {yieldSetting.unit}
            </div>
          ))}
        </span>
      ) : (
        <span>
          {yields[0].quantity} {yields[0].unit}
        </span>
      )}
    </div>
  )
}

const CompactList = ({ sx, children, ...props }) => (
  <ul
    sx={{
      pl: 0,
      listStyle: "none",
      ...sx,
    }}
    {...props}
  >
    {children}
  </ul>
)

const IngredientListItem = ({ ingredientPagePath, ingredient }) => {
  switch (ingredient.type) {
    case "heading":
      return (
        <li sx={{ listStyle: "none" }}>
          <h3
            sx={{
              borderBottom: "1px solid gray",
              pb: 1,
              pl: 1,
              mx: 1,
              my: 2,
            }}
          >
            {ingredient.text}
          </h3>
        </li>
      )
    case "ingredient":
    default:
      return (
        <li
          sx={{
            m: 0,
          }}
        >
          <Link
            to={`/${ingredientPagePath}/${ingredient.ingredientSlug}`}
            sx={{
              display: "inline-block",
              p: 2,
              verticalAlign: "middle",
              width: "100%",
            }}
          >
            {ingredient.label}
          </Link>
        </li>
      )
  }
}

const IngredientList = ({ ingredientPagePath, ingredients }) => {
  return (
    <CompactList sx={{ my: 1 }}>
      {ingredients.map((ingredient, i) => (
        <IngredientListItem
          key={i}
          ingredientPagePath={ingredientPagePath}
          ingredient={ingredient}
        />
      ))}
    </CompactList>
  )
}

const TagList = ({ termPagePath, terms }) => {
  return terms.map((term, i) => (
    <React.Fragment key={i}>
      {i !== 0 && ", "}
      <Link to={`/${termPagePath}/${term.slug}`}>
        {term.label || term.term}
      </Link>
    </React.Fragment>
  ))
}

export default ({
  data: {
    mdxRecipe,
    ingredientsTaxonomy,
    categoriesTaxonomy,
    methodsTaxonomy,
    cuisinesTaxonomy,
  },
}) => {
  const {
    title,
    source,
    author,
    prep_time,
    cook_time,
    total_time,
    ingredients,
    image,
    yield: yields,
  } = mdxRecipe.frontmatter
  return (
    <Layout>
      <h1
        sx={{
          textAlign: "center",
        }}
      >
        {title}
      </h1>
      <div
        sx={{
          width: "100%",
          backgroundColor: "muted",
        }}
      >
        <Image fluid={image.childImageSharp.fluid} />
      </div>
      <Yields yields={yields} />
      <div sx={{ p: 3, backgroundColor: "muted" }}>
        <h2
          sx={{
            borderBottom: "1px solid gray",
            my: 2,
            pb: 2,
            pl: 1,
          }}
        >
          Ingredients
        </h2>
        <IngredientList
          ingredientPagePath={ingredientsTaxonomy.termPagePath}
          ingredients={ingredients}
        />
      </div>
      <div sx={{ my: 4 }}>
        <Container>
          <MDXRenderer>{mdxRecipe.body}</MDXRenderer>
        </Container>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query ContentPageRecipeQuery($id: String!) {
    categoriesTaxonomy: taxonomy(key: { eq: "categories" }) {
      termPagePath
    }
    methodsTaxonomy: taxonomy(key: { eq: "methods" }) {
      termPagePath
    }
    cuisinesTaxonomy: taxonomy(key: { eq: "cuisines" }) {
      termPagePath
    }
    ingredientsTaxonomy: taxonomy(key: { eq: "ingredients" }) {
      termPagePath
    }
    mdxRecipe(id: { eq: $id }) {
      pagePath
      template
      body
      frontmatter {
        title
        source
        author
        prep_time
        cook_time
        total_time
        image {
          childImageSharp{
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        yield {
          unit
          quantity
        }
        ingredients {
          amount
          ingredient
          text
          label
          type
          unit
          ingredientSlug
        }
      }
      tags: childTaxonomyValueTerms {
        taxonomies: termsByTaxonomy {
          methods {
            label
            slug
          }
          cuisines {
            label
            slug
          }
          categories {
            label
            slug
          }
        }
      }
    }
  }
`
