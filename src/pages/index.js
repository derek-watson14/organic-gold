import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkButton from "../components/linkButton"
import ColorTitle from "../components/colorTitle"
import emptyContent from "../helpers/emptyContent"


const IndexPage = () => {
  const [content, setContent] = useState(emptyContent);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "home"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
    })
  }, [])

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
      <SEO title={content.tabTitle} description={content.metaDescription} />
      <section className="container horz-center">
        <ColorTitle text={content.pageHeader} marginBottom="75px" />
        {content.textContent.map((paragraph, i) => <p key={i} className="home-text">{paragraph}</p>)}
        <div className="button-container-home">
          {content.buttonLinks.map((btn, i) => <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />)}
        </div>
      </section>
    </Layout >
  )
}

export default IndexPage
