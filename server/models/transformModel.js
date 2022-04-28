import mongoose from "mongoose"

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
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'PostMessage' },
   
});

var TransformPosition = mongoose.model("position", transformSchema);

export default TransformPosition;