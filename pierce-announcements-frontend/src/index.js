import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import App from './App/App';
import ReggieWedding from './ReggieWedding/ReggieWedding';
import * as serviceWorker from './serviceWorker';
import 'uikit/dist/js/uikit-core.min.js';
import 'uikit/dist/js/uikit-icons.min.js';

//var lang = document.getElementsByTagName('html')[0].lang;
ReactDOM.render(<App><ReggieWedding/></App>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
