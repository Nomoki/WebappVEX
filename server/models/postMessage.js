import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

const sceneinfoSchema = mongoose.Schema({
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
    sceneId: Number,
})

sceneinfoSchema.plugin(AutoIncrement, {id:'sceneId_seq',inc_field: 'sceneId'});

var SceneInfo = mongoose.model('sceneinformation', sceneinfoSchema);

export default SceneInfo;