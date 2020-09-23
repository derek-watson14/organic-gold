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
      <p>(206) 555-5555</p>
      <p>j.cole@test.com</p>
      <div className="icon-container">
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faBandcamp} size="2x" className="social-icon" />
      </div>
      <p>&copy; Organic Gold {new Date().getFullYear()}</p>
    </div>
    <div className="footer-spacer"></div>
    <div className="footer-navigate">
      <h3 className="header-font">Navigate</h3>
      <div className="footer-link-container text-font">
        <Link to="/">Home ></Link>
        <Link to="/band">The Band ></Link>
        <Link to="/studio">The Studio ></Link>
        <Link to="/av">A/V ></Link>
        <Link to="/shows">Shows ></Link>
        <Link to="/contact">Contact ></Link>
      </div>
    </div>
  </footer>
)

export default Footer