import Joi from 'joi';
import myQueue from '../myQueue';
import * as Hapi from '@hapi/hapi';

const otherRoute: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
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
        method: 'POST',
        path: '/api/test-bull',
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
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
    }
];

export default otherRoute;
