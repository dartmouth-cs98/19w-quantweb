import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import { connect } from 'react-redux';

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
    console.log(this);
  //   const value = e.target.value;
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
    const user = this.props.user.user;
    console.log(user.email);
    return (
      <div id="registrationForm">
        <Form onSubmit={this.handleSubmit}>
          <div id="registrationNames">
            <Form.Item {...formItemLayout}>
              {getFieldDecorator('firstName', {
                initialValue: user.firstname,
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name!',
                    whitespace: true,
                  },
                ],
              })(<Input style={{ width: '165px' }} placeholder="First name" />)}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              {getFieldDecorator('lastName', {
                initialValue: user.lastname,
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name!',
                    whitespace: true,
                  },
                ],
              })(<Input style={{ width: '165px' }} placeholder="Last name" />)}
            </Form.Item>
          </div>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: user.email,
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
              <Input
                className="registrationInput"
                placeholder="Email address"
              />,
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
              initialValue: user.phone,
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
    user: state.user,
  }
);

const WrappedRegisterUserFormForm = Form.create()(RegisterUserForm);

export default connect(mapStateToProps)(WrappedRegisterUserFormForm);
