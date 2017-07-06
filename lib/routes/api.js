import API from '../handlers/api';


const internals = {};


const register = function (server, options, next) {

    server.route([
        { method: 'GET', path: '/api/{id*}', config: API.getOne },
        { method: 'GET', path: '/api/all', config: API.getAll }
    ]);

    return next();
};

register.attributes = {
    name: 'sample api routing'
};


export default { register };
