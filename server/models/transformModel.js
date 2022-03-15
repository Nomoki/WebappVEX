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
   
});

var TransformPosition = mongoose.model("position", transformSchema);

export default TransformPosition;