import { CreateAuthorPayload, DeleteAuthorPayload, UpdateAuthorPayload } from '../types/author.type';
import * as Hapi from '@hapi/hapi';
import AuthorService from '../services/author.service';

class AuthorController {
    static createAuthor = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
            return h
                .response({
                    message: 'Create new author successfully',
                    metadata: await AuthorService.createAuthor(request.payload as CreateAuthorPayload)
                })
                .code(201);
        } catch (error: any) {
            return h.response({ message: error.message }).code(error.status ?? 500);
        }
    };

    static updateAuthor = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response({
                message: 'Update new author successfully',
                metadata: await AuthorService.updateAuthor(request.payload as UpdateAuthorPayload)
            });
        } catch (error: any) {
            return h.response({ message: error.message }).code(error.status ?? 500);
        }
    };

    static getAuthors = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response({
                message: 'Get all authors successfully',
                metadata: await AuthorService.getAuthors()
            });
        } catch (error: any) {
            return h.response({ message: error.message }).code(error.status ?? 500);
        }
    };

    static getAuthorById = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response({
                message: 'Get author successfully',
                metadata: await AuthorService.getAuthorById(request.params.id)
            });
        } catch (error: any) {
            return h.response({ message: error.message }).code(error.status ?? 500);
        }
    };

    static deleteAuthor = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response({
                message: 'Delete author successfully',
                metadata: await AuthorService.deleteAuthor(request.payload as DeleteAuthorPayload)
            });
        } catch (error: any) {
            return h.response({ message: error.message }).code(error.status ?? 500);
        }
    };
}

export default AuthorController;
