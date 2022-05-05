import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

const lastestpost = async(req, res, next) =>{
    const { post_id } = req.params;
    const { _id } = req.body;
    try {
        const lpost = await PostMessage.findOne({ _id: mongoose.Types.ObjectId(_id) }); 
        req.lastestPost = lpost;

        next();
    } catch (error) {
        console.log(error);
    }
};

export default lastestpost;