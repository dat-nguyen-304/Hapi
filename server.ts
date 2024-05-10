'use strict';

import * as Hapi from '@hapi/hapi';
import { Boom } from '@hapi/boom';
import './dbs/init.mongodb';
import AuthorController from './controllers/author.controller';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Joi from 'joi';
import myQueue from './myQueue';

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
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: () => {
                return 'Server is running!';
            },
            options: {
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/api/author',
            handler: AuthorController.getAuthors,
            options: {
                description: 'Get all author',
                notes: 'Get all author',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/api/author/{id}',
            handler: AuthorController.getAuthorById,
            options: {
                description: 'Get author by id',
                notes: 'Get author by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            }
        },
        {
            method: 'POST',
            path: '/api/author',
            handler: AuthorController.createAuthor,
            options: {
                description: 'Create author',
                notes: 'Create author',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).max(20).required(),
                        email: Joi.string().min(5).max(50).required(),
                        age: Joi.number().min(18).required()
                    })
                }
            }
        },
        {
            method: 'POST',
            path: '/api/test-bull',
            handler: async (request, h) => {
                try {
                    await myQueue.add('test-bull', { payload: request.payload });
                    return h.response({ message: 'Add to queue success' }).code(200);
                } catch (error: any) {
                    console.log({ error });
                    return h.response({ message: 'Add to queue error' }).code(500);
                }
            },
            options: {
                description: 'test bull',
                notes: 'test bull',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        num: Joi.number().required()
                    })
                }
            }
        },
        {
            method: 'PATCH',
            path: '/api/author',
            handler: AuthorController.updateAuthor,
            options: {
                description: 'Update author',
                notes: 'Update author',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        id: Joi.string().required(),
                        name: Joi.string().min(3).max(20),
                        email: Joi.string().min(5).max(50),
                        age: Joi.number().min(18)
                    })
                }
            }
        },
        {
            method: 'DELETE',
            path: '/api/author',
            handler: AuthorController.deleteAuthor,
            options: {
                description: 'Delete author',
                notes: 'Delete author',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        id: Joi.string().required()
                    })
                }
            }
        }
    ]);

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
