/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui"
import { Heading } from "@theme-ui/components"
import React, { useReducer } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { SmallHeader } from "../components/Header"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Image from "gatsby-image"
import { roundedBoxStyle } from "../components/RoundedBox"
import PageContainer from "../components/PageContainer"
import { reconstitute } from "../utils/string-number-multiplier"

const reconstituteWithMultiplier = ({ strings, numbers }, multiplier) =>
  reconstitute({
    strings,
    numbers: multiplier ? numbers.map(num => num * multiplier) : numbers,
  })

const PropertyRow = ({ label, children }) => (
  <div
    sx={{
      display: "flex",
      flexFlow: "row nowrap",
    }}
  >
    <b sx={{ flex: "1" }}>{label}: </b>
    <span>{children}</span>
  </div>
)

const CompactList = ({ styles, children, ...props }) => (
  <ul
    sx={{
      pl: 0,
      listStyle: "none",
      ...styles,
    }}
    {...props}
  >
    {children}
  </ul>
)

const IngredientListItem = ({
  ingredientPagePath,
  ingredient,
  multiplier,
}) => {
  switch (ingredient.type) {
    case "RecipeHeadingEntry":
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
              "@media print": {
                minHeight: "unset",
                py: 0,
                my: 1,
                fontSize: 1,
              },
            }}
          >
            {ingredient.text}
          </h3>
        </li>
      )
    case "RecipeIngredientEntry":
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
              minHeight: ["linkMinimum", 0],
              "@media print": {
                minHeight: "unset",
                py: 0,
                my: 0,
                fontSize: 1,
              },
            }}
          >
            {reconstituteWithMultiplier(ingredient.line, multiplier)}
          </Link>
        </li>
      )
  }
}

