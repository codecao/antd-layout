import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css'
import App from './App';
import serviceWorker from './serviceWorker';
import request from '@/utils/request'
React.$axios=request;


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker();
