import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

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
                <button onClick={props.increment} className="menu_item" id="login">Log In</button>
                <button onClick={props.increment} className="menu_item" id="signup">Sign Up</button>
                <button onClick={props.increment} className="menu_item" id="FAQ">FAQ</button>
                <button onClick={props.increment} className="menu_item" id="aboutus">About Us</button>
                <button onClick={props.increment} className="menu_item" id="how">How it Works</button>
                <Col className="banner_text" span={12}>
                  <h1 className="banner_tag">
                  Cash advances in India are expensive...
                  </h1>
                  <p>
                  They dont have to be.
                  </p>
                  <p>
                  Convert your credit card to cash while <br /> avoiding expensive bank fees.
                  </p>
                </Col>
              </div>
            </Col>
          </Row>
          <Row id="firstSection">
            <Col id="firstSectionText" span={12}>
              <Row>
                <h1 id="firstSectionTag"> Cash when you need it </h1>
              </Row>
              <Row>
                <p id="firstSectionBody"> Having a credit card is great but sometimes, you need cash.
                [Name] has you covered. Charge your card and recieve cash
                direct in your bank </p>
              </Row>
            </Col>
            <Col span={12} />
          </Row>

            Content
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
