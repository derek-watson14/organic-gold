import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactPlayer from "react-player"
import axios from "axios"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"


const AV = () => {
  const [content, setContent] = useState(null);
  const [instaPosts, setInstaPosts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "av"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
    })
  }, [])

  useEffect(() => {
    const igQueryString = "https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={%22id%22:%2222186333894%22,%22first%22:6}";
    axios.get(igQueryString)
      .then(res => {
        const postArray = res.data.data.user.edge_owner_to_timeline_media.edges;
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
          }
        })
        setInstaPosts(posts);
      })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "jonny.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#F8E100"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <div className="av-text-container">
          <ColorTitle text={getData("pageHeader")} marginBottom="10px" />
          {getData("textContent", []).map((para, i) => <p key={i} className="page-p av-p">{para}</p>)}
        </div>
        <div className="av-media-container">
          <div className="av-youtube-player">
            <h3 className="media-header">{getData("lists") ? getData("lists")[0].items[0] : ""}</h3>
            <iframe 
              src={getData("lists") ? getData("lists")[0].items[1] : ""}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
            />
          </div>
          <div className="av-soundcloud-playlist">
            <h3 className="media-header">{getData("lists") ? getData("lists")[1].items[0] : ""}</h3>
            <ReactPlayer
              url={getData("lists") ? getData("lists")[1].items[1] : ""}
              width={"100%"}
              height={425}
            />
          </div>
          <div className="av-instagram">
            <a href="https://www.instagram.com/organicgoldmusic/" target="_blank">
              <h3 className="media-header">@organicgoldmusic on Instagram</h3>
            </a>
            <hr />
            <div className="insta-grid">
              {instaPosts.map(post => {
                return (
                  <div key={post.id} className="post-container">
                    {post.isVideo 
                      ? (<video controls playsInline preload="metadata" poster={post.imageUrl}>
                          <source src={post.videoUrl} type="video/mp4" />
                          Your browser doesn't support this video display.
                         </video>)
                      : <img src={post.imageUrl} alt={post.caption} />
                    }
                    <div className={post.isVideo ? "hover-overlay video-o" : "hover-overlay"}>
                      <h4 className="post-caption">{post.caption}</h4>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AV
