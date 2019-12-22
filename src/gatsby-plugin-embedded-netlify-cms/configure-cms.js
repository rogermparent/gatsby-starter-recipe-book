import originalConfigurator from "gatsby-plugin-embedded-netlify-cms/src/configure-cms"
import CreatableSelect from "../components/creatable-select"
import IngredientList from "../components/ingredient-list"

export default ({CMS, config}) => {
  originalConfigurator({CMS, config})
  CMS.registerWidget("create-select", CreatableSelect)
  CMS.registerWidget("ingredient-list", IngredientList)
}
