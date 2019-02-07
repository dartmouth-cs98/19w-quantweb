import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';// import { Redirect } from 'react-router-dom';

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
    // const { autoCompleteResult } = this.state;
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
        <h1 id="registrationHeader"> Get Cash in Hand Today </h1>
        <h2 id="registrationHeader2"> PaisaJi lets you transfer cash within minutes </h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item {...formItemLayout} >
            {getFieldDecorator('firstname', {
              rules: [{
                required: true,
                message: 'Please input First Name',
              }],
            })(
              <Input style={{ width: '200%' }} placeholder="First name" />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} >
            {getFieldDecorator('lastname', {
              rules: [{
                required: true,
                message: 'Please input Last Name',
              }],
            })(
              <Input style={{ width: '200%' }} placeholder="Last name" />,
            )}
          </Form.Item>
          <Form.Item  {...formItemLayout}  >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input style={{ width: '200%' }} placeholder="Email address"/>,
                    )}
          </Form.Item>
          <Form.Item {...formItemLayout}  >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                        // validator: this.validateToNextPassword,
              }],
            })(
              <Input style={{ width: '200%' }} placeholder="Password [min. 10 characters]" />,
                    )}
          </Form.Item>
          <Form.Item {...formItemLayout} >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input style={{ width: '200%' }} placeholder="Phone Number" />,
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
