const internals = {};


const register = function (server, options, next) {

    server.register({
        register: require('good'),
        options: internals.options
    }, (err) => {

        if (err) {
            return next(err);
        }

        return next();
    });
};

register.attributes = { name: 'Good Config' };

internals.options = {
    ops: {
        interval: 1000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
};


export default { register };
