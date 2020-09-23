import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const FullPageNav = ({ navMenuOpen, setNavMenuOpen }) => {
  const handleExit = () => {
    setNavMenuOpen(false);
  };

  const overlayClasses = `nav-menu-overlay ${navMenuOpen ? "" : "hide-nav"}`;

  return (
    <div className={overlayClasses}>
      <div className="full-page-nav">
        <div className="nav-menu-link-container">
          <Link to="/">HOME</Link>
          <Link to="/band">THE BAND</Link>
          <Link to="/studio">THE STUDIO</Link>
          <Link to="/av">A/V</Link>
          <Link to="/shows">SHOWS</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </div>
      <div className="nav-menu-exit">
        <FontAwesomeIcon icon={faTimes} size="2x" onClick={handleExit} />
      </div>
    </div>
  )
};


export default FullPageNav