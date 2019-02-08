import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

// import { Redirect } from 'react-router-dom';

class PaymentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      fileName: props.fileName,
      redirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
   
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="test-payment">
        <h1> Test Transaction </h1>
        <Form onSubmit={this.handleSubmit} className="payment-form">
          <Form.Item>
            {getFieldDecorator('Amount', {
              rules: [{ required: true, message: 'Please input the amount' }],
            })(
              <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Withdraw amount" />,
          )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className="payment-form-button">
            Withdraw
          </Button>
        </Form>
      </div>
    );
  }
}

const WrappedPaymentForm = Form.create()(PaymentForm);

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
  }
);
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { })(WrappedPaymentForm));
