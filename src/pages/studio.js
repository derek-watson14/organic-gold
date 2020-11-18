import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"
import LinkButton from "../components/linkButton"

const Studio = () => {
  const [content, setContent] = useState(null);

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

  const getData = (key, alt = "") => content ? content[key] : alt;

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
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">

        <div className="studio-content">
          <div className="studio-content--text">
            <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
            <div className="studio-paragraphs">
              {getData("textContent", []).map((paragraph, i) => {
                return <p key={i}>{paragraph}</p>
              })}
            </div>
            {getData("buttonLinks", []).map((btn, i) => {
              return <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />
            })}
          </div>

          <div className="studio-content--image">
            <img src={getData("pageImageUrl")} />
          </div>
        </div>
      </div>
    
      <div className="container lists-container">
        <h2 className="header-font">{getData("subheader")}</h2>
        <div className="equipment-lists">
          {getData("lists", [])
            .filter(list => list.name !== "Previous Projects")
            .map((list, index) => {
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
          {getData("lists", [])
            .filter(list => list.listName === "Previous Projects")
            .map((item, i) => <h2 key={i} className="projects-header">{item.listName.toUpperCase()}</h2>)
          }
          {getData("lists", [])
            .filter(list => list.name === "Previous Projects")
            .map((list) => {
              return list.items.map((song, i) => {
                const src = `https://w.soundcloud.com/player/?url=${song}&color=1B1C1D&show_artwork=true&liking=false&sharing=false&show_user=true`;
                return <iframe key={i} className="soundcloud-player" scrolling="no" frameBorder="no" allow="autoplay" src={src}></iframe>;
              })
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Studio
