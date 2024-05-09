import { Types } from 'mongoose';

export type CreatePostPayload = {
    title: string;
    content: string;
    authorId: Types.ObjectId;
};