const IngredientList = ({ ingredientPagePath, ingredients, multiplier }) => {
  return (
    <CompactList
      styles={{
        my: 1,
        "@media print": {
          my: 1,
          p: 0,
        },
      }}
    >
      {ingredients.map((ingredient, i) => (
        <IngredientListItem
          key={i}
          ingredientPagePath={ingredientPagePath}
          ingredient={ingredient}
          multiplier={multiplier}
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
    ingredients,
    yield: recipeYield,
    frontmatter: {
      title,
      source,
      sourceLabel,
      author,
      prep_time,
      cook_time,
      total_time,
      image,
    },
  } = mdxRecipe

  const [multiplier, setMultiplier] = useReducer((state, action) => {
    if (!action || action === 1) return null
    return action
  }, 1)

  return (
    <Layout title={title}>
      <SmallHeader />
      <Heading
        as="h1"
        sx={{
          textAlign: "center",
          fontSize: [6, 7, 8],
          px: 3,
          pt: [4, null, 5],
          pb: [4, null],
          backgroundColor: "background",
          "@media print": {
            float: "left",
            clear: "left",
            mr: 2,
            my: 3,
            p: 0,
            width: "300px",
          },
        }}
      >
        {title}
      </Heading>
      <div
        sx={{
          width: "100%",
          maxWidth: "maxPageWidth",
          mx: "auto",
          mb: [0, -5, null, -6],
          overflow: "hidden",
          maxHeight: "30rem",
          backgroundColor: "muted",
          zIndex: 0,
          "@media print": {
            float: "left",
            clear: "left",
            width: "300px",
            px: "30px",
            height: "175px",
            mr: 2,
            mb: 1,
          },
        }}
      >
        <Image
          fluid={image.childImageSharp.fluid}
          sx={{ height: "100%" }}
          objectFit="cover"
          objectPosition="center center"
          height="100%"
        />
      </div>
      <div
        sx={{
          maxWidth: "maxPageWidth",
          zIndex: 1,
          mx: "auto",
        }}
      >
        <PageContainer
          styles={{
            borderRadius: [0, "lg"],
            width: "auto",
            mx: [0, 2, 3, 5],
            maxWidth: ["maxContentWidth", null, null, "maxPageWidth"],
            zIndex: 1,

            position: "relative",
            "@media print": {
              mx: 0,
              px: 0,
              display: "block",
              background: "none",
            },
          }}
        >
          <div
            sx={{
              display: [null, null, null, "flex"],
              alignItems: "center",
              justifyContent: "center",
              flexFlow: [null, null, null, "row nowrap"],
              p: [null, null, null, 2],
            }}
          >
            <div
              sx={{
                flex: [null, null, "0 0 18rem"],
                mx: "auto",
                "@media print": {
                  width: "300px",
                  float: "left",
                  clear: "left",
                  fontSize: 2,
                  width: "300px",
                  ml: 0,
                  mr: 2,
                  mb: 3,
                },
              }}
            >
              <div
                sx={{
                  ...roundedBoxStyle,
                  p: 2,
                  backgroundColor: "muted",
                  mx: 2,
                  my: 3,
                  flex: "1",
                  "@media print": {
                    my: 1,
                    p: 2,
                    fontSize: 0,
                  },
                }}
              >
                {author && <PropertyRow label="Author">{author}</PropertyRow>}
                {prep_time && (
                  <PropertyRow label="Prep Time">{prep_time}</PropertyRow>
                )}
                {cook_time && (
                  <PropertyRow label="Cook Time">{cook_time}</PropertyRow>
                )}
                {total_time && (
                  <PropertyRow label="Total Time">{total_time}</PropertyRow>
                )}
                {source &&
                  (sourceLabel ? (
                    <PropertyRow label="Source">
                      <a href={source}>{sourceLabel}</a>
                    </PropertyRow>
                  ) : (
                    <div
                      sx={{
                        fontWeight: "bold",
                        "@media print": { display: "none" },
                      }}
                    >
                      <a href={source}>Source</a>
                    </div>
                  ))}
                {recipeYield && (
                  <PropertyRow label="Yield">
                    {reconstituteWithMultiplier(recipeYield, multiplier)}
                  </PropertyRow>
                )}
                <Flex
                  as="label"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <b sx={{ flex: 1 }}>Multiply: </b>
                  <input
                    sx={{
                      border: "1px solid",
                      borderColor: "muted",
                      p: 1,
                      borderRadius: "default",
                    }}
                    type="number"
                    defaultValue="1"
                    min="1"
                    step="0.5"
                    onChange={e => setMultiplier(e.target.value)}
                  />
                </Flex>
              </div>
              <div
                sx={{
                  ...roundedBoxStyle,
                  p: 2,
                  backgroundColor: "muted",
                  mx: 2,
                  "@media print": {
                    p: 1,
                    m: 1,
                  },
                }}
              >
                <h2
                  sx={{
                    borderBottom: "1px solid gray",
                    fontSize: [5, 4],
                    mt: 0,
                    mb: 2,
                    pb: 2,
                    pl: 1,
                    "@media print": {
                      py: 1,
                      my: 1,
                      fontSize: 1,
                    },
                  }}
                >
                  Ingredients
                </h2>
                <IngredientList
                  ingredientPagePath={ingredientsTaxonomy.termPagePath}
                  ingredients={ingredients}
                  multiplier={multiplier}
                />
              </div>
            </div>
            <div
              sx={{
                "@media print": {
                  fontSize: "1",
                  "ul, ol": {
                    listStylePosition: "inside",
                  },
                },
              }}
            >
              <MDXRenderer>{mdxRecipe.body}</MDXRenderer>
            </div>
          </div>
        </PageContainer>
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
      yield {
        strings
        numbers
      }
      ingredients {
        type: __typename
        ... on RecipeIngredientEntry {
          ingredient
          ingredientSlug
          line {
            numbers
            strings
          }
        }
        ... on RecipeHeadingEntry {
          text
        }
      }
      frontmatter {
        title
        source
        author
        prep_time
        cook_time
        total_time
        image {
          childImageSharp {
            fluid(maxWidth: 1080) {
              ...GatsbyImageSharpFluid
            }
          }
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
