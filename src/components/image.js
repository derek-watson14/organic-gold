import React from "react"
import Img from "gatsby-image"

const Image = ({ data, classes, backgroundColor }) => {
  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img backgroundColor={backgroundColor} className={classes} fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Image
