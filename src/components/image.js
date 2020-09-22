import React from "react"
import Img from "gatsby-image"

const Image = ({ data, style = {} }) => {
  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img style={style} fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Image
