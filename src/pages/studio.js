import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"
import LinkButton from "../components/linkButton"
import emptyContent from "../helpers/emptyContent"

const Studio = () => {
  const [content, setContent] = useState(emptyContent);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "studio"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent({
        ...data[0],
        pageImageUrl: urlFor(data[0].pageImage).url(),
      });
    })
  }, [])

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "mandarin.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#F0843B"}>
      <SEO title={content.tabTitle} description={content.metaDescription} />
      <div className="container">

        <div className="studio-content">
          <div className="studio-content--text">
            <ColorTitle text={content.pageHeader} marginBottom="50px" />
            <div className="studio-paragraphs">
              {content.textContent.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            {content.buttonLinks.map((btn, i) => {
              return <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />
            })}
          </div>

          <div className="studio-content--image">
            <img src={content.pageImageUrl} />
          </div>
        </div>
      </div>
    
      <div className="container lists-container">
        <h2 className="header-font">{content.subheader}</h2>
        <div className="equipment-lists">
          {content.lists.map((list, index) => {
              return (
                <div className="equipment-section" key={index}>
                  <h3>{list.name}</h3>
                  <ul>
                    {list.items.map((item, index) => {
                      return <li key={index}>{item}</li>
                    })}
                  </ul>
                </div>
              )
          })}
        </div>
      </div>
      <div className="container">
        <div className="projects-container">
          <h2 className="projects-header">Previous Projects</h2>
          {content.externalMedia.scSongList.map((song, i) => {
              const src = `https://w.soundcloud.com/player/?url=${song}&color=1B1C1D&show_artwork=true&liking=false&sharing=false&show_user=true`;
              return <iframe key={i} className="soundcloud-player" scrolling="no" frameBorder="no" allow="autoplay" src={src}></iframe>;
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Studio
