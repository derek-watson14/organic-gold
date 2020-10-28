import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"


const Contact = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "contact"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

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

  return (
    <Layout navImage={navImage} fadeColor={"#B0C0A5"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
    </Layout>
  )
}

export default Contact
