import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import client from "../sanity/client"

const Contact = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch page data from Sanity
    const query = '*[_type == "pages" && pageName == "contact"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
    })
  }, [])

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const getData = (key) => content ? content[key] : "";

  return (
    <Layout navImage={navImage} fadeColor={"#B0C0A5"}>
      <SEO title="Contact" description="Contact Jonny Cole and Organic Gold." />
      <h1 className="h-one" style={{ height: "500px" }}>{getData("pageHeader")}</h1>
    </Layout>
  )
}

export default Contact
