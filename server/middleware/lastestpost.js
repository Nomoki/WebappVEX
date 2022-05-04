import PostMessage from "../models/postMessage.js";

const lastestpost = async(req, res, next) =>{

    try {
        const lpost = await PostMessage.findOne({ _id: req.params.post_id }); 
        req.lastestPost = lpost;

        next();
    } catch (error) {
        console.log(error);
    }
}

export default lastestpost;