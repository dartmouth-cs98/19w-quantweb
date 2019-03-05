import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';

const { Option } = Select;

class RegisterUserForm extends Component {

  constructor(props) {
    super();
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      fileName: props.fileName,
      redirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleSubmit(values);
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="1">+1</Option>
      </Select>,
    );

    return (
      <div id="registrationForm">
        <h1 id="registrationHeader"> Get Cash Today </h1>
        <h2 id="registrationHeader2"> PaisaJi lets you transfer cash within minutes </h2>
        <Form onSubmit={this.handleSubmit}>
          <div id="registrationNames">
            <Form.Item {...formItemLayout}>
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Missing first name!',
                    whitespace: true,
                  },
                ],
              })(<Input style={{ width: '165px' }} placeholder="First name" />)}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Missing last name!',
                    whitespace: true,
                  },
                ],
              })(<Input style={{ width: '165px' }} placeholder="Last name" />)}
            </Form.Item>
          </div>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <span id="input">
                <Input
                  className="registrationInput"
                  placeholder="Email address"
                />
              </span>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                className="registrationInput"
                type="password"
                placeholder="Enter password"
              />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                className="registrationInput"
                type="password"
                onBlur={this.handleConfirmBlur}
                placeholder="Confirm password"
              />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Please input your phone number!' },
              ],
            })(
              <Input
                className="registrationInput"
                addonBefore={prefixSelector}
                placeholder="Enter phone number"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              className="registrationButton"
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegisterUserFormForm = Form.create()(RegisterUserForm);

export default WrappedRegisterUserFormForm;
