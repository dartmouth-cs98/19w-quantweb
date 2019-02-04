import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WrappedPaymentForm from './PaymentForm';

class PaymentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="payment-form-container">
        <WrappedPaymentForm />
      </div>
    );
  }
}

PaymentContainer.propTypes = {

};

export default withRouter(connect(null, {})(PaymentContainer));
