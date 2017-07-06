import React from 'react';
import ReactDOM from 'react-dom';
import Sinon from 'sinon';
import { expect } from 'chai';

import students from '../../../stores/students';
import App from '../../../assets/js/app';
import LandingPage from '../../../assets/js/components/landingPage';


describe('The Landing Page entry point', () => {

    const data = { students };
    const spy = Sinon.spy(ReactDOM, 'render');

    before(() => {

        document.body.insertAdjacentHTML('afterbegin','<div id="root"></div>');

        App();
    });

    it('renders LandingPage component in the root', () => {

        expect(spy.calledWith(<LandingPage {...data} />, document.getElementById('root'))).to.be.true;
    });
});
