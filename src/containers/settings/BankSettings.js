import React from 'react';
import {
 Form,
} from 'antd';

class SettingsBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }


  render() {
    return (
      <h3> Bank Account Settings Go Here </h3>
    );
  }
}

const SettingsFormInstance = Form.create()(SettingsBody);
export default SettingsFormInstance;
