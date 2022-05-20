import mongoose from "mongoose"
import mongooseAutoPopulate from "mongoose-autopopulate"
import PostMessage from "./postMessage.js"
import AutoIncrementFactory from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

const transformSchema = mongoose.Schema({
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
    postMessage: Number,
    
});

transformSchema.plugin(AutoIncrement, {id:'postMessage_seq',inc_field: 'postMessage'});

var TransformPosition = mongoose.model("position", transformSchema);

export default TransformPosition;