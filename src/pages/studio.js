import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import imageUrlBuilder from '@sanity/image-url'

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

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
        <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
        <img style={{width: "100%", margin: 0 }} src={getData("pageImageUrl")} />
      </div>
      <div className="container listsContainer">
        <h2 className="header-font">{getData("subheader")}</h2>
        <div className="equipmentLists">
          {getData("lists", []).map(item => {
            return (
            <div className="equipmentSection">
              <h3>{item.listName}</h3>
              <ul>
                {item.listItem.map(subitem => {
                  return <li>{subitem}</li>
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
