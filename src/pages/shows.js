import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { formatISO } from 'date-fns'

import client, { urlFor } from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"
import ShowCard from "../components/showCard"
import emptyContent from "../helpers/emptyContent"


const Shows = () => {
  const [content, setContent] = useState(emptyContent);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const today = formatISO(new Date(), { representation: 'date' });
    const contentQuery = '*[_type == "pages" && pageName == "shows"]';
    const showQuery = `*[_type == "shows" && showDate >= $today] | order(showDate asc)`;
    const showParams = { today };

    client.fetch(contentQuery, {}).then(data => {
      setContent(data[0]);
    })

    client.fetch(showQuery, showParams).then(data => {
      setShows(data);
    })
  }, [])

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "mountain.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <Layout navImage={navImage} fadeColor={"#1879AE"}>
      <SEO title={content.tabTitle} description={content.metaDescription} />
      <div className="container">
        <ColorTitle text={content.pageHeader} marginBottom="100px" />
        {shows.length === 0
          ? (
            <div className="message-container">
              <h2 className="header-font">{content.subheader}</h2>
            </div>
          )
          : (
            <div className="show-card-container">
              {shows.map((show, i) => {
                return <ShowCard key={i} showData={show} imageUrl={urlFor(show.image).url()} />
              })}
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default Shows
