import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import Nav from '../Nav';

const { Content, Footer } = Layout;

const Landing = (props) => {
  return (
    <Layout className="layout">
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }}>
          <Row>
            <Col span={24}>
              <div className="banner">
                <Nav color="transparent" />
                <Col className="banner_text" span={12}>
                  <h1 id="banner_tag">
                  Cash advances in India are expensive...
                  </h1>
                  <p id="sub_text">
                  They dont have to be.
                  </p>
                  <p id="sub_text">
                  Convert your credit card to cash while <br /> avoiding expensive bank fees.
                  </p>
                  <button onClick={props.increment} className="menu_item" id="bannerSignUp">Sign Up</button>
                </Col>
              </div>
            </Col>
          </Row>
          <Row id="firstSection">
            <Col id="firstSectionText" span={12}>
              <div id="firstSectionBox">
                <Row>
                  <h1 id="firstSectionTag"> Cash when you need it </h1>
                </Row>
                <Row>
                  <p id="firstSectionBody">
                  Having a credit card is great but sometimes, you need cash.
                  PaisaJi has you covered, simply charge your credit card and recieve funds
                  direct to your checking account. It&apos;s as easy as that. </p>
                </Row>
              </div>
            </Col>
            <Col span={12}>
              <img id="firstSectionImage" src="https://i.imgur.com/RDGMv4A.png" alt="lightning" />
            </Col>
          </Row>
          <Row id="sparkSection">
            <Col id="secondSectionImage" span={12}>
              <img id="firstSectionImage" src="https://i.imgur.com/jGt7Zpq.png" alt="lightning" />
            </Col>
            <Col id="firstSectionText" span={12}>
              <div id="firstSectionBox">
                <Row>
                  <h1 id="firstSectionTag"> Investing in your future </h1>
                </Row>
                <Row>
                  <p id="firstSectionBody">
                Receive SparkPoints for every transaction with PaisaJi. SparkPoints
                are invested in stocks and bonds, so their value grows with the
                market. Now that&apos;s investing made easy.</p>
                </Row>
              </div>
            </Col>
          </Row>
          <Row id="secondSection">
            <Col id="secondSectionBox" span={24}>
              <Row>
                <h1 id="howTitle"> How it Works </h1>
              </Row>
              <div id="howBanner">
                <Row>
                  <Col className="iconCol" span={8}>
                    <img id="cardIcon" src="https://i.imgur.com/aLYduRj.png" alt="card" />
                  </Col>
                  <Col className="iconCol" id="cashIconDiv" span={8}>
                    <img id="cashIcon" src="https://i.imgur.com/5U2JFhe.png" alt="cash" />
                  </Col>
                  <Col className="iconCol" id="walletIconDiv" span={8}>
                    <img id="walletIcon" src="https://i.imgur.com/YBK5osE.png" alt="wallet" />
                  </Col>
                </Row>
                <Row>
                  <Col className="iconText" span={8}>
                    <p>1. Choose an amount and enter your credit card</p>
                  </Col>
                  <Col className="iconText" span={8}>
                    <p>2. Your card is charged and money is transfered</p>
                  </Col>
                  <Col className="iconText" span={8}>
                    <p>3. Recieve funds in your bank account in 2-3 days</p>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col id="howContainer"span={24}>
                  <p id="howExplainer">
                  Yup, it’s really that easy. PaisaJi allows you to seamlessly charge
                  your credit card and recieve cash to help you with any of your expenses.
                  Our service fee of 6% is lower than any competing bank’s cash advance fees.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
       ©2019 PaisaJi
      </Footer>
    </Layout>
  );
};

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
  }
);
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { })(Landing));
