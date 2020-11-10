import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { formatISO } from 'date-fns'

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"
import ShowCard from "../components/showCard"


const Shows = () => {
  const [content, setContent] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const today = formatISO(new Date(), { representation: 'date' });
    const contentQuery = '*[_type == "pages" && pageName == "shows"]';
    const showQuery = `*[_type == "shows" && showDate >= $today]`;
    const showParams = { today };

    client.fetch(contentQuery, {}).then(data => {
      setContent(data[0]);
    })

    client.fetch(showQuery, showParams).then(data => {
      console.log(data);
      setShows(data);
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  console.log(urlFor(undefined).url());

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

  const showCards = shows.map((show, i) => {
    return <ShowCard key={i} showData={show} imageUrl={urlFor(show.image).url()} />
  });

  return (
    <Layout navImage={navImage} fadeColor={"#1879AE"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <ColorTitle text={getData("pageHeader")} marginBottom="100px" />
        <div className="show-card-container">
          {showCards}
        </div>
      </div>
    </Layout>
  )
}

export default Shows
