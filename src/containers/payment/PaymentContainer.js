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
        <WrappedPaymentForm handleTransaction={this.props.handleTransaction} />
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
export default withRouter(connect(mapStateToProps, { })(PaymentContainer));
