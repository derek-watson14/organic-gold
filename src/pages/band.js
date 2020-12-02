import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkButton from '../components/linkButton';
import ColorTitle from '../components/colorTitle';

export const query = graphql`
  query BandPageQuery {
    placeholderImage: file(relativePath: { eq: "alien.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    sanityPages(pageName: { eq: "band" }) {
      tabTitle
      metaDescription
      pageHeader
      pageImage {
        asset {
          url
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

const Band = ({ data }) => {
  return (
    <Layout navImage={data.placeholderImage} fadeColor={'#722A42'}>
      <SEO
        title={data.sanityPages.tabTitle}
        description={data.sanityPages.metaDescription}
      />
      <div className='container'>
        <div className='band-content'>
          <div className='band-content--image'>
            <img
              src={data.sanityPages.pageImage.asset.url}
              alt={
                data.sanityPages.pageImageAlt
                  ? data.sanityPages.pageImageAlt
                  : 'Organic Gold band live'
              }
            />
          </div>

          <div className='band-content--text'>
            <div className='band-text--text'>
              <ColorTitle
                text={data.sanityPages.pageHeader}
                marginBottom='50px'
              />
              {data.sanityPages.textContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className='band-text--buttons'>
              {data.sanityPages.buttonLinkList.map(
                ({ _key, buttonText, toPage }) => (
                  <LinkButton key={_key} text={buttonText} to={`/${toPage}`} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Band;
