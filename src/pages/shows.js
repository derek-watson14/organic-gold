import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';
import ShowCard from '../components/showCard';

import getLatestData from '../utils/getLatestData';
import emptyContent from '../utils/emptyContent';

export const query = graphql`
  query ShowsPageQuery {
    image: file(relativePath: { eq: "mountain.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 50) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

const Shows = ({ data }) => {
  const [page, setPage] = useState(emptyContent);
  const [sortedShows, setSortedShows] = useState([]);

  const { image } = data;

  useEffect(() => {
    getLatestData(String.raw`
      query {
        allPages(where: { pageName: { eq: "shows" } }) {
          pageHeader
          subheader
        }
        allShows {
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
    `)
      .then((data) => {
        setPage(data.allPages[0]);
        setSortedShows(sortFilterShows(data.allShows));
      })
      .catch((err) => {
        console.log('An error has occurred: ', err);
      });
  }, []);

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
              return <ShowCard key={show._id} show={show} />;
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shows;
