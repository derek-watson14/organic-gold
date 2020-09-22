import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Image from "../components/image"

const Header = () => {
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
    <header style={{ minHeight: "150px" }}>
      <Image data={data} style={{ minHeight: "150px" }} />
    </header>
  )
}

export default Header
