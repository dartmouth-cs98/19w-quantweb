import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
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
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <NavLink to="/settings">
            <Icon type="setting" /> Settings
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <NavLink to="/" onClick={this.handleLogout}><Icon type="poweroff" /> Sign Out</NavLink>
        </Menu.Item>
      </Menu>
    );
    if (this.props.authenticated.authenticated === false) {
      return (
        <div> Error you are not logged in to access this page </div>
      );
    } else {
      /*eslint-disable */
      return (
        <div id="dropdownLink">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
            <a className="ant-dropdown-link" href="#">
              <Icon type="user" />
            </a>
          </Dropdown>
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
      <div style={{ backgroundColor: this.props.color }} id="innerNav">
        {this.getAuthButtons()}
        <NavLink to="/dashboard">
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
