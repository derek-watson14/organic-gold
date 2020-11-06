import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"
import ShowCard from "../components/showCard"


const Shows = () => {
  const [content, setContent] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const today = new Date;
    const contentQuery = '*[_type == "pages" && pageName == "shows"]';
    const showQuery = '*[_type == "shows"]';
    const params = {};

    client.fetch(contentQuery, params).then(data => {
      setContent(data[0]);
    })

    console.log(today)
    client.fetch(showQuery, params).then(data => {
      console.log(data);
      setShows(data);
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "mountain.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#1879AE"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <ColorTitle text={getData("pageHeader")} marginBottom="50px" />
        {shows.map((show, i) => <ShowCard key={i} showData={show} imageUrl={urlFor(show.image)} />)}
      </div>
    </Layout>
  )
}

export default Shows
