import React from 'react';
import { BrowserRouter as Router, Route, Link }
from 'react-router-dom';
import {
  Layout, Menu, Icon, Form,
} from 'antd';
import ProfileSettings from './ProfileSettings';
import BankSettings from './BankSettings';

const {
  Header, Content, Footer, Sider,
} = Layout;

class SettingsBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }


  render() {
    return (
      <Router>
        <Layout>
          <Header className="header" id="settingHeader">
            <div className="logo" />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  style={{ height: '100%' }}
                >
                  <Menu.Item key="1">
                    <Link to="/settings" className="nav-text">
                      <span><Icon type="user" />Profile</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/settings/banks" className="nav-text">
                      <span><Icon type="bank" />Banks</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Route exact path="/settings" component={ProfileSettings} />
                <Route path="/settings/banks" component={BankSettings} />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            PaisaJi ©2018
          </Footer>
        </Layout>
      </Router>
    );
  }
}

const SettingsFormInstance = Form.create()(SettingsBody);
export default SettingsFormInstance;
