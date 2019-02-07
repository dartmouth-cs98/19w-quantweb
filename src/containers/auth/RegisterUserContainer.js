import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../../actions';

import WrappedRegisterUserForm from './RegisterUserForm';
import Nav from '../Nav';

class RegisterUserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  // Call sign up action
  handleSignUp({ email, password, firstname, lastname, phone }) {
    this.props.signupUser({ email, password, firstname, lastname, phone }, this.props.history);
  }

  render() {
    return (
      <div>
        <Nav color="#3c67c3" />
        <div className="payment-form-container1">
          <WrappedRegisterUserForm handleSubmit={this.handleSignUp} />
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
export default withRouter(connect(mapStateToProps, { signupUser })(RegisterUserContainer));
