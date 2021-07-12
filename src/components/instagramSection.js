import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// ! Instagram has blocked this method of getting data without login or API key
// ! Currently no fix has been found besides creating an app

const InstagramPosts = ({ username, profile }) => {
  const [instaPosts, setInstaPosts] = useState([]);

  useEffect(() => {
    const igQueryString = `https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&id=22186333894&first=12`;
    axios
      .get(igQueryString)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  });

  const concatCaption = (caption) => {
    if (caption.length > 247) {
      return `${caption.slice(0, 247)}...`;
    } else {
      return caption;
    }
  };

  return (
    <div className='av-instagram'>
      <a href={profile} target='_blank' rel='noreferrer'>
        <h3 className='media-header'>
          <span className='ig-username'>{username}</span> on Instagram
          <FontAwesomeIcon icon={faInstagram} size='1x' className='ig-icon' />
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
                  {post.isVideo ? concatCaption(post.caption) : post.caption}
                </h4>
              </div>
              <a href={post.postUrl} target='_blank' rel='noreferrer'>
                <h3 className='ig-post-link'>View on Instagram &gt;&gt;</h3>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstagramPosts;
