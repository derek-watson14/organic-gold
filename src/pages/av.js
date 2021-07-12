import React from 'react';
import { graphql } from 'gatsby';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSoundcloud } from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
// import InstagramSection from '../components/instagramSection';

const AV = ({ data }) => {
  const { image, page } = data;

  return (
    <Layout navImage={image} fadeColor={'#E34077'}>
      <SEO
        title='Audiovisual'
        description='A selection of music recorded and played by Organic Gold.'
      />
      <div className='container'>
        <div className='av-text-container'>
          <ColorTitle text={page.pageHeader} marginBottom='10px' />
          {page.textContent.map((para, i) => (
            <p key={i} className='page-p av-p'>
              {para}
            </p>
          ))}
        </div>
        <div className='av-media-container'>
          <div className='av-youtube-player'>
            <a
              href={page.externalMedia.youTubeVideo.channel}
              target='_blank'
              rel='noreferrer'
            >
              <h3 className='media-header'>
                {page.externalMedia.youTubeVideo.header}
                <FontAwesomeIcon
                  icon={faYoutube}
                  size='lg'
                  className='media-head-icon'
                />
              </h3>
            </a>
            <iframe
              src={page.externalMedia.youTubeVideo.link}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='YouTubePlayer'
            />
          </div>
          <div className='av-soundcloud-playlist'>
            <a
              href={page.externalMedia.scPlayer.user}
              target='_blank'
              rel='noreferrer'
            >
              <h3 className='media-header'>
                {page.externalMedia.scPlayer.header}
                <FontAwesomeIcon
                  icon={faSoundcloud}
                  size='lg'
                  className='media-head-icon'
                />
              </h3>
            </a>
            <ReactPlayer
              url={page.externalMedia.scPlayer.link}
              width={'100%'}
              height={425}
            />
          </div>
          {/* This section has been blocked by instagram without key:
          <InstagramSection
            username={page.externalMedia.instagram.username}
            profile={page.externalMedia.instagram.profile}
          /> 
          */}
        </div>
      </div>
    </Layout>
  );
};

export default AV;

export const query = graphql`
  query AvPageQuery {
    image: file(relativePath: { eq: "jonny.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 75) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    page: sanityPages(pageName: { eq: "av" }) {
      pageHeader
      textContent
      externalMedia {
        youTubeVideo {
          header
          link
          channel
        }
        scPlayer {
          user
          header
          link
        }
        instagram {
          profile
          username
          postCount
        }
      }
    }
  }
`;
