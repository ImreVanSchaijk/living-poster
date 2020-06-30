import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ postAuthor }) {
  return (
    <footer>
      <p>
        {`This poster is a collaboration between you, me and the Reddit user '${postAuthor}'`}
      </p>
      <p className="paragraphSubtext">Type any subject you like and it will generate posters for you!</p>
    </footer>
  );
}

Footer.propTypes = {
  postAuthor: PropTypes.string.isRequired,
};
