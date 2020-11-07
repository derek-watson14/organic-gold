import React from 'react'
import { format } from 'date-fns'

const Show = ({showData, imageUrl}) => {
  const {name, about, showDate, showTime, venueName, bandNames} = showData;
  const date = format(new Date(showDate), "MMMM do");
  return (
    <div className="show-container">
      <div className="show-image-container">
        {imageUrl ? <img className="show-image" src={imageUrl} /> : null}
      </div>
      <hr className="card-divider" />
      <div className="text-container">
        <h2 className="show-title">{name}<span>{date} | {showTime}</span></h2>
        <div className="who-where">
          <h3 className="header-font"><span className="fw-400">Who? </span>
            {bandNames.map((band, i) => {
              return `${band}${i + 1 < bandNames.length ? ', ' : ''}`
            })}
          </h3>
          <h3 className="header-font"><span className="fw-400">Where? </span>{venueName}</h3>
        </div>
        <p className="text-font">{about}</p>
      </div>
    </div>
  )
}

export default Show