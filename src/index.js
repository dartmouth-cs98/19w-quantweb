import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

import Landing from './containers/landing';
import LogInContainer from './containers/LogInContainer';
import RegisterUserContainer from './containers/RegisterUserContainer';
// import App from './components/app';

// Import main style sheet for website
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));


// TODO: Inline hack for About page
const About = (props) => {
  return <div> All there is to know about me </div>;
};

// Main application
const App = (props) => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/about" component={About} />
        <Route path="/login" component={LogInContainer} />
        <Route path="/register" component={RegisterUserContainer} />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('main'));
