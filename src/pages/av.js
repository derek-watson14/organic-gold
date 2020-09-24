import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const AV = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "jonny.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#F8E100"}>
      <SEO title="A/V" description="A selection of music recorded by Organic Gold." />
      <h1 className="h-one" style={{ height: "500px" }}>AV</h1>
    </Layout>
  )
}

export default AV
