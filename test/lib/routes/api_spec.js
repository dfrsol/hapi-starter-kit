import Hapi from 'hapi';
import Sinon from 'sinon';
import { expect } from 'chai';

import APIRoutes from '../../../lib/routes/api';
import APIHandler from '../../../lib/handlers/api';


const internals = {};


describe('Sample API Routing', () => {

    it('returns a register key', () => {

        expect(APIRoutes.register).to.be.instanceof(Function);
    });

    it('has a name attached to the register function', () => {

        expect(APIRoutes.register).to.have.ownProperty('name');
        expect(APIRoutes.register.attributes.name).to.equal('sample api routing');
    });

    it('/all returns a 200 response and calls APIHandler.getAll', (done) => {

        const original = APIHandler.getAll.handler;

        APIHandler.getAll.handler = Sinon.spy(original);

        internals.server.init((err, server) => {

            expect(err).to.be.undefined;

            const request = {
                method: 'GET',
                url: '/api/all'
            };

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(APIHandler.getAll.handler.called).to.be.true;

                APIHandler.getAll.handler = original;

                server.stop(done);
            });
        });
    });

    it('/{id*} returns 200 response', (done) => {

        const original = APIHandler.getOne.handler;

        APIHandler.getOne.handler = Sinon.spy(original);

        internals.server.init((err, server) => {

            expect(err).to.not.exist;

            const request = {
                method: 'GET',
                url: '/api/0'
            };

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(APIHandler.getOne.handler.called).to.be.true;

                APIHandler.getOne.handler = original;

                server.stop(done);
            });
        });
    });
});

internals.mockData = [
    {
        name: 'Bob',
        age: 100
    },
    {
        name: 'Tom',
        age: 50
    }
];

internals.plugins = [APIRoutes];

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
