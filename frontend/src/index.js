import React  from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import './bootstrap.min.css'
import App from './App';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);