import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBandcamp, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from "gatsby"


const Footer = () => (
  <footer className="footer-container">
    <div className="footer-connect text-font">
      <h3 className="header-font">Stay Connected</h3>
      <p>Jonny Cole</p>
      <p>Organic Gold</p>
      <p>(360) 516-9967</p>
      <p>joncron@yahoo.com</p>
      <div className="icon-container">
        <a href="hhttps://www.facebook.com/OrganicGoldMusic" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="social-icon" />
        </a>
        <a href="https://www.instagram.com/organicgoldmusic/" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
        </a>
        <a href="https://organicgold.bandcamp.com/" rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faBandcamp} size="2x" className="social-icon" />
        </a>
      </div>
      <p>&copy; Organic Gold {new Date().getFullYear()}</p>
    </div>
    <div className="footer-spacer"></div>
    <div className="footer-navigate">
      <h3 className="header-font">Navigate</h3>
      <div className="footer-link-container text-font">
        <Link to="/">Home &gt;</Link>
        <Link to="/band">The Band &gt;</Link>
        <Link to="/studio">The Studio &gt;</Link>
        <Link to="/av">A/V &gt;</Link>
        <Link to="/shows">Shows &gt;</Link>
        <Link to="/contact">Contact &gt;</Link>
      </div>
    </div>
  </footer>
)

export default Footer