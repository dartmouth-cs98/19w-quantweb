import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div id="nav">
      <NavLink className="menu_item" to="/register" id="login">Sign Up</NavLink>
      <NavLink to="/login" className="menu_item" id="signup">Log In</NavLink>
      <NavLink to="/test" className="menu_item" id="FAQ">FAQ</NavLink>
      <NavLink to="/test" className="menu_item" id="aboutus">About Us</NavLink>
      <NavLink to="/test" className="menu_item" id="how">How it Works</NavLink>
      <img src="https://i.imgur.com/TN4nDUA.png" alt="logo" id="logo" />
    </div>
  );
};

// connects particular parts of redux state to this components props
// const mapStateToProps = state => (
//   {
//     authenticated: state.authenticated,
//   }
// );

// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(null, { })(Nav));
