import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

const BandImage = ({ classes }) => {
  const bandImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "band-show.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 720, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  console.log(bandImage)

  if (!bandImage?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img className={classes} fluid={bandImage.placeholderImage.childImageSharp.fluid} />
}

export default BandImage