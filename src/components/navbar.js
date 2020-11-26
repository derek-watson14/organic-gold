import React from "react"
import { animated } from "react-spring"
import useWindowScroll from "@react-hook/window-scroll"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Image from "../components/image"

const parallax = (scrollY) => {
  return {
    transform: `translateY(-${(scrollY / 175) * 10}%)`,
    objectFit: "cover",
  }
}

const Navbar = ({ navImage, navMenuOpen, setNavMenuOpen, fadeColor }) => {
  const scrollY = useWindowScroll(60);

  const handleMenuBtnClick = () => {
    setNavMenuOpen(true);
  }

  const buttonClasses = `menu-btn-container ${navMenuOpen ? "hide-btn" : ""}`;

  return (
    <>
      <div className="navbar-container">
        <div className={buttonClasses}>
          <FontAwesomeIcon icon={faBars} size="2x" onClick={handleMenuBtnClick} />
        </div>
        <nav className="link-container">
          <Link to="/">HOME</Link>
          <Link to="/band">THE BAND</Link>
          <Link to="/studio">THE STUDIO</Link>
          <Link to="/av">A/V</Link>
          <Link to="/shows">SHOWS</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
        <animated.div style={parallax(scrollY)}>
          <Image data={navImage} classes="nav-image" backgroundColor={fadeColor} />
        </animated.div>
      </div>
    </>
  );
}

export default Navbar