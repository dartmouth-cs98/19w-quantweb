import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,} from 'antd';// import { Redirect } from 'react-router-dom';

class RegisterUserForm extends Component {


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


  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword (rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback){
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        alert("USER REGISTERED"+"\n"+"UserName: " + values.username + "\n" + "E-mail: " + values.email+
         "\n" + "Password: " + values.password+ "\n" + "Confirm Password: " + values.confirm+
          "\n" + "Phone: " + values.phone);

      }
    });
  }

  render() {
    //const { autoCompleteResult } = this.state;
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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

        return (
          <div className="test-login">
            <h1> Test Registration </h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item {...formItemLayout} label="Username">
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: 'Please input Username',
              }],
            })(
              <Input placeholder="Please input your username" />
            )}
          </Form.Item>
          <Form.Item
                    {...formItemLayout}
                    label="E-mail"
                  >
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                        required: true, message: 'Please input your E-mail!',
                      }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Password"
                  >
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your password!',
                      }, {
                        //validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Confirm Password"
                  >
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: 'Please confirm your password!',
                      }, {
                        //validator: this.compareToFirstPassword,
                      }],
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Phone Number"
                  >
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                      <Input style={{ width: '100%' }} />
                    )}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                  </Form.Item>
          </Form>
          </div>
        );
      }
}

const WrappedRegisterUserForm = Form.create()(RegisterUserForm);

export default WrappedRegisterUserForm;
