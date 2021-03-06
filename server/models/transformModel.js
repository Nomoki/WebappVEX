import mongoose from "mongoose"
import mongooseAutoPopulate from "mongoose-autopopulate"
import PostMessage from "./postMessage.js"
import AutoIncrementFactory from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

const sceneSchema = mongoose.Schema({
    objnum: Number,
    transX: Number,
    transY: Number,
    transZ: Number,
    rotateX: Number,
    rotateY: Number,
    rotateZ: Number,
    scaleX: Number,
    scaleY: Number,
    scaleZ: Number,
    creator: String,
    name: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    sceneInfomationId: Number,
    
});

sceneSchema.plugin(AutoIncrement, {id:'sceneInfomationId_seq',inc_field: 'sceneInfomationId'});

var ScenePosition = mongoose.model("scene", sceneSchema);

export default ScenePosition;