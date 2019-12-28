const { splitByNumbers } = require(`./string-number-multiplier`)

const makeRecipeFieldData = ({ node, getNode, originalFieldData }) => {
  const { frontmatter } = node
  const ingredients = frontmatter.ingredients.map(
    ({ type, label, ingredient, text }) => {
      switch (type) {
        case "heading":
          return {
            type: "RecipeHeadingEntry",
            text,
          }
        case "ingredient":
        default:
          return {
            type: "RecipeIngredientEntry",
            ingredient,
            line: splitByNumbers(label),
          }
      }
    }
  )

  return {
    ...originalFieldData,
    yield: splitByNumbers(frontmatter.yield),
    name: frontmatter.name || frontmatter.title,
    ingredients,
  }
}

module.exports = makeRecipeFieldData
