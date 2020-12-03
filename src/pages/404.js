import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import LinkButton from '../components/linkButton';

import getLatestData from '../utils/getLatestData';
import emptyContent from '../utils/emptyContent';

export const query = graphql`
  query NotFoundPageQuery {
    image: file(relativePath: { eq: "pattern.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const NotFoundPage = ({ data }) => {
  const [page, setPage] = useState(emptyContent);
  const { image } = data;

  useEffect(() => {
    getLatestData(String.raw`
      query {
        allPages(where: { pageName: { eq: "404" } }) {
          pageHeader
          subheader
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
