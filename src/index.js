import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GenerateScale from './GenerateScale';
import InputForm from './InputForm';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App/>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// When i made this I found a much better version of basically the same thing
// it was done by people who understand music theory and have a better understanding of developing webapps
// heres the link https://fretmap.app/scale-minor/root-e/hand-right
serviceWorker.unregister();
