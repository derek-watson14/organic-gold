import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BandImage from "../components/imgs/bandImage"
import LinkButton from "../components/linkButton"
import ColorTitle from "../components/colorTitle"

const Band = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "band"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
      console.log(data[0])
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

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
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <div className="inner-container-band">
          <BandImage classes="band-image" />
          <div className="band-content-container">
            <div className="band-text-container">
              <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
              {getData("textContent", []).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
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
              {getData("buttonLinks", []).map((btn, i) => <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />)}
            </animated.div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Band
