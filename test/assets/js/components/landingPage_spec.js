import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import studentStore from '../../../../stores/students';
import LandingPage from '../../../../assets/js/components/landingPage';


describe('Landing Page component', () => {

    it('returns a div with id and four children', () => {

        const output = shallow(<LandingPage />);

        expect(output.type()).to.equal('div');
        expect(output.props().id).to.equal('hello-world');
        expect(output.props().children).to.have.length(4);
    });

    it('returns a list with a length of all the students', () => {

        const output = shallow(<LandingPage students={studentStore}/>);
        const list = output.find('ul');

        expect(list.props().id).to.equal('students');
        expect(list.children()).to.have.length(studentStore.length);
    });

    it('has a list with all the items having ids and className', () => {

        const output = shallow(<LandingPage students={studentStore}/>);
        const list = output.find('ul');

        expect(list.props().id).to.equal('students');
        list.children().forEach((student, id) => {

            expect(student.props().id).to.equal(`student-${id}`);
            expect(student.props().className).to.equal('student-card');
        });
    });

    it('has an empty array for default value of students', () => {

        expect(LandingPage.defaultProps.students).to.be.empty;
    });
});
