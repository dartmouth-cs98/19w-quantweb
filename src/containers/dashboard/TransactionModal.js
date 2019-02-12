import React from 'react';
import { Modal, Form, InputNumber } from 'antd';


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
        visible, onCancel, onCreate, form, confirmLoading,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="New Transaction"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical">
            <Form.Item
              label="Amount"
            >
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Amount here' }],
              })(
                <InputNumber formatter={value => `₹ ${value}`} />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default CollectionCreateForm;
