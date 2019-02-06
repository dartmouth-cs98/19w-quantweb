import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component';

import Nav from '../Nav';

const { Content, Footer } = Layout;

const Landing = (props) => {
  return (
    <Layout className="layout">
      <Content>
        <div style={{ background: '#fff',
          minHeight: '1000px',
          backgroundColor: '#f2f2f2' }}
        >
          <Nav color="#3c67c3" />
          <Row id="faqFirstSection">
            <Col id="faqFirstSectionText" span={12}>
              <div id="faqBody">
                <h2 id="faqTitle">FAQ</h2>
                <Row id="faqCollabsible">
                  <CollapsibleComponent id="faqCollabsible">
                    <CollapsibleHead className="faqHead">How does it work?</CollapsibleHead>
                    <CollapsibleContent className="faqBody">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex</p>
                    </CollapsibleContent>

                    <CollapsibleHead className="faqHead">How long do funds take to deposit?</CollapsibleHead>
                    <CollapsibleContent className="faqBody">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </CollapsibleContent>

                    <CollapsibleHead className="faqHead">What are SparkPoints?</CollapsibleHead>
                    <CollapsibleContent className="faqBody">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </CollapsibleContent>
                  </CollapsibleComponent>
                </Row>
              </div>
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
