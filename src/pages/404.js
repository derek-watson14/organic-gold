import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import LinkButton from '../components/linkButton';

const NotFoundPage = ({ data }) => {
  const { image, page } = data;

  return (
    <Layout navImage={image} fadeColor={'#B0C0A5'}>
      <SEO
        title='404: Not Found'
        description='The Organic Gold Music page you are looking for does not exist!'
      />
      <div className='container'>
        <div className='nf-container'>
          <ColorTitle text={page.pageHeader} marginBottom='35px' />
          <p className='page-p'>{page.subheader}</p>
          <div className='nf-button-container'>
            {page.buttonLinkList.map(({ buttonText, toPage, _key }) => {
              return <LinkButton key={_key} text={buttonText} to={toPage} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
  query NotFoundPageQuery {
    image: file(relativePath: { eq: "pattern.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 50) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    page: sanityPages(pageName: { eq: "404" }) {
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
