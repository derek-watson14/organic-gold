import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import ShowCard from '../components/showCard';

export const query = graphql`
  query ShowsPageQuery {
    placeholderImage: file(relativePath: { eq: "mountain.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    sanityPages(pageName: { eq: "shows" }) {
      tabTitle
      metaDescription
      pageHeader
      subheader
    }
    allSanityShows {
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
          }
        }
        imageAlt
      }
    }
  }
`;

const Shows = ({ data }) => {
  const { placeholderImage, sanityPages, allSanityShows } = data;
  const [sortedShows, setSortedShows] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const sorted = allSanityShows.nodes
      .filter((show) => show.showDate >= today)
      .sort((a, b) => {
        if (a.showDate > b.showDate) return 1;
        else if (a.showDate < b.showDate) return -1;
        else return 0;
      });
    setSortedShows(sorted);
  }, [allSanityShows.nodes]);

  return (
    <Layout navImage={placeholderImage} fadeColor={'#1879AE'}>
      <SEO
        title={sanityPages.tabTitle}
        description={sanityPages.metaDescription}
      />
      <div className='container'>
        <ColorTitle text={sanityPages.pageHeader} marginBottom='100px' />
        {sortedShows.length === 0 ? (
          <div className='message-container'>
            <h2 className='header-font'>{sanityPages.subheader}</h2>
          </div>
        ) : (
          <div className='show-card-container'>
            {sortedShows.map((show) => {
              return <ShowCard key={show._id} show={show} />;
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shows;
