import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signoutUser } from '../actions';
import { getUser } from '../actions/userActions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.getAuthButtons = this.getAuthButtons.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated.authenticated && !this.props.user) { this.props.getUser(); }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated.authenticated && !nextProps.user) { this.props.getUser(); }
  }
  getAuthButtons(event) {
    if (this.props.authenticated.authenticated === false) {
      return (
        <div>
          <NavLink to="/register" className="menu_item" id="login">Sign Up</NavLink>
          <NavLink to="/login" className="menu_item" id="signup">Log In</NavLink>
        </div>
      );
    } else {
      /*eslint-disable */
      return (
        <div>
          <span className="menu_item" id="logout" onClick={this.handleLogout}>LOG OUT</span>
        </div>
      );
      /*eslint-enable */
    }
  }

  handleLogout(event) {
    this.props.signoutUser(this.props.history, () => {
      window.location.reload();
    });
  }


  render() {
    return (
      <div style={{ backgroundColor: this.props.color }}id="nav">
        {this.getAuthButtons()}
        <NavLink to="/settings" id="settings_button" className="menu_item">
          Settings
        </NavLink>
        <NavLink to="/">
          <img src="https://i.imgur.com/TN4nDUA.png" alt="logo" id="logo" />
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
  }
);

// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { signoutUser, getUser })(Nav));
