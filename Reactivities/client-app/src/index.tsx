//import dateFnsLocalizer from 'react-widgets-date-fns';
import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
//import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
