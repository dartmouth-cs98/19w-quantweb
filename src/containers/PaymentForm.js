import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import { Redirect } from 'react-router-dom';

class PaymentForm extends Component {

  constructor(props) {
    super();
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      fileName: props.fileName,
      redirect: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(value) {
    this.setState({ x: 1 });
    console.log('changed', value);
  }

  handleSubmit(e) {
    // Default options
    const options = {
      key: 'rzp_test_34XZtQhCECAwjv',
      amount: '0',
      name: 'Test Merchant',
      description: 'Test Payment',
      image: 'https://img.icons8.com/cotton/2x/get-cash.png',
      handler(response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Test Testerton',
        email: 'test@test.com',
        contact: '5-555-555-5555',
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#F37254',
      },
    };

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // Set amount
        options.amount = parseFloat(values.Amount);

        // Open razorpay client form
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    });


    e.preventDefault();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='test-payment'>
        Test Payment Form
        <Form onSubmit={this.handleSubmit} className="payment-form">
          <Form.Item>
            {getFieldDecorator('Amount', {
            rules: [{ required: true, message: 'Please input the amount' }],
          })(
            <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Payment amount" />,
          )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className="payment-form-button">
            Test Payment
          </Button>
        </Form>
      </div>
    );
  }
}

const WrappedPaymentForm = Form.create()(PaymentForm);

export default WrappedPaymentForm;
