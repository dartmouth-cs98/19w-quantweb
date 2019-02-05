import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionTypes } from './actions';
import requireAuth from './components/requireAuth';

import Landing from './containers/landing';
import LogInContainer from './containers/LogInContainer';
import RegisterUserContainer from './containers/RegisterUserContainer';
// import App from './components/app';

// Import main style sheet for website
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

// Get token
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

// TODO: Inline hack for About page
const About = (props) => {
  return <div> All there is to know about me </div>;
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

// Main application
const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={requireAuth(Landing)} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={LogInContainer} />
          <Route exact path="/register" component={RegisterUserContainer} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('main'));
