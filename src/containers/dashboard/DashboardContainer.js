import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Row, Col } from 'antd';
import Nav from '../Nav';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav color="#3c67c3" />
        <h1> You are on Dashboard Page </h1>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    authenticated: state.authenticated,
  }
);
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { })(DashboardContainer));
