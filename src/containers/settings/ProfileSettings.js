import React from 'react';
import {
 Form, Input, Button,
} from 'antd';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';

class ProfileSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.updateUser(values, {});
      }
    });
  }
  // // Call sign up action
  // handleSignUp({ email, password, firstname, lastname, phone }) {
  //   this.props.signupUser({ email, password, firstname, lastname, phone }, this.props.history);
  // }

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

    const user = this.props.user.user;
    return (
      <div className="test-registration">
        <Form onSubmit={this.handleSubmit} layout="inline" className="settings-form">
          <Form.Item style={{ 'padding-bottom': '20px', 'padding-top': '5px' }} {...formItemLayout} >
            {getFieldDecorator('firstname', {
              initialValue: user.firstname,
              rules: [{
                required: true,
                message: 'Please input First Name',
              }],
            })(
              <Input style={{ width: '165%' }} />,
            )}
          </Form.Item>
          <Form.Item style={{ 'padding-bottom': '20px', 'padding-top': '5px', 'padding-left': '34px' }} {...formItemLayout} >
            {getFieldDecorator('lastname', {
              initialValue: user.lastname,
              rules: [{
                required: true,
                message: 'Please input Last Name',
              }],
            })(
              <Input style={{ width: '165%' }} placeholder="Last name" />,
            )}
          </Form.Item>
        </Form>
        <Form onSubmit={this.handleSubmit} className="registration-form">
          <Form.Item style={{ 'padding-right': '104px' }} {...formItemLayout} className="registration-form">
            {getFieldDecorator('email', {
              initialValue: user.email,
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
              initialValue: user.phone,
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input style={{ width: '210%' }} placeholder="Phone Number" />,
                    )}
          </Form.Item>
          <Form.Item style={{ width: '4px' }} {...tailFormItemLayout}>
            <Button style={{ width: '406px', 'background-color': '#476C99' }} type="primary" htmlType="submit">Update</Button>
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


const SettingsFormInstance = Form.create()(ProfileSettings);
export default connect(mapStateToProps, { updateUser })(SettingsFormInstance);
