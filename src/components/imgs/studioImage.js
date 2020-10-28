import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

const StudioImage = ({ classes }) => {
  const studioImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "studio-stock.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 720, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!studioImage?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img className={classes} fluid={studioImage.placeholderImage.childImageSharp.fluid} />
}

export default StudioImage