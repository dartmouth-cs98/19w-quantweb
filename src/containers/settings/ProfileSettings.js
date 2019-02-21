import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';// import { Redirect } from 'react-router-dom';

class ProfileSettings extends Component {


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
      <div id="#profileSettings">
        <h1 id="registrationHeader"> User Profile </h1>
        <Form onSubmit={this.handleSubmit} className="login-form1">
          <div layout="inline">
            <Form.Item style={{ paddingBottom: '20px', paddingTop: '5px' }} {...formItemLayout} >
              {getFieldDecorator('firstname', {
                rules: [{
                  required: true,
                  message: 'Please input First Name',
                }],
              })(
                <Input style={{ width: '165%' }} placeholder="First name" />,
              )}
            </Form.Item>
            <Form.Item style={{ paddingBottom: '20px', paddingTop: '5px', paddingLeft: '34px' }} {...formItemLayout} >
              {getFieldDecorator('lastname', {
                rules: [{
                  required: true,
                  message: 'Please input Last Name',
                }],
              })(
                <Input style={{ width: '165%' }} placeholder="Last name" />,
              )}
            </Form.Item>
          </div>
        </Form>
        <Form onSubmit={this.handleSubmit} className="registration-form">
          <Form.Item style={{ paddingRight: '104px' }} {...formItemLayout} className="registration-form">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input style={{ width: '330%' }} placeholder="Email address" />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} className="registration-form">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                        // validator: this.validateToNextPassword,
              }],
            })(
              <Input style={{ width: '360%' }} placeholder="Password [min. 10 characters]" />,
                    )}
          </Form.Item>
          <Form.Item {...formItemLayout} >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input style={{ width: '210%' }} placeholder="Phone Number" />,
                    )}
          </Form.Item>
          <Form.Item style={{ width: '4px' }} {...tailFormItemLayout}>
            <Button style={{ width: '406px', 'background-color': '#476C99' }} type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const ProfileSettingsInstance = Form.create()(ProfileSettings);

export default ProfileSettingsInstance;
