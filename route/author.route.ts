import Joi from 'joi';
import AuthorController from '../controllers/author.controller';
import { ReqRefDefaults, ServerRoute } from '@hapi/hapi';

const authorRoute: ServerRoute<ReqRefDefaults>[] = [
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
];

export default authorRoute;
