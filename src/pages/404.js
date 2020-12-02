import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import LinkButton from '../components/linkButton';

const NotFoundPage = () => {
  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  return (
    <Layout navImage={navImage.placeholderImage} fadeColor={'#B0C0A5'}>
      <SEO title='404: Not found' />
      <div className='container'>
        <div className='nf-container'>
          <ColorTitle text={'404: Page Not Found'} marginBottom='35px' />
          <p className='page-p'>
            Something went wrong! The page you were searching for doesn't exist.
          </p>
          <div className='nf-button-container'>
            <LinkButton text={'home'} to={'/home'} />
            <LinkButton text={'contact'} to={'/contact'} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NotFoundPage;
