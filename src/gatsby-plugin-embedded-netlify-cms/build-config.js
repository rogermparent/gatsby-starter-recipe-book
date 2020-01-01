const buildConfig = async ({graphql}) => {
  const {data, errors} = await graphql(`
    {
      allTaxonomy {
        nodes {
          key
          terms {
            edges {
              term {
                slug
                label
              }
            }
          }
        }
      }
    }
  `)

  if(errors) throw errors;

  const taxonomies = {};

  for (const { key, terms } of data.allTaxonomy.nodes) {
    taxonomies[key] = terms.edges.map(({ term }) => term.label);
  }

  const configResult = {
    backend: {
      name: "git-gateway",
      branch: "master",
    },
    load_config_file: false,
    media_folder: "static/uploads",
    public_folder: "/uploads",
    collections: [
      {
        label: "Pages",
        label_singular: "page",
        name: "pages",
        folder: "content",
        extension: "mdx",
        format: "yaml-frontmatter",
        create: true,
        fields: [
          { label: "Title", name: "title", widget: "string" },
          {
            label: "Page Heading",
            name: "pageHeading",
            widget: "string",
            required: false,
          },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },
      {
        label: "Recipes",
        label_singular: "recipe",
        name: "recipes",
        folder: "content/recipes",
        extension: "mdx",
        format: "yaml-frontmatter",
        create: true,
        fields: [
          { label: "Image", name: "image", widget: "image" },
          { label: "Title", name: "title", widget: "string" },
          {
            label: "Description",
            name: "description",
            widget: "text",
            required: false,
          },
          { label: "Source", name: "source", widget: "string" },
          { label: "Author", name: "author", widget: "string" },
          { label: "Prep Time", name: "prep_time", widget: "string" },
          { label: "Cook Time", name: "cook_time", widget: "string" },
          { label: "Total Time", name: "total_time", widget: "string" },
          {
            label: "Categories",
            name: "categories",
            widget: "create-select",
            multiple: true,
            options: taxonomies.categories,
          },
          {
            label: "Cuisines",
            name: "cuisines",
            widget: "create-select",
            multiple: true,
            options: taxonomies.cuisines,
          },
          {
            label: "Cooking Methods",
            name: "methods",
            widget: "create-select",
            multiple: true,
            options: taxonomies.methods,
          },
          {
            label: "Yield",
            name: "yield",
            widget: "string",
          },
          {
            label: "Ingredients",
            label_singular: "Ingredient",
            name: "ingredients",
            widget: "ingredient-list",
            types: [
              {
                label: "Ingredient",
                name: "ingredient",
                widget: "object",
                fields: [
                  {
                    label: "Ingredient entry",
                    name: "label",
                    widget: "string",
                  },
                  {
                    label: "Ingredient tag",
                    name: "ingredient",
                    widget: "create-select",
                    options: taxonomies.ingredients,
                    required: false,
                  },
                ],
              },
              {
                label: "Heading",
                name: "heading",
                widget: "string",
                field: { label: "Text", name: "text", widget: "string" },
              },
            ],
          },
          { label: "Instructions", name: "body", widget: "markdown" },
        ],
      },
    ],
  }

  return configResult
}

module.exports = buildConfig
