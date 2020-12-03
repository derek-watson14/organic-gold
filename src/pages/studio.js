import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import LinkButton from '../components/linkButton';

import getLatestData from '../utils/getLatestData';
import emptyContent from '../utils/emptyContent';

export const query = graphql`
  query StudioPageQuery {
    image: file(relativePath: { eq: "mandarin.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const Studio = ({ data }) => {
  const [page, setPage] = useState(emptyContent);
  const { image } = data;

  useEffect(() => {
    getLatestData(String.raw`
      query {
        allPages(where: { pageName: { eq: "studio" } }) {
          pageHeader
          textContent
          buttonLinkList {
            buttonText
            toPage
            _key
          }
          pageImage {
            asset {
              url
            }
          }
          pageImageAlt
          subheader
          lists {
            name
            items
            _key
          }
          externalMedia {
            scSongList
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
    <Layout navImage={image} fadeColor={'#F0843B'}>
      <SEO
        title='The Studio'
        description='Information about the Organic Gold studio and equipment.'
      />
      <div className='container'>
        <div className='studio-content'>
          <div className='studio-content--text'>
            <ColorTitle text={page.pageHeader} marginBottom='50px' />
            <div className='studio-paragraphs'>
              {page.textContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {page.buttonLinkList.map(({ _key, buttonText, toPage }) => {
              return <LinkButton key={_key} text={buttonText} to={toPage} />;
            })}
          </div>

          <div className='studio-content--image'>
            <img
              src={page.pageImage.asset.url}
              alt={
                page.pageImageAlt
                  ? page.pageImageAlt
                  : 'The Organic gold studio'
              }
            />
          </div>
        </div>
      </div>

      <div className='container lists-container'>
        <h2 className='header-font'>{page.subheader}</h2>
        <div className='equipment-lists'>
          {page.lists.map((list) => {
            return (
              <div className='equipment-section' key={list._key}>
                <h3>{list.name}</h3>
                <ul>
                  {list.items.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className='container'>
        <div className='projects-container'>
          <h2 className='projects-header'>Previous Projects</h2>
          {page.externalMedia.scSongList.map((song, i) => {
            const src = `https://w.soundcloud.com/player/?url=${song}&color=1B1C1D&show_artwork=true&liking=false&sharing=false&show_user=true`;
            return (
              <iframe
                key={i}
                title={`soundcloud-song-${i}`}
                className='soundcloud-player'
                scrolling='no'
                frameBorder='no'
                allow='autoplay'
                src={src}
              ></iframe>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Studio;
