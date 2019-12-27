/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { Heading } from "@theme-ui/components"
import { useReducer } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { BigHeader } from "../components/Header"
import PageContainer from "../components/PageContainer"
import PostCard from "../components/PostCard"
import pluralize from "../utils/pluralize"
import RoundedBox, { roundedBoxStyle } from "../components/RoundedBox"

const FilterInput = ({ styles, currentFilter, entryCount, onFilter }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onFilter(e.target["q"].value)
      }}
      sx={{
        mt: 3,
        mb: 4,
        mx: "auto",
        fontSize: 3,
        maxWidth: "550px",
      }}
    >
      <input
        type="text"
        name="q"
        placeholder="Filter"
        onBlur={e => onFilter(e.target.value)}
        onChange={e => {
          if (!e.target.value) onFilter(null)
        }}
        aria-label="Filter Terms"
        sx={{
          ...roundedBoxStyle,
          backgroundColor: "muted",
          height: "2.5em",
          border: "none",
          m: 0,
          p: 2,
          width: "100%",
        }}
      />
      {currentFilter && (
        <div
          sx={{
            py: 2,
            fontSize: 2,
            color: "#AAA",
            textAlign: "center",
          }}
        >
          {entryCount} result{pluralize(entryCount)} for "{currentFilter}"
        </div>
      )}
    </form>
  )
}

const filterReducer = (state, input) => {
  if (!input) return null
  return input.toLowerCase()
}

export default ({
  data: {
    taxonomy: { termPagePath, label, terms },
  },
}) => {
  const [filter, updateFilter] = useReducer(filterReducer, null)

  const subtitle = `Taxonomy with ${terms.totalCount} term${pluralize(
    terms.totalCount
  )}.`

  const edges = filter
    ? terms.edges.filter(({ term: { label } }) =>
        label.toLowerCase().includes(filter)
      )
    : terms.edges

  return (
    <Layout title={label} subtitle={subtitle}>
      <BigHeader title={label} subtitle={subtitle} />
      <PageContainer
        styles={{
          p: 3,
          maxWidth: "maxContentWidth",
        }}
      >
        <FilterInput
          onFilter={updateFilter}
          currentFilter={filter}
          entryCount={edges.length}
        />
        <ul
          sx={{
            listStyle: "none",
            m: 2,
            px: 0,
          }}
        >
          {edges.map(({ count, term: { label, slug } }) => (
            <li>
              <Link
                to={`${termPagePath}/${slug}`}
                sx={{
                  ...roundedBoxStyle,
                  fontWeight: "bold",
                  px: [3, 2],
                  my: 3,
                  lineHeight: ["48px", 2.5],
                  minHeight: ["48px", 0],
                  maxWidth: "500px",
                  mx: "auto",
                  fontSize: [3, 2],
                  transition: "all 0.4s ease",
                  backgroundColor: "muted",
                  "&:hover": {
                    transform: "translate3D(0,-1px,0) scale(1.02)",
                  },
                }}
              >
                {label} ({count})
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </Layout>
  )
}

export const query = graphql`
  query TaxonomyPageQuery($id: String!) {
    taxonomy(id: { eq: $id }) {
      key
      label
      termPagePath
      terms {
        totalCount
        edges {
          count
          term {
            label
            slug
          }
        }
      }
    }
  }
`
