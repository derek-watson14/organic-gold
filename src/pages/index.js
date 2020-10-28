import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkButton from "../components/linkButton"
import ColorTitle from "../components/colorTitle"

const IndexPage = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "home"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "dog.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#FC9D81"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <section className="container horz-center">
        <ColorTitle text={getData("pageHeader")} marginBottom="75px" />
        {getData("textContent", []).map((paragraph, i) => {
          return <p key={i} className="home-text">{paragraph}</p>
        })}
        <div className="button-container-home">
          {getData("buttonLinks", []).map((btn, i) => <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />)}
        </div>
      </section>
    </Layout >
  )
}

export default IndexPage
