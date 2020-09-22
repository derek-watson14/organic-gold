import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Image from "../components/image"

const headerFade = (fadeColor) => {
  return {
    height: "41px",
    background: `linear-gradient(#E34077, ${fadeColor})`,
    borderBottom: `4px ${fadeColor} solid`,
  }
}

const Header = ({ fadeColor }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "banner-wider.png" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <>
      <header className="header-container">
        <Image data={data} classes="header-image" />
      </header>
      <div style={headerFade(fadeColor)}></div>
    </>
  )
}

// Home: #F8E100 // #FC9D81
// Band: #F3CCCD
// Studio: ##F0843B
// AV: #F8E100
// Shows: #1879AE

export default Header
