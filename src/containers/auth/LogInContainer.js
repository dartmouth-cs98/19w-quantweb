import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WrappedLogInForm from './LogInForm';
import { signinUser } from '../../actions';


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
      <div className="payment-form-container1">
        <WrappedLogInForm handleSubmit={this.handleSignIn} />
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
