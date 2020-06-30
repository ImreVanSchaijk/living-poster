import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ postTitle, postSubreddit }) {
  return (
    <header>
      <h1>{postTitle}</h1>
      <h2>{postSubreddit}</h2>
    </header>
  );
}

Header.propTypes = {
  postTitle: PropTypes.string,
  postSubreddit: PropTypes.string,
};

Header.defaultProps = {
  postTitle: '',
  postSubreddit: '',
};
