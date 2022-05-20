import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

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
    transformScene: Number,
})

postSchema.plugin(AutoIncrement, {id:'transformScene_seq',inc_field: 'transformScene'});

var PostMessage = mongoose.model('postmessage', postSchema);

export default PostMessage;