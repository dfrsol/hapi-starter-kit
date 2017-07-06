import * as Path from 'path';

import { expect } from 'chai';
import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';

import handler from '../../../lib/handlers/landingPage';


const internals = {};


describe('Landing Page Handler', () => {

    let res;

    before((done) => {

        const request = {
            method: 'GET',
            url: '/test'
        };

        internals.server.init((err, server) => {

            if (err) {
                return err;
            }

            server.route({
                method: 'GET',
                path: '/test',
                config: handler
            });

            server.inject(request, (orig_res) => {

                res = orig_res;
                server.stop(done);
            });
        });
    });

    it('returns a 200 response', () => {

        expect(res.statusCode).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
    });

    it('returns an html file with a main content element', () => {

        expect(res.result).to.contain('<main id="content">');
    });

}); // End of describe


internals.plugins = [Inert, Vision];

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
