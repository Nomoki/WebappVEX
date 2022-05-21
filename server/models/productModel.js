import mongoose from "mongoose"
import mongooseAutoPopulate from "mongoose-autopopulate"
import PostMessage from "./postMessage.js"
import AutoIncrementFactory from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

const productSchema = mongoose.Schema({
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
    sceneId: Number,
    
});

productSchema.plugin(AutoIncrement, {id:'scenesId_seq',inc_field: 'sceneId'});

var ProductPosition = mongoose.model("product", productSchema);

export default ProductPosition;