import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})


var PostMessage = mongoose.model('postmessage', postSchema);

export default PostMessage;