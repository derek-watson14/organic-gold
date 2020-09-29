import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const Shows = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "mountain.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#1879AE"}>
      <SEO title="Shows" description="Future Organic Gold shows." />
      <h1 className="h-one" style={{ height: "500px" }}>Shows</h1>
    </Layout>
  )
}

export default Shows
