/* eslint-disable */
import React from "react"
import { Link } from "gatsby"
import { useSpring, animated } from "react-spring"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const FullPageNav = ({ navMenuOpen, setNavMenuOpen }) => {
  const handleExit = () => {
    setNavMenuOpen(false);
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("nav-menu-overlay")) {
      setNavMenuOpen(false);
    }
  }

  const overlayClasses = `nav-menu-overlay ${navMenuOpen ? "" : "hide-nav"}`;

  return (
    <div className={overlayClasses} onClick={handleClick} >
      <animated.div
        className="full-page-nav"
        style={useSpring({
          transform: navMenuOpen ? "translateX(0)" : "translateX(-120px)",
        })}
      >
        <div className="nav-menu-link-container">
          <Link to="/">HOME</Link>
          <Link to="/band">THE BAND</Link>
          <Link to="/studio">THE STUDIO</Link>
          <Link to="/av">A/V</Link>
          <Link to="/shows">SHOWS</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </animated.div>
      <div className="nav-menu-exit">
        <FontAwesomeIcon icon={faTimes} size="2x" onClick={handleExit} />
      </div>
    </div>
  )
};


export default FullPageNav