/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { SmallHeader } from "../components/Header"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Image from "gatsby-image"

const PropertyRow = ({label, children}) => (
  <div
    sx={{
      display: "flex",
      flexFlow: "row nowrap"
    }}
  >
    <b sx={{flex: "1"}}>{label}: </b><span>{children}</span>
  </div>
)

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
              fontSize: [3, 2],
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
              px: 1,
              py: [2, 1, 0],
              verticalAlign: "middle",
              width: "100%",
              fontSize: [3, 2, 1],
              minHeight: ["linkMinimum", 0]
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
    sourceLabel,
    author,
    prep_time,
    cook_time,
    total_time,
    ingredients,
    image,
    yield: recipeYield,
  } = mdxRecipe.frontmatter
  return (
    <Layout title={title}>
      <SmallHeader />
      <h1
        sx={{
          textAlign: "center",
          fontSize: [6, 7, 8],
          mt: [4, 5],
          mb: [3, 4],
        }}
      >
        {title}
      </h1>
      <div
        sx={{
          width: "100%",
          maxWidth: "maxPageWidth",
          mx: "auto",
          mb: [0, 0, -6],
          backgroundColor: "muted",
        }}
      >
        <Image fluid={image.childImageSharp.fluid} />
      </div>
      <Container sx={{
        maxWidth: "maxPageWidth",
        px: [null, null, 4],
        zIndex: 1,
      }}>
        <div sx={{
          backgroundColor: "background",
          borderRadius: "lg",
          display: [null, null, "flex"],
          alignItems: "center",
          justifyContent: "center",
          flexFlow: [null, null, "row nowrap"],
        }}>
          <div sx={{
            flex: [null,null,"0 0 18rem"],
            mx: ["auto",null,2]
          }}>
            <Container sx={{my: 4}}>
              {author && (
                <PropertyRow label="Author">{author}</PropertyRow>
              )}
              {prep_time && (
                <PropertyRow label="Prep Time">{prep_time}</PropertyRow>
              )}
              {cook_time && (
                <PropertyRow label="Cook Time">{cook_time}</PropertyRow>
              )}
              {total_time && (
                <PropertyRow label="Total Time">{total_time}</PropertyRow>
              )}
              {source && (sourceLabel ? (
                <PropertyRow label="Source">
                  <a href={source}>{sourceLabel}</a>
                </PropertyRow>
              ) : (
                <div sx={{fontWeight: "bold"}}>
                  <a href={source}>Source</a>
                </div>)
              )}
              {recipeYield && (
                <div>
                  <b>Yield: </b><span>{recipeYield}</span>
                </div>
              )}
            </Container>
            <div sx={{
              backgroundColor: "muted",
              p: 3,
              borderRadius: "lg"
            }}>
              <h2
                sx={{
                  borderBottom: "1px solid gray",
                  fontSize: 5,
                  mt: 0,
                  mb: 2,
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
          </div>
          <div>
            <MDXRenderer>{mdxRecipe.body}</MDXRenderer>
          </div>
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
        image {
          childImageSharp{
            fluid(maxWidth: 1080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        yield
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
