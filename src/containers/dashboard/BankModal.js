import React from 'react';
import { Modal, Form, Input } from 'antd';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        IFCS: '',
        accountNumber: '',
        focused: true,
      };

      // this.checkIFCS = this.checkIFCS.bind(this);
    }

    // checkIFCS(rule, value, callback) {
    //   console.log(value);
    //   callback();
    // }

    // checkIFCS(rule, value, callback) {
    //   console.log(this.state.IFCS);
    //
    //   console.log(value);
    //   if (value.length === 11) {
    //     callback();
    //   }
    //
    //   callback('IFCS Format Example: SBIN0000058');
    // }

    render() {
      const {
        visible, onCancel, onCreate, form, confirmLoading,
      } = this.props;

      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add Bank Account"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form
            layout="vertical"
            onSubmit={onCreate}
          >
            <Form.Item
              label="Bank IFCS Code"
            >
              {getFieldDecorator('IFCS', {
                rules: [{ required: true }],
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item
              label="Bank Account Number"
            >
              {getFieldDecorator('accountNumber', {
                rules: [{ required: true, message: 'Enter Bank Account Number' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default CollectionCreateForm;
