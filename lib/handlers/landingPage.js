import Config from '../../configs/general';


const internals = {};

internals.data = {
    title: 'Starter Kit - Hapi and ReactJS',
    app: `${Config.webServer}/dist/js/app.bundle.js`
};


export default {
    description: 'Landing Page',
    handler: (request, reply) => {

        return reply.view('index', internals.data);
    }
};
