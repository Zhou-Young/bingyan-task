import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = props => {
  const { index, children } = props;
  return (
    <div>
      <Header index={index} />
      {children}
    </div>
  );
};
Layout.propTypes = {
  index: PropTypes.string
};
// Specifies the default values for props:
Layout.defaultProps = {
  index: '0'
};
export default Layout;
