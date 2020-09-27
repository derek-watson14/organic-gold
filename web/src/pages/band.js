import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BandImage from "../components/imgs/bandImage"
import LinkButton from "../components/linkButton"
import ColorTitle from "../components/colorTitle"

const Band = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

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
      <SEO title="The Band" description="About the Organic Gold band." />
      <div className="container">
        <div className="inner-container-band">
          <BandImage classes="band-image" />
          <div className="band-content-container">
            <div className="band-text-container">
              <ColorTitle text="The Band" marginBottom="50px" />
              <p>
                Organic Gold is a rotating bill of musicians. Founded in 2017 by Jonny Cole and Matt _____, original songs were written and recorded on Bainbridge Island. In 2018 Organic Gold merged with Four Common Sailing Knots and a new era of songwriting and performance emerged with Morgan Taggart on drums, Stephanie ___ on keys, Matt ___ on lead guitar and vocals, and Jonny Cole on bass.
              </p>
              <p>
                Now Jonny Cole is working with The Black Chevys to introduce a new sound to the Organic Gold cannon.
              </p>
            </div>
            <animated.div
              className="button-container-band"
              ref={ref}
              style={useSpring({
                delay: 350,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                opacity: inView ? 1 : 0,
              })}
            >
              <LinkButton text="shows" to="/shows" />
              <LinkButton text="a/v" to="/av" />
            </animated.div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Band
