import React from 'react';
import {
  Form, Input, Button,
} from 'antd';

class SettingsBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }


  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 11 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 12,
        },
      },
    };

    return (
      <div id="bank-settings-form" className="settings-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Account Number"
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="IFCF Code"
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form >
      </div>
    );
  }
}

const SettingsFormInstance = Form.create()(SettingsBody);
export default SettingsFormInstance;
