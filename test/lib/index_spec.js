import Hapi from 'hapi';
import { expect } from 'chai';

import Server from '../../lib';


const internals = {};

internals.plugins = [
    require('inert'),
    require('../../lib/plugins/goodconfig'),
    require('../../lib/routes/landingPage'),
    require('../../lib/routes/api')
];

internals.server = { port: 9999 };


describe('Server', () => {

    it('starts and returns a hapi server object', (done) => {

        Server.init(internals.server.port, (err, server) => {

            expect(err).to.be.undefined;
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts on the port provided', (done) => {

        Server.init(internals.server.port, (err, server) => {

            expect(err).to.be.undefined;
            expect(server.info.port).to.equal(internals.server.port);

            server.stop(done);
        });
    });

    it('handles register plugin errors', (done) => {

        const errorMessage = 'register routes failed';
        const Routes = internals.plugins[2];
        const original = Routes.register;

        Routes.register = function (server, options, next) {

            Routes.register = original;
            return next(new Error(errorMessage));
        };

        Routes.register.attributes = {
            name: 'faux routes'
        };

        Server.init(internals.server.port, (err, server) => {

            expect(err).to.not.be.undefined;
            expect(err.message).to.equal(errorMessage);

            done();
        });
    });

    it('includes all necessary plugin and routes', (done) => {

        Server.init(internals.server.port, (err, server) => {

            const registeredPlugins = Object.keys(server.registrations);

            expect(err).to.be.undefined;

            internals.plugins.forEach((plugin) => {

                const name = plugin.register.attributes.name || plugin.register.attributes.pkg.name;

                expect(registeredPlugins).to.include(name);
            });

            server.stop(done);
        });
    });
});
