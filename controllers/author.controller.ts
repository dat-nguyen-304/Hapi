import { CreateAuthorPayload, DeleteAuthorPayload, UpdateAuthorPayload } from '../types/author.type';
import * as Hapi from '@hapi/hapi';
import AuthorService from '../services/author.service';

class AuthorController {
    static createAuthor = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h
            .response({
                message: 'Create new author successfully',
                metadata: await AuthorService.createAuthor(request.payload as CreateAuthorPayload)
            })
            .code(201);
    };

    static updateAuthor = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h
            .response({
                message: 'Update new author successfully',
                metadata: await AuthorService.updateAuthor(request.payload as UpdateAuthorPayload)
            })
            .code(200);
    };

    static getAuthors = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h.response({
            message: 'Get all authors successfully',
            metadata: await AuthorService.getAuthors()
        });
    };

    static getAuthorById = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h
            .response({
                message: 'Get author successfully',
                metadata: await AuthorService.getAuthorById(request.params.id)
            })
            .code(200);
    };

    static deleteAuthor = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h
            .response({
                message: 'Delete author successfully',
                metadata: await AuthorService.deleteAuthor(request.payload as DeleteAuthorPayload)
            })
            .code(200);
    };
}

export default AuthorController;
