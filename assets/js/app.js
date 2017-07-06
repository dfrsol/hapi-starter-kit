'use strict'; // eslint-disable-line strict

import React from 'react';
import ReactDOM from 'react-dom';

import LandingPage from './components/landingPage';
import students from '../../stores/students';

const InitApp = () => {

    const data = { students };
    const rootElement = document.getElementById('root');

    if (rootElement) {
        ReactDOM.render(<LandingPage {...data} />, rootElement);
    }
};

export default InitApp;

InitApp();
