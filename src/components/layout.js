import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Navbar from "./navbar"
import FullPageNav from "./fullPageNav"
import '../style/main.scss';

const Layout = ({ children, navImage, fadeColor }) => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <FullPageNav navMenuOpen={navMenuOpen} setNavMenuOpen={setNavMenuOpen} />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} fadeColor={fadeColor} />
      <Navbar navImage={navImage} navMenuOpen={navMenuOpen} setNavMenuOpen={setNavMenuOpen} fadeColor={fadeColor} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
