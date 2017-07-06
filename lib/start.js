import Hoek from 'hoek';

import Server from './index';
import { port } from '../configs/general';


const internals = {};

internals.server = { port };


Server.init(internals.server.port, (err, server) => {

    Hoek.assert(!err, err);
    server.log('==> ✅  Server is listening');
    server.log(`==> 🌎  Go to ${server.info.uri.toLowerCase()}`);
});

if (!['production', 'test'].includes(process.env.NODE_ENV)) {
    if (module.hot) {
        console.log('[HMR] Waiting for server-side updates'); // eslint-disable-line no-console

        module.hot.addStatusHandler((status) => {

            if (status === 'abort') {
                setTimeout(() => process.exit(0), 0);
            }
        });
    }
}
