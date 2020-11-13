import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"


const AV = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "av"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

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
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
      <iframe width="560" height="315" src="https://www.youtube.com/embed/0trv6YOkWck" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </Layout>
  )
}

export default AV
