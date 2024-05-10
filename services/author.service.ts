import { Types } from 'mongoose';
import author from '../model/author.model';
import { CreateAuthorPayload, DeleteAuthorPayload, UpdateAuthorPayload } from '../types/author.type';
import { NotFoundError } from '../response/error.response';

class AuthorService {
    static async createAuthor(payload: CreateAuthorPayload) {
        const res = await author.create(payload);
        return res;
    }

    static async updateAuthor({ id, name, email, age }: UpdateAuthorPayload) {
        const foundAuthor = await author.findOne({ _id: new Types.ObjectId(id) });
        if (!foundAuthor) throw new NotFoundError('Author Not found');
        const res = await author.updateOne(
            {
                _id: new Types.ObjectId(id)
            },
            {
                $set: {
                    name,
                    email,
                    age
                }
            }
        );
        return res;
    }

    static async getAuthors() {
        return await author.find({});
    }

    static async getAuthorById(id: string) {
        const foundAuthor = await author.findOne({ _id: new Types.ObjectId(id) });
        if (!foundAuthor) throw new NotFoundError('Author Not found');
        return foundAuthor;
    }

    static async deleteAuthor({ id }: DeleteAuthorPayload) {
        const foundAuthor = await author.findOne({ _id: new Types.ObjectId(id) });
        if (!foundAuthor) throw new NotFoundError('Author Not found', 404);
        return await author.deleteOne({
            _id: new Types.ObjectId(id)
        });
    }
}

export default AuthorService;
