import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkButton from '../components/linkButton';
import ColorTitle from '../components/colorTitle';

const Band = ({ data }) => {
  const { image, page } = data;
  console.log(page.pageImage.asset);

  return (
    <Layout navImage={image} fadeColor={'#722A42'}>
      <SEO title='The Band' description='About the Organic Gold band.' />
      <div className='container'>
        <div className='band-content'>
          <div className='band-content--image'>
            <Img fixed={page.pageImage.asset.fixed} alt={page.pageImageAlt} />
          </div>
          <div className='band-content--text'>
            <div className='band-text--text'>
              <ColorTitle text={page.pageHeader} marginBottom='50px' />
              {page.textContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className='band-text--buttons'>
              {page.buttonLinkList.map(({ _key, buttonText, toPage }) => (
                <LinkButton key={_key} text={buttonText} to={toPage} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Band;

export const query = graphql`
  query BandPageQuery {
    image: file(relativePath: { eq: "alien.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1080, quality: 70) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    page: sanityPages(pageName: { eq: "band" }) {
      pageHeader
      pageImage {
        asset {
          fixed(width: 600, height: 600) {
            ...GatsbySanityImageFixed
          }
        }
      }
      pageImageAlt
      pageHeader
      textContent
      buttonLinkList {
        buttonText
        toPage
        _key
      }
    }
  }
`;
