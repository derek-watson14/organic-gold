import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Img from 'gatsby-image';

const Header = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "banner-wide.png" }) {
        childImageSharp {
          fluid(maxWidth: 2400, quality: 85) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  return (
    <>
      <header className='header-container'>
        <Img
          fluid={image.childImageSharp.fluid}
          className='header-image'
          backgroundColor='#CA4874'
          fadeIn={false}
        />
      </header>
    </>
  );
};

// Home: #F8E100 // #FC9D81
// Band: #F3CCCD
// Studio: #F0843B
// AV: #F8E100
// Shows: #1879AE

export default Header;
