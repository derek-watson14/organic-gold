import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Navbar from "./navbar"
import '../style/main.scss';

const Layout = ({ children, navImage }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  let parallax;
  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Navbar navImage={navImage} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
