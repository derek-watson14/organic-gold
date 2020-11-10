import React from 'react'
import { format } from 'date-fns'

import defaultShowImage from '../images/live-music.jpg'

const Show = ({showData, imageUrl}) => {
  const {name, about, showDate, showTime, venue, bands} = showData;
  const date = format(new Date(showDate), "MMMM do");
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
            {bands.map(({name, link}, i) => {
              const afterName = i + 1 < bands.length ? ', ' : '';
              return (
                <span key={i}>
                  <span className="hover-flip">{name}</span>{afterName}
                </span>
              )
            })}
          </h3>
          <h3 className="header-font">
            <span className="fw-400">Where? </span>
            <span className="hover-flip">{venue.name}</span>
          </h3>
        </div>
        <p className="text-font">{about}</p>
      </div>
    </div>
  )
}

export default Show