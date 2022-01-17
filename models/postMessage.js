import mongoose from 'mongoose';

const postSchema = mongoose.Schema({ //data for schema
    title: String,
    directions: String,
    creator: String,
    ingredients: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;