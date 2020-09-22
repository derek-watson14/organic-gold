import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#B0C0A5"}>
      <SEO title="Contact" description="Contact Jonny Cole and Organic Gold." />
      <h1 className="h-one" style={{ height: "500px" }}>Contact</h1>
    </Layout>
  )
}

export default Contact
