import React from 'react';
import { Link } from 'gatsby';

const LinkButton = ({ text, to }) => {
  return (
    <Link to={`/${to ? to : ''}`} className='link-button'>
      {text.toUpperCase()}
    </Link>
  );
};

export default LinkButton;
