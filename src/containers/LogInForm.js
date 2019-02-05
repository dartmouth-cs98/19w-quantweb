import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';// import { Redirect } from 'react-router-dom';

class LogInForm extends Component {


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
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="test-login">
        <h1> Test Login </h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
              )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
              )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>,
              )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
              Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLogInForm = Form.create()(LogInForm);

export default WrappedLogInForm;
