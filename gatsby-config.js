import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log(process.env.SANITY_TOKEN);

module.exports = {
  siteMetadata: {
    title: `Organic Gold Music`,
    siteUrl: 'https://organicgoldmusic.com/',
    description: `A professional recording studio and band based in Bainbridge Island, WA.`,
    author: `Derek Watson`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-single.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'ujvu50xg',
        dataset: 'prod',
        watchMode: false,
        token: process.env.GATSBY_SANITY_TOKEN,
      },
    },
  ],
};
