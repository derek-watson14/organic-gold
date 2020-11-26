import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBandcamp, faFacebookSquare, faInstagram, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import { Link } from "gatsby"

import client from "../sanity/client"


const Footer = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "footer"]';
    const params = {};

    client.fetch(query, params).then(data => {
      setContent(data[0]);
      console.log(data)
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  return (
    <footer className="footer-container">
      <div className="footer-connect text-font">
        <h3 className="header-font">Stay Connected</h3>
        <p>Jonny Cole</p>
        <p>Organic Gold</p>
        <p>(360) 516-9967</p>
        <p>joncron@yahoo.com</p>
        <div className="icon-container">
          <a href="hhttps://www.facebook.com/OrganicGoldMusic" rel="noreferrer" target="_blank" title="Facebook">
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/organicgoldmusic/" rel="noreferrer" target="_blank" title="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
          </a>
          <a href="https://organicgold.bandcamp.com/" rel="noreferrer" target="_blank" title="Bandcamp">
            <FontAwesomeIcon icon={faBandcamp} size="2x" className="social-icon" />
          </a>
          <a href="https://soundcloud.com/user-66808316" rel="noreferrer" target="_blank" title="SoundCloud">
            <FontAwesomeIcon icon={faSoundcloud} size="2x" className="social-icon" />
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
}

export default Footer