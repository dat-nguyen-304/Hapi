import { Types } from 'mongoose';
import post from '../model/post.model';
import { CreatePostPayload } from '../types/post.type';

class PostService {
    static async createPost({ title, content, authorId }: CreatePostPayload) {
        const res = await post.create({ title, content, authorId: new Types.ObjectId(authorId) });
        console.log({ res });
        return res;
    }
}

export default PostService;
