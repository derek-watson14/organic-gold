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

  console.log(content)

  return (
    <Layout navImage={navImage} fadeColor={"#F0843B"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <div className="studioContent">
          <div className="studioTextContent">
            <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
            <div className="studioParagraphs">
              {getData("textContent", []).map((paragraph, i) => {
                return <p key={i}>{paragraph}</p>
              })}
            </div>
            {getData("buttonLinks", []).map((btn, i) => {
              return <LinkButton key={i} text={btn.buttonText} to={btn.toPage} />
            })}
          </div>
          <div className="studioImageContainer">
            <img style={{width: "100%", margin: 0 }} src={getData("pageImageUrl")} />
          </div>
        </div>
      </div>
      <div className="container listsContainer">
        <h2 className="header-font">{getData("subheader")}</h2>
        <div className="equipmentLists">
          {getData("lists", []).map((item, index) => {
            return (
            <div className="equipmentSection" key={index}>
              <h3>{item.listName}</h3>
              <ul>
                {item.listItem.map((subitem, index) => {
                  return <li key={index}>{subitem}</li>
                })}
              </ul>
            </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Studio
