import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkButton from '../components/linkButton';
import ColorTitle from '../components/colorTitle';

export const query = graphql`
  query IndexPageQuery {
    placeholderImage: file(relativePath: { eq: "dog.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    sanityPages(pageName: { eq: "home" }) {
      tabTitle
      metaDescription
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

const IndexPage = ({ data }) => {
  return (
    <Layout navImage={data.placeholderImage} fadeColor={'#FC9D81'}>
      <SEO
        title={data.sanityPages.tabTitle}
        description={data.sanityPages.metaDescription}
      />
      <section className='container horz-center'>
        <ColorTitle text={data.sanityPages.pageHeader} marginBottom='75px' />
        {data.sanityPages.textContent.map((paragraph, i) => (
          <p key={i} className='home-text'>
            {paragraph}
          </p>
        ))}
        <div className='button-container-home'>
          {data.sanityPages.buttonLinkList.map(
            ({ _key, buttonText, toPage }) => (
              <LinkButton key={_key} text={buttonText} to={`/${toPage}`} />
            ),
          )}
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
