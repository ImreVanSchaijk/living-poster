import React from 'react';
import PropTypes from 'prop-types';

const MainContent = ({ postUrl }) => (
  <img className="mainImage" src={postUrl} alt="Post from Reddit" />
);

MainContent.propTypes = {
  postUrl: PropTypes.string.isRequired,
};
