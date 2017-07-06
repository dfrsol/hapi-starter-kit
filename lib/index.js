import Hapi from 'hapi';
import Path from 'path';


const internals = {};

internals.plugins = [
    require('inert'),
    require('vision'),
    require('./plugins/goodconfig'),
    require('./routes/landingPage'),
    require('./routes/api')
];


const init = function (port, next) {

    const server = new Hapi.Server();

    server.connection({ port });

    server.register(internals.plugins, (err) => {

        if (err) {
            return next(err);
        }

        // static dist routing

        server.route({
            method: 'GET',
            path: '/dist/{path*}',
            config: {
                description: 'Static file routing',
                handler: {
                    directory: {
                        path: Path.join(__dirname, '..', 'dist', 'static'),
                        index: false,
                        redirectToSlash: false
                    }
                }
            }
        });

        server.views({
            engines: {
                hbs: require('handlebars')
            },
            relativeTo: Path.resolve(__dirname),
            path: './templates',
            helpersPath: './templates/helpers',
            layoutPath: './templates/layouts',
            partialsPath: './templates/partials',
            layout: 'default',
            isCached: false
        });

        server.start((err) => {

            return next(err, server);
        });
    });
};


export default { init };
