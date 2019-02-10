import React from 'react';
import { Modal, Form, Input } from 'antd';
import Cards from 'react-credit-cards';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        number: '',
        name: '',
        exp: '',
        cvv: '',
        focused: true,
      };
    }

    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="New Transaction"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Cards
            number={this.state.number}
            name={this.state.name}
            expiry={this.state.expiry}
            cvc={this.state.cvv}
            focused={false}
          />
          <Form layout="vertical">
            <Form.Item label="Amount">
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Amount here' }],
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item label="Credit Card Number">
              {getFieldDecorator('number', {
                rules: [{ required: true, message: 'Credit Card Number' }],
              })(
                <Input
                  setFieldsValue={this.state.number}
                  onChange={(e) => { this.setState({ number: e.target.value }); }}
                />,
              )}
            </Form.Item>
            <Form.Item label="Expiration Date">
              {getFieldDecorator('exp', {
                rules: [{ required: true, message: 'Expiration here' }],
              })(
                <Input
                  setFieldsValue={this.state.expiry}
                  onChange={(e) => { this.setState({ expiry: e.target.value }); }}
                />,
              )}
            </Form.Item>
            <Form.Item label="Cardholder Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Name here' }],
              })(
                <Input
                  setFieldsValue={this.state.name}
                  onChange={(e) => { this.setState({ name: e.target.value }); }}
                />,
              )}
            </Form.Item>
            <Form.Item label="Security Code/CVV">
              {getFieldDecorator('cvv', {
                rules: [{ required: true, message: 'CVV here' }],
              })(
                <Input
                  setFieldsValue={this.state.cvv}
                  onChange={(e) => { this.setState({ cvv: e.target.value }); }}
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default CollectionCreateForm;
