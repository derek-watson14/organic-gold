import React from 'react'
import { format } from 'date-fns'

import defaultShowImage from '../images/live-music.jpg'

const Show = ({showData, imageUrl}) => {
  const {name, about, showDate, showTime, venue, bands} = showData;
  const date = format(new Date(showDate), "MMMM do");
  const venueDisplay = venue.link 
    ? <a href={venue.link} target="_blank" rel="noopener noreferrer" className="hover-flip plain-link">{venue.name}</a>
    : venue.name;

  const bandList = bands.map(({name, link}, i) => {
    const seperator = i + 1 < bands.length ? ', ' : '';
    return link
      ? <span key={i}>
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover-flip plain-link">{name}</a>
          {seperator}
        </span>
      : <span key={i}>{name}{seperator}</span>
  })

  return (
    <div className="show-container">
      <div className="show-image-container">
        <img className="show-image" src={imageUrl ? imageUrl : defaultShowImage} />
      </div>
      <hr className="card-divider" />
      <div className="text-container">
        <h2 className="show-title">{name}<span>{date} | {showTime}</span></h2>
        <div className="who-where">
          <h3 className="header-font"><span className="fw-400">Who? </span>
          {bandList}
          </h3>
          <h3 className="header-font">
            <span className="fw-400">Where? </span>{venueDisplay}
          </h3>
        </div>
        <p className="text-font">{about}</p>
      </div>
    </div>
  )
}

export default Show