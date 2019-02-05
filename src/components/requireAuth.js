import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class requireAuth extends React.Component {
    // your various component lifecycle methods
    componentWillMount() {
      if (this.props.authenticated.authenticated === false) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated === false) {
        this.props.history.push('/login');
      }
    }


    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  // mapStateToProps
  const mapStateToProps = state => (
    {
      authenticated: state.authenticated,
    }
  );

  return connect(mapStateToProps, null)(requireAuth);
}
