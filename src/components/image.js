import React from 'react';
import Img from 'gatsby-image';

const Image = ({ data, classes, backgroundColor }) => {
  if (!data?.childImageSharp?.fluid) {
    return <div>Picture not found</div>;
  }

  return (
    <Img
      backgroundColor={backgroundColor}
      className={classes}
      fluid={data.childImageSharp.fluid}
    />
  );
};

export default Image;
