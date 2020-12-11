import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkButton from '../components/linkButton';
import ColorTitle from '../components/colorTitle';

import getLatestData from '../utils/getLatestData';
import emptyContent from '../utils/emptyContent';

export const query = graphql`
  query IndexPageQuery {
    image: file(relativePath: { eq: "dog.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 55) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const [page, setPage] = useState(emptyContent);
  const { image } = data;

  useEffect(() => {
    getLatestData(String.raw`
      query {
        allPages(where: { pageName: { eq: "home" } }) {
          pageHeader
          textContent
          buttonLinkList {
            buttonText
            toPage
            _key
          }
        }
      }
    `)
      .then((data) => setPage(data.allPages[0]))
      .catch((err) => {
        console.log('An error has occurred: ', err);
      });
  }, []);

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
