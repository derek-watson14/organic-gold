import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faSoundcloud,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import client from '../sanity/client';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import emptyContent from '../helpers/emptyContent';

const AV = () => {
  const [content, setContent] = useState(emptyContent);
  const [instaPosts, setInstaPosts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "av"]';
    const params = {};

    client.fetch(query, params).then((data) => {
      setContent(data[0]);
    });
  }, []);

  useEffect(() => {
    const igQueryString =
      'https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={%22id%22:%2222186333894%22,%22first%22:6}';
    axios.get(igQueryString).then((res) => {
      const postArray = res.data.data.user.edge_owner_to_timeline_media.edges;
      console.log(postArray);
      const posts = postArray.map((postData) => {
        const post = postData.node;
        return {
          id: post.id,
          imageUrl: post.display_url,
          caption: post.edge_media_to_caption.edges[0].node.text,
          location: post.location,
          likes: post.edge_media_preview_like.count,
          isVideo: post.is_video,
          videoUrl: post.is_video && post.video_url,
          postUrl: `https://www.instagram.com/p/${post.shortcode}/`,
        };
      });
      setInstaPosts(posts);
    });
  }, []);

  const concatCaption = (caption) => {
    if (caption.length > 247) {
      return `${caption.slice(0, 247)}...`;
    } else {
      return caption;
    }
  };

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "jonny.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  return (
    <Layout navImage={navImage} fadeColor={'#F8E100'}>
      <SEO title={content.tabTitle} description={content.metaDescription} />
      <div className='container'>
        <div className='av-text-container'>
          <ColorTitle text={content.pageHeader} marginBottom='10px' />
          {content.textContent.map((para, i) => (
            <p key={i} className='page-p av-p'>
              {para}
            </p>
          ))}
        </div>
        <div className='av-media-container'>
          <div className='av-youtube-player'>
            <a
              href='https://www.youtube.com/channel/UCxH2v_DVDTZD_mGCvlz-b3g/'
              target='_blank'
              rel='noreferrer'
            >
              <h3 className='media-header'>
                {content.externalMedia.youTubeVideo.header}
                <FontAwesomeIcon
                  icon={faYoutube}
                  size='lg'
                  className='media-head-icon'
                />
              </h3>
            </a>
            <iframe
              src={content.externalMedia.youTubeVideo.link}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='YouTubePlayer'
            />
          </div>
          <div className='av-soundcloud-playlist'>
            <a
              href='https://soundcloud.com/user-66808316/'
              target='_blank'
              rel='noreferrer'
            >
              <h3 className='media-header'>
                {content.externalMedia.scPlayer.header}
                <FontAwesomeIcon
                  icon={faSoundcloud}
                  size='lg'
                  className='media-head-icon'
                />
              </h3>
            </a>
            <ReactPlayer
              url={content.externalMedia.scPlayer.link}
              width={'100%'}
              height={425}
            />
          </div>
          <div className='av-instagram'>
            <a
              href='https://www.instagram.com/organicgoldmusic/'
              target='_blank'
              rel='noreferrer'
            >
              <h3 className='media-header'>
                <span className='ig-username'>@organicgoldmusic</span> on
                Instagram
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
