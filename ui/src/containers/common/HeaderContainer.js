import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../config/config';
import Header from '../../components/common/Header';

const HeaderContainer = ({ currentUser, history }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const onUserDropdownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const onTitleClick = () => {
    history.push('/');
  };

  const onLogoutUser = () => {
    console.log('onLogoutUser()');
  };

  return (
    <Header
      currentUser={currentUser}
      appName={config.app.name.toUpperCase()}
      isDropDownOpen={isDropDownOpen}
      onUserDropdownToggle={onUserDropdownToggle}
      onTitleClick={onTitleClick}
      onLogoutUser={onLogoutUser}
    />
  );
};

HeaderContainer.propTypes = {
  currentUser: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps (state) {
  return {
    currentUser: state.header.currentUser
  };
}

export default withRouter(connect(mapStateToProps)(HeaderContainer));
