import mongoose from "mongoose"
import mongooseAutoPopulate from "mongoose-autopopulate"
import PostMessage from "./postMessage.js"

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
    postmessage: { type: mongoose.Schema.Types.ObjectId, ref: 'postmessage', autopopulate: true },
});

transformSchema.plugin(mongooseAutoPopulate);

var TransformPosition = mongoose.model("position", transformSchema);

export default TransformPosition;