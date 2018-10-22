/*!
 * Vendor
 */

import * as React from 'react';
import thunk from 'redux-thunk';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/*!
 * Reducers
 */

import rootReducer from './reducers';

/*!
 * Root Component
 */

import App from './App';

/*!
 * Store settings
 */

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
    ),
  ),
);

/*!
 * Expo
 */

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
