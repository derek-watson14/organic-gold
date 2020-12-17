import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkButton from '../components/linkButton';
import ColorTitle from '../components/colorTitle';

const IndexPage = ({ data }) => {
  const { image, page } = data;

  return (
    <Layout navImage={image} fadeColor={'#FC9D81'}>
      <SEO
        title='Home'
        description='Organic Gold is a professional recording studio and band based on Bainbridge Island, WA.'
      />
      <section className='container horz-center'>
        <ColorTitle text={page.pageHeader} marginBottom='75px' />
        {page.textContent.map((paragraph, i) => (
          <p key={i} className='home-text'>
            {paragraph}
          </p>
        ))}
        <div className='button-container-home'>
          {page.buttonLinkList.map(({ _key, buttonText, toPage }) => (
            <LinkButton key={_key} text={buttonText} to={toPage} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    image: file(relativePath: { eq: "dog.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1080, quality: 60) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    page: sanityPages(pageName: { eq: "home" }) {
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
