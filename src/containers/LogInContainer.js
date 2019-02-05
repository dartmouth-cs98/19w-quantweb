import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WrappedLogInForm from './LogInForm';

class LogInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="payment-form-container1">
        <WrappedLogInForm />
      </div>
    );
  }
}

LogInContainer.propTypes = {

};

export default withRouter(connect(null, {})(LogInContainer));
