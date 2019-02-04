import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import PaymentContainer from './PaymentContainer';

import { increment, decrement } from '../actions';

const { Content, Footer } = Layout;

const Landing = (props) => {
  return (
    <Layout className="layout">
      <Content>
        <div style={{ background: '#fff', minHeight: 2800 }}>
          <Row>
            <Col span={24}>
              <div className="banner">
                <button onClick={props.increment} className="login">Log In</button>
                <button onClick={props.increment} className="signup">Sign Up</button>
                <button onClick={props.increment} className="FAQ">FAQ</button>
                <button onClick={props.increment} className="aboutus">About Us</button>
                <button onClick={props.increment} className="how">How it Works</button>
                <Col className="banner_text" span={12}>
                  <h1 className="banner_tag">
                  Cash advances in India are expensive...
                  </h1>
                  <p>
                  They dont have to be.
                  </p>
                  <p>
                  Convert your credit card to cash while avoiding expensive bank fees.
                  </p>
                </Col>
              </div>
            </Col>
            <Col span={12}>
              <h2> Need Cash Now? </h2>
              <h2> Enter Withdraw Amount </h2>
            </Col>
          </Row>
          <PaymentContainer  />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

// react-redux glue -- outputs Container that knows how to call actions
  // new way to connect with react router 4
export default withRouter(connect(null, { increment, decrement })(Landing));
