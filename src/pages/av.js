import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactPlayer from "react-player"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"


const AV = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "av"]';
    const params = {};

    client.fetch(query, params).then(data => {
      console.log(data[0])
      setContent(data[0]);
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
          <div className="media-item-container">
            <h3 className="media-header">Organic Gold on YouTube</h3>
            <iframe 
              className="av-youtube-player" 
              src="https://www.youtube.com/embed/0trv6YOkWck" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
            />
          </div>
          <div className="media-item-container">
            <h3 className="media-header">Organic Gold on SoundCloud</h3>
            <ReactPlayer
              // https://www.npmjs.com/package/react-instagram-embed
              className="av-soundcloud-playlist"
              url="https://soundcloud.com/user-66808316"
              width={"100%"}
              height={425}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AV
