import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

// Declare the Schema of the Mongo model
const postSchema = new Schema(
    {
        title: {
            type: Number,
            required: true
        },
        content: {
            type: Number,
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'Author'
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
);

export default model(DOCUMENT_NAME, postSchema);
