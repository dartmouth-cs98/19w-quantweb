import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionTypes } from './actions';
import requireAuth from './components/requireAuth';

import Landing from './containers/landing_page/Landing';
import LogInContainer from './containers/auth/LogInContainer';
import RegisterUserContainer from './containers/auth/RegisterUserContainer';
import DashboardContainer from './containers/dashboard/DashboardContainer';
import FAQ from './containers/landing_page/FAQ';
import SettingsContainer from './containers/settings/SettingsContainer';
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
// const About = (props) => {
//   return <div> All there is to know about me </div>;
// };

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

// Main application
const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/login" component={LogInContainer} />
          <Route exact path="/register" component={RegisterUserContainer} />
          <Route exact path="/settings" component={SettingsContainer} />
          <Route exact path="/dashboard" component={requireAuth(DashboardContainer)} />
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
