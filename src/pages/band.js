import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkButton from "../components/linkButton"
import ColorTitle from "../components/colorTitle"

const Band = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "band"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent({
        ...data[0],
        pageImageUrl: urlFor(data[0].pageImage).url(),
      });
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "alien.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#722A42"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <div className="band-content">

          <div className="band-content--image">
            <img src={getData("pageImageUrl")} />
          </div>

          <div className="band-content--text">
            <div className="band-text--text">
              <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
              {getData("textContent", []).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            <div className="band-text--buttons">
              {getData("buttonLinks", []).map((btn, i) => <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />)}
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Band
