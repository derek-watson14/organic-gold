import React, { useState } from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import Navbar from "./navbar"
import FullPageNav from "./fullPageNav"
import '../style/main.scss';

const Layout = ({ children, navImage, fadeColor }) => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <>
      <FullPageNav navMenuOpen={navMenuOpen} setNavMenuOpen={setNavMenuOpen} />
      <Header />
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
