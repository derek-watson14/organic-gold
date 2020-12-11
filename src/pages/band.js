import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkButton from '../components/linkButton';
import ColorTitle from '../components/colorTitle';

import getLatestData from '../utils/getLatestData';
import emptyContent from '../utils/emptyContent';

export const query = graphql`
  query BandPageQuery {
    image: file(relativePath: { eq: "alien.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 50) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const Band = ({ data }) => {
  const [page, setPage] = useState(emptyContent);
  const { image } = data;

  useEffect(() => {
    getLatestData(String.raw`
      query {
        allPages(where: { pageName: { eq: "band" } }) {
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
    `)
      .then((data) => setPage(data.allPages[0]))
      .catch((err) => {
        console.log('An error has occurred: ', err);
      });
  }, []);

  return (
    <Layout navImage={image} fadeColor={'#722A42'}>
      <SEO title='The Band' description='About the Organic Gold band.' />
      <div className='container'>
        <div className='band-content'>
          <div className='band-content--image'>
            <img
              src={page.pageImage.asset.url}
              alt={
                page.pageImageAlt ? page.pageImageAlt : 'Organic Gold band live'
              }
            />
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
