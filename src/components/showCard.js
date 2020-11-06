import React from 'react'

const Show = ({showData}) => {
  console.log(showData)
  const {name, about, date, image, venueName, bandNames} = showData;
  return (
    <div className="showContainer">
      <h1 className="header-font">{name}</h1>
      <h3 className="header-font">
        {bandNames.map((band, i) => {
          return `${band}${i + 1 < bandNames.length ? ', ' : ''}`
        })}
      </h3>
      <p className="text-font">{about}</p>
    </div>
  )
}

export default Show