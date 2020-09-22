import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "dog.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage}>
      <SEO title="Home" />
      <h1 style={{ height: "1000px" }}>Home</h1>
    </Layout>
  )
}

export default IndexPage
