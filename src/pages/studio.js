import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import LinkButton from '../components/linkButton';

export const query = graphql`
  query StudioPageQuery {
    placeholderImage: file(relativePath: { eq: "mandarin.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    sanityPages(pageName: { eq: "studio" }) {
      tabTitle
      metaDescription
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
`;

const Studio = ({ data }) => {
  return (
    <Layout navImage={data.placeholderImage} fadeColor={'#F0843B'}>
      <SEO
        title={data.sanityPages.tabTitle}
        description={data.sanityPages.metaDescription}
      />
      <div className='container'>
        <div className='studio-content'>
          <div className='studio-content--text'>
            <ColorTitle
              text={data.sanityPages.pageHeader}
              marginBottom='50px'
            />
            <div className='studio-paragraphs'>
              {data.sanityPages.textContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {data.sanityPages.buttonLinkList.map((btn) => {
              return (
                <LinkButton
                  key={btn._key}
                  text={btn.buttonText}
                  to={`/${btn.toPage}`}
                />
              );
            })}
          </div>

          <div className='studio-content--image'>
            <img
              src={data.sanityPages.pageImage.asset.url}
              alt={
                data.sanityPages.pageImageAlt
                  ? data.sanityPages.pageImageAlt
                  : 'The Organic gold studio'
              }
            />
          </div>
        </div>
      </div>

      <div className='container lists-container'>
        <h2 className='header-font'>{data.sanityPages.subheader}</h2>
        <div className='equipment-lists'>
          {data.sanityPages.lists.map((list) => {
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
          {data.sanityPages.externalMedia.scSongList.map((song, i) => {
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
