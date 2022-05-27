import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find({});

        res.status(200).json(postMessage);


    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage(post);

    try {
        await newPostMessage.save(); // Typo there I forgot to add newPostMessage. Before it was juste postMessage.save()

        res.status(201).json(newPostMessage);
   
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: (`${id}is an invalid ID`)});
    } else {
        const updatedPost = {
          creator,
          title,
          message,
          tags,
          selectedFile,
          _id: id,
        };
        res.json(updatedPost);

        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
        res.json(updatedPost);
    };
        
}