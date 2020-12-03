import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import LinkButton from '../components/linkButton';

export const query = graphql`
  query NotFoundPageQuery {
    placeholderImage: file(relativePath: { eq: "pattern.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    sanityPages(pageName: { eq: "404" }) {
      tabTitle
      metaDescription
      pageHeader
      subheader
      buttonLinkList {
        buttonText
        toPage
        _key
      }
    }
  }
`;

const NotFoundPage = ({ data }) => {
  const { placeholderImage, sanityPages } = data;
  return (
    <Layout navImage={placeholderImage} fadeColor={'#B0C0A5'}>
      <SEO
        title={sanityPages.tabTitle}
        description={sanityPages.metaDescription}
      />
      <div className='container'>
        <div className='nf-container'>
          <ColorTitle text={sanityPages.pageHeader} marginBottom='35px' />
          <p className='page-p'>{sanityPages.subheader}</p>
          <div className='nf-button-container'>
            {sanityPages.buttonLinkList.map(({ buttonText, toPage, _key }) => {
              return (
                <LinkButton
                  key={_key}
                  text={buttonText}
                  to={`/${toPage ? toPage : ''}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NotFoundPage;
