/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "gatsby-theme-platinum"
import { MDXRenderer } from "gatsby-plugin-mdx"

const CompactList = ({ sx, children, ...props }) => (
  <ul
    sx={{
      paddingLeft: 3,
      ...sx,
    }}
    {...props}
  >
    {children}
  </ul>
)

const IngredientList = ({ ingredientPagePath, ingredients }) => {
  return (
    <CompactList>
      {ingredients.map((ingredient, i) => (
        <li key={i}>
          <Link
            to={`/${ingredientPagePath}/${ingredient.ingredientSlug}`}
            sx={{
              display: "inline-block",
              p: [null, null, 1],
              verticalAlign: "middle",
            }}
          >
            {ingredient.amount} {ingredient.unit}{" "}
            {ingredient.label || ingredient.ingredient}
          </Link>
        </li>
      ))}
    </CompactList>
  )
}

const TagList = ({ termPagePath, terms }) => {
  return terms.map((term, i) => (
    <React.Fragment key={i}>
      {i !== 0 && ", "}
      <Link to={`/${termPagePath}/${term.slug}`}>
        {term.amount} {term.unit} {term.label || term.term}
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
  } = mdxRecipe.frontmatter
  return (
    <Layout>
      <Container
        sx={{
          display: "flex",
          flexFlow: ["column nowrap", null, "row nowrap"],
        }}
      >
        <div>
          <h1>{title}</h1>
          <div>Author: {author}</div>
          <div>
            Source: <a href={source}>{source}</a>
          </div>

          <div>
            <b>Categories: </b>
            <TagList
              terms={mdxRecipe.tags.taxonomies.categories}
              termPagePath={categoriesTaxonomy.termPagePath}
            />
          </div>
          <div>
            <b>Methods: </b>
            <TagList
              terms={mdxRecipe.tags.taxonomies.methods}
              termPagePath={methodsTaxonomy.termPagePath}
            />
          </div>
          <div>
            <b>Cuisines: </b>
            <TagList
              terms={mdxRecipe.tags.taxonomies.cuisines}
              termPagePath={cuisinesTaxonomy.termPagePath}
            />
          </div>
        </div>
        <div
          sx={{
            pl: [null, null, 4],
          }}
        >
          <h3
            sx={{
              textAlign: [null, null, "center"],
            }}
          >
            Time
          </h3>
          <CompactList>
            <li>Prep: {prep_time}</li>
            <li>Cook: {cook_time}</li>
            <li>Total: {total_time}</li>
          </CompactList>
        </div>
      </Container>

      <Container
        sx={{
          maxWidth: "1080px",
          h1: {
            fontSize: [4],
          },
          h2: {
            fontSize: [3],
          },
          display: "flex",
          flexFlow: ["column nowrap", null, "row nowrap"],
          padding: [null, null, "3em"],
        }}
      >
        <div
          sx={{
            flex: "1 0 auto",
            fontSize: 0,
            maxWidth: [null, null, "15rem"],
          }}
        >
          <h2>Ingredients</h2>
          <IngredientList
            ingredients={mdxRecipe.frontmatter.ingredients}
            ingredientPagePath={ingredientsTaxonomy.termPagePath}
          />
        </div>
        <div sx={{ flex: "2 1 auto" }}>
          <MDXRenderer>{mdxRecipe.body}</MDXRenderer>
        </div>
      </Container>
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
        ingredients {
          amount
          ingredient
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
