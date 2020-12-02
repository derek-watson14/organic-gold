import React from 'react';
import { format } from 'date-fns';

import defaultShowImage from '../images/live-music.jpg';
import adjustTimezone from '../helpers/adjustTimezone';

const Show = ({ show }) => {
  const date = format(adjustTimezone(show.showDate), 'MMMM do y');

  const venueDisplay = show.venue.link ? (
    <a
      href={show.venue.link}
      target='_blank'
      rel='noopener noreferrer'
      className='hover-flip plain-link'
    >
      {show.venue.name}
    </a>
  ) : (
    show.venue.name
  );

  let address = '';
  if (
    show.venue.address &&
    show.venue.address.street &&
    show.venue.address.city
  ) {
    const { street, city, state } = show.venue.address;
    address = (
      <span className='venue-address'>
        {street}, {city} {state}
      </span>
    );
  }

  const bandList = show.bands.map(({ name, link, _key }, i) => {
    const seperator = i + 1 < show.bands.length ? ', ' : '';
    return link ? (
      <span key={_key}>
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='hover-flip plain-link'
        >
          {name}
        </a>
        {seperator}
      </span>
    ) : (
      <span key={i}>
        {name}
        {seperator}
      </span>
    );
  });

  const imageUrl = show.image?.asset?.url;

  return (
    <div className='show-container'>
      <div className='show-image-container'>
        <img
          className='show-image'
          src={imageUrl ? imageUrl : defaultShowImage}
          alt={show.imageAlt ? show.imageAlt : `${show.name}`}
        />
      </div>
      <div className='text-container'>
        <h2 className='show-title'>{show.name}</h2>
        <span className='show-date'>
          {date} | {show.showTime}
        </span>
        <div className='who-where'>
          <h3 className='header-font'>
            <span className='fw-400'>Who? </span>
            {bandList.length > 0 ? bandList : 'TBA'}
          </h3>
          <h3 className='header-font space-between'>
            <span className='fw-400'>Where? </span>
            {show.venue.name ? venueDisplay : 'TBA'}
          </h3>
          {address}
        </div>
        <p className='text-font'>{show.about}</p>
      </div>
    </div>
  );
};

export default Show;
