import mongoose from 'mongoose';

import { model } from 'mongoose';

const DOCUMENT_NAME = 'Author';
const COLLECTION_NAME = 'Authors';

// Declare the Schema of the Mongo model
const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 150
        },
        email: {
            type: String,
            unique: true,
            trim: true
        },
        age: {
            type: Number,
            min: [18, 'Author must be greater than 18 years old']
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
);

//Export the model
export default model(DOCUMENT_NAME, authorSchema);
