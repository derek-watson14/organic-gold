import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import ShowCard from '../components/showCard';

const Shows = ({ data }) => {
  const [sortedShows, setSortedShows] = useState([]);

  const { image, showImage, page, shows } = data;

  const defaultShowImage = showImage.childImageSharp.fixed;

  useEffect(() => {
    const sorted = sortFilterShows(shows.nodes)
    setSortedShows(sorted)
  }, [shows.nodes])

  const sortFilterShows = (shows) => {
    const today = new Date().toISOString().split('T')[0];
    const sorted = shows
      .filter((show) => show.showDate >= today)
      .sort((a, b) => {
        if (a.showDate > b.showDate) return 1;
        else if (a.showDate < b.showDate) return -1;
        else return 0;
      });
    return sorted;
  };

  return (
    <Layout navImage={image} fadeColor={'#1879AE'}>
      <SEO
        title='Shows'
        description='Calendar of shows featuring Organic Gold and other acts!'
      />
      <div className='container'>
        <ColorTitle text={page.pageHeader} marginBottom='100px' />
        {sortedShows.length === 0 ? (
          <div className='message-container'>
            <h2 className='header-font'>{page.subheader}</h2>
          </div>
        ) : (
          <div className='show-card-container'>
            {sortedShows.map((show) => {
              return <ShowCard key={show._id} show={show} defaultShowImage={defaultShowImage} />;
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shows;

export const query = graphql`
  query ShowsPageQuery {
    image: file(relativePath: { eq: "mountain.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1080, quality: 45) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    showImage: file(relativePath: { eq: "live-music.jpg"}) {
      childImageSharp {
        fixed(width: 250, quality: 55) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    page: sanityPages(pageName: { eq: "shows" }) {
      pageHeader
      subheader
    }
    shows: allSanityShows {
      nodes {
        _id
        name
        about
        showDate
        showTime
        venue {
          link
          name
          address {
            street
            city
            state
          }
        }
        bands {
          _key
          name
          link
        }
        image {
          asset {
            url
            fixed(width: 250) {
              ...GatsbySanityImageFixed
            }
          }
        }
        imageAlt
      }
    }
  }
`;