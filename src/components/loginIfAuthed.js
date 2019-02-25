import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class requireAuth extends React.Component {
    // your various component lifecycle methods
    componentWillMount() {
      console.log('loginIfAuthed');
      if (this.props.authenticated.authenticated === true) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated === true) {
        this.props.history.push('/dashboard');
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
