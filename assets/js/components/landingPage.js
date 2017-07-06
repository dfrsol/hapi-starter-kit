import React from 'react';


export default class LandingPage extends React.Component {
    render() {

        return (
            <div id="hello-world">
                <h1>Hello World</h1>
                <p>Welcome to the sample landing page for our Hapi-React Starter Kit of the IBM Marketplace</p>
                <h4>Current Students</h4>

                <ul id="students">
                    {this.props.students.map((student, id) => {

                        return (
                            <li id={`student-${id}`} className="student-card" key={`student-${id}`}>
                                <strong>{student.name}</strong> (Age: {student.age}): {student.grade}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}


LandingPage.propTypes = {
    students: React.PropTypes.arrayOf(
        React.PropTypes.object.isRequired
    ).isRequired
};

LandingPage.defaultProps = {
    students: []
};
