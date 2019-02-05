import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WrappedRegisterUserForm from './RegisterUserForm';

class RegisterUserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="payment-form-container1">
        <WrappedRegisterUserForm />
      </div>
    );
  }
}

RegisterUserContainer.propTypes = {

};

export default withRouter(connect(null, {})(RegisterUserContainer));
