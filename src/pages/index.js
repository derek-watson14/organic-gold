import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkButton from "../components/linkButton"

const IndexPage = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "dog.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#FC9D81"}>
      <SEO title="Home" />
      <section className="page-container horz-center">
        <div className="home-header-container">
          <div className="home-header-bg"></div>
          <h1 className="title-font home-header">What is Organic Gold?</h1>
        </div>
        <p className="home-text">Organic Gold is a musical project produced by Jonny Cole. Part studio, part band, part label, Organic Gold is a melting pot of collaborators and style. Jonny has spent over a decade touring, teaching, playing and recording professionally. Organic Gold is home base for genre-bending rock & roll.</p>
        <div className="button-container-home">
          <LinkButton text="the band" to="/band" />
          <LinkButton text="the studio" to="/studio" />
          <LinkButton text="contact jonny" to="/contact" />
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
