import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import WrappedLogInForm from './LogInForm';
import { signinUser } from '../../actions';
import Nav from '../Nav';

class LogInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSignIn = this.handleSignIn.bind(this);
  }

    // Call sign up action
  handleSignIn({ email, password }) {
    this.props.signinUser({ email, password }, this.props.history);
  }

  render() {
    return (
      <div>
        <Nav color="#3c67c3" />
        <div className="payment-form-container1">

          <Row id="loginBanner">
            <Col id="loginImage">
              <img src="https://i.imgur.com/D4NmNbl.png" alt="loginImg" />
            </Col>
            <Col id="loginFormBanner">
              <WrappedLogInForm handleSubmit={this.handleSignIn} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
  }
);
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { signinUser })(LogInContainer));
