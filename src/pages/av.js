import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faSoundcloud,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';

import getLatestData from '../utils/getLatestData';
import emptyContent from '../utils/emptyContent';

export const query = graphql`
  query AvPageQuery {
    image: file(relativePath: { eq: "jonny.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 50) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const AV = ({ data }) => {
  const [page, setPage] = useState(emptyContent);
  const { image } = data;

  useEffect(() => {
    getLatestData(String.raw`
      query {
        allPages(where: { pageName: { eq: "av" } }) {
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
    `)
      .then((data) => setPage(data.allPages[0]))
      .catch((err) => {
        console.log('An error has occurred: ', err);
      });
  }, []);

  const [instaPosts, setInstaPosts] = useState([]);

  useEffect(() => {
    const igQueryString = `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={%22id%22:%2222186333894%22,%22first%22:${page.externalMedia.instagram.postCount}}`;
    axios.get(igQueryString).then((res) => {
      const postArray = res.data.data.user.edge_owner_to_timeline_media.edges;
      const posts = postArray.map(({ node }) => {
        return {
          id: node.id,
          imageUrl: node.display_url,
          caption: node.edge_media_to_caption.edges[0].node.text,
          location: node.location,
          likes: node.edge_media_preview_like.count,
          isVideo: node.is_video,
          videoUrl: node.is_video && node.video_url,
          postUrl: `https://www.instagram.com/p/${node.shortcode}/`,
        };
      });
      setInstaPosts(posts);
    });
  }, [page.externalMedia.instagram.postCount]);

  const concatCaption = (caption) => {
    if (caption.length > 247) {
      return `${caption.slice(0, 247)}...`;
    } else {
      return caption;
    }
  };

  return (
    <Layout navImage={image} fadeColor={'#F8E100'}>
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
          <div className='av-instagram'>
            <a
              href={page.externalMedia.instagram.profile}
              target='_blank'
              rel='noreferrer'
            >
              <h3 className='media-header'>
                <span className='ig-username'>
                  {page.externalMedia.instagram.username}
                </span>{' '}
                on Instagram
                <FontAwesomeIcon
                  icon={faInstagram}
                  size='1x'
                  className='ig-icon'
                />
              </h3>
            </a>
            <hr />
            <div className='insta-grid'>
              {instaPosts.map((post) => {
                return (
                  <div key={post.id} className='post-container'>
                    {post.isVideo ? (
                      <video controls poster={post.imageUrl}>
                        <source src={post.videoUrl} type='video/mp4' />
                        Your browser doesn't support this video display.
                      </video>
                    ) : (
                      <img src={post.imageUrl} alt={post.caption} />
                    )}
                    <div
                      className={
                        post.isVideo ? 'hover-overlay video-o' : 'hover-overlay'
                      }
                    >
                      <h4 className='post-caption'>
                        {post.isVideo
                          ? concatCaption(post.caption)
                          : post.caption}
                      </h4>
                    </div>
                    <a href={post.postUrl} target='_blank' rel='noreferrer'>
                      <h3 className='ig-post-link'>
                        View on Instagram &gt;&gt;
                      </h3>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AV;
