import * as Path from 'path';

import { expect } from 'chai';
import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';
import Sinon from 'sinon';

import LandingPageHandler from '../../../lib/handlers/landingPage';
import LandingPageRoutes from '../../../lib/routes/landingPage';


const internals = {};


describe('Landing Page routing', () => {

    it('returns 200 reps and calls landingpage.handler from the \'/\' path', (done) => {

        const original = LandingPageHandler.handler;

        LandingPageHandler.handler = Sinon.spy(original);

        internals.server.init((err, server) => {

            expect(err).to.not.exist;

            const request = {
                method: 'GET',
                url: '/'
            };

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(LandingPageHandler.handler.called).to.be.true;

                LandingPageHandler.handler = original;

                server.stop(done);
            });
        });
    });

    it('errors on failed registering of inert', (done) => {

        const original = Inert.register;

        Inert.register = function (server, options, next) {

            Inert.register = original;
            return next(new Error('failed'));
        };

        Inert.register.attributes = {
            name: 'faux inert'
        };

        internals.server.init((err, server) => {

            expect(err).to.exist;
            expect(err.message).to.equal('failed');

            done();
        });
    });

    it('errors on missing inert plugins', (done) => {

        internals.plugins = [Vision, LandingPageRoutes];

        internals.server.init((err, server) => {

            expect(err.message).to.equal('Plugin ' + LandingPageRoutes.register.attributes.name + ' missing dependency ' + Inert.register.attributes.pkg.name +
                ' in connection: ' + server.info.uri);

            internals.plugins = [Inert, LandingPageRoutes];

            done();
        });
    });
});

internals.plugins = [Inert, Vision, LandingPageRoutes];

internals.server = {
    init: (next) => {

        const server = new Hapi.Server();

        server.connection({ port: 0 });

        server.register(internals.plugins, (err) => {

            if (err) {
                return next(err);
            }

            server.views({
                engines: {
                    hbs: require('handlebars')
                },
                relativeTo: Path.resolve(__dirname, '..','..', '..', 'lib'),
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
    }
};
