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
    }

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
          <Form layout="vertical">
            <Form.Item
              label="Bank IFCS Code"
            >
              {getFieldDecorator('IFCS', {
                rules: [{ required: true, message: 'Enter Bank IFCS Code' }],
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
