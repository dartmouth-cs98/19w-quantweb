import React from 'react';
import {
  Layout, Menu, Icon, Form,
} from 'antd';
import ProfileSettings from './ProfileSettings';

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
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">
                  <span><Icon type="user" />Profile</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <span><Icon type="credit-card" />Cards</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <span><Icon type="bank" />Banks</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <ProfileSettings />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          PaisaJi ©2018
        </Footer>
      </Layout>
    );
  }
}

const SettingsFormInstance = Form.create()(SettingsBody);
export default SettingsFormInstance;
