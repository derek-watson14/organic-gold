import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkButton from "../components/linkButton"
import ColorTitle from "../components/colorTitle"
import emptyContent from "../helpers/emptyContent"


const Band = () => {
  const [content, setContent] = useState(emptyContent);

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

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "alien.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#722A42"}>
      <SEO title={content.tabTitle} description={content.metaDescription} />
      <div className="container">
        <div className="band-content">

          <div className="band-content--image">
            <img src={content.pageImageUrl} />
          </div>

          <div className="band-content--text">
            <div className="band-text--text">
              <ColorTitle text={content.pageHeader} marginBottom="50px" />
              {content.textContent.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            <div className="band-text--buttons">
              {content.buttonLinks.map((btn, i) => <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Band
