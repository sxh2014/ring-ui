import React from 'react';
import PropTypes from 'prop-types';

import Link from '../link/link';

const MarkdownLink = ({href, title, children}) => <Link {...{href, title}}>{children}</Link>;

MarkdownLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

export default MarkdownLink;
