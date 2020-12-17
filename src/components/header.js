import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Image from '../components/image';

const headerFade = (fadeColor) => {
  return {
    height: '41px',
    background: `linear-gradient(#CA4874, ${fadeColor})`,
    borderBottom: `4px ${fadeColor} solid`,
  };
};

const Header = ({ fadeColor }) => {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "banner-wide.png" }) {
        childImageSharp {
          fluid(maxWidth: 450, quality: 65) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  return (
    <>
      <header className='header-container'>
        <Image
          data={data.image}
          classes='header-image'
          backgroundColor='#CA4874'
        />
      </header>
      <div style={headerFade(fadeColor)}></div>
    </>
  );
};

// Home: #F8E100 // #FC9D81
// Band: #F3CCCD
// Studio: ##F0843B
// AV: #F8E100
// Shows: #1879AE

export default Header;
