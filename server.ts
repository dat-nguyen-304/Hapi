'use strict';

import * as Hapi from '@hapi/hapi';
import { Boom } from '@hapi/boom';
import './dbs/init.mongodb';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import routes from './route';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'API Documentation',
                    version: '1.0.0'
                }
            }
        }
    ]);
    server.route(routes);

    server.ext('onPreResponse', (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        const response = request.response as Boom;
        if (response.isBoom) {
            if (response.data) {
                return h.response({ message: response.data.message }).code(response.data.status);
            }
            return h.response({ message: response.message }).code(500);
        }
        return h.continue;
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();
