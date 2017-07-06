import Hapi from 'hapi';
import { expect } from 'chai';

import handler from '../../../lib/handlers/api';
import studentService from '../../../stores/students';


const internals = {};


describe('API Handler', () => {

    it('returns two methods', () => {

        const keys = Object.keys(handler);

        expect(keys).to.have.length(2);
        expect(keys).to.include('getAll');
        expect(keys).to.include('getOne');
    });

    it('getAll returns all data', (done) => {

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
                config: handler.getAll
            });

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.result).to.equal(studentService);

                server.stop(done);
            });
        });
    });

    it('getOne returns all data', (done) => {

        const studentId = 0;
        const request = {
            method: 'GET',
            url: `/test/${studentId}`
        };

        internals.server.init((err, server) => {

            if (err) {
                return err;
            }

            server.route({
                method: 'GET',
                path: '/test/{id*}',
                config: handler.getOne
            });

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.result).to.equal(studentService[studentId]);

                server.stop(done);
            });
        });
    });

}); // End of describe

internals.plugins = [];

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
