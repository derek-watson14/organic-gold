import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Studio = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "mandarin.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#F0843B"}>
      <SEO title="The Studio" description="About the Organic Gold studio." />
      <h1 className="h-one" style={{ height: "500px" }}>The Studio</h1>
    </Layout>
  )
}

export default Studio
