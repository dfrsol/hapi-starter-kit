import LandingPage from '../handlers/landingPage';


const internals = {};


const register = function (server, options, next) {

    server.dependency(['inert'], internals.after);

    return next();
};

register.attributes = { name: 'Landing Page Routing' };

internals.after = (server, next) => {

    server.route({ method: 'GET', path: '/', config: LandingPage });

    return next();
};


export default { register };
