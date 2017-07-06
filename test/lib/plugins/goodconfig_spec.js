import Good from 'good';
import Hapi from 'hapi';
import { expect } from 'chai';

import GoodConfig from '../../../lib/plugins/goodconfig';


const internals = {};


describe('good configuration', () => {

    it('registers "good"', (done) => {

        internals.server.init((err, server) => {

            expect(err).to.not.exist;
            expect(Object.keys(server.registrations)).to.include('good');
            server.stop(done);
        });
    });

    it('errors on failed registering of good plugin', (done) => {

        const orig = Good.register;

        Good.register = function (plugin, options, next) {

            Good.register = orig;
            return next(new Error('fail'));
        };

        Good.register.attributes = {
            name: 'fake good failure'
        };

        internals.server.init((err, server) => {

            expect(err).to.exist;
            done();
        });
    });
});

internals.plugins = [GoodConfig];

internals.server = {
    init: (next) => {

        const server = new Hapi.Server();

        server.connection({ port: 0 });

        server.register(internals.plugins, (err) => {

            if (err) {
                return next(err);
            }

            server.start((err) => {

                return next(err, server);
            });
        });
    }
};
