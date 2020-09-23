import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkButton from "../components/linkButton"

const IndexPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "dog.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#FC9D81"}>
      <SEO title="Home" />
      <animated.section
        className="container horz-center"
        ref={ref}
        style={useSpring({
          delay: 350,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          opacity: inView ? 1 : 0,
        })}
      >
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
      </animated.section>
    </Layout>
  )
}

export default IndexPage
